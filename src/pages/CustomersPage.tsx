import { createSignal, createMemo, For, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { customers } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { 
  filterCustomers, sortCustomers, paginateCustomers, formatNumber, formatPercentage,
  generateAuditRecord, addAuditLog
} from '../utils';
import { 
  PLANS, CUSTOMER_STATUS, RISK_LEVELS, REGIONS 
} from '../config/constants';
import type { Customer, Plan } from '../types';

interface FilterView {
  id: string;
  name: string;
  filters: {
    search: string;
    plan: string;
    status: string;
    region: string;
    riskLevel: string;
    type: string;
  };
  createdAt: string;
}

type FiltersState = {
  search: string;
  plan: string;
  status: string;
  region: string;
  riskLevel: string;
  type: string;
};

function loadSavedViews(): FilterView[] {
  const stored = localStorage.getItem('customerFilterViews');
  if (stored) {
    try {
      return JSON.parse(stored) as FilterView[];
    } catch {
      return [];
    }
  }
  return [];
}

export function CustomersPage() {
  const { user, canPerformAction } = useAuth();
  
  const [savedViews, setSavedViews] = createSignal<FilterView[]>(loadSavedViews());
  
  const [filters, setFilters] = createSignal<FiltersState>({
    search: '',
    plan: '',
    status: '',
    region: '',
    riskLevel: '',
    type: ''
  });

  const [sortBy, setSortBy] = createSignal<keyof Customer>('name');
  const [sortOrder, setSortOrder] = createSignal<'asc' | 'desc'>('asc');
  const [page, setPage] = createSignal(1);
  const pageSize = 10;
  const [savingView, setSavingView] = createSignal(false);
  const [viewName, setViewName] = createSignal('');

  const filteredCustomers = createMemo(() => {
    return filterCustomers(customers(), {
      search: filters().search || undefined,
      plan: (filters().plan as Plan) || undefined,
      status: filters().status || undefined,
      region: filters().region || undefined,
      riskLevel: filters().riskLevel || undefined,
      type: filters().type || undefined
    });
  });

  const sortedCustomers = createMemo(() => {
    return sortCustomers(filteredCustomers(), sortBy(), sortOrder());
  });

  const paginatedData = createMemo(() => {
    return paginateCustomers(sortedCustomers(), page(), pageSize);
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleSort = (column: keyof Customer) => {
    if (sortBy() === column) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const loadView = (view: FilterView) => {
    setFilters(view.filters);
    setPage(1);
  };

  const saveCurrentView = () => {
    if (!viewName().trim()) return;
    
    const newView: FilterView = {
      id: `view-${Date.now()}`,
      name: viewName(),
      filters: { ...filters() },
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    const updatedViews = [...savedViews(), newView];
    setSavedViews(updatedViews);
    localStorage.setItem('customerFilterViews', JSON.stringify(updatedViews));
    setViewName('');
    setSavingView(false);
    
    if (user()) {
      const auditRecord = generateAuditRecord(
        'filter_save',
        { id: user()!.id, name: user()!.name, role: user()!.role },
        `保存了客户筛选视图: ${viewName()}`
      );
      addAuditLog(auditRecord);
    }
  };

  const deleteView = (viewId: string) => {
    const updatedViews = savedViews().filter(v => v.id !== viewId);
    setSavedViews(updatedViews);
    localStorage.setItem('customerFilterViews', JSON.stringify(updatedViews));
  };

  return (
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">客户管理</h1>
          <p class="text-gray-500 mt-1">管理和查看所有客户信息</p>
        </div>
        <Show when={canPerformAction('edit')}>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            导出数据
          </button>
        </Show>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-700">筛选条件</h3>
          <button
            onClick={() => setSavingView(!savingView())}
            class="text-sm text-blue-600 hover:text-blue-700"
          >
            保存视图
          </button>
        </div>

        <Show when={savedViews().length > 0}>
          <div class="mb-4 p-3 bg-gray-50 rounded-lg">
            <p class="text-xs text-gray-500 mb-2">已保存的视图:</p>
            <div class="flex flex-wrap gap-2">
              <For each={savedViews()}>
                {(view) => (
                  <div class="flex items-center gap-1">
                    <button
                      onClick={() => loadView(view)}
                      class="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      {view.name}
                    </button>
                    <button
                      onClick={() => deleteView(view.id)}
                      class="text-gray-400 hover:text-red-500 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Show>

        <Show when={savingView()}>
          <div class="mb-4 p-3 bg-blue-50 rounded-lg flex items-center gap-3">
            <input
              type="text"
              placeholder="视图名称"
              value={viewName()}
              onInput={(e) => setViewName(e.target.value)}
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              onClick={saveCurrentView}
              class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              保存
            </button>
            <button
              onClick={() => setSavingView(false)}
              class="px-4 py-2 text-gray-600 rounded-lg text-sm hover:bg-gray-100"
            >
              取消
            </button>
          </div>
        </Show>

        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div class="lg:col-span-2">
            <label class="block text-xs text-gray-500 mb-1">搜索</label>
            <input
              type="text"
              placeholder="搜索客户名称、邮箱、ID..."
              value={filters().search}
              onInput={(e) => handleFilterChange('search', e.target.value)}
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
            <label class="block text-xs text-gray-500 mb-1">状态</label>
            <select
              value={filters().status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">全部</option>
              {Object.entries(CUSTOMER_STATUS).map(([key, val]) => (
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

        <div class="mt-4 flex items-center justify-between">
          <div class="text-sm text-gray-500">
            共 {paginatedData().total} 条记录
          </div>
          <button
            onClick={() => setFilters({ search: '', plan: '', status: '', region: '', riskLevel: '', type: '' })}
            class="text-sm text-gray-500 hover:text-gray-700"
          >
            清除筛选
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  <div class="flex items-center gap-1">
                    客户名称
                    <SortIndicator column="name" current={sortBy()} order={sortOrder()} />
                  </div>
                </th>
                <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">套餐</th>
                <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">状态</th>
                <th
                  class="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('apiCalls')}
                >
                  <div class="flex items-center justify-end gap-1">
                    调用量
                    <SortIndicator column="apiCalls" current={sortBy()} order={sortOrder()} />
                  </div>
                </th>
                <th class="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">错误率</th>
                <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">风险等级</th>
                <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">地区</th>
                <th class="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <For each={paginatedData().data}>
                {(customer) => (
                  <tr class="hover:bg-gray-50">
                    <td class="py-4 px-4">
                      <div>
                        <A
                          href={`/customers/${customer.id}`}
                          class="font-medium text-gray-800 hover:text-blue-600"
                        >
                          {customer.name}
                        </A>
                        <p class="text-xs text-gray-500 mt-0.5">{customer.email}</p>
                      </div>
                    </td>
                    <td class="py-4 px-4">
                      <span class={`text-xs px-2 py-1 rounded-full ${PLANS[customer.plan].color}`}>
                        {PLANS[customer.plan].label}
                      </span>
                    </td>
                    <td class="py-4 px-4">
                      <span class={`text-xs px-2 py-1 rounded-full ${CUSTOMER_STATUS[customer.status].color}`}>
                        {CUSTOMER_STATUS[customer.status].label}
                      </span>
                    </td>
                    <td class="py-4 px-4 text-right font-medium">
                      {formatNumber(customer.apiCalls)}
                      <span class="text-xs text-gray-400 block">/ {formatNumber(customer.apiLimit)}</span>
                    </td>
                    <td class="py-4 px-4 text-right">
                      <span class={customer.errorRate > 3 ? 'text-red-600' : 'text-gray-600'}>
                        {formatPercentage(customer.errorRate)}
                      </span>
                    </td>
                    <td class="py-4 px-4">
                      <span class={`text-xs px-2 py-1 rounded-full ${RISK_LEVELS[customer.riskLevel].color}`}>
                        {RISK_LEVELS[customer.riskLevel].label}
                      </span>
                    </td>
                    <td class="py-4 px-4 text-sm text-gray-600">
                      {REGIONS[customer.region]?.label || customer.region}
                    </td>
                    <td class="py-4 px-4 text-center">
                      <A
                        href={`/customers/${customer.id}`}
                        class="text-sm text-blue-600 hover:text-blue-700"
                      >
                        查看详情
                      </A>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>

        <Show when={paginatedData().totalPages > 1}>
          <div class="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div class="text-sm text-gray-500">
              第 {page()} 页，共 {paginatedData().totalPages} 页
            </div>
            <div class="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page() === 1}
                class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一页
              </button>
              <For each={Array.from({ length: Math.min(5, paginatedData().totalPages) }, (_, i) => {
                const startPage = Math.max(1, Math.min(page() - 2, paginatedData().totalPages - 4));
                return startPage + i;
              }).filter(p => p >= 1 && p <= paginatedData().totalPages)}>
                {(pageNum) => (
                  <button
                    onClick={() => setPage(pageNum)}
                    class={`px-3 py-1 rounded text-sm ${
                      pageNum === page()
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )}
              </For>
              <button
                onClick={() => setPage(p => Math.min(paginatedData().totalPages, p + 1))}
                disabled={page() === paginatedData().totalPages}
                class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一页
              </button>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}

function SortIndicator(props: { column: keyof Customer; current: keyof Customer; order: 'asc' | 'desc' }) {
  if (props.column !== props.current) {
    return <span class="text-gray-300">↕</span>;
  }
  return <span>{props.order === 'asc' ? '↑' : '↓'}</span>;
}
