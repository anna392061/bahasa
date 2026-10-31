// V3: network-first HTML navigation so GitHub Pages updates reach installed PWAs.
const CACHE_NAME='bahasa-offline-v3-7-core-meaning-pron';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);if(url.origin!==location.origin)return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).then(res=>{if(res.ok){const clone=res.clone();caches.open(CACHE_NAME).then(c=>c.put('./index.html',clone));}return res;}).catch(()=>caches.match('./index.html')));
  return;
 }
 event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(event.request,copy));}return res;})));
});
