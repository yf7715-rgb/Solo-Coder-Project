import { createMemo, For } from 'solid-js';
import { A } from '@solidjs/router';
import { customers, usageTrends, alerts, policies } from '../data/mockData';
import { aggregateMetrics, filterAlerts, formatNumber, formatPercentage, getDateRange } from '../utils';
import { PLANS, ALERT_STATUS } from '../config/constants';

export function DashboardPage() {
  const dateRange = getDateRange(7);
  
  const stats = createMemo(() => {
    const allCustomers = customers();
    const activeCustomers = allCustomers.filter(c => c.status === 'active');
    const recentTrends = usageTrends().filter(t => t.date >= dateRange.start && t.date <= dateRange.end);
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
    return [...customers()].sort((a, b) => b.apiCalls - a.apiCalls).slice(0, 5);
  });

  const recentAlerts = createMemo(() => {
    return [...alerts()]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  });

  return (
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">总览</h1>
          <p class="text-gray-500 mt-1">平台用量运营概览</p>
        </div>
        <div class="text-sm text-gray-500">
          数据范围: {dateRange.start} ~ {dateRange.end}
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
          trend="近 7 天"
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
            customers={customers().filter(c => c.plan === 'free').length}
            total={customers().length}
          />
          <PlanDistribution
            plan="pro"
            customers={customers().filter(c => c.plan === 'pro').length}
            total={customers().length}
          />
          <PlanDistribution
            plan="enterprise"
            customers={customers().filter(c => c.plan === 'enterprise').length}
            total={customers().length}
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
