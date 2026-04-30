export type Role = 'admin' | 'ops' | 'viewer';

export interface User {
  id: string;
  username: string;
  name: string;
  role: Role;
  avatar?: string;
}

export type Plan = 'free' | 'pro' | 'enterprise';
export type CustomerStatus = 'active' | 'inactive' | 'trial' | 'suspended';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type CustomerType = 'individual' | 'startup' | 'enterprise';
export type Region = 'cn-north' | 'cn-south' | 'cn-east' | 'cn-west' | 'us-east' | 'us-west' | 'eu-west';

export interface APIKey {
  id: string;
  key: string;
  name: string;
  createdAt: string;
  lastUsed: string;
  status: 'active' | 'revoked' | 'expired';
  permissions: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: Plan;
  status: CustomerStatus;
  riskLevel: RiskLevel;
  type: CustomerType;
  region: Region;
  workspace: string;
  apiCalls: number;
  apiLimit: number;
  errorRate: number;
  avgResponseTime: number;
  lastActive: string;
  createdAt: string;
  apiKeys: APIKey[];
}

export interface UsageTrend {
  id: string;
  customerId: string;
  date: string;
  apiCalls: number;
  successfulCalls: number;
  failedCalls: number;
  avgResponseTime: number;
  errorRate: number;
}

export type AlertType = 'usage_exceeded' | 'error_rate_abnormal' | 'response_time_abnormal' | 'api_key_risk';
export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';
export type AlertStatus = 'open' | 'acknowledged' | 'in_progress' | 'closed' | 'escalated';

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  customerId: string;
  customerName: string;
  title: string;
  description: string;
  threshold: number;
  currentValue: number;
  createdAt: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  closedBy?: string;
  closedAt?: string;
  escalatedBy?: string;
  escalatedAt?: string;
}

export interface QuotaPolicy {
  id: string;
  plan: Plan;
  name: string;
  apiCallThreshold: number;
  errorRateThreshold: number;
  responseTimeThreshold: number;
  overageStrategy: 'block' | 'throttle' | 'notify' | 'auto_upgrade';
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AuditAction = 'login' | 'logout' | 'filter_save' | 'filter_delete' | 'alert_acknowledge' | 'alert_close' | 'alert_escalate' | 'policy_create' | 'policy_update' | 'policy_delete' | 'customer_view' | 'customer_edit' | 'api_key_create' | 'api_key_revoke';

export interface AuditLog {
  id: string;
  action: AuditAction;
  actorId: string;
  actorName: string;
  actorRole: Role;
  targetId?: string;
  targetType?: string;
  targetName?: string;
  details: string;
  createdAt: string;
}

export interface FilterView {
  id: string;
  name: string;
  type: 'customers' | 'usage';
  filters: Record<string, any>;
  createdBy: string;
  createdAt: string;
}

export interface MenuItem {
  path: string;
  label: string;
  icon: string;
  roles: Role[];
}
