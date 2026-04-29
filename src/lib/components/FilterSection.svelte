<script lang="ts">
	import type { FilterState, LeadStage, LeadSource } from '$lib/types';
	import { stageConfigs, sourceConfigs, owners } from '$lib/data/config';

	let { filters, onFiltersChange } = $props<{
		filters: FilterState;
		onFiltersChange?: (filters: FilterState) => void;
	}>();

	function updateFilter<K extends keyof FilterState>(key: K, value: FilterState[K]) {
		const newFilters = { ...filters, [key]: value };
		filters = newFilters;
		onFiltersChange?.(newFilters);
	}

	function handleKeywordInput(event: Event) {
		const target = event.target as HTMLInputElement;
		updateFilter('keyword', target.value);
	}

	function handleStageChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		updateFilter('stage', target.value as LeadStage | 'all');
	}

	function handleSourceChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		updateFilter('source', target.value as LeadSource | 'all');
	}

	function handleOwnerChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		updateFilter('owner', target.value);
	}

	function handleMinAmountInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const value = target.value ? Number(target.value) : null;
		updateFilter('minAmount', value);
	}

	function handleMaxAmountInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const value = target.value ? Number(target.value) : null;
		updateFilter('maxAmount', value);
	}

	function resetFilters() {
		const newFilters: FilterState = {
			stage: 'all',
			source: 'all',
			owner: 'all',
			minAmount: null,
			maxAmount: null,
			keyword: ''
		};
		filters = newFilters;
		onFiltersChange?.(newFilters);
	}
</script>

<div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
		<div>
			<label for="keyword" class="block text-sm font-medium text-gray-700 mb-2">关键词搜索</label>
			<input
				id="keyword"
				type="text"
				class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
				placeholder="搜索线索名称、公司、邮箱、电话"
				value={filters.keyword}
				oninput={handleKeywordInput}
			/>
		</div>

		<div>
			<label for="stage" class="block text-sm font-medium text-gray-700 mb-2">线索阶段</label>
			<select
				id="stage"
				class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
				value={filters.stage}
				onchange={handleStageChange}
			>
				<option value="all">全部阶段</option>
				{#each stageConfigs as config}
					<option value={config.value}>{config.label}</option>
				{/each}
			</select>
		</div>

		<div>
			<label for="source" class="block text-sm font-medium text-gray-700 mb-2">线索来源</label>
			<select
				id="source"
				class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
				value={filters.source}
				onchange={handleSourceChange}
			>
				<option value="all">全部来源</option>
				{#each sourceConfigs as config}
					<option value={config.value}>{config.label}</option>
				{/each}
			</select>
		</div>

		<div>
			<label for="owner" class="block text-sm font-medium text-gray-700 mb-2">负责人</label>
			<select
				id="owner"
				class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
				value={filters.owner}
				onchange={handleOwnerChange}
			>
				<option value="all">全部负责人</option>
				{#each owners as owner}
					<option value={owner.value}>{owner.label}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
		<div>
			<label for="minAmount" class="block text-sm font-medium text-gray-700 mb-2">预估金额下限 (元)</label>
			<input
				id="minAmount"
				type="number"
				class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
				placeholder="最小金额"
				value={filters.minAmount ?? ''}
				oninput={handleMinAmountInput}
			/>
		</div>

		<div>
			<label for="maxAmount" class="block text-sm font-medium text-gray-700 mb-2">预估金额上限 (元)</label>
			<input
				id="maxAmount"
				type="number"
				class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
				placeholder="最大金额"
				value={filters.maxAmount ?? ''}
				oninput={handleMaxAmountInput}
			/>
		</div>

		<div class="flex justify-end">
			<button
				type="button"
				class="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
				onclick={resetFilters}
			>
				重置筛选
			</button>
		</div>
	</div>
</div>
