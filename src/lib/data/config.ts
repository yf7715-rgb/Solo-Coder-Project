import type { StageConfig, SourceConfig, Owner, RiskTagConfig, NextActionConfig } from '$lib/types';

export const stageConfigs: StageConfig[] = [
	{ value: 'new', label: '新线索', color: 'text-blue-600', bgColor: 'bg-blue-100' },
	{ value: 'contacted', label: '已联系', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
	{ value: 'qualified', label: '已确认', color: 'text-green-600', bgColor: 'bg-green-100' },
	{ value: 'negotiating', label: '谈判中', color: 'text-purple-600', bgColor: 'bg-purple-100' },
	{ value: 'won', label: '已成交', color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
	{ value: 'lost', label: '已流失', color: 'text-red-600', bgColor: 'bg-red-100' }
];

export const sourceConfigs: SourceConfig[] = [
	{ value: 'website', label: '官网', icon: 'globe' },
	{ value: 'referral', label: '转介绍', icon: 'users' },
	{ value: 'event', label: '线下活动', icon: 'calendar' },
	{ value: 'ad', label: '广告投放', icon: 'advertising' },
	{ value: 'cold_call', label: '陌生电话', icon: 'phone' },
	{ value: 'email_campaign', label: '邮件营销', icon: 'mail' }
];

export const owners: Owner[] = [
	{ value: 'zhang_san', label: '张三', avatar: 'ZS' },
	{ value: 'li_si', label: '李四', avatar: 'LS' },
	{ value: 'wang_wu', label: '王五', avatar: 'WW' },
	{ value: 'zhao_liu', label: '赵六', avatar: 'ZL' }
];

export const riskTagConfigs: RiskTagConfig[] = [
	{ value: 'high_priority', label: '高优先级', color: 'text-red-600', bgColor: 'bg-red-100' },
	{ value: 'low_conversion', label: '转化率低', color: 'text-orange-600', bgColor: 'bg-orange-100' },
	{ value: 'long_cycle', label: '周期长', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
	{ value: 'competitive', label: '竞争激烈', color: 'text-blue-600', bgColor: 'bg-blue-100' },
	{ value: 'budget_cut', label: '预算缩减', color: 'text-purple-600', bgColor: 'bg-purple-100' },
	{ value: 'no_decision_maker', label: '无决策人', color: 'text-gray-600', bgColor: 'bg-gray-100' },
	{ value: 'churn_risk', label: '流失风险', color: 'text-red-700', bgColor: 'bg-red-50' }
];

export const nextActionConfigs: NextActionConfig[] = [
	{ value: 'call', label: '电话跟进', icon: 'phone' },
	{ value: 'email', label: '发送邮件', icon: 'mail' },
	{ value: 'meeting', label: '安排会议', icon: 'calendar' },
	{ value: 'presentation', label: '方案演示', icon: 'presentation' },
	{ value: 'demo', label: '产品演示', icon: 'screen' },
	{ value: 'follow_up', label: '后续跟进', icon: 'clock' }
];
