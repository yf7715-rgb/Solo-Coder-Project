import { createMemo, For, Show } from 'solid-js';
import { A, useParams, useNavigate } from '@solidjs/router';
import { customers, usageTrends, alerts, policies } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { 
  filterAlerts, filterUsageTrends, findMatchingPolicy,
  formatNumber, formatPercentage, generateAuditRecord, addAuditLog
} from '../utils';
import { 
  PLANS, CUSTOMER_STATUS, RISK_LEVELS, ALERT_STATUS, CUSTOMER_TYPES, REGIONS
} from '../config/constants';

export function CustomerDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const customer = createMemo(() => {
    const found = customers().find(c => c.id === params.id);
    if (found && user()) {
      const auditRecord = generateAuditRecord(
        'customer_view',
        { id: user()!.id, name: user()!.name, role: user()!.role },
        `查看了客户详情: ${found.name}`,
        { id: found.id, type: 'customer', name: found.name }
      );
      addAuditLog(auditRecord);
    }
    return found;
  });

  const customerTrends = createMemo(() => {
    if (!customer()) return [];
    return filterUsageTrends(usageTrends(), { customerIds: [customer()!.id] });
  });

  const customerAlerts = createMemo(() => {
    if (!customer()) return [];
    return filterAlerts(alerts(), { customerId: customer()!.id }).slice(0, 5);
  });

  const matchingPolicy = createMemo(() => {
    if (!customer()) return null;
    return findMatchingPolicy(policies(), customer()!.plan);
  });

  const errorDistribution = createMemo(() => {
    const trends = customerTrends();
    const totalFailed = trends.reduce((sum, t) => sum + t.failedCalls, 0);
    if (totalFailed === 0) return [];
    
    return [
      { type: '4xx Client Error', count: Math.floor(totalFailed * 0.45), percentage: 45 },
      { type: '5xx Server Error', count: Math.floor(totalFailed * 0.30), percentage: 30 },
      { type: 'Timeout', count: Math.floor(totalFailed * 0.15), percentage: 15 },
      { type: 'Rate Limit', count: Math.floor(totalFailed * 0.10), percentage: 10 }
    ];
  });

  const featureUsage = createMemo(() => {
    if (!customer()) return [];
    return [
      { name: 'Core API', calls: customer()!.apiCalls * 0.5, limit: customer()!.apiLimit * 0.6 },
      { name: 'Analytics', calls: customer()!.apiCalls * 0.25, limit: customer()!.apiLimit * 0.3 },
      { name: 'Search', calls: customer()!.apiCalls * 0.15, limit: customer()!.apiLimit * 0.2 },
      { name: 'Webhooks', calls: customer()!.apiCalls * 0.10, limit: customer()!.apiLimit * 0.1 }
    ];
  });

  return (
    <Show when={customer()} fallback={
      <div class="flex flex-col items-center justify-center h-96">
        <p class="text-gray-500 text-lg mb-4">客户不存在</p>
        <A href="/customers" class="text-blue-600 hover:text-blue-700">
          返回客户列表
        </A>
      </div>
    }>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 class="text-2xl font-bold text-gray-800">{customer()!.name}</h1>
              <p class="text-gray-500 mt-1">{customer()!.email}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class={`px-3 py-1 rounded-full text-sm ${PLANS[customer()!.plan].color}`}>
              {PLANS[customer()!.plan].label}
            </span>
            <span class={`px-3 py-1 rounded-full text-sm ${CUSTOMER_STATUS[customer()!.status].color}`}>
              {CUSTOMER_STATUS[customer()!.status].label}
            </span>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">基础信息</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p class="text-xs text-gray-500 mb-1">客户 ID</p>
              <p class="font-medium text-gray-800 font-mono text-sm">{customer()!.id}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">公司</p>
              <p class="font-medium text-gray-800">{customer()!.company}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">客户类型</p>
              <p class="font-medium text-gray-800">{CUSTOMER_TYPES[customer()!.type]?.label || customer()!.type}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">地区</p>
              <p class="font-medium text-gray-800">{REGIONS[customer()!.region]?.label || customer()!.region}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">工作空间</p>
              <p class="font-medium text-gray-800">{customer()!.workspace}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">风险等级</p>
              <span class={`px-2 py-1 rounded-full text-xs ${RISK_LEVELS[customer()!.riskLevel].color}`}>
                {RISK_LEVELS[customer()!.riskLevel].label}
              </span>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">创建时间</p>
              <p class="font-medium text-gray-800">{customer()!.createdAt}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">最近活跃</p>
              <p class="font-medium text-gray-800">{customer()!.lastActive}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="总调用量"
            value={formatNumber(customer()!.apiCalls)}
            subtitle={`配额 ${formatNumber(customer()!.apiLimit)}`}
            percentage={customer()!.apiCalls / customer()!.apiLimit * 100}
          />
          <MetricCard
            title="错误率"
            value={formatPercentage(customer()!.errorRate)}
            subtitle={matchingPolicy() ? `阈值 ${matchingPolicy()!.errorRateThreshold}%` : ''}
            percentage={customer()!.errorRate}
            warning={customer()!.errorRate > (matchingPolicy()?.errorRateThreshold || 5)}
          />
          <MetricCard
            title="平均响应时间"
            value={`${customer()!.avgResponseTime.toFixed(0)}ms`}
            subtitle={matchingPolicy() ? `阈值 ${matchingPolicy()!.responseTimeThreshold}ms` : ''}
            percentage={customer()!.avgResponseTime / (matchingPolicy()?.responseTimeThreshold || 500) * 100}
          />
          <MetricCard
            title="活跃 API Key"
            value={customer()!.apiKeys.filter(k => k.status === 'active').length}
            subtitle={`共 ${customer()!.apiKeys.length} 个`}
            percentage={customer()!.apiKeys.filter(k => k.status === 'active').length / customer()!.apiKeys.length * 100}
          />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">用量趋势</h3>
            <div class="space-y-3">
              <For each={customerTrends().slice(-10).reverse()}>
                {(trend) => (
                  <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span class="text-sm text-gray-600">{trend.date}</span>
                    <div class="flex items-center gap-4">
                      <span class="text-sm font-medium">{formatNumber(trend.apiCalls)} 次</span>
                      <span class={`text-xs ${trend.errorRate > 3 ? 'text-red-600' : 'text-green-600'}`}>
                        {formatPercentage(trend.errorRate)}
                      </span>
                      <span class="text-xs text-gray-500">{trend.avgResponseTime.toFixed(0)}ms</span>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">API Key 列表</h3>
            <div class="space-y-3">
              <For each={customer()!.apiKeys}>
                {(key) => (
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p class="font-medium text-gray-800">{key.name}</p>
                      <p class="text-xs text-gray-500 font-mono mt-1">
                        {key.key.substring(0, 15)}...
                      </p>
                    </div>
                    <div class="flex items-center gap-3">
                      <span class={`text-xs px-2 py-1 rounded-full ${
                        key.status === 'active' ? 'bg-green-100 text-green-700' :
                        key.status === 'revoked' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {key.status === 'active' ? '活跃' : key.status === 'revoked' ? '已吊销' : '已过期'}
                      </span>
                      <span class="text-xs text-gray-500">
                        最后使用: {key.lastUsed}
                      </span>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">功能用量分布</h3>
            <div class="space-y-4">
              <For each={featureUsage()}>
                {(feature) => (
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-700">{feature.name}</span>
                      <span class="text-gray-500">
                        {formatNumber(feature.calls)} / {formatNumber(feature.limit)}
                      </span>
                    </div>
                    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        class={`h-full rounded-full transition-all ${
                          feature.calls / feature.limit > 0.8 ? 'bg-red-500' :
                          feature.calls / feature.limit > 0.5 ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min(100, feature.calls / feature.limit * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">错误分布</h3>
            <Show when={errorDistribution().length > 0} fallback={
              <p class="text-gray-500 text-center py-8">暂无错误数据</p>
            }>
              <div class="space-y-3">
                <For each={errorDistribution()}>
                  {(error) => (
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-gray-700">{error.type}</span>
                      <div class="flex items-center gap-3">
                        <div class="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            class="h-full bg-red-500 rounded-full"
                            style={{ width: `${error.percentage}%` }}
                          ></div>
                        </div>
                        <span class="text-sm text-gray-500 w-16 text-right">
                          {error.percentage}%
                        </span>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </Show>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800">关联告警</h3>
            <A href="/alerts" class="text-sm text-blue-600 hover:text-blue-700">
              查看全部
            </A>
          </div>
          <Show when={customerAlerts().length > 0} fallback={
            <p class="text-gray-500 text-center py-8">暂无关联告警</p>
          }>
            <div class="space-y-3">
              <For each={customerAlerts()}>
                {(alert) => (
                  <A
                    href="/alerts"
                    class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div class="flex items-center gap-3">
                      <div class={`w-3 h-3 rounded-full ${
                        alert.severity === 'critical' ? 'bg-red-500' :
                        alert.severity === 'high' ? 'bg-orange-500' :
                        alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <p class="font-medium text-gray-800">{alert.title}</p>
                        <p class="text-xs text-gray-500">{alert.description}</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <span class={`text-xs px-2 py-1 rounded-full ${ALERT_STATUS[alert.status].color}`}>
                        {ALERT_STATUS[alert.status].label}
                      </span>
                      <span class="text-xs text-gray-400">{alert.createdAt}</span>
                    </div>
                  </A>
                )}
              </For>
            </div>
          </Show>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">关联配额策略</h3>
          <Show when={matchingPolicy()}>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="p-4 bg-blue-50 rounded-lg">
                <p class="text-xs text-blue-600 mb-1">调用量阈值</p>
                <p class="text-xl font-bold text-blue-800">{formatNumber(matchingPolicy()!.apiCallThreshold)}</p>
              </div>
              <div class="p-4 bg-orange-50 rounded-lg">
                <p class="text-xs text-orange-600 mb-1">错误率阈值</p>
                <p class="text-xl font-bold text-orange-800">{matchingPolicy()!.errorRateThreshold}%</p>
              </div>
              <div class="p-4 bg-yellow-50 rounded-lg">
                <p class="text-xs text-yellow-600 mb-1">响应时长阈值</p>
                <p class="text-xl font-bold text-yellow-800">{matchingPolicy()!.responseTimeThreshold}ms</p>
              </div>
              <div class="p-4 bg-purple-50 rounded-lg">
                <p class="text-xs text-purple-600 mb-1">超额策略</p>
                <p class="text-xl font-bold text-purple-800">
                  {matchingPolicy()!.overageStrategy === 'block' ? '阻断' :
                   matchingPolicy()!.overageStrategy === 'throttle' ? '限流' :
                   matchingPolicy()!.overageStrategy === 'notify' ? '通知' : '自动升级'}
                </p>
              </div>
            </div>
          </Show>
        </div>
      </div>
    </Show>
  );
}

function MetricCard(props: {
  title: string;
  value: string | number;
  subtitle: string;
  percentage: number;
  warning?: boolean;
}) {
  return (
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <p class="text-sm text-gray-500">{props.title}</p>
      <p class={`text-3xl font-bold mt-2 ${props.warning ? 'text-red-600' : 'text-gray-800'}`}>
        {props.value}
      </p>
      <p class="text-sm text-gray-500 mt-1">{props.subtitle}</p>
      <div class="mt-3">
        <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            class={`h-full rounded-full transition-all ${
              props.percentage > 90 ? 'bg-red-500' :
              props.percentage > 70 ? 'bg-yellow-500' : 'bg-blue-500'
            }`}
            style={{ width: `${Math.min(100, props.percentage)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
