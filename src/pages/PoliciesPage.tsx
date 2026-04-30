import { createSignal, createMemo, For, Show } from 'solid-js';
import { policies, setPolicies } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { generateAuditRecord, addAuditLog } from '../utils';
import { PLANS } from '../config/constants';
import type { QuotaPolicy, Plan } from '../types';

export function PoliciesPage() {
  const { user, canPerformAction } = useAuth();
  
  const [editingPolicy, setEditingPolicy] = createSignal<QuotaPolicy | null>(null);
  const [showCreateForm, setShowCreateForm] = createSignal(false);

  const policiesList = createMemo(() => {
    return [...policies()].sort((a, b) => {
      const planOrder: Record<Plan, number> = { free: 0, pro: 1, enterprise: 2 };
      return planOrder[a.plan] - planOrder[b.plan];
    });
  });

  const handleCreatePolicy = (policyData: Partial<QuotaPolicy>) => {
    if (!user()) return;
    
    const newPolicy: QuotaPolicy = {
      id: `policy-${Date.now().toString().slice(-6)}`,
      plan: policyData.plan || 'free',
      name: policyData.name || '新策略',
      apiCallThreshold: policyData.apiCallThreshold || 1000,
      errorRateThreshold: policyData.errorRateThreshold || 5,
      responseTimeThreshold: policyData.responseTimeThreshold || 500,
      overageStrategy: policyData.overageStrategy || 'notify',
      enabled: policyData.enabled !== undefined ? policyData.enabled : true,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    setPolicies(prev => [...prev, newPolicy]);
    setShowCreateForm(false);
    
    const auditRecord = generateAuditRecord(
      'policy_create',
      { id: user()!.id, name: user()!.name, role: user()!.role },
      `创建了策略: ${newPolicy.name}`,
      { id: newPolicy.id, type: 'policy', name: newPolicy.name }
    );
    addAuditLog(auditRecord);
  };

  const handleUpdatePolicy = (policyId: string, updates: Partial<QuotaPolicy>) => {
    if (!user()) return;
    
    setPolicies(prev => prev.map(policy => {
      if (policy.id === policyId) {
        const updated = { ...policy, ...updates, updatedAt: new Date().toISOString().split('T')[0] };
        
        const auditRecord = generateAuditRecord(
          'policy_update',
          { id: user()!.id, name: user()!.name, role: user()!.role },
          `更新了策略: ${updated.name}`,
          { id: updated.id, type: 'policy', name: updated.name }
        );
        addAuditLog(auditRecord);
        
        return updated;
      }
      return policy;
    }));
    
    setEditingPolicy(null);
  };

  const handleDeletePolicy = (policyId: string) => {
    if (!user()) return;
    
    const policyToDelete = policies().find(p => p.id === policyId);
    if (!policyToDelete) return;
    
    setPolicies(prev => prev.filter(p => p.id !== policyId));
    
    const auditRecord = generateAuditRecord(
      'policy_delete',
      { id: user()!.id, name: user()!.name, role: user()!.role },
      `删除了策略: ${policyToDelete.name}`,
      { id: policyToDelete.id, type: 'policy', name: policyToDelete.name }
    );
    addAuditLog(auditRecord);
  };

  const togglePolicyEnabled = (policyId: string) => {
    const policy = policies().find(p => p.id === policyId);
    if (policy) {
      handleUpdatePolicy(policyId, { enabled: !policy.enabled });
    }
  };

  return (
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">配额策略</h1>
          <p class="text-gray-500 mt-1">配置和管理套餐配额策略</p>
        </div>
        <Show when={canPerformAction('edit')}>
          <button
            onClick={() => setShowCreateForm(true)}
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            创建策略
          </button>
        </Show>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <For each={['free', 'pro', 'enterprise'] as const}>
          {(plan) => {
            const planPolicies = policiesList().filter(p => p.plan === plan);
            const activePolicies = planPolicies.filter(p => p.enabled);
            
            return (
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between mb-4">
                  <span class={`px-3 py-1 rounded-full text-sm ${PLANS[plan].color}`}>
                    {PLANS[plan].label}
                  </span>
                  <span class="text-sm text-gray-500">
                    {activePolicies.length} / {planPolicies.length} 启用
                  </span>
                </div>
                <p class="text-3xl font-bold text-gray-800">{planPolicies.length}</p>
                <p class="text-sm text-gray-500 mt-1">策略总数</p>
              </div>
            );
          }}
        </For>
      </div>

      <Show when={showCreateForm()}>
        <PolicyForm
          onSubmit={handleCreatePolicy}
          onCancel={() => setShowCreateForm(false)}
        />
      </Show>

      <Show when={editingPolicy()}>
        <PolicyForm
          initialData={editingPolicy()!}
          onSubmit={(data) => handleUpdatePolicy(editingPolicy()!.id, data)}
          onCancel={() => setEditingPolicy(null)}
        />
      </Show>

      <div class="space-y-4">
        <For each={policiesList()}>
          {(policy) => (
            <div class={`bg-white rounded-xl shadow-sm border ${policy.enabled ? 'border-gray-200' : 'border-gray-100 opacity-60'} overflow-hidden`}>
              <div class="p-6">
                <div class="flex items-start justify-between">
                  <div class="flex items-start gap-4">
                    <div class={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      policy.plan === 'free' ? 'bg-gray-100 text-gray-700' :
                      policy.plan === 'pro' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <h3 class="text-lg font-semibold text-gray-800">{policy.name}</h3>
                        <span class={`px-2 py-0.5 rounded-full text-xs ${PLANS[policy.plan].color}`}>
                          {PLANS[policy.plan].label}
                        </span>
                        <span class={`px-2 py-0.5 rounded-full text-xs ${
                          policy.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {policy.enabled ? '已启用' : '已禁用'}
                        </span>
                      </div>
                      <p class="text-sm text-gray-500 mt-1">
                        最后更新: {policy.updatedAt}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <Show when={canPerformAction('edit')}>
                      <button
                        onClick={() => togglePolicyEnabled(policy.id)}
                        class={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          policy.enabled ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          class={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            policy.enabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        ></span>
                      </button>
                      <button
                        onClick={() => setEditingPolicy(policy)}
                        class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeletePolicy(policy.id)}
                        class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </Show>
                  </div>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-6 border-t border-gray-100">
                  <div>
                    <p class="text-xs text-gray-500 mb-1">调用量阈值</p>
                    <p class="text-xl font-bold text-gray-800">{policy.apiCallThreshold.toLocaleString()}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 mb-1">错误率阈值</p>
                    <p class="text-xl font-bold text-gray-800">{policy.errorRateThreshold}%</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 mb-1">响应时长阈值</p>
                    <p class="text-xl font-bold text-gray-800">{policy.responseTimeThreshold}ms</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 mb-1">超额策略</p>
                    <p class="text-xl font-bold text-gray-800">
                      {policy.overageStrategy === 'block' ? '阻断' :
                       policy.overageStrategy === 'throttle' ? '限流' :
                       policy.overageStrategy === 'notify' ? '通知' : '自动升级'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

function PolicyForm(props: {
  initialData?: QuotaPolicy;
  onSubmit: (data: Partial<QuotaPolicy>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = createSignal<Partial<QuotaPolicy>>(
    props.initialData || {
      plan: 'free',
      name: '',
      apiCallThreshold: 1000,
      errorRateThreshold: 5,
      responseTimeThreshold: 500,
      overageStrategy: 'notify',
      enabled: true
    }
  );

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    props.onSubmit(formData());
  };

  const updateField = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div class="bg-white rounded-xl shadow-sm border border-blue-200 p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">
        {props.initialData ? '编辑策略' : '创建新策略'}
      </h3>
      <form onSubmit={handleSubmit} class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">策略名称</label>
            <input
              type="text"
              value={formData().name || ''}
              onInput={(e) => updateField('name', e.target.value)}
              placeholder="输入策略名称"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">适用套餐</label>
            <select
              value={formData().plan || 'free'}
              onChange={(e) => updateField('plan', e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {Object.entries(PLANS).map(([key, val]) => (
                <option value={key}>{val.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">调用量阈值</label>
            <input
              type="number"
              value={formData().apiCallThreshold || 1000}
              onInput={(e) => updateField('apiCallThreshold', parseInt(e.target.value) || 0)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              min="0"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">错误率阈值 (%)</label>
            <input
              type="number"
              value={formData().errorRateThreshold || 5}
              onInput={(e) => updateField('errorRateThreshold', parseFloat(e.target.value) || 0)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">响应时长阈值 (ms)</label>
            <input
              type="number"
              value={formData().responseTimeThreshold || 500}
              onInput={(e) => updateField('responseTimeThreshold', parseInt(e.target.value) || 0)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              min="0"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">超额策略</label>
            <select
              value={formData().overageStrategy || 'notify'}
              onChange={(e) => updateField('overageStrategy', e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="block">阻断 - 超出后拒绝请求</option>
              <option value="throttle">限流 - 超出后限速</option>
              <option value="notify">通知 - 仅发送通知</option>
              <option value="auto_upgrade">自动升级 - 自动升级套餐</option>
            </select>
          </div>
        </div>
        
        <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={props.onCancel}
            class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {props.initialData ? '保存更改' : '创建策略'}
          </button>
        </div>
      </form>
    </div>
  );
}
