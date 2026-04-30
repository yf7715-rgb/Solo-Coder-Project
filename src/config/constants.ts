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

export const ROUTE_ROLES: Record<string, Role[]> = {
  '/': ['admin', 'ops', 'viewer'],
  '/usage': ['admin', 'ops', 'viewer'],
  '/customers': ['admin', 'ops', 'viewer'],
  '/customers/:id': ['admin', 'ops', 'viewer'],
  '/alerts': ['admin', 'ops', 'viewer'],
  '/policies': ['admin', 'ops'],
  '/audit-log': ['admin', 'ops']
};

export function canAccessRoute(path: string, role: Role): boolean {
  const allowedRoles = ROUTE_ROLES[path];
  if (allowedRoles) {
    return allowedRoles.includes(role);
  }

  for (const [pattern, roles] of Object.entries(ROUTE_ROLES)) {
    if (pattern.includes(':')) {
      const regex = new RegExp('^' + pattern.replace(/:[^/]+/g, '[^/]+') + '$');
      if (regex.test(path)) {
        return roles.includes(role);
      }
    }
  }

  return true;
}

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

export const UI_TEXTS = {
  app: {
    name: '用量运营平台',
    nameEn: 'Usage Operations',
    dashboardTitle: '用量运营仪表盘'
  },
  common: {
    clearFilters: '清除筛选',
    filterConditions: '筛选条件',
    startDate: '开始日期',
    endDate: '结束日期',
    plan: '套餐',
    region: '地区',
    riskLevel: '风险等级',
    viewAll: '查看全部',
    customerType: '客户类型',
    workspace: '工作空间',
    active: '活跃',
    normal: '正常',
    aboveThreshold: '高于正常水平',
    none: '暂无',
    noMatch: '暂无匹配的客户数据',
    noData: '暂无数据',
    noErrorData: '暂无错误数据',
    noAlert: '暂无关联告警',
    noAuditRecord: '暂无审计记录',
    operations: '操作',
    viewDetail: '查看详情',
    exportData: '导出数据',
    logout: '退出登录',
    login: '登录',
    username: '用户名',
    password: '密码',
    loginFailed: '登录失败，请检查用户名和密码',
    loginTo: '登录到用量运营平台',
    placeholder: {
      searchCustomer: '搜索客户名称、邮箱、ID...',
      viewName: '视图名称',
      saveView: '保存视图'
    },
    savedViews: '已保存的视图:',
    saveView: '保存视图',
    cancel: '取消',
    save: '保存',
    confirm: '确认',
    edit: '编辑',
    delete: '删除',
    close: '关闭'
  },
  pages: {
    dashboard: {
      title: '总览',
      description: '平台用量运营概览',
      dataRange: '数据范围',
      stats: {
        totalCustomers: '总客户数',
        totalAPICalls: 'API 调用总量',
        avgErrorRate: '平均错误率',
        pendingAlerts: '待处理告警'
      },
      sections: {
        topCustomers: '用量 TOP 客户',
        recentAlerts: '最近告警',
        planDistribution: '套餐分布概览'
      }
    },
    usage: {
      title: '用量分析',
      description: '分析和监控平台用量数据',
      sections: {
        planDistribution: '套餐用量分布',
        topCustomers: '用量排行 TOP 10',
        trendDetails: '用量趋势明细'
      },
      stats: {
        totalCalls: '总调用量',
        successfulCalls: '成功调用',
        avgErrorRate: '平均错误率',
        avgResponseTime: '平均响应时长',
        filterRange: '筛选范围内',
        recentDays: '近 7 天'
      },
      table: {
        rank: '排名',
        customerName: '客户名称',
        totalCalls: '总调用量',
        errorRate: '错误率',
        avgResponseTime: '平均响应时长',
        date: '日期',
        total: '总调用',
        success: '成功',
        failed: '失败',
        showingFirst: '仅展示前 20 条记录，共'
      }
    },
    customers: {
      title: '客户管理',
      description: '管理和查看所有客户信息',
      stats: {
        totalRecords: '共',
        records: '条记录'
      },
      table: {
        customerName: '客户名称',
        plan: '套餐',
        status: '状态',
        apiCalls: '调用量',
        errorRate: '错误率',
        riskLevel: '风险等级',
        region: '地区',
        operations: '操作'
      },
      pagination: {
        page: '第',
        totalPages: '页，共',
        pages: '页',
        prev: '上一页',
        next: '下一页'
      }
    },
    customerDetail: {
      title: '客户详情',
      customerInfo: '客户信息',
      usageTrend: '用量趋势',
      apiKeyList: 'API Key 列表',
      featureUsage: '功能用量分布',
      errorDistribution: '错误分布',
      recentActivity: '最近活跃记录',
      relatedAlerts: '关联告警',
      relatedPolicies: '关联配额策略',
      fields: {
        plan: '套餐',
        status: '状态',
        region: '地区',
        customerType: '客户类型',
        recentActivity: '最近活跃',
        apiCalls: 'API 调用',
        apiLimit: '配额',
        errorRate: '错误率',
        riskLevel: '风险等级',
        workspace: '工作空间',
        createdAt: '创建时间'
      },
      apiKey: {
        name: '名称',
        key: 'Key',
        status: '状态',
        usage: '用量',
        limit: '配额',
        createdAt: '创建时间',
        lastUsed: '最近使用'
      },
      policies: {
        apiCallThreshold: '调用量阈值',
        errorRateThreshold: '错误率阈值',
        responseTimeThreshold: '响应时长阈值',
        overageStrategy: '超额策略'
      }
    },
    alerts: {
      title: '告警中心',
      description: '管理和处理平台告警',
      stats: {
        total: '总告警',
        open: '待处理',
        acknowledged: '已认领',
        inProgress: '处理中',
        closed: '已关闭',
        critical: '严重告警'
      },
      filter: {
        alertType: '告警类型',
        severity: '严重程度',
        status: '状态'
      },
      table: {
        severity: '严重程度',
        title: '标题',
        customer: '客户',
        type: '类型',
        status: '状态',
        createdAt: '创建时间'
      },
      detail: {
        customer: '客户',
        alertType: '告警类型',
        currentValue: '当前值',
        threshold: '阈值',
        createdAt: '创建时间',
        acknowledgedBy: '认领人',
        closedBy: '关闭人'
      },
      actions: {
        acknowledge: '认领告警',
        inProgress: '标记处理中',
        close: '关闭告警',
        escalate: '升级告警',
        clickToView: '点击左侧告警查看详情'
      },
      statusPrefix: {
        total: '共',
        open: '条告警，',
        pending: '条待处理'
      }
    },
    policies: {
      title: '配额策略',
      description: '配置和管理套餐配额策略',
      buttons: {
        createPolicy: '创建策略',
        editPolicy: '编辑策略',
        edit: '编辑',
        delete: '删除'
      },
      fields: {
        plan: '套餐',
        apiCallThreshold: '调用量阈值',
        errorRateThreshold: '错误率阈值',
        responseTimeThreshold: '响应时长阈值',
        overageStrategy: '超额策略'
      },
      overageStrategies: {
        block: '阻止',
        throttle: '限流',
        notify: '通知'
      },
      modal: {
        createTitle: '创建配额策略',
        editTitle: '编辑配额策略',
        deleteConfirm: '确认删除此策略？'
      },
      list: {
        customers: '客户',
        usageRate: '配额使用率'
      }
    },
    auditLog: {
      title: '审计日志',
      description: '记录所有操作行为',
      stats: {
        totalRecords: '总记录数',
        todayActions: '今日操作',
        adminActions: '管理员操作',
        opsActions: '运维操作'
      },
      filter: {
        actorRole: '操作者角色',
        actionType: '操作类型'
      },
      table: {
        time: '时间',
        actor: '操作者',
        role: '角色',
        actionType: '操作类型',
        target: '目标',
        details: '详情'
      },
      sections: {
        actionDistribution: '操作类型分布',
        roleStats: '角色操作统计'
      },
      actionCount: '次操作'
    }
  },
  columns: {
    date: '日期',
    totalCalls: '总调用量',
    successfulCalls: '成功调用',
    failedCalls: '失败',
    errorRate: '错误率',
    responseTime: '响应时长',
    total: '总调用',
    success: '成功',
    failed: '失败',
    rank: '排名',
    customerName: '客户名称',
    plan: '套餐',
    apiCalls: '调用量',
    avgResponseTime: '平均响应时长',
    severity: '严重程度',
    title: '标题',
    customer: '客户',
    type: '类型',
    status: '状态',
    createdAt: '创建时间',
    time: '时间',
    actor: '操作者',
    role: '角色',
    actionType: '操作类型',
    target: '目标',
    details: '详情',
    operations: '操作',
    region: '地区',
    riskLevel: '风险等级'
  },
  units: {
    calls: '次调用',
    percent: '%',
    ms: 'ms'
  }
};
