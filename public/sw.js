<<<<<<< HEAD
if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-1bb06f5e"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"058a3c1cea3a31f504e03fdd91c17ffa"},{url:"/_next/static/chunks/109.384da237d0d63fb9.js",revision:"384da237d0d63fb9"},{url:"/_next/static/chunks/168.97f6c00c2c4570b9.js",revision:"97f6c00c2c4570b9"},{url:"/_next/static/chunks/23-41b9dc0bedd4af04.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/chunks/349.7a35e601a70ead55.js",revision:"7a35e601a70ead55"},{url:"/_next/static/chunks/365.8c2e0438665abfda.js",revision:"8c2e0438665abfda"},{url:"/_next/static/chunks/474-1b4ff9f43503960b.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/chunks/580-d837dc3cc12f415d.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/chunks/654.8a9eaa7f2fed1235.js",revision:"8a9eaa7f2fed1235"},{url:"/_next/static/chunks/734.9f2cb078470317b4.js",revision:"9f2cb078470317b4"},{url:"/_next/static/chunks/870fdd6f.ebab32641c9b3e00.js",revision:"ebab32641c9b3e00"},{url:"/_next/static/chunks/975.f88b209c94cc6917.js",revision:"f88b209c94cc6917"},{url:"/_next/static/chunks/app/_not-found/page-df19ebf858da822d.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/chunks/app/dashboard/page-1ff3110f61afff9a.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/chunks/app/layout-a0dcd9494f489ebf.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/chunks/app/login/page-d9c155ea1a1657b1.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/chunks/app/page-9a1877a8373bc40b.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/chunks/app/profile/%5Bprofile%5D/page-d161f71a2afcc4d4.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/chunks/app/register/page-d7619d8e8bd97f43.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/chunks/fd9d1056-e24e3e5a4e5bc1d9.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/chunks/main-ad0e4aeaaa163688.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/chunks/main-app-9de01b5c298ef038.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-fccd4219f3bbbfcb.js",revision:"ebO99zrgLJAuFbC6IX4jN"},{url:"/_next/static/css/1ba6068c289beb60.css",revision:"1ba6068c289beb60"},{url:"/_next/static/css/27b4d6b789fddb24.css",revision:"27b4d6b789fddb24"},{url:"/_next/static/css/d3df112486f97f47.css",revision:"d3df112486f97f47"},{url:"/_next/static/ebO99zrgLJAuFbC6IX4jN/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/ebO99zrgLJAuFbC6IX4jN/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/_next/static/media/dark-logo.3eed7243.svg",revision:"014e35fee0ab903d5f2174c2c79692de"},{url:"/_next/static/media/s1.c3dcb5fc.jpg",revision:"e53ea762e6f4f26abfa2be39014a8d61"},{url:"/_next/static/media/user1.e101e644.jpg",revision:"7e24225bbd7a00dd746e6b05f639d4b1"},{url:"/images/favicon.png",revision:"bd8c7fe660cc983b056829ecb85e4e8b"},{url:"/images/icon-192.png",revision:"2858c0676121054a901c256df4bc2666"},{url:"/images/icon-512.png",revision:"dd2976f67c63a78e6c0f71168767eab2"},{url:"/images/icon-maskable-192.png",revision:"0b702de4b33fe8e96c1553b2f70f3ae8"},{url:"/images/icon-maskable-512.png",revision:"0708d251b1a0316d2c06b684bf20c026"},{url:"/images/logos/dark-logo.svg",revision:"014e35fee0ab903d5f2174c2c79692de"},{url:"/images/products/s1.jpg",revision:"e53ea762e6f4f26abfa2be39014a8d61"},{url:"/images/products/s11.jpg",revision:"072e766f595fb23b4600d85abf74671c"},{url:"/images/products/s4.jpg",revision:"4b640e0cf7213a3e04d40bb3d52b515c"},{url:"/images/products/s5.jpg",revision:"f12276205a64e49c2b9c54ad4981da9a"},{url:"/images/products/s7.jpg",revision:"9b5c7463bd89e9c2a585860eadf1c17d"},{url:"/images/profile/user1.jpg",revision:"7e24225bbd7a00dd746e6b05f639d4b1"},{url:"/images/profile/user2.jpg",revision:"1003ed327540b1d9404f74efb84fdff9"},{url:"/images/profile/user3.jpg",revision:"b623ce74636dc5ecc2eb923671f8e844"},{url:"/images/profile/user4.jpg",revision:"12b03548d19946a4e9cefba100697877"},{url:"/images/profile/user5.jpg",revision:"49fe170c94e2e11dde8c1e30499706b8"},{url:"/manifest.json",revision:"b8d9136f58596d5a01863c5331efd39e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
=======
/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-bd7e3b9b'], (function (workbox) { 'use strict';

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [{
      cacheWillUpdate: async ({
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') {
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }
        return response;
      }
    }]
  }), 'GET');
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
    "cacheName": "dev",
    plugins: []
  }), 'GET');

}));
//# sourceMappingURL=sw.js.map
>>>>>>> 1e38f8aa71b768b3b86b17f90428b2ff782ca143
