<script lang="ts">
	import type { Lead } from '$lib/types';
	import { stageConfigs, sourceConfigs, owners, riskTagConfigs, nextActionConfigs } from '$lib/data/config';
	import { formatCurrency, formatDate } from '$lib/utils/filters';

	let { leads, onLeadClick } = $props<{
		leads: Lead[];
		onLeadClick?: (lead: Lead) => void;
	}>();

	function getStageConfig(stage: Lead['stage']) {
		return stageConfigs.find((c) => c.value === stage);
	}

	function getSourceConfig(source: Lead['source']) {
		return sourceConfigs.find((c) => c.value === source);
	}

	function getOwner(owner: Lead['owner']) {
		return owners.find((o) => o.value === owner);
	}

	function getRiskTagConfigs(tags: Lead['riskTags']) {
		return tags.map((tag) => riskTagConfigs.find((c) => c.value === tag)).filter(Boolean);
	}

	function getNextActionConfig(action: Lead['nextAction']) {
		if (!action) return null;
		return nextActionConfigs.find((c) => c.value === action);
	}
</script>

<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
	{#if leads.length === 0}
		<div class="p-8 text-center text-gray-500">
			暂无符合条件的线索
		</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="w-full text-left text-sm text-gray-500">
				<thead class="bg-gray-50 text-xs uppercase text-gray-700">
					<tr>
						<th class="px-6 py-3">线索名称</th>
						<th class="px-6 py-3">公司</th>
						<th class="px-6 py-3">来源</th>
						<th class="px-6 py-3">阶段</th>
						<th class="px-6 py-3">负责人</th>
						<th class="px-6 py-3">最近跟进时间</th>
						<th class="px-6 py-3">预估金额</th>
						<th class="px-6 py-3">下一步动作</th>
						<th class="px-6 py-3">风险标签</th>
					</tr>
				</thead>
				<tbody>
					{#each leads as lead}
						{@const sourceConfig = getSourceConfig(lead.source)}
						{@const stageConfig = getStageConfig(lead.stage)}
						{@const owner = getOwner(lead.owner)}
						{@const nextAction = getNextActionConfig(lead.nextAction)}
						{@const riskTags = getRiskTagConfigs(lead.riskTags)}
						<tr
							class="cursor-pointer border-b bg-white hover:bg-gray-50 transition-colors"
							onclick={() => onLeadClick(lead)}
						>
							<td class="px-6 py-4">
								<div class="font-medium text-gray-900">{lead.name}</div>
								<div class="text-xs text-gray-500">{lead.email}</div>
							</td>
							<td class="px-6 py-4">
								<div class="text-sm text-gray-700">{lead.company}</div>
							</td>
							<td class="px-6 py-4">
								<span class="text-sm text-gray-700">{sourceConfig?.label}</span>
							</td>
							<td class="px-6 py-4">
								{#if stageConfig}
									<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {stageConfig.bgColor} {stageConfig.color}">
										{stageConfig.label}
									</span>
								{/if}
							</td>
							<td class="px-6 py-4">
								{#if owner}
									<div class="flex items-center gap-2">
										<div class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">
											{owner.avatar}
										</div>
										<span class="text-sm text-gray-700">{owner.label}</span>
									</div>
								{/if}
							</td>
							<td class="px-6 py-4">
								<span class="text-sm text-gray-700">{formatDate(lead.lastFollowUp)}</span>
							</td>
							<td class="px-6 py-4">
								<span class="text-sm font-medium text-gray-900">{formatCurrency(lead.estimatedAmount)}</span>
							</td>
							<td class="px-6 py-4">
								{#if nextAction && lead.nextActionDate}
									<div>
										<span class="text-sm text-gray-700">{nextAction.label}</span>
										<div class="text-xs text-gray-500">{formatDate(lead.nextActionDate)}</div>
									</div>
								{:else}
									<span class="text-sm text-gray-400">-</span>
								{/if}
							</td>
							<td class="px-6 py-4">
								{#if riskTags.length > 0}
									<div class="flex flex-wrap gap-1">
										{#each riskTags as tag}
											{#if tag}
												<span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium {tag.bgColor} {tag.color}">
													{tag.label}
												</span>
											{/if}
										{/each}
									</div>
								{:else}
									<span class="text-sm text-gray-400">-</span>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
