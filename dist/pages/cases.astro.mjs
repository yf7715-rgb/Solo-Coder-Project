/* empty css                                 */
import { c as createComponent, a as renderComponent, d as renderScript, b as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_Bdf5zqmi.mjs';
import 'piccolore';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_D4F9unDt.mjs';
import { S as STATUS_CONFIG, O as ORDER_TYPES, R as REFUND_REASONS, m as mockCases, a as getStatusByValue, d as getRefundReasonByValue } from '../chunks/config_C45IOTJS.mjs';
export { renderers } from '../renderers.mjs';

const $$Cases = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "currentPath": "/cases" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-white rounded-xl border border-gray-200 p-6 mb-6"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-1">售后状态</label> <select id="status-filter" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"> <option value="">全部状态</option> ${Object.values(STATUS_CONFIG).map((status) => renderTemplate`<option${addAttribute(status.value, "key")}${addAttribute(status.value, "value")}>${status.label}</option>`)} </select> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">订单类型</label> <select id="order-type-filter" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"> <option value="">全部类型</option> ${Object.values(ORDER_TYPES).map((type) => renderTemplate`<option${addAttribute(type.value, "key")}${addAttribute(type.value, "value")}>${type.label}</option>`)} </select> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">申请原因</label> <select id="reason-filter" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"> <option value="">全部原因</option> ${Object.values(REFUND_REASONS).map((reason) => renderTemplate`<option${addAttribute(reason.value, "key")}${addAttribute(reason.value, "value")}>${reason.label}</option>`)} </select> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">开始时间</label> <input id="start-date" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">结束时间</label> <input id="end-date" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"> </div> </div> <div class="flex justify-end gap-3 mt-4"> <button id="reset-btn" class="btn-secondary">重置</button> </div> </div> <div class="bg-white rounded-xl border border-gray-200 overflow-hidden"> <div class="overflow-x-auto"> <table class="w-full text-sm" id="cases-table"> <thead> <tr class="bg-gray-50 border-b border-gray-200"> <th class="text-left py-3 px-4 font-semibold text-gray-700">售后单号</th> <th class="text-left py-3 px-4 font-semibold text-gray-700">关联订单号</th> <th class="text-left py-3 px-4 font-semibold text-gray-700">用户昵称</th> <th class="text-left py-3 px-4 font-semibold text-gray-700">商品名称</th> <th class="text-left py-3 px-4 font-semibold text-gray-700">申请原因</th> <th class="text-right py-3 px-4 font-semibold text-gray-700">退款金额</th> <th class="text-left py-3 px-4 font-semibold text-gray-700">当前状态</th> <th class="text-left py-3 px-4 font-semibold text-gray-700">申请时间</th> <th class="text-left py-3 px-4 font-semibold text-gray-700">处理人</th> </tr> </thead> <tbody> ${mockCases.map((item) => {
    const status = getStatusByValue(item.status);
    const refundReason = getRefundReasonByValue(item.refundReason);
    return renderTemplate`<tr${addAttribute(item.id, "key")} class="border-b border-gray-100 hover:bg-gray-50 case-row"${addAttribute(item.status, "data-status")}${addAttribute(item.orderType, "data-order-type")}${addAttribute(item.refundReason, "data-reason")}${addAttribute(item.applyTime.split(" ")[0], "data-date")}> <td class="py-3 px-4"> <a${addAttribute(`/cases/${item.id}`, "href")} class="text-blue-600 hover:underline font-medium">${item.id}</a> </td> <td class="py-3 px-4">${item.orderId}</td> <td class="py-3 px-4">${item.userNickname}</td> <td class="py-3 px-4"> <div class="flex items-center gap-2"> <img${addAttribute(item.productImage, "src")}${addAttribute(item.productName, "alt")} class="w-8 h-8 rounded object-cover"> <span>${item.productName}</span> </div> </td> <td class="py-3 px-4">${refundReason.label}</td> <td class="py-3 px-4 text-right font-medium">¥${item.refundAmount.toFixed(2)}</td> <td class="py-3 px-4"> <span${addAttribute(`status-badge ${status.color}`, "class")}>${status.icon} ${status.label}</span> </td> <td class="py-3 px-4">${item.applyTime}</td> <td class="py-3 px-4">${item.processorName || "-"}</td> </tr>`;
  })} </tbody> </table> </div> </div> ` })} ${renderScript($$result, "/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/cases.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/cases.astro", void 0);

const $$file = "/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/cases.astro";
const $$url = "/cases";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cases,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
