/* empty css                                 */
import { c as createComponent, a as renderComponent, b as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_Bdf5zqmi.mjs';
import 'piccolore';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_D4F9unDt.mjs';
import { e as getStatistics, R as REFUND_REASONS, m as mockCases, S as STATUS_CONFIG } from '../chunks/config_C45IOTJS.mjs';
export { renderers } from '../renderers.mjs';

const $$Statistics = createComponent(($$result, $$props, $$slots) => {
  const stats = getStatistics();
  const reasonCounts = {};
  Object.values(REFUND_REASONS).forEach((reason) => {
    reasonCounts[reason.value] = mockCases.filter((c) => c.refundReason === reason.value).length;
  });
  const totalRefundAmount = stats.totalAmount;
  const avgRefundAmount = totalRefundAmount / stats.total;
  const statusData = Object.values(STATUS_CONFIG).map((status) => ({
    label: status.label,
    count: mockCases.filter((c) => c.status === status.value).length,
    color: status.color
  }));
  const reasonData = Object.values(REFUND_REASONS).map((reason) => ({
    label: reason.label,
    count: reasonCounts[reason.value],
    percentage: stats.total > 0 ? (reasonCounts[reason.value] / stats.total * 100).toFixed(1) : "0"
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "currentPath": "/statistics" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"> <div class="bg-white rounded-xl p-6 border border-gray-200"> <div class="flex items-center justify-between"> <div> <p class="text-sm text-gray-500">售后总数</p> <p class="text-3xl font-bold text-gray-900 mt-1">${stats.total}</p> </div> <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"> <span class="text-2xl">📊</span> </div> </div> </div> <div class="bg-white rounded-xl p-6 border border-gray-200"> <div class="flex items-center justify-between"> <div> <p class="text-sm text-gray-500">待处理</p> <p class="text-3xl font-bold text-yellow-600 mt-1">${stats.pending}</p> </div> <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center"> <span class="text-2xl">⏳</span> </div> </div> </div> <div class="bg-white rounded-xl p-6 border border-gray-200"> <div class="flex items-center justify-between"> <div> <p class="text-sm text-gray-500">已退款</p> <p class="text-3xl font-bold text-green-600 mt-1">${stats.refunded}</p> </div> <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"> <span class="text-2xl">✅</span> </div> </div> </div> <div class="bg-white rounded-xl p-6 border border-gray-200"> <div class="flex items-center justify-between"> <div> <p class="text-sm text-gray-500">平均退款</p> <p class="text-3xl font-bold text-purple-600 mt-1">¥${avgRefundAmount.toFixed(2)}</p> </div> <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"> <span class="text-2xl">💰</span> </div> </div> </div> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"> <div class="bg-white rounded-xl border border-gray-200 p-6"> <h3 class="text-lg font-semibold text-gray-900 mb-4">状态分布</h3> <div class="space-y-4"> ${statusData.map((item) => renderTemplate`<div${addAttribute(item.label, "key")}> <div class="flex items-center justify-between mb-2"> <span class="text-sm text-gray-700">${item.label}</span> <span class="text-sm font-medium text-gray-900">${item.count}</span> </div> <div class="h-2 bg-gray-100 rounded-full overflow-hidden"> <div${addAttribute(`h-full ${item.color} transition-all duration-500`, "class")}${addAttribute({ width: `${item.count / stats.total * 100}%` }, "style")}></div> </div> </div>`)} </div> </div> <div class="bg-white rounded-xl border border-gray-200 p-6"> <h3 class="text-lg font-semibold text-gray-900 mb-4">退款原因分布</h3> <div class="space-y-3"> ${reasonData.map((item, index) => renderTemplate`<div${addAttribute(item.label, "key")} class="flex items-center gap-3"> <span class="w-6 text-sm text-gray-500">${index + 1}.</span> <span class="flex-1 text-sm text-gray-700">${item.label}</span> <span class="text-sm font-medium text-gray-900">${item.count}</span> <span class="text-sm text-gray-500 w-16 text-right">${item.percentage}%</span> </div>`)} </div> </div> </div> <div class="bg-white rounded-xl border border-gray-200 p-6"> <h3 class="text-lg font-semibold text-gray-900 mb-4">退款金额统计</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <div class="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl"> <p class="text-sm text-blue-600">总申请退款金额</p> <p class="text-2xl font-bold text-blue-700 mt-1">¥${totalRefundAmount.toFixed(2)}</p> </div> <div class="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl"> <p class="text-sm text-green-600">已退款金额</p> <p class="text-2xl font-bold text-green-700 mt-1">¥${stats.refundedAmount.toFixed(2)}</p> </div> <div class="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl"> <p class="text-sm text-yellow-600">待处理金额</p> <p class="text-2xl font-bold text-yellow-700 mt-1">¥${(totalRefundAmount - stats.refundedAmount).toFixed(2)}</p> </div> </div> </div> ` })}`;
}, "/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/statistics.astro", void 0);

const $$file = "/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/statistics.astro";
const $$url = "/statistics";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Statistics,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
