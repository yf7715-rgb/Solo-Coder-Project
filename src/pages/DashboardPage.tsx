import { createSignal, createMemo, For, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { customers, usageTrends, alerts, policies } from '../data/mockData';
import {
  aggregateMetrics, filterAlerts, filterCustomers, filterUsageTrends,
  formatNumber, formatPercentage, getDateRange
} from '../utils';
import {
  PLANS, ALERT_STATUS, REGIONS, RISK_LEVELS
} from '../config/constants';

function getDefaultFilters() {
  const dateRange = getDateRange(7);
  return {
    startDate: dateRange.start,
    endDate: dateRange.end,
    plan: '',
    region: '',
    riskLevel: ''
  };
}

export function DashboardPage() {
  const [filters, setFilters] = createSignal(getDefaultFilters());

  const hasActiveFilters = createMemo(() => {
    const defaultFilters = getDefaultFilters();
    return filters().plan !== '' ||
           filters().region !== '' ||
           filters().riskLevel !== '' ||
           filters().startDate !== defaultFilters.startDate ||
           filters().endDate !== defaultFilters.endDate;
  });

  const clearFilters = () => {
    setFilters(getDefaultFilters());
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredCustomers = createMemo(() => {
    return filterCustomers(customers(), {
      plan: (filters().plan as any) || undefined,
      region: filters().region || undefined,
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

  const stats = createMemo(() => {
    const allCustomers = filteredCustomers();
    const activeCustomers = allCustomers.filter(c => c.status === 'active');
    const recentTrends = filteredTrends();
    const metrics = aggregateMetrics(recentTrends);
    const openAlerts = filterAlerts(alerts(), { status: 'open' });
    const allAlerts = alerts();

    return {
      totalCustomers: allCustomers.length,
      activeCustomers: activeCustomers.length,
      totalAPICalls: metrics.totalCalls,
      avgErrorRate: metrics.avgErrorRate,
      openAlerts: openAlerts.length,
      criticalAlerts: allAlerts.filter(a => a.severity === 'critical' && a.status !== 'closed').length,
      policies: policies().length,
      avgResponseTime: metrics.avgResponseTime
    };
  });

  const topCustomers = createMemo(() => {
    return [...filteredCustomers()].sort((a, b) => b.apiCalls - a.apiCalls).slice(0, 5);
  });

  const recentAlerts = createMemo(() => {
    return [...alerts()]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  });

  const planDistribution = createMemo(() => {
    const all = filteredCustomers();
    return {
      free: all.filter(c => c.plan === 'free').length,
      pro: all.filter(c => c.plan === 'pro').length,
      enterprise: all.filter(c => c.plan === 'enterprise').length,
      total: all.length
    };
  });

  return (
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">总览</h1>
          <p class="text-gray-500 mt-1">平台用量运营概览</p>
        </div>
        <div class="text-sm text-gray-500">
          数据范围: {filters().startDate} ~ {filters().endDate}
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-700">筛选条件</h3>
          <Show when={hasActiveFilters()}>
            <button
              onClick={clearFilters}
              class="text-sm text-gray-500 hover:text-gray-700"
            >
              清除筛选
            </button>
          </Show>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
        <StatCard
          title="总客户数"
          value={stats().totalCustomers}
          trend={`${stats().activeCustomers} 活跃`}
          icon="users"
          color="blue"
        />
        <StatCard
          title="API 调用总量"
          value={formatNumber(stats().totalAPICalls)}
          trend={`${filters().startDate} ~ ${filters().endDate}`}
          icon="api"
          color="green"
        />
        <StatCard
          title="平均错误率"
          value={formatPercentage(stats().avgErrorRate)}
          trend={stats().avgErrorRate > 3 ? '高于正常水平' : '正常'}
          icon="error"
          color={stats().avgErrorRate > 3 ? 'red' : 'green'}
        />
        <StatCard
          title="待处理告警"
          value={stats().openAlerts}
          trend={`${stats().criticalAlerts} 严重`}
          icon="bell"
          color={stats().criticalAlerts > 0 ? 'red' : 'yellow'}
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800">用量 TOP 客户</h3>
            <A href="/customers" class="text-sm text-blue-600 hover:text-blue-700">
              查看全部
            </A>
          </div>
          <div class="space-y-4">
            <For each={topCustomers()}>
              {(customer, index) => (
                <A
                  href={`/customers/${customer.id}`}
                  class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                      {index() + 1}
                    </div>
                    <div>
                      <p class="font-medium text-gray-800">{customer.name}</p>
                      <span class={`text-xs px-2 py-0.5 rounded-full ${PLANS[customer.plan].color}`}>
                        {PLANS[customer.plan].label}
                      </span>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-800">{formatNumber(customer.apiCalls)}</p>
                    <p class="text-xs text-gray-500">次调用</p>
                  </div>
                </A>
              )}
            </For>
            <Show when={topCustomers().length === 0}>
              <div class="text-center py-8 text-gray-400">
                暂无匹配的客户数据
              </div>
            </Show>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800">最近告警</h3>
            <A href="/alerts" class="text-sm text-blue-600 hover:text-blue-700">
              查看全部
            </A>
          </div>
          <div class="space-y-3">
            <For each={recentAlerts()}>
              {(alert) => (
                <A
                  href="/alerts"
                  class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div class={`w-3 h-3 mt-1.5 rounded-full ${
                    alert.severity === 'critical' ? 'bg-red-500' :
                    alert.severity === 'high' ? 'bg-orange-500' :
                    alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <p class="font-medium text-gray-800 truncate">{alert.title}</p>
                      <span class={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${ALERT_STATUS[alert.status].color}`}>
                        {ALERT_STATUS[alert.status].label}
                      </span>
                    </div>
                    <p class="text-sm text-gray-500 mt-1 truncate">{alert.customerName}</p>
                    <p class="text-xs text-gray-400 mt-1">{alert.createdAt}</p>
                  </div>
                </A>
              )}
            </For>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">套餐分布概览</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PlanDistribution
            plan="free"
            customers={planDistribution().free}
            total={planDistribution().total}
          />
          <PlanDistribution
            plan="pro"
            customers={planDistribution().pro}
            total={planDistribution().total}
          />
          <PlanDistribution
            plan="enterprise"
            customers={planDistribution().enterprise}
            total={planDistribution().total}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard(props: {
  title: string;
  value: string | number;
  trend: string;
  icon: string;
  color: 'blue' | 'green' | 'red' | 'yellow';
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600'
  };

  return (
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-gray-500">{props.title}</p>
          <p class="text-3xl font-bold text-gray-800 mt-2">{props.value}</p>
          <p class="text-sm text-gray-500 mt-1">{props.trend}</p>
        </div>
        <div class={`w-12 h-12 rounded-lg flex items-center justify-center ${colors[props.color]}`}>
          <Icon name={props.icon} />
        </div>
      </div>
    </div>
  );
}

function PlanDistribution(props: { plan: 'free' | 'pro' | 'enterprise'; customers: number; total: number }) {
  const percentage = props.total > 0 ? (props.customers / props.total * 100) : 0;

  return (
    <div>
      <div class="flex items-center justify-between mb-2">
        <span class={`text-sm px-2 py-1 rounded ${PLANS[props.plan].color}`}>
          {PLANS[props.plan].label}
        </span>
        <span class="text-sm text-gray-600">
          {props.customers} 客户 ({percentage.toFixed(1)}%)
        </span>
      </div>
      <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          class={`h-full rounded-full transition-all ${
            props.plan === 'free' ? 'bg-gray-400' :
            props.plan === 'pro' ? 'bg-blue-500' : 'bg-purple-500'
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

function Icon(props: { name: string }) {
  const icons: Record<string, string> = {
    users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    api: 'M13 10V3L4 14h7v7l9-11h-7z',
    error: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    bell: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
  };

  return (
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icons[props.name] || icons.users} />
    </svg>
  );
}
