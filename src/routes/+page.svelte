<script lang="ts">
	import FilterSection from '$lib/components/FilterSection.svelte';
	import StageKanban from '$lib/components/StageKanban.svelte';
	import LeadTable from '$lib/components/LeadTable.svelte';
	import LeadDetailDrawer from '$lib/components/LeadDetailDrawer.svelte';
	import { mockLeads } from '$lib/data/mockData';
	import { filterLeads } from '$lib/utils/filters';
	import type { Lead, FilterState, LeadStage } from '$lib/types';

	let filters: FilterState = $state({
		stage: 'all',
		source: 'all',
		owner: 'all',
		minAmount: null,
		maxAmount: null,
		keyword: ''
	});

	let isDrawerOpen = $state(false);
	let selectedLead = $state<Lead | null>(null);

	let filteredLeads = $derived(filterLeads(mockLeads, filters));

	function handleFiltersChange(newFilters: FilterState) {
		filters = newFilters;
	}

	function handleStageClick(stage: LeadStage | 'all') {
		filters = {
			...filters,
			stage: stage
		};
	}

	function handleLeadClick(lead: Lead) {
		selectedLead = lead;
		isDrawerOpen = true;
	}

	function handleDrawerClose() {
		isDrawerOpen = false;
		selectedLead = null;
	}
</script>

<div class="flex flex-col h-screen">
	<nav class="bg-white border-b border-gray-200 px-4 py-3">
		<div class="flex items-center justify-between">
			<a href="/" class="flex items-center gap-2">
				<span class="text-xl font-semibold text-gray-900">
					线索工作台
				</span>
			</a>
			<div class="flex items-center gap-6">
				<a href="/" class="text-sm font-medium text-blue-600">
					线索管理
				</a>
				<a href="#" class="text-sm font-medium text-gray-600 hover:text-gray-900">
					数据报表
				</a>
				<a href="#" class="text-sm font-medium text-gray-600 hover:text-gray-900">
					系统设置
				</a>
			</div>
		</div>
	</nav>

	<main class="flex-1 overflow-auto p-6">
		<div class="max-w-7xl mx-auto">
			<div class="mb-6">
				<h1 class="text-2xl font-bold text-gray-900">离线客户线索工作台</h1>
				<p class="text-gray-600 mt-1">管理和跟进所有客户线索，提升转化效率</p>
			</div>

			<FilterSection filters={filters} onFiltersChange={handleFiltersChange} />

			<StageKanban leads={filteredLeads} onStageClick={handleStageClick} />

			<div class="mb-4">
				<div class="flex items-center justify-between">
					<h2 class="text-lg font-semibold text-gray-800">线索列表</h2>
					<span class="text-sm text-gray-500">
						共 {filteredLeads.length} 条记录
					</span>
				</div>
			</div>

			<LeadTable leads={filteredLeads} onLeadClick={handleLeadClick} />
		</div>
	</main>

	<LeadDetailDrawer
		isOpen={isDrawerOpen}
		selectedLead={selectedLead}
		onClose={handleDrawerClose}
	/>
</div>
