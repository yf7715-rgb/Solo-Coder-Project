import type { Customer, UsageTrend, Alert, QuotaPolicy, Role, AuditLog, AuditAction, Plan } from '../types';
import { ROLES, DEFAULT_POLICIES } from '../config/constants';
import { setAuditLogs } from '../data/mockData';

export function hasPermission(role: Role, permission: string): boolean {
  const roleConfig = ROLES[role];
  if (!roleConfig) return false;
  if (roleConfig.permissions.includes('*')) return true;
  return roleConfig.permissions.includes(permission);
}

export function canAccessMenu(role: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(role);
}

export function canPerformAction(role: Role, action: 'view' | 'edit' | 'manage' | 'delete'): boolean {
  if (role === 'admin') return true;
  if (role === 'ops') {
    return action === 'view' || action === 'edit' || action === 'manage';
  }
  return action === 'view';
}

export function filterCustomers(
  customers: Customer[],
  filters: {
    search?: string;
    plan?: Plan;
    status?: string;
    region?: string;
    riskLevel?: string;
    type?: string;
    workspace?: string;
  }
): Customer[] {
  return customers.filter(customer => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesName = customer.name.toLowerCase().includes(searchLower);
      const matchesEmail = customer.email.toLowerCase().includes(searchLower);
      const matchesCompany = customer.company.toLowerCase().includes(searchLower);
      const matchesId = customer.id.toLowerCase().includes(searchLower);
      if (!matchesName && !matchesEmail && !matchesCompany && !matchesId) {
        return false;
      }
    }
    
    if (filters.plan && customer.plan !== filters.plan) return false;
    if (filters.status && customer.status !== filters.status) return false;
    if (filters.region && customer.region !== filters.region) return false;
    if (filters.riskLevel && customer.riskLevel !== filters.riskLevel) return false;
    if (filters.type && customer.type !== filters.type) return false;
    if (filters.workspace && customer.workspace !== filters.workspace) return false;
    
    return true;
  });
}

export function sortCustomers(
  customers: Customer[],
  sortBy: keyof Customer,
  sortOrder: 'asc' | 'desc'
): Customer[] {
  return [...customers].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    return 0;
  });
}

export function paginateCustomers(
  customers: Customer[],
  page: number,
  pageSize: number
): { data: Customer[]; total: number; totalPages: number } {
  const total = customers.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const data = customers.slice(start, start + pageSize);
  
  return { data, total, totalPages };
}

export function filterUsageTrends(
  trends: UsageTrend[],
  filters: {
    startDate?: string;
    endDate?: string;
    customerIds?: string[];
  }
): UsageTrend[] {
  return trends.filter(trend => {
    if (filters.startDate && trend.date < filters.startDate) return false;
    if (filters.endDate && trend.date > filters.endDate) return false;
    if (filters.customerIds && !filters.customerIds.includes(trend.customerId)) return false;
    return true;
  });
}

export function aggregateMetrics(trends: UsageTrend[]): {
  totalCalls: number;
  totalSuccessful: number;
  totalFailed: number;
  avgErrorRate: number;
  avgResponseTime: number;
  peakCalls: number;
} {
  if (trends.length === 0) {
    return {
      totalCalls: 0,
      totalSuccessful: 0,
      totalFailed: 0,
      avgErrorRate: 0,
      avgResponseTime: 0,
      peakCalls: 0
    };
  }
  
  const totalCalls = trends.reduce((sum, t) => sum + t.apiCalls, 0);
  const totalSuccessful = trends.reduce((sum, t) => sum + t.successfulCalls, 0);
  const totalFailed = trends.reduce((sum, t) => sum + t.failedCalls, 0);
  const avgErrorRate = trends.reduce((sum, t) => sum + t.errorRate, 0) / trends.length;
  const avgResponseTime = trends.reduce((sum, t) => sum + t.avgResponseTime, 0) / trends.length;
  const peakCalls = Math.max(...trends.map(t => t.apiCalls));
  
  return {
    totalCalls,
    totalSuccessful,
    totalFailed,
    avgErrorRate,
    avgResponseTime,
    peakCalls
  };
}

export function aggregateByPlan(
  customers: Customer[],
  trends: UsageTrend[]
): Record<Plan, { customers: number; totalCalls: number; avgErrorRate: number }> {
  const result: Record<Plan, { customers: number; totalCalls: number; avgErrorRate: number }> = {
    free: { customers: 0, totalCalls: 0, avgErrorRate: 0 },
    pro: { customers: 0, totalCalls: 0, avgErrorRate: 0 },
    enterprise: { customers: 0, totalCalls: 0, avgErrorRate: 0 }
  };
  
  const customerMap = new Map(customers.map(c => [c.id, c]));
  
  for (const customer of customers) {
    result[customer.plan].customers++;
  }
  
  const trendByCustomer = new Map<string, UsageTrend[]>();
  for (const trend of trends) {
    if (!trendByCustomer.has(trend.customerId)) {
      trendByCustomer.set(trend.customerId, []);
    }
    trendByCustomer.get(trend.customerId)!.push(trend);
  }
  
  for (const [customerId, customerTrends] of trendByCustomer) {
    const customer = customerMap.get(customerId);
    if (!customer) continue;
    
    const metrics = aggregateMetrics(customerTrends);
    result[customer.plan].totalCalls += metrics.totalCalls;
  }
  
  for (const plan of Object.keys(result) as Plan[]) {
    const planCustomers = customers.filter(c => c.plan === plan);
    if (planCustomers.length > 0) {
      result[plan].avgErrorRate = planCustomers.reduce((sum, c) => sum + c.errorRate, 0) / planCustomers.length;
    }
  }
  
  return result;
}

export function findMatchingPolicy(
  policies: QuotaPolicy[],
  customerPlan: Plan
): QuotaPolicy | null {
  const activePolicies = policies.filter(p => p.enabled && p.plan === customerPlan);
  if (activePolicies.length === 0) {
    const defaultConfig = DEFAULT_POLICIES.find(p => p.plan === customerPlan);
    if (defaultConfig) {
      return {
        id: `default-${customerPlan}`,
        plan: customerPlan,
        name: `默认策略 - ${customerPlan === 'free' ? '免费版' : customerPlan === 'pro' ? '专业版' : '企业版'}`,
        apiCallThreshold: defaultConfig.apiCallThreshold,
        errorRateThreshold: defaultConfig.errorRateThreshold,
        responseTimeThreshold: defaultConfig.responseTimeThreshold,
        overageStrategy: defaultConfig.overageStrategy,
        enabled: true,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
    }
    return null;
  }
  return activePolicies[0];
}

export function shouldTriggerAlert(
  customer: Customer,
  policy: QuotaPolicy | null
): { shouldAlert: boolean; type: 'usage_exceeded' | 'error_rate_abnormal' | 'response_time_abnormal' | null; threshold: number; currentValue: number } {
  if (!policy) {
    return { shouldAlert: false, type: null, threshold: 0, currentValue: 0 };
  }
  
  if (customer.apiCalls > policy.apiCallThreshold) {
    return {
      shouldAlert: true,
      type: 'usage_exceeded',
      threshold: policy.apiCallThreshold,
      currentValue: customer.apiCalls
    };
  }
  
  if (customer.errorRate > policy.errorRateThreshold) {
    return {
      shouldAlert: true,
      type: 'error_rate_abnormal',
      threshold: policy.errorRateThreshold,
      currentValue: customer.errorRate
    };
  }
  
  if (customer.avgResponseTime > policy.responseTimeThreshold) {
    return {
      shouldAlert: true,
      type: 'response_time_abnormal',
      threshold: policy.responseTimeThreshold,
      currentValue: customer.avgResponseTime
    };
  }
  
  return { shouldAlert: false, type: null, threshold: 0, currentValue: 0 };
}

export function filterAlerts(
  alerts: Alert[],
  filters: {
    type?: string;
    severity?: string;
    status?: string;
    customerId?: string;
  }
): Alert[] {
  return alerts.filter(alert => {
    if (filters.type && alert.type !== filters.type) return false;
    if (filters.severity && alert.severity !== filters.severity) return false;
    if (filters.status && alert.status !== filters.status) return false;
    if (filters.customerId && alert.customerId !== filters.customerId) return false;
    return true;
  });
}

export function filterAuditLogs(
  logs: AuditLog[],
  filters: {
    actorRole?: string;
    action?: string;
    startDate?: string;
    endDate?: string;
  }
): AuditLog[] {
  return logs.filter(log => {
    if (filters.actorRole && log.actorRole !== filters.actorRole) return false;
    if (filters.action && log.action !== filters.action) return false;
    if (filters.startDate && log.createdAt < filters.startDate) return false;
    if (filters.endDate && log.createdAt > filters.endDate) return false;
    return true;
  });
}

export function generateAuditRecord(
  action: AuditAction,
  actor: { id: string; name: string; role: Role },
  details: string,
  target?: { id: string; type: string; name: string }
): AuditLog {
  return {
    id: `audit-${Date.now().toString().slice(-8)}`,
    action,
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    targetId: target?.id,
    targetType: target?.type,
    targetName: target?.name,
    details,
    createdAt: new Date().toISOString().split('T')[0]
  };
}

export function addAuditLog(record: AuditLog): void {
  setAuditLogs(prev => [record, ...prev]);
}

export function getDateRange(days: number): { start: string; end: string } {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0]
  };
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatPercentage(num: number): string {
  return num.toFixed(2) + '%';
}
