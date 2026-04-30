import { createSignal, createMemo, For, Show } from 'solid-js';
import { customers, usageTrends } from '../data/mockData';
import { 
  filterCustomers, filterUsageTrends, aggregateMetrics, aggregateByPlan,
  formatNumber, formatPercentage, getDateRange
} from '../utils';
import { 
  PLANS, RISK_LEVELS, CUSTOMER_TYPES, REGIONS 
} from '../config/constants';

export function UsagePage() {
  const dateRange = getDateRange(30);
  
  const [filters, setFilters] = createSignal({
    startDate: dateRange.start,
    endDate: dateRange.end,
    customerType: '',
    plan: '',
    region: '',
    workspace: '',
    riskLevel: ''
  });

  const filteredCustomers = createMemo(() => {
    return filterCustomers(customers(), {
      type: filters().customerType || undefined,
      plan: (filters().plan as any) || undefined,
      region: filters().region || undefined,
      workspace: filters().workspace || undefined,
      riskLevel: filters().riskLevel || undefined
    });
  });

  const filteredCustomerIds = createMemo(() => {
    return filteredCustomers().map(c => c.id);
  });

  const filteredTrends = createMemo(() => {
    return filterUsageTrends(usageTrends(), {
      startDate: filters().startDate,
      endDate: filters().endDate,
      customerIds: filteredCustomerIds()
    });
  });

  const metrics = createMemo(() => {
    return aggregateMetrics(filteredTrends());
  });

  const planAggregation = createMemo(() => {
    return aggregateByPlan(filteredCustomers(), filteredTrends());
  });

  const topCustomersByUsage = createMemo(() => {
    const customerIds = [...new Set(filteredTrends().map(t => t.customerId))];
    const customerMetrics = customerIds.map(id => {
      const customerTrends = filteredTrends().filter(t => t.customerId === id);
      const customerMetrics = aggregateMetrics(customerTrends);
      const customer = customers().find(c => c.id === id);
      return {
        id,
        name: customer?.name || id,
        plan: customer?.plan || 'free',
        totalCalls: customerMetrics.totalCalls,
        errorRate: customerMetrics.avgErrorRate,
        responseTime: customerMetrics.avgResponseTime
      };
    });
    
    return customerMetrics.sort((a, b) => b.totalCalls - a.totalCalls).slice(0, 10);
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">用量分析</h1>
        <p class="text-gray-500 mt-1">分析和监控平台用量数据</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-sm font-medium text-gray-700 mb-4">筛选条件</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label class="block text-xs text-gray-500 mb-1">开始日期</label>
            <input
              type="date"
              value={filters().startDate}
              onInput={(e) => handleFilterChange('startDate', e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">结束日期</label>
            <input
              type="date"
              value={filters().endDate}
              onInput={(e) => handleFilterChange('endDate', e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">客户类型</label>
            <select
              value={filters().customerType}
              onChange={(e) => handleFilterChange('customerType', e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">全部</option>
              {Object.entries(CUSTOMER_TYPES).map(([key, val]) => (
                <option value={key}>{val.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">套餐</label>
            <select
              value={filters().plan}
              onChange={(e) => handleFilterChange('plan', e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">全部</option>
              {Object.entries(PLANS).map(([key, val]) => (
                <option value={key}>{val.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">地区</label>
            <select
              value={filters().region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">全部</option>
              {Object.entries(REGIONS).map(([key, val]) => (
                <option value={key}>{val.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">风险等级</label>
            <select
              value={filters().riskLevel}
              onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">全部</option>
              {Object.entries(RISK_LEVELS).map(([key, val]) => (
                <option value={key}>{val.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="总调用量"
          value={formatNumber(metrics().totalCalls)}
          subtitle="筛选范围内"
          icon="calls"
        />
        <MetricCard
          title="成功调用"
          value={formatNumber(metrics().totalSuccessful)}
          subtitle={`占比 ${formatPercentage(metrics().totalCalls > 0 ? (metrics().totalSuccessful / metrics().totalCalls * 100) : 0)}`}
          icon="success"
        />
        <MetricCard
          title="平均错误率"
          value={formatPercentage(metrics().avgErrorRate)}
          subtitle={metrics().avgErrorRate > 3 ? '高于阈值' : '正常'}
          icon="error"
        />
        <MetricCard
          title="平均响应时长"
          value={`${metrics().avgResponseTime.toFixed(0)}ms`}
          subtitle={`峰值 ${metrics().peakCalls.toFixed(0)} 次/日`}
          icon="time"
        />
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">套餐用量分布</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <For each={['free', 'pro', 'enterprise'] as const}>
            {(plan) => {
              const data = planAggregation()[plan];
              return (
                <div class="border border-gray-200 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-4">
                    <span class={`px-3 py-1 rounded-full text-sm ${PLANS[plan].color}`}>
                      {PLANS[plan].label}
                    </span>
                    <span class="text-sm text-gray-500">{data.customers} 客户</span>
                  </div>
                  <div class="space-y-3">
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500">总调用量</span>
                      <span class="font-medium">{formatNumber(data.totalCalls)}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500">平均错误率</span>
                      <span class={`font-medium ${data.avgErrorRate > 3 ? 'text-red-600' : 'text-green-600'}`}>
                        {formatPercentage(data.avgErrorRate)}
                      </span>
                    </div>
                    <div>
                      <div class="flex justify-between text-xs text-gray-500 mb-1">
                        <span>配额使用率</span>
                        <span>{Math.min(100, Math.floor(data.totalCalls / (plan === 'free' ? 1000 : plan === 'pro' ? 10000 : 100000) * 100))}%</span>
                      </div>
                      <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          class={`h-full rounded-full ${
                            plan === 'free' ? 'bg-gray-500' :
                            plan === 'pro' ? 'bg-blue-500' : 'bg-purple-500'
                          }`}
                          style={{
                            width: `${Math.min(100, Math.floor(data.totalCalls / (plan === 'free' ? 1000 : plan === 'pro' ? 10000 : 100000) * 100))}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">用量排行 TOP 10</h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">排名</th>
                <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">客户名称</th>
                <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">套餐</th>
                <th class="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">总调用量</th>
                <th class="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">错误率</th>
                <th class="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">平均响应时长</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <For each={topCustomersByUsage()}>
                {(customer, index) => (
                  <tr class="hover:bg-gray-50">
                    <td class="py-3 px-4">
                      <span class={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                        index() < 3 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {index() + 1}
                      </span>
                    </td>
                    <td class="py-3 px-4 font-medium text-gray-800">{customer.name}</td>
                    <td class="py-3 px-4">
                      <span class={`text-xs px-2 py-1 rounded-full ${PLANS[customer.plan].color}`}>
                        {PLANS[customer.plan].label}
                      </span>
                    </td>
                    <td class="py-3 px-4 text-right font-medium text-gray-800">
                      {formatNumber(customer.totalCalls)}
                    </td>
                    <td class="py-3 px-4 text-right">
                      <span class={customer.errorRate > 3 ? 'text-red-600' : 'text-green-600'}>
                        {formatPercentage(customer.errorRate)}
                      </span>
                    </td>
                    <td class="py-3 px-4 text-right text-gray-600">
                      {customer.responseTime.toFixed(0)}ms
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">用量趋势明细</h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">日期</th>
                <th class="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">总调用</th>
                <th class="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">成功</th>
                <th class="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">失败</th>
                <th class="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">错误率</th>
                <th class="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">响应时长</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <For each={filteredTrends().slice(0, 20)}>
                {(trend) => (
                  <tr class="hover:bg-gray-50">
                    <td class="py-3 px-4 text-gray-800">{trend.date}</td>
                    <td class="py-3 px-4 text-right font-medium">{formatNumber(trend.apiCalls)}</td>
                    <td class="py-3 px-4 text-right text-green-600">{formatNumber(trend.successfulCalls)}</td>
                    <td class="py-3 px-4 text-right text-red-600">{formatNumber(trend.failedCalls)}</td>
                    <td class="py-3 px-4 text-right">
                      <span class={trend.errorRate > 3 ? 'text-red-600' : 'text-gray-600'}>
                        {formatPercentage(trend.errorRate)}
                      </span>
                    </td>
                    <td class="py-3 px-4 text-right text-gray-600">{trend.avgResponseTime.toFixed(0)}ms</td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
        <Show when={filteredTrends().length > 20}>
          <p class="text-sm text-gray-500 mt-4 text-center">
            仅展示前 20 条记录，共 {filteredTrends().length} 条
          </p>
        </Show>
      </div>
    </div>
  );
}

function MetricCard(props: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-gray-500">{props.title}</p>
          <p class="text-3xl font-bold text-gray-800 mt-2">{props.value}</p>
          <p class="text-sm text-gray-500 mt-1">{props.subtitle}</p>
        </div>
        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
          <Icon name={props.icon} />
        </div>
      </div>
    </div>
  );
}

function Icon(props: { name: string }) {
  const icons: Record<string, string> = {
    calls: 'M13 10V3L4 14h7v7l9-11h-7z',
    success: 'M5 13l4 4L19 7',
    error: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    time: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  };

  return (
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icons[props.name] || icons.calls} />
    </svg>
  );
}
