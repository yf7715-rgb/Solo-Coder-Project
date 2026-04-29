import type { Lead, FilterState, LeadStage } from '$lib/types';

export function filterLeads(leads: Lead[], filters: FilterState): Lead[] {
	return leads.filter((lead) => {
		if (filters.stage !== 'all' && lead.stage !== filters.stage) {
			return false;
		}

		if (filters.source !== 'all' && lead.source !== filters.source) {
			return false;
		}

		if (filters.owner !== 'all' && lead.owner !== filters.owner) {
			return false;
		}

		if (filters.minAmount !== null && lead.estimatedAmount < filters.minAmount) {
			return false;
		}

		if (filters.maxAmount !== null && lead.estimatedAmount > filters.maxAmount) {
			return false;
		}

		if (filters.keyword) {
			const keyword = filters.keyword.toLowerCase();
			const matchesName = lead.name.toLowerCase().includes(keyword);
			const matchesCompany = lead.company.toLowerCase().includes(keyword);
			const matchesEmail = lead.email.toLowerCase().includes(keyword);
			const matchesPhone = lead.phone.includes(keyword);
			if (!matchesName && !matchesCompany && !matchesEmail && !matchesPhone) {
				return false;
			}
		}

		return true;
	});
}

export function getLeadsByStage(leads: Lead[], stage: LeadStage): Lead[] {
	return leads.filter((lead) => lead.stage === stage);
}

export function getStageCounts(leads: Lead[]): Record<LeadStage, number> {
	const counts: Record<LeadStage, number> = {
		new: 0,
		contacted: 0,
		qualified: 0,
		negotiating: 0,
		won: 0,
		lost: 0
	};

	leads.forEach((lead) => {
		counts[lead.stage]++;
	});

	return counts;
}

export function getTotalEstimatedAmount(leads: Lead[]): number {
	return leads.reduce((sum, lead) => sum + lead.estimatedAmount, 0);
}

export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('zh-CN', {
		style: 'currency',
		currency: 'CNY',
		minimumFractionDigits: 0
	}).format(amount);
}

export function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('zh-CN', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});
}

export function sortLeads(leads: Lead[], field: keyof Lead, direction: 'asc' | 'desc'): Lead[] {
	return [...leads].sort((a, b) => {
		const aValue = a[field];
		const bValue = b[field];

		if (aValue === null) return 1;
		if (bValue === null) return -1;

		if (typeof aValue === 'string' && typeof bValue === 'string') {
			return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
		}

		if (typeof aValue === 'number' && typeof bValue === 'number') {
			return direction === 'asc' ? aValue - bValue : bValue - aValue;
		}

		return 0;
	});
}
