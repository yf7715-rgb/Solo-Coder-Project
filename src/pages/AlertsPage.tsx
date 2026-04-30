import { createSignal, createMemo, For, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { alerts, setAlerts } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import {
  filterAlerts, generateAuditRecord, addAuditLog
} from '../utils';
import {
  ALERT_TYPES, ALERT_SEVERITIES, ALERT_STATUS
} from '../config/constants';
import type { Alert, AlertStatus as AlertStatusType } from '../types';

function getDefaultFilters() {
  return {
    type: '',
    severity: '',
    status: ''
  };
}

export function AlertsPage() {
  const { user, canPerformAction } = useAuth();

  const [filters, setFilters] = createSignal(getDefaultFilters());

  const hasActiveFilters = createMemo(() => {
    return filters().type !== '' || filters().severity !== '' || filters().status !== '';
  });

  const clearFilters = () => {
    setFilters(getDefaultFilters());
  };

  const [selectedAlert, setSelectedAlert] = createSignal<Alert | null>(null);

  const filteredAlerts = createMemo(() => {
    return filterAlerts(alerts(), {
      type: filters().type || undefined,
      severity: filters().severity || undefined,
      status: filters().status || undefined
    });
  });

  const stats = createMemo(() => {
    const all = alerts();
    return {
      total: all.length,
      open: all.filter(a => a.status === 'open').length,
      acknowledged: all.filter(a => a.status === 'acknowledged').length,
      inProgress: all.filter(a => a.status === 'in_progress').length,
      closed: all.filter(a => a.status === 'closed').length,
      critical: all.filter(a => a.severity === 'critical' && a.status !== 'closed').length
    };
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const updateAlertStatus = (alertId: string, newStatus: AlertStatusType) => {
    if (!user()) return;

    setAlerts(prev => prev.map(alert => {
      if (alert.id === alertId) {
        const updated = { ...alert, status: newStatus };

        if (newStatus === 'acknowledged') {
          updated.acknowledgedBy = user()!.name;
          updated.acknowledgedAt = new Date().toISOString().split('T')[0];
        }
        if (newStatus === 'closed') {
          updated.closedBy = user()!.name;
          updated.closedAt = new Date().toISOString().split('T')[0];
        }
        if (newStatus === 'escalated') {
          updated.escalatedBy = user()!.name;
          updated.escalatedAt = new Date().toISOString().split('T')[0];
        }

        let action: 'alert_acknowledge' | 'alert_close' | 'alert_escalate';
        let actionLabel: string;

        if (newStatus === 'acknowledged') {
          action = 'alert_acknowledge';
          actionLabel = '认领了告警';
        } else if (newStatus === 'closed') {
          action = 'alert_close';
          actionLabel = '关闭了告警';
        } else if (newStatus === 'escalated') {
          action = 'alert_escalate';
          actionLabel = '升级了告警';
        } else {
          return alert;
        }

        const auditRecord = generateAuditRecord(
          action,
          { id: user()!.id, name: user()!.name, role: user()!.role },
          `${actionLabel}: ${alert.title}`,
          { id: alert.id, type: 'alert', name: alert.title }
        );
        addAuditLog(auditRecord);

        return updated;
      }
      return alert;
    }));

    setSelectedAlert(null);
  };

  return (
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">告警中心</h1>
          <p class="text-gray-500 mt-1">管理和处理平台告警</p>
        </div>
        <div class="text-sm text-gray-500">
          共 {stats().total} 条告警，{stats().open} 条待处理
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          label="待处理"
          value={stats().open}
          color="red"
        />
        <StatCard
          label="已认领"
          value={stats().acknowledged}
          color="yellow"
        />
        <StatCard
          label="处理中"
          value={stats().inProgress}
          color="blue"
        />
        <StatCard
          label="已关闭"
          value={stats().closed}
          color="green"
        />
        <StatCard
          label="严重告警"
          value={stats().critical}
          color="red"
        />
        <StatCard
          label="总告警"
          value={stats().total}
          color="gray"
        />
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs text-gray-500 mb-1">告警类型</label>
            <select
              value={filters().type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">全部</option>
              {Object.entries(ALERT_TYPES).map(([key, val]) => (
                <option value={key}>{val.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">严重程度</label>
            <select
              value={filters().severity}
              onChange={(e) => handleFilterChange('severity', e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">全部</option>
              {Object.entries(ALERT_SEVERITIES).map(([key, val]) => (
                <option value={key}>{val.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">状态</label>
            <select
              value={filters().status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">全部</option>
              {Object.entries(ALERT_STATUS).map(([key, val]) => (
                <option value={key}>{val.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">严重程度</th>
                  <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">标题</th>
                  <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">客户</th>
                  <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">类型</th>
                  <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">状态</th>
                  <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">创建时间</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <For each={filteredAlerts()}>
                  {(alert) => (
                    <tr
                      class={`hover:bg-gray-50 cursor-pointer ${selectedAlert()?.id === alert.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedAlert(alert)}
                    >
                      <td class="py-3 px-4">
                        <span class={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${ALERT_SEVERITIES[alert.severity].color}`}>
                          {ALERT_SEVERITIES[alert.severity].label}
                        </span>
                      </td>
                      <td class="py-3 px-4">
                        <p class="font-medium text-gray-800">{alert.title}</p>
                        <p class="text-xs text-gray-500 truncate max-w-xs">{alert.description}</p>
                      </td>
                      <td class="py-3 px-4">
                        <A
                          href={`/customers/${alert.customerId}`}
                          class="text-sm text-blue-600 hover:text-blue-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {alert.customerName}
                        </A>
                      </td>
                      <td class="py-3 px-4">
                        <span class={`text-xs px-2 py-1 rounded-full ${ALERT_TYPES[alert.type].color}`}>
                          {ALERT_TYPES[alert.type].label}
                        </span>
                      </td>
                      <td class="py-3 px-4">
                        <span class={`text-xs px-2 py-1 rounded-full ${ALERT_STATUS[alert.status].color}`}>
                          {ALERT_STATUS[alert.status].label}
                        </span>
                      </td>
                      <td class="py-3 px-4 text-sm text-gray-500">
                        {alert.createdAt}
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <Show when={selectedAlert()} fallback={
            <div class="flex flex-col items-center justify-center h-64 text-gray-400">
              <svg class="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <p>点击左侧告警查看详情</p>
            </div>
          }>
            <div class="space-y-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-800">{selectedAlert()!.title}</h3>
                <div class="flex items-center gap-2 mt-2">
                  <span class={`px-2 py-1 rounded-full text-xs ${ALERT_SEVERITIES[selectedAlert()!.severity].color}`}>
                    {ALERT_SEVERITIES[selectedAlert()!.severity].label}
                  </span>
                  <span class={`px-2 py-1 rounded-full text-xs ${ALERT_STATUS[selectedAlert()!.status].color}`}>
                    {ALERT_STATUS[selectedAlert()!.status].label}
                  </span>
                </div>
              </div>

              <div class="p-4 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-600">{selectedAlert()!.description}</p>
              </div>

              <div class="space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">客户</span>
                  <A
                    href={`/customers/${selectedAlert()!.customerId}`}
                    class="text-blue-600 hover:text-blue-700"
                  >
                    {selectedAlert()!.customerName}
                  </A>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">告警类型</span>
                  <span class="text-gray-800">{ALERT_TYPES[selectedAlert()!.type].label}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">当前值</span>
                  <span class="text-red-600 font-medium">{selectedAlert()!.currentValue}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">阈值</span>
                  <span class="text-gray-800">{selectedAlert()!.threshold}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">创建时间</span>
                  <span class="text-gray-800">{selectedAlert()!.createdAt}</span>
                </div>
                <Show when={selectedAlert()!.acknowledgedBy}>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-500">认领人</span>
                    <span class="text-gray-800">{selectedAlert()!.acknowledgedBy}</span>
                  </div>
                </Show>
                <Show when={selectedAlert()!.closedBy}>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-500">关闭人</span>
                    <span class="text-gray-800">{selectedAlert()!.closedBy}</span>
                  </div>
                </Show>
              </div>

              <Show when={canPerformAction('manage') && selectedAlert()!.status !== 'closed'}>
                <div class="pt-4 border-t border-gray-200">
                  <p class="text-sm text-gray-500 mb-3">操作</p>
                  <div class="space-y-2">
                    <Show when={selectedAlert()!.status === 'open'}>
                      <button
                        onClick={() => updateAlertStatus(selectedAlert()!.id, 'acknowledged')}
                        class="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                      >
                        认领告警
                      </button>
                    </Show>
                    <Show when={selectedAlert()!.status === 'open' || selectedAlert()!.status === 'acknowledged'}>
                      <button
                        onClick={() => updateAlertStatus(selectedAlert()!.id, 'in_progress')}
                        class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        标记处理中
                      </button>
                    </Show>
                    <Show when={selectedAlert()!.status !== 'closed'}>
                      <button
                        onClick={() => updateAlertStatus(selectedAlert()!.id, 'closed')}
                        class="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                      >
                        关闭告警
                      </button>
                    </Show>
                    <Show when={selectedAlert()!.status !== 'closed' && selectedAlert()!.status !== 'escalated'}>
                      <button
                        onClick={() => updateAlertStatus(selectedAlert()!.id, 'escalated')}
                        class="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                      >
                        升级告警
                      </button>
                    </Show>
                  </div>
                </div>
              </Show>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}

function StatCard(props: { label: string; value: number; color: string }) {
  const colorClasses: Record<string, string> = {
    red: 'bg-red-50 text-red-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    gray: 'bg-gray-50 text-gray-700'
  };

  return (
    <div class={`p-4 rounded-xl ${colorClasses[props.color]}`}>
      <p class="text-2xl font-bold">{props.value}</p>
      <p class="text-sm opacity-75">{props.label}</p>
    </div>
  );
}
