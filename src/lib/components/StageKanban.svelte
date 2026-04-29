<script lang="ts">
	import type { Lead, LeadStage } from '$lib/types';
	import { stageConfigs } from '$lib/data/config';
	import { getStageCounts, getTotalEstimatedAmount, formatCurrency } from '$lib/utils/filters';

	let { leads, onStageClick } = $props<{
		leads: Lead[];
		onStageClick?: (stage: LeadStage | 'all') => void;
	}>();

	let stageCounts = $derived(getStageCounts(leads));
	let totalLeads = $derived(leads.length);
	let totalAmount = $derived(getTotalEstimatedAmount(leads));
</script>

<div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
	<div class="flex items-center justify-between mb-4">
		<h3 class="text-lg font-semibold text-gray-800">线索状态看板</h3>
		<div class="text-sm text-gray-500">
			共 {totalLeads} 条线索，预估金额 {formatCurrency(totalAmount)}
		</div>
	</div>

	<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
		<button
			type="button"
			class="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left cursor-pointer"
			onclick={() => onStageClick?.('all')}
		>
			<div class="text-2xl font-bold text-gray-800">{totalLeads}</div>
			<div class="text-sm text-gray-600 mt-1">全部线索</div>
		</button>

		{#each stageConfigs as config}
			<button
				type="button"
				class="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left cursor-pointer"
				onclick={() => onStageClick?.(config.value)}
			>
				<div class="text-2xl font-bold text-gray-800">{stageCounts[config.value]}</div>
				<div class="text-sm {config.color} mt-1">{config.label}</div>
			</button>
		{/each}
	</div>
</div>
