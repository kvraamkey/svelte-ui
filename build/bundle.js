var app=function(){"use strict";function t(){}const n=t=>t;function e(t,n){for(const e in n)t[e]=n[e];return t}function s(t){return t()}function o(){return Object.create(null)}function a(t){t.forEach(s)}function l(t){return"function"==typeof t}function r(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function c(n,e,s){n.$$.on_destroy.push(function(n,...e){if(null==n)return t;const s=n.subscribe(...e);return s.unsubscribe?()=>s.unsubscribe():s}(e,s))}function i(t,n,e,s){if(t){const o=u(t,n,e,s);return t[0](o)}}function u(t,n,s,o){return t[1]&&o?e(s.ctx.slice(),t[1](o(n))):s.ctx}function d(t,n,e,s,o,a,l){const r=function(t,n,e,s){if(t[2]&&s){const o=t[2](s(e));if(void 0===n.dirty)return o;if("object"==typeof o){const t=[],e=Math.max(n.dirty.length,o.length);for(let s=0;s<e;s+=1)t[s]=n.dirty[s]|o[s];return t}return n.dirty|o}return n.dirty}(n,s,o,a);if(r){const o=u(n,e,s,l);t.p(o,r)}}const p="undefined"!=typeof window;let f=p?()=>window.performance.now():()=>Date.now(),h=p?t=>requestAnimationFrame(t):t;const m=new Set;function $(t){m.forEach(n=>{n.c(t)||(m.delete(n),n.f())}),0!==m.size&&h($)}function g(t,n){t.appendChild(n)}function b(t,n,e){t.insertBefore(n,e||null)}function y(t){t.parentNode.removeChild(t)}function x(t){return document.createElement(t)}function j(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function w(t){return document.createTextNode(t)}function v(){return w(" ")}function k(t,n,e,s){return t.addEventListener(n,e,s),()=>t.removeEventListener(n,e,s)}function _(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function B(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}class C{constructor(t=null){this.a=t,this.e=this.n=null}m(t,n,e=null){this.e||(this.e=x(n.nodeName),this.t=n,this.h(t)),this.i(e)}h(t){this.e.innerHTML=t,this.n=Array.from(this.e.childNodes)}i(t){for(let n=0;n<this.n.length;n+=1)b(this.t,this.n[n],t)}p(t){this.d(),this.h(t),this.i(this.a)}d(){this.n.forEach(y)}}const E=new Set;let q,M=0;function T(t,n,e,s,o,a,l,r=0){const c=16.666/s;let i="{\n";for(let t=0;t<=1;t+=c){const s=n+(e-n)*a(t);i+=100*t+`%{${l(s,1-s)}}\n`}const u=i+`100% {${l(e,1-e)}}\n}`,d=`__svelte_${function(t){let n=5381,e=t.length;for(;e--;)n=(n<<5)-n^t.charCodeAt(e);return n>>>0}(u)}_${r}`,p=t.ownerDocument;E.add(p);const f=p.__svelte_stylesheet||(p.__svelte_stylesheet=p.head.appendChild(x("style")).sheet),h=p.__svelte_rules||(p.__svelte_rules={});h[d]||(h[d]=!0,f.insertRule(`@keyframes ${d} ${u}`,f.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?m+", ":""}${d} ${s}ms linear ${o}ms 1 both`,M+=1,d}function L(t,n){const e=(t.style.animation||"").split(", "),s=e.filter(n?t=>t.indexOf(n)<0:t=>-1===t.indexOf("__svelte")),o=e.length-s.length;o&&(t.style.animation=s.join(", "),M-=o,M||h(()=>{M||(E.forEach(t=>{const n=t.__svelte_stylesheet;let e=n.cssRules.length;for(;e--;)n.deleteRule(e);t.__svelte_rules={}}),E.clear())}))}function S(t){q=t}function z(t){(function(){if(!q)throw new Error("Function called outside component initialization");return q})().$$.on_mount.push(t)}const N=[],A=[],D=[],F=[],O=Promise.resolve();let P=!1;function H(t){D.push(t)}let I=!1;const R=new Set;function U(){if(!I){I=!0;do{for(let t=0;t<N.length;t+=1){const n=N[t];S(n),V(n.$$)}for(N.length=0;A.length;)A.pop()();for(let t=0;t<D.length;t+=1){const n=D[t];R.has(n)||(R.add(n),n())}D.length=0}while(N.length);for(;F.length;)F.pop()();P=!1,I=!1,R.clear()}}function V(t){if(null!==t.fragment){t.update(),a(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(H)}}let W;function G(t,n,e){t.dispatchEvent(function(t,n){const e=document.createEvent("CustomEvent");return e.initCustomEvent(t,!1,!1,n),e}(`${n?"intro":"outro"}${e}`))}const J=new Set;let K;function Q(){K={r:0,c:[],p:K}}function X(){K.r||a(K.c),K=K.p}function Y(t,n){t&&t.i&&(J.delete(t),t.i(n))}function Z(t,n,e,s){if(t&&t.o){if(J.has(t))return;J.add(t),K.c.push(()=>{J.delete(t),s&&(e&&t.d(1),s())}),t.o(n)}}const tt={duration:0};function nt(e,s,o,r){let c=s(e,o),i=r?0:1,u=null,d=null,p=null;function g(){p&&L(e,p)}function b(t,n){const e=t.b-i;return n*=Math.abs(e),{a:i,b:t.b,d:e,duration:n,start:t.start,end:t.start+n,group:t.group}}function y(s){const{delay:o=0,duration:l=300,easing:r=n,tick:y=t,css:x}=c||tt,j={start:f()+o,b:s};s||(j.group=K,K.r+=1),u?d=j:(x&&(g(),p=T(e,i,s,l,o,r,x)),s&&y(0,1),u=b(j,l),H(()=>G(e,s,"start")),function(t){let n;0===m.size&&h($),new Promise(e=>{m.add(n={c:t,f:e})})}(t=>{if(d&&t>d.start&&(u=b(d,l),d=null,G(e,u.b,"start"),x&&(g(),p=T(e,i,u.b,u.duration,0,r,c.css))),u)if(t>=u.end)y(i=u.b,1-i),G(e,u.b,"end"),d||(u.b?g():--u.group.r||a(u.group.c)),u=null;else if(t>=u.start){const n=t-u.start;i=u.a+u.d*r(n/u.duration),y(i,1-i)}return!(!u&&!d)}))}return{run(t){l(c)?(W||(W=Promise.resolve(),W.then(()=>{W=null})),W).then(()=>{c=c(),y(t)}):y(t)},end(){g(),u=d=null}}}function et(t,n){const e={},s={},o={$$scope:1};let a=t.length;for(;a--;){const l=t[a],r=n[a];if(r){for(const t in l)t in r||(s[t]=1);for(const t in r)o[t]||(e[t]=r[t],o[t]=1);t[a]=r}else for(const t in l)o[t]=1}for(const t in s)t in e||(e[t]=void 0);return e}function st(t){return"object"==typeof t&&null!==t?t:{}}function ot(t){t&&t.c()}function at(t,n,e){const{fragment:o,on_mount:r,on_destroy:c,after_update:i}=t.$$;o&&o.m(n,e),H(()=>{const n=r.map(s).filter(l);c?c.push(...n):a(n),t.$$.on_mount=[]}),i.forEach(H)}function lt(t,n){const e=t.$$;null!==e.fragment&&(a(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function rt(t,n){-1===t.$$.dirty[0]&&(N.push(t),P||(P=!0,O.then(U)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function ct(n,e,s,l,r,c,i=[-1]){const u=q;S(n);const d=e.props||{},p=n.$$={fragment:null,ctx:null,props:c,update:t,not_equal:r,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:o(),dirty:i};let f=!1;if(p.ctx=s?s(n,d,(t,e,...s)=>{const o=s.length?s[0]:e;return p.ctx&&r(p.ctx[t],p.ctx[t]=o)&&(p.bound[t]&&p.bound[t](o),f&&rt(n,t)),e}):[],p.update(),f=!0,a(p.before_update),p.fragment=!!l&&l(p.ctx),e.target){if(e.hydrate){const t=function(t){return Array.from(t.childNodes)}(e.target);p.fragment&&p.fragment.l(t),t.forEach(y)}else p.fragment&&p.fragment.c();e.intro&&Y(n.$$.fragment),at(n,e.target,e.anchor),U()}S(u)}class it{$destroy(){lt(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}!function(t,n){void 0===n&&(n={});var e=n.insertAt;if(t&&"undefined"!=typeof document){var s=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===e&&s.firstChild?s.insertBefore(o,s.firstChild):s.appendChild(o),o.styleSheet?o.styleSheet.cssText=t:o.appendChild(document.createTextNode(t))}}("::-webkit-scrollbar-track{box-shadow:none}::-webkit-scrollbar{background:transparent;position:absolute;width:2px}::-webkit-scrollbar:hover{display:block;background:var(--default)}::-webkit-scrollbar-thumb{background-color:var(--default)}::-webkit-scrollbar:horizontal{height:3px}body{overflow:hidden}body,html{height:100%}.ah{background:var(--light);border-bottom:1px solid var(--default);padding:5px 10px}.al{margin-left:10px;font-size:20px}.ac{background:var(--light)}.ppw{padding:0 16px}.pp{border:1px solid var(--default);margin-bottom:10px}.pph{padding:6px 10px}.am{flex:0 0 200px;max-width:200px}.aml{background:transparent;border:none;cursor:pointer;padding:10px 16px}.aml:hover{text-decoration:underline}.aml,.hljs,.pph{border-bottom:1px solid var(--default)}.am,.ppw{border-right:1px solid var(--default)}table{width:100%;border:none;border-collapse:collapse;border-spacing:0;text-align:left}table.striped tr:nth-of-type(2n){background-color:var(--default)}td,th{vertical-align:middle;padding:1.2rem .4rem}thead{border-bottom:2px solid var(--default)}tfoot{border-top:2px solid var(--default)}.hljs{background:var(--bg-color);padding-left:16px}.hljs-comment,.hljs-meta{color:#969896}.hljs-emphasis,.hljs-quote,.hljs-strong,.hljs-template-variable,.hljs-variable{color:#df5000}.hljs-keyword,.hljs-selector-tag,.hljs-type{color:#d73a49}.hljs-attribute,.hljs-bullet,.hljs-literal,.hljs-symbol{color:#0086b3}.hljs-name,.hljs-section{color:#63a35c}.hljs-tag{color:#333}.hljs-attr,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-selector-pseudo,.hljs-title{color:#6f42c1}.hljs-addition{color:#55a532;background-color:#eaffea}.hljs-deletion{color:#bd2c00;background-color:#ffecec}.hljs-link{text-decoration:underline}.hljs-number{color:#005cc5}.hljs-string{color:#032f62}");const ut=[];const dt=function(n,e=t){let s;const o=[];function a(t){if(r(n,t)&&(n=t,s)){const t=!ut.length;for(let t=0;t<o.length;t+=1){const e=o[t];e[1](),ut.push(e,n)}if(t){for(let t=0;t<ut.length;t+=2)ut[t][0](ut[t+1]);ut.length=0}}}return{set:a,update:function(t){a(t(n))},subscribe:function(l,r=t){const c=[l,r];return o.push(c),1===o.length&&(s=e(a)||t),l(n),()=>{const t=o.indexOf(c);-1!==t&&o.splice(t,1),0===o.length&&(s(),s=null)}}}}("Introduction");function pt(n){let e;return{c(){e=x("div"),e.innerHTML='<span class="f faic f1"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="23" width="23" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> \n        <span class="al">Svelte UI</span></span> \n\n    <span class="f faic"><a href="https://github.com/kvraamkey/svelte-ui" target="_blank" class="f faic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svelte-h2unzw" width="22" height="22" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577\n                    0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633\n                    17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305\n                    3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38\n                    1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006\n                    2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23\n                    3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0\n                    .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg></a></span>',_(e,"class","ah f faic fi")},m(t,n){b(t,e,n)},p:t,i:t,o:t,d(t){t&&y(e)}}}class ft extends it{constructor(t){super(),ct(this,t,null,pt,r,{})}}const ht=t=>new URLSearchParams(window.location.search).get(t),mt=t=>t.charAt(0).toUpperCase()+t.slice(1);function $t(n){let e,s,o,l,r,c,i,u;return{c(){e=x("div"),s=x("button"),s.textContent="Introduction",o=v(),l=x("button"),l.textContent="Button",r=v(),c=x("button"),c.textContent="ALERT",_(s,"data-url","introduction"),_(s,"class","aml f"),_(l,"data-url","button"),_(l,"class","aml f"),_(c,"data-url","LERT"),_(c,"class","aml f"),_(e,"class","am f fc h-full oy")},m(t,a){b(t,e,a),g(e,s),g(e,o),g(e,l),g(e,r),g(e,c),i||(u=[k(s,"click",n[0]),k(l,"click",n[0]),k(c,"click",n[0])],i=!0)},p:t,i:t,o:t,d(t){t&&y(e),i=!1,a(u)}}}function gt(t){return[function(t){let n=t.target.dataset.url;window.history.replaceState(null,null,"?c="+n),dt.update(t=>mt(n))}]}class bt extends it{constructor(t){super(),ct(this,t,gt,$t,r,{})}}function yt(t){let n,e,s,o,a;const l=t[2].default,r=i(l,t,t[1],null);return{c(){n=x("section"),e=x("h3"),s=w(t[0]),o=v(),r&&r.c(),_(n,"class","ppw f fc oy ao")},m(t,l){b(t,n,l),g(n,e),g(e,s),g(n,o),r&&r.m(n,null),a=!0},p(t,[n]){(!a||1&n)&&B(s,t[0]),r&&r.p&&2&n&&d(r,l,t,t[1],n,null,null)},i(t){a||(Y(r,t),a=!0)},o(t){Z(r,t),a=!1},d(t){t&&y(n),r&&r.d(t)}}}function xt(t,n,e){let{title:s="page title"}=n,{$$slots:o={},$$scope:a}=n;return t.$set=t=>{"title"in t&&e(0,s=t.title),"$$scope"in t&&e(1,a=t.$$scope)},[s,a,o]}class jt extends it{constructor(t){super(),ct(this,t,xt,yt,r,{title:0})}}function wt(t){const n=t-1;return n*n*n+1}function vt(t,{delay:n=0,duration:e=400,easing:s=wt}){const o=getComputedStyle(t),a=+o.opacity,l=parseFloat(o.height),r=parseFloat(o.paddingTop),c=parseFloat(o.paddingBottom),i=parseFloat(o.marginTop),u=parseFloat(o.marginBottom),d=parseFloat(o.borderTopWidth),p=parseFloat(o.borderBottomWidth);return{delay:n,duration:e,easing:s,css:t=>`overflow: hidden;opacity: ${Math.min(20*t,1)*a};height: ${t*l}px;padding-top: ${t*r}px;padding-bottom: ${t*c}px;margin-top: ${t*i}px;margin-bottom: ${t*u}px;border-top-width: ${t*d}px;border-bottom-width: ${t*p}px;`}}const kt=t=>({}),_t=t=>({}),Bt=t=>({}),Ct=t=>({});function Et(t){let n,e,s;return{c(){n=x("div"),_(n,"class","hljs ox")},m(e,o){b(e,n,o),n.innerHTML=t[0],s=!0},p(t,e){(!s||1&e)&&(n.innerHTML=t[0])},i(t){s||(H(()=>{e||(e=nt(n,vt,{},!0)),e.run(1)}),s=!0)},o(t){e||(e=nt(n,vt,{},!1)),e.run(0),s=!1},d(t){t&&y(n),t&&e&&e.end()}}}function qt(t){let n,e,s,o,a,l,r,c,u,p,f,h,m,$=t[1]&&Et(t);const j=t[3].default,w=i(j,t,t[2],null),B=t[3].action,C=i(B,t,t[2],Ct),E=t[3].result,q=i(E,t,t[2],_t);return{c(){n=x("div"),e=x("div"),s=x("span"),s.textContent="Example",o=v(),a=x("span"),a.textContent="{ }",l=v(),$&&$.c(),r=v(),c=x("div"),w&&w.c(),u=v(),C&&C.c(),p=v(),q&&q.c(),_(s,"class","f1"),_(a,"class","cp"),_(e,"class","pph f faic"),_(c,"class","preview f faic fjcc fw w3-panel w3-padding-24 svelte-1ls9lqi"),_(n,"class","pp f fc")},m(i,d){b(i,n,d),g(n,e),g(e,s),g(e,o),g(e,a),g(n,l),$&&$.m(n,null),g(n,r),g(n,c),w&&w.m(c,null),g(c,u),C&&C.m(c,null),g(n,p),q&&q.m(n,null),f=!0,h||(m=k(a,"click",t[4]),h=!0)},p(t,[e]){t[1]?$?($.p(t,e),2&e&&Y($,1)):($=Et(t),$.c(),Y($,1),$.m(n,r)):$&&(Q(),Z($,1,1,()=>{$=null}),X()),w&&w.p&&4&e&&d(w,j,t,t[2],e,null,null),C&&C.p&&4&e&&d(C,B,t,t[2],e,Bt,Ct),q&&q.p&&4&e&&d(q,E,t,t[2],e,kt,_t)},i(t){f||(Y($),Y(w,t),Y(C,t),Y(q,t),f=!0)},o(t){Z($),Z(w,t),Z(C,t),Z(q,t),f=!1},d(t){t&&y(n),$&&$.d(),w&&w.d(t),C&&C.d(t),q&&q.d(t),h=!1,m()}}}function Mt(t,n,e){let{code:s}=n,o=!1,{$$slots:a={},$$scope:l}=n;return t.$set=t=>{"code"in t&&e(0,s=t.code),"$$scope"in t&&e(2,l=t.$$scope)},[s,o,l,a,()=>e(1,o=!o)]}class Tt extends it{constructor(t){super(),ct(this,t,Mt,qt,r,{code:0})}}function Lt(t){let n,e,s,o;const a=t[1].default,l=i(a,t,t[0],null);return{c(){n=x("section"),e=x("h4"),e.textContent="Description",s=v(),l&&l.c()},m(t,a){b(t,n,a),g(n,e),g(n,s),l&&l.m(n,null),o=!0},p(t,[n]){l&&l.p&&1&n&&d(l,a,t,t[0],n,null,null)},i(t){o||(Y(l,t),o=!0)},o(t){Z(l,t),o=!1},d(t){t&&y(n),l&&l.d(t)}}}function St(t,n,e){let{$$slots:s={},$$scope:o}=n;return t.$set=t=>{"$$scope"in t&&e(0,o=t.$$scope)},[o,s]}class zt extends it{constructor(t){super(),ct(this,t,St,Lt,r,{})}}function Nt(t,n,e){const s=t.slice();return s[3]=n[e],s}const At=t=>({}),Dt=t=>({});function Ft(t){let n,e,s=t[3].type+"";return{c(){n=x("small"),e=w(s),_(n,"class","svelte-1a7ioum")},m(t,s){b(t,n,s),g(n,e)},p(t,n){1&n&&s!==(s=t[3].type+"")&&B(e,s)},d(t){t&&y(n)}}}function Ot(t){let n,e=t[3].def+"";return{c(){n=x("strong")},m(t,s){b(t,n,s),n.innerHTML=e},p(t,s){1&s&&e!==(e=t[3].def+"")&&(n.innerHTML=e)},d(t){t&&y(n)}}}function Pt(t){let n,e,s,o,a=t[3].def+"";return{c(){n=x("span"),s=v(),o=w(a),_(n,"style",e="display:inline-block;width:10px;height:10px;background-color:"+t[3].def)},m(t,e){b(t,n,e),b(t,s,e),b(t,o,e)},p(t,s){1&s&&e!==(e="display:inline-block;width:10px;height:10px;background-color:"+t[3].def)&&_(n,"style",e),1&s&&a!==(a=t[3].def+"")&&B(o,a)},d(t){t&&y(n),t&&y(s),t&&y(o)}}}function Ht(t){let n,e,s,o,a,l,r,c,i,u,d,p=t[3].name+"",f=t[3].desc+"",h=t[3].type&&Ft(t);function m(t,n){return(null==u||1&n)&&(u=!(!t[3].def||"#"!==t[3].def[0]&&0!==t[3].def.indexOf("rgb"))),u?Pt:Ot}let $=m(t,-1),j=$(t);return{c(){n=x("tr"),e=x("td"),s=x("code"),o=w(p),a=v(),h&&h.c(),l=v(),r=x("td"),c=v(),i=x("td"),j.c(),d=v(),_(s,"class","svelte-1a7ioum"),_(e,"class","svelte-1a7ioum"),_(r,"class","svelte-1a7ioum"),_(i,"class","svelte-1a7ioum"),_(n,"class","svelte-1a7ioum")},m(t,u){b(t,n,u),g(n,e),g(e,s),g(s,o),g(e,a),h&&h.m(e,null),g(n,l),g(n,r),r.innerHTML=f,g(n,c),g(n,i),j.m(i,null),g(n,d)},p(t,n){1&n&&p!==(p=t[3].name+"")&&B(o,p),t[3].type?h?h.p(t,n):(h=Ft(t),h.c(),h.m(e,null)):h&&(h.d(1),h=null),1&n&&f!==(f=t[3].desc+"")&&(r.innerHTML=f),$===($=m(t,n))&&j?j.p(t,n):(j.d(1),j=$(t),j&&(j.c(),j.m(i,null)))},d(t){t&&y(n),h&&h.d(),j.d()}}}function It(t){let n,e,s,o,a,l,r,c;const u=t[2].name,p=i(u,t,t[1],Dt),f=p||function(t){let n;return{c(){n=x("h4"),n.textContent="Properties"},m(t,e){b(t,n,e)},d(t){t&&y(n)}}}();let h=t[0],m=[];for(let n=0;n<h.length;n+=1)m[n]=Ht(Nt(t,h,n));return{c(){f&&f.c(),n=v(),e=x("div"),s=x("table"),o=x("tr"),o.innerHTML='<th class="svelte-1a7ioum">Name</th> \n            <th class="svelte-1a7ioum">Description</th> \n            <th class="svelte-1a7ioum">Default</th>',a=v();for(let t=0;t<m.length;t+=1)m[t].c();l=v(),r=x("br"),_(o,"class","svelte-1a7ioum"),_(s,"class","svelte-1a7ioum"),_(e,"class","properties")},m(t,i){f&&f.m(t,i),b(t,n,i),b(t,e,i),g(e,s),g(s,o),g(s,a);for(let t=0;t<m.length;t+=1)m[t].m(s,null);b(t,l,i),b(t,r,i),c=!0},p(t,[n]){if(p&&p.p&&2&n&&d(p,u,t,t[1],n,At,Dt),1&n){let e;for(h=t[0],e=0;e<h.length;e+=1){const o=Nt(t,h,e);m[e]?m[e].p(o,n):(m[e]=Ht(o),m[e].c(),m[e].m(s,null))}for(;e<m.length;e+=1)m[e].d(1);m.length=h.length}},i(t){c||(Y(f,t),c=!0)},o(t){Z(f,t),c=!1},d(t){f&&f.d(t),t&&y(n),t&&y(e),function(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}(m,t),t&&y(l),t&&y(r)}}}function Rt(t,n,e){let{data:s=[]}=n,{$$slots:o={},$$scope:a}=n;return t.$set=t=>{"data"in t&&e(0,s=t.data),"$$scope"in t&&e(1,a=t.$$scope)},[s,a,o]}class Ut extends it{constructor(t){super(),ct(this,t,Rt,It,r,{data:0})}}function Vt(t){let n,e,s,o,a;const l=t[1].default,r=i(l,t,t[0],null);return{c(){n=x("section"),e=x("h5"),e.textContent="Play with Props",s=v(),o=x("div"),r&&r.c(),_(o,"class","properties"),_(n,"class","props-panel w3-border-left w3-padding-small flex column svelte-1g523wx")},m(t,l){b(t,n,l),g(n,e),g(n,s),g(n,o),r&&r.m(o,null),a=!0},p(t,[n]){r&&r.p&&1&n&&d(r,l,t,t[0],n,null,null)},i(t){a||(Y(r,t),a=!0)},o(t){Z(r,t),a=!1},d(t){t&&y(n),r&&r.d(t)}}}function Wt(t,n,e){let{$$slots:s={},$$scope:o}=n;return t.$set=t=>{"$$scope"in t&&e(0,o=t.$$scope)},[o,s]}class Gt extends it{constructor(t){super(),ct(this,t,Wt,Vt,r,{})}}function Jt(t){let n;return{c(){n=w("This is a demo of work in progress...")},m(t,e){b(t,n,e)},d(t){t&&y(n)}}}function Kt(t){let n,e;return n=new zt({props:{$$slots:{default:[Jt]},$$scope:{ctx:t}}}),{c(){ot(n.$$.fragment)},m(t,s){at(n,t,s),e=!0},p(t,[e]){const s={};1&e&&(s.$$scope={dirty:e,ctx:t}),n.$set(s)},i(t){e||(Y(n.$$.fragment,t),e=!0)},o(t){Z(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var Qt,Xt,Yt,Zt=(function(t,n){!function(t){function n(){}function e(t){return t()}function s(){return Object.create(null)}function o(t){t.forEach(e)}function a(t){return"function"==typeof t}function l(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function r(t,n,e,s){return t[1]&&s?function(t,n){for(const e in n)t[e]=n[e];return t}(e.ctx.slice(),t[1](s(n))):e.ctx}function c(t,n,e){t.insertBefore(n,e||null)}function i(t){t.parentNode.removeChild(t)}function u(t){return document.createTextNode(t)}function d(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function p(t,n,e){t.classList[e?"add":"remove"](n)}let f;function h(t){f=t}const m=[],$=[],g=[],b=[],y=Promise.resolve();let x=!1;function j(t){g.push(t)}let w=!1;const v=new Set;function k(){if(!w){w=!0;do{for(let t=0;t<m.length;t+=1){const n=m[t];h(n),_(n.$$)}for(m.length=0;$.length;)$.pop()();for(let t=0;t<g.length;t+=1){const n=g[t];v.has(n)||(v.add(n),n())}g.length=0}while(m.length);for(;b.length;)b.pop()();x=!1,w=!1,v.clear()}}function _(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(j)}}const B=new Set;let C;function E(t,n){t&&t.i&&(B.delete(t),t.i(n))}function q(t,n,e,s){if(t&&t.o){if(B.has(t))return;B.add(t),C.c.push(()=>{B.delete(t),s&&(e&&t.d(1),s())}),t.o(n)}}function M(t,n){-1===t.$$.dirty[0]&&(m.push(t),x||(x=!0,y.then(k)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}const T=t=>({}),L=t=>({});function S(t){let n;const e=t[12].icon,s=function(t,n,e,s){if(t){const o=r(t,n,e,s);return t[0](o)}}(e,t,t[11],L);return{c(){s&&s.c()},m(t,e){s&&s.m(t,e),n=!0},p(t,n){s&&s.p&&2048&n&&function(t,n,e,s,o,a,l){const c=function(t,n,e,s){if(t[2]&&s){const o=t[2](s(e));if(void 0===n.dirty)return o;if("object"==typeof o){const t=[],e=Math.max(n.dirty.length,o.length);for(let s=0;s<e;s+=1)t[s]=n.dirty[s]|o[s];return t}return n.dirty|o}return n.dirty}(n,s,o,a);if(c){const o=r(n,e,s,l);t.p(o,c)}}(s,e,t,t[11],n,T,L)},i(t){n||(E(s,t),n=!0)},o(t){q(s,t),n=!1},d(t){s&&s.d(t)}}}function z(t){let n;return{c(){n=u(t[0])},m(t,e){c(t,n,e)},p(t,e){1&e&&function(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}(n,t[0])},d(t){t&&i(n)}}}function N(t){let e,s,l,r,f,h,m,$=t[7]&&S(t),g=t[0]&&z(t);return{c(){e=document.createElement("button"),$&&$.c(),s=u(" "),g&&g.c(),d(e,"role","button"),d(e,"class",l=t[9]+" faic btn if tea"),d(e,"style",t[8]),e.disabled=t[5],p(e,"btnr",t[4]),p(e,"pc",t[1]),p(e,"sc",t[2]),p(e,"disabled",t[5]),p(e,"link",t[6]),p(e,"icon",t[7]),p(e,"fjcc",t[7]),p(e,"btno",t[3])},m(o,l){var i;c(o,e,l),$&&$.m(e,null),function(t,n){t.appendChild(n)}(e,s),g&&g.m(e,null),f=!0,h||(i=r=t[10].call(null,e),m=i&&a(i.destroy)?i.destroy:n,h=!0)},p(t,[n]){t[7]?$?($.p(t,n),128&n&&E($,1)):($=S(t),$.c(),E($,1),$.m(e,s)):$&&(C={r:0,c:[],p:C},q($,1,1,()=>{$=null}),C.r||o(C.c),C=C.p),t[0]?g?g.p(t,n):(g=z(t),g.c(),g.m(e,null)):g&&(g.d(1),g=null),(!f||512&n&&l!==(l=t[9]+" faic btn if tea"))&&d(e,"class",l),(!f||256&n)&&d(e,"style",t[8]),(!f||32&n)&&(e.disabled=t[5]),528&n&&p(e,"btnr",t[4]),514&n&&p(e,"pc",t[1]),516&n&&p(e,"sc",t[2]),544&n&&p(e,"disabled",t[5]),576&n&&p(e,"link",t[6]),640&n&&p(e,"icon",t[7]),640&n&&p(e,"fjcc",t[7]),520&n&&p(e,"btno",t[3])},i(t){f||(E($),f=!0)},o(t){q($),f=!1},d(t){t&&i(e),$&&$.d(),g&&g.d(),h=!1,m()}}}function A(t,n,e){let{name:s}=n,{primary:o=!1}=n,{secondary:a=!1}=n,{outlined:l=!1}=n,{rounded:r=!1}=n,{disabled:c=!1}=n,{link:i=!1}=n,{icon:u=!0}=n,{style:d}=n,{className:p=""}=n;!function(){if(!f)throw new Error("Function called outside component initialization")}();const h=(m=f,t=>{const n=Object.keys(m.$$.callbacks),e=[];return n.forEach(n=>e.push(function(t,n,e,s){return t.addEventListener(n,e,s),()=>t.removeEventListener(n,e,s)}(t,n,t=>function(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(t=>t(n))}(m,t)))),{destroy:()=>{e.forEach(t=>t())}}});var m;let{$$slots:$={},$$scope:g}=n;return t.$set=t=>{"name"in t&&e(0,s=t.name),"primary"in t&&e(1,o=t.primary),"secondary"in t&&e(2,a=t.secondary),"outlined"in t&&e(3,l=t.outlined),"rounded"in t&&e(4,r=t.rounded),"disabled"in t&&e(5,c=t.disabled),"link"in t&&e(6,i=t.link),"icon"in t&&e(7,u=t.icon),"style"in t&&e(8,d=t.style),"className"in t&&e(9,p=t.className),"$$scope"in t&&e(11,g=t.$$scope)},[s,o,a,l,r,c,i,u,d,p,h,g,$]}t.Button=class extends class{$destroy(){!function(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(1),e.on_destroy=e.fragment=null,e.ctx=[])}(this),this.$destroy=n}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}{constructor(t){super(),function(t,l,r,c,u,d,p=[-1]){const m=f;h(t);const $=l.props||{},g=t.$$={fragment:null,ctx:null,props:d,update:n,not_equal:u,bound:s(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(m?m.$$.context:[]),callbacks:s(),dirty:p};let b=!1;if(g.ctx=r?r(t,$,(n,e,...s)=>{const o=s.length?s[0]:e;return g.ctx&&u(g.ctx[n],g.ctx[n]=o)&&(g.bound[n]&&g.bound[n](o),b&&M(t,n)),e}):[],g.update(),b=!0,o(g.before_update),g.fragment=!!c&&c(g.ctx),l.target){if(l.hydrate){const t=function(t){return Array.from(t.childNodes)}(l.target);g.fragment&&g.fragment.l(t),t.forEach(i)}else g.fragment&&g.fragment.c();l.intro&&E(t.$$.fragment),function(t,n,s){const{fragment:l,on_mount:r,on_destroy:c,after_update:i}=t.$$;l&&l.m(n,s),j(()=>{const n=r.map(e).filter(a);c?c.push(...n):o(n),t.$$.on_mount=[]}),i.forEach(j)}(t,l.target,l.anchor),k()}h(m)}(this,t,A,N,l,{name:0,primary:1,secondary:2,outlined:3,rounded:4,disabled:5,link:6,icon:7,style:8,className:9})}},Object.defineProperty(t,"__esModule",{value:!0})}(n)}(Xt={path:Qt,exports:{},require:function(t,n){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==n&&Xt.path)}},Xt.exports),Xt.exports),tn=(Yt=Zt)&&Yt.__esModule&&Object.prototype.hasOwnProperty.call(Yt,"default")?Yt.default:Yt,nn=[{name:"name",desc:"Name of the button",type:"string",def:"''"},{name:"primary",desc:"Color of the button, additionally, 'primary' and 'secondary' values are possible",type:"enum",def:"null"},{name:"secondary",desc:"",type:"boolean",def:"false"},{name:"outlined",desc:"Button with border",type:"boolean",def:"false"},{name:"rounded",desc:"Button with rounded edges",type:"boolean",def:"false"},{name:"disabled",desc:"disabled state of the button, effective only if the disabled property is set",type:"boolean",def:"false"},{name:"link",desc:"enable href effect",type:"boolean",def:"false"},{name:"icon",desc:"Defines round button, Icon component can be used in slot (slot-name:icon)",type:"slot",def:"false"},{name:"class",desc:"Custom global CSS class name",type:"string",def:"''"},{name:"style",desc:"",type:"string",def:""}],en=[{name:"--button-font-family",def:"<span style='font-family:var(--font-family);font-weight: normal;'>Default Base family font</span>",desc:"Button's font family"},{name:"--btn-text-color",def:"#3f4144",desc:"custom test color"},{name:"--btn-text-hcolor",def:"#3f4144",desc:"custom text hover color"},{name:"--btn-bg-color",def:"#e0e0e0",desc:"custom background color"},{name:"--btn-bg-hcolor",def:"#d2d6dd",desc:"custom background hover color"},{name:"--btn-radius",def:"4px",desc:"custom border radius"}];function sn(t){let n,e;return{c(){n=j("svg"),e=j("path"),_(e,"d","M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53\n                    4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03\n                    9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"),_(n,"slot","icon"),_(n,"class","icon"),_(n,"focusable","false"),_(n,"viewBox","0 0 24 24"),_(n,"aria-hidden","true")},m(t,s){b(t,n,s),g(n,e)},d(t){t&&y(n)}}}function on(t){let n,s,o,a,l,r,c,i,u,d,p,f,h,m,$,j,k;const C=[{name:"Default"},t[1]];let E={};for(let t=0;t<C.length;t+=1)E=e(E,C[t]);n=new tn.Button({props:E}),n.$on("click",t[2]);const q=[{name:"Primary"},t[1],{primary:!0}];let M={};for(let t=0;t<q.length;t+=1)M=e(M,q[t]);o=new tn.Button({props:M}),o.$on("click",t[2]);const T=[{name:"Secondary"},t[1],{secondary:!0}];let L={};for(let t=0;t<T.length;t+=1)L=e(L,T[t]);l=new tn.Button({props:L}),l.$on("click",t[2]);const S=[{name:"Disabled"},t[1],{secondary:!0},{disabled:!0}];let z={};for(let t=0;t<S.length;t+=1)z=e(z,S[t]);c=new tn.Button({props:z}),c.$on("click",t[2]);const N=[{name:"Link"},t[1],{link:!0},{primary:!0}];let A={};for(let t=0;t<N.length;t+=1)A=e(A,N[t]);u=new tn.Button({props:A}),u.$on("click",t[2]);const D=[{icon:!0},t[1]];let F={$$slots:{icon:[sn]},$$scope:{ctx:t}};for(let t=0;t<D.length;t+=1)F=e(F,D[t]);return p=new tn.Button({props:F}),{c(){ot(n.$$.fragment),s=v(),ot(o.$$.fragment),a=v(),ot(l.$$.fragment),r=v(),ot(c.$$.fragment),i=v(),ot(u.$$.fragment),d=v(),ot(p.$$.fragment),f=v(),h=x("span"),m=w("Clicked counter: [ "),$=w(t[0]),j=w(" ]"),_(h,"class","f faic fjcc wf")},m(t,e){at(n,t,e),b(t,s,e),at(o,t,e),b(t,a,e),at(l,t,e),b(t,r,e),at(c,t,e),b(t,i,e),at(u,t,e),b(t,d,e),at(p,t,e),b(t,f,e),b(t,h,e),g(h,m),g(h,$),g(h,j),k=!0},p(t,e){const s=2&e?et(C,[C[0],st(t[1])]):{};n.$set(s);const a=2&e?et(q,[q[0],st(t[1]),q[2]]):{};o.$set(a);const r=2&e?et(T,[T[0],st(t[1]),T[2]]):{};l.$set(r);const i=2&e?et(S,[S[0],st(t[1]),S[2],S[3]]):{};c.$set(i);const d=2&e?et(N,[N[0],st(t[1]),N[2],N[3]]):{};u.$set(d);const f=2&e?et(D,[D[0],st(t[1])]):{};32&e&&(f.$$scope={dirty:e,ctx:t}),p.$set(f),(!k||1&e)&&B($,t[0])},i(t){k||(Y(n.$$.fragment,t),Y(o.$$.fragment,t),Y(l.$$.fragment,t),Y(c.$$.fragment,t),Y(u.$$.fragment,t),Y(p.$$.fragment,t),k=!0)},o(t){Z(n.$$.fragment,t),Z(o.$$.fragment,t),Z(l.$$.fragment,t),Z(c.$$.fragment,t),Z(u.$$.fragment,t),Z(p.$$.fragment,t),k=!1},d(t){lt(n,t),t&&y(s),lt(o,t),t&&y(a),lt(l,t),t&&y(r),lt(c,t),t&&y(i),lt(u,t),t&&y(d),lt(p,t),t&&y(f),t&&y(h)}}}function an(n){let e,s;return{c(){s=w(""),e=new C(s)},m(t,n){e.m("<p>Button component contains two major types of buttons, namely, regular (default) and icon button (when setting icon property). Icon button can be configured as FAB (Floating Action Button) by setting fab property. The button can become a toggle by setting the toggle property</p>\n",t,n),b(t,s,n)},p:t,d(t){t&&y(s),t&&e.d()}}}function ln(t){let n;return{c(){n=x("h4"),n.textContent="CSS custom properties",_(n,"slot","name"),_(n,"class","w3-margin-top")},m(t,e){b(t,n,e)},d(t){t&&y(n)}}}function rn(t){let n,e,s,o,a,l,r,c;return n=new Tt({props:{code:'<pre><code class="language-javascript"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">on:click</span>=<span class="hljs-string">{increment}</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;Default&quot;</span> /&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">on:click</span>=<span class="hljs-string">{increment}</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;Primary&quot;</span> <span class="hljs-attr">primary</span> /&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">on:click</span>=<span class="hljs-string">{increment}</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;Secondary&quot;</span> <span class="hljs-attr">secondary</span> /&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">on:click</span>=<span class="hljs-string">{increment}</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;Disabled&quot;</span> <span class="hljs-attr">secondary</span> <span class="hljs-attr">disabled</span> /&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">on:click</span>=<span class="hljs-string">{increment}</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;Link&quot;</span> <span class="hljs-attr">link</span> <span class="hljs-attr">primary</span> /&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">icon</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;icon&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;icon&quot;</span> <span class="hljs-attr">focusable</span>=<span class="hljs-string">&quot;false&quot;</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">&quot;0 0 24 24&quot;</span> <span class="hljs-attr">aria-hidden</span>=<span class="hljs-string">&quot;true&quot;</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">path</span>\n            <span class="hljs-attr">d</span>=<span class="hljs-string">&quot;M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53\n            4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03\n            9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z&quot;</span>\n        /&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;f faic fjcc wf&quot;</span>&gt;</span>{counter}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>\n\n<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">\n    <span class="hljs-keyword">import</span> { Button } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@kvraamkey/svelte-ui&#x27;</span>;\n\n    <span class="hljs-keyword">let</span> counter = <span class="hljs-number">0</span>;\n\n    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">increment</span>(<span class="hljs-params"></span>) </span>{\n        counter += <span class="hljs-number">1</span>;\n    }\n</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>\n',$$slots:{default:[on]},$$scope:{ctx:t}}}),s=new zt({props:{$$slots:{default:[an]},$$scope:{ctx:t}}}),a=new Ut({props:{data:nn}}),r=new Ut({props:{data:en,$$slots:{name:[ln]},$$scope:{ctx:t}}}),{c(){ot(n.$$.fragment),e=v(),ot(s.$$.fragment),o=v(),ot(a.$$.fragment),l=v(),ot(r.$$.fragment)},m(t,i){at(n,t,i),b(t,e,i),at(s,t,i),b(t,o,i),at(a,t,i),b(t,l,i),at(r,t,i),c=!0},p(t,e){const o={};35&e&&(o.$$scope={dirty:e,ctx:t}),n.$set(o);const a={};32&e&&(a.$$scope={dirty:e,ctx:t}),s.$set(a);const l={};32&e&&(l.$$scope={dirty:e,ctx:t}),r.$set(l)},i(t){c||(Y(n.$$.fragment,t),Y(s.$$.fragment,t),Y(a.$$.fragment,t),Y(r.$$.fragment,t),c=!0)},o(t){Z(n.$$.fragment,t),Z(s.$$.fragment,t),Z(a.$$.fragment,t),Z(r.$$.fragment,t),c=!1},d(t){lt(n,t),t&&y(e),lt(s,t),t&&y(o),lt(a,t),t&&y(l),lt(r,t)}}}function cn(t){let n,e,s,o,l,r,c,i,u,d,p;return{c(){n=x("section"),e=x("input"),s=v(),o=x("label"),o.textContent="rounded",l=v(),r=x("section"),c=x("input"),i=v(),u=x("label"),u.textContent="outlined",_(e,"class","w3-check"),_(e,"id","rounded"),_(e,"name","rounded"),_(e,"type","checkbox"),_(o,"for","rounded"),_(n,"class","flex align-items-center w3-margin-bottom"),_(c,"class","w3-check"),_(c,"id","outlined"),_(c,"name","round"),_(c,"type","checkbox"),_(u,"for","outlined"),_(r,"class","flex align-items-center w3-margin-bottom")},m(a,f){b(a,n,f),g(n,e),e.checked=t[1].rounded,g(n,s),g(n,o),b(a,l,f),b(a,r,f),g(r,c),c.checked=t[1].outlined,g(r,i),g(r,u),d||(p=[k(e,"change",t[3]),k(c,"change",t[4])],d=!0)},p(t,n){2&n&&(e.checked=t[1].rounded),2&n&&(c.checked=t[1].outlined)},d(t){t&&y(n),t&&y(l),t&&y(r),d=!1,a(p)}}}function un(t){let n,e,s,o;return n=new jt({props:{title:"Button",$$slots:{default:[rn]},$$scope:{ctx:t}}}),s=new Gt({props:{$$slots:{default:[cn]},$$scope:{ctx:t}}}),{c(){ot(n.$$.fragment),e=v(),ot(s.$$.fragment)},m(t,a){at(n,t,a),b(t,e,a),at(s,t,a),o=!0},p(t,[e]){const o={};35&e&&(o.$$scope={dirty:e,ctx:t}),n.$set(o);const a={};34&e&&(a.$$scope={dirty:e,ctx:t}),s.$set(a)},i(t){o||(Y(n.$$.fragment,t),Y(s.$$.fragment,t),o=!0)},o(t){Z(n.$$.fragment,t),Z(s.$$.fragment,t),o=!1},d(t){lt(n,t),t&&y(e),lt(s,t)}}}function dn(t,n,e){let s=0,o={rounded:!1,outlined:!1};return[s,o,t=>{e(0,s+=1)},function(){o.rounded=this.checked,e(1,o)},function(){o.outlined=this.checked,e(1,o)}]}const pn={Introduction:class extends it{constructor(t){super(),ct(this,t,null,Kt,r,{})}},Button:class extends it{constructor(t){super(),ct(this,t,dn,un,r,{})}}};function fn(t){let n,e,s,o,a,l,r,c,i;e=new ft({}),a=new bt({});var u=t[0]?pn[t[0]]:pn.Introduction;return u&&(c=new u({})),{c(){n=x("div"),ot(e.$$.fragment),s=v(),o=x("div"),ot(a.$$.fragment),l=v(),r=x("div"),c&&ot(c.$$.fragment),_(r,"class","f"),_(o,"class","f fa oh ac"),_(n,"class","f fc hf")},m(t,u){b(t,n,u),at(e,n,null),g(n,s),g(n,o),at(a,o,null),g(o,l),g(o,r),c&&at(c,r,null),i=!0},p(t,[n]){if(u!==(u=t[0]?pn[t[0]]:pn.Introduction)){if(c){Q();const t=c;Z(t.$$.fragment,1,0,()=>{lt(t,1)}),X()}u?(c=new u({}),ot(c.$$.fragment),Y(c.$$.fragment,1),at(c,r,null)):c=null}},i(t){i||(Y(e.$$.fragment,t),Y(a.$$.fragment,t),c&&Y(c.$$.fragment,t),i=!0)},o(t){Z(e.$$.fragment,t),Z(a.$$.fragment,t),c&&Z(c.$$.fragment,t),i=!1},d(t){t&&y(n),lt(e),lt(a),c&&lt(c)}}}function hn(t,n,e){let s;return c(t,dt,t=>e(0,s=t)),z(async()=>{dt.update(t=>ht("c")?mt(ht("c")):"Introduction")}),[s]}return new class extends it{constructor(t){super(),ct(this,t,hn,fn,r,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
