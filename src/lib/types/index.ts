export type LeadStage = 'new' | 'contacted' | 'qualified' | 'negotiating' | 'won' | 'lost';

export type LeadSource = 'website' | 'referral' | 'event' | 'ad' | 'cold_call' | 'email_campaign';

export type RiskTag = 'high_priority' | 'low_conversion' | 'long_cycle' | 'competitive' | 'budget_cut' | 'no_decision_maker' | 'churn_risk';

export type NextActionType = 'call' | 'email' | 'meeting' | 'presentation' | 'demo' | 'follow_up';

export interface FollowUpRecord {
	id: string;
	date: string;
	type: 'call' | 'email' | 'meeting' | 'note' | 'presentation' | 'demo';
	summary: string;
	createdBy: string;
}

export interface Opportunity {
	id: string;
	name: string;
	amount: number;
	stage: string;
	probability: number;
}

export interface Lead {
	id: string;
	name: string;
	company: string;
	source: LeadSource;
	stage: LeadStage;
	owner: string;
	lastFollowUp: string;
	estimatedAmount: number;
	nextAction: NextActionType | null;
	nextActionDate: string | null;
	riskTags: RiskTag[];
	email: string;
	phone: string;
	address: string;
	description: string;
	followUpRecords: FollowUpRecord[];
	opportunities: Opportunity[];
	createdAt: string;
}

export interface FilterState {
	stage: LeadStage | 'all';
	source: LeadSource | 'all';
	owner: string | 'all';
	minAmount: number | null;
	maxAmount: number | null;
	keyword: string;
}

export interface StageConfig {
	value: LeadStage;
	label: string;
	color: string;
	bgColor: string;
}

export interface SourceConfig {
	value: LeadSource;
	label: string;
	icon: string;
}

export interface Owner {
	value: string;
	label: string;
	avatar: string;
}

export interface RiskTagConfig {
	value: RiskTag;
	label: string;
	color: string;
	bgColor: string;
}

export interface NextActionConfig {
	value: NextActionType;
	label: string;
	icon: string;
}
