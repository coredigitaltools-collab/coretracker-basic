const C='core-v4';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.add(self.location.href)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match(self.location.href)));return}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>r)))});
