!function(){"use strict";const e=1616842876276,t=`cache${e}`,c=["/client/client.9fad7e6e.js","/client/inject_styles.5607aec6.js","/client/index.d97cc7d1.js","/client/about.0d69b9a5.js"].concat(["/service-worker-index.html","/favicon.png","/global.css"]),n=new Set(c);self.addEventListener("install",(e=>{e.waitUntil(caches.open(t).then((e=>e.addAll(c))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const c of e)c!==t&&await caches.delete(c);self.clients.claim()})))})),self.addEventListener("fetch",(t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const c=new URL(t.request.url),s=c.protocol.startsWith("http"),a=c.hostname===self.location.hostname&&c.port!==self.location.port,i=c.host===self.location.host&&n.has(c.pathname),o="only-if-cached"===t.request.cache&&!i;!s||a||o||t.respondWith((async()=>i&&await caches.match(t.request)||async function(t){const c=await caches.open(`offline${e}`);try{const e=await fetch(t);return c.put(t,e.clone()),e}catch(e){const n=await c.match(t);if(n)return n;throw e}}(t.request))())}))}();
