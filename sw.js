/* 한 번 연 뒤에는 인터넷이 없어도 열리게 한다 */
var V="qp-cd861e7abd12",CORE=["./", "index.html", "manifest.webmanifest", "icon-192.png", "data.enc", "fonts/P-Light.ttf", "fonts/P-Medium.ttf", "fonts/P-Regular.ttf", "fonts/P-SemiBold.ttf", "fonts/P-Thin.ttf", "lib/cmaps-ko.json", "lib/fontkit.umd.min.js", "lib/jszip.min.js", "lib/pdf-lib.min.js", "lib/pdf.min.js", "lib/pdf.worker.min.js", "lib/xlsx.full.min.js"];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(CORE);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  var u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  var fresh=/(\/|index\.html|data\.enc|manifest\.webmanifest)$/.test(u.pathname);
  if(fresh)e.respondWith(fetch(e.request).then(function(r){if(r.ok){var cp=r.clone();caches.open(V).then(function(c){c.put(e.request,cp);});}return r;}).catch(function(){return caches.match(e.request,{ignoreSearch:true}).then(function(m){return m||caches.match('./');});}));
  else e.respondWith(caches.match(e.request).then(function(m){return m||fetch(e.request).then(function(r){if(r.ok){var cp=r.clone();caches.open(V).then(function(c){c.put(e.request,cp);});}return r;});}));
});
