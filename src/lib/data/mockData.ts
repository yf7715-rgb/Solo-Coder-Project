import type { Lead } from '$lib/types';

export const mockLeads: Lead[] = [
	{
		id: 'lead-001',
		name: '王经理',
		company: '北京科技创新有限公司',
		source: 'website',
		stage: 'new',
		owner: 'zhang_san',
		lastFollowUp: '2026-04-25',
		estimatedAmount: 150000,
		nextAction: 'call',
		nextActionDate: '2026-04-30',
		riskTags: ['high_priority'],
		email: 'wang.manager@techbj.com',
		phone: '13800138001',
		address: '北京市海淀区中关村大街1号',
		description: '对企业协作解决方案有明确需求，希望提升团队协作效率。',
		followUpRecords: [
			{
				id: 'f001',
				date: '2026-04-25',
				type: 'note',
				summary: '客户通过官网提交咨询，对项目管理模块兴趣浓厚。',
				createdBy: '张三'
			}
		],
		opportunities: [
			{
				id: 'opp001',
				name: '企业协作平台项目',
				amount: 150000,
				stage: '初步接触',
				probability: 30
			}
		],
		createdAt: '2026-04-25'
	},
	{
		id: 'lead-002',
		name: '李总监',
		company: '上海金融服务集团',
		source: 'referral',
		stage: 'contacted',
		owner: 'li_si',
		lastFollowUp: '2026-04-24',
		estimatedAmount: 500000,
		nextAction: 'meeting',
		nextActionDate: '2026-05-02',
		riskTags: ['long_cycle'],
		email: 'li.director@shfinance.com',
		phone: '13800138002',
		address: '上海市浦东新区陆家嘴金融中心',
		description: '金融行业客户，需要定制化数据分析平台，预算充足但决策流程较长。',
		followUpRecords: [
			{
				id: 'f002',
				date: '2026-04-20',
				type: 'call',
				summary: '初次电话沟通，客户表示有多个部门需要数据分析能力。',
				createdBy: '李四'
			},
			{
				id: 'f003',
				date: '2026-04-24',
				type: 'email',
				summary: '发送了产品介绍和案例资料，等待客户反馈。',
				createdBy: '李四'
			}
		],
		opportunities: [
			{
				id: 'opp002',
				name: '数据分析平台一期',
				amount: 500000,
				stage: '需求确认',
				probability: 50
			}
		],
		createdAt: '2026-04-15'
	},
	{
		id: 'lead-003',
		name: '张总',
		company: '广州制造企业联盟',
		source: 'event',
		stage: 'qualified',
		owner: 'zhang_san',
		lastFollowUp: '2026-04-23',
		estimatedAmount: 320000,
		nextAction: 'presentation',
		nextActionDate: '2026-04-28',
		riskTags: ['competitive'],
		email: 'zhang.zong@gzma.com',
		phone: '13800138003',
		address: '广州市天河区珠江新城',
		description: '制造业数字化转型项目，客户已确认需求和预算，有竞争对手参与。',
		followUpRecords: [
			{
				id: 'f004',
				date: '2026-04-10',
				type: 'meeting',
				summary: '线下展会初次见面，客户对智能制造解决方案表现出兴趣。',
				createdBy: '张三'
			},
			{
				id: 'f005',
				date: '2026-04-18',
				type: 'meeting',
				summary: '深度需求沟通，确认了核心功能模块和大致预算范围。',
				createdBy: '张三'
			},
			{
				id: 'f006',
				date: '2026-04-23',
				type: 'call',
				summary: '客户提到还有其他供应商在接触，需要突出我们的优势。',
				createdBy: '张三'
			}
		],
		opportunities: [
			{
				id: 'opp003',
				name: '智能制造平台项目',
				amount: 320000,
				stage: '方案阶段',
				probability: 60
			}
		],
		createdAt: '2026-04-10'
	},
	{
		id: 'lead-004',
		name: '刘女士',
		company: '深圳电商科技有限公司',
		source: 'ad',
		stage: 'negotiating',
		owner: 'wang_wu',
		lastFollowUp: '2026-04-26',
		estimatedAmount: 280000,
		nextAction: 'demo',
		nextActionDate: '2026-04-29',
		riskTags: ['budget_cut'],
		email: 'liu.lady@szecom.com',
		phone: '13800138004',
		address: '深圳市南山区科技园',
		description: '电商平台客户，对库存管理系统需求迫切，但近期可能有预算调整。',
		followUpRecords: [
			{
				id: 'f007',
				date: '2026-03-28',
				type: 'email',
				summary: '通过广告投放获取线索，发送了产品资料。',
				createdBy: '王五'
			},
			{
				id: 'f008',
				date: '2026-04-05',
				type: 'call',
				summary: '电话沟通，确认了库存管理的具体需求。',
				createdBy: '王五'
			},
			{
				id: 'f009',
				date: '2026-04-15',
				type: 'meeting',
				summary: '上门演示，客户反馈功能符合预期，但需要调整报价。',
				createdBy: '王五'
			},
			{
				id: 'f010',
				date: '2026-04-26',
				type: 'email',
				summary: '发送了调整后的报价方案，客户表示需要内部审批。',
				createdBy: '王五'
			}
		],
		opportunities: [
			{
				id: 'opp004',
				name: '电商库存管理系统',
				amount: 280000,
				stage: '商务谈判',
				probability: 70
			}
		],
		createdAt: '2026-03-28'
	},
	{
		id: 'lead-005',
		name: '陈董事长',
		company: '杭州智慧旅游集团',
		source: 'referral',
		stage: 'won',
		owner: 'li_si',
		lastFollowUp: '2026-04-20',
		estimatedAmount: 850000,
		nextAction: null,
		nextActionDate: null,
		riskTags: [],
		email: 'chen.chair@hzsmarttravel.com',
		phone: '13800138005',
		address: '杭州市西湖区文三路',
		description: '智慧旅游平台项目，已成功签约，进入实施阶段。',
		followUpRecords: [
			{
				id: 'f011',
				date: '2026-02-15',
				type: 'call',
				summary: '通过朋友推荐联系上，初步了解需求。',
				createdBy: '李四'
			},
			{
				id: 'f012',
				date: '2026-03-01',
				type: 'meeting',
				summary: '深度需求调研，确认了智慧旅游平台的建设方案。',
				createdBy: '李四'
			},
			{
				id: 'f013',
				date: '2026-03-20',
				type: 'presentation',
				summary: '方案汇报，获得客户认可。',
				createdBy: '李四'
			},
			{
				id: 'f014',
				date: '2026-04-10',
				type: 'meeting',
				summary: '合同签署，项目正式启动。',
				createdBy: '李四'
			}
		],
		opportunities: [
			{
				id: 'opp005',
				name: '智慧旅游综合平台',
				amount: 850000,
				stage: '已签约',
				probability: 100
			}
		],
		createdAt: '2026-02-15'
	},
	{
		id: 'lead-006',
		name: '吴经理',
		company: '成都传统餐饮连锁',
		source: 'cold_call',
		stage: 'lost',
		owner: 'zhao_liu',
		lastFollowUp: '2026-04-10',
		estimatedAmount: 120000,
		nextAction: null,
		nextActionDate: null,
		riskTags: ['low_conversion', 'no_decision_maker'],
		email: 'wu.manager@cdfood.com',
		phone: '13800138006',
		address: '成都市锦江区春熙路',
		description: '餐饮连锁客户，对数字化管理有兴趣但决策人不明确，最终选择了竞争对手。',
		followUpRecords: [
			{
				id: 'f015',
				date: '2026-03-10',
				type: 'call',
				summary: '陌生电话接触，客户表示有兴趣了解。',
				createdBy: '赵六'
			},
			{
				id: 'f016',
				date: '2026-03-25',
				type: 'meeting',
				summary: '上门拜访，对接人是运营经理，但决策人一直未能参与。',
				createdBy: '赵六'
			},
			{
				id: 'f017',
				date: '2026-04-10',
				type: 'call',
				summary: '客户反馈已选择其他供应商，主要原因是价格更低。',
				createdBy: '赵六'
			}
		],
		opportunities: [
			{
				id: 'opp006',
				name: '餐饮连锁管理系统',
				amount: 120000,
				stage: '已流失',
				probability: 0
			}
		],
		createdAt: '2026-03-10'
	},
	{
		id: 'lead-007',
		name: '周总',
		company: '南京新能源科技',
		source: 'email_campaign',
		stage: 'new',
		owner: 'wang_wu',
		lastFollowUp: '2026-04-26',
		estimatedAmount: 450000,
		nextAction: 'email',
		nextActionDate: '2026-04-28',
		riskTags: [],
		email: 'zhou.zong@njne.com',
		phone: '13800138007',
		address: '南京市江宁经济技术开发区',
		description: '新能源行业客户，通过邮件营销获取线索，对生产管理系统有潜在需求。',
		followUpRecords: [
			{
				id: 'f018',
				date: '2026-04-26',
				type: 'email',
				summary: '回复了营销邮件，表达了对生产管理系统的兴趣。',
				createdBy: '王五'
			}
		],
		opportunities: [],
		createdAt: '2026-04-26'
	},
	{
		id: 'lead-008',
		name: '郑女士',
		company: '武汉医疗健康集团',
		source: 'website',
		stage: 'contacted',
		owner: 'zhao_liu',
		lastFollowUp: '2026-04-25',
		estimatedAmount: 680000,
		nextAction: 'call',
		nextActionDate: '2026-04-30',
		riskTags: ['long_cycle', 'competitive'],
		email: 'zheng.lady@whhealth.com',
		phone: '13800138008',
		address: '武汉市东湖高新区',
		description: '医疗健康行业客户，需要信息化升级，项目周期较长且有多家供应商参与。',
		followUpRecords: [
			{
				id: 'f019',
				date: '2026-04-18',
				type: 'note',
				summary: '官网咨询，对医疗信息管理系统感兴趣。',
				createdBy: '赵六'
			},
			{
				id: 'f020',
				date: '2026-04-22',
				type: 'call',
				summary: '电话沟通，了解到客户需要通过公开招标流程。',
				createdBy: '赵六'
			},
			{
				id: 'f021',
				date: '2026-04-25',
				type: 'email',
				summary: '发送了公司资质和相关案例，准备参与投标。',
				createdBy: '赵六'
			}
		],
		opportunities: [
			{
				id: 'opp007',
				name: '医疗信息管理系统',
				amount: 680000,
				stage: '投标准备',
				probability: 40
			}
		],
		createdAt: '2026-04-18'
	},
	{
		id: 'lead-009',
		name: '孙经理',
		company: '天津物流运输有限公司',
		source: 'event',
		stage: 'qualified',
		owner: 'zhang_san',
		lastFollowUp: '2026-04-22',
		estimatedAmount: 220000,
		nextAction: 'meeting',
		nextActionDate: '2026-05-05',
		riskTags: ['high_priority'],
		email: 'sun.manager@tjlogistics.com',
		phone: '13800138009',
		address: '天津市滨海新区',
		description: '物流行业客户，对运输管理系统需求迫切，希望尽快上线。',
		followUpRecords: [
			{
				id: 'f022',
				date: '2026-04-12',
				type: 'meeting',
				summary: '物流展会接触，客户对运输管理系统表现出强烈兴趣。',
				createdBy: '张三'
			},
			{
				id: 'f023',
				date: '2026-04-18',
				type: 'call',
				summary: '详细沟通需求，确认客户需要车辆调度、路线优化等功能。',
				createdBy: '张三'
			},
			{
				id: 'f024',
				date: '2026-04-22',
				type: 'email',
				summary: '发送了初步方案，客户确认符合需求，预约上门演示。',
				createdBy: '张三'
			}
		],
		opportunities: [
			{
				id: 'opp008',
				name: '运输管理系统项目',
				amount: 220000,
				stage: '需求确认',
				probability: 55
			}
		],
		createdAt: '2026-04-12'
	},
	{
		id: 'lead-010',
		name: '马总',
		company: '重庆地产开发集团',
		source: 'referral',
		stage: 'negotiating',
		owner: 'li_si',
		lastFollowUp: '2026-04-27',
		estimatedAmount: 950000,
		nextAction: 'follow_up',
		nextActionDate: '2026-05-01',
		riskTags: ['budget_cut', 'competitive'],
		email: 'ma.zong@cqdc.com',
		phone: '13800138010',
		address: '重庆市渝北区',
		description: '地产行业客户，需要智慧社区解决方案，预算较大但有价格压力和竞争。',
		followUpRecords: [
			{
				id: 'f025',
				date: '2026-03-20',
				type: 'call',
				summary: '通过行业朋友推荐联系，客户有智慧社区建设规划。',
				createdBy: '李四'
			},
			{
				id: 'f026',
				date: '2026-04-01',
				type: 'meeting',
				summary: '需求调研，了解到客户需要智能门禁、停车管理、社区服务等模块。',
				createdBy: '李四'
			},
			{
				id: 'f027',
				date: '2026-04-15',
				type: 'presentation',
				summary: '方案汇报，客户认可方案设计，但认为报价偏高。',
				createdBy: '李四'
			},
			{
				id: 'f028',
				date: '2026-04-20',
				type: 'meeting',
				summary: '商务谈判，客户提到还有另一家供应商报价更低15%。',
				createdBy: '李四'
			},
			{
				id: 'f029',
				date: '2026-04-27',
				type: 'call',
				summary: '跟进谈判进展，客户表示需要向集团申请预算调整。',
				createdBy: '李四'
			}
		],
		opportunities: [
			{
				id: 'opp009',
				name: '智慧社区综合平台',
				amount: 950000,
				stage: '商务谈判',
				probability: 65
			}
		],
		createdAt: '2026-03-20'
	},
	{
		id: 'lead-011',
		name: '朱经理',
		company: '西安教育培训中心',
		source: 'ad',
		stage: 'new',
		owner: 'zhao_liu',
		lastFollowUp: '2026-04-27',
		estimatedAmount: 85000,
		nextAction: 'call',
		nextActionDate: '2026-04-29',
		riskTags: ['low_conversion'],
		email: 'zhu.manager@xaedu.com',
		phone: '13800138011',
		address: '西安市雁塔区',
		description: '教育培训机构，对学员管理系统有需求，但预算有限。',
		followUpRecords: [
			{
				id: 'f030',
				date: '2026-04-27',
				type: 'email',
				summary: '通过广告点击咨询，询问学员管理系统的价格和功能。',
				createdBy: '赵六'
			}
		],
		opportunities: [],
		createdAt: '2026-04-27'
	},
	{
		id: 'lead-012',
		name: '胡总',
		company: '济南化工材料有限公司',
		source: 'cold_call',
		stage: 'contacted',
		owner: 'wang_wu',
		lastFollowUp: '2026-04-24',
		estimatedAmount: 180000,
		nextAction: 'meeting',
		nextActionDate: '2026-05-03',
		riskTags: ['no_decision_maker'],
		email: 'hu.zong@jnchem.com',
		phone: '13800138012',
		address: '济南市历下区',
		description: '化工行业客户，对库存和供应链管理有需求，但对接人权限有限。',
		followUpRecords: [
			{
				id: 'f031',
				date: '2026-04-15',
				type: 'call',
				summary: '陌生电话接触，客户表示公司正在考虑信息化升级。',
				createdBy: '王五'
			},
			{
				id: 'f032',
				date: '2026-04-20',
				type: 'email',
				summary: '发送了产品资料，客户反馈需要向领导汇报。',
				createdBy: '王五'
			},
			{
				id: 'f033',
				date: '2026-04-24',
				type: 'call',
				summary: '跟进沟通，客户预约了上门演示，但决策人是否参加不确定。',
				createdBy: '王五'
			}
		],
		opportunities: [
			{
				id: 'opp010',
				name: '库存管理系统',
				amount: 180000,
				stage: '初步接触',
				probability: 35
			}
		],
		createdAt: '2026-04-15'
	},
	{
		id: 'lead-013',
		name: '林女士',
		company: '厦门跨境电商服务',
		source: 'email_campaign',
		stage: 'qualified',
		owner: 'zhang_san',
		lastFollowUp: '2026-04-21',
		estimatedAmount: 380000,
		nextAction: 'presentation',
		nextActionDate: '2026-04-30',
		riskTags: ['high_priority', 'competitive'],
		email: 'lin.lady@xmce.com',
		phone: '13800138013',
		address: '厦门市思明区',
		description: '跨境电商服务公司，需要订单管理和仓储系统，有明确预算和时间要求。',
		followUpRecords: [
			{
				id: 'f034',
				date: '2026-04-08',
				type: 'email',
				summary: '回复营销邮件，咨询跨境电商解决方案。',
				createdBy: '张三'
			},
			{
				id: 'f035',
				date: '2026-04-12',
				type: 'call',
				summary: '详细沟通，确认客户需要订单管理、库存同步、物流对接等功能。',
				createdBy: '张三'
			},
			{
				id: 'f036',
				date: '2026-04-18',
				type: 'meeting',
				summary: '上门调研，客户确认了需求清单和预算范围，提到有其他供应商在接触。',
				createdBy: '张三'
			},
			{
				id: 'f037',
				date: '2026-04-21',
				type: 'email',
				summary: '发送了方案初稿，预约了正式方案汇报时间。',
				createdBy: '张三'
			}
		],
		opportunities: [
			{
				id: 'opp011',
				name: '跨境电商综合管理平台',
				amount: 380000,
				stage: '方案阶段',
				probability: 58
			}
		],
		createdAt: '2026-04-08'
	},
	{
		id: 'lead-014',
		name: '何经理',
		company: '苏州精密制造',
		source: 'event',
		stage: 'contacted',
		owner: 'li_si',
		lastFollowUp: '2026-04-23',
		estimatedAmount: 520000,
		nextAction: 'call',
		nextActionDate: '2026-04-29',
		riskTags: ['long_cycle'],
		email: 'he.manager@szpm.com',
		phone: '13800138014',
		address: '苏州市工业园区',
		description: '精密制造企业，需要MES系统升级，项目周期预计较长。',
		followUpRecords: [
			{
				id: 'f038',
				date: '2026-04-05',
				type: 'meeting',
				summary: '制造业展会接触，客户对智能制造解决方案有兴趣。',
				createdBy: '李四'
			},
			{
				id: 'f039',
				date: '2026-04-15',
				type: 'call',
				summary: '初步需求沟通，了解到客户需要替换现有MES系统，涉及多个车间。',
				createdBy: '李四'
			},
			{
				id: 'f040',
				date: '2026-04-23',
				type: 'email',
				summary: '发送了相关案例资料，等待客户安排详细需求调研。',
				createdBy: '李四'
			}
		],
		opportunities: [
			{
				id: 'opp012',
				name: 'MES系统升级项目',
				amount: 520000,
				stage: '初步接触',
				probability: 30
			}
		],
		createdAt: '2026-04-05'
	},
	{
		id: 'lead-015',
		name: '高总',
		company: '郑州汽车销售集团',
		source: 'website',
		stage: 'negotiating',
		owner: 'zhao_liu',
		lastFollowUp: '2026-04-26',
		estimatedAmount: 420000,
		nextAction: 'demo',
		nextActionDate: '2026-04-28',
		riskTags: ['budget_cut'],
		email: 'gao.zong@zzauto.com',
		phone: '13800138015',
		address: '郑州市金水区',
		description: '汽车销售集团，需要客户关系管理系统，报价已提交但客户有预算压力。',
		followUpRecords: [
			{
				id: 'f041',
				date: '2026-03-25',
				type: 'note',
				summary: '官网咨询，对汽车销售行业CRM系统感兴趣。',
				createdBy: '赵六'
			},
			{
				id: 'f042',
				date: '2026-04-02',
				type: 'meeting',
				summary: '需求调研，客户需要客户跟进、销售漏斗、售后管理等模块。',
				createdBy: '赵六'
			},
			{
				id: 'f043',
				date: '2026-04-10',
				type: 'presentation',
				summary: '方案汇报，客户认可功能但认为价格超出预期。',
				createdBy: '赵六'
			},
			{
				id: 'f044',
				date: '2026-04-18',
				type: 'meeting',
				summary: '商务沟通，提供了简化版方案和分期付款选项。',
				createdBy: '赵六'
			},
			{
				id: 'f045',
				date: '2026-04-26',
				type: 'call',
				summary: '客户表示需要再考虑，预约了产品演示以便做最终决定。',
				createdBy: '赵六'
			}
		],
		opportunities: [
			{
				id: 'opp013',
				name: '汽车销售CRM系统',
				amount: 420000,
				stage: '商务谈判',
				probability: 60
			}
		],
		createdAt: '2026-03-25'
	},
	{
		id: 'lead-016',
		name: '郭经理',
		company: '青岛酒店管理集团',
		source: 'referral',
		stage: 'new',
		owner: 'wang_wu',
		lastFollowUp: '2026-04-28',
		estimatedAmount: 260000,
		nextAction: 'email',
		nextActionDate: '2026-04-29',
		riskTags: [],
		email: 'guo.manager@qdhotel.com',
		phone: '13800138016',
		address: '青岛市市南区',
		description: '酒店管理集团，需要会员管理和预订系统升级，刚接触。',
		followUpRecords: [
			{
				id: 'f046',
				date: '2026-04-28',
				type: 'call',
				summary: '通过行业朋友推荐联系，客户对会员管理系统有兴趣。',
				createdBy: '王五'
			}
		],
		opportunities: [],
		createdAt: '2026-04-28'
	}
];
