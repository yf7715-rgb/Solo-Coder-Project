import { createSignal, createMemo, For, Show } from 'solid-js';
import { auditLogs } from '../data/mockData';
import { filterAuditLogs, getDateRange } from '../utils';
import { ROLES, AUDIT_ACTIONS } from '../config/constants';
import type { AuditAction } from '../types';

export function AuditLogPage() {
  const dateRange = getDateRange(30);
  
  const [filters, setFilters] = createSignal({
    actorRole: '',
    action: '',
    startDate: dateRange.start,
    endDate: dateRange.end
  });

  const filteredLogs = createMemo(() => {
    return filterAuditLogs(auditLogs(), {
      actorRole: filters().actorRole || undefined,
      action: filters().action || undefined,
      startDate: filters().startDate,
      endDate: filters().endDate
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  });

  const stats = createMemo(() => {
    const all = auditLogs();
    const today = new Date().toISOString().split('T')[0];
    
    return {
      total: all.length,
      today: all.filter(l => l.createdAt === today).length,
      byRole: {
        admin: all.filter(l => l.actorRole === 'admin').length,
        ops: all.filter(l => l.actorRole === 'ops').length,
        viewer: all.filter(l => l.actorRole === 'viewer').length
      }
    };
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">审计日志</h1>
        <p class="text-gray-500 mt-1">记录所有操作行为</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="总记录数" value={stats().total} color="blue" />
        <StatCard label="今日操作" value={stats().today} color="green" />
        <StatCard 
          label="管理员操作" 
          value={stats().byRole.admin} 
          color="purple" 
        />
        <StatCard 
          label="运维操作" 
          value={stats().byRole.ops} 
          color="yellow" 
        />
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-sm font-medium text-gray-700 mb-4">筛选条件</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <label class="block text-xs text-gray-500 mb-1">操作者角色</label>
            <select
              value={filters().actorRole}
              onChange={(e) => handleFilterChange('actorRole', e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">全部</option>
              {Object.entries(ROLES).map(([key, val]) => (
                <option value={key}>{val.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">操作类型</label>
            <select
              value={filters().action}
              onChange={(e) => handleFilterChange('action', e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">全部</option>
              {Object.entries(AUDIT_ACTIONS).map(([key, val]) => (
                <option value={key}>{val.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">时间</th>
                <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">操作者</th>
                <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">角色</th>
                <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">操作类型</th>
                <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">目标</th>
                <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">详情</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <For each={filteredLogs()}>
                {(log) => (
                  <tr class="hover:bg-gray-50">
                    <td class="py-3 px-4 text-sm text-gray-600">
                      {log.createdAt}
                    </td>
                    <td class="py-3 px-4">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                          {log.actorName.charAt(0)}
                        </div>
                        <div>
                          <p class="text-sm font-medium text-gray-800">{log.actorName}</p>
                          <p class="text-xs text-gray-500">ID: {log.actorId}</p>
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-4">
                      <span class={`px-2 py-1 rounded-full text-xs ${
                        log.actorRole === 'admin' ? 'bg-purple-100 text-purple-700' :
                        log.actorRole === 'ops' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {ROLES[log.actorRole]?.label || log.actorRole}
                      </span>
                    </td>
                    <td class="py-3 px-4">
                      <ActionBadge action={log.action} />
                    </td>
                    <td class="py-3 px-4">
                      <Show when={log.targetName} fallback={
                        <span class="text-gray-400">-</span>
                      }>
                        <div>
                          <p class="text-sm font-medium text-gray-800">{log.targetName}</p>
                          <Show when={log.targetType}>
                            <p class="text-xs text-gray-500">{log.targetType}</p>
                          </Show>
                        </div>
                      </Show>
                    </td>
                    <td class="py-3 px-4">
                      <p class="text-sm text-gray-600 max-w-xs truncate" title={log.details}>
                        {log.details}
                      </p>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
        <Show when={filteredLogs().length === 0}>
          <div class="py-12 text-center text-gray-500">
            <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>暂无审计记录</p>
          </div>
        </Show>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">操作类型分布</h3>
          <div class="space-y-3">
            <For each={Object.entries(AUDIT_ACTIONS).slice(0, 8)}>
              {([key, val]) => {
                const count = auditLogs().filter(l => l.action === key).length;
                const total = auditLogs().length;
                const percentage = total > 0 ? (count / total * 100) : 0;
                
                return (
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-700">{val.label}</span>
                      <span class="text-gray-500">{count} 次</span>
                    </div>
                    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              }}
            </For>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">角色操作统计</h3>
          <div class="space-y-4">
            <For each={Object.entries(ROLES)}>
              {([role, config]) => {
                const roleLogs = auditLogs().filter(l => l.actorRole === role);
                const total = auditLogs().length;
                const percentage = total > 0 ? (roleLogs.length / total * 100) : 0;
                
                const actionCounts: Record<string, number> = {};
                for (const log of roleLogs) {
                  actionCounts[log.action] = (actionCounts[log.action] || 0) + 1;
                }
                const topActions = Object.entries(actionCounts)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3);
                
                return (
                  <div class="p-4 bg-gray-50 rounded-lg">
                    <div class="flex items-center justify-between mb-2">
                      <span class={`px-3 py-1 rounded-full text-sm ${
                        role === 'admin' ? 'bg-purple-100 text-purple-700' :
                        role === 'ops' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {config.label}
                      </span>
                      <span class="text-sm text-gray-500">{roleLogs.length} 次操作</span>
                    </div>
                    <div class="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <div
                        class={`h-full rounded-full transition-all ${
                          role === 'admin' ? 'bg-purple-500' :
                          role === 'ops' ? 'bg-blue-500' :
                          'bg-gray-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <Show when={topActions.length > 0}>
                      <div class="flex flex-wrap gap-2">
                        <For each={topActions}>
                          {([action, count]) => (
                            <span class="text-xs text-gray-500">
                              {AUDIT_ACTIONS[action as AuditAction]?.label || action}: {count}
                            </span>
                          )}
                        </For>
                      </div>
                    </Show>
                  </div>
                );
              }}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard(props: { label: string; value: number; color: string }) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    purple: 'bg-purple-50 text-purple-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    red: 'bg-red-50 text-red-700'
  };

  return (
    <div class={`p-4 rounded-xl ${colorClasses[props.color]}`}>
      <p class="text-3xl font-bold">{props.value}</p>
      <p class="text-sm opacity-75">{props.label}</p>
    </div>
  );
}

function ActionBadge(props: { action: AuditAction }) {
  const actionColors: Record<AuditAction, string> = {
    login: 'bg-green-100 text-green-700',
    logout: 'bg-gray-100 text-gray-700',
    filter_save: 'bg-blue-100 text-blue-700',
    filter_delete: 'bg-orange-100 text-orange-700',
    alert_acknowledge: 'bg-yellow-100 text-yellow-700',
    alert_close: 'bg-green-100 text-green-700',
    alert_escalate: 'bg-red-100 text-red-700',
    policy_create: 'bg-blue-100 text-blue-700',
    policy_update: 'bg-yellow-100 text-yellow-700',
    policy_delete: 'bg-red-100 text-red-700',
    customer_view: 'bg-gray-100 text-gray-700',
    customer_edit: 'bg-yellow-100 text-yellow-700',
    api_key_create: 'bg-blue-100 text-blue-700',
    api_key_revoke: 'bg-red-100 text-red-700'
  };

  return (
    <span class={`px-2 py-1 rounded-full text-xs ${actionColors[props.action] || 'bg-gray-100 text-gray-700'}`}>
      {AUDIT_ACTIONS[props.action]?.label || props.action}
    </span>
  );
}
