import { c as createComponent, m as maybeRenderHead, f as addAttribute, b as renderTemplate, e as createAstro, d as renderScript, r as renderHead, a as renderComponent } from './astro/server_Bdf5zqmi.mjs';
import 'piccolore';
import 'html-escaper';
import 'clsx';
import { N as NAV_ITEMS, e as getStatistics } from './config_C45IOTJS.mjs';

const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<aside class="w-64 bg-white border-r border-gray-200 flex flex-col"> <div class="p-4 border-b border-gray-200"> <h1 class="text-xl font-bold text-gray-900">售后处理中心</h1> <p class="text-sm text-gray-500">E-commerce Aftersales</p> </div> <nav class="flex-1 p-3 space-y-1"> ${NAV_ITEMS.map((item) => renderTemplate`<a${addAttribute(item.path, "href")}${addAttribute(`sidebar-link ${currentPath === item.path ? "sidebar-link-active" : "sidebar-link-inactive"}`, "class")}> <span class="text-lg">${item.icon}</span> <span>${item.label}</span> </a>`)} </nav> <div class="p-4 border-t border-gray-200"> <div class="flex items-center gap-3"> <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"> <span class="text-blue-600 font-semibold">A</span> </div> <div class="flex-1 min-w-0"> <p class="text-sm font-medium text-gray-900 truncate">管理员</p> <p class="text-xs text-gray-500">admin@example.com</p> </div> </div> </div> </aside>`;
}, "/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/components/Sidebar.astro", void 0);

const $$Astro = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Header;
  const stats = getStatistics();
  return renderTemplate`${maybeRenderHead()}<header class="bg-white border-b border-gray-200 px-6 py-4"> <div class="flex items-center justify-between"> <div> <h2 class="text-lg font-semibold text-gray-900"> ${Astro2.url.pathname === "/" ? "\u6982\u89C8" : Astro2.url.pathname === "/cases" ? "\u552E\u540E\u5217\u8868" : Astro2.url.pathname.startsWith("/cases/") ? "\u552E\u540E\u8BE6\u60C5" : Astro2.url.pathname === "/statistics" ? "\u7EDF\u8BA1\u5206\u6790" : "\u7CFB\u7EDF\u8BBE\u7F6E"} </h2> <p class="text-sm text-gray-500">
共 ${stats.total} 个售后单，待处理 ${stats.pending} 个
</p> </div> <div class="flex items-center gap-4"> <div class="relative"> <input type="text" placeholder="搜索售后单号..." class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"> <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span> </div> <button class="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"> <span class="text-xl">🔔</span> <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span> </button> </div> </div> </header>`;
}, "/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/components/Header.astro", void 0);

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="zh-CN"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>售后处理中心</title><link rel="stylesheet" href="/styles/globals.css">${renderScript($$result, "/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")}${renderHead()}</head> <body class="min-h-screen bg-gray-50"> <div class="flex h-screen"> ${renderComponent($$result, "Sidebar", $$Sidebar, { "currentPath": currentPath })} <div class="flex-1 flex flex-col overflow-hidden"> ${renderComponent($$result, "Header", $$Header, {})} <main class="flex-1 overflow-y-auto p-6"> ${children} </main> </div> </div> </body></html>`;
}, "/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
