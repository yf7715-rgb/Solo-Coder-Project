<script lang="ts">
	import type { Lead, FollowUpRecord, Opportunity } from '$lib/types';
	import { stageConfigs, sourceConfigs, owners, riskTagConfigs, nextActionConfigs } from '$lib/data/config';
	import { formatCurrency, formatDate } from '$lib/utils/filters';

	let { isOpen, selectedLead, onClose } = $props<{
		isOpen: boolean;
		selectedLead: Lead | null;
		onClose: () => void;
	}>();

	let activeTab = $state<'followup' | 'opportunity'>('followup');

	function getFollowUpTypeLabel(type: FollowUpRecord['type']) {
		const labels: Record<FollowUpRecord['type'], string> = {
			call: '电话',
			email: '邮件',
			meeting: '会议',
			note: '备注',
			presentation: '方案演示',
			demo: '产品演示'
		};
		return labels[type];
	}

	function getFollowUpTypeColor(type: FollowUpRecord['type']) {
		const colors: Record<FollowUpRecord['type'], string> = {
			call: 'bg-blue-100 text-blue-600',
			email: 'bg-green-100 text-green-600',
			meeting: 'bg-purple-100 text-purple-600',
			note: 'bg-gray-100 text-gray-600',
			presentation: 'bg-orange-100 text-orange-600',
			demo: 'bg-teal-100 text-teal-600'
		};
		return colors[type];
	}

	function getOpportunityProbabilityColor(probability: number) {
		if (probability >= 70) return 'bg-green-100 text-green-600';
		if (probability >= 40) return 'bg-yellow-100 text-yellow-600';
		return 'bg-red-100 text-red-600';
	}
</script>

{#if isOpen && selectedLead}
	{@const stageConfig = stageConfigs.find((c) => c.value === selectedLead.stage)}
	{@const sourceConfig = sourceConfigs.find((c) => c.value === selectedLead.source)}
	{@const owner = owners.find((o) => o.value === selectedLead.owner)}
	{@const riskTags = riskTagConfigs
		.map((tag) => (selectedLead.riskTags.includes(tag.value) ? tag : null))
		.filter(Boolean)}
	{@const nextAction = nextActionConfigs.find((c) => c.value === selectedLead.nextAction)}

	<div class="fixed inset-0 z-50 flex">
		<div
			class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
			onclick={onClose}
		/>

		<div class="relative ml-auto flex h-full w-full max-w-2xl flex-col overflow-y-auto bg-white shadow-xl">
			<div class="flex items-center justify-between border-b border-gray-200 p-6">
				<div class="flex items-center gap-3">
					<button
						type="button"
						class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700"
						onclick={onClose}
					>
						<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
						返回
					</button>
					<h2 class="text-xl font-bold text-gray-900">线索详情</h2>
				</div>
			</div>

			<div class="flex-1 overflow-y-auto p-6">
				<div class="space-y-6">
					<div class="rounded-lg bg-gray-50 p-4">
						<div class="mb-4 flex items-start justify-between">
							<div>
								<h3 class="text-lg font-semibold text-gray-900">{selectedLead.name}</h3>
								<p class="text-sm text-gray-600">{selectedLead.company}</p>
							</div>
							{#if stageConfig}
								<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {stageConfig.bgColor} {stageConfig.color}">
									{stageConfig.label}
								</span>
							{/if}
						</div>

						{#if riskTags.length > 0}
							<div class="mb-4 flex flex-wrap gap-2">
								{#each riskTags as tag}
									{#if tag}
										<span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium {tag.bgColor} {tag.color}">
											{tag.label}
										</span>
									{/if}
								{/each}
							</div>
						{/if}

						<div class="grid grid-cols-2 gap-4 text-sm">
							<div class="flex items-center gap-2">
								<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
								<span class="text-gray-600">{selectedLead.email}</span>
							</div>
							<div class="flex items-center gap-2">
								<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
								</svg>
								<span class="text-gray-600">{selectedLead.phone}</span>
							</div>
							<div class="flex items-center gap-2 col-span-2">
								<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								<span class="text-gray-600">{selectedLead.address}</span>
							</div>
						</div>
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div class="rounded-lg border border-gray-200 bg-white p-4">
							<div class="mb-1 text-sm text-gray-500">线索来源</div>
							<div class="font-medium text-gray-900">{sourceConfig?.label}</div>
						</div>

						<div class="rounded-lg border border-gray-200 bg-white p-4">
							<div class="mb-1 text-sm text-gray-500">负责人</div>
							{#if owner}
								<div class="flex items-center gap-2">
									<div class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">
										{owner.avatar}
									</div>
									<span class="font-medium text-gray-900">{owner.label}</span>
								</div>
							{/if}
						</div>

						<div class="rounded-lg border border-gray-200 bg-white p-4">
							<div class="mb-1 text-sm text-gray-500">预估金额</div>
							<div class="font-medium text-green-600">{formatCurrency(selectedLead.estimatedAmount)}</div>
						</div>

						<div class="rounded-lg border border-gray-200 bg-white p-4">
							<div class="mb-1 text-sm text-gray-500">创建时间</div>
							<div class="font-medium text-gray-900">{formatDate(selectedLead.createdAt)}</div>
						</div>
					</div>

					{#if nextAction && selectedLead.nextActionDate}
						<div class="rounded-lg border-l-4 border-l-blue-500 bg-gray-50 p-4">
							<div class="mb-2 flex items-center gap-2">
								<svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								<span class="font-semibold text-gray-900">下一步动作</span>
							</div>
							<div class="grid grid-cols-2 gap-4 text-sm">
								<div>
									<span class="text-gray-500">动作类型：</span>
									<span class="font-medium text-gray-900">{nextAction.label}</span>
								</div>
								<div>
									<span class="text-gray-500">计划时间：</span>
									<span class="font-medium text-gray-900">{formatDate(selectedLead.nextActionDate)}</span>
								</div>
							</div>
						</div>
					{/if}

					<div class="border-b border-gray-200">
						<nav class="-mb-px flex space-x-8">
							<button
								type="button"
								class="whitespace-nowrap border-b-2 py-4 text-sm font-medium {activeTab === 'followup' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
								onclick={() => (activeTab = 'followup')}
							>
								跟进记录 ({selectedLead.followUpRecords.length})
							</button>
							<button
								type="button"
								class="whitespace-nowrap border-b-2 py-4 text-sm font-medium {activeTab === 'opportunity' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
								onclick={() => (activeTab = 'opportunity')}
							>
								关联商机 ({selectedLead.opportunities.length})
							</button>
						</nav>
					</div>

					{#if activeTab === 'followup'}
						{#if selectedLead.followUpRecords.length > 0}
							<div class="space-y-4 pt-4">
								{#each selectedLead.followUpRecords as record}
									<div class="flex gap-4">
										<div class="flex flex-col items-center">
											<div class="flex h-8 w-8 items-center justify-center rounded-full {getFollowUpTypeColor(record.type)}">
												{#if record.type === 'call'}
													<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
													</svg>
												{:else if record.type === 'email'}
													<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
													</svg>
												{:else}
													<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
													</svg>
												{/if}
											</div>
											{#if record !== selectedLead.followUpRecords.at(-1)}
												<div class="mt-2 w-px flex-1 bg-gray-200"></div>
											{/if}
										</div>
										<div class="flex-1 pb-4">
											<div class="mb-1 flex items-center justify-between">
												<span class="font-medium text-gray-900">
													{getFollowUpTypeLabel(record.type)} - {record.createdBy}
												</span>
												<span class="text-sm text-gray-500">{formatDate(record.date)}</span>
											</div>
											<p class="text-sm text-gray-600">{record.summary}</p>
										</div>
									</div>
								{/each}
							</div>
						{:else}
							<div class="p-4 text-center text-gray-500">
								暂无跟进记录
							</div>
						{/if}
					{/if}

					{#if activeTab === 'opportunity'}
						{#if selectedLead.opportunities.length > 0}
							<div class="space-y-4 pt-4">
								{#each selectedLead.opportunities as opportunity}
									<div class="rounded-lg border border-gray-200 bg-white p-4">
										<div class="flex items-start justify-between">
											<div>
												<h4 class="font-medium text-gray-900">{opportunity.name}</h4>
												<div class="mt-1 text-sm text-gray-500">{opportunity.stage}</div>
											</div>
											<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {getOpportunityProbabilityColor(opportunity.probability)}">
												{opportunity.probability}%
											</span>
										</div>
										<div class="mt-3 border-t border-gray-100 pt-3">
											<span class="text-lg font-semibold text-green-600">
												{formatCurrency(opportunity.amount)}
											</span>
										</div>
									</div>
								{/each}
							</div>
						{:else}
							<div class="p-4 text-center text-gray-500">
								暂无关联商机
							</div>
						{/if}
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
