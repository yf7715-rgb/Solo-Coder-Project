import type { Role, Plan, CustomerStatus, RiskLevel, CustomerType, Region, AlertType, AlertSeverity, AlertStatus, AuditAction, MenuItem } from '../types';

export const ROLES: Record<Role, { label: string; permissions: string[] }> = {
  admin: {
    label: '管理员',
    permissions: ['*']
  },
  ops: {
    label: '运维人员',
    permissions: ['dashboard:view', 'usage:view', 'customers:view', 'customers:edit', 'alerts:view', 'alerts:manage', 'policies:view', 'audit:view']
  },
  viewer: {
    label: '只读用户',
    permissions: ['dashboard:view', 'usage:view', 'customers:view', 'alerts:view', 'policies:view', 'audit:view']
  }
};

export const USERS = [
  { id: 'user-001', username: 'admin', name: '张管理员', role: 'admin' as Role, password: 'admin123' },
  { id: 'user-002', username: 'ops', name: '李运维', role: 'ops' as Role, password: 'ops123' },
  { id: 'user-003', username: 'viewer', name: '王查看', role: 'viewer' as Role, password: 'viewer123' }
];

export const PLANS: Record<Plan, { label: string; color: string }> = {
  free: { label: '免费版', color: 'bg-gray-100 text-gray-700' },
  pro: { label: '专业版', color: 'bg-blue-100 text-blue-700' },
  enterprise: { label: '企业版', color: 'bg-purple-100 text-purple-700' }
};

export const CUSTOMER_STATUS: Record<CustomerStatus, { label: string; color: string }> = {
  active: { label: '活跃', color: 'bg-green-100 text-green-700' },
  inactive: { label: '非活跃', color: 'bg-gray-100 text-gray-700' },
  trial: { label: '试用', color: 'bg-yellow-100 text-yellow-700' },
  suspended: { label: '暂停', color: 'bg-red-100 text-red-700' }
};

export const RISK_LEVELS: Record<RiskLevel, { label: string; color: string }> = {
  low: { label: '低风险', color: 'bg-green-100 text-green-700' },
  medium: { label: '中风险', color: 'bg-yellow-100 text-yellow-700' },
  high: { label: '高风险', color: 'bg-orange-100 text-orange-700' },
  critical: { label: '严重', color: 'bg-red-100 text-red-700' }
};

export const CUSTOMER_TYPES: Record<CustomerType, { label: string }> = {
  individual: { label: '个人' },
  startup: { label: '初创' },
  enterprise: { label: '企业' }
};

export const REGIONS: Record<Region, { label: string }> = {
  'cn-north': { label: '华北' },
  'cn-south': { label: '华南' },
  'cn-east': { label: '华东' },
  'cn-west': { label: '华西' },
  'us-east': { label: '美东' },
  'us-west': { label: '美西' },
  'eu-west': { label: '西欧' }
};

export const ALERT_TYPES: Record<AlertType, { label: string; color: string }> = {
  usage_exceeded: { label: '用量超额', color: 'bg-red-100 text-red-700' },
  error_rate_abnormal: { label: '错误率异常', color: 'bg-orange-100 text-orange-700' },
  response_time_abnormal: { label: '响应时长异常', color: 'bg-yellow-100 text-yellow-700' },
  api_key_risk: { label: 'API Key 风险', color: 'bg-purple-100 text-purple-700' }
};

export const ALERT_SEVERITIES: Record<AlertSeverity, { label: string; color: string }> = {
  critical: { label: '严重', color: 'bg-red-600 text-white' },
  high: { label: '高', color: 'bg-orange-500 text-white' },
  medium: { label: '中', color: 'bg-yellow-500 text-white' },
  low: { label: '低', color: 'bg-blue-500 text-white' }
};

export const ALERT_STATUS: Record<AlertStatus, { label: string; color: string }> = {
  open: { label: '待处理', color: 'bg-red-100 text-red-700' },
  acknowledged: { label: '已认领', color: 'bg-yellow-100 text-yellow-700' },
  in_progress: { label: '处理中', color: 'bg-blue-100 text-blue-700' },
  closed: { label: '已关闭', color: 'bg-green-100 text-green-700' },
  escalated: { label: '已升级', color: 'bg-purple-100 text-purple-700' }
};

export const AUDIT_ACTIONS: Record<AuditAction, { label: string }> = {
  login: { label: '登录' },
  logout: { label: '登出' },
  filter_save: { label: '保存筛选' },
  filter_delete: { label: '删除筛选' },
  alert_acknowledge: { label: '认领告警' },
  alert_close: { label: '关闭告警' },
  alert_escalate: { label: '升级告警' },
  policy_create: { label: '创建策略' },
  policy_update: { label: '更新策略' },
  policy_delete: { label: '删除策略' },
  customer_view: { label: '查看客户' },
  customer_edit: { label: '编辑客户' },
  api_key_create: { label: '创建API Key' },
  api_key_revoke: { label: '吊销API Key' }
};

export const MENU_ITEMS: MenuItem[] = [
  { path: '/', label: '总览', icon: 'dashboard', roles: ['admin', 'ops', 'viewer'] },
  { path: '/usage', label: '用量分析', icon: 'bar-chart', roles: ['admin', 'ops', 'viewer'] },
  { path: '/customers', label: '客户管理', icon: 'users', roles: ['admin', 'ops', 'viewer'] },
  { path: '/alerts', label: '告警中心', icon: 'bell', roles: ['admin', 'ops', 'viewer'] },
  { path: '/policies', label: '配额策略', icon: 'settings', roles: ['admin', 'ops'] },
  { path: '/audit-log', label: '审计日志', icon: 'history', roles: ['admin', 'ops'] }
];

export const DEFAULT_POLICIES = [
  { plan: 'free' as const, apiCallThreshold: 1000, errorRateThreshold: 5, responseTimeThreshold: 1000, overageStrategy: 'block' as const },
  { plan: 'pro' as const, apiCallThreshold: 10000, errorRateThreshold: 3, responseTimeThreshold: 500, overageStrategy: 'throttle' as const },
  { plan: 'enterprise' as const, apiCallThreshold: 100000, errorRateThreshold: 1, responseTimeThreshold: 200, overageStrategy: 'notify' as const }
];
