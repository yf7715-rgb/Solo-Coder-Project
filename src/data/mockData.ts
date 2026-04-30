import { createSignal } from 'solid-js';
import type { Customer, UsageTrend, Alert, QuotaPolicy, AuditLog } from '../types';
import { DEFAULT_POLICIES, USERS } from '../config/constants';

const generateId = () => Math.random().toString(36).substring(2, 11);

const companyNames = [
  '星云科技', '银河数据', '云端网络', '智联软件', '未来通信', '东方算力', '星辰算法', '创新工场',
  '数字先锋', '云端漫步', '极客工坊', '数据魔方', '智能顶点', '代码星球', '字节跳动', '微服务',
  '科技前沿', '创新思维', '云端漫步', '数据科技', '创新科技', '前沿技术', '云端计算', '数据驱动',
  '智能创新', '科技未来', '云端服务', '数据互联', '智能服务', '科技云端', '数据智能', '科技创新',
  '云端创新', '数据服务', '智能科技', '云端数据', '科技智能', '创新云端', '数据未来', '科技数据',
  '智能云端', '创新数据', '科技服务', '智能数据', '云端科技', '数据创新', '科技云端', '创新服务'
];

const firstNames = ['张', '李', '王', '刘', '陈', '杨', '赵', '黄', '周', '吴', '徐', '孙', '马', '朱', '胡', '林', '郭', '何', '高', '罗'];

const lastNames = ['伟业', '建国', '志伟', '明', '伟', '芳', '秀英', '敏', '静', '丽', '强', '磊', '洋', '勇', '艳', '杰', '军', '平', '刚', '桂英'];

const plans = ['free', 'pro', 'enterprise'] as const;
const statuses = ['active', 'active', 'active', 'inactive', 'trial', 'suspended'] as const;
const riskLevels = ['low', 'medium', 'high', 'critical'] as const;
const customerTypes = ['individual', 'startup', 'enterprise'] as const;
const regions = ['cn-north', 'cn-south', 'cn-east', 'cn-west', 'us-east', 'us-west', 'eu-west'] as const;
const workspaces = ['production', 'staging', 'development', 'testing'];

const alertTypes = ['usage_exceeded', 'error_rate_abnormal', 'response_time_abnormal', 'api_key_risk'] as const;
const alertSeverities = ['critical', 'high', 'medium', 'low'] as const;
const alertStatuses = ['open', 'acknowledged', 'in_progress', 'closed', 'escalated'] as const;

function generateRandomDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString().split('T')[0];
}

function generateAPIKey(): string {
  return 'sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function generateCustomers(): Customer[] {
  const customers: Customer[] = [];
  
  for (let i = 0; i < 85; i++) {
    const plan = plans[i % 3];
    const apiLimit = plan === 'free' ? 1000 : plan === 'pro' ? 10000 : 100000;
    const apiCalls = Math.floor(Math.random() * apiLimit * 1.2);
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    customers.push({
      id: `cust-${String(i + 1).padStart(4, '0')}`,
      name: companyNames[i % companyNames.length] + (i > companyNames.length ? ` (${i - companyNames.length + 1})` : ''),
      email: `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`,
      company: companyNames[i % companyNames.length] + (i > companyNames.length ? ` ${i - companyNames.length + 1}` : ''),
      plan,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
      type: customerTypes[Math.floor(Math.random() * customerTypes.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
      workspace: workspaces[Math.floor(Math.random() * workspaces.length)],
      apiCalls,
      apiLimit,
      errorRate: Math.random() * 10,
      avgResponseTime: 50 + Math.random() * 500,
      lastActive: generateRandomDate(30),
      createdAt: generateRandomDate(365),
      apiKeys: [
        {
          id: generateId(),
          key: generateAPIKey(),
          name: '生产环境 Key',
          createdAt: generateRandomDate(365),
          lastUsed: generateRandomDate(7),
          status: 'active',
          permissions: ['read', 'write']
        },
        ...(Math.random() > 0.5 ? [{
          id: generateId(),
          key: generateAPIKey(),
          name: '测试环境 Key',
          createdAt: generateRandomDate(180),
          lastUsed: generateRandomDate(14),
          status: (Math.random() > 0.7 ? 'revoked' : 'active') as 'active' | 'revoked' | 'expired',
          permissions: ['read']
        }] : [])
      ]
    });
  }
  
  return customers;
}

function generateUsageTrends(customers: Customer[]): UsageTrend[] {
  const trends: UsageTrend[] = [];
  const customersToUse = customers.slice(0, 12);
  
  for (const customer of customersToUse) {
    for (let day = 0; day < 30; day++) {
      const date = new Date();
      date.setDate(date.getDate() - day);
      const dateStr = date.toISOString().split('T')[0];
      
      const baseCalls = customer.apiCalls / 30;
      const variance = baseCalls * (0.5 + Math.random());
      const apiCalls = Math.floor(variance);
      const errorRate = Math.random() * 10;
      const failedCalls = Math.floor(apiCalls * errorRate / 100);
      
      trends.push({
        id: generateId(),
        customerId: customer.id,
        date: dateStr,
        apiCalls,
        successfulCalls: apiCalls - failedCalls,
        failedCalls,
        avgResponseTime: 50 + Math.random() * 500,
        errorRate
      });
    }
  }
  
  return trends;
}

function generateAlerts(customers: Customer[]): Alert[] {
  const alerts: Alert[] = [];
  const alertTitles: Record<string, string> = {
    usage_exceeded: '用量超额告警',
    error_rate_abnormal: '错误率异常告警',
    response_time_abnormal: '响应时长异常告警',
    api_key_risk: 'API Key 风险告警'
  };
  
  const alertDescriptions: Record<string, string> = {
    usage_exceeded: '客户 API 调用量已超过配额阈值，请及时处理',
    error_rate_abnormal: '客户错误率持续高于正常水平，需要排查原因',
    response_time_abnormal: '客户 API 响应时间过长，影响用户体验',
    api_key_risk: '检测到 API Key 存在异常使用模式，可能存在安全风险'
  };
  
  for (let i = 0; i < 35; i++) {
    const customer = customers[i % customers.length];
    const type = alertTypes[i % alertTypes.length];
    const severity = alertSeverities[Math.floor(Math.random() * alertSeverities.length)];
    const status = alertStatuses[Math.floor(Math.random() * alertStatuses.length)];
    
    const threshold = type === 'usage_exceeded' ? customer.apiLimit :
                     type === 'error_rate_abnormal' ? 5 :
                     type === 'response_time_abnormal' ? 500 : 0;
    
    const currentValue = type === 'usage_exceeded' ? customer.apiLimit * 1.2 :
                         type === 'error_rate_abnormal' ? 8.5 :
                         type === 'response_time_abnormal' ? 800 : 1;
    
    const alert: Alert = {
      id: `alert-${String(i + 1).padStart(4, '0')}`,
      type,
      severity,
      status,
      customerId: customer.id,
      customerName: customer.name,
      title: alertTitles[type],
      description: alertDescriptions[type],
      threshold,
      currentValue,
      createdAt: generateRandomDate(14),
    };
    
    if (status !== 'open') {
      alert.acknowledgedBy = USERS[Math.floor(Math.random() * USERS.length)].name;
      alert.acknowledgedAt = generateRandomDate(7);
    }
    
    if (status === 'closed') {
      alert.closedBy = USERS[Math.floor(Math.random() * USERS.length)].name;
      alert.closedAt = generateRandomDate(3);
    }
    
    if (status === 'escalated') {
      alert.escalatedBy = USERS[0].name;
      alert.escalatedAt = generateRandomDate(2);
    }
    
    alerts.push(alert);
  }
  
  return alerts;
}

function generatePolicies(): QuotaPolicy[] {
  const policies: QuotaPolicy[] = [];
  const strategies = ['block', 'throttle', 'notify', 'auto_upgrade'] as const;
  
  for (let i = 0; i < 6; i++) {
    const policyConfig = DEFAULT_POLICIES[i % 3];
    policies.push({
      id: `policy-${String(i + 1).padStart(3, '0')}`,
      plan: policyConfig.plan,
      name: `${['默认策略', '严格策略', '宽松策略'][Math.floor(i / 3)]} - ${policyConfig.plan === 'free' ? '免费版' : policyConfig.plan === 'pro' ? '专业版' : '企业版'}`,
      apiCallThreshold: policyConfig.apiCallThreshold * (i > 2 ? 1.5 : 1),
      errorRateThreshold: policyConfig.errorRateThreshold,
      responseTimeThreshold: policyConfig.responseTimeThreshold,
      overageStrategy: strategies[i % strategies.length],
      enabled: true,
      createdAt: generateRandomDate(180),
      updatedAt: generateRandomDate(30)
    });
  }
  
  return policies;
}

function generateAuditLogs(): AuditLog[] {
  const logs: AuditLog[] = [];
  const actions = ['login', 'filter_save', 'alert_acknowledge', 'alert_close', 'policy_update', 'customer_view'] as const;
  
  for (let i = 0; i < 25; i++) {
    const user = USERS[i % USERS.length];
    const action = actions[i % actions.length];
    
    const details: Record<string, string> = {
      login: '用户成功登录系统',
      logout: '用户成功登出系统',
      filter_save: '保存了客户筛选条件',
      filter_delete: '删除了保存的筛选视图',
      alert_acknowledge: '认领了告警',
      alert_close: '关闭了告警',
      alert_escalate: '升级了告警',
      policy_create: '创建了新策略',
      policy_update: '更新了策略配置',
      policy_delete: '删除了策略',
      customer_view: '查看了客户详情',
      customer_edit: '编辑了客户信息',
      api_key_create: '创建了新的 API Key',
      api_key_revoke: '吊销了 API Key'
    };
    
    logs.push({
      id: `audit-${String(i + 1).padStart(5, '0')}`,
      action,
      actorId: user.id,
      actorName: user.name,
      actorRole: user.role,
      targetId: action.includes('alert') || action.includes('policy') || action.includes('customer') ? `target-${i}` : undefined,
      targetType: action.includes('alert') ? 'alert' : action.includes('policy') ? 'policy' : action.includes('customer') ? 'customer' : undefined,
      targetName: action.includes('alert') ? `告警 ${i}` : action.includes('policy') ? `策略 ${i}` : action.includes('customer') ? `客户 ${i}` : undefined,
      details: details[action],
      createdAt: generateRandomDate(30)
    });
  }
  
  return logs;
}

const initialCustomers = generateCustomers();
const initialTrends = generateUsageTrends(initialCustomers);
const initialAlerts = generateAlerts(initialCustomers);
const initialPolicies = generatePolicies();
const initialAuditLogs = generateAuditLogs();

export const [customers, setCustomers] = createSignal<Customer[]>(initialCustomers);
export const [usageTrends, setUsageTrends] = createSignal<UsageTrend[]>(initialTrends);
export const [alerts, setAlerts] = createSignal<Alert[]>(initialAlerts);
export const [policies, setPolicies] = createSignal<QuotaPolicy[]>(initialPolicies);
export const [auditLogs, setAuditLogs] = createSignal<AuditLog[]>(initialAuditLogs);
