/* empty css                                 */
import { c as createComponent, a as renderComponent, b as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_Bdf5zqmi.mjs';
import 'piccolore';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_D4F9unDt.mjs';
import { e as getStatistics, S as STATUS_CONFIG, m as mockCases, a as getStatusByValue } from '../chunks/config_C45IOTJS.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const stats = getStatistics();
  const recentCases = mockCases.slice(0, 5);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "currentPath": "/" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"> <div class="bg-white rounded-xl p-6 border border-gray-200"> <div class="flex items-center justify-between"> <div> <p class="text-sm text-gray-500">售后总数</p> <p class="text-3xl font-bold text-gray-900 mt-1">${stats.total}</p> </div> <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"> <span class="text-2xl">📋</span> </div> </div> </div> <div class="bg-white rounded-xl p-6 border border-gray-200"> <div class="flex items-center justify-between"> <div> <p class="text-sm text-gray-500">待处理</p> <p class="text-3xl font-bold text-yellow-600 mt-1">${stats.pending}</p> </div> <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center"> <span class="text-2xl">⏳</span> </div> </div> </div> <div class="bg-white rounded-xl p-6 border border-gray-200"> <div class="flex items-center justify-between"> <div> <p class="text-sm text-gray-500">已退款</p> <p class="text-3xl font-bold text-green-600 mt-1">${stats.refunded}</p> </div> <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"> <span class="text-2xl">✅</span> </div> </div> </div> <div class="bg-white rounded-xl p-6 border border-gray-200"> <div class="flex items-center justify-between"> <div> <p class="text-sm text-gray-500">退款金额</p> <p class="text-3xl font-bold text-blue-600 mt-1">¥${stats.refundedAmount.toFixed(2)}</p> </div> <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"> <span class="text-2xl">💰</span> </div> </div> </div> </div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"> <div class="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6"> <h3 class="text-lg font-semibold text-gray-900 mb-4">状态分布</h3> <div class="flex items-end gap-4"> ${Object.values(STATUS_CONFIG).map((status) => {
    const count = mockCases.filter((c) => c.status === status.value).length;
    const maxCount = Math.max(...Object.values(STATUS_CONFIG).map((s) => mockCases.filter((c) => c.status === s.value).length));
    const height = maxCount > 0 ? count / maxCount * 200 : 0;
    return renderTemplate`<div${addAttribute(status.value, "key")} className="flex-1 flex flex-col items-center"> <div${addAttribute(`w-full rounded-t-lg transition-all duration-300 ${status.color}`, "className")}${addAttribute({ height: `${Math.max(height, 20)}px` }, "style")}></div> <p className="mt-2 text-sm font-medium text-gray-700">${status.label}</p> <p className="text-xs text-gray-500">${count} 单</p> </div>`;
  })} </div> </div> <div class="bg-white rounded-xl border border-gray-200 p-6"> <h3 class="text-lg font-semibold text-gray-900 mb-4">快捷操作</h3> <div class="space-y-3"> <a href="/cases?status=pending" class="block w-full p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"> <div class="flex items-center justify-between"> <span class="text-yellow-800 font-medium">处理待处理订单</span> <span class="text-yellow-600 font-bold">${stats.pending}</span> </div> </a> <a href="/cases?status=pending_materials" class="block w-full p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"> <div class="flex items-center justify-between"> <span class="text-purple-800 font-medium">跟进补材料订单</span> <span class="text-purple-600 font-bold">${stats.pendingMaterials}</span> </div> </a> <a href="/statistics" class="block w-full p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"> <div class="flex items-center justify-between"> <span class="text-blue-800 font-medium">查看统计分析</span> <span class="text-blue-600">📈</span> </div> </a> </div> </div> </div> <div class="mt-6 bg-white rounded-xl border border-gray-200 p-6"> <div class="flex items-center justify-between mb-4"> <h3 class="text-lg font-semibold text-gray-900">最近售后单</h3> <a href="/cases" class="text-sm text-blue-600 hover:text-blue-700">查看全部</a> </div> <div class="overflow-x-auto"> <table class="w-full text-sm"> <thead> <tr class="border-b border-gray-200"> <th class="text-left py-3 px-4 font-semibold text-gray-700">售后单号</th> <th class="text-left py-3 px-4 font-semibold text-gray-700">商品名称</th> <th class="text-left py-3 px-4 font-semibold text-gray-700">申请金额</th> <th class="text-left py-3 px-4 font-semibold text-gray-700">状态</th> <th class="text-left py-3 px-4 font-semibold text-gray-700">申请时间</th> </tr> </thead> <tbody> ${recentCases.map((item) => {
    const status = getStatusByValue(item.status);
    return renderTemplate`<tr${addAttribute(item.id, "key")} class="border-b border-gray-100 hover:bg-gray-50"> <td class="py-3 px-4"> <a${addAttribute(`/cases/${item.id}`, "href")} class="text-blue-600 hover:underline">${item.id}</a> </td> <td class="py-3 px-4">${item.productName}</td> <td class="py-3 px-4">¥${item.refundAmount.toFixed(2)}</td> <td class="py-3 px-4"> <span${addAttribute(`status-badge ${status.color}`, "class")}>${status.icon} ${status.label}</span> </td> <td class="py-3 px-4">${item.applyTime}</td> </tr>`;
  })} </tbody> </table> </div> </div> ` })}`;
}, "/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/index.astro", void 0);

const $$file = "/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
