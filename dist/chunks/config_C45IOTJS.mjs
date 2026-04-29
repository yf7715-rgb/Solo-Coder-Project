const mockCases = [
  {
    id: "AS20240101001",
    orderId: "ORD20240101001",
    userId: "U001",
    userNickname: "小明",
    productName: "纯棉短袖T恤",
    productSku: "白色/M",
    productImage: "https://neeko-copilot.bytedance.net/api/text2image?prompt=white%20cotton%20t-shirt%20product%20photo%20white%20background&image_size=square",
    refundReason: "quality_issue",
    refundAmount: 99,
    originalAmount: 129,
    status: "pending",
    orderType: "normal",
    applyTime: "2024-01-01 10:30:00",
    user诉求: "收到的T恤有明显污渍，希望退货退款",
    processingRecords: [],
    refundDetails: []
  },
  {
    id: "AS20240101002",
    orderId: "ORD20240101002",
    userId: "U002",
    userNickname: "小红",
    productName: "无线蓝牙耳机",
    productSku: "黑色",
    productImage: "https://neeko-copilot.bytedance.net/api/text2image?prompt=wireless%20bluetooth%20earbuds%20black%20product%20photo%20white%20background&image_size=square",
    refundReason: "damaged",
    refundAmount: 299,
    originalAmount: 399,
    status: "processing",
    orderType: "flash",
    applyTime: "2024-01-02 14:20:00",
    processorId: "p001",
    processorName: "张三",
    user诉求: "耳机包装盒破损，怀疑是二手商品",
    processingRecords: [
      { id: "R001", action: "已受理", operatorId: "p001", operatorName: "张三", createdAt: "2024-01-02 15:00:00", remark: "已联系用户核实情况" }
    ],
    refundDetails: []
  },
  {
    id: "AS20240103003",
    orderId: "ORD20240103003",
    userId: "U003",
    userNickname: "小刚",
    productName: "运动休闲鞋",
    productSku: "灰色/42",
    productImage: "https://neeko-copilot.bytedance.net/api/text2image?prompt=gray%20sports%20running%20shoes%20product%20photo%20white%20background&image_size=square",
    refundReason: "size_issue",
    refundAmount: 399,
    originalAmount: 459,
    status: "refunded",
    orderType: "normal",
    applyTime: "2024-01-03 09:15:00",
    processorId: "p002",
    processorName: "李四",
    user诉求: "鞋子尺码偏大，穿着不合适",
    processingRecords: [
      { id: "R002", action: "已受理", operatorId: "p002", operatorName: "李四", createdAt: "2024-01-03 10:00:00" },
      { id: "R003", action: "已退款", operatorId: "p002", operatorName: "李四", createdAt: "2024-01-03 11:30:00", remark: "退款已原路返回" }
    ],
    refundDetails: [
      { id: "RD001", type: "商品退款", amount: 399, status: "已完成", processedAt: "2024-01-03 11:30:00" }
    ]
  },
  {
    id: "AS20240104004",
    orderId: "ORD20240104004",
    userId: "U004",
    userNickname: "小美",
    productName: "连衣裙",
    productSku: "粉色/L",
    productImage: "https://neeko-copilot.bytedance.net/api/text2image?prompt=pink%20ladies%20dress%20product%20photo%20white%20background&image_size=square",
    refundReason: "color_issue",
    refundAmount: 199,
    originalAmount: 259,
    status: "rejected",
    orderType: "groupon",
    applyTime: "2024-01-04 16:45:00",
    processorId: "p003",
    processorName: "王五",
    user诉求: "收到的裙子颜色与图片不符",
    processingRecords: [
      { id: "R004", action: "已受理", operatorId: "p003", operatorName: "王五", createdAt: "2024-01-04 17:00:00" },
      { id: "R005", action: "已拒绝", operatorId: "p003", operatorName: "王五", createdAt: "2024-01-04 18:30:00", remark: "颜色差异在正常范围内，不符合退款条件" }
    ],
    refundDetails: []
  },
  {
    id: "AS20240105005",
    orderId: "ORD20240105005",
    userId: "U005",
    userNickname: "小华",
    productName: "平板电脑",
    productSku: "10.1寸/64G",
    productImage: "https://neeko-copilot.bytedance.net/api/text2image?prompt=tablet%20computer%20silver%20product%20photo%20white%20background&image_size=square",
    refundReason: "not_as_described",
    refundAmount: 1299,
    originalAmount: 1599,
    status: "pending_materials",
    orderType: "preorder",
    applyTime: "2024-01-05 11:00:00",
    processorId: "p004",
    processorName: "赵六",
    user诉求: "实际配置与描述不符，运行内存不足",
    processingRecords: [
      { id: "R006", action: "已受理", operatorId: "p004", operatorName: "赵六", createdAt: "2024-01-05 12:00:00" },
      { id: "R007", action: "要求补充材料", operatorId: "p004", operatorName: "赵六", createdAt: "2024-01-05 14:00:00", remark: "请提供设备配置截图和购买凭证" }
    ],
    refundDetails: []
  },
  {
    id: "AS20240106006",
    orderId: "ORD20240106006",
    userId: "U006",
    userNickname: "小李",
    productName: "智能手表",
    productSku: "黑色/44mm",
    productImage: "https://neeko-copilot.bytedance.net/api/text2image?prompt=smart%20watch%20black%20product%20photo%20white%20background&image_size=square",
    refundReason: "quality_issue",
    refundAmount: 899,
    originalAmount: 999,
    status: "pending",
    orderType: "normal",
    applyTime: "2024-01-06 08:30:00",
    user诉求: "手表屏幕出现亮点，影响使用",
    processingRecords: [],
    refundDetails: []
  },
  {
    id: "AS20240107007",
    orderId: "ORD20240107007",
    userId: "U007",
    userNickname: "小王",
    productName: "机械键盘",
    productSku: "青轴/白光",
    productImage: "https://neeko-copilot.bytedance.net/api/text2image?prompt=mechanical%20keyboard%20black%20product%20photo%20white%20background&image_size=square",
    refundReason: "wrong_item",
    refundAmount: 249,
    originalAmount: 299,
    status: "processing",
    orderType: "flash",
    applyTime: "2024-01-07 13:20:00",
    processorId: "p001",
    processorName: "张三",
    user诉求: "收到的是红轴键盘，我要的是青轴",
    processingRecords: [
      { id: "R008", action: "已受理", operatorId: "p001", operatorName: "张三", createdAt: "2024-01-07 14:00:00" }
    ],
    refundDetails: []
  },
  {
    id: "AS20240108008",
    orderId: "ORD20240108008",
    userId: "U008",
    userNickname: "小陈",
    productName: "保温杯",
    productSku: "银色/500ml",
    productImage: "https://neeko-copilot.bytedance.net/api/text2image?prompt=stainless%20steel%20thermos%20cup%20silver%20product%20photo%20white%20background&image_size=square",
    refundReason: "no_need",
    refundAmount: 69,
    originalAmount: 89,
    status: "pending",
    orderType: "normal",
    applyTime: "2024-01-08 10:00:00",
    user诉求: "买错了，不需要了",
    processingRecords: [],
    refundDetails: []
  },
  {
    id: "AS20240109009",
    orderId: "ORD20240109009",
    userId: "U009",
    userNickname: "小刘",
    productName: "床上四件套",
    productSku: "灰色/1.8m",
    productImage: "https://neeko-copilot.bytedance.net/api/text2image?prompt=bedding%20set%20gray%20product%20photo%20white%20background&image_size=square",
    refundReason: "quality_issue",
    refundAmount: 199,
    originalAmount: 259,
    status: "refunded",
    orderType: "groupon",
    applyTime: "2024-01-09 15:30:00",
    processorId: "p002",
    processorName: "李四",
    user诉求: "面料起球严重，质量太差",
    processingRecords: [
      { id: "R009", action: "已受理", operatorId: "p002", operatorName: "李四", createdAt: "2024-01-09 16:00:00" },
      { id: "R010", action: "已退款", operatorId: "p002", operatorName: "李四", createdAt: "2024-01-09 17:30:00", remark: "已全额退款" }
    ],
    refundDetails: [
      { id: "RD002", type: "商品退款", amount: 199, status: "已完成", processedAt: "2024-01-09 17:30:00" }
    ]
  },
  {
    id: "AS20240110010",
    orderId: "ORD20240110010",
    userId: "U010",
    userNickname: "小赵",
    productName: "剃须刀",
    productSku: "电动/三刀头",
    productImage: "https://neeko-copilot.bytedance.net/api/text2image?prompt=electric%20shaver%20silver%20product%20photo%20white%20background&image_size=square",
    refundReason: "damaged",
    refundAmount: 189,
    originalAmount: 239,
    status: "rejected",
    orderType: "normal",
    applyTime: "2024-01-10 09:00:00",
    processorId: "p003",
    processorName: "王五",
    user诉求: "剃须刀收到时已经损坏",
    processingRecords: [
      { id: "R011", action: "已受理", operatorId: "p003", operatorName: "王五", createdAt: "2024-01-10 10:00:00" },
      { id: "R012", action: "已拒绝", operatorId: "p003", operatorName: "王五", createdAt: "2024-01-10 11:00:00", remark: "无证据证明是运输损坏，无法退款" }
    ],
    refundDetails: []
  },
  {
    id: "AS20240111011",
    orderId: "ORD20240111011",
    userId: "U011",
    userNickname: "小孙",
    productName: "蓝牙耳机",
    productSku: "白色",
    productImage: "https://neeko-copilot.bytedance.net/api/text2image?prompt=white%20bluetooth%20earbuds%20product%20photo%20white%20background&image_size=square",
    refundReason: "other",
    refundAmount: 159,
    originalAmount: 199,
    status: "pending_materials",
    orderType: "preorder",
    applyTime: "2024-01-11 14:00:00",
    processorId: "p004",
    processorName: "赵六",
    user诉求: "购买后发现不支持我的设备",
    processingRecords: [
      { id: "R013", action: "已受理", operatorId: "p004", operatorName: "赵六", createdAt: "2024-01-11 15:00:00" },
      { id: "R014", action: "要求补充材料", operatorId: "p004", operatorName: "赵六", createdAt: "2024-01-11 16:00:00", remark: "请提供设备型号信息" }
    ],
    refundDetails: []
  },
  {
    id: "AS20240112012",
    orderId: "ORD20240112012",
    userId: "U012",
    userNickname: "小钱",
    productName: "手机壳",
    productSku: "透明/iPhone15",
    productImage: "https://neeko-copilot.bytedance.net/api/text2image?prompt=transparent%20phone%20case%20product%20photo%20white%20background&image_size=square",
    refundReason: "not_as_described",
    refundAmount: 29,
    originalAmount: 39,
    status: "pending",
    orderType: "normal",
    applyTime: "2024-01-12 11:30:00",
    user诉求: "厚度与描述不符，太薄了",
    processingRecords: [],
    refundDetails: []
  }
];
function getCaseById(id) {
  return mockCases.find((c) => c.id === id);
}
function getStatistics() {
  const total = mockCases.length;
  const pending = mockCases.filter((c) => c.status === "pending").length;
  const processing = mockCases.filter((c) => c.status === "processing").length;
  const refunded = mockCases.filter((c) => c.status === "refunded").length;
  const rejected = mockCases.filter((c) => c.status === "rejected").length;
  const pendingMaterials = mockCases.filter((c) => c.status === "pending_materials").length;
  const totalAmount = mockCases.reduce((sum, c) => sum + c.refundAmount, 0);
  const refundedAmount = mockCases.filter((c) => c.status === "refunded").reduce((sum, c) => sum + c.refundAmount, 0);
  return {
    total,
    pending,
    processing,
    refunded,
    rejected,
    pendingMaterials,
    totalAmount,
    refundedAmount
  };
}

const STATUS_CONFIG = {
  PENDING: { value: "pending", label: "待处理", color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
  PROCESSING: { value: "processing", label: "处理中", color: "bg-blue-100 text-blue-800", icon: "🔄" },
  REFUNDED: { value: "refunded", label: "已退款", color: "bg-green-100 text-green-800", icon: "✅" },
  REJECTED: { value: "rejected", label: "已拒绝", color: "bg-red-100 text-red-800", icon: "❌" },
  PENDING_MATERIALS: { value: "pending_materials", label: "补材料中", color: "bg-purple-100 text-purple-800", icon: "📋" }
};
const ORDER_TYPES = {
  NORMAL: { value: "normal", label: "普通订单" },
  GROUPON: { value: "groupon", label: "团购订单" },
  PREORDER: { value: "preorder", label: "预售订单" },
  FLASH: { value: "flash", label: "秒杀订单" }
};
const REFUND_REASONS = {
  QUALITY_ISSUE: { value: "quality_issue", label: "商品质量问题" },
  WRONG_ITEM: { value: "wrong_item", label: "发错商品" },
  DAMAGED: { value: "damaged", label: "商品损坏" },
  NOT_AS_DESCRIBED: { value: "not_as_described", label: "与描述不符" },
  SIZE_ISSUE: { value: "size_issue", label: "尺码不合适" },
  COLOR_ISSUE: { value: "color_issue", label: "颜色不对" },
  NO_NEED: { value: "no_need", label: "不想要了" },
  OTHER: { value: "other", label: "其他原因" }
};
const ACTION_TYPES = {
  APPROVE: { value: "approve", buttonText: "同意退款"},
  REJECT: { value: "reject", buttonText: "拒绝退款"},
  REQUEST_MATERIALS: { value: "request_materials", buttonText: "要求补充材料"}
};
const NAV_ITEMS = [
  { path: "/", label: "概览", icon: "📊" },
  { path: "/cases", label: "售后列表", icon: "📋" },
  { path: "/statistics", label: "统计分析", icon: "📈" },
  { path: "/settings", label: "系统设置", icon: "⚙️" }
];
const STATUS_TRANSITIONS = {
  [STATUS_CONFIG.PENDING.value]: {
    allowedActions: [ACTION_TYPES.APPROVE.value, ACTION_TYPES.REJECT.value, ACTION_TYPES.REQUEST_MATERIALS.value],
    nextStatus: {
      [ACTION_TYPES.APPROVE.value]: STATUS_CONFIG.REFUNDED.value,
      [ACTION_TYPES.REJECT.value]: STATUS_CONFIG.REJECTED.value,
      [ACTION_TYPES.REQUEST_MATERIALS.value]: STATUS_CONFIG.PENDING_MATERIALS.value
    }
  },
  [STATUS_CONFIG.PROCESSING.value]: {
    allowedActions: [ACTION_TYPES.APPROVE.value, ACTION_TYPES.REJECT.value, ACTION_TYPES.REQUEST_MATERIALS.value],
    nextStatus: {
      [ACTION_TYPES.APPROVE.value]: STATUS_CONFIG.REFUNDED.value,
      [ACTION_TYPES.REJECT.value]: STATUS_CONFIG.REJECTED.value,
      [ACTION_TYPES.REQUEST_MATERIALS.value]: STATUS_CONFIG.PENDING_MATERIALS.value
    }
  },
  [STATUS_CONFIG.PENDING_MATERIALS.value]: {
    allowedActions: [ACTION_TYPES.APPROVE.value, ACTION_TYPES.REJECT.value],
    nextStatus: {
      [ACTION_TYPES.APPROVE.value]: STATUS_CONFIG.REFUNDED.value,
      [ACTION_TYPES.REJECT.value]: STATUS_CONFIG.REJECTED.value
    }
  },
  [STATUS_CONFIG.REFUNDED.value]: {
    allowedActions: [],
    nextStatus: {}
  },
  [STATUS_CONFIG.REJECTED.value]: {
    allowedActions: [],
    nextStatus: {}
  }
};
function getStatusByValue(value) {
  const status = Object.values(STATUS_CONFIG).find((s) => s.value === value);
  return status || STATUS_CONFIG.PENDING;
}
function getOrderTypeByValue(value) {
  const type = Object.values(ORDER_TYPES).find((t) => t.value === value);
  return type || ORDER_TYPES.NORMAL;
}
function getRefundReasonByValue(value) {
  const reason = Object.values(REFUND_REASONS).find((r) => r.value === value);
  return reason || REFUND_REASONS.OTHER;
}
function getAllowedActions(status) {
  const transition = STATUS_TRANSITIONS[status];
  return transition ? transition.allowedActions : [];
}

export { ACTION_TYPES as A, NAV_ITEMS as N, ORDER_TYPES as O, REFUND_REASONS as R, STATUS_CONFIG as S, getStatusByValue as a, getAllowedActions as b, getOrderTypeByValue as c, getRefundReasonByValue as d, getStatistics as e, getCaseById as g, mockCases as m };
