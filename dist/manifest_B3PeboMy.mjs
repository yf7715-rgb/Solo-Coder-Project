import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, g as decodeKey } from './chunks/astro/server_Bdf5zqmi.mjs';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/","cacheDir":"file:///Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/node_modules/.astro/","outDir":"file:///Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/dist/","srcDir":"file:///Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/","publicDir":"file:///Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/public/","buildClientDir":"file:///Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/dist/client/","buildServerDir":"file:///Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/dist/server/","adapterName":"","routes":[{"file":"file:///Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/dist/cases/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cases","isIndex":false,"type":"page","pattern":"^\\/cases\\/?$","segments":[[{"content":"cases","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cases.astro","pathname":"/cases","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/dist/settings/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/settings","isIndex":false,"type":"page","pattern":"^\\/settings\\/?$","segments":[[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/settings.astro","pathname":"/settings","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/dist/statistics/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/statistics","isIndex":false,"type":"page","pattern":"^\\/statistics\\/?$","segments":[[{"content":"statistics","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/statistics.astro","pathname":"/statistics","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/cases/[id].astro",{"propagation":"none","containsHead":true}],["/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/cases.astro",{"propagation":"none","containsHead":true}],["/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/settings.astro",{"propagation":"none","containsHead":true}],["/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/statistics.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/cases/[id]@_@astro":"pages/cases/_id_.astro.mjs","\u0000@astro-page:src/pages/cases@_@astro":"pages/cases.astro.mjs","\u0000@astro-page:src/pages/settings@_@astro":"pages/settings.astro.mjs","\u0000@astro-page:src/pages/statistics@_@astro":"pages/statistics.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_B3PeboMy.mjs","/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/settings.astro?astro&type=script&index=0&lang.ts":"_astro/settings.astro_astro_type_script_index_0_lang.l0sNRNKZ.js","/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.BV4ng9E_.js","/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/cases/[id].astro?astro&type=script&index=0&lang.ts":"_astro/_id_.astro_astro_type_script_index_0_lang.CuEyp5T_.js","/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/cases.astro?astro&type=script&index=0&lang.ts":"_astro/cases.astro_astro_type_script_index_0_lang.CSi0oxSb.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/settings.astro?astro&type=script&index=0&lang.ts",""],["/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/cases/[id].astro?astro&type=script&index=0&lang.ts","const p='{caseData?.id || \"\"}';let l=\"\";function u(){document.getElementById(\"confirm-modal\").classList.add(\"hidden\"),document.getElementById(\"remark-input\").value=\"\",l=\"\"}function g(e){const a=document.getElementById(\"remark-input\").value;fetch(\"/api/update-case\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({id:p,action:e,remark:a})}).then(r=>r.json()).then(r=>{r.success&&location.reload()}).catch(()=>{f(e,a)})}function f(e,a){const r={pending:{approve:\"refunded\",reject:\"rejected\",request_materials:\"pending_materials\"},processing:{approve:\"refunded\",reject:\"rejected\",request_materials:\"pending_materials\"},pending_materials:{approve:\"refunded\",reject:\"rejected\"},refunded:{},rejected:{}},m={approve:\"已退款\",reject:\"已拒绝\",request_materials:\"要求补充材料\"},d=document.querySelector(\".status-badge\");if(d){const t=r[currentCaseDataStatus]?.[e];if(t){const c={refunded:\"bg-green-100 text-green-800\",rejected:\"bg-red-100 text-red-800\",pending_materials:\"bg-purple-100 text-purple-800\",pending:\"bg-yellow-100 text-yellow-800\",processing:\"bg-blue-100 text-blue-800\"},s={refunded:\"✅\",rejected:\"❌\",pending_materials:\"📋\",pending:\"⏳\",processing:\"🔄\"},n={refunded:\"已退款\",rejected:\"已拒绝\",pending_materials:\"补材料中\",pending:\"待处理\",processing:\"处理中\"};d.className=`status-badge ${c[t]}`,d.textContent=`${s[t]} ${n[t]}`}}const i=document.getElementById(\"processing-records\");if(i){const c=new Date().toISOString().replace(\"T\",\" \").slice(0,19),s=document.createElement(\"div\");s.className=\"relative\";const n=i.querySelector(\".relative:last-child\");n&&n.querySelector(\".absolute.left-4.top-12\")?.remove(),s.innerHTML=`\n          <div class=\"flex gap-4\">\n            <div class=\"w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0\">\n              <span class=\"text-blue-600 text-sm font-medium\">张</span>\n            </div>\n            <div class=\"flex-1 pb-4\">\n              <div class=\"flex items-center gap-2\">\n                <span class=\"font-medium text-gray-900\">${m[e]}</span>\n                <span class=\"text-sm text-gray-500\">${c}</span>\n              </div>\n              <p class=\"text-sm text-gray-600 mt-1\">操作人：张三</p>\n              ${a?`<p class=\"text-sm text-gray-500 mt-2 bg-gray-50 p-3 rounded-lg\">${a}</p>`:\"\"}\n            </div>\n          </div>\n        `,i.appendChild(s)}if(e===\"approve\"){const t=document.getElementById(\"refund-details\");if(t){const s=new Date().toISOString().replace(\"T\",\" \").slice(0,19),n=document.createElement(\"div\");n.className=\"p-4 bg-gray-50 rounded-lg\",n.innerHTML=`\n            <div class=\"flex items-center justify-between\">\n              <span class=\"text-gray-700\">商品退款</span>\n              <span class=\"font-medium text-green-600\">¥${currentCaseRefundAmount}</span>\n            </div>\n            <div class=\"flex items-center justify-between mt-2\">\n              <span class=\"text-sm text-gray-500\">已完成</span>\n              <span class=\"text-sm text-gray-400\">${s}</span>\n            </div>\n          `,t.appendChild(n)}}const o=document.getElementById(\"action-buttons\");e===\"approve\"||e===\"reject\"?o.innerHTML=\"\":e===\"request_materials\"&&(o.querySelector(\".btn-danger\"),o.querySelector(\".btn-warning\")?.remove()),u()}document.getElementById(\"confirm-btn\").addEventListener(\"click\",function(){g(l)});document.getElementById(\"cancel-btn\").addEventListener(\"click\",u);window.currentCaseDataStatus='{caseData?.status || \"\"}';window.currentCaseRefundAmount='{caseData?.refundAmount || \"0\"}';"],["/Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/src/pages/cases.astro?astro&type=script&index=0&lang.ts","const n=document.getElementById(\"status-filter\"),s=document.getElementById(\"order-type-filter\"),d=document.getElementById(\"reason-filter\"),l=document.getElementById(\"start-date\"),r=document.getElementById(\"end-date\"),v=document.getElementById(\"reset-btn\"),m=document.querySelectorAll(\".case-row\");function a(){const c=n.value,o=s.value,u=d.value,i=l.value,f=r.value;m.forEach(e=>{let t=!0;c&&e.dataset.status!==c&&(t=!1),o&&e.dataset.orderType!==o&&(t=!1),u&&e.dataset.reason!==u&&(t=!1),i&&e.dataset.date<i&&(t=!1),f&&e.dataset.date>f&&(t=!1),e.style.display=t?\"\":\"none\"})}n.addEventListener(\"change\",a);s.addEventListener(\"change\",a);d.addEventListener(\"change\",a);l.addEventListener(\"change\",a);r.addEventListener(\"change\",a);v.addEventListener(\"click\",()=>{n.value=\"\",s.value=\"\",d.value=\"\",l.value=\"\",r.value=\"\",a()});"]],"assets":["/file:///Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/dist/cases/index.html","/file:///Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/dist/settings/index.html","/file:///Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/dist/statistics/index.html","/file:///Users/yangfan/Desktop/ai/Solo-Coder-Project-prompt-02/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"XsxY7lCgi7F2/7pF19GLL0L8JqNYyF/woGpiFL7WvsQ="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
