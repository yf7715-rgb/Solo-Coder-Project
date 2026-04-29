/* empty css                                    */
import { c as createComponent, r as renderHead, a as renderComponent, F as Fragment, b as renderTemplate, d as renderScript, e as createAstro, f as addAttribute } from '../../chunks/astro/server_Bdf5zqmi.mjs';
import 'piccolore';
import 'html-escaper';
import { g as getCaseById, m as mockCases, a as getStatusByValue, b as getAllowedActions, A as ACTION_TYPES, c as getOrderTypeByValue, d as getRefundReasonByValue } from '../../chunks/config_C45IOTJS.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  return mockCases.map((caseItem) => ({
    params: { id: caseItem.id }
  }));
}
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const caseData = getCaseById(id);
  if (!caseData) {
    console.error(`Case not found: ${id}`);
  }
  return renderTemplate`<html> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>售后详情 - ${caseData?.id}</title><link rel="stylesheet" href="/styles/globals.css">${renderHead()}</head> <body class="min-h-screen bg-gray-50"> <div class="flex h-screen"> <aside class="w-64 bg-white border-r border-gray-200 flex flex-col"> <div class="p-4 border-b border-gray-200"> <h1 class="text-xl font-bold text-gray-900">售后处理中心</h1> <p class="text-sm text-gray-500">E-commerce Aftersales</p> </div> <nav class="flex-1 p-3 space-y-1"> <a href="/" class="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"> <span class="text-lg">📊</span> <span>概览</span> </a> <a href="/cases" class="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg bg-blue-50 text-blue-700"> <span class="text-lg">📋</span> <span>售后列表</span> </a> <a href="/statistics" class="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"> <span class="text-lg">📈</span> <span>统计分析</span> </a> <a href="/settings" class="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"> <span class="text-lg">⚙️</span> <span>系统设置</span> </a> </nav> <div class="p-4 border-t border-gray-200"> <div class="flex items-center gap-3"> <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"> <span class="text-blue-600 font-semibold">A</span> </div> <div class="flex-1 min-w-0"> <p class="text-sm font-medium text-gray-900 truncate">管理员</p> <p class="text-xs text-gray-500">admin@example.com</p> </div> </div> </div> </aside> <div class="flex-1 flex flex-col overflow-hidden"> <header class="bg-white border-b border-gray-200 px-6 py-4"> <div class="flex items-center justify-between"> <div> <h2 class="text-lg font-semibold text-gray-900">售后详情</h2> <p class="text-sm text-gray-500">查看售后单详细信息</p> </div> <div class="flex items-center gap-4"> <div class="relative"> <input type="text" placeholder="搜索售后单号..." class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"> <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span> </div> <button class="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"> <span class="text-xl">🔔</span> <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span> </button> </div> </div> </header> <main class="flex-1 overflow-y-auto p-6"> ${caseData ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <div class="flex items-center justify-between mb-6"> <div class="flex items-center gap-4"> <a href="/cases" class="text-gray-600 hover:text-gray-800"> <span class="text-xl">←</span> </a> <div> <h1 class="text-xl font-semibold text-gray-900">${caseData.id}</h1> ${(() => {
    const status = getStatusByValue(caseData.status);
    return renderTemplate`<span${addAttribute(`status-badge ${status.color}`, "class")}>${status.icon} ${status.label}</span>`;
  })()} </div> </div> <div class="flex items-center gap-3" id="action-buttons"> ${(() => {
    const allowedActions = getAllowedActions(caseData.status);
    const actions = [];
    if (allowedActions.includes("approve")) {
      actions.push(
        renderTemplate`<button${addAttribute(() => showConfirm("approve"), "onClick")} class="btn-primary"> ${ACTION_TYPES.APPROVE.buttonText} </button>`
      );
    }
    if (allowedActions.includes("reject")) {
      actions.push(
        renderTemplate`<button${addAttribute(() => showConfirm("reject"), "onClick")} class="btn-danger"> ${ACTION_TYPES.REJECT.buttonText} </button>`
      );
    }
    if (allowedActions.includes("request_materials")) {
      actions.push(
        renderTemplate`<button${addAttribute(() => showConfirm("request_materials"), "onClick")} class="btn-warning"> ${ACTION_TYPES.REQUEST_MATERIALS.buttonText} </button>`
      );
    }
    return actions;
  })()} </div> </div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"> <div class="lg:col-span-2 space-y-6"> <div class="bg-white rounded-xl border border-gray-200 p-6"> <h2 class="text-lg font-semibold text-gray-900 mb-4">订单摘要</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"> <div class="p-4 bg-gray-50 rounded-lg"> <p class="text-sm text-gray-500">订单号</p> <p class="font-medium text-gray-900">${caseData.orderId}</p> </div> <div class="p-4 bg-gray-50 rounded-lg"> <p class="text-sm text-gray-500">订单类型</p> <p class="font-medium text-gray-900">${getOrderTypeByValue(caseData.orderType).label}</p> </div> <div class="p-4 bg-gray-50 rounded-lg"> <p class="text-sm text-gray-500">申请时间</p> <p class="font-medium text-gray-900">${caseData.applyTime}</p> </div> <div class="p-4 bg-gray-50 rounded-lg"> <p class="text-sm text-gray-500">处理人</p> <p class="font-medium text-gray-900">${caseData.processorName || "\u5F85\u5206\u914D"}</p> </div> </div> </div> <div class="bg-white rounded-xl border border-gray-200 p-6"> <h2 class="text-lg font-semibold text-gray-900 mb-4">商品信息</h2> <div class="flex gap-4"> <img${addAttribute(caseData.productImage, "src")}${addAttribute(caseData.productName, "alt")} class="w-32 h-32 rounded-lg object-cover"> <div class="flex-1"> <h3 class="text-lg font-medium text-gray-900">${caseData.productName}</h3> <p class="text-gray-500 mt-1">规格：${caseData.productSku}</p> <div class="flex items-center gap-4 mt-4"> <span class="text-sm text-gray-500">原价：</span> <span class="text-gray-400 line-through">¥${caseData.originalAmount.toFixed(2)}</span> <span class="text-gray-500">|</span> <span class="text-sm text-gray-500">退款金额：</span> <span class="text-red-600 font-semibold">¥${caseData.refundAmount.toFixed(2)}</span> </div> </div> </div> </div> <div class="bg-white rounded-xl border border-gray-200 p-6"> <h2 class="text-lg font-semibold text-gray-900 mb-4">用户诉求</h2> <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"> <div class="flex items-start gap-3"> <span class="text-yellow-600 mt-1">💬</span> <div> <div class="flex items-center gap-2 mb-2"> <span class="font-medium text-gray-900">${caseData.userNickname}</span> <span class="text-sm text-gray-500">${caseData.applyTime}</span> </div> <p class="text-gray-700">${caseData.user\u8BC9\u6C42}</p> <div class="mt-3 flex items-center gap-2"> <span class="text-sm text-gray-500">申请原因：</span> <span class="text-sm font-medium text-yellow-700">${getRefundReasonByValue(caseData.refundReason).label}</span> </div> </div> </div> </div> </div> <div class="bg-white rounded-xl border border-gray-200 p-6"> <h2 class="text-lg font-semibold text-gray-900 mb-4">处理记录</h2> ${caseData.processingRecords.length > 0 ? renderTemplate`<div class="space-y-4" id="processing-records"> ${caseData.processingRecords.map((record, index) => renderTemplate`<div${addAttribute(record.id, "key")} class="relative"> ${index < caseData.processingRecords.length - 1 && renderTemplate`<div class="absolute left-4 top-12 w-0.5 h-full bg-gray-200"></div>`} <div class="flex gap-4"> <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0"> <span class="text-blue-600 text-sm font-medium">${record.operatorName.charAt(0)}</span> </div> <div class="flex-1 pb-4"> <div class="flex items-center gap-2"> <span class="font-medium text-gray-900">${record.action}</span> <span class="text-sm text-gray-500">${record.createdAt}</span> </div> <p class="text-sm text-gray-600 mt-1">操作人：${record.operatorName}</p> ${record.remark && renderTemplate`<p class="text-sm text-gray-500 mt-2 bg-gray-50 p-3 rounded-lg">${record.remark}</p>`} </div> </div> </div>`)} </div>` : renderTemplate`<div class="text-center py-8 text-gray-500"> <span class="text-3xl">📝</span> <p class="mt-2">暂无处理记录</p> </div>`} </div> </div> <div class="space-y-6"> <div class="bg-white rounded-xl border border-gray-200 p-6"> <h2 class="text-lg font-semibold text-gray-900 mb-4">退款明细</h2> ${caseData.refundDetails.length > 0 ? renderTemplate`<div class="space-y-3" id="refund-details"> ${caseData.refundDetails.map((detail) => renderTemplate`<div${addAttribute(detail.id, "key")} class="p-4 bg-gray-50 rounded-lg"> <div class="flex items-center justify-between"> <span class="text-gray-700">${detail.type}</span> <span class="font-medium text-green-600">¥${detail.amount.toFixed(2)}</span> </div> <div class="flex items-center justify-between mt-2"> <span class="text-sm text-gray-500">${detail.status}</span> ${detail.processedAt && renderTemplate`<span class="text-sm text-gray-400">${detail.processedAt}</span>`} </div> </div>`)} </div>` : renderTemplate`<div class="text-center py-8 text-gray-500"> <span class="text-3xl">💰</span> <p class="mt-2">暂无退款记录</p> </div>`} </div> <div class="bg-white rounded-xl border border-gray-200 p-6"> <h2 class="text-lg font-semibold text-gray-900 mb-4">状态说明</h2> <div class="space-y-3"> <div class="flex items-center gap-2"> ${(() => {
    const status = getStatusByValue(caseData.status);
    return renderTemplate`<span${addAttribute(`status-badge ${status.color}`, "class")}>${status.icon} ${status.label}</span>`;
  })()} <span class="text-sm text-gray-600">当前状态</span> </div> <div class="text-sm text-gray-500"> ${caseData.status === "pending" && "\u7B49\u5F85\u5BA2\u670D\u5904\u7406"} ${caseData.status === "processing" && "\u5BA2\u670D\u6B63\u5728\u5904\u7406\u4E2D"} ${caseData.status === "refunded" && "\u9000\u6B3E\u5DF2\u5B8C\u6210"} ${caseData.status === "rejected" && "\u9000\u6B3E\u5DF2\u62D2\u7EDD"} ${caseData.status === "pending_materials" && "\u7B49\u5F85\u7528\u6237\u8865\u5145\u6750\u6599"} </div> </div> </div> </div> </div> ` })}` : renderTemplate`<div class="bg-white rounded-xl border border-gray-200 p-12 text-center"> <span class="text-4xl">🔍</span> <p class="mt-4 text-gray-500">未找到对应的售后单</p> <a href="/cases" class="mt-4 inline-block text-blue-600 hover:underline">返回列表</a> </div>`} </main> </div> </div> <div id="confirm-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden"> <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4"> <div class="text-center mb-4"> <span id="confirm-icon" class="text-4xl"></span> <h3 id="confirm-title" class="text-lg font-semibold text-gray-900 mt-2"></h3> <p class="text-sm text-gray-500 mt-1">确认要执行此操作吗？</p> </div> <textarea id="remark-input" placeholder="请输入备注（可选）" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" rows="3"></textarea> <div class="flex gap-3"> <button id="cancel-btn" onClick="hideConfirm()" class="flex-1 btn-secondary">取消</button> <button id="confirm-btn" class="flex-1 btn-primary">确认</button> </div> </div> </div> ${renderScript($$result, "/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/cases/[id].astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/cases/[id].astro", void 0);

const $$file = "/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/cases/[id].astro";
const $$url = "/cases/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
