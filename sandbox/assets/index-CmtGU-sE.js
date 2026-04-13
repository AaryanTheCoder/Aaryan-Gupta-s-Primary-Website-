function dM(a,e){for(var n=0;n<e.length;n++){const r=e[n];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in a)){const c=Object.getOwnPropertyDescriptor(r,o);c&&Object.defineProperty(a,o,c.get?c:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();function gx(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var Fd={exports:{}},Jo={};var Dv;function hM(){if(Dv)return Jo;Dv=1;var a=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function n(r,o,c){var f=null;if(c!==void 0&&(f=""+c),o.key!==void 0&&(f=""+o.key),"key"in o){c={};for(var h in o)h!=="key"&&(c[h]=o[h])}else c=o;return o=c.ref,{$$typeof:a,type:r,key:f,ref:o!==void 0?o:null,props:c}}return Jo.Fragment=e,Jo.jsx=n,Jo.jsxs=n,Jo}var Nv;function pM(){return Nv||(Nv=1,Fd.exports=hM()),Fd.exports}var z=pM(),zd={exports:{}},$o={},Bd={exports:{}},Hd={};var Uv;function mM(){return Uv||(Uv=1,(function(a){function e(I,B){var se=I.length;I.push(B);e:for(;0<se;){var he=se-1>>>1,L=I[he];if(0<o(L,B))I[he]=B,I[se]=L,se=he;else break e}}function n(I){return I.length===0?null:I[0]}function r(I){if(I.length===0)return null;var B=I[0],se=I.pop();if(se!==B){I[0]=se;e:for(var he=0,L=I.length,Q=L>>>1;he<Q;){var le=2*(he+1)-1,ge=I[le],we=le+1,Le=I[we];if(0>o(ge,se))we<L&&0>o(Le,ge)?(I[he]=Le,I[we]=se,he=we):(I[he]=ge,I[le]=se,he=le);else if(we<L&&0>o(Le,se))I[he]=Le,I[we]=se,he=we;else break e}}return B}function o(I,B){var se=I.sortIndex-B.sortIndex;return se!==0?se:I.id-B.id}if(a.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;a.unstable_now=function(){return c.now()}}else{var f=Date,h=f.now();a.unstable_now=function(){return f.now()-h}}var m=[],d=[],g=1,b=null,_=3,y=!1,S=!1,A=!1,x=!1,v=typeof setTimeout=="function"?setTimeout:null,T=typeof clearTimeout=="function"?clearTimeout:null,C=typeof setImmediate<"u"?setImmediate:null;function R(I){for(var B=n(d);B!==null;){if(B.callback===null)r(d);else if(B.startTime<=I)r(d),B.sortIndex=B.expirationTime,e(m,B);else break;B=n(d)}}function P(I){if(A=!1,R(I),!S)if(n(m)!==null)S=!0,O||(O=!0,X());else{var B=n(d);B!==null&&V(P,B.startTime-I)}}var O=!1,F=-1,E=5,D=-1;function Y(){return x?!0:!(a.unstable_now()-D<E)}function k(){if(x=!1,O){var I=a.unstable_now();D=I;var B=!0;try{e:{S=!1,A&&(A=!1,T(F),F=-1),y=!0;var se=_;try{t:{for(R(I),b=n(m);b!==null&&!(b.expirationTime>I&&Y());){var he=b.callback;if(typeof he=="function"){b.callback=null,_=b.priorityLevel;var L=he(b.expirationTime<=I);if(I=a.unstable_now(),typeof L=="function"){b.callback=L,R(I),B=!0;break t}b===n(m)&&r(m),R(I)}else r(m);b=n(m)}if(b!==null)B=!0;else{var Q=n(d);Q!==null&&V(P,Q.startTime-I),B=!1}}break e}finally{b=null,_=se,y=!1}B=void 0}}finally{B?X():O=!1}}}var X;if(typeof C=="function")X=function(){C(k)};else if(typeof MessageChannel<"u"){var $=new MessageChannel,K=$.port2;$.port1.onmessage=k,X=function(){K.postMessage(null)}}else X=function(){v(k,0)};function V(I,B){F=v(function(){I(a.unstable_now())},B)}a.unstable_IdlePriority=5,a.unstable_ImmediatePriority=1,a.unstable_LowPriority=4,a.unstable_NormalPriority=3,a.unstable_Profiling=null,a.unstable_UserBlockingPriority=2,a.unstable_cancelCallback=function(I){I.callback=null},a.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<I?Math.floor(1e3/I):5},a.unstable_getCurrentPriorityLevel=function(){return _},a.unstable_next=function(I){switch(_){case 1:case 2:case 3:var B=3;break;default:B=_}var se=_;_=B;try{return I()}finally{_=se}},a.unstable_requestPaint=function(){x=!0},a.unstable_runWithPriority=function(I,B){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var se=_;_=I;try{return B()}finally{_=se}},a.unstable_scheduleCallback=function(I,B,se){var he=a.unstable_now();switch(typeof se=="object"&&se!==null?(se=se.delay,se=typeof se=="number"&&0<se?he+se:he):se=he,I){case 1:var L=-1;break;case 2:L=250;break;case 5:L=1073741823;break;case 4:L=1e4;break;default:L=5e3}return L=se+L,I={id:g++,callback:B,priorityLevel:I,startTime:se,expirationTime:L,sortIndex:-1},se>he?(I.sortIndex=se,e(d,I),n(m)===null&&I===n(d)&&(A?(T(F),F=-1):A=!0,V(P,se-he))):(I.sortIndex=L,e(m,I),S||y||(S=!0,O||(O=!0,X()))),I},a.unstable_shouldYield=Y,a.unstable_wrapCallback=function(I){var B=_;return function(){var se=_;_=B;try{return I.apply(this,arguments)}finally{_=se}}}})(Hd)),Hd}var Lv;function gM(){return Lv||(Lv=1,Bd.exports=mM()),Bd.exports}var kd={exports:{}},dt={};var Ov;function vM(){if(Ov)return dt;Ov=1;var a=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),b=Symbol.iterator;function _(L){return L===null||typeof L!="object"?null:(L=b&&L[b]||L["@@iterator"],typeof L=="function"?L:null)}var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},S=Object.assign,A={};function x(L,Q,le){this.props=L,this.context=Q,this.refs=A,this.updater=le||y}x.prototype.isReactComponent={},x.prototype.setState=function(L,Q){if(typeof L!="object"&&typeof L!="function"&&L!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,L,Q,"setState")},x.prototype.forceUpdate=function(L){this.updater.enqueueForceUpdate(this,L,"forceUpdate")};function v(){}v.prototype=x.prototype;function T(L,Q,le){this.props=L,this.context=Q,this.refs=A,this.updater=le||y}var C=T.prototype=new v;C.constructor=T,S(C,x.prototype),C.isPureReactComponent=!0;var R=Array.isArray,P={H:null,A:null,T:null,S:null,V:null},O=Object.prototype.hasOwnProperty;function F(L,Q,le,ge,we,Le){return le=Le.ref,{$$typeof:a,type:L,key:Q,ref:le!==void 0?le:null,props:Le}}function E(L,Q){return F(L.type,Q,void 0,void 0,void 0,L.props)}function D(L){return typeof L=="object"&&L!==null&&L.$$typeof===a}function Y(L){var Q={"=":"=0",":":"=2"};return"$"+L.replace(/[=:]/g,function(le){return Q[le]})}var k=/\/+/g;function X(L,Q){return typeof L=="object"&&L!==null&&L.key!=null?Y(""+L.key):Q.toString(36)}function $(){}function K(L){switch(L.status){case"fulfilled":return L.value;case"rejected":throw L.reason;default:switch(typeof L.status=="string"?L.then($,$):(L.status="pending",L.then(function(Q){L.status==="pending"&&(L.status="fulfilled",L.value=Q)},function(Q){L.status==="pending"&&(L.status="rejected",L.reason=Q)})),L.status){case"fulfilled":return L.value;case"rejected":throw L.reason}}throw L}function V(L,Q,le,ge,we){var Le=typeof L;(Le==="undefined"||Le==="boolean")&&(L=null);var ee=!1;if(L===null)ee=!0;else switch(Le){case"bigint":case"string":case"number":ee=!0;break;case"object":switch(L.$$typeof){case a:case e:ee=!0;break;case g:return ee=L._init,V(ee(L._payload),Q,le,ge,we)}}if(ee)return we=we(L),ee=ge===""?"."+X(L,0):ge,R(we)?(le="",ee!=null&&(le=ee.replace(k,"$&/")+"/"),V(we,Q,le,"",function(ze){return ze})):we!=null&&(D(we)&&(we=E(we,le+(we.key==null||L&&L.key===we.key?"":(""+we.key).replace(k,"$&/")+"/")+ee)),Q.push(we)),1;ee=0;var Me=ge===""?".":ge+":";if(R(L))for(var Se=0;Se<L.length;Se++)ge=L[Se],Le=Me+X(ge,Se),ee+=V(ge,Q,le,Le,we);else if(Se=_(L),typeof Se=="function")for(L=Se.call(L),Se=0;!(ge=L.next()).done;)ge=ge.value,Le=Me+X(ge,Se++),ee+=V(ge,Q,le,Le,we);else if(Le==="object"){if(typeof L.then=="function")return V(K(L),Q,le,ge,we);throw Q=String(L),Error("Objects are not valid as a React child (found: "+(Q==="[object Object]"?"object with keys {"+Object.keys(L).join(", ")+"}":Q)+"). If you meant to render a collection of children, use an array instead.")}return ee}function I(L,Q,le){if(L==null)return L;var ge=[],we=0;return V(L,ge,"","",function(Le){return Q.call(le,Le,we++)}),ge}function B(L){if(L._status===-1){var Q=L._result;Q=Q(),Q.then(function(le){(L._status===0||L._status===-1)&&(L._status=1,L._result=le)},function(le){(L._status===0||L._status===-1)&&(L._status=2,L._result=le)}),L._status===-1&&(L._status=0,L._result=Q)}if(L._status===1)return L._result.default;throw L._result}var se=typeof reportError=="function"?reportError:function(L){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Q=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof L=="object"&&L!==null&&typeof L.message=="string"?String(L.message):String(L),error:L});if(!window.dispatchEvent(Q))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",L);return}console.error(L)};function he(){}return dt.Children={map:I,forEach:function(L,Q,le){I(L,function(){Q.apply(this,arguments)},le)},count:function(L){var Q=0;return I(L,function(){Q++}),Q},toArray:function(L){return I(L,function(Q){return Q})||[]},only:function(L){if(!D(L))throw Error("React.Children.only expected to receive a single React element child.");return L}},dt.Component=x,dt.Fragment=n,dt.Profiler=o,dt.PureComponent=T,dt.StrictMode=r,dt.Suspense=m,dt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=P,dt.__COMPILER_RUNTIME={__proto__:null,c:function(L){return P.H.useMemoCache(L)}},dt.cache=function(L){return function(){return L.apply(null,arguments)}},dt.cloneElement=function(L,Q,le){if(L==null)throw Error("The argument must be a React element, but you passed "+L+".");var ge=S({},L.props),we=L.key,Le=void 0;if(Q!=null)for(ee in Q.ref!==void 0&&(Le=void 0),Q.key!==void 0&&(we=""+Q.key),Q)!O.call(Q,ee)||ee==="key"||ee==="__self"||ee==="__source"||ee==="ref"&&Q.ref===void 0||(ge[ee]=Q[ee]);var ee=arguments.length-2;if(ee===1)ge.children=le;else if(1<ee){for(var Me=Array(ee),Se=0;Se<ee;Se++)Me[Se]=arguments[Se+2];ge.children=Me}return F(L.type,we,void 0,void 0,Le,ge)},dt.createContext=function(L){return L={$$typeof:f,_currentValue:L,_currentValue2:L,_threadCount:0,Provider:null,Consumer:null},L.Provider=L,L.Consumer={$$typeof:c,_context:L},L},dt.createElement=function(L,Q,le){var ge,we={},Le=null;if(Q!=null)for(ge in Q.key!==void 0&&(Le=""+Q.key),Q)O.call(Q,ge)&&ge!=="key"&&ge!=="__self"&&ge!=="__source"&&(we[ge]=Q[ge]);var ee=arguments.length-2;if(ee===1)we.children=le;else if(1<ee){for(var Me=Array(ee),Se=0;Se<ee;Se++)Me[Se]=arguments[Se+2];we.children=Me}if(L&&L.defaultProps)for(ge in ee=L.defaultProps,ee)we[ge]===void 0&&(we[ge]=ee[ge]);return F(L,Le,void 0,void 0,null,we)},dt.createRef=function(){return{current:null}},dt.forwardRef=function(L){return{$$typeof:h,render:L}},dt.isValidElement=D,dt.lazy=function(L){return{$$typeof:g,_payload:{_status:-1,_result:L},_init:B}},dt.memo=function(L,Q){return{$$typeof:d,type:L,compare:Q===void 0?null:Q}},dt.startTransition=function(L){var Q=P.T,le={};P.T=le;try{var ge=L(),we=P.S;we!==null&&we(le,ge),typeof ge=="object"&&ge!==null&&typeof ge.then=="function"&&ge.then(he,se)}catch(Le){se(Le)}finally{P.T=Q}},dt.unstable_useCacheRefresh=function(){return P.H.useCacheRefresh()},dt.use=function(L){return P.H.use(L)},dt.useActionState=function(L,Q,le){return P.H.useActionState(L,Q,le)},dt.useCallback=function(L,Q){return P.H.useCallback(L,Q)},dt.useContext=function(L){return P.H.useContext(L)},dt.useDebugValue=function(){},dt.useDeferredValue=function(L,Q){return P.H.useDeferredValue(L,Q)},dt.useEffect=function(L,Q,le){var ge=P.H;if(typeof le=="function")throw Error("useEffect CRUD overload is not enabled in this build of React.");return ge.useEffect(L,Q)},dt.useId=function(){return P.H.useId()},dt.useImperativeHandle=function(L,Q,le){return P.H.useImperativeHandle(L,Q,le)},dt.useInsertionEffect=function(L,Q){return P.H.useInsertionEffect(L,Q)},dt.useLayoutEffect=function(L,Q){return P.H.useLayoutEffect(L,Q)},dt.useMemo=function(L,Q){return P.H.useMemo(L,Q)},dt.useOptimistic=function(L,Q){return P.H.useOptimistic(L,Q)},dt.useReducer=function(L,Q,le){return P.H.useReducer(L,Q,le)},dt.useRef=function(L){return P.H.useRef(L)},dt.useState=function(L){return P.H.useState(L)},dt.useSyncExternalStore=function(L,Q,le){return P.H.useSyncExternalStore(L,Q,le)},dt.useTransition=function(){return P.H.useTransition()},dt.version="19.1.0",dt}var Pv;function Cp(){return Pv||(Pv=1,kd.exports=vM()),kd.exports}var Gd={exports:{}},In={};var Iv;function _M(){if(Iv)return In;Iv=1;var a=Cp();function e(m){var d="https://react.dev/errors/"+m;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)d+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var r={d:{f:n,r:function(){throw Error(e(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},o=Symbol.for("react.portal");function c(m,d,g){var b=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:b==null?null:""+b,children:m,containerInfo:d,implementation:g}}var f=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(m,d){if(m==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return In.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,In.createPortal=function(m,d){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(e(299));return c(m,d,null,g)},In.flushSync=function(m){var d=f.T,g=r.p;try{if(f.T=null,r.p=2,m)return m()}finally{f.T=d,r.p=g,r.d.f()}},In.preconnect=function(m,d){typeof m=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,r.d.C(m,d))},In.prefetchDNS=function(m){typeof m=="string"&&r.d.D(m)},In.preinit=function(m,d){if(typeof m=="string"&&d&&typeof d.as=="string"){var g=d.as,b=h(g,d.crossOrigin),_=typeof d.integrity=="string"?d.integrity:void 0,y=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;g==="style"?r.d.S(m,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:b,integrity:_,fetchPriority:y}):g==="script"&&r.d.X(m,{crossOrigin:b,integrity:_,fetchPriority:y,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},In.preinitModule=function(m,d){if(typeof m=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var g=h(d.as,d.crossOrigin);r.d.M(m,{crossOrigin:g,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&r.d.M(m)},In.preload=function(m,d){if(typeof m=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var g=d.as,b=h(g,d.crossOrigin);r.d.L(m,g,{crossOrigin:b,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},In.preloadModule=function(m,d){if(typeof m=="string")if(d){var g=h(d.as,d.crossOrigin);r.d.m(m,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:g,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else r.d.m(m)},In.requestFormReset=function(m){r.d.r(m)},In.unstable_batchedUpdates=function(m,d){return m(d)},In.useFormState=function(m,d,g){return f.H.useFormState(m,d,g)},In.useFormStatus=function(){return f.H.useHostTransitionStatus()},In.version="19.1.0",In}var Fv;function vx(){if(Fv)return Gd.exports;Fv=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(e){console.error(e)}}return a(),Gd.exports=_M(),Gd.exports}var zv;function xM(){if(zv)return $o;zv=1;var a=gM(),e=Cp(),n=vx();function r(t){var i="https://react.dev/errors/"+t;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+t+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var i=t,s=t;if(t.alternate)for(;i.return;)i=i.return;else{t=i;do i=t,(i.flags&4098)!==0&&(s=i.return),t=i.return;while(t)}return i.tag===3?s:null}function f(t){if(t.tag===13){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function h(t){if(c(t)!==t)throw Error(r(188))}function m(t){var i=t.alternate;if(!i){if(i=c(t),i===null)throw Error(r(188));return i!==t?null:t}for(var s=t,l=i;;){var u=s.return;if(u===null)break;var p=u.alternate;if(p===null){if(l=u.return,l!==null){s=l;continue}break}if(u.child===p.child){for(p=u.child;p;){if(p===s)return h(u),t;if(p===l)return h(u),i;p=p.sibling}throw Error(r(188))}if(s.return!==l.return)s=u,l=p;else{for(var M=!1,N=u.child;N;){if(N===s){M=!0,s=u,l=p;break}if(N===l){M=!0,l=u,s=p;break}N=N.sibling}if(!M){for(N=p.child;N;){if(N===s){M=!0,s=p,l=u;break}if(N===l){M=!0,l=p,s=u;break}N=N.sibling}if(!M)throw Error(r(189))}}if(s.alternate!==l)throw Error(r(190))}if(s.tag!==3)throw Error(r(188));return s.stateNode.current===s?t:i}function d(t){var i=t.tag;if(i===5||i===26||i===27||i===6)return t;for(t=t.child;t!==null;){if(i=d(t),i!==null)return i;t=t.sibling}return null}var g=Object.assign,b=Symbol.for("react.element"),_=Symbol.for("react.transitional.element"),y=Symbol.for("react.portal"),S=Symbol.for("react.fragment"),A=Symbol.for("react.strict_mode"),x=Symbol.for("react.profiler"),v=Symbol.for("react.provider"),T=Symbol.for("react.consumer"),C=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),P=Symbol.for("react.suspense"),O=Symbol.for("react.suspense_list"),F=Symbol.for("react.memo"),E=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),Y=Symbol.for("react.memo_cache_sentinel"),k=Symbol.iterator;function X(t){return t===null||typeof t!="object"?null:(t=k&&t[k]||t["@@iterator"],typeof t=="function"?t:null)}var $=Symbol.for("react.client.reference");function K(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===$?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case S:return"Fragment";case x:return"Profiler";case A:return"StrictMode";case P:return"Suspense";case O:return"SuspenseList";case D:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case y:return"Portal";case C:return(t.displayName||"Context")+".Provider";case T:return(t._context.displayName||"Context")+".Consumer";case R:var i=t.render;return t=t.displayName,t||(t=i.displayName||i.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case F:return i=t.displayName||null,i!==null?i:K(t.type)||"Memo";case E:i=t._payload,t=t._init;try{return K(t(i))}catch{}}return null}var V=Array.isArray,I=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,B=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,se={pending:!1,data:null,method:null,action:null},he=[],L=-1;function Q(t){return{current:t}}function le(t){0>L||(t.current=he[L],he[L]=null,L--)}function ge(t,i){L++,he[L]=t.current,t.current=i}var we=Q(null),Le=Q(null),ee=Q(null),Me=Q(null);function Se(t,i){switch(ge(ee,i),ge(Le,t),ge(we,null),i.nodeType){case 9:case 11:t=(t=i.documentElement)&&(t=t.namespaceURI)?av(t):0;break;default:if(t=i.tagName,i=i.namespaceURI)i=av(i),t=rv(i,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}le(we),ge(we,t)}function ze(){le(we),le(Le),le(ee)}function Je(t){t.memoizedState!==null&&ge(Me,t);var i=we.current,s=rv(i,t.type);i!==s&&(ge(Le,t),ge(we,s))}function et(t){Le.current===t&&(le(we),le(Le)),Me.current===t&&(le(Me),qo._currentValue=se)}var Wt=Object.prototype.hasOwnProperty,ct=a.unstable_scheduleCallback,_t=a.unstable_cancelCallback,Bt=a.unstable_shouldYield,ut=a.unstable_requestPaint,Ct=a.unstable_now,j=a.unstable_getCurrentPriorityLevel,tn=a.unstable_ImmediatePriority,At=a.unstable_UserBlockingPriority,Lt=a.unstable_NormalPriority,Ye=a.unstable_LowPriority,H=a.unstable_IdlePriority,w=a.log,J=a.unstable_setDisableYieldValue,ve=null,xe=null;function pe(t){if(typeof w=="function"&&J(t),xe&&typeof xe.setStrictMode=="function")try{xe.setStrictMode(ve,t)}catch{}}var Oe=Math.clz32?Math.clz32:nt,De=Math.log,$e=Math.LN2;function nt(t){return t>>>=0,t===0?32:31-(De(t)/$e|0)|0}var Ee=256,Ae=4194304;function Be(t){var i=t&42;if(i!==0)return i;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Ge(t,i,s){var l=t.pendingLanes;if(l===0)return 0;var u=0,p=t.suspendedLanes,M=t.pingedLanes;t=t.warmLanes;var N=l&134217727;return N!==0?(l=N&~p,l!==0?u=Be(l):(M&=N,M!==0?u=Be(M):s||(s=N&~t,s!==0&&(u=Be(s))))):(N=l&~p,N!==0?u=Be(N):M!==0?u=Be(M):s||(s=l&~t,s!==0&&(u=Be(s)))),u===0?0:i!==0&&i!==u&&(i&p)===0&&(p=u&-u,s=i&-i,p>=s||p===32&&(s&4194048)!==0)?i:u}function Ie(t,i){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&i)===0}function ft(t,i){switch(t){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Z(){var t=Ee;return Ee<<=1,(Ee&4194048)===0&&(Ee=256),t}function Ce(){var t=Ae;return Ae<<=1,(Ae&62914560)===0&&(Ae=4194304),t}function Re(t){for(var i=[],s=0;31>s;s++)i.push(t);return i}function Fe(t,i){t.pendingLanes|=i,i!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Te(t,i,s,l,u,p){var M=t.pendingLanes;t.pendingLanes=s,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=s,t.entangledLanes&=s,t.errorRecoveryDisabledLanes&=s,t.shellSuspendCounter=0;var N=t.entanglements,G=t.expirationTimes,oe=t.hiddenUpdates;for(s=M&~s;0<s;){var _e=31-Oe(s),be=1<<_e;N[_e]=0,G[_e]=-1;var ue=oe[_e];if(ue!==null)for(oe[_e]=null,_e=0;_e<ue.length;_e++){var fe=ue[_e];fe!==null&&(fe.lane&=-536870913)}s&=~be}l!==0&&me(t,l,0),p!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=p&~(M&~i))}function me(t,i,s){t.pendingLanes|=i,t.suspendedLanes&=~i;var l=31-Oe(i);t.entangledLanes|=i,t.entanglements[l]=t.entanglements[l]|1073741824|s&4194090}function Ve(t,i){var s=t.entangledLanes|=i;for(t=t.entanglements;s;){var l=31-Oe(s),u=1<<l;u&i|t[l]&i&&(t[l]|=i),s&=~u}}function at(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Ft(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Dt(){var t=B.p;return t!==0?t:(t=window.event,t===void 0?32:Ev(t.type))}function bi(t,i){var s=B.p;try{return B.p=t,i()}finally{B.p=s}}var Sn=Math.random().toString(36).slice(2),gn="__reactFiber$"+Sn,Mn="__reactProps$"+Sn,Da="__reactContainer$"+Sn,Wr="__reactEvents$"+Sn,Al="__reactListeners$"+Sn,$i="__reactHandles$"+Sn,qr="__reactResources$"+Sn,Na="__reactMarker$"+Sn;function Yr(t){delete t[gn],delete t[Mn],delete t[Wr],delete t[Al],delete t[$i]}function Si(t){var i=t[gn];if(i)return i;for(var s=t.parentNode;s;){if(i=s[Da]||s[gn]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(t=cv(t);t!==null;){if(s=t[gn])return s;t=cv(t)}return i}t=s,s=t.parentNode}return null}function ea(t){if(t=t[gn]||t[Da]){var i=t.tag;if(i===5||i===6||i===13||i===26||i===27||i===3)return t}return null}function Li(t){var i=t.tag;if(i===5||i===26||i===27||i===6)return t.stateNode;throw Error(r(33))}function ta(t){var i=t[qr];return i||(i=t[qr]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function ln(t){t[Na]=!0}var wl=new Set,Rl={};function na(t,i){Ua(t,i),Ua(t+"Capture",i)}function Ua(t,i){for(Rl[t]=i,t=0;t<i.length;t++)wl.add(i[t])}var Pu=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Cl={},U={};function te(t){return Wt.call(U,t)?!0:Wt.call(Cl,t)?!1:Pu.test(t)?U[t]=!0:(Cl[t]=!0,!1)}function de(t,i,s){if(te(i))if(s===null)t.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":t.removeAttribute(i);return;case"boolean":var l=i.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){t.removeAttribute(i);return}}t.setAttribute(i,""+s)}}function ce(t,i,s){if(s===null)t.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(i);return}t.setAttribute(i,""+s)}}function ie(t,i,s,l){if(l===null)t.removeAttribute(s);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(s);return}t.setAttributeNS(i,s,""+l)}}var Ue,He;function Ne(t){if(Ue===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);Ue=i&&i[1]||"",He=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ue+t+He}var je=!1;function Ze(t,i){if(!t||je)return"";je=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(i){var be=function(){throw Error()};if(Object.defineProperty(be.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(be,[])}catch(fe){var ue=fe}Reflect.construct(t,[],be)}else{try{be.call()}catch(fe){ue=fe}t.call(be.prototype)}}else{try{throw Error()}catch(fe){ue=fe}(be=t())&&typeof be.catch=="function"&&be.catch(function(){})}}catch(fe){if(fe&&ue&&typeof fe.stack=="string")return[fe.stack,ue.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var p=l.DetermineComponentFrameRoot(),M=p[0],N=p[1];if(M&&N){var G=M.split(`
`),oe=N.split(`
`);for(u=l=0;l<G.length&&!G[l].includes("DetermineComponentFrameRoot");)l++;for(;u<oe.length&&!oe[u].includes("DetermineComponentFrameRoot");)u++;if(l===G.length||u===oe.length)for(l=G.length-1,u=oe.length-1;1<=l&&0<=u&&G[l]!==oe[u];)u--;for(;1<=l&&0<=u;l--,u--)if(G[l]!==oe[u]){if(l!==1||u!==1)do if(l--,u--,0>u||G[l]!==oe[u]){var _e=`
`+G[l].replace(" at new "," at ");return t.displayName&&_e.includes("<anonymous>")&&(_e=_e.replace("<anonymous>",t.displayName)),_e}while(1<=l&&0<=u);break}}}finally{je=!1,Error.prepareStackTrace=s}return(s=t?t.displayName||t.name:"")?Ne(s):""}function ot(t){switch(t.tag){case 26:case 27:case 5:return Ne(t.type);case 16:return Ne("Lazy");case 13:return Ne("Suspense");case 19:return Ne("SuspenseList");case 0:case 15:return Ze(t.type,!1);case 11:return Ze(t.type.render,!1);case 1:return Ze(t.type,!0);case 31:return Ne("Activity");default:return""}}function lt(t){try{var i="";do i+=ot(t),t=t.return;while(t);return i}catch(s){return`
Error generating stack: `+s.message+`
`+s.stack}}function ke(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Ot(t){var i=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function nn(t){var i=Ot(t)?"checked":"value",s=Object.getOwnPropertyDescriptor(t.constructor.prototype,i),l=""+t[i];if(!t.hasOwnProperty(i)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var u=s.get,p=s.set;return Object.defineProperty(t,i,{configurable:!0,get:function(){return u.call(this)},set:function(M){l=""+M,p.call(this,M)}}),Object.defineProperty(t,i,{enumerable:s.enumerable}),{getValue:function(){return l},setValue:function(M){l=""+M},stopTracking:function(){t._valueTracker=null,delete t[i]}}}}function qt(t){t._valueTracker||(t._valueTracker=nn(t))}function Pt(t){if(!t)return!1;var i=t._valueTracker;if(!i)return!0;var s=i.getValue(),l="";return t&&(l=Ot(t)?t.checked?"true":"false":t.value),t=l,t!==s?(i.setValue(t),!0):!1}function cn(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Ke=/[\n"\\]/g;function Zt(t){return t.replace(Ke,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function Mt(t,i,s,l,u,p,M,N){t.name="",M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"?t.type=M:t.removeAttribute("type"),i!=null?M==="number"?(i===0&&t.value===""||t.value!=i)&&(t.value=""+ke(i)):t.value!==""+ke(i)&&(t.value=""+ke(i)):M!=="submit"&&M!=="reset"||t.removeAttribute("value"),i!=null?Wn(t,M,ke(i)):s!=null?Wn(t,M,ke(s)):l!=null&&t.removeAttribute("value"),u==null&&p!=null&&(t.defaultChecked=!!p),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),N!=null&&typeof N!="function"&&typeof N!="symbol"&&typeof N!="boolean"?t.name=""+ke(N):t.removeAttribute("name")}function Xn(t,i,s,l,u,p,M,N){if(p!=null&&typeof p!="function"&&typeof p!="symbol"&&typeof p!="boolean"&&(t.type=p),i!=null||s!=null){if(!(p!=="submit"&&p!=="reset"||i!=null))return;s=s!=null?""+ke(s):"",i=i!=null?""+ke(i):s,N||i===t.value||(t.value=i),t.defaultValue=i}l=l??u,l=typeof l!="function"&&typeof l!="symbol"&&!!l,t.checked=N?t.checked:!!l,t.defaultChecked=!!l,M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"&&(t.name=M)}function Wn(t,i,s){i==="number"&&cn(t.ownerDocument)===t||t.defaultValue===""+s||(t.defaultValue=""+s)}function qn(t,i,s,l){if(t=t.options,i){i={};for(var u=0;u<s.length;u++)i["$"+s[u]]=!0;for(s=0;s<t.length;s++)u=i.hasOwnProperty("$"+t[s].value),t[s].selected!==u&&(t[s].selected=u),u&&l&&(t[s].defaultSelected=!0)}else{for(s=""+ke(s),i=null,u=0;u<t.length;u++){if(t[u].value===s){t[u].selected=!0,l&&(t[u].defaultSelected=!0);return}i!==null||t[u].disabled||(i=t[u])}i!==null&&(i.selected=!0)}}function ia(t,i,s){if(i!=null&&(i=""+ke(i),i!==t.value&&(t.value=i),s==null)){t.defaultValue!==i&&(t.defaultValue=i);return}t.defaultValue=s!=null?""+ke(s):""}function zt(t,i,s,l){if(i==null){if(l!=null){if(s!=null)throw Error(r(92));if(V(l)){if(1<l.length)throw Error(r(93));l=l[0]}s=l}s==null&&(s=""),i=s}s=ke(i),t.defaultValue=s,l=t.textContent,l===s&&l!==""&&l!==null&&(t.value=l)}function Jt(t,i){if(i){var s=t.firstChild;if(s&&s===t.lastChild&&s.nodeType===3){s.nodeValue=i;return}}t.textContent=i}var Oi=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function un(t,i,s){var l=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?l?t.setProperty(i,""):i==="float"?t.cssFloat="":t[i]="":l?t.setProperty(i,s):typeof s!="number"||s===0||Oi.has(i)?i==="float"?t.cssFloat=s:t[i]=(""+s).trim():t[i]=s+"px"}function Mi(t,i,s){if(i!=null&&typeof i!="object")throw Error(r(62));if(t=t.style,s!=null){for(var l in s)!s.hasOwnProperty(l)||i!=null&&i.hasOwnProperty(l)||(l.indexOf("--")===0?t.setProperty(l,""):l==="float"?t.cssFloat="":t[l]="");for(var u in i)l=i[u],i.hasOwnProperty(u)&&s[u]!==l&&un(t,u,l)}else for(var p in i)i.hasOwnProperty(p)&&un(t,p,i[p])}function Pi(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Dl=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),fb=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Nl(t){return fb.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}var Iu=null;function Fu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Zr=null,Kr=null;function sm(t){var i=ea(t);if(i&&(t=i.stateNode)){var s=t[Mn]||null;e:switch(t=i.stateNode,i.type){case"input":if(Mt(t,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=t;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+Zt(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var l=s[i];if(l!==t&&l.form===t.form){var u=l[Mn]||null;if(!u)throw Error(r(90));Mt(l,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(i=0;i<s.length;i++)l=s[i],l.form===t.form&&Pt(l)}break e;case"textarea":ia(t,s.value,s.defaultValue);break e;case"select":i=s.value,i!=null&&qn(t,!!s.multiple,i,!1)}}}var zu=!1;function om(t,i,s){if(zu)return t(i,s);zu=!0;try{var l=t(i);return l}finally{if(zu=!1,(Zr!==null||Kr!==null)&&(gc(),Zr&&(i=Zr,t=Kr,Kr=Zr=null,sm(i),t)))for(i=0;i<t.length;i++)sm(t[i])}}function ro(t,i){var s=t.stateNode;if(s===null)return null;var l=s[Mn]||null;if(l===null)return null;s=l[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break e;default:t=!1}if(t)return null;if(s&&typeof s!="function")throw Error(r(231,i,typeof s));return s}var aa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Bu=!1;if(aa)try{var so={};Object.defineProperty(so,"passive",{get:function(){Bu=!0}}),window.addEventListener("test",so,so),window.removeEventListener("test",so,so)}catch{Bu=!1}var La=null,Hu=null,Ul=null;function lm(){if(Ul)return Ul;var t,i=Hu,s=i.length,l,u="value"in La?La.value:La.textContent,p=u.length;for(t=0;t<s&&i[t]===u[t];t++);var M=s-t;for(l=1;l<=M&&i[s-l]===u[p-l];l++);return Ul=u.slice(t,1<l?1-l:void 0)}function Ll(t){var i=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&i===13&&(t=13)):t=i,t===10&&(t=13),32<=t||t===13?t:0}function Ol(){return!0}function cm(){return!1}function Yn(t){function i(s,l,u,p,M){this._reactName=s,this._targetInst=u,this.type=l,this.nativeEvent=p,this.target=M,this.currentTarget=null;for(var N in t)t.hasOwnProperty(N)&&(s=t[N],this[N]=s?s(p):p[N]);return this.isDefaultPrevented=(p.defaultPrevented!=null?p.defaultPrevented:p.returnValue===!1)?Ol:cm,this.isPropagationStopped=cm,this}return g(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Ol)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Ol)},persist:function(){},isPersistent:Ol}),i}var pr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Pl=Yn(pr),oo=g({},pr,{view:0,detail:0}),db=Yn(oo),ku,Gu,lo,Il=g({},oo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ju,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==lo&&(lo&&t.type==="mousemove"?(ku=t.screenX-lo.screenX,Gu=t.screenY-lo.screenY):Gu=ku=0,lo=t),ku)},movementY:function(t){return"movementY"in t?t.movementY:Gu}}),um=Yn(Il),hb=g({},Il,{dataTransfer:0}),pb=Yn(hb),mb=g({},oo,{relatedTarget:0}),Vu=Yn(mb),gb=g({},pr,{animationName:0,elapsedTime:0,pseudoElement:0}),vb=Yn(gb),_b=g({},pr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),xb=Yn(_b),yb=g({},pr,{data:0}),fm=Yn(yb),bb={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Sb={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Mb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Eb(t){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(t):(t=Mb[t])?!!i[t]:!1}function ju(){return Eb}var Tb=g({},oo,{key:function(t){if(t.key){var i=bb[t.key]||t.key;if(i!=="Unidentified")return i}return t.type==="keypress"?(t=Ll(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Sb[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ju,charCode:function(t){return t.type==="keypress"?Ll(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ll(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Ab=Yn(Tb),wb=g({},Il,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),dm=Yn(wb),Rb=g({},oo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ju}),Cb=Yn(Rb),Db=g({},pr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Nb=Yn(Db),Ub=g({},Il,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Lb=Yn(Ub),Ob=g({},pr,{newState:0,oldState:0}),Pb=Yn(Ob),Ib=[9,13,27,32],Xu=aa&&"CompositionEvent"in window,co=null;aa&&"documentMode"in document&&(co=document.documentMode);var Fb=aa&&"TextEvent"in window&&!co,hm=aa&&(!Xu||co&&8<co&&11>=co),pm=" ",mm=!1;function gm(t,i){switch(t){case"keyup":return Ib.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function vm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Qr=!1;function zb(t,i){switch(t){case"compositionend":return vm(i);case"keypress":return i.which!==32?null:(mm=!0,pm);case"textInput":return t=i.data,t===pm&&mm?null:t;default:return null}}function Bb(t,i){if(Qr)return t==="compositionend"||!Xu&&gm(t,i)?(t=lm(),Ul=Hu=La=null,Qr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return hm&&i.locale!=="ko"?null:i.data;default:return null}}var Hb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function _m(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i==="input"?!!Hb[t.type]:i==="textarea"}function xm(t,i,s,l){Zr?Kr?Kr.push(l):Kr=[l]:Zr=l,i=Sc(i,"onChange"),0<i.length&&(s=new Pl("onChange","change",null,s,l),t.push({event:s,listeners:i}))}var uo=null,fo=null;function kb(t){$0(t,0)}function Fl(t){var i=Li(t);if(Pt(i))return t}function ym(t,i){if(t==="change")return i}var bm=!1;if(aa){var Wu;if(aa){var qu="oninput"in document;if(!qu){var Sm=document.createElement("div");Sm.setAttribute("oninput","return;"),qu=typeof Sm.oninput=="function"}Wu=qu}else Wu=!1;bm=Wu&&(!document.documentMode||9<document.documentMode)}function Mm(){uo&&(uo.detachEvent("onpropertychange",Em),fo=uo=null)}function Em(t){if(t.propertyName==="value"&&Fl(fo)){var i=[];xm(i,fo,t,Fu(t)),om(kb,i)}}function Gb(t,i,s){t==="focusin"?(Mm(),uo=i,fo=s,uo.attachEvent("onpropertychange",Em)):t==="focusout"&&Mm()}function Vb(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Fl(fo)}function jb(t,i){if(t==="click")return Fl(i)}function Xb(t,i){if(t==="input"||t==="change")return Fl(i)}function Wb(t,i){return t===i&&(t!==0||1/t===1/i)||t!==t&&i!==i}var $n=typeof Object.is=="function"?Object.is:Wb;function ho(t,i){if($n(t,i))return!0;if(typeof t!="object"||t===null||typeof i!="object"||i===null)return!1;var s=Object.keys(t),l=Object.keys(i);if(s.length!==l.length)return!1;for(l=0;l<s.length;l++){var u=s[l];if(!Wt.call(i,u)||!$n(t[u],i[u]))return!1}return!0}function Tm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Am(t,i){var s=Tm(t);t=0;for(var l;s;){if(s.nodeType===3){if(l=t+s.textContent.length,t<=i&&l>=i)return{node:s,offset:i-t};t=l}e:{for(;s;){if(s.nextSibling){s=s.nextSibling;break e}s=s.parentNode}s=void 0}s=Tm(s)}}function wm(t,i){return t&&i?t===i?!0:t&&t.nodeType===3?!1:i&&i.nodeType===3?wm(t,i.parentNode):"contains"in t?t.contains(i):t.compareDocumentPosition?!!(t.compareDocumentPosition(i)&16):!1:!1}function Rm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var i=cn(t.document);i instanceof t.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)t=i.contentWindow;else break;i=cn(t.document)}return i}function Yu(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i&&(i==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||i==="textarea"||t.contentEditable==="true")}var qb=aa&&"documentMode"in document&&11>=document.documentMode,Jr=null,Zu=null,po=null,Ku=!1;function Cm(t,i,s){var l=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;Ku||Jr==null||Jr!==cn(l)||(l=Jr,"selectionStart"in l&&Yu(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),po&&ho(po,l)||(po=l,l=Sc(Zu,"onSelect"),0<l.length&&(i=new Pl("onSelect","select",null,i,s),t.push({event:i,listeners:l}),i.target=Jr)))}function mr(t,i){var s={};return s[t.toLowerCase()]=i.toLowerCase(),s["Webkit"+t]="webkit"+i,s["Moz"+t]="moz"+i,s}var $r={animationend:mr("Animation","AnimationEnd"),animationiteration:mr("Animation","AnimationIteration"),animationstart:mr("Animation","AnimationStart"),transitionrun:mr("Transition","TransitionRun"),transitionstart:mr("Transition","TransitionStart"),transitioncancel:mr("Transition","TransitionCancel"),transitionend:mr("Transition","TransitionEnd")},Qu={},Dm={};aa&&(Dm=document.createElement("div").style,"AnimationEvent"in window||(delete $r.animationend.animation,delete $r.animationiteration.animation,delete $r.animationstart.animation),"TransitionEvent"in window||delete $r.transitionend.transition);function gr(t){if(Qu[t])return Qu[t];if(!$r[t])return t;var i=$r[t],s;for(s in i)if(i.hasOwnProperty(s)&&s in Dm)return Qu[t]=i[s];return t}var Nm=gr("animationend"),Um=gr("animationiteration"),Lm=gr("animationstart"),Yb=gr("transitionrun"),Zb=gr("transitionstart"),Kb=gr("transitioncancel"),Om=gr("transitionend"),Pm=new Map,Ju="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Ju.push("scrollEnd");function Ei(t,i){Pm.set(t,i),na(i,[t])}var Im=new WeakMap;function fi(t,i){if(typeof t=="object"&&t!==null){var s=Im.get(t);return s!==void 0?s:(i={value:t,source:i,stack:lt(i)},Im.set(t,i),i)}return{value:t,source:i,stack:lt(i)}}var di=[],es=0,$u=0;function zl(){for(var t=es,i=$u=es=0;i<t;){var s=di[i];di[i++]=null;var l=di[i];di[i++]=null;var u=di[i];di[i++]=null;var p=di[i];if(di[i++]=null,l!==null&&u!==null){var M=l.pending;M===null?u.next=u:(u.next=M.next,M.next=u),l.pending=u}p!==0&&Fm(s,u,p)}}function Bl(t,i,s,l){di[es++]=t,di[es++]=i,di[es++]=s,di[es++]=l,$u|=l,t.lanes|=l,t=t.alternate,t!==null&&(t.lanes|=l)}function ef(t,i,s,l){return Bl(t,i,s,l),Hl(t)}function ts(t,i){return Bl(t,null,null,i),Hl(t)}function Fm(t,i,s){t.lanes|=s;var l=t.alternate;l!==null&&(l.lanes|=s);for(var u=!1,p=t.return;p!==null;)p.childLanes|=s,l=p.alternate,l!==null&&(l.childLanes|=s),p.tag===22&&(t=p.stateNode,t===null||t._visibility&1||(u=!0)),t=p,p=p.return;return t.tag===3?(p=t.stateNode,u&&i!==null&&(u=31-Oe(s),t=p.hiddenUpdates,l=t[u],l===null?t[u]=[i]:l.push(i),i.lane=s|536870912),p):null}function Hl(t){if(50<Bo)throw Bo=0,od=null,Error(r(185));for(var i=t.return;i!==null;)t=i,i=t.return;return t.tag===3?t.stateNode:null}var ns={};function Qb(t,i,s,l){this.tag=t,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ei(t,i,s,l){return new Qb(t,i,s,l)}function tf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ra(t,i){var s=t.alternate;return s===null?(s=ei(t.tag,i,t.key,t.mode),s.elementType=t.elementType,s.type=t.type,s.stateNode=t.stateNode,s.alternate=t,t.alternate=s):(s.pendingProps=i,s.type=t.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=t.flags&65011712,s.childLanes=t.childLanes,s.lanes=t.lanes,s.child=t.child,s.memoizedProps=t.memoizedProps,s.memoizedState=t.memoizedState,s.updateQueue=t.updateQueue,i=t.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=t.sibling,s.index=t.index,s.ref=t.ref,s.refCleanup=t.refCleanup,s}function zm(t,i){t.flags&=65011714;var s=t.alternate;return s===null?(t.childLanes=0,t.lanes=i,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=s.childLanes,t.lanes=s.lanes,t.child=s.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=s.memoizedProps,t.memoizedState=s.memoizedState,t.updateQueue=s.updateQueue,t.type=s.type,i=s.dependencies,t.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),t}function kl(t,i,s,l,u,p){var M=0;if(l=t,typeof t=="function")tf(t)&&(M=1);else if(typeof t=="string")M=$S(t,s,we.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case D:return t=ei(31,s,i,u),t.elementType=D,t.lanes=p,t;case S:return vr(s.children,u,p,i);case A:M=8,u|=24;break;case x:return t=ei(12,s,i,u|2),t.elementType=x,t.lanes=p,t;case P:return t=ei(13,s,i,u),t.elementType=P,t.lanes=p,t;case O:return t=ei(19,s,i,u),t.elementType=O,t.lanes=p,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case v:case C:M=10;break e;case T:M=9;break e;case R:M=11;break e;case F:M=14;break e;case E:M=16,l=null;break e}M=29,s=Error(r(130,t===null?"null":typeof t,"")),l=null}return i=ei(M,s,i,u),i.elementType=t,i.type=l,i.lanes=p,i}function vr(t,i,s,l){return t=ei(7,t,l,i),t.lanes=s,t}function nf(t,i,s){return t=ei(6,t,null,i),t.lanes=s,t}function af(t,i,s){return i=ei(4,t.children!==null?t.children:[],t.key,i),i.lanes=s,i.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},i}var is=[],as=0,Gl=null,Vl=0,hi=[],pi=0,_r=null,sa=1,oa="";function xr(t,i){is[as++]=Vl,is[as++]=Gl,Gl=t,Vl=i}function Bm(t,i,s){hi[pi++]=sa,hi[pi++]=oa,hi[pi++]=_r,_r=t;var l=sa;t=oa;var u=32-Oe(l)-1;l&=~(1<<u),s+=1;var p=32-Oe(i)+u;if(30<p){var M=u-u%5;p=(l&(1<<M)-1).toString(32),l>>=M,u-=M,sa=1<<32-Oe(i)+u|s<<u|l,oa=p+t}else sa=1<<p|s<<u|l,oa=t}function rf(t){t.return!==null&&(xr(t,1),Bm(t,1,0))}function sf(t){for(;t===Gl;)Gl=is[--as],is[as]=null,Vl=is[--as],is[as]=null;for(;t===_r;)_r=hi[--pi],hi[pi]=null,oa=hi[--pi],hi[pi]=null,sa=hi[--pi],hi[pi]=null}var Hn=null,rn=null,It=!1,yr=null,Ii=!1,of=Error(r(519));function br(t){var i=Error(r(418,""));throw vo(fi(i,t)),of}function Hm(t){var i=t.stateNode,s=t.type,l=t.memoizedProps;switch(i[gn]=t,i[Mn]=l,s){case"dialog":St("cancel",i),St("close",i);break;case"iframe":case"object":case"embed":St("load",i);break;case"video":case"audio":for(s=0;s<ko.length;s++)St(ko[s],i);break;case"source":St("error",i);break;case"img":case"image":case"link":St("error",i),St("load",i);break;case"details":St("toggle",i);break;case"input":St("invalid",i),Xn(i,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0),qt(i);break;case"select":St("invalid",i);break;case"textarea":St("invalid",i),zt(i,l.value,l.defaultValue,l.children),qt(i)}s=l.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||l.suppressHydrationWarning===!0||iv(i.textContent,s)?(l.popover!=null&&(St("beforetoggle",i),St("toggle",i)),l.onScroll!=null&&St("scroll",i),l.onScrollEnd!=null&&St("scrollend",i),l.onClick!=null&&(i.onclick=Mc),i=!0):i=!1,i||br(t)}function km(t){for(Hn=t.return;Hn;)switch(Hn.tag){case 5:case 13:Ii=!1;return;case 27:case 3:Ii=!0;return;default:Hn=Hn.return}}function mo(t){if(t!==Hn)return!1;if(!It)return km(t),It=!0,!1;var i=t.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=t.type,s=!(s!=="form"&&s!=="button")||Md(t.type,t.memoizedProps)),s=!s),s&&rn&&br(t),km(t),i===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));e:{for(t=t.nextSibling,i=0;t;){if(t.nodeType===8)if(s=t.data,s==="/$"){if(i===0){rn=Ai(t.nextSibling);break e}i--}else s!=="$"&&s!=="$!"&&s!=="$?"||i++;t=t.nextSibling}rn=null}}else i===27?(i=rn,Za(t.type)?(t=wd,wd=null,rn=t):rn=i):rn=Hn?Ai(t.stateNode.nextSibling):null;return!0}function go(){rn=Hn=null,It=!1}function Gm(){var t=yr;return t!==null&&(Qn===null?Qn=t:Qn.push.apply(Qn,t),yr=null),t}function vo(t){yr===null?yr=[t]:yr.push(t)}var lf=Q(null),Sr=null,la=null;function Oa(t,i,s){ge(lf,i._currentValue),i._currentValue=s}function ca(t){t._currentValue=lf.current,le(lf)}function cf(t,i,s){for(;t!==null;){var l=t.alternate;if((t.childLanes&i)!==i?(t.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),t===s)break;t=t.return}}function uf(t,i,s,l){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var p=u.dependencies;if(p!==null){var M=u.child;p=p.firstContext;e:for(;p!==null;){var N=p;p=u;for(var G=0;G<i.length;G++)if(N.context===i[G]){p.lanes|=s,N=p.alternate,N!==null&&(N.lanes|=s),cf(p.return,s,t),l||(M=null);break e}p=N.next}}else if(u.tag===18){if(M=u.return,M===null)throw Error(r(341));M.lanes|=s,p=M.alternate,p!==null&&(p.lanes|=s),cf(M,s,t),M=null}else M=u.child;if(M!==null)M.return=u;else for(M=u;M!==null;){if(M===t){M=null;break}if(u=M.sibling,u!==null){u.return=M.return,M=u;break}M=M.return}u=M}}function _o(t,i,s,l){t=null;for(var u=i,p=!1;u!==null;){if(!p){if((u.flags&524288)!==0)p=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var M=u.alternate;if(M===null)throw Error(r(387));if(M=M.memoizedProps,M!==null){var N=u.type;$n(u.pendingProps.value,M.value)||(t!==null?t.push(N):t=[N])}}else if(u===Me.current){if(M=u.alternate,M===null)throw Error(r(387));M.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(qo):t=[qo])}u=u.return}t!==null&&uf(i,t,s,l),i.flags|=262144}function jl(t){for(t=t.firstContext;t!==null;){if(!$n(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Mr(t){Sr=t,la=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Pn(t){return Vm(Sr,t)}function Xl(t,i){return Sr===null&&Mr(t),Vm(t,i)}function Vm(t,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},la===null){if(t===null)throw Error(r(308));la=i,t.dependencies={lanes:0,firstContext:i},t.flags|=524288}else la=la.next=i;return s}var Jb=typeof AbortController<"u"?AbortController:function(){var t=[],i=this.signal={aborted:!1,addEventListener:function(s,l){t.push(l)}};this.abort=function(){i.aborted=!0,t.forEach(function(s){return s()})}},$b=a.unstable_scheduleCallback,eS=a.unstable_NormalPriority,vn={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ff(){return{controller:new Jb,data:new Map,refCount:0}}function xo(t){t.refCount--,t.refCount===0&&$b(eS,function(){t.controller.abort()})}var yo=null,df=0,rs=0,ss=null;function tS(t,i){if(yo===null){var s=yo=[];df=0,rs=pd(),ss={status:"pending",value:void 0,then:function(l){s.push(l)}}}return df++,i.then(jm,jm),i}function jm(){if(--df===0&&yo!==null){ss!==null&&(ss.status="fulfilled");var t=yo;yo=null,rs=0,ss=null;for(var i=0;i<t.length;i++)(0,t[i])()}}function nS(t,i){var s=[],l={status:"pending",value:null,reason:null,then:function(u){s.push(u)}};return t.then(function(){l.status="fulfilled",l.value=i;for(var u=0;u<s.length;u++)(0,s[u])(i)},function(u){for(l.status="rejected",l.reason=u,u=0;u<s.length;u++)(0,s[u])(void 0)}),l}var Xm=I.S;I.S=function(t,i){typeof i=="object"&&i!==null&&typeof i.then=="function"&&tS(t,i),Xm!==null&&Xm(t,i)};var Er=Q(null);function hf(){var t=Er.current;return t!==null?t:Kt.pooledCache}function Wl(t,i){i===null?ge(Er,Er.current):ge(Er,i.pool)}function Wm(){var t=hf();return t===null?null:{parent:vn._currentValue,pool:t}}var bo=Error(r(460)),qm=Error(r(474)),ql=Error(r(542)),pf={then:function(){}};function Ym(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Yl(){}function Zm(t,i,s){switch(s=t[s],s===void 0?t.push(i):s!==i&&(i.then(Yl,Yl),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw t=i.reason,Qm(t),t;default:if(typeof i.status=="string")i.then(Yl,Yl);else{if(t=Kt,t!==null&&100<t.shellSuspendCounter)throw Error(r(482));t=i,t.status="pending",t.then(function(l){if(i.status==="pending"){var u=i;u.status="fulfilled",u.value=l}},function(l){if(i.status==="pending"){var u=i;u.status="rejected",u.reason=l}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw t=i.reason,Qm(t),t}throw So=i,bo}}var So=null;function Km(){if(So===null)throw Error(r(459));var t=So;return So=null,t}function Qm(t){if(t===bo||t===ql)throw Error(r(483))}var Pa=!1;function mf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function gf(t,i){t=t.updateQueue,i.updateQueue===t&&(i.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ia(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Fa(t,i,s){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(Ht&2)!==0){var u=l.pending;return u===null?i.next=i:(i.next=u.next,u.next=i),l.pending=i,i=Hl(t),Fm(t,null,s),i}return Bl(t,l,i,s),Hl(t)}function Mo(t,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var l=i.lanes;l&=t.pendingLanes,s|=l,i.lanes=s,Ve(t,s)}}function vf(t,i){var s=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,s===l)){var u=null,p=null;if(s=s.firstBaseUpdate,s!==null){do{var M={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};p===null?u=p=M:p=p.next=M,s=s.next}while(s!==null);p===null?u=p=i:p=p.next=i}else u=p=i;s={baseState:l.baseState,firstBaseUpdate:u,lastBaseUpdate:p,shared:l.shared,callbacks:l.callbacks},t.updateQueue=s;return}t=s.lastBaseUpdate,t===null?s.firstBaseUpdate=i:t.next=i,s.lastBaseUpdate=i}var _f=!1;function Eo(){if(_f){var t=ss;if(t!==null)throw t}}function To(t,i,s,l){_f=!1;var u=t.updateQueue;Pa=!1;var p=u.firstBaseUpdate,M=u.lastBaseUpdate,N=u.shared.pending;if(N!==null){u.shared.pending=null;var G=N,oe=G.next;G.next=null,M===null?p=oe:M.next=oe,M=G;var _e=t.alternate;_e!==null&&(_e=_e.updateQueue,N=_e.lastBaseUpdate,N!==M&&(N===null?_e.firstBaseUpdate=oe:N.next=oe,_e.lastBaseUpdate=G))}if(p!==null){var be=u.baseState;M=0,_e=oe=G=null,N=p;do{var ue=N.lane&-536870913,fe=ue!==N.lane;if(fe?(Tt&ue)===ue:(l&ue)===ue){ue!==0&&ue===rs&&(_f=!0),_e!==null&&(_e=_e.next={lane:0,tag:N.tag,payload:N.payload,callback:null,next:null});e:{var rt=t,tt=N;ue=i;var Xt=s;switch(tt.tag){case 1:if(rt=tt.payload,typeof rt=="function"){be=rt.call(Xt,be,ue);break e}be=rt;break e;case 3:rt.flags=rt.flags&-65537|128;case 0:if(rt=tt.payload,ue=typeof rt=="function"?rt.call(Xt,be,ue):rt,ue==null)break e;be=g({},be,ue);break e;case 2:Pa=!0}}ue=N.callback,ue!==null&&(t.flags|=64,fe&&(t.flags|=8192),fe=u.callbacks,fe===null?u.callbacks=[ue]:fe.push(ue))}else fe={lane:ue,tag:N.tag,payload:N.payload,callback:N.callback,next:null},_e===null?(oe=_e=fe,G=be):_e=_e.next=fe,M|=ue;if(N=N.next,N===null){if(N=u.shared.pending,N===null)break;fe=N,N=fe.next,fe.next=null,u.lastBaseUpdate=fe,u.shared.pending=null}}while(!0);_e===null&&(G=be),u.baseState=G,u.firstBaseUpdate=oe,u.lastBaseUpdate=_e,p===null&&(u.shared.lanes=0),Xa|=M,t.lanes=M,t.memoizedState=be}}function Jm(t,i){if(typeof t!="function")throw Error(r(191,t));t.call(i)}function $m(t,i){var s=t.callbacks;if(s!==null)for(t.callbacks=null,t=0;t<s.length;t++)Jm(s[t],i)}var os=Q(null),Zl=Q(0);function eg(t,i){t=ga,ge(Zl,t),ge(os,i),ga=t|i.baseLanes}function xf(){ge(Zl,ga),ge(os,os.current)}function yf(){ga=Zl.current,le(os),le(Zl)}var za=0,mt=null,Vt=null,hn=null,Kl=!1,ls=!1,Tr=!1,Ql=0,Ao=0,cs=null,iS=0;function fn(){throw Error(r(321))}function bf(t,i){if(i===null)return!1;for(var s=0;s<i.length&&s<t.length;s++)if(!$n(t[s],i[s]))return!1;return!0}function Sf(t,i,s,l,u,p){return za=p,mt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,I.H=t===null||t.memoizedState===null?Fg:zg,Tr=!1,p=s(l,u),Tr=!1,ls&&(p=ng(i,s,l,u)),tg(t),p}function tg(t){I.H=ic;var i=Vt!==null&&Vt.next!==null;if(za=0,hn=Vt=mt=null,Kl=!1,Ao=0,cs=null,i)throw Error(r(300));t===null||En||(t=t.dependencies,t!==null&&jl(t)&&(En=!0))}function ng(t,i,s,l){mt=t;var u=0;do{if(ls&&(cs=null),Ao=0,ls=!1,25<=u)throw Error(r(301));if(u+=1,hn=Vt=null,t.updateQueue!=null){var p=t.updateQueue;p.lastEffect=null,p.events=null,p.stores=null,p.memoCache!=null&&(p.memoCache.index=0)}I.H=uS,p=i(s,l)}while(ls);return p}function aS(){var t=I.H,i=t.useState()[0];return i=typeof i.then=="function"?wo(i):i,t=t.useState()[0],(Vt!==null?Vt.memoizedState:null)!==t&&(mt.flags|=1024),i}function Mf(){var t=Ql!==0;return Ql=0,t}function Ef(t,i,s){i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~s}function Tf(t){if(Kl){for(t=t.memoizedState;t!==null;){var i=t.queue;i!==null&&(i.pending=null),t=t.next}Kl=!1}za=0,hn=Vt=mt=null,ls=!1,Ao=Ql=0,cs=null}function Zn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return hn===null?mt.memoizedState=hn=t:hn=hn.next=t,hn}function pn(){if(Vt===null){var t=mt.alternate;t=t!==null?t.memoizedState:null}else t=Vt.next;var i=hn===null?mt.memoizedState:hn.next;if(i!==null)hn=i,Vt=t;else{if(t===null)throw mt.alternate===null?Error(r(467)):Error(r(310));Vt=t,t={memoizedState:Vt.memoizedState,baseState:Vt.baseState,baseQueue:Vt.baseQueue,queue:Vt.queue,next:null},hn===null?mt.memoizedState=hn=t:hn=hn.next=t}return hn}function Af(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function wo(t){var i=Ao;return Ao+=1,cs===null&&(cs=[]),t=Zm(cs,t,i),i=mt,(hn===null?i.memoizedState:hn.next)===null&&(i=i.alternate,I.H=i===null||i.memoizedState===null?Fg:zg),t}function Jl(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return wo(t);if(t.$$typeof===C)return Pn(t)}throw Error(r(438,String(t)))}function wf(t){var i=null,s=mt.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var l=mt.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(i={data:l.data.map(function(u){return u.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=Af(),mt.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(t),l=0;l<t;l++)s[l]=Y;return i.index++,s}function ua(t,i){return typeof i=="function"?i(t):i}function $l(t){var i=pn();return Rf(i,Vt,t)}function Rf(t,i,s){var l=t.queue;if(l===null)throw Error(r(311));l.lastRenderedReducer=s;var u=t.baseQueue,p=l.pending;if(p!==null){if(u!==null){var M=u.next;u.next=p.next,p.next=M}i.baseQueue=u=p,l.pending=null}if(p=t.baseState,u===null)t.memoizedState=p;else{i=u.next;var N=M=null,G=null,oe=i,_e=!1;do{var be=oe.lane&-536870913;if(be!==oe.lane?(Tt&be)===be:(za&be)===be){var ue=oe.revertLane;if(ue===0)G!==null&&(G=G.next={lane:0,revertLane:0,action:oe.action,hasEagerState:oe.hasEagerState,eagerState:oe.eagerState,next:null}),be===rs&&(_e=!0);else if((za&ue)===ue){oe=oe.next,ue===rs&&(_e=!0);continue}else be={lane:0,revertLane:oe.revertLane,action:oe.action,hasEagerState:oe.hasEagerState,eagerState:oe.eagerState,next:null},G===null?(N=G=be,M=p):G=G.next=be,mt.lanes|=ue,Xa|=ue;be=oe.action,Tr&&s(p,be),p=oe.hasEagerState?oe.eagerState:s(p,be)}else ue={lane:be,revertLane:oe.revertLane,action:oe.action,hasEagerState:oe.hasEagerState,eagerState:oe.eagerState,next:null},G===null?(N=G=ue,M=p):G=G.next=ue,mt.lanes|=be,Xa|=be;oe=oe.next}while(oe!==null&&oe!==i);if(G===null?M=p:G.next=N,!$n(p,t.memoizedState)&&(En=!0,_e&&(s=ss,s!==null)))throw s;t.memoizedState=p,t.baseState=M,t.baseQueue=G,l.lastRenderedState=p}return u===null&&(l.lanes=0),[t.memoizedState,l.dispatch]}function Cf(t){var i=pn(),s=i.queue;if(s===null)throw Error(r(311));s.lastRenderedReducer=t;var l=s.dispatch,u=s.pending,p=i.memoizedState;if(u!==null){s.pending=null;var M=u=u.next;do p=t(p,M.action),M=M.next;while(M!==u);$n(p,i.memoizedState)||(En=!0),i.memoizedState=p,i.baseQueue===null&&(i.baseState=p),s.lastRenderedState=p}return[p,l]}function ig(t,i,s){var l=mt,u=pn(),p=It;if(p){if(s===void 0)throw Error(r(407));s=s()}else s=i();var M=!$n((Vt||u).memoizedState,s);M&&(u.memoizedState=s,En=!0),u=u.queue;var N=sg.bind(null,l,u,t);if(Ro(2048,8,N,[t]),u.getSnapshot!==i||M||hn!==null&&hn.memoizedState.tag&1){if(l.flags|=2048,us(9,ec(),rg.bind(null,l,u,s,i),null),Kt===null)throw Error(r(349));p||(za&124)!==0||ag(l,i,s)}return s}function ag(t,i,s){t.flags|=16384,t={getSnapshot:i,value:s},i=mt.updateQueue,i===null?(i=Af(),mt.updateQueue=i,i.stores=[t]):(s=i.stores,s===null?i.stores=[t]:s.push(t))}function rg(t,i,s,l){i.value=s,i.getSnapshot=l,og(i)&&lg(t)}function sg(t,i,s){return s(function(){og(i)&&lg(t)})}function og(t){var i=t.getSnapshot;t=t.value;try{var s=i();return!$n(t,s)}catch{return!0}}function lg(t){var i=ts(t,2);i!==null&&ri(i,t,2)}function Df(t){var i=Zn();if(typeof t=="function"){var s=t;if(t=s(),Tr){pe(!0);try{s()}finally{pe(!1)}}}return i.memoizedState=i.baseState=t,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ua,lastRenderedState:t},i}function cg(t,i,s,l){return t.baseState=s,Rf(t,Vt,typeof l=="function"?l:ua)}function rS(t,i,s,l,u){if(nc(t))throw Error(r(485));if(t=i.action,t!==null){var p={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(M){p.listeners.push(M)}};I.T!==null?s(!0):p.isTransition=!1,l(p),s=i.pending,s===null?(p.next=i.pending=p,ug(i,p)):(p.next=s.next,i.pending=s.next=p)}}function ug(t,i){var s=i.action,l=i.payload,u=t.state;if(i.isTransition){var p=I.T,M={};I.T=M;try{var N=s(u,l),G=I.S;G!==null&&G(M,N),fg(t,i,N)}catch(oe){Nf(t,i,oe)}finally{I.T=p}}else try{p=s(u,l),fg(t,i,p)}catch(oe){Nf(t,i,oe)}}function fg(t,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(l){dg(t,i,l)},function(l){return Nf(t,i,l)}):dg(t,i,s)}function dg(t,i,s){i.status="fulfilled",i.value=s,hg(i),t.state=s,i=t.pending,i!==null&&(s=i.next,s===i?t.pending=null:(s=s.next,i.next=s,ug(t,s)))}function Nf(t,i,s){var l=t.pending;if(t.pending=null,l!==null){l=l.next;do i.status="rejected",i.reason=s,hg(i),i=i.next;while(i!==l)}t.action=null}function hg(t){t=t.listeners;for(var i=0;i<t.length;i++)(0,t[i])()}function pg(t,i){return i}function mg(t,i){if(It){var s=Kt.formState;if(s!==null){e:{var l=mt;if(It){if(rn){t:{for(var u=rn,p=Ii;u.nodeType!==8;){if(!p){u=null;break t}if(u=Ai(u.nextSibling),u===null){u=null;break t}}p=u.data,u=p==="F!"||p==="F"?u:null}if(u){rn=Ai(u.nextSibling),l=u.data==="F!";break e}}br(l)}l=!1}l&&(i=s[0])}}return s=Zn(),s.memoizedState=s.baseState=i,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:pg,lastRenderedState:i},s.queue=l,s=Og.bind(null,mt,l),l.dispatch=s,l=Df(!1),p=If.bind(null,mt,!1,l.queue),l=Zn(),u={state:i,dispatch:null,action:t,pending:null},l.queue=u,s=rS.bind(null,mt,u,p,s),u.dispatch=s,l.memoizedState=t,[i,s,!1]}function gg(t){var i=pn();return vg(i,Vt,t)}function vg(t,i,s){if(i=Rf(t,i,pg)[0],t=$l(ua)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var l=wo(i)}catch(M){throw M===bo?ql:M}else l=i;i=pn();var u=i.queue,p=u.dispatch;return s!==i.memoizedState&&(mt.flags|=2048,us(9,ec(),sS.bind(null,u,s),null)),[l,p,t]}function sS(t,i){t.action=i}function _g(t){var i=pn(),s=Vt;if(s!==null)return vg(i,s,t);pn(),i=i.memoizedState,s=pn();var l=s.queue.dispatch;return s.memoizedState=t,[i,l,!1]}function us(t,i,s,l){return t={tag:t,create:s,deps:l,inst:i,next:null},i=mt.updateQueue,i===null&&(i=Af(),mt.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=t.next=t:(l=s.next,s.next=t,t.next=l,i.lastEffect=t),t}function ec(){return{destroy:void 0,resource:void 0}}function xg(){return pn().memoizedState}function tc(t,i,s,l){var u=Zn();l=l===void 0?null:l,mt.flags|=t,u.memoizedState=us(1|i,ec(),s,l)}function Ro(t,i,s,l){var u=pn();l=l===void 0?null:l;var p=u.memoizedState.inst;Vt!==null&&l!==null&&bf(l,Vt.memoizedState.deps)?u.memoizedState=us(i,p,s,l):(mt.flags|=t,u.memoizedState=us(1|i,p,s,l))}function yg(t,i){tc(8390656,8,t,i)}function bg(t,i){Ro(2048,8,t,i)}function Sg(t,i){return Ro(4,2,t,i)}function Mg(t,i){return Ro(4,4,t,i)}function Eg(t,i){if(typeof i=="function"){t=t();var s=i(t);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return t=t(),i.current=t,function(){i.current=null}}function Tg(t,i,s){s=s!=null?s.concat([t]):null,Ro(4,4,Eg.bind(null,i,t),s)}function Uf(){}function Ag(t,i){var s=pn();i=i===void 0?null:i;var l=s.memoizedState;return i!==null&&bf(i,l[1])?l[0]:(s.memoizedState=[t,i],t)}function wg(t,i){var s=pn();i=i===void 0?null:i;var l=s.memoizedState;if(i!==null&&bf(i,l[1]))return l[0];if(l=t(),Tr){pe(!0);try{t()}finally{pe(!1)}}return s.memoizedState=[l,i],l}function Lf(t,i,s){return s===void 0||(za&1073741824)!==0?t.memoizedState=i:(t.memoizedState=s,t=D0(),mt.lanes|=t,Xa|=t,s)}function Rg(t,i,s,l){return $n(s,i)?s:os.current!==null?(t=Lf(t,s,l),$n(t,i)||(En=!0),t):(za&42)===0?(En=!0,t.memoizedState=s):(t=D0(),mt.lanes|=t,Xa|=t,i)}function Cg(t,i,s,l,u){var p=B.p;B.p=p!==0&&8>p?p:8;var M=I.T,N={};I.T=N,If(t,!1,i,s);try{var G=u(),oe=I.S;if(oe!==null&&oe(N,G),G!==null&&typeof G=="object"&&typeof G.then=="function"){var _e=nS(G,l);Co(t,i,_e,ai(t))}else Co(t,i,l,ai(t))}catch(be){Co(t,i,{then:function(){},status:"rejected",reason:be},ai())}finally{B.p=p,I.T=M}}function oS(){}function Of(t,i,s,l){if(t.tag!==5)throw Error(r(476));var u=Dg(t).queue;Cg(t,u,i,se,s===null?oS:function(){return Ng(t),s(l)})}function Dg(t){var i=t.memoizedState;if(i!==null)return i;i={memoizedState:se,baseState:se,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ua,lastRenderedState:se},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ua,lastRenderedState:s},next:null},t.memoizedState=i,t=t.alternate,t!==null&&(t.memoizedState=i),i}function Ng(t){var i=Dg(t).next.queue;Co(t,i,{},ai())}function Pf(){return Pn(qo)}function Ug(){return pn().memoizedState}function Lg(){return pn().memoizedState}function lS(t){for(var i=t.return;i!==null;){switch(i.tag){case 24:case 3:var s=ai();t=Ia(s);var l=Fa(i,t,s);l!==null&&(ri(l,i,s),Mo(l,i,s)),i={cache:ff()},t.payload=i;return}i=i.return}}function cS(t,i,s){var l=ai();s={lane:l,revertLane:0,action:s,hasEagerState:!1,eagerState:null,next:null},nc(t)?Pg(i,s):(s=ef(t,i,s,l),s!==null&&(ri(s,t,l),Ig(s,i,l)))}function Og(t,i,s){var l=ai();Co(t,i,s,l)}function Co(t,i,s,l){var u={lane:l,revertLane:0,action:s,hasEagerState:!1,eagerState:null,next:null};if(nc(t))Pg(i,u);else{var p=t.alternate;if(t.lanes===0&&(p===null||p.lanes===0)&&(p=i.lastRenderedReducer,p!==null))try{var M=i.lastRenderedState,N=p(M,s);if(u.hasEagerState=!0,u.eagerState=N,$n(N,M))return Bl(t,i,u,0),Kt===null&&zl(),!1}catch{}if(s=ef(t,i,u,l),s!==null)return ri(s,t,l),Ig(s,i,l),!0}return!1}function If(t,i,s,l){if(l={lane:2,revertLane:pd(),action:l,hasEagerState:!1,eagerState:null,next:null},nc(t)){if(i)throw Error(r(479))}else i=ef(t,s,l,2),i!==null&&ri(i,t,2)}function nc(t){var i=t.alternate;return t===mt||i!==null&&i===mt}function Pg(t,i){ls=Kl=!0;var s=t.pending;s===null?i.next=i:(i.next=s.next,s.next=i),t.pending=i}function Ig(t,i,s){if((s&4194048)!==0){var l=i.lanes;l&=t.pendingLanes,s|=l,i.lanes=s,Ve(t,s)}}var ic={readContext:Pn,use:Jl,useCallback:fn,useContext:fn,useEffect:fn,useImperativeHandle:fn,useLayoutEffect:fn,useInsertionEffect:fn,useMemo:fn,useReducer:fn,useRef:fn,useState:fn,useDebugValue:fn,useDeferredValue:fn,useTransition:fn,useSyncExternalStore:fn,useId:fn,useHostTransitionStatus:fn,useFormState:fn,useActionState:fn,useOptimistic:fn,useMemoCache:fn,useCacheRefresh:fn},Fg={readContext:Pn,use:Jl,useCallback:function(t,i){return Zn().memoizedState=[t,i===void 0?null:i],t},useContext:Pn,useEffect:yg,useImperativeHandle:function(t,i,s){s=s!=null?s.concat([t]):null,tc(4194308,4,Eg.bind(null,i,t),s)},useLayoutEffect:function(t,i){return tc(4194308,4,t,i)},useInsertionEffect:function(t,i){tc(4,2,t,i)},useMemo:function(t,i){var s=Zn();i=i===void 0?null:i;var l=t();if(Tr){pe(!0);try{t()}finally{pe(!1)}}return s.memoizedState=[l,i],l},useReducer:function(t,i,s){var l=Zn();if(s!==void 0){var u=s(i);if(Tr){pe(!0);try{s(i)}finally{pe(!1)}}}else u=i;return l.memoizedState=l.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},l.queue=t,t=t.dispatch=cS.bind(null,mt,t),[l.memoizedState,t]},useRef:function(t){var i=Zn();return t={current:t},i.memoizedState=t},useState:function(t){t=Df(t);var i=t.queue,s=Og.bind(null,mt,i);return i.dispatch=s,[t.memoizedState,s]},useDebugValue:Uf,useDeferredValue:function(t,i){var s=Zn();return Lf(s,t,i)},useTransition:function(){var t=Df(!1);return t=Cg.bind(null,mt,t.queue,!0,!1),Zn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,i,s){var l=mt,u=Zn();if(It){if(s===void 0)throw Error(r(407));s=s()}else{if(s=i(),Kt===null)throw Error(r(349));(Tt&124)!==0||ag(l,i,s)}u.memoizedState=s;var p={value:s,getSnapshot:i};return u.queue=p,yg(sg.bind(null,l,p,t),[t]),l.flags|=2048,us(9,ec(),rg.bind(null,l,p,s,i),null),s},useId:function(){var t=Zn(),i=Kt.identifierPrefix;if(It){var s=oa,l=sa;s=(l&~(1<<32-Oe(l)-1)).toString(32)+s,i="«"+i+"R"+s,s=Ql++,0<s&&(i+="H"+s.toString(32)),i+="»"}else s=iS++,i="«"+i+"r"+s.toString(32)+"»";return t.memoizedState=i},useHostTransitionStatus:Pf,useFormState:mg,useActionState:mg,useOptimistic:function(t){var i=Zn();i.memoizedState=i.baseState=t;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=If.bind(null,mt,!0,s),s.dispatch=i,[t,i]},useMemoCache:wf,useCacheRefresh:function(){return Zn().memoizedState=lS.bind(null,mt)}},zg={readContext:Pn,use:Jl,useCallback:Ag,useContext:Pn,useEffect:bg,useImperativeHandle:Tg,useInsertionEffect:Sg,useLayoutEffect:Mg,useMemo:wg,useReducer:$l,useRef:xg,useState:function(){return $l(ua)},useDebugValue:Uf,useDeferredValue:function(t,i){var s=pn();return Rg(s,Vt.memoizedState,t,i)},useTransition:function(){var t=$l(ua)[0],i=pn().memoizedState;return[typeof t=="boolean"?t:wo(t),i]},useSyncExternalStore:ig,useId:Ug,useHostTransitionStatus:Pf,useFormState:gg,useActionState:gg,useOptimistic:function(t,i){var s=pn();return cg(s,Vt,t,i)},useMemoCache:wf,useCacheRefresh:Lg},uS={readContext:Pn,use:Jl,useCallback:Ag,useContext:Pn,useEffect:bg,useImperativeHandle:Tg,useInsertionEffect:Sg,useLayoutEffect:Mg,useMemo:wg,useReducer:Cf,useRef:xg,useState:function(){return Cf(ua)},useDebugValue:Uf,useDeferredValue:function(t,i){var s=pn();return Vt===null?Lf(s,t,i):Rg(s,Vt.memoizedState,t,i)},useTransition:function(){var t=Cf(ua)[0],i=pn().memoizedState;return[typeof t=="boolean"?t:wo(t),i]},useSyncExternalStore:ig,useId:Ug,useHostTransitionStatus:Pf,useFormState:_g,useActionState:_g,useOptimistic:function(t,i){var s=pn();return Vt!==null?cg(s,Vt,t,i):(s.baseState=t,[t,s.queue.dispatch])},useMemoCache:wf,useCacheRefresh:Lg},fs=null,Do=0;function ac(t){var i=Do;return Do+=1,fs===null&&(fs=[]),Zm(fs,t,i)}function No(t,i){i=i.props.ref,t.ref=i!==void 0?i:null}function rc(t,i){throw i.$$typeof===b?Error(r(525)):(t=Object.prototype.toString.call(i),Error(r(31,t==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":t)))}function Bg(t){var i=t._init;return i(t._payload)}function Hg(t){function i(ne,W){if(t){var ae=ne.deletions;ae===null?(ne.deletions=[W],ne.flags|=16):ae.push(W)}}function s(ne,W){if(!t)return null;for(;W!==null;)i(ne,W),W=W.sibling;return null}function l(ne){for(var W=new Map;ne!==null;)ne.key!==null?W.set(ne.key,ne):W.set(ne.index,ne),ne=ne.sibling;return W}function u(ne,W){return ne=ra(ne,W),ne.index=0,ne.sibling=null,ne}function p(ne,W,ae){return ne.index=ae,t?(ae=ne.alternate,ae!==null?(ae=ae.index,ae<W?(ne.flags|=67108866,W):ae):(ne.flags|=67108866,W)):(ne.flags|=1048576,W)}function M(ne){return t&&ne.alternate===null&&(ne.flags|=67108866),ne}function N(ne,W,ae,ye){return W===null||W.tag!==6?(W=nf(ae,ne.mode,ye),W.return=ne,W):(W=u(W,ae),W.return=ne,W)}function G(ne,W,ae,ye){var Xe=ae.type;return Xe===S?_e(ne,W,ae.props.children,ye,ae.key):W!==null&&(W.elementType===Xe||typeof Xe=="object"&&Xe!==null&&Xe.$$typeof===E&&Bg(Xe)===W.type)?(W=u(W,ae.props),No(W,ae),W.return=ne,W):(W=kl(ae.type,ae.key,ae.props,null,ne.mode,ye),No(W,ae),W.return=ne,W)}function oe(ne,W,ae,ye){return W===null||W.tag!==4||W.stateNode.containerInfo!==ae.containerInfo||W.stateNode.implementation!==ae.implementation?(W=af(ae,ne.mode,ye),W.return=ne,W):(W=u(W,ae.children||[]),W.return=ne,W)}function _e(ne,W,ae,ye,Xe){return W===null||W.tag!==7?(W=vr(ae,ne.mode,ye,Xe),W.return=ne,W):(W=u(W,ae),W.return=ne,W)}function be(ne,W,ae){if(typeof W=="string"&&W!==""||typeof W=="number"||typeof W=="bigint")return W=nf(""+W,ne.mode,ae),W.return=ne,W;if(typeof W=="object"&&W!==null){switch(W.$$typeof){case _:return ae=kl(W.type,W.key,W.props,null,ne.mode,ae),No(ae,W),ae.return=ne,ae;case y:return W=af(W,ne.mode,ae),W.return=ne,W;case E:var ye=W._init;return W=ye(W._payload),be(ne,W,ae)}if(V(W)||X(W))return W=vr(W,ne.mode,ae,null),W.return=ne,W;if(typeof W.then=="function")return be(ne,ac(W),ae);if(W.$$typeof===C)return be(ne,Xl(ne,W),ae);rc(ne,W)}return null}function ue(ne,W,ae,ye){var Xe=W!==null?W.key:null;if(typeof ae=="string"&&ae!==""||typeof ae=="number"||typeof ae=="bigint")return Xe!==null?null:N(ne,W,""+ae,ye);if(typeof ae=="object"&&ae!==null){switch(ae.$$typeof){case _:return ae.key===Xe?G(ne,W,ae,ye):null;case y:return ae.key===Xe?oe(ne,W,ae,ye):null;case E:return Xe=ae._init,ae=Xe(ae._payload),ue(ne,W,ae,ye)}if(V(ae)||X(ae))return Xe!==null?null:_e(ne,W,ae,ye,null);if(typeof ae.then=="function")return ue(ne,W,ac(ae),ye);if(ae.$$typeof===C)return ue(ne,W,Xl(ne,ae),ye);rc(ne,ae)}return null}function fe(ne,W,ae,ye,Xe){if(typeof ye=="string"&&ye!==""||typeof ye=="number"||typeof ye=="bigint")return ne=ne.get(ae)||null,N(W,ne,""+ye,Xe);if(typeof ye=="object"&&ye!==null){switch(ye.$$typeof){case _:return ne=ne.get(ye.key===null?ae:ye.key)||null,G(W,ne,ye,Xe);case y:return ne=ne.get(ye.key===null?ae:ye.key)||null,oe(W,ne,ye,Xe);case E:var xt=ye._init;return ye=xt(ye._payload),fe(ne,W,ae,ye,Xe)}if(V(ye)||X(ye))return ne=ne.get(ae)||null,_e(W,ne,ye,Xe,null);if(typeof ye.then=="function")return fe(ne,W,ae,ac(ye),Xe);if(ye.$$typeof===C)return fe(ne,W,ae,Xl(W,ye),Xe);rc(W,ye)}return null}function rt(ne,W,ae,ye){for(var Xe=null,xt=null,Qe=W,it=W=0,An=null;Qe!==null&&it<ae.length;it++){Qe.index>it?(An=Qe,Qe=null):An=Qe.sibling;var Nt=ue(ne,Qe,ae[it],ye);if(Nt===null){Qe===null&&(Qe=An);break}t&&Qe&&Nt.alternate===null&&i(ne,Qe),W=p(Nt,W,it),xt===null?Xe=Nt:xt.sibling=Nt,xt=Nt,Qe=An}if(it===ae.length)return s(ne,Qe),It&&xr(ne,it),Xe;if(Qe===null){for(;it<ae.length;it++)Qe=be(ne,ae[it],ye),Qe!==null&&(W=p(Qe,W,it),xt===null?Xe=Qe:xt.sibling=Qe,xt=Qe);return It&&xr(ne,it),Xe}for(Qe=l(Qe);it<ae.length;it++)An=fe(Qe,ne,it,ae[it],ye),An!==null&&(t&&An.alternate!==null&&Qe.delete(An.key===null?it:An.key),W=p(An,W,it),xt===null?Xe=An:xt.sibling=An,xt=An);return t&&Qe.forEach(function(er){return i(ne,er)}),It&&xr(ne,it),Xe}function tt(ne,W,ae,ye){if(ae==null)throw Error(r(151));for(var Xe=null,xt=null,Qe=W,it=W=0,An=null,Nt=ae.next();Qe!==null&&!Nt.done;it++,Nt=ae.next()){Qe.index>it?(An=Qe,Qe=null):An=Qe.sibling;var er=ue(ne,Qe,Nt.value,ye);if(er===null){Qe===null&&(Qe=An);break}t&&Qe&&er.alternate===null&&i(ne,Qe),W=p(er,W,it),xt===null?Xe=er:xt.sibling=er,xt=er,Qe=An}if(Nt.done)return s(ne,Qe),It&&xr(ne,it),Xe;if(Qe===null){for(;!Nt.done;it++,Nt=ae.next())Nt=be(ne,Nt.value,ye),Nt!==null&&(W=p(Nt,W,it),xt===null?Xe=Nt:xt.sibling=Nt,xt=Nt);return It&&xr(ne,it),Xe}for(Qe=l(Qe);!Nt.done;it++,Nt=ae.next())Nt=fe(Qe,ne,it,Nt.value,ye),Nt!==null&&(t&&Nt.alternate!==null&&Qe.delete(Nt.key===null?it:Nt.key),W=p(Nt,W,it),xt===null?Xe=Nt:xt.sibling=Nt,xt=Nt);return t&&Qe.forEach(function(fM){return i(ne,fM)}),It&&xr(ne,it),Xe}function Xt(ne,W,ae,ye){if(typeof ae=="object"&&ae!==null&&ae.type===S&&ae.key===null&&(ae=ae.props.children),typeof ae=="object"&&ae!==null){switch(ae.$$typeof){case _:e:{for(var Xe=ae.key;W!==null;){if(W.key===Xe){if(Xe=ae.type,Xe===S){if(W.tag===7){s(ne,W.sibling),ye=u(W,ae.props.children),ye.return=ne,ne=ye;break e}}else if(W.elementType===Xe||typeof Xe=="object"&&Xe!==null&&Xe.$$typeof===E&&Bg(Xe)===W.type){s(ne,W.sibling),ye=u(W,ae.props),No(ye,ae),ye.return=ne,ne=ye;break e}s(ne,W);break}else i(ne,W);W=W.sibling}ae.type===S?(ye=vr(ae.props.children,ne.mode,ye,ae.key),ye.return=ne,ne=ye):(ye=kl(ae.type,ae.key,ae.props,null,ne.mode,ye),No(ye,ae),ye.return=ne,ne=ye)}return M(ne);case y:e:{for(Xe=ae.key;W!==null;){if(W.key===Xe)if(W.tag===4&&W.stateNode.containerInfo===ae.containerInfo&&W.stateNode.implementation===ae.implementation){s(ne,W.sibling),ye=u(W,ae.children||[]),ye.return=ne,ne=ye;break e}else{s(ne,W);break}else i(ne,W);W=W.sibling}ye=af(ae,ne.mode,ye),ye.return=ne,ne=ye}return M(ne);case E:return Xe=ae._init,ae=Xe(ae._payload),Xt(ne,W,ae,ye)}if(V(ae))return rt(ne,W,ae,ye);if(X(ae)){if(Xe=X(ae),typeof Xe!="function")throw Error(r(150));return ae=Xe.call(ae),tt(ne,W,ae,ye)}if(typeof ae.then=="function")return Xt(ne,W,ac(ae),ye);if(ae.$$typeof===C)return Xt(ne,W,Xl(ne,ae),ye);rc(ne,ae)}return typeof ae=="string"&&ae!==""||typeof ae=="number"||typeof ae=="bigint"?(ae=""+ae,W!==null&&W.tag===6?(s(ne,W.sibling),ye=u(W,ae),ye.return=ne,ne=ye):(s(ne,W),ye=nf(ae,ne.mode,ye),ye.return=ne,ne=ye),M(ne)):s(ne,W)}return function(ne,W,ae,ye){try{Do=0;var Xe=Xt(ne,W,ae,ye);return fs=null,Xe}catch(Qe){if(Qe===bo||Qe===ql)throw Qe;var xt=ei(29,Qe,null,ne.mode);return xt.lanes=ye,xt.return=ne,xt}}}var ds=Hg(!0),kg=Hg(!1),mi=Q(null),Fi=null;function Ba(t){var i=t.alternate;ge(_n,_n.current&1),ge(mi,t),Fi===null&&(i===null||os.current!==null||i.memoizedState!==null)&&(Fi=t)}function Gg(t){if(t.tag===22){if(ge(_n,_n.current),ge(mi,t),Fi===null){var i=t.alternate;i!==null&&i.memoizedState!==null&&(Fi=t)}}else Ha()}function Ha(){ge(_n,_n.current),ge(mi,mi.current)}function fa(t){le(mi),Fi===t&&(Fi=null),le(_n)}var _n=Q(0);function sc(t){for(var i=t;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||s.data==="$?"||Ad(s)))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}function Ff(t,i,s,l){i=t.memoizedState,s=s(l,i),s=s==null?i:g({},i,s),t.memoizedState=s,t.lanes===0&&(t.updateQueue.baseState=s)}var zf={enqueueSetState:function(t,i,s){t=t._reactInternals;var l=ai(),u=Ia(l);u.payload=i,s!=null&&(u.callback=s),i=Fa(t,u,l),i!==null&&(ri(i,t,l),Mo(i,t,l))},enqueueReplaceState:function(t,i,s){t=t._reactInternals;var l=ai(),u=Ia(l);u.tag=1,u.payload=i,s!=null&&(u.callback=s),i=Fa(t,u,l),i!==null&&(ri(i,t,l),Mo(i,t,l))},enqueueForceUpdate:function(t,i){t=t._reactInternals;var s=ai(),l=Ia(s);l.tag=2,i!=null&&(l.callback=i),i=Fa(t,l,s),i!==null&&(ri(i,t,s),Mo(i,t,s))}};function Vg(t,i,s,l,u,p,M){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,p,M):i.prototype&&i.prototype.isPureReactComponent?!ho(s,l)||!ho(u,p):!0}function jg(t,i,s,l){t=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,l),i.state!==t&&zf.enqueueReplaceState(i,i.state,null)}function Ar(t,i){var s=i;if("ref"in i){s={};for(var l in i)l!=="ref"&&(s[l]=i[l])}if(t=t.defaultProps){s===i&&(s=g({},s));for(var u in t)s[u]===void 0&&(s[u]=t[u])}return s}var oc=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)};function Xg(t){oc(t)}function Wg(t){console.error(t)}function qg(t){oc(t)}function lc(t,i){try{var s=t.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(l){setTimeout(function(){throw l})}}function Yg(t,i,s){try{var l=t.onCaughtError;l(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Bf(t,i,s){return s=Ia(s),s.tag=3,s.payload={element:null},s.callback=function(){lc(t,i)},s}function Zg(t){return t=Ia(t),t.tag=3,t}function Kg(t,i,s,l){var u=s.type.getDerivedStateFromError;if(typeof u=="function"){var p=l.value;t.payload=function(){return u(p)},t.callback=function(){Yg(i,s,l)}}var M=s.stateNode;M!==null&&typeof M.componentDidCatch=="function"&&(t.callback=function(){Yg(i,s,l),typeof u!="function"&&(Wa===null?Wa=new Set([this]):Wa.add(this));var N=l.stack;this.componentDidCatch(l.value,{componentStack:N!==null?N:""})})}function fS(t,i,s,l,u){if(s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(i=s.alternate,i!==null&&_o(i,s,u,!0),s=mi.current,s!==null){switch(s.tag){case 13:return Fi===null?cd():s.alternate===null&&sn===0&&(sn=3),s.flags&=-257,s.flags|=65536,s.lanes=u,l===pf?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([l]):i.add(l),fd(t,l,u)),!1;case 22:return s.flags|=65536,l===pf?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([l])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([l]):s.add(l)),fd(t,l,u)),!1}throw Error(r(435,s.tag))}return fd(t,l,u),cd(),!1}if(It)return i=mi.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=u,l!==of&&(t=Error(r(422),{cause:l}),vo(fi(t,s)))):(l!==of&&(i=Error(r(423),{cause:l}),vo(fi(i,s))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,l=fi(l,s),u=Bf(t.stateNode,l,u),vf(t,u),sn!==4&&(sn=2)),!1;var p=Error(r(520),{cause:l});if(p=fi(p,s),zo===null?zo=[p]:zo.push(p),sn!==4&&(sn=2),i===null)return!0;l=fi(l,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,t=u&-u,s.lanes|=t,t=Bf(s.stateNode,l,t),vf(s,t),!1;case 1:if(i=s.type,p=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(Wa===null||!Wa.has(p))))return s.flags|=65536,u&=-u,s.lanes|=u,u=Zg(u),Kg(u,t,s,l),vf(s,u),!1}s=s.return}while(s!==null);return!1}var Qg=Error(r(461)),En=!1;function Dn(t,i,s,l){i.child=t===null?kg(i,null,s,l):ds(i,t.child,s,l)}function Jg(t,i,s,l,u){s=s.render;var p=i.ref;if("ref"in l){var M={};for(var N in l)N!=="ref"&&(M[N]=l[N])}else M=l;return Mr(i),l=Sf(t,i,s,M,p,u),N=Mf(),t!==null&&!En?(Ef(t,i,u),da(t,i,u)):(It&&N&&rf(i),i.flags|=1,Dn(t,i,l,u),i.child)}function $g(t,i,s,l,u){if(t===null){var p=s.type;return typeof p=="function"&&!tf(p)&&p.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=p,e0(t,i,p,l,u)):(t=kl(s.type,null,l,i,i.mode,u),t.ref=i.ref,t.return=i,i.child=t)}if(p=t.child,!qf(t,u)){var M=p.memoizedProps;if(s=s.compare,s=s!==null?s:ho,s(M,l)&&t.ref===i.ref)return da(t,i,u)}return i.flags|=1,t=ra(p,l),t.ref=i.ref,t.return=i,i.child=t}function e0(t,i,s,l,u){if(t!==null){var p=t.memoizedProps;if(ho(p,l)&&t.ref===i.ref)if(En=!1,i.pendingProps=l=p,qf(t,u))(t.flags&131072)!==0&&(En=!0);else return i.lanes=t.lanes,da(t,i,u)}return Hf(t,i,s,l,u)}function t0(t,i,s){var l=i.pendingProps,u=l.children,p=t!==null?t.memoizedState:null;if(l.mode==="hidden"){if((i.flags&128)!==0){if(l=p!==null?p.baseLanes|s:s,t!==null){for(u=i.child=t.child,p=0;u!==null;)p=p|u.lanes|u.childLanes,u=u.sibling;i.childLanes=p&~l}else i.childLanes=0,i.child=null;return n0(t,i,l,s)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},t!==null&&Wl(i,p!==null?p.cachePool:null),p!==null?eg(i,p):xf(),Gg(i);else return i.lanes=i.childLanes=536870912,n0(t,i,p!==null?p.baseLanes|s:s,s)}else p!==null?(Wl(i,p.cachePool),eg(i,p),Ha(),i.memoizedState=null):(t!==null&&Wl(i,null),xf(),Ha());return Dn(t,i,u,s),i.child}function n0(t,i,s,l){var u=hf();return u=u===null?null:{parent:vn._currentValue,pool:u},i.memoizedState={baseLanes:s,cachePool:u},t!==null&&Wl(i,null),xf(),Gg(i),t!==null&&_o(t,i,l,!0),null}function cc(t,i){var s=i.ref;if(s===null)t!==null&&t.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(r(284));(t===null||t.ref!==s)&&(i.flags|=4194816)}}function Hf(t,i,s,l,u){return Mr(i),s=Sf(t,i,s,l,void 0,u),l=Mf(),t!==null&&!En?(Ef(t,i,u),da(t,i,u)):(It&&l&&rf(i),i.flags|=1,Dn(t,i,s,u),i.child)}function i0(t,i,s,l,u,p){return Mr(i),i.updateQueue=null,s=ng(i,l,s,u),tg(t),l=Mf(),t!==null&&!En?(Ef(t,i,p),da(t,i,p)):(It&&l&&rf(i),i.flags|=1,Dn(t,i,s,p),i.child)}function a0(t,i,s,l,u){if(Mr(i),i.stateNode===null){var p=ns,M=s.contextType;typeof M=="object"&&M!==null&&(p=Pn(M)),p=new s(l,p),i.memoizedState=p.state!==null&&p.state!==void 0?p.state:null,p.updater=zf,i.stateNode=p,p._reactInternals=i,p=i.stateNode,p.props=l,p.state=i.memoizedState,p.refs={},mf(i),M=s.contextType,p.context=typeof M=="object"&&M!==null?Pn(M):ns,p.state=i.memoizedState,M=s.getDerivedStateFromProps,typeof M=="function"&&(Ff(i,s,M,l),p.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof p.getSnapshotBeforeUpdate=="function"||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(M=p.state,typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount(),M!==p.state&&zf.enqueueReplaceState(p,p.state,null),To(i,l,p,u),Eo(),p.state=i.memoizedState),typeof p.componentDidMount=="function"&&(i.flags|=4194308),l=!0}else if(t===null){p=i.stateNode;var N=i.memoizedProps,G=Ar(s,N);p.props=G;var oe=p.context,_e=s.contextType;M=ns,typeof _e=="object"&&_e!==null&&(M=Pn(_e));var be=s.getDerivedStateFromProps;_e=typeof be=="function"||typeof p.getSnapshotBeforeUpdate=="function",N=i.pendingProps!==N,_e||typeof p.UNSAFE_componentWillReceiveProps!="function"&&typeof p.componentWillReceiveProps!="function"||(N||oe!==M)&&jg(i,p,l,M),Pa=!1;var ue=i.memoizedState;p.state=ue,To(i,l,p,u),Eo(),oe=i.memoizedState,N||ue!==oe||Pa?(typeof be=="function"&&(Ff(i,s,be,l),oe=i.memoizedState),(G=Pa||Vg(i,s,G,l,ue,oe,M))?(_e||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount()),typeof p.componentDidMount=="function"&&(i.flags|=4194308)):(typeof p.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=oe),p.props=l,p.state=oe,p.context=M,l=G):(typeof p.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{p=i.stateNode,gf(t,i),M=i.memoizedProps,_e=Ar(s,M),p.props=_e,be=i.pendingProps,ue=p.context,oe=s.contextType,G=ns,typeof oe=="object"&&oe!==null&&(G=Pn(oe)),N=s.getDerivedStateFromProps,(oe=typeof N=="function"||typeof p.getSnapshotBeforeUpdate=="function")||typeof p.UNSAFE_componentWillReceiveProps!="function"&&typeof p.componentWillReceiveProps!="function"||(M!==be||ue!==G)&&jg(i,p,l,G),Pa=!1,ue=i.memoizedState,p.state=ue,To(i,l,p,u),Eo();var fe=i.memoizedState;M!==be||ue!==fe||Pa||t!==null&&t.dependencies!==null&&jl(t.dependencies)?(typeof N=="function"&&(Ff(i,s,N,l),fe=i.memoizedState),(_e=Pa||Vg(i,s,_e,l,ue,fe,G)||t!==null&&t.dependencies!==null&&jl(t.dependencies))?(oe||typeof p.UNSAFE_componentWillUpdate!="function"&&typeof p.componentWillUpdate!="function"||(typeof p.componentWillUpdate=="function"&&p.componentWillUpdate(l,fe,G),typeof p.UNSAFE_componentWillUpdate=="function"&&p.UNSAFE_componentWillUpdate(l,fe,G)),typeof p.componentDidUpdate=="function"&&(i.flags|=4),typeof p.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof p.componentDidUpdate!="function"||M===t.memoizedProps&&ue===t.memoizedState||(i.flags|=4),typeof p.getSnapshotBeforeUpdate!="function"||M===t.memoizedProps&&ue===t.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=fe),p.props=l,p.state=fe,p.context=G,l=_e):(typeof p.componentDidUpdate!="function"||M===t.memoizedProps&&ue===t.memoizedState||(i.flags|=4),typeof p.getSnapshotBeforeUpdate!="function"||M===t.memoizedProps&&ue===t.memoizedState||(i.flags|=1024),l=!1)}return p=l,cc(t,i),l=(i.flags&128)!==0,p||l?(p=i.stateNode,s=l&&typeof s.getDerivedStateFromError!="function"?null:p.render(),i.flags|=1,t!==null&&l?(i.child=ds(i,t.child,null,u),i.child=ds(i,null,s,u)):Dn(t,i,s,u),i.memoizedState=p.state,t=i.child):t=da(t,i,u),t}function r0(t,i,s,l){return go(),i.flags|=256,Dn(t,i,s,l),i.child}var kf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Gf(t){return{baseLanes:t,cachePool:Wm()}}function Vf(t,i,s){return t=t!==null?t.childLanes&~s:0,i&&(t|=gi),t}function s0(t,i,s){var l=i.pendingProps,u=!1,p=(i.flags&128)!==0,M;if((M=p)||(M=t!==null&&t.memoizedState===null?!1:(_n.current&2)!==0),M&&(u=!0,i.flags&=-129),M=(i.flags&32)!==0,i.flags&=-33,t===null){if(It){if(u?Ba(i):Ha(),It){var N=rn,G;if(G=N){e:{for(G=N,N=Ii;G.nodeType!==8;){if(!N){N=null;break e}if(G=Ai(G.nextSibling),G===null){N=null;break e}}N=G}N!==null?(i.memoizedState={dehydrated:N,treeContext:_r!==null?{id:sa,overflow:oa}:null,retryLane:536870912,hydrationErrors:null},G=ei(18,null,null,0),G.stateNode=N,G.return=i,i.child=G,Hn=i,rn=null,G=!0):G=!1}G||br(i)}if(N=i.memoizedState,N!==null&&(N=N.dehydrated,N!==null))return Ad(N)?i.lanes=32:i.lanes=536870912,null;fa(i)}return N=l.children,l=l.fallback,u?(Ha(),u=i.mode,N=uc({mode:"hidden",children:N},u),l=vr(l,u,s,null),N.return=i,l.return=i,N.sibling=l,i.child=N,u=i.child,u.memoizedState=Gf(s),u.childLanes=Vf(t,M,s),i.memoizedState=kf,l):(Ba(i),jf(i,N))}if(G=t.memoizedState,G!==null&&(N=G.dehydrated,N!==null)){if(p)i.flags&256?(Ba(i),i.flags&=-257,i=Xf(t,i,s)):i.memoizedState!==null?(Ha(),i.child=t.child,i.flags|=128,i=null):(Ha(),u=l.fallback,N=i.mode,l=uc({mode:"visible",children:l.children},N),u=vr(u,N,s,null),u.flags|=2,l.return=i,u.return=i,l.sibling=u,i.child=l,ds(i,t.child,null,s),l=i.child,l.memoizedState=Gf(s),l.childLanes=Vf(t,M,s),i.memoizedState=kf,i=u);else if(Ba(i),Ad(N)){if(M=N.nextSibling&&N.nextSibling.dataset,M)var oe=M.dgst;M=oe,l=Error(r(419)),l.stack="",l.digest=M,vo({value:l,source:null,stack:null}),i=Xf(t,i,s)}else if(En||_o(t,i,s,!1),M=(s&t.childLanes)!==0,En||M){if(M=Kt,M!==null&&(l=s&-s,l=(l&42)!==0?1:at(l),l=(l&(M.suspendedLanes|s))!==0?0:l,l!==0&&l!==G.retryLane))throw G.retryLane=l,ts(t,l),ri(M,t,l),Qg;N.data==="$?"||cd(),i=Xf(t,i,s)}else N.data==="$?"?(i.flags|=192,i.child=t.child,i=null):(t=G.treeContext,rn=Ai(N.nextSibling),Hn=i,It=!0,yr=null,Ii=!1,t!==null&&(hi[pi++]=sa,hi[pi++]=oa,hi[pi++]=_r,sa=t.id,oa=t.overflow,_r=i),i=jf(i,l.children),i.flags|=4096);return i}return u?(Ha(),u=l.fallback,N=i.mode,G=t.child,oe=G.sibling,l=ra(G,{mode:"hidden",children:l.children}),l.subtreeFlags=G.subtreeFlags&65011712,oe!==null?u=ra(oe,u):(u=vr(u,N,s,null),u.flags|=2),u.return=i,l.return=i,l.sibling=u,i.child=l,l=u,u=i.child,N=t.child.memoizedState,N===null?N=Gf(s):(G=N.cachePool,G!==null?(oe=vn._currentValue,G=G.parent!==oe?{parent:oe,pool:oe}:G):G=Wm(),N={baseLanes:N.baseLanes|s,cachePool:G}),u.memoizedState=N,u.childLanes=Vf(t,M,s),i.memoizedState=kf,l):(Ba(i),s=t.child,t=s.sibling,s=ra(s,{mode:"visible",children:l.children}),s.return=i,s.sibling=null,t!==null&&(M=i.deletions,M===null?(i.deletions=[t],i.flags|=16):M.push(t)),i.child=s,i.memoizedState=null,s)}function jf(t,i){return i=uc({mode:"visible",children:i},t.mode),i.return=t,t.child=i}function uc(t,i){return t=ei(22,t,null,i),t.lanes=0,t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},t}function Xf(t,i,s){return ds(i,t.child,null,s),t=jf(i,i.pendingProps.children),t.flags|=2,i.memoizedState=null,t}function o0(t,i,s){t.lanes|=i;var l=t.alternate;l!==null&&(l.lanes|=i),cf(t.return,i,s)}function Wf(t,i,s,l,u){var p=t.memoizedState;p===null?t.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:s,tailMode:u}:(p.isBackwards=i,p.rendering=null,p.renderingStartTime=0,p.last=l,p.tail=s,p.tailMode=u)}function l0(t,i,s){var l=i.pendingProps,u=l.revealOrder,p=l.tail;if(Dn(t,i,l.children,s),l=_n.current,(l&2)!==0)l=l&1|2,i.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=i.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&o0(t,s,i);else if(t.tag===19)o0(t,s,i);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===i)break e;for(;t.sibling===null;){if(t.return===null||t.return===i)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}l&=1}switch(ge(_n,l),u){case"forwards":for(s=i.child,u=null;s!==null;)t=s.alternate,t!==null&&sc(t)===null&&(u=s),s=s.sibling;s=u,s===null?(u=i.child,i.child=null):(u=s.sibling,s.sibling=null),Wf(i,!1,u,s,p);break;case"backwards":for(s=null,u=i.child,i.child=null;u!==null;){if(t=u.alternate,t!==null&&sc(t)===null){i.child=u;break}t=u.sibling,u.sibling=s,s=u,u=t}Wf(i,!0,s,null,p);break;case"together":Wf(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function da(t,i,s){if(t!==null&&(i.dependencies=t.dependencies),Xa|=i.lanes,(s&i.childLanes)===0)if(t!==null){if(_o(t,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(t!==null&&i.child!==t.child)throw Error(r(153));if(i.child!==null){for(t=i.child,s=ra(t,t.pendingProps),i.child=s,s.return=i;t.sibling!==null;)t=t.sibling,s=s.sibling=ra(t,t.pendingProps),s.return=i;s.sibling=null}return i.child}function qf(t,i){return(t.lanes&i)!==0?!0:(t=t.dependencies,!!(t!==null&&jl(t)))}function dS(t,i,s){switch(i.tag){case 3:Se(i,i.stateNode.containerInfo),Oa(i,vn,t.memoizedState.cache),go();break;case 27:case 5:Je(i);break;case 4:Se(i,i.stateNode.containerInfo);break;case 10:Oa(i,i.type,i.memoizedProps.value);break;case 13:var l=i.memoizedState;if(l!==null)return l.dehydrated!==null?(Ba(i),i.flags|=128,null):(s&i.child.childLanes)!==0?s0(t,i,s):(Ba(i),t=da(t,i,s),t!==null?t.sibling:null);Ba(i);break;case 19:var u=(t.flags&128)!==0;if(l=(s&i.childLanes)!==0,l||(_o(t,i,s,!1),l=(s&i.childLanes)!==0),u){if(l)return l0(t,i,s);i.flags|=128}if(u=i.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),ge(_n,_n.current),l)break;return null;case 22:case 23:return i.lanes=0,t0(t,i,s);case 24:Oa(i,vn,t.memoizedState.cache)}return da(t,i,s)}function c0(t,i,s){if(t!==null)if(t.memoizedProps!==i.pendingProps)En=!0;else{if(!qf(t,s)&&(i.flags&128)===0)return En=!1,dS(t,i,s);En=(t.flags&131072)!==0}else En=!1,It&&(i.flags&1048576)!==0&&Bm(i,Vl,i.index);switch(i.lanes=0,i.tag){case 16:e:{t=i.pendingProps;var l=i.elementType,u=l._init;if(l=u(l._payload),i.type=l,typeof l=="function")tf(l)?(t=Ar(l,t),i.tag=1,i=a0(null,i,l,t,s)):(i.tag=0,i=Hf(null,i,l,t,s));else{if(l!=null){if(u=l.$$typeof,u===R){i.tag=11,i=Jg(null,i,l,t,s);break e}else if(u===F){i.tag=14,i=$g(null,i,l,t,s);break e}}throw i=K(l)||l,Error(r(306,i,""))}}return i;case 0:return Hf(t,i,i.type,i.pendingProps,s);case 1:return l=i.type,u=Ar(l,i.pendingProps),a0(t,i,l,u,s);case 3:e:{if(Se(i,i.stateNode.containerInfo),t===null)throw Error(r(387));l=i.pendingProps;var p=i.memoizedState;u=p.element,gf(t,i),To(i,l,null,s);var M=i.memoizedState;if(l=M.cache,Oa(i,vn,l),l!==p.cache&&uf(i,[vn],s,!0),Eo(),l=M.element,p.isDehydrated)if(p={element:l,isDehydrated:!1,cache:M.cache},i.updateQueue.baseState=p,i.memoizedState=p,i.flags&256){i=r0(t,i,l,s);break e}else if(l!==u){u=fi(Error(r(424)),i),vo(u),i=r0(t,i,l,s);break e}else for(t=i.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,rn=Ai(t.firstChild),Hn=i,It=!0,yr=null,Ii=!0,s=kg(i,null,l,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling;else{if(go(),l===u){i=da(t,i,s);break e}Dn(t,i,l,s)}i=i.child}return i;case 26:return cc(t,i),t===null?(s=hv(i.type,null,i.pendingProps,null))?i.memoizedState=s:It||(s=i.type,t=i.pendingProps,l=Ec(ee.current).createElement(s),l[gn]=i,l[Mn]=t,Un(l,s,t),ln(l),i.stateNode=l):i.memoizedState=hv(i.type,t.memoizedProps,i.pendingProps,t.memoizedState),null;case 27:return Je(i),t===null&&It&&(l=i.stateNode=uv(i.type,i.pendingProps,ee.current),Hn=i,Ii=!0,u=rn,Za(i.type)?(wd=u,rn=Ai(l.firstChild)):rn=u),Dn(t,i,i.pendingProps.children,s),cc(t,i),t===null&&(i.flags|=4194304),i.child;case 5:return t===null&&It&&((u=l=rn)&&(l=HS(l,i.type,i.pendingProps,Ii),l!==null?(i.stateNode=l,Hn=i,rn=Ai(l.firstChild),Ii=!1,u=!0):u=!1),u||br(i)),Je(i),u=i.type,p=i.pendingProps,M=t!==null?t.memoizedProps:null,l=p.children,Md(u,p)?l=null:M!==null&&Md(u,M)&&(i.flags|=32),i.memoizedState!==null&&(u=Sf(t,i,aS,null,null,s),qo._currentValue=u),cc(t,i),Dn(t,i,l,s),i.child;case 6:return t===null&&It&&((t=s=rn)&&(s=kS(s,i.pendingProps,Ii),s!==null?(i.stateNode=s,Hn=i,rn=null,t=!0):t=!1),t||br(i)),null;case 13:return s0(t,i,s);case 4:return Se(i,i.stateNode.containerInfo),l=i.pendingProps,t===null?i.child=ds(i,null,l,s):Dn(t,i,l,s),i.child;case 11:return Jg(t,i,i.type,i.pendingProps,s);case 7:return Dn(t,i,i.pendingProps,s),i.child;case 8:return Dn(t,i,i.pendingProps.children,s),i.child;case 12:return Dn(t,i,i.pendingProps.children,s),i.child;case 10:return l=i.pendingProps,Oa(i,i.type,l.value),Dn(t,i,l.children,s),i.child;case 9:return u=i.type._context,l=i.pendingProps.children,Mr(i),u=Pn(u),l=l(u),i.flags|=1,Dn(t,i,l,s),i.child;case 14:return $g(t,i,i.type,i.pendingProps,s);case 15:return e0(t,i,i.type,i.pendingProps,s);case 19:return l0(t,i,s);case 31:return l=i.pendingProps,s=i.mode,l={mode:l.mode,children:l.children},t===null?(s=uc(l,s),s.ref=i.ref,i.child=s,s.return=i,i=s):(s=ra(t.child,l),s.ref=i.ref,i.child=s,s.return=i,i=s),i;case 22:return t0(t,i,s);case 24:return Mr(i),l=Pn(vn),t===null?(u=hf(),u===null&&(u=Kt,p=ff(),u.pooledCache=p,p.refCount++,p!==null&&(u.pooledCacheLanes|=s),u=p),i.memoizedState={parent:l,cache:u},mf(i),Oa(i,vn,u)):((t.lanes&s)!==0&&(gf(t,i),To(i,null,null,s),Eo()),u=t.memoizedState,p=i.memoizedState,u.parent!==l?(u={parent:l,cache:l},i.memoizedState=u,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=u),Oa(i,vn,l)):(l=p.cache,Oa(i,vn,l),l!==u.cache&&uf(i,[vn],s,!0))),Dn(t,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(r(156,i.tag))}function ha(t){t.flags|=4}function u0(t,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!_v(i)){if(i=mi.current,i!==null&&((Tt&4194048)===Tt?Fi!==null:(Tt&62914560)!==Tt&&(Tt&536870912)===0||i!==Fi))throw So=pf,qm;t.flags|=8192}}function fc(t,i){i!==null&&(t.flags|=4),t.flags&16384&&(i=t.tag!==22?Ce():536870912,t.lanes|=i,gs|=i)}function Uo(t,i){if(!It)switch(t.tailMode){case"hidden":i=t.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?t.tail=null:s.sibling=null;break;case"collapsed":s=t.tail;for(var l=null;s!==null;)s.alternate!==null&&(l=s),s=s.sibling;l===null?i||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function an(t){var i=t.alternate!==null&&t.alternate.child===t.child,s=0,l=0;if(i)for(var u=t.child;u!==null;)s|=u.lanes|u.childLanes,l|=u.subtreeFlags&65011712,l|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)s|=u.lanes|u.childLanes,l|=u.subtreeFlags,l|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=l,t.childLanes=s,i}function hS(t,i,s){var l=i.pendingProps;switch(sf(i),i.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return an(i),null;case 1:return an(i),null;case 3:return s=i.stateNode,l=null,t!==null&&(l=t.memoizedState.cache),i.memoizedState.cache!==l&&(i.flags|=2048),ca(vn),ze(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(t===null||t.child===null)&&(mo(i)?ha(i):t===null||t.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,Gm())),an(i),null;case 26:return s=i.memoizedState,t===null?(ha(i),s!==null?(an(i),u0(i,s)):(an(i),i.flags&=-16777217)):s?s!==t.memoizedState?(ha(i),an(i),u0(i,s)):(an(i),i.flags&=-16777217):(t.memoizedProps!==l&&ha(i),an(i),i.flags&=-16777217),null;case 27:et(i),s=ee.current;var u=i.type;if(t!==null&&i.stateNode!=null)t.memoizedProps!==l&&ha(i);else{if(!l){if(i.stateNode===null)throw Error(r(166));return an(i),null}t=we.current,mo(i)?Hm(i):(t=uv(u,l,s),i.stateNode=t,ha(i))}return an(i),null;case 5:if(et(i),s=i.type,t!==null&&i.stateNode!=null)t.memoizedProps!==l&&ha(i);else{if(!l){if(i.stateNode===null)throw Error(r(166));return an(i),null}if(t=we.current,mo(i))Hm(i);else{switch(u=Ec(ee.current),t){case 1:t=u.createElementNS("http://www.w3.org/2000/svg",s);break;case 2:t=u.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;default:switch(s){case"svg":t=u.createElementNS("http://www.w3.org/2000/svg",s);break;case"math":t=u.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;case"script":t=u.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild);break;case"select":t=typeof l.is=="string"?u.createElement("select",{is:l.is}):u.createElement("select"),l.multiple?t.multiple=!0:l.size&&(t.size=l.size);break;default:t=typeof l.is=="string"?u.createElement(s,{is:l.is}):u.createElement(s)}}t[gn]=i,t[Mn]=l;e:for(u=i.child;u!==null;){if(u.tag===5||u.tag===6)t.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===i)break e;for(;u.sibling===null;){if(u.return===null||u.return===i)break e;u=u.return}u.sibling.return=u.return,u=u.sibling}i.stateNode=t;e:switch(Un(t,s,l),s){case"button":case"input":case"select":case"textarea":t=!!l.autoFocus;break e;case"img":t=!0;break e;default:t=!1}t&&ha(i)}}return an(i),i.flags&=-16777217,null;case 6:if(t&&i.stateNode!=null)t.memoizedProps!==l&&ha(i);else{if(typeof l!="string"&&i.stateNode===null)throw Error(r(166));if(t=ee.current,mo(i)){if(t=i.stateNode,s=i.memoizedProps,l=null,u=Hn,u!==null)switch(u.tag){case 27:case 5:l=u.memoizedProps}t[gn]=i,t=!!(t.nodeValue===s||l!==null&&l.suppressHydrationWarning===!0||iv(t.nodeValue,s)),t||br(i)}else t=Ec(t).createTextNode(l),t[gn]=i,i.stateNode=t}return an(i),null;case 13:if(l=i.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=mo(i),l!==null&&l.dehydrated!==null){if(t===null){if(!u)throw Error(r(318));if(u=i.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(r(317));u[gn]=i}else go(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;an(i),u=!1}else u=Gm(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return i.flags&256?(fa(i),i):(fa(i),null)}if(fa(i),(i.flags&128)!==0)return i.lanes=s,i;if(s=l!==null,t=t!==null&&t.memoizedState!==null,s){l=i.child,u=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(u=l.alternate.memoizedState.cachePool.pool);var p=null;l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(p=l.memoizedState.cachePool.pool),p!==u&&(l.flags|=2048)}return s!==t&&s&&(i.child.flags|=8192),fc(i,i.updateQueue),an(i),null;case 4:return ze(),t===null&&_d(i.stateNode.containerInfo),an(i),null;case 10:return ca(i.type),an(i),null;case 19:if(le(_n),u=i.memoizedState,u===null)return an(i),null;if(l=(i.flags&128)!==0,p=u.rendering,p===null)if(l)Uo(u,!1);else{if(sn!==0||t!==null&&(t.flags&128)!==0)for(t=i.child;t!==null;){if(p=sc(t),p!==null){for(i.flags|=128,Uo(u,!1),t=p.updateQueue,i.updateQueue=t,fc(i,t),i.subtreeFlags=0,t=s,s=i.child;s!==null;)zm(s,t),s=s.sibling;return ge(_n,_n.current&1|2),i.child}t=t.sibling}u.tail!==null&&Ct()>pc&&(i.flags|=128,l=!0,Uo(u,!1),i.lanes=4194304)}else{if(!l)if(t=sc(p),t!==null){if(i.flags|=128,l=!0,t=t.updateQueue,i.updateQueue=t,fc(i,t),Uo(u,!0),u.tail===null&&u.tailMode==="hidden"&&!p.alternate&&!It)return an(i),null}else 2*Ct()-u.renderingStartTime>pc&&s!==536870912&&(i.flags|=128,l=!0,Uo(u,!1),i.lanes=4194304);u.isBackwards?(p.sibling=i.child,i.child=p):(t=u.last,t!==null?t.sibling=p:i.child=p,u.last=p)}return u.tail!==null?(i=u.tail,u.rendering=i,u.tail=i.sibling,u.renderingStartTime=Ct(),i.sibling=null,t=_n.current,ge(_n,l?t&1|2:t&1),i):(an(i),null);case 22:case 23:return fa(i),yf(),l=i.memoizedState!==null,t!==null?t.memoizedState!==null!==l&&(i.flags|=8192):l&&(i.flags|=8192),l?(s&536870912)!==0&&(i.flags&128)===0&&(an(i),i.subtreeFlags&6&&(i.flags|=8192)):an(i),s=i.updateQueue,s!==null&&fc(i,s.retryQueue),s=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(s=t.memoizedState.cachePool.pool),l=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(l=i.memoizedState.cachePool.pool),l!==s&&(i.flags|=2048),t!==null&&le(Er),null;case 24:return s=null,t!==null&&(s=t.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),ca(vn),an(i),null;case 25:return null;case 30:return null}throw Error(r(156,i.tag))}function pS(t,i){switch(sf(i),i.tag){case 1:return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 3:return ca(vn),ze(),t=i.flags,(t&65536)!==0&&(t&128)===0?(i.flags=t&-65537|128,i):null;case 26:case 27:case 5:return et(i),null;case 13:if(fa(i),t=i.memoizedState,t!==null&&t.dehydrated!==null){if(i.alternate===null)throw Error(r(340));go()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 19:return le(_n),null;case 4:return ze(),null;case 10:return ca(i.type),null;case 22:case 23:return fa(i),yf(),t!==null&&le(Er),t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 24:return ca(vn),null;case 25:return null;default:return null}}function f0(t,i){switch(sf(i),i.tag){case 3:ca(vn),ze();break;case 26:case 27:case 5:et(i);break;case 4:ze();break;case 13:fa(i);break;case 19:le(_n);break;case 10:ca(i.type);break;case 22:case 23:fa(i),yf(),t!==null&&le(Er);break;case 24:ca(vn)}}function Lo(t,i){try{var s=i.updateQueue,l=s!==null?s.lastEffect:null;if(l!==null){var u=l.next;s=u;do{if((s.tag&t)===t){l=void 0;var p=s.create,M=s.inst;l=p(),M.destroy=l}s=s.next}while(s!==u)}}catch(N){Yt(i,i.return,N)}}function ka(t,i,s){try{var l=i.updateQueue,u=l!==null?l.lastEffect:null;if(u!==null){var p=u.next;l=p;do{if((l.tag&t)===t){var M=l.inst,N=M.destroy;if(N!==void 0){M.destroy=void 0,u=i;var G=s,oe=N;try{oe()}catch(_e){Yt(u,G,_e)}}}l=l.next}while(l!==p)}}catch(_e){Yt(i,i.return,_e)}}function d0(t){var i=t.updateQueue;if(i!==null){var s=t.stateNode;try{$m(i,s)}catch(l){Yt(t,t.return,l)}}}function h0(t,i,s){s.props=Ar(t.type,t.memoizedProps),s.state=t.memoizedState;try{s.componentWillUnmount()}catch(l){Yt(t,i,l)}}function Oo(t,i){try{var s=t.ref;if(s!==null){switch(t.tag){case 26:case 27:case 5:var l=t.stateNode;break;case 30:l=t.stateNode;break;default:l=t.stateNode}typeof s=="function"?t.refCleanup=s(l):s.current=l}}catch(u){Yt(t,i,u)}}function zi(t,i){var s=t.ref,l=t.refCleanup;if(s!==null)if(typeof l=="function")try{l()}catch(u){Yt(t,i,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(u){Yt(t,i,u)}else s.current=null}function p0(t){var i=t.type,s=t.memoizedProps,l=t.stateNode;try{e:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&l.focus();break e;case"img":s.src?l.src=s.src:s.srcSet&&(l.srcset=s.srcSet)}}catch(u){Yt(t,t.return,u)}}function Yf(t,i,s){try{var l=t.stateNode;PS(l,t.type,s,i),l[Mn]=i}catch(u){Yt(t,t.return,u)}}function m0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Za(t.type)||t.tag===4}function Zf(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||m0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Za(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Kf(t,i,s){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(t,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(t),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=Mc));else if(l!==4&&(l===27&&Za(t.type)&&(s=t.stateNode,i=null),t=t.child,t!==null))for(Kf(t,i,s),t=t.sibling;t!==null;)Kf(t,i,s),t=t.sibling}function dc(t,i,s){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?s.insertBefore(t,i):s.appendChild(t);else if(l!==4&&(l===27&&Za(t.type)&&(s=t.stateNode),t=t.child,t!==null))for(dc(t,i,s),t=t.sibling;t!==null;)dc(t,i,s),t=t.sibling}function g0(t){var i=t.stateNode,s=t.memoizedProps;try{for(var l=t.type,u=i.attributes;u.length;)i.removeAttributeNode(u[0]);Un(i,l,s),i[gn]=t,i[Mn]=s}catch(p){Yt(t,t.return,p)}}var pa=!1,dn=!1,Qf=!1,v0=typeof WeakSet=="function"?WeakSet:Set,Tn=null;function mS(t,i){if(t=t.containerInfo,bd=Dc,t=Rm(t),Yu(t)){if("selectionStart"in t)var s={start:t.selectionStart,end:t.selectionEnd};else e:{s=(s=t.ownerDocument)&&s.defaultView||window;var l=s.getSelection&&s.getSelection();if(l&&l.rangeCount!==0){s=l.anchorNode;var u=l.anchorOffset,p=l.focusNode;l=l.focusOffset;try{s.nodeType,p.nodeType}catch{s=null;break e}var M=0,N=-1,G=-1,oe=0,_e=0,be=t,ue=null;t:for(;;){for(var fe;be!==s||u!==0&&be.nodeType!==3||(N=M+u),be!==p||l!==0&&be.nodeType!==3||(G=M+l),be.nodeType===3&&(M+=be.nodeValue.length),(fe=be.firstChild)!==null;)ue=be,be=fe;for(;;){if(be===t)break t;if(ue===s&&++oe===u&&(N=M),ue===p&&++_e===l&&(G=M),(fe=be.nextSibling)!==null)break;be=ue,ue=be.parentNode}be=fe}s=N===-1||G===-1?null:{start:N,end:G}}else s=null}s=s||{start:0,end:0}}else s=null;for(Sd={focusedElem:t,selectionRange:s},Dc=!1,Tn=i;Tn!==null;)if(i=Tn,t=i.child,(i.subtreeFlags&1024)!==0&&t!==null)t.return=i,Tn=t;else for(;Tn!==null;){switch(i=Tn,p=i.alternate,t=i.flags,i.tag){case 0:break;case 11:case 15:break;case 1:if((t&1024)!==0&&p!==null){t=void 0,s=i,u=p.memoizedProps,p=p.memoizedState,l=s.stateNode;try{var rt=Ar(s.type,u,s.elementType===s.type);t=l.getSnapshotBeforeUpdate(rt,p),l.__reactInternalSnapshotBeforeUpdate=t}catch(tt){Yt(s,s.return,tt)}}break;case 3:if((t&1024)!==0){if(t=i.stateNode.containerInfo,s=t.nodeType,s===9)Td(t);else if(s===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Td(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(r(163))}if(t=i.sibling,t!==null){t.return=i.return,Tn=t;break}Tn=i.return}}function _0(t,i,s){var l=s.flags;switch(s.tag){case 0:case 11:case 15:Ga(t,s),l&4&&Lo(5,s);break;case 1:if(Ga(t,s),l&4)if(t=s.stateNode,i===null)try{t.componentDidMount()}catch(M){Yt(s,s.return,M)}else{var u=Ar(s.type,i.memoizedProps);i=i.memoizedState;try{t.componentDidUpdate(u,i,t.__reactInternalSnapshotBeforeUpdate)}catch(M){Yt(s,s.return,M)}}l&64&&d0(s),l&512&&Oo(s,s.return);break;case 3:if(Ga(t,s),l&64&&(t=s.updateQueue,t!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{$m(t,i)}catch(M){Yt(s,s.return,M)}}break;case 27:i===null&&l&4&&g0(s);case 26:case 5:Ga(t,s),i===null&&l&4&&p0(s),l&512&&Oo(s,s.return);break;case 12:Ga(t,s);break;case 13:Ga(t,s),l&4&&b0(t,s),l&64&&(t=s.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(s=ES.bind(null,s),GS(t,s))));break;case 22:if(l=s.memoizedState!==null||pa,!l){i=i!==null&&i.memoizedState!==null||dn,u=pa;var p=dn;pa=l,(dn=i)&&!p?Va(t,s,(s.subtreeFlags&8772)!==0):Ga(t,s),pa=u,dn=p}break;case 30:break;default:Ga(t,s)}}function x0(t){var i=t.alternate;i!==null&&(t.alternate=null,x0(i)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(i=t.stateNode,i!==null&&Yr(i)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var $t=null,Kn=!1;function ma(t,i,s){for(s=s.child;s!==null;)y0(t,i,s),s=s.sibling}function y0(t,i,s){if(xe&&typeof xe.onCommitFiberUnmount=="function")try{xe.onCommitFiberUnmount(ve,s)}catch{}switch(s.tag){case 26:dn||zi(s,i),ma(t,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:dn||zi(s,i);var l=$t,u=Kn;Za(s.type)&&($t=s.stateNode,Kn=!1),ma(t,i,s),Vo(s.stateNode),$t=l,Kn=u;break;case 5:dn||zi(s,i);case 6:if(l=$t,u=Kn,$t=null,ma(t,i,s),$t=l,Kn=u,$t!==null)if(Kn)try{($t.nodeType===9?$t.body:$t.nodeName==="HTML"?$t.ownerDocument.body:$t).removeChild(s.stateNode)}catch(p){Yt(s,i,p)}else try{$t.removeChild(s.stateNode)}catch(p){Yt(s,i,p)}break;case 18:$t!==null&&(Kn?(t=$t,lv(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,s.stateNode),Qo(t)):lv($t,s.stateNode));break;case 4:l=$t,u=Kn,$t=s.stateNode.containerInfo,Kn=!0,ma(t,i,s),$t=l,Kn=u;break;case 0:case 11:case 14:case 15:dn||ka(2,s,i),dn||ka(4,s,i),ma(t,i,s);break;case 1:dn||(zi(s,i),l=s.stateNode,typeof l.componentWillUnmount=="function"&&h0(s,i,l)),ma(t,i,s);break;case 21:ma(t,i,s);break;case 22:dn=(l=dn)||s.memoizedState!==null,ma(t,i,s),dn=l;break;default:ma(t,i,s)}}function b0(t,i){if(i.memoizedState===null&&(t=i.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Qo(t)}catch(s){Yt(i,i.return,s)}}function gS(t){switch(t.tag){case 13:case 19:var i=t.stateNode;return i===null&&(i=t.stateNode=new v0),i;case 22:return t=t.stateNode,i=t._retryCache,i===null&&(i=t._retryCache=new v0),i;default:throw Error(r(435,t.tag))}}function Jf(t,i){var s=gS(t);i.forEach(function(l){var u=TS.bind(null,t,l);s.has(l)||(s.add(l),l.then(u,u))})}function ti(t,i){var s=i.deletions;if(s!==null)for(var l=0;l<s.length;l++){var u=s[l],p=t,M=i,N=M;e:for(;N!==null;){switch(N.tag){case 27:if(Za(N.type)){$t=N.stateNode,Kn=!1;break e}break;case 5:$t=N.stateNode,Kn=!1;break e;case 3:case 4:$t=N.stateNode.containerInfo,Kn=!0;break e}N=N.return}if($t===null)throw Error(r(160));y0(p,M,u),$t=null,Kn=!1,p=u.alternate,p!==null&&(p.return=null),u.return=null}if(i.subtreeFlags&13878)for(i=i.child;i!==null;)S0(i,t),i=i.sibling}var Ti=null;function S0(t,i){var s=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:ti(i,t),ni(t),l&4&&(ka(3,t,t.return),Lo(3,t),ka(5,t,t.return));break;case 1:ti(i,t),ni(t),l&512&&(dn||s===null||zi(s,s.return)),l&64&&pa&&(t=t.updateQueue,t!==null&&(l=t.callbacks,l!==null&&(s=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=s===null?l:s.concat(l))));break;case 26:var u=Ti;if(ti(i,t),ni(t),l&512&&(dn||s===null||zi(s,s.return)),l&4){var p=s!==null?s.memoizedState:null;if(l=t.memoizedState,s===null)if(l===null)if(t.stateNode===null){e:{l=t.type,s=t.memoizedProps,u=u.ownerDocument||u;t:switch(l){case"title":p=u.getElementsByTagName("title")[0],(!p||p[Na]||p[gn]||p.namespaceURI==="http://www.w3.org/2000/svg"||p.hasAttribute("itemprop"))&&(p=u.createElement(l),u.head.insertBefore(p,u.querySelector("head > title"))),Un(p,l,s),p[gn]=t,ln(p),l=p;break e;case"link":var M=gv("link","href",u).get(l+(s.href||""));if(M){for(var N=0;N<M.length;N++)if(p=M[N],p.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&p.getAttribute("rel")===(s.rel==null?null:s.rel)&&p.getAttribute("title")===(s.title==null?null:s.title)&&p.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){M.splice(N,1);break t}}p=u.createElement(l),Un(p,l,s),u.head.appendChild(p);break;case"meta":if(M=gv("meta","content",u).get(l+(s.content||""))){for(N=0;N<M.length;N++)if(p=M[N],p.getAttribute("content")===(s.content==null?null:""+s.content)&&p.getAttribute("name")===(s.name==null?null:s.name)&&p.getAttribute("property")===(s.property==null?null:s.property)&&p.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&p.getAttribute("charset")===(s.charSet==null?null:s.charSet)){M.splice(N,1);break t}}p=u.createElement(l),Un(p,l,s),u.head.appendChild(p);break;default:throw Error(r(468,l))}p[gn]=t,ln(p),l=p}t.stateNode=l}else vv(u,t.type,t.stateNode);else t.stateNode=mv(u,l,t.memoizedProps);else p!==l?(p===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):p.count--,l===null?vv(u,t.type,t.stateNode):mv(u,l,t.memoizedProps)):l===null&&t.stateNode!==null&&Yf(t,t.memoizedProps,s.memoizedProps)}break;case 27:ti(i,t),ni(t),l&512&&(dn||s===null||zi(s,s.return)),s!==null&&l&4&&Yf(t,t.memoizedProps,s.memoizedProps);break;case 5:if(ti(i,t),ni(t),l&512&&(dn||s===null||zi(s,s.return)),t.flags&32){u=t.stateNode;try{Jt(u,"")}catch(fe){Yt(t,t.return,fe)}}l&4&&t.stateNode!=null&&(u=t.memoizedProps,Yf(t,u,s!==null?s.memoizedProps:u)),l&1024&&(Qf=!0);break;case 6:if(ti(i,t),ni(t),l&4){if(t.stateNode===null)throw Error(r(162));l=t.memoizedProps,s=t.stateNode;try{s.nodeValue=l}catch(fe){Yt(t,t.return,fe)}}break;case 3:if(wc=null,u=Ti,Ti=Tc(i.containerInfo),ti(i,t),Ti=u,ni(t),l&4&&s!==null&&s.memoizedState.isDehydrated)try{Qo(i.containerInfo)}catch(fe){Yt(t,t.return,fe)}Qf&&(Qf=!1,M0(t));break;case 4:l=Ti,Ti=Tc(t.stateNode.containerInfo),ti(i,t),ni(t),Ti=l;break;case 12:ti(i,t),ni(t);break;case 13:ti(i,t),ni(t),t.child.flags&8192&&t.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(ad=Ct()),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Jf(t,l)));break;case 22:u=t.memoizedState!==null;var G=s!==null&&s.memoizedState!==null,oe=pa,_e=dn;if(pa=oe||u,dn=_e||G,ti(i,t),dn=_e,pa=oe,ni(t),l&8192)e:for(i=t.stateNode,i._visibility=u?i._visibility&-2:i._visibility|1,u&&(s===null||G||pa||dn||wr(t)),s=null,i=t;;){if(i.tag===5||i.tag===26){if(s===null){G=s=i;try{if(p=G.stateNode,u)M=p.style,typeof M.setProperty=="function"?M.setProperty("display","none","important"):M.display="none";else{N=G.stateNode;var be=G.memoizedProps.style,ue=be!=null&&be.hasOwnProperty("display")?be.display:null;N.style.display=ue==null||typeof ue=="boolean"?"":(""+ue).trim()}}catch(fe){Yt(G,G.return,fe)}}}else if(i.tag===6){if(s===null){G=i;try{G.stateNode.nodeValue=u?"":G.memoizedProps}catch(fe){Yt(G,G.return,fe)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===t)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break e;for(;i.sibling===null;){if(i.return===null||i.return===t)break e;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}l&4&&(l=t.updateQueue,l!==null&&(s=l.retryQueue,s!==null&&(l.retryQueue=null,Jf(t,s))));break;case 19:ti(i,t),ni(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Jf(t,l)));break;case 30:break;case 21:break;default:ti(i,t),ni(t)}}function ni(t){var i=t.flags;if(i&2){try{for(var s,l=t.return;l!==null;){if(m0(l)){s=l;break}l=l.return}if(s==null)throw Error(r(160));switch(s.tag){case 27:var u=s.stateNode,p=Zf(t);dc(t,p,u);break;case 5:var M=s.stateNode;s.flags&32&&(Jt(M,""),s.flags&=-33);var N=Zf(t);dc(t,N,M);break;case 3:case 4:var G=s.stateNode.containerInfo,oe=Zf(t);Kf(t,oe,G);break;default:throw Error(r(161))}}catch(_e){Yt(t,t.return,_e)}t.flags&=-3}i&4096&&(t.flags&=-4097)}function M0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var i=t;M0(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),t=t.sibling}}function Ga(t,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)_0(t,i.alternate,i),i=i.sibling}function wr(t){for(t=t.child;t!==null;){var i=t;switch(i.tag){case 0:case 11:case 14:case 15:ka(4,i,i.return),wr(i);break;case 1:zi(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&h0(i,i.return,s),wr(i);break;case 27:Vo(i.stateNode);case 26:case 5:zi(i,i.return),wr(i);break;case 22:i.memoizedState===null&&wr(i);break;case 30:wr(i);break;default:wr(i)}t=t.sibling}}function Va(t,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var l=i.alternate,u=t,p=i,M=p.flags;switch(p.tag){case 0:case 11:case 15:Va(u,p,s),Lo(4,p);break;case 1:if(Va(u,p,s),l=p,u=l.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(oe){Yt(l,l.return,oe)}if(l=p,u=l.updateQueue,u!==null){var N=l.stateNode;try{var G=u.shared.hiddenCallbacks;if(G!==null)for(u.shared.hiddenCallbacks=null,u=0;u<G.length;u++)Jm(G[u],N)}catch(oe){Yt(l,l.return,oe)}}s&&M&64&&d0(p),Oo(p,p.return);break;case 27:g0(p);case 26:case 5:Va(u,p,s),s&&l===null&&M&4&&p0(p),Oo(p,p.return);break;case 12:Va(u,p,s);break;case 13:Va(u,p,s),s&&M&4&&b0(u,p);break;case 22:p.memoizedState===null&&Va(u,p,s),Oo(p,p.return);break;case 30:break;default:Va(u,p,s)}i=i.sibling}}function $f(t,i){var s=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(s=t.memoizedState.cachePool.pool),t=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(t=i.memoizedState.cachePool.pool),t!==s&&(t!=null&&t.refCount++,s!=null&&xo(s))}function ed(t,i){t=null,i.alternate!==null&&(t=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==t&&(i.refCount++,t!=null&&xo(t))}function Bi(t,i,s,l){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)E0(t,i,s,l),i=i.sibling}function E0(t,i,s,l){var u=i.flags;switch(i.tag){case 0:case 11:case 15:Bi(t,i,s,l),u&2048&&Lo(9,i);break;case 1:Bi(t,i,s,l);break;case 3:Bi(t,i,s,l),u&2048&&(t=null,i.alternate!==null&&(t=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==t&&(i.refCount++,t!=null&&xo(t)));break;case 12:if(u&2048){Bi(t,i,s,l),t=i.stateNode;try{var p=i.memoizedProps,M=p.id,N=p.onPostCommit;typeof N=="function"&&N(M,i.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(G){Yt(i,i.return,G)}}else Bi(t,i,s,l);break;case 13:Bi(t,i,s,l);break;case 23:break;case 22:p=i.stateNode,M=i.alternate,i.memoizedState!==null?p._visibility&2?Bi(t,i,s,l):Po(t,i):p._visibility&2?Bi(t,i,s,l):(p._visibility|=2,hs(t,i,s,l,(i.subtreeFlags&10256)!==0)),u&2048&&$f(M,i);break;case 24:Bi(t,i,s,l),u&2048&&ed(i.alternate,i);break;default:Bi(t,i,s,l)}}function hs(t,i,s,l,u){for(u=u&&(i.subtreeFlags&10256)!==0,i=i.child;i!==null;){var p=t,M=i,N=s,G=l,oe=M.flags;switch(M.tag){case 0:case 11:case 15:hs(p,M,N,G,u),Lo(8,M);break;case 23:break;case 22:var _e=M.stateNode;M.memoizedState!==null?_e._visibility&2?hs(p,M,N,G,u):Po(p,M):(_e._visibility|=2,hs(p,M,N,G,u)),u&&oe&2048&&$f(M.alternate,M);break;case 24:hs(p,M,N,G,u),u&&oe&2048&&ed(M.alternate,M);break;default:hs(p,M,N,G,u)}i=i.sibling}}function Po(t,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=t,l=i,u=l.flags;switch(l.tag){case 22:Po(s,l),u&2048&&$f(l.alternate,l);break;case 24:Po(s,l),u&2048&&ed(l.alternate,l);break;default:Po(s,l)}i=i.sibling}}var Io=8192;function ps(t){if(t.subtreeFlags&Io)for(t=t.child;t!==null;)T0(t),t=t.sibling}function T0(t){switch(t.tag){case 26:ps(t),t.flags&Io&&t.memoizedState!==null&&tM(Ti,t.memoizedState,t.memoizedProps);break;case 5:ps(t);break;case 3:case 4:var i=Ti;Ti=Tc(t.stateNode.containerInfo),ps(t),Ti=i;break;case 22:t.memoizedState===null&&(i=t.alternate,i!==null&&i.memoizedState!==null?(i=Io,Io=16777216,ps(t),Io=i):ps(t));break;default:ps(t)}}function A0(t){var i=t.alternate;if(i!==null&&(t=i.child,t!==null)){i.child=null;do i=t.sibling,t.sibling=null,t=i;while(t!==null)}}function Fo(t){var i=t.deletions;if((t.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];Tn=l,R0(l,t)}A0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)w0(t),t=t.sibling}function w0(t){switch(t.tag){case 0:case 11:case 15:Fo(t),t.flags&2048&&ka(9,t,t.return);break;case 3:Fo(t);break;case 12:Fo(t);break;case 22:var i=t.stateNode;t.memoizedState!==null&&i._visibility&2&&(t.return===null||t.return.tag!==13)?(i._visibility&=-3,hc(t)):Fo(t);break;default:Fo(t)}}function hc(t){var i=t.deletions;if((t.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];Tn=l,R0(l,t)}A0(t)}for(t=t.child;t!==null;){switch(i=t,i.tag){case 0:case 11:case 15:ka(8,i,i.return),hc(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,hc(i));break;default:hc(i)}t=t.sibling}}function R0(t,i){for(;Tn!==null;){var s=Tn;switch(s.tag){case 0:case 11:case 15:ka(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var l=s.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:xo(s.memoizedState.cache)}if(l=s.child,l!==null)l.return=s,Tn=l;else e:for(s=t;Tn!==null;){l=Tn;var u=l.sibling,p=l.return;if(x0(l),l===s){Tn=null;break e}if(u!==null){u.return=p,Tn=u;break e}Tn=p}}}var vS={getCacheForType:function(t){var i=Pn(vn),s=i.data.get(t);return s===void 0&&(s=t(),i.data.set(t,s)),s}},_S=typeof WeakMap=="function"?WeakMap:Map,Ht=0,Kt=null,bt=null,Tt=0,kt=0,ii=null,ja=!1,ms=!1,td=!1,ga=0,sn=0,Xa=0,Rr=0,nd=0,gi=0,gs=0,zo=null,Qn=null,id=!1,ad=0,pc=1/0,mc=null,Wa=null,Nn=0,qa=null,vs=null,_s=0,rd=0,sd=null,C0=null,Bo=0,od=null;function ai(){if((Ht&2)!==0&&Tt!==0)return Tt&-Tt;if(I.T!==null){var t=rs;return t!==0?t:pd()}return Dt()}function D0(){gi===0&&(gi=(Tt&536870912)===0||It?Z():536870912);var t=mi.current;return t!==null&&(t.flags|=32),gi}function ri(t,i,s){(t===Kt&&(kt===2||kt===9)||t.cancelPendingCommit!==null)&&(xs(t,0),Ya(t,Tt,gi,!1)),Fe(t,s),((Ht&2)===0||t!==Kt)&&(t===Kt&&((Ht&2)===0&&(Rr|=s),sn===4&&Ya(t,Tt,gi,!1)),Hi(t))}function N0(t,i,s){if((Ht&6)!==0)throw Error(r(327));var l=!s&&(i&124)===0&&(i&t.expiredLanes)===0||Ie(t,i),u=l?bS(t,i):ud(t,i,!0),p=l;do{if(u===0){ms&&!l&&Ya(t,i,0,!1);break}else{if(s=t.current.alternate,p&&!xS(s)){u=ud(t,i,!1),p=!1;continue}if(u===2){if(p=i,t.errorRecoveryDisabledLanes&p)var M=0;else M=t.pendingLanes&-536870913,M=M!==0?M:M&536870912?536870912:0;if(M!==0){i=M;e:{var N=t;u=zo;var G=N.current.memoizedState.isDehydrated;if(G&&(xs(N,M).flags|=256),M=ud(N,M,!1),M!==2){if(td&&!G){N.errorRecoveryDisabledLanes|=p,Rr|=p,u=4;break e}p=Qn,Qn=u,p!==null&&(Qn===null?Qn=p:Qn.push.apply(Qn,p))}u=M}if(p=!1,u!==2)continue}}if(u===1){xs(t,0),Ya(t,i,0,!0);break}e:{switch(l=t,p=u,p){case 0:case 1:throw Error(r(345));case 4:if((i&4194048)!==i)break;case 6:Ya(l,i,gi,!ja);break e;case 2:Qn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((i&62914560)===i&&(u=ad+300-Ct(),10<u)){if(Ya(l,i,gi,!ja),Ge(l,0,!0)!==0)break e;l.timeoutHandle=sv(U0.bind(null,l,s,Qn,mc,id,i,gi,Rr,gs,ja,p,2,-0,0),u);break e}U0(l,s,Qn,mc,id,i,gi,Rr,gs,ja,p,0,-0,0)}}break}while(!0);Hi(t)}function U0(t,i,s,l,u,p,M,N,G,oe,_e,be,ue,fe){if(t.timeoutHandle=-1,be=i.subtreeFlags,(be&8192||(be&16785408)===16785408)&&(Wo={stylesheets:null,count:0,unsuspend:eM},T0(i),be=nM(),be!==null)){t.cancelPendingCommit=be(B0.bind(null,t,i,p,s,l,u,M,N,G,_e,1,ue,fe)),Ya(t,p,M,!oe);return}B0(t,i,p,s,l,u,M,N,G)}function xS(t){for(var i=t;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var l=0;l<s.length;l++){var u=s[l],p=u.getSnapshot;u=u.value;try{if(!$n(p(),u))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function Ya(t,i,s,l){i&=~nd,i&=~Rr,t.suspendedLanes|=i,t.pingedLanes&=~i,l&&(t.warmLanes|=i),l=t.expirationTimes;for(var u=i;0<u;){var p=31-Oe(u),M=1<<p;l[p]=-1,u&=~M}s!==0&&me(t,s,i)}function gc(){return(Ht&6)===0?(Ho(0),!1):!0}function ld(){if(bt!==null){if(kt===0)var t=bt.return;else t=bt,la=Sr=null,Tf(t),fs=null,Do=0,t=bt;for(;t!==null;)f0(t.alternate,t),t=t.return;bt=null}}function xs(t,i){var s=t.timeoutHandle;s!==-1&&(t.timeoutHandle=-1,FS(s)),s=t.cancelPendingCommit,s!==null&&(t.cancelPendingCommit=null,s()),ld(),Kt=t,bt=s=ra(t.current,null),Tt=i,kt=0,ii=null,ja=!1,ms=Ie(t,i),td=!1,gs=gi=nd=Rr=Xa=sn=0,Qn=zo=null,id=!1,(i&8)!==0&&(i|=i&32);var l=t.entangledLanes;if(l!==0)for(t=t.entanglements,l&=i;0<l;){var u=31-Oe(l),p=1<<u;i|=t[u],l&=~p}return ga=i,zl(),s}function L0(t,i){mt=null,I.H=ic,i===bo||i===ql?(i=Km(),kt=3):i===qm?(i=Km(),kt=4):kt=i===Qg?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,ii=i,bt===null&&(sn=1,lc(t,fi(i,t.current)))}function O0(){var t=I.H;return I.H=ic,t===null?ic:t}function P0(){var t=I.A;return I.A=vS,t}function cd(){sn=4,ja||(Tt&4194048)!==Tt&&mi.current!==null||(ms=!0),(Xa&134217727)===0&&(Rr&134217727)===0||Kt===null||Ya(Kt,Tt,gi,!1)}function ud(t,i,s){var l=Ht;Ht|=2;var u=O0(),p=P0();(Kt!==t||Tt!==i)&&(mc=null,xs(t,i)),i=!1;var M=sn;e:do try{if(kt!==0&&bt!==null){var N=bt,G=ii;switch(kt){case 8:ld(),M=6;break e;case 3:case 2:case 9:case 6:mi.current===null&&(i=!0);var oe=kt;if(kt=0,ii=null,ys(t,N,G,oe),s&&ms){M=0;break e}break;default:oe=kt,kt=0,ii=null,ys(t,N,G,oe)}}yS(),M=sn;break}catch(_e){L0(t,_e)}while(!0);return i&&t.shellSuspendCounter++,la=Sr=null,Ht=l,I.H=u,I.A=p,bt===null&&(Kt=null,Tt=0,zl()),M}function yS(){for(;bt!==null;)I0(bt)}function bS(t,i){var s=Ht;Ht|=2;var l=O0(),u=P0();Kt!==t||Tt!==i?(mc=null,pc=Ct()+500,xs(t,i)):ms=Ie(t,i);e:do try{if(kt!==0&&bt!==null){i=bt;var p=ii;t:switch(kt){case 1:kt=0,ii=null,ys(t,i,p,1);break;case 2:case 9:if(Ym(p)){kt=0,ii=null,F0(i);break}i=function(){kt!==2&&kt!==9||Kt!==t||(kt=7),Hi(t)},p.then(i,i);break e;case 3:kt=7;break e;case 4:kt=5;break e;case 7:Ym(p)?(kt=0,ii=null,F0(i)):(kt=0,ii=null,ys(t,i,p,7));break;case 5:var M=null;switch(bt.tag){case 26:M=bt.memoizedState;case 5:case 27:var N=bt;if(!M||_v(M)){kt=0,ii=null;var G=N.sibling;if(G!==null)bt=G;else{var oe=N.return;oe!==null?(bt=oe,vc(oe)):bt=null}break t}}kt=0,ii=null,ys(t,i,p,5);break;case 6:kt=0,ii=null,ys(t,i,p,6);break;case 8:ld(),sn=6;break e;default:throw Error(r(462))}}SS();break}catch(_e){L0(t,_e)}while(!0);return la=Sr=null,I.H=l,I.A=u,Ht=s,bt!==null?0:(Kt=null,Tt=0,zl(),sn)}function SS(){for(;bt!==null&&!Bt();)I0(bt)}function I0(t){var i=c0(t.alternate,t,ga);t.memoizedProps=t.pendingProps,i===null?vc(t):bt=i}function F0(t){var i=t,s=i.alternate;switch(i.tag){case 15:case 0:i=i0(s,i,i.pendingProps,i.type,void 0,Tt);break;case 11:i=i0(s,i,i.pendingProps,i.type.render,i.ref,Tt);break;case 5:Tf(i);default:f0(s,i),i=bt=zm(i,ga),i=c0(s,i,ga)}t.memoizedProps=t.pendingProps,i===null?vc(t):bt=i}function ys(t,i,s,l){la=Sr=null,Tf(i),fs=null,Do=0;var u=i.return;try{if(fS(t,u,i,s,Tt)){sn=1,lc(t,fi(s,t.current)),bt=null;return}}catch(p){if(u!==null)throw bt=u,p;sn=1,lc(t,fi(s,t.current)),bt=null;return}i.flags&32768?(It||l===1?t=!0:ms||(Tt&536870912)!==0?t=!1:(ja=t=!0,(l===2||l===9||l===3||l===6)&&(l=mi.current,l!==null&&l.tag===13&&(l.flags|=16384))),z0(i,t)):vc(i)}function vc(t){var i=t;do{if((i.flags&32768)!==0){z0(i,ja);return}t=i.return;var s=hS(i.alternate,i,ga);if(s!==null){bt=s;return}if(i=i.sibling,i!==null){bt=i;return}bt=i=t}while(i!==null);sn===0&&(sn=5)}function z0(t,i){do{var s=pS(t.alternate,t);if(s!==null){s.flags&=32767,bt=s;return}if(s=t.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(t=t.sibling,t!==null)){bt=t;return}bt=t=s}while(t!==null);sn=6,bt=null}function B0(t,i,s,l,u,p,M,N,G){t.cancelPendingCommit=null;do _c();while(Nn!==0);if((Ht&6)!==0)throw Error(r(327));if(i!==null){if(i===t.current)throw Error(r(177));if(p=i.lanes|i.childLanes,p|=$u,Te(t,s,p,M,N,G),t===Kt&&(bt=Kt=null,Tt=0),vs=i,qa=t,_s=s,rd=p,sd=u,C0=l,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,AS(Lt,function(){return j0(),null})):(t.callbackNode=null,t.callbackPriority=0),l=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||l){l=I.T,I.T=null,u=B.p,B.p=2,M=Ht,Ht|=4;try{mS(t,i,s)}finally{Ht=M,B.p=u,I.T=l}}Nn=1,H0(),k0(),G0()}}function H0(){if(Nn===1){Nn=0;var t=qa,i=vs,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=I.T,I.T=null;var l=B.p;B.p=2;var u=Ht;Ht|=4;try{S0(i,t);var p=Sd,M=Rm(t.containerInfo),N=p.focusedElem,G=p.selectionRange;if(M!==N&&N&&N.ownerDocument&&wm(N.ownerDocument.documentElement,N)){if(G!==null&&Yu(N)){var oe=G.start,_e=G.end;if(_e===void 0&&(_e=oe),"selectionStart"in N)N.selectionStart=oe,N.selectionEnd=Math.min(_e,N.value.length);else{var be=N.ownerDocument||document,ue=be&&be.defaultView||window;if(ue.getSelection){var fe=ue.getSelection(),rt=N.textContent.length,tt=Math.min(G.start,rt),Xt=G.end===void 0?tt:Math.min(G.end,rt);!fe.extend&&tt>Xt&&(M=Xt,Xt=tt,tt=M);var ne=Am(N,tt),W=Am(N,Xt);if(ne&&W&&(fe.rangeCount!==1||fe.anchorNode!==ne.node||fe.anchorOffset!==ne.offset||fe.focusNode!==W.node||fe.focusOffset!==W.offset)){var ae=be.createRange();ae.setStart(ne.node,ne.offset),fe.removeAllRanges(),tt>Xt?(fe.addRange(ae),fe.extend(W.node,W.offset)):(ae.setEnd(W.node,W.offset),fe.addRange(ae))}}}}for(be=[],fe=N;fe=fe.parentNode;)fe.nodeType===1&&be.push({element:fe,left:fe.scrollLeft,top:fe.scrollTop});for(typeof N.focus=="function"&&N.focus(),N=0;N<be.length;N++){var ye=be[N];ye.element.scrollLeft=ye.left,ye.element.scrollTop=ye.top}}Dc=!!bd,Sd=bd=null}finally{Ht=u,B.p=l,I.T=s}}t.current=i,Nn=2}}function k0(){if(Nn===2){Nn=0;var t=qa,i=vs,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=I.T,I.T=null;var l=B.p;B.p=2;var u=Ht;Ht|=4;try{_0(t,i.alternate,i)}finally{Ht=u,B.p=l,I.T=s}}Nn=3}}function G0(){if(Nn===4||Nn===3){Nn=0,ut();var t=qa,i=vs,s=_s,l=C0;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?Nn=5:(Nn=0,vs=qa=null,V0(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(Wa=null),Ft(s),i=i.stateNode,xe&&typeof xe.onCommitFiberRoot=="function")try{xe.onCommitFiberRoot(ve,i,void 0,(i.current.flags&128)===128)}catch{}if(l!==null){i=I.T,u=B.p,B.p=2,I.T=null;try{for(var p=t.onRecoverableError,M=0;M<l.length;M++){var N=l[M];p(N.value,{componentStack:N.stack})}}finally{I.T=i,B.p=u}}(_s&3)!==0&&_c(),Hi(t),u=t.pendingLanes,(s&4194090)!==0&&(u&42)!==0?t===od?Bo++:(Bo=0,od=t):Bo=0,Ho(0)}}function V0(t,i){(t.pooledCacheLanes&=i)===0&&(i=t.pooledCache,i!=null&&(t.pooledCache=null,xo(i)))}function _c(t){return H0(),k0(),G0(),j0()}function j0(){if(Nn!==5)return!1;var t=qa,i=rd;rd=0;var s=Ft(_s),l=I.T,u=B.p;try{B.p=32>s?32:s,I.T=null,s=sd,sd=null;var p=qa,M=_s;if(Nn=0,vs=qa=null,_s=0,(Ht&6)!==0)throw Error(r(331));var N=Ht;if(Ht|=4,w0(p.current),E0(p,p.current,M,s),Ht=N,Ho(0,!1),xe&&typeof xe.onPostCommitFiberRoot=="function")try{xe.onPostCommitFiberRoot(ve,p)}catch{}return!0}finally{B.p=u,I.T=l,V0(t,i)}}function X0(t,i,s){i=fi(s,i),i=Bf(t.stateNode,i,2),t=Fa(t,i,2),t!==null&&(Fe(t,2),Hi(t))}function Yt(t,i,s){if(t.tag===3)X0(t,t,s);else for(;i!==null;){if(i.tag===3){X0(i,t,s);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(Wa===null||!Wa.has(l))){t=fi(s,t),s=Zg(2),l=Fa(i,s,2),l!==null&&(Kg(s,l,i,t),Fe(l,2),Hi(l));break}}i=i.return}}function fd(t,i,s){var l=t.pingCache;if(l===null){l=t.pingCache=new _S;var u=new Set;l.set(i,u)}else u=l.get(i),u===void 0&&(u=new Set,l.set(i,u));u.has(s)||(td=!0,u.add(s),t=MS.bind(null,t,i,s),i.then(t,t))}function MS(t,i,s){var l=t.pingCache;l!==null&&l.delete(i),t.pingedLanes|=t.suspendedLanes&s,t.warmLanes&=~s,Kt===t&&(Tt&s)===s&&(sn===4||sn===3&&(Tt&62914560)===Tt&&300>Ct()-ad?(Ht&2)===0&&xs(t,0):nd|=s,gs===Tt&&(gs=0)),Hi(t)}function W0(t,i){i===0&&(i=Ce()),t=ts(t,i),t!==null&&(Fe(t,i),Hi(t))}function ES(t){var i=t.memoizedState,s=0;i!==null&&(s=i.retryLane),W0(t,s)}function TS(t,i){var s=0;switch(t.tag){case 13:var l=t.stateNode,u=t.memoizedState;u!==null&&(s=u.retryLane);break;case 19:l=t.stateNode;break;case 22:l=t.stateNode._retryCache;break;default:throw Error(r(314))}l!==null&&l.delete(i),W0(t,s)}function AS(t,i){return ct(t,i)}var xc=null,bs=null,dd=!1,yc=!1,hd=!1,Cr=0;function Hi(t){t!==bs&&t.next===null&&(bs===null?xc=bs=t:bs=bs.next=t),yc=!0,dd||(dd=!0,RS())}function Ho(t,i){if(!hd&&yc){hd=!0;do for(var s=!1,l=xc;l!==null;){if(t!==0){var u=l.pendingLanes;if(u===0)var p=0;else{var M=l.suspendedLanes,N=l.pingedLanes;p=(1<<31-Oe(42|t)+1)-1,p&=u&~(M&~N),p=p&201326741?p&201326741|1:p?p|2:0}p!==0&&(s=!0,K0(l,p))}else p=Tt,p=Ge(l,l===Kt?p:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(p&3)===0||Ie(l,p)||(s=!0,K0(l,p));l=l.next}while(s);hd=!1}}function wS(){q0()}function q0(){yc=dd=!1;var t=0;Cr!==0&&(IS()&&(t=Cr),Cr=0);for(var i=Ct(),s=null,l=xc;l!==null;){var u=l.next,p=Y0(l,i);p===0?(l.next=null,s===null?xc=u:s.next=u,u===null&&(bs=s)):(s=l,(t!==0||(p&3)!==0)&&(yc=!0)),l=u}Ho(t)}function Y0(t,i){for(var s=t.suspendedLanes,l=t.pingedLanes,u=t.expirationTimes,p=t.pendingLanes&-62914561;0<p;){var M=31-Oe(p),N=1<<M,G=u[M];G===-1?((N&s)===0||(N&l)!==0)&&(u[M]=ft(N,i)):G<=i&&(t.expiredLanes|=N),p&=~N}if(i=Kt,s=Tt,s=Ge(t,t===i?s:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l=t.callbackNode,s===0||t===i&&(kt===2||kt===9)||t.cancelPendingCommit!==null)return l!==null&&l!==null&&_t(l),t.callbackNode=null,t.callbackPriority=0;if((s&3)===0||Ie(t,s)){if(i=s&-s,i===t.callbackPriority)return i;switch(l!==null&&_t(l),Ft(s)){case 2:case 8:s=At;break;case 32:s=Lt;break;case 268435456:s=H;break;default:s=Lt}return l=Z0.bind(null,t),s=ct(s,l),t.callbackPriority=i,t.callbackNode=s,i}return l!==null&&l!==null&&_t(l),t.callbackPriority=2,t.callbackNode=null,2}function Z0(t,i){if(Nn!==0&&Nn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var s=t.callbackNode;if(_c()&&t.callbackNode!==s)return null;var l=Tt;return l=Ge(t,t===Kt?l:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l===0?null:(N0(t,l,i),Y0(t,Ct()),t.callbackNode!=null&&t.callbackNode===s?Z0.bind(null,t):null)}function K0(t,i){if(_c())return null;N0(t,i,!0)}function RS(){zS(function(){(Ht&6)!==0?ct(tn,wS):q0()})}function pd(){return Cr===0&&(Cr=Z()),Cr}function Q0(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Nl(""+t)}function J0(t,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,t.id&&s.setAttribute("form",t.id),i.parentNode.insertBefore(s,i),t=new FormData(t),s.parentNode.removeChild(s),t}function CS(t,i,s,l,u){if(i==="submit"&&s&&s.stateNode===u){var p=Q0((u[Mn]||null).action),M=l.submitter;M&&(i=(i=M[Mn]||null)?Q0(i.formAction):M.getAttribute("formAction"),i!==null&&(p=i,M=null));var N=new Pl("action","action",null,l,u);t.push({event:N,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(Cr!==0){var G=M?J0(u,M):new FormData(u);Of(s,{pending:!0,data:G,method:u.method,action:p},null,G)}}else typeof p=="function"&&(N.preventDefault(),G=M?J0(u,M):new FormData(u),Of(s,{pending:!0,data:G,method:u.method,action:p},p,G))},currentTarget:u}]})}}for(var md=0;md<Ju.length;md++){var gd=Ju[md],DS=gd.toLowerCase(),NS=gd[0].toUpperCase()+gd.slice(1);Ei(DS,"on"+NS)}Ei(Nm,"onAnimationEnd"),Ei(Um,"onAnimationIteration"),Ei(Lm,"onAnimationStart"),Ei("dblclick","onDoubleClick"),Ei("focusin","onFocus"),Ei("focusout","onBlur"),Ei(Yb,"onTransitionRun"),Ei(Zb,"onTransitionStart"),Ei(Kb,"onTransitionCancel"),Ei(Om,"onTransitionEnd"),Ua("onMouseEnter",["mouseout","mouseover"]),Ua("onMouseLeave",["mouseout","mouseover"]),Ua("onPointerEnter",["pointerout","pointerover"]),Ua("onPointerLeave",["pointerout","pointerover"]),na("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),na("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),na("onBeforeInput",["compositionend","keypress","textInput","paste"]),na("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),na("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),na("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ko="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),US=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ko));function $0(t,i){i=(i&4)!==0;for(var s=0;s<t.length;s++){var l=t[s],u=l.event;l=l.listeners;e:{var p=void 0;if(i)for(var M=l.length-1;0<=M;M--){var N=l[M],G=N.instance,oe=N.currentTarget;if(N=N.listener,G!==p&&u.isPropagationStopped())break e;p=N,u.currentTarget=oe;try{p(u)}catch(_e){oc(_e)}u.currentTarget=null,p=G}else for(M=0;M<l.length;M++){if(N=l[M],G=N.instance,oe=N.currentTarget,N=N.listener,G!==p&&u.isPropagationStopped())break e;p=N,u.currentTarget=oe;try{p(u)}catch(_e){oc(_e)}u.currentTarget=null,p=G}}}}function St(t,i){var s=i[Wr];s===void 0&&(s=i[Wr]=new Set);var l=t+"__bubble";s.has(l)||(ev(i,t,2,!1),s.add(l))}function vd(t,i,s){var l=0;i&&(l|=4),ev(s,t,l,i)}var bc="_reactListening"+Math.random().toString(36).slice(2);function _d(t){if(!t[bc]){t[bc]=!0,wl.forEach(function(s){s!=="selectionchange"&&(US.has(s)||vd(s,!1,t),vd(s,!0,t))});var i=t.nodeType===9?t:t.ownerDocument;i===null||i[bc]||(i[bc]=!0,vd("selectionchange",!1,i))}}function ev(t,i,s,l){switch(Ev(i)){case 2:var u=rM;break;case 8:u=sM;break;default:u=Ud}s=u.bind(null,i,s,t),u=void 0,!Bu||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(u=!0),l?u!==void 0?t.addEventListener(i,s,{capture:!0,passive:u}):t.addEventListener(i,s,!0):u!==void 0?t.addEventListener(i,s,{passive:u}):t.addEventListener(i,s,!1)}function xd(t,i,s,l,u){var p=l;if((i&1)===0&&(i&2)===0&&l!==null)e:for(;;){if(l===null)return;var M=l.tag;if(M===3||M===4){var N=l.stateNode.containerInfo;if(N===u)break;if(M===4)for(M=l.return;M!==null;){var G=M.tag;if((G===3||G===4)&&M.stateNode.containerInfo===u)return;M=M.return}for(;N!==null;){if(M=Si(N),M===null)return;if(G=M.tag,G===5||G===6||G===26||G===27){l=p=M;continue e}N=N.parentNode}}l=l.return}om(function(){var oe=p,_e=Fu(s),be=[];e:{var ue=Pm.get(t);if(ue!==void 0){var fe=Pl,rt=t;switch(t){case"keypress":if(Ll(s)===0)break e;case"keydown":case"keyup":fe=Ab;break;case"focusin":rt="focus",fe=Vu;break;case"focusout":rt="blur",fe=Vu;break;case"beforeblur":case"afterblur":fe=Vu;break;case"click":if(s.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":fe=um;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":fe=pb;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":fe=Cb;break;case Nm:case Um:case Lm:fe=vb;break;case Om:fe=Nb;break;case"scroll":case"scrollend":fe=db;break;case"wheel":fe=Lb;break;case"copy":case"cut":case"paste":fe=xb;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":fe=dm;break;case"toggle":case"beforetoggle":fe=Pb}var tt=(i&4)!==0,Xt=!tt&&(t==="scroll"||t==="scrollend"),ne=tt?ue!==null?ue+"Capture":null:ue;tt=[];for(var W=oe,ae;W!==null;){var ye=W;if(ae=ye.stateNode,ye=ye.tag,ye!==5&&ye!==26&&ye!==27||ae===null||ne===null||(ye=ro(W,ne),ye!=null&&tt.push(Go(W,ye,ae))),Xt)break;W=W.return}0<tt.length&&(ue=new fe(ue,rt,null,s,_e),be.push({event:ue,listeners:tt}))}}if((i&7)===0){e:{if(ue=t==="mouseover"||t==="pointerover",fe=t==="mouseout"||t==="pointerout",ue&&s!==Iu&&(rt=s.relatedTarget||s.fromElement)&&(Si(rt)||rt[Da]))break e;if((fe||ue)&&(ue=_e.window===_e?_e:(ue=_e.ownerDocument)?ue.defaultView||ue.parentWindow:window,fe?(rt=s.relatedTarget||s.toElement,fe=oe,rt=rt?Si(rt):null,rt!==null&&(Xt=c(rt),tt=rt.tag,rt!==Xt||tt!==5&&tt!==27&&tt!==6)&&(rt=null)):(fe=null,rt=oe),fe!==rt)){if(tt=um,ye="onMouseLeave",ne="onMouseEnter",W="mouse",(t==="pointerout"||t==="pointerover")&&(tt=dm,ye="onPointerLeave",ne="onPointerEnter",W="pointer"),Xt=fe==null?ue:Li(fe),ae=rt==null?ue:Li(rt),ue=new tt(ye,W+"leave",fe,s,_e),ue.target=Xt,ue.relatedTarget=ae,ye=null,Si(_e)===oe&&(tt=new tt(ne,W+"enter",rt,s,_e),tt.target=ae,tt.relatedTarget=Xt,ye=tt),Xt=ye,fe&&rt)t:{for(tt=fe,ne=rt,W=0,ae=tt;ae;ae=Ss(ae))W++;for(ae=0,ye=ne;ye;ye=Ss(ye))ae++;for(;0<W-ae;)tt=Ss(tt),W--;for(;0<ae-W;)ne=Ss(ne),ae--;for(;W--;){if(tt===ne||ne!==null&&tt===ne.alternate)break t;tt=Ss(tt),ne=Ss(ne)}tt=null}else tt=null;fe!==null&&tv(be,ue,fe,tt,!1),rt!==null&&Xt!==null&&tv(be,Xt,rt,tt,!0)}}e:{if(ue=oe?Li(oe):window,fe=ue.nodeName&&ue.nodeName.toLowerCase(),fe==="select"||fe==="input"&&ue.type==="file")var Xe=ym;else if(_m(ue))if(bm)Xe=Xb;else{Xe=Vb;var xt=Gb}else fe=ue.nodeName,!fe||fe.toLowerCase()!=="input"||ue.type!=="checkbox"&&ue.type!=="radio"?oe&&Pi(oe.elementType)&&(Xe=ym):Xe=jb;if(Xe&&(Xe=Xe(t,oe))){xm(be,Xe,s,_e);break e}xt&&xt(t,ue,oe),t==="focusout"&&oe&&ue.type==="number"&&oe.memoizedProps.value!=null&&Wn(ue,"number",ue.value)}switch(xt=oe?Li(oe):window,t){case"focusin":(_m(xt)||xt.contentEditable==="true")&&(Jr=xt,Zu=oe,po=null);break;case"focusout":po=Zu=Jr=null;break;case"mousedown":Ku=!0;break;case"contextmenu":case"mouseup":case"dragend":Ku=!1,Cm(be,s,_e);break;case"selectionchange":if(qb)break;case"keydown":case"keyup":Cm(be,s,_e)}var Qe;if(Xu)e:{switch(t){case"compositionstart":var it="onCompositionStart";break e;case"compositionend":it="onCompositionEnd";break e;case"compositionupdate":it="onCompositionUpdate";break e}it=void 0}else Qr?gm(t,s)&&(it="onCompositionEnd"):t==="keydown"&&s.keyCode===229&&(it="onCompositionStart");it&&(hm&&s.locale!=="ko"&&(Qr||it!=="onCompositionStart"?it==="onCompositionEnd"&&Qr&&(Qe=lm()):(La=_e,Hu="value"in La?La.value:La.textContent,Qr=!0)),xt=Sc(oe,it),0<xt.length&&(it=new fm(it,t,null,s,_e),be.push({event:it,listeners:xt}),Qe?it.data=Qe:(Qe=vm(s),Qe!==null&&(it.data=Qe)))),(Qe=Fb?zb(t,s):Bb(t,s))&&(it=Sc(oe,"onBeforeInput"),0<it.length&&(xt=new fm("onBeforeInput","beforeinput",null,s,_e),be.push({event:xt,listeners:it}),xt.data=Qe)),CS(be,t,oe,s,_e)}$0(be,i)})}function Go(t,i,s){return{instance:t,listener:i,currentTarget:s}}function Sc(t,i){for(var s=i+"Capture",l=[];t!==null;){var u=t,p=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||p===null||(u=ro(t,s),u!=null&&l.unshift(Go(t,u,p)),u=ro(t,i),u!=null&&l.push(Go(t,u,p))),t.tag===3)return l;t=t.return}return[]}function Ss(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function tv(t,i,s,l,u){for(var p=i._reactName,M=[];s!==null&&s!==l;){var N=s,G=N.alternate,oe=N.stateNode;if(N=N.tag,G!==null&&G===l)break;N!==5&&N!==26&&N!==27||oe===null||(G=oe,u?(oe=ro(s,p),oe!=null&&M.unshift(Go(s,oe,G))):u||(oe=ro(s,p),oe!=null&&M.push(Go(s,oe,G)))),s=s.return}M.length!==0&&t.push({event:i,listeners:M})}var LS=/\r\n?/g,OS=/\u0000|\uFFFD/g;function nv(t){return(typeof t=="string"?t:""+t).replace(LS,`
`).replace(OS,"")}function iv(t,i){return i=nv(i),nv(t)===i}function Mc(){}function jt(t,i,s,l,u,p){switch(s){case"children":typeof l=="string"?i==="body"||i==="textarea"&&l===""||Jt(t,l):(typeof l=="number"||typeof l=="bigint")&&i!=="body"&&Jt(t,""+l);break;case"className":ce(t,"class",l);break;case"tabIndex":ce(t,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":ce(t,s,l);break;case"style":Mi(t,l,p);break;case"data":if(i!=="object"){ce(t,"data",l);break}case"src":case"href":if(l===""&&(i!=="a"||s!=="href")){t.removeAttribute(s);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(s);break}l=Nl(""+l),t.setAttribute(s,l);break;case"action":case"formAction":if(typeof l=="function"){t.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof p=="function"&&(s==="formAction"?(i!=="input"&&jt(t,i,"name",u.name,u,null),jt(t,i,"formEncType",u.formEncType,u,null),jt(t,i,"formMethod",u.formMethod,u,null),jt(t,i,"formTarget",u.formTarget,u,null)):(jt(t,i,"encType",u.encType,u,null),jt(t,i,"method",u.method,u,null),jt(t,i,"target",u.target,u,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(s);break}l=Nl(""+l),t.setAttribute(s,l);break;case"onClick":l!=null&&(t.onclick=Mc);break;case"onScroll":l!=null&&St("scroll",t);break;case"onScrollEnd":l!=null&&St("scrollend",t);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(r(61));if(s=l.__html,s!=null){if(u.children!=null)throw Error(r(60));t.innerHTML=s}}break;case"multiple":t.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":t.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){t.removeAttribute("xlink:href");break}s=Nl(""+l),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(s,""+l):t.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(s,""):t.removeAttribute(s);break;case"capture":case"download":l===!0?t.setAttribute(s,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(s,l):t.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?t.setAttribute(s,l):t.removeAttribute(s);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?t.removeAttribute(s):t.setAttribute(s,l);break;case"popover":St("beforetoggle",t),St("toggle",t),de(t,"popover",l);break;case"xlinkActuate":ie(t,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":ie(t,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":ie(t,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":ie(t,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":ie(t,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":ie(t,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":ie(t,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":ie(t,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":ie(t,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":de(t,"is",l);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=Dl.get(s)||s,de(t,s,l))}}function yd(t,i,s,l,u,p){switch(s){case"style":Mi(t,l,p);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(r(61));if(s=l.__html,s!=null){if(u.children!=null)throw Error(r(60));t.innerHTML=s}}break;case"children":typeof l=="string"?Jt(t,l):(typeof l=="number"||typeof l=="bigint")&&Jt(t,""+l);break;case"onScroll":l!=null&&St("scroll",t);break;case"onScrollEnd":l!=null&&St("scrollend",t);break;case"onClick":l!=null&&(t.onclick=Mc);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Rl.hasOwnProperty(s))e:{if(s[0]==="o"&&s[1]==="n"&&(u=s.endsWith("Capture"),i=s.slice(2,u?s.length-7:void 0),p=t[Mn]||null,p=p!=null?p[s]:null,typeof p=="function"&&t.removeEventListener(i,p,u),typeof l=="function")){typeof p!="function"&&p!==null&&(s in t?t[s]=null:t.hasAttribute(s)&&t.removeAttribute(s)),t.addEventListener(i,l,u);break e}s in t?t[s]=l:l===!0?t.setAttribute(s,""):de(t,s,l)}}}function Un(t,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":St("error",t),St("load",t);var l=!1,u=!1,p;for(p in s)if(s.hasOwnProperty(p)){var M=s[p];if(M!=null)switch(p){case"src":l=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,i));default:jt(t,i,p,M,s,null)}}u&&jt(t,i,"srcSet",s.srcSet,s,null),l&&jt(t,i,"src",s.src,s,null);return;case"input":St("invalid",t);var N=p=M=u=null,G=null,oe=null;for(l in s)if(s.hasOwnProperty(l)){var _e=s[l];if(_e!=null)switch(l){case"name":u=_e;break;case"type":M=_e;break;case"checked":G=_e;break;case"defaultChecked":oe=_e;break;case"value":p=_e;break;case"defaultValue":N=_e;break;case"children":case"dangerouslySetInnerHTML":if(_e!=null)throw Error(r(137,i));break;default:jt(t,i,l,_e,s,null)}}Xn(t,p,N,G,oe,M,u,!1),qt(t);return;case"select":St("invalid",t),l=M=p=null;for(u in s)if(s.hasOwnProperty(u)&&(N=s[u],N!=null))switch(u){case"value":p=N;break;case"defaultValue":M=N;break;case"multiple":l=N;default:jt(t,i,u,N,s,null)}i=p,s=M,t.multiple=!!l,i!=null?qn(t,!!l,i,!1):s!=null&&qn(t,!!l,s,!0);return;case"textarea":St("invalid",t),p=u=l=null;for(M in s)if(s.hasOwnProperty(M)&&(N=s[M],N!=null))switch(M){case"value":l=N;break;case"defaultValue":u=N;break;case"children":p=N;break;case"dangerouslySetInnerHTML":if(N!=null)throw Error(r(91));break;default:jt(t,i,M,N,s,null)}zt(t,l,u,p),qt(t);return;case"option":for(G in s)s.hasOwnProperty(G)&&(l=s[G],l!=null)&&(G==="selected"?t.selected=l&&typeof l!="function"&&typeof l!="symbol":jt(t,i,G,l,s,null));return;case"dialog":St("beforetoggle",t),St("toggle",t),St("cancel",t),St("close",t);break;case"iframe":case"object":St("load",t);break;case"video":case"audio":for(l=0;l<ko.length;l++)St(ko[l],t);break;case"image":St("error",t),St("load",t);break;case"details":St("toggle",t);break;case"embed":case"source":case"link":St("error",t),St("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(oe in s)if(s.hasOwnProperty(oe)&&(l=s[oe],l!=null))switch(oe){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,i));default:jt(t,i,oe,l,s,null)}return;default:if(Pi(i)){for(_e in s)s.hasOwnProperty(_e)&&(l=s[_e],l!==void 0&&yd(t,i,_e,l,s,void 0));return}}for(N in s)s.hasOwnProperty(N)&&(l=s[N],l!=null&&jt(t,i,N,l,s,null))}function PS(t,i,s,l){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,p=null,M=null,N=null,G=null,oe=null,_e=null;for(fe in s){var be=s[fe];if(s.hasOwnProperty(fe)&&be!=null)switch(fe){case"checked":break;case"value":break;case"defaultValue":G=be;default:l.hasOwnProperty(fe)||jt(t,i,fe,null,l,be)}}for(var ue in l){var fe=l[ue];if(be=s[ue],l.hasOwnProperty(ue)&&(fe!=null||be!=null))switch(ue){case"type":p=fe;break;case"name":u=fe;break;case"checked":oe=fe;break;case"defaultChecked":_e=fe;break;case"value":M=fe;break;case"defaultValue":N=fe;break;case"children":case"dangerouslySetInnerHTML":if(fe!=null)throw Error(r(137,i));break;default:fe!==be&&jt(t,i,ue,fe,l,be)}}Mt(t,M,N,G,oe,_e,p,u);return;case"select":fe=M=N=ue=null;for(p in s)if(G=s[p],s.hasOwnProperty(p)&&G!=null)switch(p){case"value":break;case"multiple":fe=G;default:l.hasOwnProperty(p)||jt(t,i,p,null,l,G)}for(u in l)if(p=l[u],G=s[u],l.hasOwnProperty(u)&&(p!=null||G!=null))switch(u){case"value":ue=p;break;case"defaultValue":N=p;break;case"multiple":M=p;default:p!==G&&jt(t,i,u,p,l,G)}i=N,s=M,l=fe,ue!=null?qn(t,!!s,ue,!1):!!l!=!!s&&(i!=null?qn(t,!!s,i,!0):qn(t,!!s,s?[]:"",!1));return;case"textarea":fe=ue=null;for(N in s)if(u=s[N],s.hasOwnProperty(N)&&u!=null&&!l.hasOwnProperty(N))switch(N){case"value":break;case"children":break;default:jt(t,i,N,null,l,u)}for(M in l)if(u=l[M],p=s[M],l.hasOwnProperty(M)&&(u!=null||p!=null))switch(M){case"value":ue=u;break;case"defaultValue":fe=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(r(91));break;default:u!==p&&jt(t,i,M,u,l,p)}ia(t,ue,fe);return;case"option":for(var rt in s)ue=s[rt],s.hasOwnProperty(rt)&&ue!=null&&!l.hasOwnProperty(rt)&&(rt==="selected"?t.selected=!1:jt(t,i,rt,null,l,ue));for(G in l)ue=l[G],fe=s[G],l.hasOwnProperty(G)&&ue!==fe&&(ue!=null||fe!=null)&&(G==="selected"?t.selected=ue&&typeof ue!="function"&&typeof ue!="symbol":jt(t,i,G,ue,l,fe));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var tt in s)ue=s[tt],s.hasOwnProperty(tt)&&ue!=null&&!l.hasOwnProperty(tt)&&jt(t,i,tt,null,l,ue);for(oe in l)if(ue=l[oe],fe=s[oe],l.hasOwnProperty(oe)&&ue!==fe&&(ue!=null||fe!=null))switch(oe){case"children":case"dangerouslySetInnerHTML":if(ue!=null)throw Error(r(137,i));break;default:jt(t,i,oe,ue,l,fe)}return;default:if(Pi(i)){for(var Xt in s)ue=s[Xt],s.hasOwnProperty(Xt)&&ue!==void 0&&!l.hasOwnProperty(Xt)&&yd(t,i,Xt,void 0,l,ue);for(_e in l)ue=l[_e],fe=s[_e],!l.hasOwnProperty(_e)||ue===fe||ue===void 0&&fe===void 0||yd(t,i,_e,ue,l,fe);return}}for(var ne in s)ue=s[ne],s.hasOwnProperty(ne)&&ue!=null&&!l.hasOwnProperty(ne)&&jt(t,i,ne,null,l,ue);for(be in l)ue=l[be],fe=s[be],!l.hasOwnProperty(be)||ue===fe||ue==null&&fe==null||jt(t,i,be,ue,l,fe)}var bd=null,Sd=null;function Ec(t){return t.nodeType===9?t:t.ownerDocument}function av(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function rv(t,i){if(t===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&i==="foreignObject"?0:t}function Md(t,i){return t==="textarea"||t==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Ed=null;function IS(){var t=window.event;return t&&t.type==="popstate"?t===Ed?!1:(Ed=t,!0):(Ed=null,!1)}var sv=typeof setTimeout=="function"?setTimeout:void 0,FS=typeof clearTimeout=="function"?clearTimeout:void 0,ov=typeof Promise=="function"?Promise:void 0,zS=typeof queueMicrotask=="function"?queueMicrotask:typeof ov<"u"?function(t){return ov.resolve(null).then(t).catch(BS)}:sv;function BS(t){setTimeout(function(){throw t})}function Za(t){return t==="head"}function lv(t,i){var s=i,l=0,u=0;do{var p=s.nextSibling;if(t.removeChild(s),p&&p.nodeType===8)if(s=p.data,s==="/$"){if(0<l&&8>l){s=l;var M=t.ownerDocument;if(s&1&&Vo(M.documentElement),s&2&&Vo(M.body),s&4)for(s=M.head,Vo(s),M=s.firstChild;M;){var N=M.nextSibling,G=M.nodeName;M[Na]||G==="SCRIPT"||G==="STYLE"||G==="LINK"&&M.rel.toLowerCase()==="stylesheet"||s.removeChild(M),M=N}}if(u===0){t.removeChild(p),Qo(i);return}u--}else s==="$"||s==="$?"||s==="$!"?u++:l=s.charCodeAt(0)-48;else l=0;s=p}while(s);Qo(i)}function Td(t){var i=t.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":Td(s),Yr(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}t.removeChild(s)}}function HS(t,i,s,l){for(;t.nodeType===1;){var u=s;if(t.nodeName.toLowerCase()!==i.toLowerCase()){if(!l&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(l){if(!t[Na])switch(i){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(p=t.getAttribute("rel"),p==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(p!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(p=t.getAttribute("src"),(p!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&p&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(i==="input"&&t.type==="hidden"){var p=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===p)return t}else return t;if(t=Ai(t.nextSibling),t===null)break}return null}function kS(t,i,s){if(i==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!s||(t=Ai(t.nextSibling),t===null))return null;return t}function Ad(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState==="complete"}function GS(t,i){var s=t.ownerDocument;if(t.data!=="$?"||s.readyState==="complete")i();else{var l=function(){i(),s.removeEventListener("DOMContentLoaded",l)};s.addEventListener("DOMContentLoaded",l),t._reactRetry=l}}function Ai(t){for(;t!=null;t=t.nextSibling){var i=t.nodeType;if(i===1||i===3)break;if(i===8){if(i=t.data,i==="$"||i==="$!"||i==="$?"||i==="F!"||i==="F")break;if(i==="/$")return null}}return t}var wd=null;function cv(t){t=t.previousSibling;for(var i=0;t;){if(t.nodeType===8){var s=t.data;if(s==="$"||s==="$!"||s==="$?"){if(i===0)return t;i--}else s==="/$"&&i++}t=t.previousSibling}return null}function uv(t,i,s){switch(i=Ec(s),t){case"html":if(t=i.documentElement,!t)throw Error(r(452));return t;case"head":if(t=i.head,!t)throw Error(r(453));return t;case"body":if(t=i.body,!t)throw Error(r(454));return t;default:throw Error(r(451))}}function Vo(t){for(var i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Yr(t)}var vi=new Map,fv=new Set;function Tc(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var va=B.d;B.d={f:VS,r:jS,D:XS,C:WS,L:qS,m:YS,X:KS,S:ZS,M:QS};function VS(){var t=va.f(),i=gc();return t||i}function jS(t){var i=ea(t);i!==null&&i.tag===5&&i.type==="form"?Ng(i):va.r(t)}var Ms=typeof document>"u"?null:document;function dv(t,i,s){var l=Ms;if(l&&typeof i=="string"&&i){var u=Zt(i);u='link[rel="'+t+'"][href="'+u+'"]',typeof s=="string"&&(u+='[crossorigin="'+s+'"]'),fv.has(u)||(fv.add(u),t={rel:t,crossOrigin:s,href:i},l.querySelector(u)===null&&(i=l.createElement("link"),Un(i,"link",t),ln(i),l.head.appendChild(i)))}}function XS(t){va.D(t),dv("dns-prefetch",t,null)}function WS(t,i){va.C(t,i),dv("preconnect",t,i)}function qS(t,i,s){va.L(t,i,s);var l=Ms;if(l&&t&&i){var u='link[rel="preload"][as="'+Zt(i)+'"]';i==="image"&&s&&s.imageSrcSet?(u+='[imagesrcset="'+Zt(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(u+='[imagesizes="'+Zt(s.imageSizes)+'"]')):u+='[href="'+Zt(t)+'"]';var p=u;switch(i){case"style":p=Es(t);break;case"script":p=Ts(t)}vi.has(p)||(t=g({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:t,as:i},s),vi.set(p,t),l.querySelector(u)!==null||i==="style"&&l.querySelector(jo(p))||i==="script"&&l.querySelector(Xo(p))||(i=l.createElement("link"),Un(i,"link",t),ln(i),l.head.appendChild(i)))}}function YS(t,i){va.m(t,i);var s=Ms;if(s&&t){var l=i&&typeof i.as=="string"?i.as:"script",u='link[rel="modulepreload"][as="'+Zt(l)+'"][href="'+Zt(t)+'"]',p=u;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":p=Ts(t)}if(!vi.has(p)&&(t=g({rel:"modulepreload",href:t},i),vi.set(p,t),s.querySelector(u)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(Xo(p)))return}l=s.createElement("link"),Un(l,"link",t),ln(l),s.head.appendChild(l)}}}function ZS(t,i,s){va.S(t,i,s);var l=Ms;if(l&&t){var u=ta(l).hoistableStyles,p=Es(t);i=i||"default";var M=u.get(p);if(!M){var N={loading:0,preload:null};if(M=l.querySelector(jo(p)))N.loading=5;else{t=g({rel:"stylesheet",href:t,"data-precedence":i},s),(s=vi.get(p))&&Rd(t,s);var G=M=l.createElement("link");ln(G),Un(G,"link",t),G._p=new Promise(function(oe,_e){G.onload=oe,G.onerror=_e}),G.addEventListener("load",function(){N.loading|=1}),G.addEventListener("error",function(){N.loading|=2}),N.loading|=4,Ac(M,i,l)}M={type:"stylesheet",instance:M,count:1,state:N},u.set(p,M)}}}function KS(t,i){va.X(t,i);var s=Ms;if(s&&t){var l=ta(s).hoistableScripts,u=Ts(t),p=l.get(u);p||(p=s.querySelector(Xo(u)),p||(t=g({src:t,async:!0},i),(i=vi.get(u))&&Cd(t,i),p=s.createElement("script"),ln(p),Un(p,"link",t),s.head.appendChild(p)),p={type:"script",instance:p,count:1,state:null},l.set(u,p))}}function QS(t,i){va.M(t,i);var s=Ms;if(s&&t){var l=ta(s).hoistableScripts,u=Ts(t),p=l.get(u);p||(p=s.querySelector(Xo(u)),p||(t=g({src:t,async:!0,type:"module"},i),(i=vi.get(u))&&Cd(t,i),p=s.createElement("script"),ln(p),Un(p,"link",t),s.head.appendChild(p)),p={type:"script",instance:p,count:1,state:null},l.set(u,p))}}function hv(t,i,s,l){var u=(u=ee.current)?Tc(u):null;if(!u)throw Error(r(446));switch(t){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=Es(s.href),s=ta(u).hoistableStyles,l=s.get(i),l||(l={type:"style",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){t=Es(s.href);var p=ta(u).hoistableStyles,M=p.get(t);if(M||(u=u.ownerDocument||u,M={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},p.set(t,M),(p=u.querySelector(jo(t)))&&!p._p&&(M.instance=p,M.state.loading=5),vi.has(t)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},vi.set(t,s),p||JS(u,t,s,M.state))),i&&l===null)throw Error(r(528,""));return M}if(i&&l!==null)throw Error(r(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Ts(s),s=ta(u).hoistableScripts,l=s.get(i),l||(l={type:"script",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,t))}}function Es(t){return'href="'+Zt(t)+'"'}function jo(t){return'link[rel="stylesheet"]['+t+"]"}function pv(t){return g({},t,{"data-precedence":t.precedence,precedence:null})}function JS(t,i,s,l){t.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=t.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),Un(i,"link",s),ln(i),t.head.appendChild(i))}function Ts(t){return'[src="'+Zt(t)+'"]'}function Xo(t){return"script[async]"+t}function mv(t,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var l=t.querySelector('style[data-href~="'+Zt(s.href)+'"]');if(l)return i.instance=l,ln(l),l;var u=g({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return l=(t.ownerDocument||t).createElement("style"),ln(l),Un(l,"style",u),Ac(l,s.precedence,t),i.instance=l;case"stylesheet":u=Es(s.href);var p=t.querySelector(jo(u));if(p)return i.state.loading|=4,i.instance=p,ln(p),p;l=pv(s),(u=vi.get(u))&&Rd(l,u),p=(t.ownerDocument||t).createElement("link"),ln(p);var M=p;return M._p=new Promise(function(N,G){M.onload=N,M.onerror=G}),Un(p,"link",l),i.state.loading|=4,Ac(p,s.precedence,t),i.instance=p;case"script":return p=Ts(s.src),(u=t.querySelector(Xo(p)))?(i.instance=u,ln(u),u):(l=s,(u=vi.get(p))&&(l=g({},s),Cd(l,u)),t=t.ownerDocument||t,u=t.createElement("script"),ln(u),Un(u,"link",l),t.head.appendChild(u),i.instance=u);case"void":return null;default:throw Error(r(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(l=i.instance,i.state.loading|=4,Ac(l,s.precedence,t));return i.instance}function Ac(t,i,s){for(var l=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=l.length?l[l.length-1]:null,p=u,M=0;M<l.length;M++){var N=l[M];if(N.dataset.precedence===i)p=N;else if(p!==u)break}p?p.parentNode.insertBefore(t,p.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(t,i.firstChild))}function Rd(t,i){t.crossOrigin==null&&(t.crossOrigin=i.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=i.referrerPolicy),t.title==null&&(t.title=i.title)}function Cd(t,i){t.crossOrigin==null&&(t.crossOrigin=i.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=i.referrerPolicy),t.integrity==null&&(t.integrity=i.integrity)}var wc=null;function gv(t,i,s){if(wc===null){var l=new Map,u=wc=new Map;u.set(s,l)}else u=wc,l=u.get(s),l||(l=new Map,u.set(s,l));if(l.has(t))return l;for(l.set(t,null),s=s.getElementsByTagName(t),u=0;u<s.length;u++){var p=s[u];if(!(p[Na]||p[gn]||t==="link"&&p.getAttribute("rel")==="stylesheet")&&p.namespaceURI!=="http://www.w3.org/2000/svg"){var M=p.getAttribute(i)||"";M=t+M;var N=l.get(M);N?N.push(p):l.set(M,[p])}}return l}function vv(t,i,s){t=t.ownerDocument||t,t.head.insertBefore(s,i==="title"?t.querySelector("head > title"):null)}function $S(t,i,s){if(s===1||i.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;return i.rel==="stylesheet"?(t=i.disabled,typeof i.precedence=="string"&&t==null):!0;case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function _v(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}var Wo=null;function eM(){}function tM(t,i,s){if(Wo===null)throw Error(r(475));var l=Wo;if(i.type==="stylesheet"&&(typeof s.media!="string"||matchMedia(s.media).matches!==!1)&&(i.state.loading&4)===0){if(i.instance===null){var u=Es(s.href),p=t.querySelector(jo(u));if(p){t=p._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(l.count++,l=Rc.bind(l),t.then(l,l)),i.state.loading|=4,i.instance=p,ln(p);return}p=t.ownerDocument||t,s=pv(s),(u=vi.get(u))&&Rd(s,u),p=p.createElement("link"),ln(p);var M=p;M._p=new Promise(function(N,G){M.onload=N,M.onerror=G}),Un(p,"link",s),i.instance=p}l.stylesheets===null&&(l.stylesheets=new Map),l.stylesheets.set(i,t),(t=i.state.preload)&&(i.state.loading&3)===0&&(l.count++,i=Rc.bind(l),t.addEventListener("load",i),t.addEventListener("error",i))}}function nM(){if(Wo===null)throw Error(r(475));var t=Wo;return t.stylesheets&&t.count===0&&Dd(t,t.stylesheets),0<t.count?function(i){var s=setTimeout(function(){if(t.stylesheets&&Dd(t,t.stylesheets),t.unsuspend){var l=t.unsuspend;t.unsuspend=null,l()}},6e4);return t.unsuspend=i,function(){t.unsuspend=null,clearTimeout(s)}}:null}function Rc(){if(this.count--,this.count===0){if(this.stylesheets)Dd(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Cc=null;function Dd(t,i){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Cc=new Map,i.forEach(iM,t),Cc=null,Rc.call(t))}function iM(t,i){if(!(i.state.loading&4)){var s=Cc.get(t);if(s)var l=s.get(null);else{s=new Map,Cc.set(t,s);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),p=0;p<u.length;p++){var M=u[p];(M.nodeName==="LINK"||M.getAttribute("media")!=="not all")&&(s.set(M.dataset.precedence,M),l=M)}l&&s.set(null,l)}u=i.instance,M=u.getAttribute("data-precedence"),p=s.get(M)||l,p===l&&s.set(null,u),s.set(M,u),this.count++,l=Rc.bind(this),u.addEventListener("load",l),u.addEventListener("error",l),p?p.parentNode.insertBefore(u,p.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),i.state.loading|=4}}var qo={$$typeof:C,Provider:null,Consumer:null,_currentValue:se,_currentValue2:se,_threadCount:0};function aM(t,i,s,l,u,p,M,N){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Re(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Re(0),this.hiddenUpdates=Re(null),this.identifierPrefix=l,this.onUncaughtError=u,this.onCaughtError=p,this.onRecoverableError=M,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=N,this.incompleteTransitions=new Map}function xv(t,i,s,l,u,p,M,N,G,oe,_e,be){return t=new aM(t,i,s,M,N,G,oe,be),i=1,p===!0&&(i|=24),p=ei(3,null,null,i),t.current=p,p.stateNode=t,i=ff(),i.refCount++,t.pooledCache=i,i.refCount++,p.memoizedState={element:l,isDehydrated:s,cache:i},mf(p),t}function yv(t){return t?(t=ns,t):ns}function bv(t,i,s,l,u,p){u=yv(u),l.context===null?l.context=u:l.pendingContext=u,l=Ia(i),l.payload={element:s},p=p===void 0?null:p,p!==null&&(l.callback=p),s=Fa(t,l,i),s!==null&&(ri(s,t,i),Mo(s,t,i))}function Sv(t,i){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var s=t.retryLane;t.retryLane=s!==0&&s<i?s:i}}function Nd(t,i){Sv(t,i),(t=t.alternate)&&Sv(t,i)}function Mv(t){if(t.tag===13){var i=ts(t,67108864);i!==null&&ri(i,t,67108864),Nd(t,67108864)}}var Dc=!0;function rM(t,i,s,l){var u=I.T;I.T=null;var p=B.p;try{B.p=2,Ud(t,i,s,l)}finally{B.p=p,I.T=u}}function sM(t,i,s,l){var u=I.T;I.T=null;var p=B.p;try{B.p=8,Ud(t,i,s,l)}finally{B.p=p,I.T=u}}function Ud(t,i,s,l){if(Dc){var u=Ld(l);if(u===null)xd(t,i,l,Nc,s),Tv(t,l);else if(lM(u,t,i,s,l))l.stopPropagation();else if(Tv(t,l),i&4&&-1<oM.indexOf(t)){for(;u!==null;){var p=ea(u);if(p!==null)switch(p.tag){case 3:if(p=p.stateNode,p.current.memoizedState.isDehydrated){var M=Be(p.pendingLanes);if(M!==0){var N=p;for(N.pendingLanes|=2,N.entangledLanes|=2;M;){var G=1<<31-Oe(M);N.entanglements[1]|=G,M&=~G}Hi(p),(Ht&6)===0&&(pc=Ct()+500,Ho(0))}}break;case 13:N=ts(p,2),N!==null&&ri(N,p,2),gc(),Nd(p,2)}if(p=Ld(l),p===null&&xd(t,i,l,Nc,s),p===u)break;u=p}u!==null&&l.stopPropagation()}else xd(t,i,l,null,s)}}function Ld(t){return t=Fu(t),Od(t)}var Nc=null;function Od(t){if(Nc=null,t=Si(t),t!==null){var i=c(t);if(i===null)t=null;else{var s=i.tag;if(s===13){if(t=f(i),t!==null)return t;t=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;t=null}else i!==t&&(t=null)}}return Nc=t,null}function Ev(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(j()){case tn:return 2;case At:return 8;case Lt:case Ye:return 32;case H:return 268435456;default:return 32}default:return 32}}var Pd=!1,Ka=null,Qa=null,Ja=null,Yo=new Map,Zo=new Map,$a=[],oM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Tv(t,i){switch(t){case"focusin":case"focusout":Ka=null;break;case"dragenter":case"dragleave":Qa=null;break;case"mouseover":case"mouseout":Ja=null;break;case"pointerover":case"pointerout":Yo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Zo.delete(i.pointerId)}}function Ko(t,i,s,l,u,p){return t===null||t.nativeEvent!==p?(t={blockedOn:i,domEventName:s,eventSystemFlags:l,nativeEvent:p,targetContainers:[u]},i!==null&&(i=ea(i),i!==null&&Mv(i)),t):(t.eventSystemFlags|=l,i=t.targetContainers,u!==null&&i.indexOf(u)===-1&&i.push(u),t)}function lM(t,i,s,l,u){switch(i){case"focusin":return Ka=Ko(Ka,t,i,s,l,u),!0;case"dragenter":return Qa=Ko(Qa,t,i,s,l,u),!0;case"mouseover":return Ja=Ko(Ja,t,i,s,l,u),!0;case"pointerover":var p=u.pointerId;return Yo.set(p,Ko(Yo.get(p)||null,t,i,s,l,u)),!0;case"gotpointercapture":return p=u.pointerId,Zo.set(p,Ko(Zo.get(p)||null,t,i,s,l,u)),!0}return!1}function Av(t){var i=Si(t.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=f(s),i!==null){t.blockedOn=i,bi(t.priority,function(){if(s.tag===13){var l=ai();l=at(l);var u=ts(s,l);u!==null&&ri(u,s,l),Nd(s,l)}});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){t.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Uc(t){if(t.blockedOn!==null)return!1;for(var i=t.targetContainers;0<i.length;){var s=Ld(t.nativeEvent);if(s===null){s=t.nativeEvent;var l=new s.constructor(s.type,s);Iu=l,s.target.dispatchEvent(l),Iu=null}else return i=ea(s),i!==null&&Mv(i),t.blockedOn=s,!1;i.shift()}return!0}function wv(t,i,s){Uc(t)&&s.delete(i)}function cM(){Pd=!1,Ka!==null&&Uc(Ka)&&(Ka=null),Qa!==null&&Uc(Qa)&&(Qa=null),Ja!==null&&Uc(Ja)&&(Ja=null),Yo.forEach(wv),Zo.forEach(wv)}function Lc(t,i){t.blockedOn===i&&(t.blockedOn=null,Pd||(Pd=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,cM)))}var Oc=null;function Rv(t){Oc!==t&&(Oc=t,a.unstable_scheduleCallback(a.unstable_NormalPriority,function(){Oc===t&&(Oc=null);for(var i=0;i<t.length;i+=3){var s=t[i],l=t[i+1],u=t[i+2];if(typeof l!="function"){if(Od(l||s)===null)continue;break}var p=ea(s);p!==null&&(t.splice(i,3),i-=3,Of(p,{pending:!0,data:u,method:s.method,action:l},l,u))}}))}function Qo(t){function i(G){return Lc(G,t)}Ka!==null&&Lc(Ka,t),Qa!==null&&Lc(Qa,t),Ja!==null&&Lc(Ja,t),Yo.forEach(i),Zo.forEach(i);for(var s=0;s<$a.length;s++){var l=$a[s];l.blockedOn===t&&(l.blockedOn=null)}for(;0<$a.length&&(s=$a[0],s.blockedOn===null);)Av(s),s.blockedOn===null&&$a.shift();if(s=(t.ownerDocument||t).$$reactFormReplay,s!=null)for(l=0;l<s.length;l+=3){var u=s[l],p=s[l+1],M=u[Mn]||null;if(typeof p=="function")M||Rv(s);else if(M){var N=null;if(p&&p.hasAttribute("formAction")){if(u=p,M=p[Mn]||null)N=M.formAction;else if(Od(u)!==null)continue}else N=M.action;typeof N=="function"?s[l+1]=N:(s.splice(l,3),l-=3),Rv(s)}}}function Id(t){this._internalRoot=t}Pc.prototype.render=Id.prototype.render=function(t){var i=this._internalRoot;if(i===null)throw Error(r(409));var s=i.current,l=ai();bv(s,l,t,i,null,null)},Pc.prototype.unmount=Id.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var i=t.containerInfo;bv(t.current,2,null,t,null,null),gc(),i[Da]=null}};function Pc(t){this._internalRoot=t}Pc.prototype.unstable_scheduleHydration=function(t){if(t){var i=Dt();t={blockedOn:null,target:t,priority:i};for(var s=0;s<$a.length&&i!==0&&i<$a[s].priority;s++);$a.splice(s,0,t),s===0&&Av(t)}};var Cv=e.version;if(Cv!=="19.1.0")throw Error(r(527,Cv,"19.1.0"));B.findDOMNode=function(t){var i=t._reactInternals;if(i===void 0)throw typeof t.render=="function"?Error(r(188)):(t=Object.keys(t).join(","),Error(r(268,t)));return t=m(i),t=t!==null?d(t):null,t=t===null?null:t.stateNode,t};var uM={bundleType:0,version:"19.1.0",rendererPackageName:"react-dom",currentDispatcherRef:I,reconcilerVersion:"19.1.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ic=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ic.isDisabled&&Ic.supportsFiber)try{ve=Ic.inject(uM),xe=Ic}catch{}}return $o.createRoot=function(t,i){if(!o(t))throw Error(r(299));var s=!1,l="",u=Xg,p=Wg,M=qg,N=null;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onUncaughtError!==void 0&&(u=i.onUncaughtError),i.onCaughtError!==void 0&&(p=i.onCaughtError),i.onRecoverableError!==void 0&&(M=i.onRecoverableError),i.unstable_transitionCallbacks!==void 0&&(N=i.unstable_transitionCallbacks)),i=xv(t,1,!1,null,null,s,l,u,p,M,N,null),t[Da]=i.current,_d(t),new Id(i)},$o.hydrateRoot=function(t,i,s){if(!o(t))throw Error(r(299));var l=!1,u="",p=Xg,M=Wg,N=qg,G=null,oe=null;return s!=null&&(s.unstable_strictMode===!0&&(l=!0),s.identifierPrefix!==void 0&&(u=s.identifierPrefix),s.onUncaughtError!==void 0&&(p=s.onUncaughtError),s.onCaughtError!==void 0&&(M=s.onCaughtError),s.onRecoverableError!==void 0&&(N=s.onRecoverableError),s.unstable_transitionCallbacks!==void 0&&(G=s.unstable_transitionCallbacks),s.formState!==void 0&&(oe=s.formState)),i=xv(t,1,!0,i,s??null,l,u,p,M,N,G,oe),i.context=yv(null),s=i.current,l=ai(),l=at(l),u=Ia(l),u.callback=null,Fa(s,u,l),s=l,i.current.lanes=s,Fe(i,s),Hi(i),t[Da]=i.current,_d(t),new Pc(i)},$o.version="19.1.0",$o}var Bv;function yM(){if(Bv)return zd.exports;Bv=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(e){console.error(e)}}return a(),zd.exports=xM(),zd.exports}var bM=yM(),q=Cp();const Rn=gx(q),SM=dM({__proto__:null,default:Rn},[q]),Hv=a=>{let e;const n=new Set,r=(d,g)=>{const b=typeof d=="function"?d(e):d;if(!Object.is(b,e)){const _=e;e=g??(typeof b!="object"||b===null)?b:Object.assign({},e,b),n.forEach(y=>y(e,_))}},o=()=>e,h={setState:r,getState:o,getInitialState:()=>m,subscribe:d=>(n.add(d),()=>n.delete(d))},m=e=a(r,o,h);return h},MM=(a=>a?Hv(a):Hv),EM=a=>a;function TM(a,e=EM){const n=Rn.useSyncExternalStore(a.subscribe,Rn.useCallback(()=>e(a.getState()),[a,e]),Rn.useCallback(()=>e(a.getInitialState()),[a,e]));return Rn.useDebugValue(n),n}const kv=a=>{const e=MM(a),n=r=>TM(e,r);return Object.assign(n,e),n},AM=(a=>a?kv(a):kv),Gv={id:`project-${Date.now()}`,name:"My Game",mode:"3d",objects:[],blocks:[],customCode:`// Custom game code
// Available: scene, objects, physics
// Example:
// objects.forEach(obj => {
//   obj.position.y += 0.01;
// });

function onStart() {
  console.log("Game started!");
}

function onUpdate(delta) {
  // Called every frame
}

function onKeyDown(key) {
  // Handle key input
}
`,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};function Vd(){return Math.random().toString(36).slice(2,10)}const wM={event_start:"When Game Starts",event_key:"When Key Pressed",event_click:"When Object Clicked",action_move:"Move Object",action_rotate:"Rotate Object",action_scale:"Scale Object",action_color:"Change Color",action_print:"Print Message",action_destroy:"Destroy Object",action_spawn:"Spawn Object",control_if:"If Condition",control_loop:"Repeat",control_wait:"Wait",variable_set:"Set Variable",variable_get:"Get Variable",math_add:"Add Numbers",math_random:"Random Number",logic_compare:"Compare"},RM={event_start:[],event_key:[{name:"key",type:"string",value:"Space",options:["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","W","A","S","D"]}],event_click:[{name:"object",type:"object",value:""}],action_move:[{name:"object",type:"object",value:""},{name:"x",type:"number",value:0},{name:"y",type:"number",value:1},{name:"z",type:"number",value:0}],action_rotate:[{name:"object",type:"object",value:""},{name:"x",type:"number",value:0},{name:"y",type:"number",value:45},{name:"z",type:"number",value:0}],action_scale:[{name:"object",type:"object",value:""},{name:"x",type:"number",value:2},{name:"y",type:"number",value:2},{name:"z",type:"number",value:2}],action_color:[{name:"object",type:"object",value:""},{name:"color",type:"color",value:"#ff0000"}],action_print:[{name:"message",type:"string",value:"Hello world!"}],action_destroy:[{name:"object",type:"object",value:""}],action_spawn:[{name:"type",type:"string",value:"cube",options:["cube","sphere","cylinder"]},{name:"x",type:"number",value:0},{name:"y",type:"number",value:1},{name:"z",type:"number",value:0}],control_if:[{name:"condition",type:"boolean",value:!0}],control_loop:[{name:"times",type:"number",value:10}],control_wait:[{name:"seconds",type:"number",value:1}],variable_set:[{name:"name",type:"string",value:"score"},{name:"value",type:"number",value:0}],variable_get:[{name:"name",type:"string",value:"score"}],math_add:[{name:"a",type:"number",value:0},{name:"b",type:"number",value:1}],math_random:[{name:"min",type:"number",value:0},{name:"max",type:"number",value:100}],logic_compare:[{name:"a",type:"number",value:0},{name:"op",type:"string",value:"==",options:["==","!=",">","<",">=","<="]},{name:"b",type:"number",value:0}]},CM={cube:"#3b82f6",sphere:"#8b5cf6",cylinder:"#10b981",plane:"#6b7280",cone:"#f59e0b",torus:"#ec4899",character:"#ef4444",tree:"#22c55e",house:"#f97316",car:"#64748b",coin:"#eab308",platform:"#78716c",ramp:"#a78bfa",wall:"#94a3b8",pillar:"#c4b5fd","ai-generated":"#06b6d4"},On=AM((a,e)=>({project:Gv,selectedObjectId:null,selectedBlockId:null,activeTool:"select",activePanel:"scene",isSaving:!1,isPlaying:!1,isDirty:!1,setMode:n=>a(r=>({project:{...r.project,mode:n},isDirty:!0})),setActiveTool:n=>a({activeTool:n}),setActivePanel:n=>a({activePanel:n}),setSelectedObject:n=>a({selectedObjectId:n}),setSelectedBlock:n=>a({selectedBlockId:n}),addObject:(n,r,o)=>{const c=Vd(),f={id:c,name:r||`${n}-${c.slice(0,4)}`,type:n,transform:{position:[(Math.random()-.5)*4,n==="plane"?0:1,(Math.random()-.5)*4],rotation:[0,0,0],scale:[1,1,1]},color:o||CM[n]||"#3b82f6",visible:!0,locked:!1};a(h=>({project:{...h.project,objects:[...h.project.objects,f]},selectedObjectId:c,isDirty:!0}))},removeObject:n=>a(r=>({project:{...r.project,objects:r.project.objects.filter(o=>o.id!==n)},selectedObjectId:r.selectedObjectId===n?null:r.selectedObjectId,isDirty:!0})),updateObject:(n,r)=>a(o=>({project:{...o.project,objects:o.project.objects.map(c=>c.id===n?{...c,...r}:c)},isDirty:!0})),duplicateObject:n=>{const r=e().project.objects.find(f=>f.id===n);if(!r)return;const o=Vd(),c={...r,id:o,name:`${r.name}-copy`,transform:{...r.transform,position:[r.transform.position[0]+1,r.transform.position[1],r.transform.position[2]+1]}};a(f=>({project:{...f.project,objects:[...f.project.objects,c]},selectedObjectId:o,isDirty:!0}))},addBlock:(n,r=50,o=50)=>{const c=Vd(),f={id:c,type:n,x:r,y:o,params:JSON.parse(JSON.stringify(RM[n]||[])),label:wM[n]};a(h=>({project:{...h.project,blocks:[...h.project.blocks,f]},selectedBlockId:c,isDirty:!0}))},removeBlock:n=>a(r=>({project:{...r.project,blocks:r.project.blocks.filter(o=>o.id!==n)},selectedBlockId:r.selectedBlockId===n?null:r.selectedBlockId,isDirty:!0})),updateBlock:(n,r)=>a(o=>({project:{...o.project,blocks:o.project.blocks.map(c=>c.id===n?{...c,...r}:c)},isDirty:!0})),updateBlockParam:(n,r,o)=>a(c=>({project:{...c.project,blocks:c.project.blocks.map(f=>f.id===n?{...f,params:f.params.map(h=>h.name===r?{...h,value:o}:h)}:f)},isDirty:!0})),setCustomCode:n=>a(r=>({project:{...r.project,customCode:n},isDirty:!0})),setProjectName:n=>a(r=>({project:{...r.project,name:n},isDirty:!0})),saveProject:async()=>{a({isSaving:!0});try{const{project:n}=e(),r={...n,updatedAt:new Date().toISOString()};try{if((await fetch("/sandbox/api/save",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok){localStorage.setItem("sandbox-last-project",n.id),a({project:r,isDirty:!1});return}}catch{}localStorage.setItem(`sandbox-project-${n.id}`,JSON.stringify(r)),localStorage.setItem("sandbox-last-project",n.id),a({project:r,isDirty:!1})}finally{a({isSaving:!1})}},loadProject:async()=>{const n=localStorage.getItem("sandbox-last-project");if(n){try{const o=await fetch(`/sandbox/api/load/${n}`);if(o.ok){const c=await o.json();a({project:c,isDirty:!1});return}}catch{}const r=localStorage.getItem(`sandbox-project-${n}`);if(r)try{const o=JSON.parse(r);a({project:o,isDirty:!1});return}catch{}}},newProject:()=>{const n=`project-${Date.now()}`;a({project:{...Gv,id:n,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},selectedObjectId:null,selectedBlockId:null,isDirty:!1})},setPlaying:n=>a({isPlaying:n})}));const DM=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),NM=a=>a.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,n,r)=>r?r.toUpperCase():n.toLowerCase()),Vv=a=>{const e=NM(a);return e.charAt(0).toUpperCase()+e.slice(1)},_x=(...a)=>a.filter((e,n,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===n).join(" ").trim(),UM=a=>{for(const e in a)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};var LM={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const OM=q.forwardRef(({color:a="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:o="",children:c,iconNode:f,...h},m)=>q.createElement("svg",{ref:m,...LM,width:e,height:e,stroke:a,strokeWidth:r?Number(n)*24/Number(e):n,className:_x("lucide",o),...!c&&!UM(h)&&{"aria-hidden":"true"},...h},[...f.map(([d,g])=>q.createElement(d,g)),...Array.isArray(c)?c:[c]]));const vt=(a,e)=>{const n=q.forwardRef(({className:r,...o},c)=>q.createElement(OM,{ref:c,iconNode:e,className:_x(`lucide-${DM(Vv(a))}`,`lucide-${a}`,r),...o}));return n.displayName=Vv(a),n};const PM=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]],Hs=vt("box",PM);const IM=[["path",{d:"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",key:"5owen"}],["circle",{cx:"7",cy:"17",r:"2",key:"u2ysq9"}],["path",{d:"M9 17h6",key:"r8uit2"}],["circle",{cx:"17",cy:"17",r:"2",key:"axvx0g"}]],FM=vt("car",IM);const zM=[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]],BM=vt("check-check",zM);const HM=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],xx=vt("chevron-down",HM);const kM=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],GM=vt("chevron-right",kM);const VM=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],jM=vt("chevron-up",VM);const XM=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],WM=vt("circle",XM);const qM=[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],YM=vt("code-xml",qM);const ZM=[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]],KM=vt("coins",ZM);const QM=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],yx=vt("copy",QM);const JM=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5v14a9 3 0 0 0 18 0V5",key:"aqi0yr"}]],$M=vt("cylinder",JM);const e1=[["path",{d:"M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3",key:"19sr3x"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],t1=vt("donut",e1);const n1=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],i1=vt("eye-off",n1);const a1=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],r1=vt("eye",a1);const s1=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],o1=vt("house",s1);const l1=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],c1=vt("layers",l1);const u1=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],f1=vt("loader-circle",u1);const d1=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 9.9-1",key:"1mm8w8"}]],h1=vt("lock-open",d1);const p1=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],m1=vt("lock",p1);const g1=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],v1=vt("maximize-2",g1);const _1=[["path",{d:"M5 12h14",key:"1ays0h"}]],x1=vt("minus",_1);const y1=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],b1=vt("monitor",y1);const S1=[["path",{d:"M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",key:"edeuup"}]],M1=vt("mouse-pointer-2",S1);const E1=[["path",{d:"M12 2v20",key:"t6zp3m"}],["path",{d:"m15 19-3 3-3-3",key:"11eu04"}],["path",{d:"m19 9 3 3-3 3",key:"1mg7y2"}],["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"m5 9-3 3 3 3",key:"j64kie"}],["path",{d:"m9 5 3-3 3 3",key:"l8vdw6"}]],T1=vt("move",E1);const A1=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M9 21V9",key:"1oto5p"}]],w1=vt("panels-top-left",A1);const R1=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],Dp=vt("play",R1);const C1=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],bx=vt("plus",C1);const D1=[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",key:"w46dr5"}]],N1=vt("puzzle",D1);const U1=[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]],L1=vt("rotate-cw",U1);const O1=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],P1=vt("save",O1);const I1=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],F1=vt("search",I1);const z1=[["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}],["path",{d:"M3.103 6.034h17.794",key:"awc11p"}],["path",{d:"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",key:"o988cm"}]],B1=vt("shopping-bag",z1);const H1=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],k1=vt("sparkles",H1);const G1=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],Sx=vt("square",G1);const V1=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Mx=vt("trash-2",V1);const j1=[["path",{d:"m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z",key:"cpyugq"}],["path",{d:"M12 22v-3",key:"kmzjlo"}]],X1=vt("tree-pine",j1);const W1=[["path",{d:"M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"14u9p9"}]],jv=vt("triangle",W1);const q1=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],Y1=vt("user",q1);const Z1=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Ex=vt("x",Z1);function K1(){const{project:a,activeTool:e,setActiveTool:n,isPlaying:r,setPlaying:o,saveProject:c,isSaving:f,isDirty:h,setMode:m,newProject:d,setProjectName:g,addObject:b}=On(),_=[{id:"select",icon:M1,label:"Select (V)"},{id:"move",icon:T1,label:"Move (G)"},{id:"rotate",icon:L1,label:"Rotate (R)"},{id:"scale",icon:v1,label:"Scale (S)"}];return z.jsxs("div",{className:"flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-black/40 backdrop-blur-sm",children:[z.jsxs("div",{className:"flex items-center gap-2 mr-3",children:[z.jsx("div",{className:"text-blue-400 font-bold text-sm",children:"🎮"}),z.jsx("input",{className:"bg-transparent border-none text-white font-semibold text-sm focus:outline-none focus:underline underline-offset-2 min-w-0 max-w-36",value:a.name,onChange:y=>g(y.target.value)}),h&&z.jsx("span",{className:"text-yellow-400 text-xs",children:"●"})]}),z.jsx("div",{className:"w-px h-6 bg-white/10"}),z.jsx("div",{className:"flex items-center gap-1 bg-white/5 rounded-lg p-0.5",children:_.map(y=>{const S=y.icon;return z.jsx("button",{onClick:()=>n(y.id),title:y.label,className:`p-1.5 rounded-md transition-colors ${e===y.id?"bg-blue-600 text-white":"text-gray-400 hover:text-white hover:bg-white/10"}`,children:z.jsx(S,{size:14})},y.id)})}),z.jsx("div",{className:"w-px h-6 bg-white/10"}),z.jsxs("div",{className:"flex items-center gap-1 bg-white/5 rounded-lg p-0.5",children:[z.jsxs("button",{onClick:()=>m("3d"),className:`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${a.mode==="3d"?"bg-purple-600 text-white":"text-gray-400 hover:text-white hover:bg-white/10"}`,children:[z.jsx(b1,{size:12}),"3D"]}),z.jsxs("button",{onClick:()=>m("2d"),className:`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${a.mode==="2d"?"bg-purple-600 text-white":"text-gray-400 hover:text-white hover:bg-white/10"}`,children:[z.jsx(w1,{size:12}),"2D"]})]}),z.jsx("div",{className:"w-px h-6 bg-white/10"}),z.jsx("div",{className:"flex items-center gap-1",children:z.jsxs("button",{onClick:()=>b("cube","Cube","#3b82f6"),className:"flex items-center gap-1 px-2 py-1.5 bg-white/5 hover:bg-white/10 rounded text-xs text-gray-300 transition-colors",title:"Add Cube",children:[z.jsx(bx,{size:12}),z.jsx("span",{children:"Object"})]})}),z.jsxs("div",{className:"ml-auto flex items-center gap-2",children:[z.jsx("button",{onClick:()=>{o(!r)},className:`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${r?"bg-red-600 hover:bg-red-700 text-white shadow-red-500/30 shadow-md":"bg-green-600 hover:bg-green-700 text-white shadow-green-500/30 shadow-md"}`,children:r?z.jsxs(z.Fragment,{children:[z.jsx(Sx,{size:11})," Stop"]}):z.jsxs(z.Fragment,{children:[z.jsx(Dp,{size:11})," Play"]})}),z.jsxs("button",{onClick:c,disabled:f,className:`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${h?"bg-blue-600 hover:bg-blue-700 text-white":"bg-white/5 hover:bg-white/10 text-gray-400"}`,children:[z.jsx(P1,{size:12,className:f?"animate-spin":""}),f?"Saving...":h?"Save*":"Saved"]}),z.jsx("button",{onClick:d,className:"px-2 py-1.5 rounded text-xs text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors",children:"New"})]})]})}const Q1={cube:Hs,sphere:WM,cylinder:$M,plane:x1,cone:jv,torus:t1,character:Y1,tree:X1,house:o1,car:FM,coin:KM,platform:Hs,ramp:jv,wall:Hs,pillar:Hs,"ai-generated":Hs};function J1({obj:a}){const{selectedObjectId:e,setSelectedObject:n,updateObject:r,removeObject:o,duplicateObject:c}=On(),f=a.id===e,h=Q1[a.type]||Hs;return z.jsxs("div",{className:`group flex items-center gap-1 px-2 py-1.5 rounded cursor-pointer text-sm transition-colors ${f?"bg-blue-600/20 text-blue-300":"hover:bg-white/5 text-gray-300"}`,onClick:()=>n(f?null:a.id),children:[z.jsx(h,{size:14,className:`shrink-0 ${f?"text-blue-400":"text-gray-500"}`}),z.jsx("div",{className:"w-3 h-3 rounded-sm shrink-0",style:{backgroundColor:a.color}}),z.jsx("span",{className:"flex-1 truncate text-xs",children:a.name}),z.jsxs("div",{className:"hidden group-hover:flex items-center gap-0.5",children:[z.jsx("button",{onClick:m=>{m.stopPropagation(),r(a.id,{visible:!a.visible})},className:"p-0.5 rounded hover:bg-white/10",title:a.visible?"Hide":"Show",children:a.visible?z.jsx(r1,{size:12}):z.jsx(i1,{size:12,className:"text-gray-500"})}),z.jsx("button",{onClick:m=>{m.stopPropagation(),r(a.id,{locked:!a.locked})},className:"p-0.5 rounded hover:bg-white/10",title:a.locked?"Unlock":"Lock",children:a.locked?z.jsx(m1,{size:12,className:"text-yellow-400"}):z.jsx(h1,{size:12})}),z.jsx("button",{onClick:m=>{m.stopPropagation(),c(a.id)},className:"p-0.5 rounded hover:bg-white/10",title:"Duplicate",children:z.jsx(yx,{size:12})}),z.jsx("button",{onClick:m=>{m.stopPropagation(),o(a.id)},className:"p-0.5 rounded hover:bg-red-500/20 text-red-400",title:"Delete",children:z.jsx(Mx,{size:12})})]})]})}function $1({obj:a}){const{updateObject:e}=On(),n=(r,o,c)=>{const f=parseFloat(c);if(isNaN(f))return;const h=[...a.transform[r]];h[o]=f,e(a.id,{transform:{...a.transform,[r]:h}})};return z.jsxs("div",{className:"border-t border-white/10 mt-2 pt-2",children:[z.jsx("div",{className:"text-xs text-gray-400 uppercase font-semibold px-2 mb-2",children:"Properties"}),z.jsxs("div",{className:"px-2 space-y-2",children:[z.jsxs("div",{children:[z.jsx("label",{className:"text-xs text-gray-500 block mb-1",children:"Name"}),z.jsx("input",{className:"w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white",value:a.name,onChange:r=>e(a.id,{name:r.target.value})})]}),z.jsxs("div",{children:[z.jsx("label",{className:"text-xs text-gray-500 block mb-1",children:"Color"}),z.jsxs("div",{className:"flex gap-2 items-center",children:[z.jsx("input",{type:"color",value:a.color,onChange:r=>e(a.id,{color:r.target.value}),className:"w-8 h-6 rounded border-0 cursor-pointer"}),z.jsx("input",{className:"flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono",value:a.color,onChange:r=>e(a.id,{color:r.target.value})})]})]}),["position","rotation","scale"].map(r=>z.jsxs("div",{children:[z.jsx("label",{className:"text-xs text-gray-500 block mb-1 capitalize",children:r}),z.jsx("div",{className:"grid grid-cols-3 gap-1",children:["X","Y","Z"].map((o,c)=>z.jsxs("div",{className:"relative",children:[z.jsx("span",{className:`absolute left-1.5 top-1/2 -translate-y-1/2 text-xs font-bold ${o==="X"?"text-red-400":o==="Y"?"text-green-400":"text-blue-400"}`,children:o}),z.jsx("input",{type:"number",step:r==="rotation"?5:.1,className:"w-full bg-white/5 border border-white/10 rounded pl-5 pr-1 py-1 text-xs text-white",value:a.transform[r][c],onChange:f=>n(r,c,f.target.value)})]},o))})]},r))]})]})}function eE(){const{project:a,selectedObjectId:e}=On(),n=a.objects.find(c=>c.id===e),[r,o]=q.useState(!0);return z.jsxs("div",{className:"flex flex-col h-full overflow-hidden",children:[z.jsxs("div",{className:"flex items-center justify-between px-3 py-2 text-xs text-gray-400 uppercase font-semibold tracking-wider cursor-pointer hover:bg-white/5",onClick:()=>o(c=>!c),children:[z.jsxs("span",{children:["Scene Objects (",a.objects.length,")"]}),r?z.jsx(xx,{size:14}):z.jsx(GM,{size:14})]}),r&&z.jsx("div",{className:"flex-1 overflow-y-auto px-1 py-1 space-y-0.5",children:a.objects.length===0?z.jsx("div",{className:"text-center py-8 text-gray-500 text-xs",children:"No objects yet. Add from Marketplace."}):a.objects.map(c=>z.jsx(J1,{obj:c},c.id))}),n&&z.jsx($1,{obj:n})]})}const tE=[{id:"1",name:"Hero Character",type:"character",category:"character",color:"#ef4444",description:"A brave hero ready for adventure",tags:["hero","player","character"]},{id:"2",name:"Enemy Bot",type:"character",category:"character",color:"#8b5cf6",description:"A menacing robot enemy",tags:["enemy","robot","npc"]},{id:"3",name:"Friendly NPC",type:"character",category:"character",color:"#22c55e",description:"A friendly helper NPC",tags:["npc","friendly","character"]},{id:"4",name:"Pine Tree",type:"tree",category:"environment",color:"#166534",description:"A tall pine tree",tags:["tree","nature","environment"]},{id:"5",name:"Fantasy House",type:"house",category:"environment",color:"#b45309",description:"A cozy fantasy-style house",tags:["house","building","environment"]},{id:"6",name:"Race Car",type:"car",category:"vehicle",color:"#dc2626",description:"A fast racing car",tags:["car","vehicle","speed"]},{id:"7",name:"Gold Coin",type:"coin",category:"prop",color:"#eab308",description:"Collectible gold coin",tags:["coin","collectible","prop"]},{id:"8",name:"Stone Platform",type:"platform",category:"environment",color:"#6b7280",description:"A solid stone platform",tags:["platform","stone","level"]},{id:"9",name:"Wooden Ramp",type:"ramp",category:"environment",color:"#92400e",description:"A wooden ramp for jumping",tags:["ramp","jump","level"]},{id:"10",name:"Brick Wall",type:"wall",category:"environment",color:"#9f1239",description:"A sturdy brick wall",tags:["wall","barrier","environment"]},{id:"11",name:"Stone Pillar",type:"pillar",category:"environment",color:"#d1d5db",description:"An ancient stone pillar",tags:["pillar","column","ancient"]},{id:"12",name:"Crystal Sphere",type:"sphere",category:"prop",color:"#7c3aed",description:"A magical crystal ball",tags:["crystal","magic","orb"]},{id:"13",name:"Red Cube",type:"cube",category:"prop",color:"#ef4444",description:"A basic red cube",tags:["cube","basic","block"]},{id:"14",name:"Volcano Cone",type:"cone",category:"environment",color:"#7c2d12",description:"A dramatic volcano cone",tags:["volcano","mountain","danger"]},{id:"15",name:"Portal Ring",type:"torus",category:"prop",color:"#06b6d4",description:"A magical portal ring",tags:["portal","magic","ring"]},{id:"16",name:"Ground Plane",type:"plane",category:"environment",color:"#1e3a1e",description:"A flat ground plane",tags:["ground","floor","environment"]},{id:"17",name:"Ice Sphere",type:"sphere",category:"environment",color:"#bae6fd",description:"A frozen ice sphere",tags:["ice","frozen","sphere"]},{id:"18",name:"Dark Tower",type:"pillar",category:"environment",color:"#1c1917",description:"A dark stone tower",tags:["tower","dark","building"]}],nE=["all","character","environment","vehicle","prop","ai-generated"];async function iE(a){const e=await fetch("/api/sandbox/ai-generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:a})});if(!e.ok)throw new Error("Failed to generate");return e.json()}function aE(){const{addObject:a}=On(),[e,n]=q.useState(""),[r,o]=q.useState("all"),[c,f]=q.useState(""),[h,m]=q.useState(!1),[d,g]=q.useState(""),[b,_]=q.useState([]),y=[...tE,...b].filter(v=>{const T=!e||v.name.toLowerCase().includes(e.toLowerCase())||v.tags.some(R=>R.includes(e.toLowerCase())),C=r==="all"||v.category===r;return T&&C}),S=v=>{a(v.type,v.name,v.color)},A=async()=>{if(c.trim()){m(!0),g("");try{const v=await iE(c),T={id:`ai-${Date.now()}`,name:v.name,type:v.type,category:"ai-generated",color:v.color,description:v.description||c,tags:["ai-generated",...c.toLowerCase().split(" ").slice(0,3)]};_(C=>[...C,T]),a(v.type,v.name,v.color),f("")}catch{g("AI generation failed. Adding a basic object instead."),a("cube",`AI: ${c.slice(0,20)}`,"#06b6d4"),f("")}finally{m(!1)}}},x={character:"text-red-400",environment:"text-green-400",vehicle:"text-blue-400",prop:"text-yellow-400","ai-generated":"text-cyan-400"};return z.jsxs("div",{className:"flex flex-col h-full",children:[z.jsxs("div",{className:"px-3 py-2 border-b border-white/10",children:[z.jsx("div",{className:"text-xs text-gray-400 uppercase font-semibold tracking-wider mb-2",children:"AI Generate Object"}),z.jsxs("div",{className:"flex gap-1",children:[z.jsx("input",{className:"flex-1 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-white placeholder-gray-500",placeholder:'Describe an object (e.g. "flying dragon")',value:c,onChange:v=>f(v.target.value),onKeyDown:v=>v.key==="Enter"&&A(),disabled:h}),z.jsxs("button",{onClick:A,disabled:h||!c.trim(),className:"flex items-center gap-1 px-2 py-1.5 bg-cyan-600/80 hover:bg-cyan-600 disabled:opacity-50 rounded text-xs font-medium transition-colors",children:[h?z.jsx(f1,{size:12,className:"animate-spin"}):z.jsx(k1,{size:12}),h?"":"Create"]})]}),d&&z.jsx("p",{className:"text-red-400 text-xs mt-1",children:d}),z.jsx("p",{className:"text-gray-600 text-xs mt-1",children:"Uses Gemini AI · charged to Replit credits"})]}),z.jsxs("div",{className:"px-3 py-2 border-b border-white/10 space-y-2",children:[z.jsxs("div",{className:"relative",children:[z.jsx(F1,{size:12,className:"absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"}),z.jsx("input",{className:"w-full bg-white/5 border border-white/10 rounded pl-7 pr-2 py-1.5 text-xs text-white placeholder-gray-500",placeholder:"Search objects...",value:e,onChange:v=>n(v.target.value)})]}),z.jsx("div",{className:"flex flex-wrap gap-1",children:nE.map(v=>z.jsx("button",{onClick:()=>o(v),className:`px-2 py-0.5 rounded text-xs font-medium capitalize transition-colors ${r===v?"bg-blue-600 text-white":"bg-white/5 text-gray-400 hover:bg-white/10"}`,children:v},v))})]}),z.jsxs("div",{className:"flex-1 overflow-y-auto px-2 py-2 grid grid-cols-2 gap-1.5 content-start",children:[y.map(v=>z.jsxs("button",{onClick:()=>S(v),className:"group flex flex-col gap-1.5 p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-left transition-all",children:[z.jsxs("div",{className:"flex items-start justify-between",children:[z.jsx("div",{className:"w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm",style:{backgroundColor:v.color+"33",border:`2px solid ${v.color}`},children:z.jsx("span",{style:{color:v.color},children:v.type==="sphere"?"●":v.type==="cylinder"?"⬟":v.type==="character"?"♟":"■"})}),z.jsx("div",{className:"opacity-0 group-hover:opacity-100 transition-opacity",children:z.jsx(bx,{size:14,className:"text-blue-400"})})]}),z.jsx("div",{className:"text-xs font-medium text-white leading-tight",children:v.name}),z.jsxs("div",{className:`text-xs capitalize ${x[v.category]||"text-gray-500"}`,children:[v.category,v.category==="ai-generated"&&z.jsx("span",{className:"ml-1 text-cyan-400",children:"✨"})]})]},v.id)),y.length===0&&z.jsx("div",{className:"col-span-2 text-center py-8 text-gray-500 text-xs",children:"No items found"})]})]})}function rE(){const{activePanel:a,setActivePanel:e}=On(),n=[{id:"scene",icon:c1,label:"Scene"},{id:"marketplace",icon:B1,label:"Market"}];return z.jsxs("div",{className:"flex flex-col h-full border-r border-white/10 bg-black/20",children:[z.jsx("div",{className:"flex border-b border-white/10",children:n.map(({id:r,icon:o,label:c})=>z.jsxs("button",{onClick:()=>e(r),className:`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors ${a===r?"text-white border-b-2 border-blue-500 bg-blue-500/10":"text-gray-500 hover:text-gray-300"}`,children:[z.jsx(o,{size:13}),c]},r))}),z.jsx("div",{className:"flex-1 overflow-hidden",children:a==="scene"||a==="blocks"||a==="code"?z.jsx(eE,{}):z.jsx(aE,{})})]})}const Np="183",sE=0,Xv=1,oE=2,pu=1,Tx=2,ll=3,dr=0,Jn=1,Ea=2,Aa=0,Vs=1,Wv=2,qv=3,Yv=4,lE=5,zr=100,cE=101,uE=102,fE=103,dE=104,hE=200,pE=201,mE=202,gE=203,Dh=204,Nh=205,vE=206,_E=207,xE=208,yE=209,bE=210,SE=211,ME=212,EE=213,TE=214,Uh=0,Lh=1,Oh=2,Ws=3,Ph=4,Ih=5,Fh=6,zh=7,Ax=0,AE=1,wE=2,Wi=0,wx=1,Rx=2,Cx=3,Up=4,Dx=5,Nx=6,Ux=7,Lx=300,Gr=301,qs=302,jd=303,Xd=304,Cu=306,Bh=1e3,Ta=1001,Hh=1002,Ln=1003,RE=1004,Fc=1005,Bn=1006,Wd=1007,Hr=1008,ci=1009,Ox=1010,Px=1011,ml=1012,Lp=1013,Zi=1014,ji=1015,Ra=1016,Op=1017,Pp=1018,gl=1020,Ix=35902,Fx=35899,zx=1021,Bx=1022,Ni=1023,Ca=1026,kr=1027,Hx=1028,Ip=1029,Ys=1030,Fp=1031,zp=1033,mu=33776,gu=33777,vu=33778,_u=33779,kh=35840,Gh=35841,Vh=35842,jh=35843,Xh=36196,Wh=37492,qh=37496,Yh=37488,Zh=37489,Kh=37490,Qh=37491,Jh=37808,$h=37809,ep=37810,tp=37811,np=37812,ip=37813,ap=37814,rp=37815,sp=37816,op=37817,lp=37818,cp=37819,up=37820,fp=37821,dp=36492,hp=36494,pp=36495,mp=36283,gp=36284,vp=36285,_p=36286,CE=3200,kx=0,DE=1,cr="",xi="srgb",Zs="srgb-linear",Su="linear",Gt="srgb",As=7680,Zv=519,NE=512,UE=513,LE=514,Bp=515,OE=516,PE=517,Hp=518,IE=519,Kv=35044,Qv="300 es",Xi=2e3,vl=2001;function FE(a){for(let e=a.length-1;e>=0;--e)if(a[e]>=65535)return!0;return!1}function Mu(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function zE(){const a=Mu("canvas");return a.style.display="block",a}const Jv={};function $v(...a){const e="THREE."+a.shift();console.log(e,...a)}function Gx(a){const e=a[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=a[1];n&&n.isStackTrace?a[0]+=" "+n.getLocation():a[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return a}function st(...a){a=Gx(a);const e="THREE."+a.shift();{const n=a[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...a)}}function wt(...a){a=Gx(a);const e="THREE."+a.shift();{const n=a[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...a)}}function Eu(...a){const e=a.join(" ");e in Jv||(Jv[e]=!0,st(...a))}function BE(a,e,n){return new Promise(function(r,o){function c(){switch(a.clientWaitSync(e,a.SYNC_FLUSH_COMMANDS_BIT,0)){case a.WAIT_FAILED:o();break;case a.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:r()}}setTimeout(c,n)})}const HE={[Uh]:Lh,[Oh]:Fh,[Ph]:zh,[Ws]:Ih,[Lh]:Uh,[Fh]:Oh,[zh]:Ph,[Ih]:Ws};class Qs{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(n)===-1&&r[e].push(n)}hasEventListener(e,n){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(n)!==-1}removeEventListener(e,n){const r=this._listeners;if(r===void 0)return;const o=r[e];if(o!==void 0){const c=o.indexOf(n);c!==-1&&o.splice(c,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const r=n[e.type];if(r!==void 0){e.target=this;const o=r.slice(0);for(let c=0,f=o.length;c<f;c++)o[c].call(this,e);e.target=null}}}const Fn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let e_=1234567;const fl=Math.PI/180,_l=180/Math.PI;function Js(){const a=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Fn[a&255]+Fn[a>>8&255]+Fn[a>>16&255]+Fn[a>>24&255]+"-"+Fn[e&255]+Fn[e>>8&255]+"-"+Fn[e>>16&15|64]+Fn[e>>24&255]+"-"+Fn[n&63|128]+Fn[n>>8&255]+"-"+Fn[n>>16&255]+Fn[n>>24&255]+Fn[r&255]+Fn[r>>8&255]+Fn[r>>16&255]+Fn[r>>24&255]).toLowerCase()}function Et(a,e,n){return Math.max(e,Math.min(n,a))}function kp(a,e){return(a%e+e)%e}function kE(a,e,n,r,o){return r+(a-e)*(o-r)/(n-e)}function GE(a,e,n){return a!==e?(n-a)/(e-a):0}function dl(a,e,n){return(1-n)*a+n*e}function VE(a,e,n,r){return dl(a,e,1-Math.exp(-n*r))}function jE(a,e=1){return e-Math.abs(kp(a,e*2)-e)}function XE(a,e,n){return a<=e?0:a>=n?1:(a=(a-e)/(n-e),a*a*(3-2*a))}function WE(a,e,n){return a<=e?0:a>=n?1:(a=(a-e)/(n-e),a*a*a*(a*(a*6-15)+10))}function qE(a,e){return a+Math.floor(Math.random()*(e-a+1))}function YE(a,e){return a+Math.random()*(e-a)}function ZE(a){return a*(.5-Math.random())}function KE(a){a!==void 0&&(e_=a);let e=e_+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function QE(a){return a*fl}function JE(a){return a*_l}function $E(a){return(a&a-1)===0&&a!==0}function eT(a){return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))}function tT(a){return Math.pow(2,Math.floor(Math.log(a)/Math.LN2))}function nT(a,e,n,r,o){const c=Math.cos,f=Math.sin,h=c(n/2),m=f(n/2),d=c((e+r)/2),g=f((e+r)/2),b=c((e-r)/2),_=f((e-r)/2),y=c((r-e)/2),S=f((r-e)/2);switch(o){case"XYX":a.set(h*g,m*b,m*_,h*d);break;case"YZY":a.set(m*_,h*g,m*b,h*d);break;case"ZXZ":a.set(m*b,m*_,h*g,h*d);break;case"XZX":a.set(h*g,m*S,m*y,h*d);break;case"YXY":a.set(m*y,h*g,m*S,h*d);break;case"ZYZ":a.set(m*S,m*y,h*g,h*d);break;default:st("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function ks(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return a/4294967295;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int32Array:return Math.max(a/2147483647,-1);case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function kn(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return Math.round(a*4294967295);case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int32Array:return Math.round(a*2147483647);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}const js={DEG2RAD:fl,RAD2DEG:_l,generateUUID:Js,clamp:Et,euclideanModulo:kp,mapLinear:kE,inverseLerp:GE,lerp:dl,damp:VE,pingpong:jE,smoothstep:XE,smootherstep:WE,randInt:qE,randFloat:YE,randFloatSpread:ZE,seededRandom:KE,degToRad:QE,radToDeg:JE,isPowerOfTwo:$E,ceilPowerOfTwo:eT,floorPowerOfTwo:tT,setQuaternionFromProperEuler:nT,normalize:kn,denormalize:ks};class Ut{constructor(e=0,n=0){Ut.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,r=this.y,o=e.elements;return this.x=o[0]*n+o[3]*r+o[6],this.y=o[1]*n+o[4]*r+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Et(this.x,e.x,n.x),this.y=Et(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Et(this.x,e,n),this.y=Et(this.y,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Et(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(Et(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y;return n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const r=Math.cos(n),o=Math.sin(n),c=this.x-e.x,f=this.y-e.y;return this.x=c*r-f*o+e.x,this.y=c*o+f*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $s{constructor(e=0,n=0,r=0,o=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=r,this._w=o}static slerpFlat(e,n,r,o,c,f,h){let m=r[o+0],d=r[o+1],g=r[o+2],b=r[o+3],_=c[f+0],y=c[f+1],S=c[f+2],A=c[f+3];if(b!==A||m!==_||d!==y||g!==S){let x=m*_+d*y+g*S+b*A;x<0&&(_=-_,y=-y,S=-S,A=-A,x=-x);let v=1-h;if(x<.9995){const T=Math.acos(x),C=Math.sin(T);v=Math.sin(v*T)/C,h=Math.sin(h*T)/C,m=m*v+_*h,d=d*v+y*h,g=g*v+S*h,b=b*v+A*h}else{m=m*v+_*h,d=d*v+y*h,g=g*v+S*h,b=b*v+A*h;const T=1/Math.sqrt(m*m+d*d+g*g+b*b);m*=T,d*=T,g*=T,b*=T}}e[n]=m,e[n+1]=d,e[n+2]=g,e[n+3]=b}static multiplyQuaternionsFlat(e,n,r,o,c,f){const h=r[o],m=r[o+1],d=r[o+2],g=r[o+3],b=c[f],_=c[f+1],y=c[f+2],S=c[f+3];return e[n]=h*S+g*b+m*y-d*_,e[n+1]=m*S+g*_+d*b-h*y,e[n+2]=d*S+g*y+h*_-m*b,e[n+3]=g*S-h*b-m*_-d*y,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,r,o){return this._x=e,this._y=n,this._z=r,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const r=e._x,o=e._y,c=e._z,f=e._order,h=Math.cos,m=Math.sin,d=h(r/2),g=h(o/2),b=h(c/2),_=m(r/2),y=m(o/2),S=m(c/2);switch(f){case"XYZ":this._x=_*g*b+d*y*S,this._y=d*y*b-_*g*S,this._z=d*g*S+_*y*b,this._w=d*g*b-_*y*S;break;case"YXZ":this._x=_*g*b+d*y*S,this._y=d*y*b-_*g*S,this._z=d*g*S-_*y*b,this._w=d*g*b+_*y*S;break;case"ZXY":this._x=_*g*b-d*y*S,this._y=d*y*b+_*g*S,this._z=d*g*S+_*y*b,this._w=d*g*b-_*y*S;break;case"ZYX":this._x=_*g*b-d*y*S,this._y=d*y*b+_*g*S,this._z=d*g*S-_*y*b,this._w=d*g*b+_*y*S;break;case"YZX":this._x=_*g*b+d*y*S,this._y=d*y*b+_*g*S,this._z=d*g*S-_*y*b,this._w=d*g*b-_*y*S;break;case"XZY":this._x=_*g*b-d*y*S,this._y=d*y*b-_*g*S,this._z=d*g*S+_*y*b,this._w=d*g*b+_*y*S;break;default:st("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const r=n/2,o=Math.sin(r);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,r=n[0],o=n[4],c=n[8],f=n[1],h=n[5],m=n[9],d=n[2],g=n[6],b=n[10],_=r+h+b;if(_>0){const y=.5/Math.sqrt(_+1);this._w=.25/y,this._x=(g-m)*y,this._y=(c-d)*y,this._z=(f-o)*y}else if(r>h&&r>b){const y=2*Math.sqrt(1+r-h-b);this._w=(g-m)/y,this._x=.25*y,this._y=(o+f)/y,this._z=(c+d)/y}else if(h>b){const y=2*Math.sqrt(1+h-r-b);this._w=(c-d)/y,this._x=(o+f)/y,this._y=.25*y,this._z=(m+g)/y}else{const y=2*Math.sqrt(1+b-r-h);this._w=(f-o)/y,this._x=(c+d)/y,this._y=(m+g)/y,this._z=.25*y}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let r=e.dot(n)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Et(this.dot(e),-1,1)))}rotateTowards(e,n){const r=this.angleTo(e);if(r===0)return this;const o=Math.min(1,n/r);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const r=e._x,o=e._y,c=e._z,f=e._w,h=n._x,m=n._y,d=n._z,g=n._w;return this._x=r*g+f*h+o*d-c*m,this._y=o*g+f*m+c*h-r*d,this._z=c*g+f*d+r*m-o*h,this._w=f*g-r*h-o*m-c*d,this._onChangeCallback(),this}slerp(e,n){let r=e._x,o=e._y,c=e._z,f=e._w,h=this.dot(e);h<0&&(r=-r,o=-o,c=-c,f=-f,h=-h);let m=1-n;if(h<.9995){const d=Math.acos(h),g=Math.sin(d);m=Math.sin(m*d)/g,n=Math.sin(n*d)/g,this._x=this._x*m+r*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+f*n,this._onChangeCallback()}else this._x=this._x*m+r*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+f*n,this.normalize();return this}slerpQuaternions(e,n,r){return this.copy(e).slerp(n,r)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),r=Math.random(),o=Math.sqrt(1-r),c=Math.sqrt(r);return this.set(o*Math.sin(e),o*Math.cos(e),c*Math.sin(n),c*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class re{constructor(e=0,n=0,r=0){re.prototype.isVector3=!0,this.x=e,this.y=n,this.z=r}set(e,n,r){return r===void 0&&(r=this.z),this.x=e,this.y=n,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(t_.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(t_.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,r=this.y,o=this.z,c=e.elements;return this.x=c[0]*n+c[3]*r+c[6]*o,this.y=c[1]*n+c[4]*r+c[7]*o,this.z=c[2]*n+c[5]*r+c[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,r=this.y,o=this.z,c=e.elements,f=1/(c[3]*n+c[7]*r+c[11]*o+c[15]);return this.x=(c[0]*n+c[4]*r+c[8]*o+c[12])*f,this.y=(c[1]*n+c[5]*r+c[9]*o+c[13])*f,this.z=(c[2]*n+c[6]*r+c[10]*o+c[14])*f,this}applyQuaternion(e){const n=this.x,r=this.y,o=this.z,c=e.x,f=e.y,h=e.z,m=e.w,d=2*(f*o-h*r),g=2*(h*n-c*o),b=2*(c*r-f*n);return this.x=n+m*d+f*b-h*g,this.y=r+m*g+h*d-c*b,this.z=o+m*b+c*g-f*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,r=this.y,o=this.z,c=e.elements;return this.x=c[0]*n+c[4]*r+c[8]*o,this.y=c[1]*n+c[5]*r+c[9]*o,this.z=c[2]*n+c[6]*r+c[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Et(this.x,e.x,n.x),this.y=Et(this.y,e.y,n.y),this.z=Et(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Et(this.x,e,n),this.y=Et(this.y,e,n),this.z=Et(this.z,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Et(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const r=e.x,o=e.y,c=e.z,f=n.x,h=n.y,m=n.z;return this.x=o*m-c*h,this.y=c*f-r*m,this.z=r*h-o*f,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const r=e.dot(this)/n;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return qd.copy(this).projectOnVector(e),this.sub(qd)}reflect(e){return this.sub(qd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(Et(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y,o=this.z-e.z;return n*n+r*r+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,r){const o=Math.sin(n)*e;return this.x=o*Math.sin(r),this.y=Math.cos(n)*e,this.z=o*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,r){return this.x=e*Math.sin(n),this.y=r,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=r,this.z=o,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,r=Math.sqrt(1-n*n);return this.x=r*Math.cos(e),this.y=n,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qd=new re,t_=new $s;class ht{constructor(e,n,r,o,c,f,h,m,d){ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,r,o,c,f,h,m,d)}set(e,n,r,o,c,f,h,m,d){const g=this.elements;return g[0]=e,g[1]=o,g[2]=h,g[3]=n,g[4]=c,g[5]=m,g[6]=r,g[7]=f,g[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],this}extractBasis(e,n,r){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,o=n.elements,c=this.elements,f=r[0],h=r[3],m=r[6],d=r[1],g=r[4],b=r[7],_=r[2],y=r[5],S=r[8],A=o[0],x=o[3],v=o[6],T=o[1],C=o[4],R=o[7],P=o[2],O=o[5],F=o[8];return c[0]=f*A+h*T+m*P,c[3]=f*x+h*C+m*O,c[6]=f*v+h*R+m*F,c[1]=d*A+g*T+b*P,c[4]=d*x+g*C+b*O,c[7]=d*v+g*R+b*F,c[2]=_*A+y*T+S*P,c[5]=_*x+y*C+S*O,c[8]=_*v+y*R+S*F,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[1],o=e[2],c=e[3],f=e[4],h=e[5],m=e[6],d=e[7],g=e[8];return n*f*g-n*h*d-r*c*g+r*h*m+o*c*d-o*f*m}invert(){const e=this.elements,n=e[0],r=e[1],o=e[2],c=e[3],f=e[4],h=e[5],m=e[6],d=e[7],g=e[8],b=g*f-h*d,_=h*m-g*c,y=d*c-f*m,S=n*b+r*_+o*y;if(S===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/S;return e[0]=b*A,e[1]=(o*d-g*r)*A,e[2]=(h*r-o*f)*A,e[3]=_*A,e[4]=(g*n-o*m)*A,e[5]=(o*c-h*n)*A,e[6]=y*A,e[7]=(r*m-d*n)*A,e[8]=(f*n-r*c)*A,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,r,o,c,f,h){const m=Math.cos(c),d=Math.sin(c);return this.set(r*m,r*d,-r*(m*f+d*h)+f+e,-o*d,o*m,-o*(-d*f+m*h)+h+n,0,0,1),this}scale(e,n){return this.premultiply(Yd.makeScale(e,n)),this}rotate(e){return this.premultiply(Yd.makeRotation(-e)),this}translate(e,n){return this.premultiply(Yd.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,r,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,r=e.elements;for(let o=0;o<9;o++)if(n[o]!==r[o])return!1;return!0}fromArray(e,n=0){for(let r=0;r<9;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Yd=new ht,n_=new ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),i_=new ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function iT(){const a={enabled:!0,workingColorSpace:Zs,spaces:{},convert:function(o,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===Gt&&(o.r=wa(o.r),o.g=wa(o.g),o.b=wa(o.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(o.applyMatrix3(this.spaces[c].toXYZ),o.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===Gt&&(o.r=Xs(o.r),o.g=Xs(o.g),o.b=Xs(o.b))),o},workingToColorSpace:function(o,c){return this.convert(o,this.workingColorSpace,c)},colorSpaceToWorking:function(o,c){return this.convert(o,c,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===cr?Su:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,c=this.workingColorSpace){return o.fromArray(this.spaces[c].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,c,f){return o.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,c){return Eu("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),a.workingToColorSpace(o,c)},toWorkingColorSpace:function(o,c){return Eu("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),a.colorSpaceToWorking(o,c)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return a.define({[Zs]:{primaries:e,whitePoint:r,transfer:Su,toXYZ:n_,fromXYZ:i_,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:xi},outputColorSpaceConfig:{drawingBufferColorSpace:xi}},[xi]:{primaries:e,whitePoint:r,transfer:Gt,toXYZ:n_,fromXYZ:i_,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:xi}}}),a}const Rt=iT();function wa(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function Xs(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}let ws;class aT{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{ws===void 0&&(ws=Mu("canvas")),ws.width=e.width,ws.height=e.height;const o=ws.getContext("2d");e instanceof ImageData?o.putImageData(e,0,0):o.drawImage(e,0,0,e.width,e.height),r=ws}return r.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Mu("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const o=r.getImageData(0,0,e.width,e.height),c=o.data;for(let f=0;f<c.length;f++)c[f]=wa(c[f]/255)*255;return r.putImageData(o,0,0),n}else if(e.data){const n=e.data.slice(0);for(let r=0;r<n.length;r++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[r]=Math.floor(wa(n[r]/255)*255):n[r]=wa(n[r]);return{data:n,width:e.width,height:e.height}}else return st("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let rT=0;class Gp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rT++}),this.uuid=Js(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayHeight,n.displayWidth,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},o=this.data;if(o!==null){let c;if(Array.isArray(o)){c=[];for(let f=0,h=o.length;f<h;f++)o[f].isDataTexture?c.push(Zd(o[f].image)):c.push(Zd(o[f]))}else c=Zd(o);r.url=c}return n||(e.images[this.uuid]=r),r}}function Zd(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?aT.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(st("Texture: Unable to serialize Texture."),{})}let sT=0;const Kd=new re;class Vn extends Qs{constructor(e=Vn.DEFAULT_IMAGE,n=Vn.DEFAULT_MAPPING,r=Ta,o=Ta,c=Bn,f=Hr,h=Ni,m=ci,d=Vn.DEFAULT_ANISOTROPY,g=cr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sT++}),this.uuid=Js(),this.name="",this.source=new Gp(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=o,this.magFilter=c,this.minFilter=f,this.anisotropy=d,this.format=h,this.internalFormat=null,this.type=m,this.offset=new Ut(0,0),this.repeat=new Ut(1,1),this.center=new Ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Kd).x}get height(){return this.source.getSize(Kd).y}get depth(){return this.source.getSize(Kd).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const r=e[n];if(r===void 0){st(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){st(`Texture.setValues(): property '${n}' does not exist.`);continue}o&&r&&o.isVector2&&r.isVector2||o&&r&&o.isVector3&&r.isVector3||o&&r&&o.isMatrix3&&r.isMatrix3?o.copy(r):this[n]=r}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),n||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Lx)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Bh:e.x=e.x-Math.floor(e.x);break;case Ta:e.x=e.x<0?0:1;break;case Hh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Bh:e.y=e.y-Math.floor(e.y);break;case Ta:e.y=e.y<0?0:1;break;case Hh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Vn.DEFAULT_IMAGE=null;Vn.DEFAULT_MAPPING=Lx;Vn.DEFAULT_ANISOTROPY=1;class on{constructor(e=0,n=0,r=0,o=1){on.prototype.isVector4=!0,this.x=e,this.y=n,this.z=r,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,r,o){return this.x=e,this.y=n,this.z=r,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,r=this.y,o=this.z,c=this.w,f=e.elements;return this.x=f[0]*n+f[4]*r+f[8]*o+f[12]*c,this.y=f[1]*n+f[5]*r+f[9]*o+f[13]*c,this.z=f[2]*n+f[6]*r+f[10]*o+f[14]*c,this.w=f[3]*n+f[7]*r+f[11]*o+f[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,r,o,c;const m=e.elements,d=m[0],g=m[4],b=m[8],_=m[1],y=m[5],S=m[9],A=m[2],x=m[6],v=m[10];if(Math.abs(g-_)<.01&&Math.abs(b-A)<.01&&Math.abs(S-x)<.01){if(Math.abs(g+_)<.1&&Math.abs(b+A)<.1&&Math.abs(S+x)<.1&&Math.abs(d+y+v-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const C=(d+1)/2,R=(y+1)/2,P=(v+1)/2,O=(g+_)/4,F=(b+A)/4,E=(S+x)/4;return C>R&&C>P?C<.01?(r=0,o=.707106781,c=.707106781):(r=Math.sqrt(C),o=O/r,c=F/r):R>P?R<.01?(r=.707106781,o=0,c=.707106781):(o=Math.sqrt(R),r=O/o,c=E/o):P<.01?(r=.707106781,o=.707106781,c=0):(c=Math.sqrt(P),r=F/c,o=E/c),this.set(r,o,c,n),this}let T=Math.sqrt((x-S)*(x-S)+(b-A)*(b-A)+(_-g)*(_-g));return Math.abs(T)<.001&&(T=1),this.x=(x-S)/T,this.y=(b-A)/T,this.z=(_-g)/T,this.w=Math.acos((d+y+v-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Et(this.x,e.x,n.x),this.y=Et(this.y,e.y,n.y),this.z=Et(this.z,e.z,n.z),this.w=Et(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Et(this.x,e,n),this.y=Et(this.y,e,n),this.z=Et(this.z,e,n),this.w=Et(this.w,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Et(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this.w=e.w+(n.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class oT extends Qs{constructor(e=1,n=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},r),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=r.depth,this.scissor=new on(0,0,e,n),this.scissorTest=!1,this.viewport=new on(0,0,e,n),this.textures=[];const o={width:e,height:n,depth:r.depth},c=new Vn(o),f=r.count;for(let h=0;h<f;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview}_setTextureOptions(e={}){const n={minFilter:Bn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,r=1){if(this.width!==e||this.height!==n||this.depth!==r){this.width=e,this.height=n,this.depth=r;for(let o=0,c=this.textures.length;o<c;o++)this.textures[o].image.width=e,this.textures[o].image.height=n,this.textures[o].image.depth=r,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const o=Object.assign({},e.textures[n].image);this.textures[n].source=new Gp(o)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qi extends oT{constructor(e=1,n=1,r={}){super(e,n,r),this.isWebGLRenderTarget=!0}}class Vx extends Vn{constructor(e=null,n=1,r=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:r,depth:o},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=Ta,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class lT extends Vn{constructor(e=null,n=1,r=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:r,depth:o},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=Ta,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class en{constructor(e,n,r,o,c,f,h,m,d,g,b,_,y,S,A,x){en.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,r,o,c,f,h,m,d,g,b,_,y,S,A,x)}set(e,n,r,o,c,f,h,m,d,g,b,_,y,S,A,x){const v=this.elements;return v[0]=e,v[4]=n,v[8]=r,v[12]=o,v[1]=c,v[5]=f,v[9]=h,v[13]=m,v[2]=d,v[6]=g,v[10]=b,v[14]=_,v[3]=y,v[7]=S,v[11]=A,v[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new en().fromArray(this.elements)}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],n[9]=r[9],n[10]=r[10],n[11]=r[11],n[12]=r[12],n[13]=r[13],n[14]=r[14],n[15]=r[15],this}copyPosition(e){const n=this.elements,r=e.elements;return n[12]=r[12],n[13]=r[13],n[14]=r[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,r){return this.determinant()===0?(e.set(1,0,0),n.set(0,1,0),r.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this)}makeBasis(e,n,r){return this.set(e.x,n.x,r.x,0,e.y,n.y,r.y,0,e.z,n.z,r.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const n=this.elements,r=e.elements,o=1/Rs.setFromMatrixColumn(e,0).length(),c=1/Rs.setFromMatrixColumn(e,1).length(),f=1/Rs.setFromMatrixColumn(e,2).length();return n[0]=r[0]*o,n[1]=r[1]*o,n[2]=r[2]*o,n[3]=0,n[4]=r[4]*c,n[5]=r[5]*c,n[6]=r[6]*c,n[7]=0,n[8]=r[8]*f,n[9]=r[9]*f,n[10]=r[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,r=e.x,o=e.y,c=e.z,f=Math.cos(r),h=Math.sin(r),m=Math.cos(o),d=Math.sin(o),g=Math.cos(c),b=Math.sin(c);if(e.order==="XYZ"){const _=f*g,y=f*b,S=h*g,A=h*b;n[0]=m*g,n[4]=-m*b,n[8]=d,n[1]=y+S*d,n[5]=_-A*d,n[9]=-h*m,n[2]=A-_*d,n[6]=S+y*d,n[10]=f*m}else if(e.order==="YXZ"){const _=m*g,y=m*b,S=d*g,A=d*b;n[0]=_+A*h,n[4]=S*h-y,n[8]=f*d,n[1]=f*b,n[5]=f*g,n[9]=-h,n[2]=y*h-S,n[6]=A+_*h,n[10]=f*m}else if(e.order==="ZXY"){const _=m*g,y=m*b,S=d*g,A=d*b;n[0]=_-A*h,n[4]=-f*b,n[8]=S+y*h,n[1]=y+S*h,n[5]=f*g,n[9]=A-_*h,n[2]=-f*d,n[6]=h,n[10]=f*m}else if(e.order==="ZYX"){const _=f*g,y=f*b,S=h*g,A=h*b;n[0]=m*g,n[4]=S*d-y,n[8]=_*d+A,n[1]=m*b,n[5]=A*d+_,n[9]=y*d-S,n[2]=-d,n[6]=h*m,n[10]=f*m}else if(e.order==="YZX"){const _=f*m,y=f*d,S=h*m,A=h*d;n[0]=m*g,n[4]=A-_*b,n[8]=S*b+y,n[1]=b,n[5]=f*g,n[9]=-h*g,n[2]=-d*g,n[6]=y*b+S,n[10]=_-A*b}else if(e.order==="XZY"){const _=f*m,y=f*d,S=h*m,A=h*d;n[0]=m*g,n[4]=-b,n[8]=d*g,n[1]=_*b+A,n[5]=f*g,n[9]=y*b-S,n[2]=S*b-y,n[6]=h*g,n[10]=A*b+_}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cT,e,uT)}lookAt(e,n,r){const o=this.elements;return si.subVectors(e,n),si.lengthSq()===0&&(si.z=1),si.normalize(),tr.crossVectors(r,si),tr.lengthSq()===0&&(Math.abs(r.z)===1?si.x+=1e-4:si.z+=1e-4,si.normalize(),tr.crossVectors(r,si)),tr.normalize(),zc.crossVectors(si,tr),o[0]=tr.x,o[4]=zc.x,o[8]=si.x,o[1]=tr.y,o[5]=zc.y,o[9]=si.y,o[2]=tr.z,o[6]=zc.z,o[10]=si.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,o=n.elements,c=this.elements,f=r[0],h=r[4],m=r[8],d=r[12],g=r[1],b=r[5],_=r[9],y=r[13],S=r[2],A=r[6],x=r[10],v=r[14],T=r[3],C=r[7],R=r[11],P=r[15],O=o[0],F=o[4],E=o[8],D=o[12],Y=o[1],k=o[5],X=o[9],$=o[13],K=o[2],V=o[6],I=o[10],B=o[14],se=o[3],he=o[7],L=o[11],Q=o[15];return c[0]=f*O+h*Y+m*K+d*se,c[4]=f*F+h*k+m*V+d*he,c[8]=f*E+h*X+m*I+d*L,c[12]=f*D+h*$+m*B+d*Q,c[1]=g*O+b*Y+_*K+y*se,c[5]=g*F+b*k+_*V+y*he,c[9]=g*E+b*X+_*I+y*L,c[13]=g*D+b*$+_*B+y*Q,c[2]=S*O+A*Y+x*K+v*se,c[6]=S*F+A*k+x*V+v*he,c[10]=S*E+A*X+x*I+v*L,c[14]=S*D+A*$+x*B+v*Q,c[3]=T*O+C*Y+R*K+P*se,c[7]=T*F+C*k+R*V+P*he,c[11]=T*E+C*X+R*I+P*L,c[15]=T*D+C*$+R*B+P*Q,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[4],o=e[8],c=e[12],f=e[1],h=e[5],m=e[9],d=e[13],g=e[2],b=e[6],_=e[10],y=e[14],S=e[3],A=e[7],x=e[11],v=e[15],T=m*y-d*_,C=h*y-d*b,R=h*_-m*b,P=f*y-d*g,O=f*_-m*g,F=f*b-h*g;return n*(A*T-x*C+v*R)-r*(S*T-x*P+v*O)+o*(S*C-A*P+v*F)-c*(S*R-A*O+x*F)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,r){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=n,o[14]=r),this}invert(){const e=this.elements,n=e[0],r=e[1],o=e[2],c=e[3],f=e[4],h=e[5],m=e[6],d=e[7],g=e[8],b=e[9],_=e[10],y=e[11],S=e[12],A=e[13],x=e[14],v=e[15],T=n*h-r*f,C=n*m-o*f,R=n*d-c*f,P=r*m-o*h,O=r*d-c*h,F=o*d-c*m,E=g*A-b*S,D=g*x-_*S,Y=g*v-y*S,k=b*x-_*A,X=b*v-y*A,$=_*v-y*x,K=T*$-C*X+R*k+P*Y-O*D+F*E;if(K===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/K;return e[0]=(h*$-m*X+d*k)*V,e[1]=(o*X-r*$-c*k)*V,e[2]=(A*F-x*O+v*P)*V,e[3]=(_*O-b*F-y*P)*V,e[4]=(m*Y-f*$-d*D)*V,e[5]=(n*$-o*Y+c*D)*V,e[6]=(x*R-S*F-v*C)*V,e[7]=(g*F-_*R+y*C)*V,e[8]=(f*X-h*Y+d*E)*V,e[9]=(r*Y-n*X-c*E)*V,e[10]=(S*O-A*R+v*T)*V,e[11]=(b*R-g*O-y*T)*V,e[12]=(h*D-f*k-m*E)*V,e[13]=(n*k-r*D+o*E)*V,e[14]=(A*C-S*P-x*T)*V,e[15]=(g*P-b*C+_*T)*V,this}scale(e){const n=this.elements,r=e.x,o=e.y,c=e.z;return n[0]*=r,n[4]*=o,n[8]*=c,n[1]*=r,n[5]*=o,n[9]*=c,n[2]*=r,n[6]*=o,n[10]*=c,n[3]*=r,n[7]*=o,n[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,r,o))}makeTranslation(e,n,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,r,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,n,-r,0,0,r,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,0,r,0,0,1,0,0,-r,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,0,r,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const r=Math.cos(n),o=Math.sin(n),c=1-r,f=e.x,h=e.y,m=e.z,d=c*f,g=c*h;return this.set(d*f+r,d*h-o*m,d*m+o*h,0,d*h+o*m,g*h+r,g*m-o*f,0,d*m-o*h,g*m+o*f,c*m*m+r,0,0,0,0,1),this}makeScale(e,n,r){return this.set(e,0,0,0,0,n,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,n,r,o,c,f){return this.set(1,r,c,0,e,1,f,0,n,o,1,0,0,0,0,1),this}compose(e,n,r){const o=this.elements,c=n._x,f=n._y,h=n._z,m=n._w,d=c+c,g=f+f,b=h+h,_=c*d,y=c*g,S=c*b,A=f*g,x=f*b,v=h*b,T=m*d,C=m*g,R=m*b,P=r.x,O=r.y,F=r.z;return o[0]=(1-(A+v))*P,o[1]=(y+R)*P,o[2]=(S-C)*P,o[3]=0,o[4]=(y-R)*O,o[5]=(1-(_+v))*O,o[6]=(x+T)*O,o[7]=0,o[8]=(S+C)*F,o[9]=(x-T)*F,o[10]=(1-(_+A))*F,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,n,r){const o=this.elements;e.x=o[12],e.y=o[13],e.z=o[14];const c=this.determinant();if(c===0)return r.set(1,1,1),n.identity(),this;let f=Rs.set(o[0],o[1],o[2]).length();const h=Rs.set(o[4],o[5],o[6]).length(),m=Rs.set(o[8],o[9],o[10]).length();c<0&&(f=-f),wi.copy(this);const d=1/f,g=1/h,b=1/m;return wi.elements[0]*=d,wi.elements[1]*=d,wi.elements[2]*=d,wi.elements[4]*=g,wi.elements[5]*=g,wi.elements[6]*=g,wi.elements[8]*=b,wi.elements[9]*=b,wi.elements[10]*=b,n.setFromRotationMatrix(wi),r.x=f,r.y=h,r.z=m,this}makePerspective(e,n,r,o,c,f,h=Xi,m=!1){const d=this.elements,g=2*c/(n-e),b=2*c/(r-o),_=(n+e)/(n-e),y=(r+o)/(r-o);let S,A;if(m)S=c/(f-c),A=f*c/(f-c);else if(h===Xi)S=-(f+c)/(f-c),A=-2*f*c/(f-c);else if(h===vl)S=-f/(f-c),A=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return d[0]=g,d[4]=0,d[8]=_,d[12]=0,d[1]=0,d[5]=b,d[9]=y,d[13]=0,d[2]=0,d[6]=0,d[10]=S,d[14]=A,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(e,n,r,o,c,f,h=Xi,m=!1){const d=this.elements,g=2/(n-e),b=2/(r-o),_=-(n+e)/(n-e),y=-(r+o)/(r-o);let S,A;if(m)S=1/(f-c),A=f/(f-c);else if(h===Xi)S=-2/(f-c),A=-(f+c)/(f-c);else if(h===vl)S=-1/(f-c),A=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return d[0]=g,d[4]=0,d[8]=0,d[12]=_,d[1]=0,d[5]=b,d[9]=0,d[13]=y,d[2]=0,d[6]=0,d[10]=S,d[14]=A,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(e){const n=this.elements,r=e.elements;for(let o=0;o<16;o++)if(n[o]!==r[o])return!1;return!0}fromArray(e,n=0){for(let r=0;r<16;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e[n+9]=r[9],e[n+10]=r[10],e[n+11]=r[11],e[n+12]=r[12],e[n+13]=r[13],e[n+14]=r[14],e[n+15]=r[15],e}}const Rs=new re,wi=new en,cT=new re(0,0,0),uT=new re(1,1,1),tr=new re,zc=new re,si=new re,a_=new en,r_=new $s;class Ki{constructor(e=0,n=0,r=0,o=Ki.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=r,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,r,o=this._order){return this._x=e,this._y=n,this._z=r,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,r=!0){const o=e.elements,c=o[0],f=o[4],h=o[8],m=o[1],d=o[5],g=o[9],b=o[2],_=o[6],y=o[10];switch(n){case"XYZ":this._y=Math.asin(Et(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-g,y),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(_,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Et(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(h,y),this._z=Math.atan2(m,d)):(this._y=Math.atan2(-b,c),this._z=0);break;case"ZXY":this._x=Math.asin(Et(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-b,y),this._z=Math.atan2(-f,d)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-Et(b,-1,1)),Math.abs(b)<.9999999?(this._x=Math.atan2(_,y),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,d));break;case"YZX":this._z=Math.asin(Et(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,d),this._y=Math.atan2(-b,c)):(this._x=0,this._y=Math.atan2(h,y));break;case"XZY":this._z=Math.asin(-Et(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(_,d),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-g,y),this._y=0);break;default:st("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,r){return a_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(a_,n,r)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return r_.setFromEuler(this),this.setFromQuaternion(r_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ki.DEFAULT_ORDER="XYZ";class Vp{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let fT=0;const s_=new re,Cs=new $s,_a=new en,Bc=new re,el=new re,dT=new re,hT=new $s,o_=new re(1,0,0),l_=new re(0,1,0),c_=new re(0,0,1),u_={type:"added"},pT={type:"removed"},Ds={type:"childadded",child:null},Qd={type:"childremoved",child:null};class Cn extends Qs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fT++}),this.uuid=Js(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Cn.DEFAULT_UP.clone();const e=new re,n=new Ki,r=new $s,o=new re(1,1,1);function c(){r.setFromEuler(n,!1)}function f(){n.setFromQuaternion(r,void 0,!1)}n._onChange(c),r._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new en},normalMatrix:{value:new ht}}),this.matrix=new en,this.matrixWorld=new en,this.matrixAutoUpdate=Cn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Cs.setFromAxisAngle(e,n),this.quaternion.multiply(Cs),this}rotateOnWorldAxis(e,n){return Cs.setFromAxisAngle(e,n),this.quaternion.premultiply(Cs),this}rotateX(e){return this.rotateOnAxis(o_,e)}rotateY(e){return this.rotateOnAxis(l_,e)}rotateZ(e){return this.rotateOnAxis(c_,e)}translateOnAxis(e,n){return s_.copy(e).applyQuaternion(this.quaternion),this.position.add(s_.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(o_,e)}translateY(e){return this.translateOnAxis(l_,e)}translateZ(e){return this.translateOnAxis(c_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_a.copy(this.matrixWorld).invert())}lookAt(e,n,r){e.isVector3?Bc.copy(e):Bc.set(e,n,r);const o=this.parent;this.updateWorldMatrix(!0,!1),el.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_a.lookAt(el,Bc,this.up):_a.lookAt(Bc,el,this.up),this.quaternion.setFromRotationMatrix(_a),o&&(_a.extractRotation(o.matrixWorld),Cs.setFromRotationMatrix(_a),this.quaternion.premultiply(Cs.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(wt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(u_),Ds.child=e,this.dispatchEvent(Ds),Ds.child=null):wt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(pT),Qd.child=e,this.dispatchEvent(Qd),Qd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_a.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_a.multiply(e.parent.matrixWorld)),e.applyMatrix4(_a),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(u_),Ds.child=e,this.dispatchEvent(Ds),Ds.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let r=0,o=this.children.length;r<o;r++){const f=this.children[r].getObjectByProperty(e,n);if(f!==void 0)return f}}getObjectsByProperty(e,n,r=[]){this[e]===n&&r.push(this);const o=this.children;for(let c=0,f=o.length;c<f;c++)o[c].getObjectsByProperty(e,n,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(el,e,dT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(el,hT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let r=0,o=n.length;r<o;r++)n[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let r=0,o=n.length;r<o;r++)n[r].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,r=e.y,o=e.z,c=this.matrix.elements;c[12]+=n-c[0]*n-c[4]*r-c[8]*o,c[13]+=r-c[1]*n-c[5]*r-c[9]*o,c[14]+=o-c[2]*n-c[6]*r-c[10]*o}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let r=0,o=n.length;r<o;r++)n[r].updateMatrixWorld(e)}updateWorldMatrix(e,n){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const o=this.children;for(let c=0,f=o.length;c<f;c++)o[c].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",r={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),this.static!==!1&&(o.static=this.static),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.pivot!==null&&(o.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(h=>({...h})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(e),o.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function c(h,m){return h[m.uuid]===void 0&&(h[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=c(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const m=h.shapes;if(Array.isArray(m))for(let d=0,g=m.length;d<g;d++){const b=m[d];c(e.shapes,b)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let m=0,d=this.material.length;m<d;m++)h.push(c(e.materials,this.material[m]));o.material=h}else o.material=c(e.materials,this.material);if(this.children.length>0){o.children=[];for(let h=0;h<this.children.length;h++)o.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let h=0;h<this.animations.length;h++){const m=this.animations[h];o.animations.push(c(e.animations,m))}}if(n){const h=f(e.geometries),m=f(e.materials),d=f(e.textures),g=f(e.images),b=f(e.shapes),_=f(e.skeletons),y=f(e.animations),S=f(e.nodes);h.length>0&&(r.geometries=h),m.length>0&&(r.materials=m),d.length>0&&(r.textures=d),g.length>0&&(r.images=g),b.length>0&&(r.shapes=b),_.length>0&&(r.skeletons=_),y.length>0&&(r.animations=y),S.length>0&&(r.nodes=S)}return r.object=o,r;function f(h){const m=[];for(const d in h){const g=h[d];delete g.metadata,m.push(g)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let r=0;r<e.children.length;r++){const o=e.children[r];this.add(o.clone())}return this}}Cn.DEFAULT_UP=new re(0,1,0);Cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Hc extends Cn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const mT={type:"move"};class Jd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new re,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new re),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new re,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new re),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const r of e.hand.values())this._getHandJoint(n,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,r){let o=null,c=null,f=null;const h=this._targetRay,m=this._grip,d=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(d&&e.hand){f=!0;for(const A of e.hand.values()){const x=n.getJointPose(A,r),v=this._getHandJoint(d,A);x!==null&&(v.matrix.fromArray(x.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=x.radius),v.visible=x!==null}const g=d.joints["index-finger-tip"],b=d.joints["thumb-tip"],_=g.position.distanceTo(b.position),y=.02,S=.005;d.inputState.pinching&&_>y+S?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&_<=y-S&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=n.getPose(e.gripSpace,r),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));h!==null&&(o=n.getPose(e.targetRaySpace,r),o===null&&c!==null&&(o=c),o!==null&&(h.matrix.fromArray(o.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,o.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(o.linearVelocity)):h.hasLinearVelocity=!1,o.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(o.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(mT)))}return h!==null&&(h.visible=o!==null),m!==null&&(m.visible=c!==null),d!==null&&(d.visible=f!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const r=new Hc;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[n.jointName]=r,e.add(r)}return e.joints[n.jointName]}}const jx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},nr={h:0,s:0,l:0},kc={h:0,s:0,l:0};function $d(a,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?a+(e-a)*6*n:n<1/2?e:n<2/3?a+(e-a)*6*(2/3-n):a}class yt{constructor(e,n,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,r)}set(e,n,r){if(n===void 0&&r===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,n,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=xi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Rt.colorSpaceToWorking(this,n),this}setRGB(e,n,r,o=Rt.workingColorSpace){return this.r=e,this.g=n,this.b=r,Rt.colorSpaceToWorking(this,o),this}setHSL(e,n,r,o=Rt.workingColorSpace){if(e=kp(e,1),n=Et(n,0,1),r=Et(r,0,1),n===0)this.r=this.g=this.b=r;else{const c=r<=.5?r*(1+n):r+n-r*n,f=2*r-c;this.r=$d(f,c,e+1/3),this.g=$d(f,c,e),this.b=$d(f,c,e-1/3)}return Rt.colorSpaceToWorking(this,o),this}setStyle(e,n=xi){function r(c){c!==void 0&&parseFloat(c)<1&&st("Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const f=o[1],h=o[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:st("Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=o[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(c,16),n);st("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=xi){const r=jx[e.toLowerCase()];return r!==void 0?this.setHex(r,n):st("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=wa(e.r),this.g=wa(e.g),this.b=wa(e.b),this}copyLinearToSRGB(e){return this.r=Xs(e.r),this.g=Xs(e.g),this.b=Xs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xi){return Rt.workingToColorSpace(zn.copy(this),e),Math.round(Et(zn.r*255,0,255))*65536+Math.round(Et(zn.g*255,0,255))*256+Math.round(Et(zn.b*255,0,255))}getHexString(e=xi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Rt.workingColorSpace){Rt.workingToColorSpace(zn.copy(this),n);const r=zn.r,o=zn.g,c=zn.b,f=Math.max(r,o,c),h=Math.min(r,o,c);let m,d;const g=(h+f)/2;if(h===f)m=0,d=0;else{const b=f-h;switch(d=g<=.5?b/(f+h):b/(2-f-h),f){case r:m=(o-c)/b+(o<c?6:0);break;case o:m=(c-r)/b+2;break;case c:m=(r-o)/b+4;break}m/=6}return e.h=m,e.s=d,e.l=g,e}getRGB(e,n=Rt.workingColorSpace){return Rt.workingToColorSpace(zn.copy(this),n),e.r=zn.r,e.g=zn.g,e.b=zn.b,e}getStyle(e=xi){Rt.workingToColorSpace(zn.copy(this),e);const n=zn.r,r=zn.g,o=zn.b;return e!==xi?`color(${e} ${n.toFixed(3)} ${r.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(r*255)},${Math.round(o*255)})`}offsetHSL(e,n,r){return this.getHSL(nr),this.setHSL(nr.h+e,nr.s+n,nr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,r){return this.r=e.r+(n.r-e.r)*r,this.g=e.g+(n.g-e.g)*r,this.b=e.b+(n.b-e.b)*r,this}lerpHSL(e,n){this.getHSL(nr),e.getHSL(kc);const r=dl(nr.h,kc.h,n),o=dl(nr.s,kc.s,n),c=dl(nr.l,kc.l,n);return this.setHSL(r,o,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,r=this.g,o=this.b,c=e.elements;return this.r=c[0]*n+c[3]*r+c[6]*o,this.g=c[1]*n+c[4]*r+c[7]*o,this.b=c[2]*n+c[5]*r+c[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zn=new yt;yt.NAMES=jx;class jp{constructor(e,n=1,r=1e3){this.isFog=!0,this.name="",this.color=new yt(e),this.near=n,this.far=r}clone(){return new jp(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class gT extends Cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ki,this.environmentIntensity=1,this.environmentRotation=new Ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Ri=new re,xa=new re,eh=new re,ya=new re,Ns=new re,Us=new re,f_=new re,th=new re,nh=new re,ih=new re,ah=new on,rh=new on,sh=new on;class Di{constructor(e=new re,n=new re,r=new re){this.a=e,this.b=n,this.c=r}static getNormal(e,n,r,o){o.subVectors(r,n),Ri.subVectors(e,n),o.cross(Ri);const c=o.lengthSq();return c>0?o.multiplyScalar(1/Math.sqrt(c)):o.set(0,0,0)}static getBarycoord(e,n,r,o,c){Ri.subVectors(o,n),xa.subVectors(r,n),eh.subVectors(e,n);const f=Ri.dot(Ri),h=Ri.dot(xa),m=Ri.dot(eh),d=xa.dot(xa),g=xa.dot(eh),b=f*d-h*h;if(b===0)return c.set(0,0,0),null;const _=1/b,y=(d*m-h*g)*_,S=(f*g-h*m)*_;return c.set(1-y-S,S,y)}static containsPoint(e,n,r,o){return this.getBarycoord(e,n,r,o,ya)===null?!1:ya.x>=0&&ya.y>=0&&ya.x+ya.y<=1}static getInterpolation(e,n,r,o,c,f,h,m){return this.getBarycoord(e,n,r,o,ya)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,ya.x),m.addScaledVector(f,ya.y),m.addScaledVector(h,ya.z),m)}static getInterpolatedAttribute(e,n,r,o,c,f){return ah.setScalar(0),rh.setScalar(0),sh.setScalar(0),ah.fromBufferAttribute(e,n),rh.fromBufferAttribute(e,r),sh.fromBufferAttribute(e,o),f.setScalar(0),f.addScaledVector(ah,c.x),f.addScaledVector(rh,c.y),f.addScaledVector(sh,c.z),f}static isFrontFacing(e,n,r,o){return Ri.subVectors(r,n),xa.subVectors(e,n),Ri.cross(xa).dot(o)<0}set(e,n,r){return this.a.copy(e),this.b.copy(n),this.c.copy(r),this}setFromPointsAndIndices(e,n,r,o){return this.a.copy(e[n]),this.b.copy(e[r]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,n,r,o){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ri.subVectors(this.c,this.b),xa.subVectors(this.a,this.b),Ri.cross(xa).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Di.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Di.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,r,o,c){return Di.getInterpolation(e,this.a,this.b,this.c,n,r,o,c)}containsPoint(e){return Di.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Di.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const r=this.a,o=this.b,c=this.c;let f,h;Ns.subVectors(o,r),Us.subVectors(c,r),th.subVectors(e,r);const m=Ns.dot(th),d=Us.dot(th);if(m<=0&&d<=0)return n.copy(r);nh.subVectors(e,o);const g=Ns.dot(nh),b=Us.dot(nh);if(g>=0&&b<=g)return n.copy(o);const _=m*b-g*d;if(_<=0&&m>=0&&g<=0)return f=m/(m-g),n.copy(r).addScaledVector(Ns,f);ih.subVectors(e,c);const y=Ns.dot(ih),S=Us.dot(ih);if(S>=0&&y<=S)return n.copy(c);const A=y*d-m*S;if(A<=0&&d>=0&&S<=0)return h=d/(d-S),n.copy(r).addScaledVector(Us,h);const x=g*S-y*b;if(x<=0&&b-g>=0&&y-S>=0)return f_.subVectors(c,o),h=(b-g)/(b-g+(y-S)),n.copy(o).addScaledVector(f_,h);const v=1/(x+A+_);return f=A*v,h=_*v,n.copy(r).addScaledVector(Ns,f).addScaledVector(Us,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ml{constructor(e=new re(1/0,1/0,1/0),n=new re(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n+=3)this.expandByPoint(Ci.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,r=e.count;n<r;n++)this.expandByPoint(Ci.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const r=Ci.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const c=r.getAttribute("position");if(n===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let f=0,h=c.count;f<h;f++)e.isMesh===!0?e.getVertexPosition(f,Ci):Ci.fromBufferAttribute(c,f),Ci.applyMatrix4(e.matrixWorld),this.expandByPoint(Ci);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Gc.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Gc.copy(r.boundingBox)),Gc.applyMatrix4(e.matrixWorld),this.union(Gc)}const o=e.children;for(let c=0,f=o.length;c<f;c++)this.expandByObject(o[c],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ci),Ci.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,r;return e.normal.x>0?(n=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),n<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(tl),Vc.subVectors(this.max,tl),Ls.subVectors(e.a,tl),Os.subVectors(e.b,tl),Ps.subVectors(e.c,tl),ir.subVectors(Os,Ls),ar.subVectors(Ps,Os),Dr.subVectors(Ls,Ps);let n=[0,-ir.z,ir.y,0,-ar.z,ar.y,0,-Dr.z,Dr.y,ir.z,0,-ir.x,ar.z,0,-ar.x,Dr.z,0,-Dr.x,-ir.y,ir.x,0,-ar.y,ar.x,0,-Dr.y,Dr.x,0];return!oh(n,Ls,Os,Ps,Vc)||(n=[1,0,0,0,1,0,0,0,1],!oh(n,Ls,Os,Ps,Vc))?!1:(jc.crossVectors(ir,ar),n=[jc.x,jc.y,jc.z],oh(n,Ls,Os,Ps,Vc))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ci).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ci).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ba[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ba[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ba[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ba[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ba[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ba[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ba[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ba[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ba),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ba=[new re,new re,new re,new re,new re,new re,new re,new re],Ci=new re,Gc=new Ml,Ls=new re,Os=new re,Ps=new re,ir=new re,ar=new re,Dr=new re,tl=new re,Vc=new re,jc=new re,Nr=new re;function oh(a,e,n,r,o){for(let c=0,f=a.length-3;c<=f;c+=3){Nr.fromArray(a,c);const h=o.x*Math.abs(Nr.x)+o.y*Math.abs(Nr.y)+o.z*Math.abs(Nr.z),m=e.dot(Nr),d=n.dot(Nr),g=r.dot(Nr);if(Math.max(-Math.max(m,d,g),Math.min(m,d,g))>h)return!1}return!0}const mn=new re,Xc=new Ut;let vT=0;class Yi{constructor(e,n,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vT++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=r,this.usage=Kv,this.updateRanges=[],this.gpuType=ji,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,r){e*=this.itemSize,r*=n.itemSize;for(let o=0,c=this.itemSize;o<c;o++)this.array[e+o]=n.array[r+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,r=this.count;n<r;n++)Xc.fromBufferAttribute(this,n),Xc.applyMatrix3(e),this.setXY(n,Xc.x,Xc.y);else if(this.itemSize===3)for(let n=0,r=this.count;n<r;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix3(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyMatrix4(e){for(let n=0,r=this.count;n<r;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix4(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let n=0,r=this.count;n<r;n++)mn.fromBufferAttribute(this,n),mn.applyNormalMatrix(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let n=0,r=this.count;n<r;n++)mn.fromBufferAttribute(this,n),mn.transformDirection(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let r=this.array[e*this.itemSize+n];return this.normalized&&(r=ks(r,this.array)),r}setComponent(e,n,r){return this.normalized&&(r=kn(r,this.array)),this.array[e*this.itemSize+n]=r,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ks(n,this.array)),n}setX(e,n){return this.normalized&&(n=kn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ks(n,this.array)),n}setY(e,n){return this.normalized&&(n=kn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ks(n,this.array)),n}setZ(e,n){return this.normalized&&(n=kn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ks(n,this.array)),n}setW(e,n){return this.normalized&&(n=kn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,r){return e*=this.itemSize,this.normalized&&(n=kn(n,this.array),r=kn(r,this.array)),this.array[e+0]=n,this.array[e+1]=r,this}setXYZ(e,n,r,o){return e*=this.itemSize,this.normalized&&(n=kn(n,this.array),r=kn(r,this.array),o=kn(o,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=o,this}setXYZW(e,n,r,o,c){return e*=this.itemSize,this.normalized&&(n=kn(n,this.array),r=kn(r,this.array),o=kn(o,this.array),c=kn(c,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=o,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Kv&&(e.usage=this.usage),e}}class Xx extends Yi{constructor(e,n,r){super(new Uint16Array(e),n,r)}}class Wx extends Yi{constructor(e,n,r){super(new Uint32Array(e),n,r)}}class Qt extends Yi{constructor(e,n,r){super(new Float32Array(e),n,r)}}const _T=new Ml,nl=new re,lh=new re;class Du{constructor(e=new re,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const r=this.center;n!==void 0?r.copy(n):_T.setFromPoints(e).getCenter(r);let o=0;for(let c=0,f=e.length;c<f;c++)o=Math.max(o,r.distanceToSquared(e[c]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const r=this.center.distanceToSquared(e);return n.copy(e),r>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;nl.subVectors(e,this.center);const n=nl.lengthSq();if(n>this.radius*this.radius){const r=Math.sqrt(n),o=(r-this.radius)*.5;this.center.addScaledVector(nl,o/r),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(lh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(nl.copy(e.center).add(lh)),this.expandByPoint(nl.copy(e.center).sub(lh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let xT=0;const _i=new en,ch=new Cn,Is=new re,oi=new Ml,il=new Ml,wn=new re;class jn extends Qs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xT++}),this.uuid=Js(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(FE(e)?Wx:Xx)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,r=0){this.groups.push({start:e,count:n,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const c=new ht().getNormalMatrix(e);r.applyNormalMatrix(c),r.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return _i.makeRotationFromQuaternion(e),this.applyMatrix4(_i),this}rotateX(e){return _i.makeRotationX(e),this.applyMatrix4(_i),this}rotateY(e){return _i.makeRotationY(e),this.applyMatrix4(_i),this}rotateZ(e){return _i.makeRotationZ(e),this.applyMatrix4(_i),this}translate(e,n,r){return _i.makeTranslation(e,n,r),this.applyMatrix4(_i),this}scale(e,n,r){return _i.makeScale(e,n,r),this.applyMatrix4(_i),this}lookAt(e){return ch.lookAt(e),ch.updateMatrix(),this.applyMatrix4(ch.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Is).negate(),this.translate(Is.x,Is.y,Is.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const r=[];for(let o=0,c=e.length;o<c;o++){const f=e[o];r.push(f.x,f.y,f.z||0)}this.setAttribute("position",new Qt(r,3))}else{const r=Math.min(e.length,n.count);for(let o=0;o<r;o++){const c=e[o];n.setXYZ(o,c.x,c.y,c.z||0)}e.length>n.count&&st("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ml);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){wt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new re(-1/0,-1/0,-1/0),new re(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let r=0,o=n.length;r<o;r++){const c=n[r];oi.setFromBufferAttribute(c),this.morphTargetsRelative?(wn.addVectors(this.boundingBox.min,oi.min),this.boundingBox.expandByPoint(wn),wn.addVectors(this.boundingBox.max,oi.max),this.boundingBox.expandByPoint(wn)):(this.boundingBox.expandByPoint(oi.min),this.boundingBox.expandByPoint(oi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&wt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Du);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){wt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new re,1/0);return}if(e){const r=this.boundingSphere.center;if(oi.setFromBufferAttribute(e),n)for(let c=0,f=n.length;c<f;c++){const h=n[c];il.setFromBufferAttribute(h),this.morphTargetsRelative?(wn.addVectors(oi.min,il.min),oi.expandByPoint(wn),wn.addVectors(oi.max,il.max),oi.expandByPoint(wn)):(oi.expandByPoint(il.min),oi.expandByPoint(il.max))}oi.getCenter(r);let o=0;for(let c=0,f=e.count;c<f;c++)wn.fromBufferAttribute(e,c),o=Math.max(o,r.distanceToSquared(wn));if(n)for(let c=0,f=n.length;c<f;c++){const h=n[c],m=this.morphTargetsRelative;for(let d=0,g=h.count;d<g;d++)wn.fromBufferAttribute(h,d),m&&(Is.fromBufferAttribute(e,d),wn.add(Is)),o=Math.max(o,r.distanceToSquared(wn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&wt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){wt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=n.position,o=n.normal,c=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Yi(new Float32Array(4*r.count),4));const f=this.getAttribute("tangent"),h=[],m=[];for(let E=0;E<r.count;E++)h[E]=new re,m[E]=new re;const d=new re,g=new re,b=new re,_=new Ut,y=new Ut,S=new Ut,A=new re,x=new re;function v(E,D,Y){d.fromBufferAttribute(r,E),g.fromBufferAttribute(r,D),b.fromBufferAttribute(r,Y),_.fromBufferAttribute(c,E),y.fromBufferAttribute(c,D),S.fromBufferAttribute(c,Y),g.sub(d),b.sub(d),y.sub(_),S.sub(_);const k=1/(y.x*S.y-S.x*y.y);isFinite(k)&&(A.copy(g).multiplyScalar(S.y).addScaledVector(b,-y.y).multiplyScalar(k),x.copy(b).multiplyScalar(y.x).addScaledVector(g,-S.x).multiplyScalar(k),h[E].add(A),h[D].add(A),h[Y].add(A),m[E].add(x),m[D].add(x),m[Y].add(x))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let E=0,D=T.length;E<D;++E){const Y=T[E],k=Y.start,X=Y.count;for(let $=k,K=k+X;$<K;$+=3)v(e.getX($+0),e.getX($+1),e.getX($+2))}const C=new re,R=new re,P=new re,O=new re;function F(E){P.fromBufferAttribute(o,E),O.copy(P);const D=h[E];C.copy(D),C.sub(P.multiplyScalar(P.dot(D))).normalize(),R.crossVectors(O,D);const k=R.dot(m[E])<0?-1:1;f.setXYZW(E,C.x,C.y,C.z,k)}for(let E=0,D=T.length;E<D;++E){const Y=T[E],k=Y.start,X=Y.count;for(let $=k,K=k+X;$<K;$+=3)F(e.getX($+0)),F(e.getX($+1)),F(e.getX($+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Yi(new Float32Array(n.count*3),3),this.setAttribute("normal",r);else for(let _=0,y=r.count;_<y;_++)r.setXYZ(_,0,0,0);const o=new re,c=new re,f=new re,h=new re,m=new re,d=new re,g=new re,b=new re;if(e)for(let _=0,y=e.count;_<y;_+=3){const S=e.getX(_+0),A=e.getX(_+1),x=e.getX(_+2);o.fromBufferAttribute(n,S),c.fromBufferAttribute(n,A),f.fromBufferAttribute(n,x),g.subVectors(f,c),b.subVectors(o,c),g.cross(b),h.fromBufferAttribute(r,S),m.fromBufferAttribute(r,A),d.fromBufferAttribute(r,x),h.add(g),m.add(g),d.add(g),r.setXYZ(S,h.x,h.y,h.z),r.setXYZ(A,m.x,m.y,m.z),r.setXYZ(x,d.x,d.y,d.z)}else for(let _=0,y=n.count;_<y;_+=3)o.fromBufferAttribute(n,_+0),c.fromBufferAttribute(n,_+1),f.fromBufferAttribute(n,_+2),g.subVectors(f,c),b.subVectors(o,c),g.cross(b),r.setXYZ(_+0,g.x,g.y,g.z),r.setXYZ(_+1,g.x,g.y,g.z),r.setXYZ(_+2,g.x,g.y,g.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,r=e.count;n<r;n++)wn.fromBufferAttribute(e,n),wn.normalize(),e.setXYZ(n,wn.x,wn.y,wn.z)}toNonIndexed(){function e(h,m){const d=h.array,g=h.itemSize,b=h.normalized,_=new d.constructor(m.length*g);let y=0,S=0;for(let A=0,x=m.length;A<x;A++){h.isInterleavedBufferAttribute?y=m[A]*h.data.stride+h.offset:y=m[A]*g;for(let v=0;v<g;v++)_[S++]=d[y++]}return new Yi(_,g,b)}if(this.index===null)return st("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new jn,r=this.index.array,o=this.attributes;for(const h in o){const m=o[h],d=e(m,r);n.setAttribute(h,d)}const c=this.morphAttributes;for(const h in c){const m=[],d=c[h];for(let g=0,b=d.length;g<b;g++){const _=d[g],y=e(_,r);m.push(y)}n.morphAttributes[h]=m}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,m=f.length;h<m;h++){const d=f[h];n.addGroup(d.start,d.count,d.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const d in m)m[d]!==void 0&&(e[d]=m[d]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const r=this.attributes;for(const m in r){const d=r[m];e.data.attributes[m]=d.toJSON(e.data)}const o={};let c=!1;for(const m in this.morphAttributes){const d=this.morphAttributes[m],g=[];for(let b=0,_=d.length;b<_;b++){const y=d[b];g.push(y.toJSON(e.data))}g.length>0&&(o[m]=g,c=!0)}c&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere=h.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const o=e.attributes;for(const d in o){const g=o[d];this.setAttribute(d,g.clone(n))}const c=e.morphAttributes;for(const d in c){const g=[],b=c[d];for(let _=0,y=b.length;_<y;_++)g.push(b[_].clone(n));this.morphAttributes[d]=g}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let d=0,g=f.length;d<g;d++){const b=f[d];this.addGroup(b.start,b.count,b.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let yT=0;class eo extends Qs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yT++}),this.uuid=Js(),this.name="",this.type="Material",this.blending=Vs,this.side=dr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Dh,this.blendDst=Nh,this.blendEquation=zr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new yt(0,0,0),this.blendAlpha=0,this.depthFunc=Ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=As,this.stencilZFail=As,this.stencilZPass=As,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const r=e[n];if(r===void 0){st(`Material: parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){st(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(r):o&&o.isVector3&&r&&r.isVector3?o.copy(r):this[n]=r}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Vs&&(r.blending=this.blending),this.side!==dr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Dh&&(r.blendSrc=this.blendSrc),this.blendDst!==Nh&&(r.blendDst=this.blendDst),this.blendEquation!==zr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Ws&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zv&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==As&&(r.stencilFail=this.stencilFail),this.stencilZFail!==As&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==As&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.allowOverride===!1&&(r.allowOverride=!1),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function o(c){const f=[];for(const h in c){const m=c[h];delete m.metadata,f.push(m)}return f}if(n){const c=o(e.textures),f=o(e.images);c.length>0&&(r.textures=c),f.length>0&&(r.images=f)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let r=null;if(n!==null){const o=n.length;r=new Array(o);for(let c=0;c!==o;++c)r[c]=n[c].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Sa=new re,uh=new re,Wc=new re,rr=new re,fh=new re,qc=new re,dh=new re;class Xp{constructor(e=new re,n=new re(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sa)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const r=n.dot(this.direction);return r<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Sa.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Sa.copy(this.origin).addScaledVector(this.direction,n),Sa.distanceToSquared(e))}distanceSqToSegment(e,n,r,o){uh.copy(e).add(n).multiplyScalar(.5),Wc.copy(n).sub(e).normalize(),rr.copy(this.origin).sub(uh);const c=e.distanceTo(n)*.5,f=-this.direction.dot(Wc),h=rr.dot(this.direction),m=-rr.dot(Wc),d=rr.lengthSq(),g=Math.abs(1-f*f);let b,_,y,S;if(g>0)if(b=f*m-h,_=f*h-m,S=c*g,b>=0)if(_>=-S)if(_<=S){const A=1/g;b*=A,_*=A,y=b*(b+f*_+2*h)+_*(f*b+_+2*m)+d}else _=c,b=Math.max(0,-(f*_+h)),y=-b*b+_*(_+2*m)+d;else _=-c,b=Math.max(0,-(f*_+h)),y=-b*b+_*(_+2*m)+d;else _<=-S?(b=Math.max(0,-(-f*c+h)),_=b>0?-c:Math.min(Math.max(-c,-m),c),y=-b*b+_*(_+2*m)+d):_<=S?(b=0,_=Math.min(Math.max(-c,-m),c),y=_*(_+2*m)+d):(b=Math.max(0,-(f*c+h)),_=b>0?c:Math.min(Math.max(-c,-m),c),y=-b*b+_*(_+2*m)+d);else _=f>0?-c:c,b=Math.max(0,-(f*_+h)),y=-b*b+_*(_+2*m)+d;return r&&r.copy(this.origin).addScaledVector(this.direction,b),o&&o.copy(uh).addScaledVector(Wc,_),y}intersectSphere(e,n){Sa.subVectors(e.center,this.origin);const r=Sa.dot(this.direction),o=Sa.dot(Sa)-r*r,c=e.radius*e.radius;if(o>c)return null;const f=Math.sqrt(c-o),h=r-f,m=r+f;return m<0?null:h<0?this.at(m,n):this.at(h,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/n;return r>=0?r:null}intersectPlane(e,n){const r=this.distanceToPlane(e);return r===null?null:this.at(r,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let r,o,c,f,h,m;const d=1/this.direction.x,g=1/this.direction.y,b=1/this.direction.z,_=this.origin;return d>=0?(r=(e.min.x-_.x)*d,o=(e.max.x-_.x)*d):(r=(e.max.x-_.x)*d,o=(e.min.x-_.x)*d),g>=0?(c=(e.min.y-_.y)*g,f=(e.max.y-_.y)*g):(c=(e.max.y-_.y)*g,f=(e.min.y-_.y)*g),r>f||c>o||((c>r||isNaN(r))&&(r=c),(f<o||isNaN(o))&&(o=f),b>=0?(h=(e.min.z-_.z)*b,m=(e.max.z-_.z)*b):(h=(e.max.z-_.z)*b,m=(e.min.z-_.z)*b),r>m||h>o)||((h>r||r!==r)&&(r=h),(m<o||o!==o)&&(o=m),o<0)?null:this.at(r>=0?r:o,n)}intersectsBox(e){return this.intersectBox(e,Sa)!==null}intersectTriangle(e,n,r,o,c){fh.subVectors(n,e),qc.subVectors(r,e),dh.crossVectors(fh,qc);let f=this.direction.dot(dh),h;if(f>0){if(o)return null;h=1}else if(f<0)h=-1,f=-f;else return null;rr.subVectors(this.origin,e);const m=h*this.direction.dot(qc.crossVectors(rr,qc));if(m<0)return null;const d=h*this.direction.dot(fh.cross(rr));if(d<0||m+d>f)return null;const g=-h*rr.dot(dh);return g<0?null:this.at(g/f,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class qx extends eo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ki,this.combine=Ax,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const d_=new en,Ur=new Xp,Yc=new Du,h_=new re,Zc=new re,Kc=new re,Qc=new re,hh=new re,Jc=new re,p_=new re,$c=new re;class Ui extends Cn{constructor(e=new jn,n=new qx){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const o=n[r[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=o.length;c<f;c++){const h=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(e,n){const r=this.geometry,o=r.attributes.position,c=r.morphAttributes.position,f=r.morphTargetsRelative;n.fromBufferAttribute(o,e);const h=this.morphTargetInfluences;if(c&&h){Jc.set(0,0,0);for(let m=0,d=c.length;m<d;m++){const g=h[m],b=c[m];g!==0&&(hh.fromBufferAttribute(b,e),f?Jc.addScaledVector(hh,g):Jc.addScaledVector(hh.sub(n),g))}n.add(Jc)}return n}raycast(e,n){const r=this.geometry,o=this.material,c=this.matrixWorld;o!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Yc.copy(r.boundingSphere),Yc.applyMatrix4(c),Ur.copy(e.ray).recast(e.near),!(Yc.containsPoint(Ur.origin)===!1&&(Ur.intersectSphere(Yc,h_)===null||Ur.origin.distanceToSquared(h_)>(e.far-e.near)**2))&&(d_.copy(c).invert(),Ur.copy(e.ray).applyMatrix4(d_),!(r.boundingBox!==null&&Ur.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,n,Ur)))}_computeIntersections(e,n,r){let o;const c=this.geometry,f=this.material,h=c.index,m=c.attributes.position,d=c.attributes.uv,g=c.attributes.uv1,b=c.attributes.normal,_=c.groups,y=c.drawRange;if(h!==null)if(Array.isArray(f))for(let S=0,A=_.length;S<A;S++){const x=_[S],v=f[x.materialIndex],T=Math.max(x.start,y.start),C=Math.min(h.count,Math.min(x.start+x.count,y.start+y.count));for(let R=T,P=C;R<P;R+=3){const O=h.getX(R),F=h.getX(R+1),E=h.getX(R+2);o=eu(this,v,e,r,d,g,b,O,F,E),o&&(o.faceIndex=Math.floor(R/3),o.face.materialIndex=x.materialIndex,n.push(o))}}else{const S=Math.max(0,y.start),A=Math.min(h.count,y.start+y.count);for(let x=S,v=A;x<v;x+=3){const T=h.getX(x),C=h.getX(x+1),R=h.getX(x+2);o=eu(this,f,e,r,d,g,b,T,C,R),o&&(o.faceIndex=Math.floor(x/3),n.push(o))}}else if(m!==void 0)if(Array.isArray(f))for(let S=0,A=_.length;S<A;S++){const x=_[S],v=f[x.materialIndex],T=Math.max(x.start,y.start),C=Math.min(m.count,Math.min(x.start+x.count,y.start+y.count));for(let R=T,P=C;R<P;R+=3){const O=R,F=R+1,E=R+2;o=eu(this,v,e,r,d,g,b,O,F,E),o&&(o.faceIndex=Math.floor(R/3),o.face.materialIndex=x.materialIndex,n.push(o))}}else{const S=Math.max(0,y.start),A=Math.min(m.count,y.start+y.count);for(let x=S,v=A;x<v;x+=3){const T=x,C=x+1,R=x+2;o=eu(this,f,e,r,d,g,b,T,C,R),o&&(o.faceIndex=Math.floor(x/3),n.push(o))}}}}function bT(a,e,n,r,o,c,f,h){let m;if(e.side===Jn?m=r.intersectTriangle(f,c,o,!0,h):m=r.intersectTriangle(o,c,f,e.side===dr,h),m===null)return null;$c.copy(h),$c.applyMatrix4(a.matrixWorld);const d=n.ray.origin.distanceTo($c);return d<n.near||d>n.far?null:{distance:d,point:$c.clone(),object:a}}function eu(a,e,n,r,o,c,f,h,m,d){a.getVertexPosition(h,Zc),a.getVertexPosition(m,Kc),a.getVertexPosition(d,Qc);const g=bT(a,e,n,r,Zc,Kc,Qc,p_);if(g){const b=new re;Di.getBarycoord(p_,Zc,Kc,Qc,b),o&&(g.uv=Di.getInterpolatedAttribute(o,h,m,d,b,new Ut)),c&&(g.uv1=Di.getInterpolatedAttribute(c,h,m,d,b,new Ut)),f&&(g.normal=Di.getInterpolatedAttribute(f,h,m,d,b,new re),g.normal.dot(r.direction)>0&&g.normal.multiplyScalar(-1));const _={a:h,b:m,c:d,normal:new re,materialIndex:0};Di.getNormal(Zc,Kc,Qc,_.normal),g.face=_,g.barycoord=b}return g}class ST extends Vn{constructor(e=null,n=1,r=1,o,c,f,h,m,d=Ln,g=Ln,b,_){super(null,f,h,m,d,g,o,c,b,_),this.isDataTexture=!0,this.image={data:e,width:n,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ph=new re,MT=new re,ET=new ht;class Fr{constructor(e=new re(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,r,o){return this.normal.set(e,n,r),this.constant=o,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,r){const o=ph.subVectors(r,n).cross(MT.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const r=e.delta(ph),o=this.normal.dot(r);if(o===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const c=-(e.start.dot(this.normal)+this.constant)/o;return c<0||c>1?null:n.copy(e.start).addScaledVector(r,c)}intersectsLine(e){const n=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return n<0&&r>0||r<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const r=n||ET.getNormalMatrix(e),o=this.coplanarPoint(ph).applyMatrix4(e),c=this.normal.applyMatrix3(r).normalize();return this.constant=-o.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Lr=new Du,TT=new Ut(.5,.5),tu=new re;class Wp{constructor(e=new Fr,n=new Fr,r=new Fr,o=new Fr,c=new Fr,f=new Fr){this.planes=[e,n,r,o,c,f]}set(e,n,r,o,c,f){const h=this.planes;return h[0].copy(e),h[1].copy(n),h[2].copy(r),h[3].copy(o),h[4].copy(c),h[5].copy(f),this}copy(e){const n=this.planes;for(let r=0;r<6;r++)n[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,n=Xi,r=!1){const o=this.planes,c=e.elements,f=c[0],h=c[1],m=c[2],d=c[3],g=c[4],b=c[5],_=c[6],y=c[7],S=c[8],A=c[9],x=c[10],v=c[11],T=c[12],C=c[13],R=c[14],P=c[15];if(o[0].setComponents(d-f,y-g,v-S,P-T).normalize(),o[1].setComponents(d+f,y+g,v+S,P+T).normalize(),o[2].setComponents(d+h,y+b,v+A,P+C).normalize(),o[3].setComponents(d-h,y-b,v-A,P-C).normalize(),r)o[4].setComponents(m,_,x,R).normalize(),o[5].setComponents(d-m,y-_,v-x,P-R).normalize();else if(o[4].setComponents(d-m,y-_,v-x,P-R).normalize(),n===Xi)o[5].setComponents(d+m,y+_,v+x,P+R).normalize();else if(n===vl)o[5].setComponents(m,_,x,R).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Lr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Lr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Lr)}intersectsSprite(e){Lr.center.set(0,0,0);const n=TT.distanceTo(e.center);return Lr.radius=.7071067811865476+n,Lr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Lr)}intersectsSphere(e){const n=this.planes,r=e.center,o=-e.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(r)<o)return!1;return!0}intersectsBox(e){const n=this.planes;for(let r=0;r<6;r++){const o=n[r];if(tu.x=o.normal.x>0?e.max.x:e.min.x,tu.y=o.normal.y>0?e.max.y:e.min.y,tu.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(tu)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let r=0;r<6;r++)if(n[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Yx extends eo{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Tu=new re,Au=new re,m_=new en,al=new Xp,nu=new Du,mh=new re,g_=new re;class AT extends Cn{constructor(e=new jn,n=new Yx){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,r=[0];for(let o=1,c=n.count;o<c;o++)Tu.fromBufferAttribute(n,o-1),Au.fromBufferAttribute(n,o),r[o]=r[o-1],r[o]+=Tu.distanceTo(Au);e.setAttribute("lineDistance",new Qt(r,1))}else st("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const r=this.geometry,o=this.matrixWorld,c=e.params.Line.threshold,f=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),nu.copy(r.boundingSphere),nu.applyMatrix4(o),nu.radius+=c,e.ray.intersectsSphere(nu)===!1)return;m_.copy(o).invert(),al.copy(e.ray).applyMatrix4(m_);const h=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=h*h,d=this.isLineSegments?2:1,g=r.index,_=r.attributes.position;if(g!==null){const y=Math.max(0,f.start),S=Math.min(g.count,f.start+f.count);for(let A=y,x=S-1;A<x;A+=d){const v=g.getX(A),T=g.getX(A+1),C=iu(this,e,al,m,v,T,A);C&&n.push(C)}if(this.isLineLoop){const A=g.getX(S-1),x=g.getX(y),v=iu(this,e,al,m,A,x,S-1);v&&n.push(v)}}else{const y=Math.max(0,f.start),S=Math.min(_.count,f.start+f.count);for(let A=y,x=S-1;A<x;A+=d){const v=iu(this,e,al,m,A,A+1,A);v&&n.push(v)}if(this.isLineLoop){const A=iu(this,e,al,m,S-1,y,S-1);A&&n.push(A)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const o=n[r[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=o.length;c<f;c++){const h=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}}function iu(a,e,n,r,o,c,f){const h=a.geometry.attributes.position;if(Tu.fromBufferAttribute(h,o),Au.fromBufferAttribute(h,c),n.distanceSqToSegment(Tu,Au,mh,g_)>r)return;mh.applyMatrix4(a.matrixWorld);const d=e.ray.origin.distanceTo(mh);if(!(d<e.near||d>e.far))return{distance:d,point:g_.clone().applyMatrix4(a.matrixWorld),index:f,face:null,faceIndex:null,barycoord:null,object:a}}const v_=new re,__=new re;class wT extends AT{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,r=[];for(let o=0,c=n.count;o<c;o+=2)v_.fromBufferAttribute(n,o),__.fromBufferAttribute(n,o+1),r[o]=o===0?0:r[o-1],r[o+1]=r[o]+v_.distanceTo(__);e.setAttribute("lineDistance",new Qt(r,1))}else st("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Zx extends Vn{constructor(e=[],n=Gr,r,o,c,f,h,m,d,g){super(e,n,r,o,c,f,h,m,d,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class xl extends Vn{constructor(e,n,r=Zi,o,c,f,h=Ln,m=Ln,d,g=Ca,b=1){if(g!==Ca&&g!==kr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const _={width:e,height:n,depth:b};super(_,o,c,f,h,m,g,r,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Gp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class RT extends xl{constructor(e,n=Zi,r=Gr,o,c,f=Ln,h=Ln,m,d=Ca){const g={width:e,height:e,depth:1},b=[g,g,g,g,g,g];super(e,e,n,r,o,c,f,h,m,d),this.image=b,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Kx extends Vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class to extends jn{constructor(e=1,n=1,r=1,o=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:r,widthSegments:o,heightSegments:c,depthSegments:f};const h=this;o=Math.floor(o),c=Math.floor(c),f=Math.floor(f);const m=[],d=[],g=[],b=[];let _=0,y=0;S("z","y","x",-1,-1,r,n,e,f,c,0),S("z","y","x",1,-1,r,n,-e,f,c,1),S("x","z","y",1,1,e,r,n,o,f,2),S("x","z","y",1,-1,e,r,-n,o,f,3),S("x","y","z",1,-1,e,n,r,o,c,4),S("x","y","z",-1,-1,e,n,-r,o,c,5),this.setIndex(m),this.setAttribute("position",new Qt(d,3)),this.setAttribute("normal",new Qt(g,3)),this.setAttribute("uv",new Qt(b,2));function S(A,x,v,T,C,R,P,O,F,E,D){const Y=R/F,k=P/E,X=R/2,$=P/2,K=O/2,V=F+1,I=E+1;let B=0,se=0;const he=new re;for(let L=0;L<I;L++){const Q=L*k-$;for(let le=0;le<V;le++){const ge=le*Y-X;he[A]=ge*T,he[x]=Q*C,he[v]=K,d.push(he.x,he.y,he.z),he[A]=0,he[x]=0,he[v]=O>0?1:-1,g.push(he.x,he.y,he.z),b.push(le/F),b.push(1-L/E),B+=1}}for(let L=0;L<E;L++)for(let Q=0;Q<F;Q++){const le=_+Q+V*L,ge=_+Q+V*(L+1),we=_+(Q+1)+V*(L+1),Le=_+(Q+1)+V*L;m.push(le,ge,Le),m.push(ge,we,Le),se+=6}h.addGroup(y,se,D),y+=se,_+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new to(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class qp extends jn{constructor(e=1,n=1,r=4,o=8,c=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:n,capSegments:r,radialSegments:o,heightSegments:c},n=Math.max(0,n),r=Math.max(1,Math.floor(r)),o=Math.max(3,Math.floor(o)),c=Math.max(1,Math.floor(c));const f=[],h=[],m=[],d=[],g=n/2,b=Math.PI/2*e,_=n,y=2*b+_,S=r*2+c,A=o+1,x=new re,v=new re;for(let T=0;T<=S;T++){let C=0,R=0,P=0,O=0;if(T<=r){const D=T/r,Y=D*Math.PI/2;R=-g-e*Math.cos(Y),P=e*Math.sin(Y),O=-e*Math.cos(Y),C=D*b}else if(T<=r+c){const D=(T-r)/c;R=-g+D*n,P=e,O=0,C=b+D*_}else{const D=(T-r-c)/r,Y=D*Math.PI/2;R=g+e*Math.sin(Y),P=e*Math.cos(Y),O=e*Math.sin(Y),C=b+_+D*b}const F=Math.max(0,Math.min(1,C/y));let E=0;T===0?E=.5/o:T===S&&(E=-.5/o);for(let D=0;D<=o;D++){const Y=D/o,k=Y*Math.PI*2,X=Math.sin(k),$=Math.cos(k);v.x=-P*$,v.y=R,v.z=P*X,h.push(v.x,v.y,v.z),x.set(-P*$,O,P*X),x.normalize(),m.push(x.x,x.y,x.z),d.push(Y+E,F)}if(T>0){const D=(T-1)*A;for(let Y=0;Y<o;Y++){const k=D+Y,X=D+Y+1,$=T*A+Y,K=T*A+Y+1;f.push(k,X,$),f.push(X,K,$)}}}this.setIndex(f),this.setAttribute("position",new Qt(h,3)),this.setAttribute("normal",new Qt(m,3)),this.setAttribute("uv",new Qt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qp(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class yl extends jn{constructor(e=1,n=1,r=1,o=32,c=1,f=!1,h=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:r,radialSegments:o,heightSegments:c,openEnded:f,thetaStart:h,thetaLength:m};const d=this;o=Math.floor(o),c=Math.floor(c);const g=[],b=[],_=[],y=[];let S=0;const A=[],x=r/2;let v=0;T(),f===!1&&(e>0&&C(!0),n>0&&C(!1)),this.setIndex(g),this.setAttribute("position",new Qt(b,3)),this.setAttribute("normal",new Qt(_,3)),this.setAttribute("uv",new Qt(y,2));function T(){const R=new re,P=new re;let O=0;const F=(n-e)/r;for(let E=0;E<=c;E++){const D=[],Y=E/c,k=Y*(n-e)+e;for(let X=0;X<=o;X++){const $=X/o,K=$*m+h,V=Math.sin(K),I=Math.cos(K);P.x=k*V,P.y=-Y*r+x,P.z=k*I,b.push(P.x,P.y,P.z),R.set(V,F,I).normalize(),_.push(R.x,R.y,R.z),y.push($,1-Y),D.push(S++)}A.push(D)}for(let E=0;E<o;E++)for(let D=0;D<c;D++){const Y=A[D][E],k=A[D+1][E],X=A[D+1][E+1],$=A[D][E+1];(e>0||D!==0)&&(g.push(Y,k,$),O+=3),(n>0||D!==c-1)&&(g.push(k,X,$),O+=3)}d.addGroup(v,O,0),v+=O}function C(R){const P=S,O=new Ut,F=new re;let E=0;const D=R===!0?e:n,Y=R===!0?1:-1;for(let X=1;X<=o;X++)b.push(0,x*Y,0),_.push(0,Y,0),y.push(.5,.5),S++;const k=S;for(let X=0;X<=o;X++){const K=X/o*m+h,V=Math.cos(K),I=Math.sin(K);F.x=D*I,F.y=x*Y,F.z=D*V,b.push(F.x,F.y,F.z),_.push(0,Y,0),O.x=V*.5+.5,O.y=I*.5*Y+.5,y.push(O.x,O.y),S++}for(let X=0;X<o;X++){const $=P+X,K=k+X;R===!0?g.push(K,K+1,$):g.push(K+1,K,$),E+=3}d.addGroup(v,E,R===!0?1:2),v+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yl(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Yp extends yl{constructor(e=1,n=1,r=32,o=1,c=!1,f=0,h=Math.PI*2){super(0,e,n,r,o,c,f,h),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:r,heightSegments:o,openEnded:c,thetaStart:f,thetaLength:h}}static fromJSON(e){return new Yp(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class no extends jn{constructor(e=1,n=1,r=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:r,heightSegments:o};const c=e/2,f=n/2,h=Math.floor(r),m=Math.floor(o),d=h+1,g=m+1,b=e/h,_=n/m,y=[],S=[],A=[],x=[];for(let v=0;v<g;v++){const T=v*_-f;for(let C=0;C<d;C++){const R=C*b-c;S.push(R,-T,0),A.push(0,0,1),x.push(C/h),x.push(1-v/m)}}for(let v=0;v<m;v++)for(let T=0;T<h;T++){const C=T+d*v,R=T+d*(v+1),P=T+1+d*(v+1),O=T+1+d*v;y.push(C,R,O),y.push(R,P,O)}this.setIndex(y),this.setAttribute("position",new Qt(S,3)),this.setAttribute("normal",new Qt(A,3)),this.setAttribute("uv",new Qt(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new no(e.width,e.height,e.widthSegments,e.heightSegments)}}class Zp extends jn{constructor(e=1,n=32,r=16,o=0,c=Math.PI*2,f=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:r,phiStart:o,phiLength:c,thetaStart:f,thetaLength:h},n=Math.max(3,Math.floor(n)),r=Math.max(2,Math.floor(r));const m=Math.min(f+h,Math.PI);let d=0;const g=[],b=new re,_=new re,y=[],S=[],A=[],x=[];for(let v=0;v<=r;v++){const T=[],C=v/r;let R=0;v===0&&f===0?R=.5/n:v===r&&m===Math.PI&&(R=-.5/n);for(let P=0;P<=n;P++){const O=P/n;b.x=-e*Math.cos(o+O*c)*Math.sin(f+C*h),b.y=e*Math.cos(f+C*h),b.z=e*Math.sin(o+O*c)*Math.sin(f+C*h),S.push(b.x,b.y,b.z),_.copy(b).normalize(),A.push(_.x,_.y,_.z),x.push(O+R,1-C),T.push(d++)}g.push(T)}for(let v=0;v<r;v++)for(let T=0;T<n;T++){const C=g[v][T+1],R=g[v][T],P=g[v+1][T],O=g[v+1][T+1];(v!==0||f>0)&&y.push(C,R,O),(v!==r-1||m<Math.PI)&&y.push(R,P,O)}this.setIndex(y),this.setAttribute("position",new Qt(S,3)),this.setAttribute("normal",new Qt(A,3)),this.setAttribute("uv",new Qt(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zp(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Kp extends jn{constructor(e=1,n=.4,r=12,o=48,c=Math.PI*2,f=0,h=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:r,tubularSegments:o,arc:c,thetaStart:f,thetaLength:h},r=Math.floor(r),o=Math.floor(o);const m=[],d=[],g=[],b=[],_=new re,y=new re,S=new re;for(let A=0;A<=r;A++){const x=f+A/r*h;for(let v=0;v<=o;v++){const T=v/o*c;y.x=(e+n*Math.cos(x))*Math.cos(T),y.y=(e+n*Math.cos(x))*Math.sin(T),y.z=n*Math.sin(x),d.push(y.x,y.y,y.z),_.x=e*Math.cos(T),_.y=e*Math.sin(T),S.subVectors(y,_).normalize(),g.push(S.x,S.y,S.z),b.push(v/o),b.push(A/r)}}for(let A=1;A<=r;A++)for(let x=1;x<=o;x++){const v=(o+1)*A+x-1,T=(o+1)*(A-1)+x-1,C=(o+1)*(A-1)+x,R=(o+1)*A+x;m.push(v,T,R),m.push(T,C,R)}this.setIndex(m),this.setAttribute("position",new Qt(d,3)),this.setAttribute("normal",new Qt(g,3)),this.setAttribute("uv",new Qt(b,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kp(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function Ks(a){const e={};for(const n in a){e[n]={};for(const r in a[n]){const o=a[n][r];o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)?o.isRenderTargetTexture?(st("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][r]=null):e[n][r]=o.clone():Array.isArray(o)?e[n][r]=o.slice():e[n][r]=o}}return e}function Gn(a){const e={};for(let n=0;n<a.length;n++){const r=Ks(a[n]);for(const o in r)e[o]=r[o]}return e}function CT(a){const e=[];for(let n=0;n<a.length;n++)e.push(a[n].clone());return e}function Qx(a){const e=a.getRenderTarget();return e===null?a.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Rt.workingColorSpace}const DT={clone:Ks,merge:Gn};var NT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,UT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Qi extends eo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=NT,this.fragmentShader=UT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ks(e.uniforms),this.uniformsGroups=CT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const o in this.uniforms){const f=this.uniforms[o].value;f&&f.isTexture?n.uniforms[o]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?n.uniforms[o]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[o]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[o]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[o]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[o]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[o]={type:"m4",value:f.toArray()}:n.uniforms[o]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const r={};for(const o in this.extensions)this.extensions[o]===!0&&(r[o]=!0);return Object.keys(r).length>0&&(n.extensions=r),n}}class LT extends Qi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Jx extends eo{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=kx,this.normalScale=new Ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ki,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class OT extends eo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=CE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class PT extends eo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Qp extends Cn{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new yt(e),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}class IT extends Qp{constructor(e,n,r){super(e,r),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Cn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new yt(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}toJSON(e){const n=super.toJSON(e);return n.object.groundColor=this.groundColor.getHex(),n}}const gh=new en,x_=new re,y_=new re;class FT{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ut(512,512),this.mapType=ci,this.map=null,this.mapPass=null,this.matrix=new en,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Wp,this._frameExtents=new Ut(1,1),this._viewportCount=1,this._viewports=[new on(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,r=this.matrix;x_.setFromMatrixPosition(e.matrixWorld),n.position.copy(x_),y_.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(y_),n.updateMatrixWorld(),gh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gh,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===vl||n.reversedDepth?r.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(gh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const au=new re,ru=new $s,ki=new re;class $x extends Cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new en,this.projectionMatrix=new en,this.projectionMatrixInverse=new en,this.coordinateSystem=Xi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(au,ru,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(au,ru,ki.set(1,1,1)).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorld.decompose(au,ru,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(au,ru,ki.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const sr=new re,b_=new Ut,S_=new Ut;class yi extends $x{constructor(e=50,n=1,r=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=o,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=_l*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _l*2*Math.atan(Math.tan(fl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,r){sr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(sr.x,sr.y).multiplyScalar(-e/sr.z),sr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(sr.x,sr.y).multiplyScalar(-e/sr.z)}getViewSize(e,n){return this.getViewBounds(e,b_,S_),n.subVectors(S_,b_)}setViewOffset(e,n,r,o,c,f){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=o,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(fl*.5*this.fov)/this.zoom,r=2*n,o=this.aspect*r,c=-.5*o;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,d=f.fullHeight;c+=f.offsetX*o/m,n-=f.offsetY*r/d,o*=f.width/m,r*=f.height/d}const h=this.filmOffset;h!==0&&(c+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+o,n,n-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Jp extends $x{constructor(e=-1,n=1,r=1,o=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=r,this.bottom=o,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,r,o,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=o,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let c=r-e,f=r+e,h=o+n,m=o-n;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=d*this.view.offsetX,f=c+d*this.view.width,h-=g*this.view.offsetY,m=h-g*this.view.height}this.projectionMatrix.makeOrthographic(c,f,h,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class zT extends FT{constructor(){super(new Jp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class BT extends Qp{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Cn.DEFAULT_UP),this.updateMatrix(),this.target=new Cn,this.shadow=new zT}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}class HT extends Qp{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const Fs=-90,zs=1;class kT extends Cn{constructor(e,n,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new yi(Fs,zs,e,n);o.layers=this.layers,this.add(o);const c=new yi(Fs,zs,e,n);c.layers=this.layers,this.add(c);const f=new yi(Fs,zs,e,n);f.layers=this.layers,this.add(f);const h=new yi(Fs,zs,e,n);h.layers=this.layers,this.add(h);const m=new yi(Fs,zs,e,n);m.layers=this.layers,this.add(m);const d=new yi(Fs,zs,e,n);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[r,o,c,f,h,m]=n;for(const d of n)this.remove(d);if(e===Xi)r.up.set(0,1,0),r.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===vl)r.up.set(0,-1,0),r.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of n)this.add(d),d.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,f,h,m,d,g]=this.children,b=e.getRenderTarget(),_=e.getActiveCubeFace(),y=e.getActiveMipmapLevel(),S=e.xr.enabled;e.xr.enabled=!1;const A=r.texture.generateMipmaps;r.texture.generateMipmaps=!1;let x=!1;e.isWebGLRenderer===!0?x=e.state.buffers.depth.getReversed():x=e.reversedDepthBuffer,e.setRenderTarget(r,0,o),x&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),e.setRenderTarget(r,1,o),x&&e.autoClear===!1&&e.clearDepth(),e.render(n,f),e.setRenderTarget(r,2,o),x&&e.autoClear===!1&&e.clearDepth(),e.render(n,h),e.setRenderTarget(r,3,o),x&&e.autoClear===!1&&e.clearDepth(),e.render(n,m),e.setRenderTarget(r,4,o),x&&e.autoClear===!1&&e.clearDepth(),e.render(n,d),r.texture.generateMipmaps=A,e.setRenderTarget(r,5,o),x&&e.autoClear===!1&&e.clearDepth(),e.render(n,g),e.setRenderTarget(b,_,y),e.xr.enabled=S,r.texture.needsPMREMUpdate=!0}}class GT extends yi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const M_=new en;class VT{constructor(e,n,r=0,o=1/0){this.ray=new Xp(e,n),this.near=r,this.far=o,this.camera=null,this.layers=new Vp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):wt("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return M_.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(M_),this}intersectObject(e,n=!0,r=[]){return xp(e,this,r,n),r.sort(E_),r}intersectObjects(e,n=!0,r=[]){for(let o=0,c=e.length;o<c;o++)xp(e[o],this,r,n);return r.sort(E_),r}}function E_(a,e){return a.distance-e.distance}function xp(a,e,n,r){let o=!0;if(a.layers.test(e.layers)&&a.raycast(e,n)===!1&&(o=!1),o===!0&&r===!0){const c=a.children;for(let f=0,h=c.length;f<h;f++)xp(c[f],e,n,!0)}}class jT extends wT{constructor(e=10,n=10,r=4473924,o=8947848){r=new yt(r),o=new yt(o);const c=n/2,f=e/n,h=e/2,m=[],d=[];for(let _=0,y=0,S=-h;_<=n;_++,S+=f){m.push(-h,0,S,h,0,S),m.push(S,0,-h,S,0,h);const A=_===c?r:o;A.toArray(d,y),y+=3,A.toArray(d,y),y+=3,A.toArray(d,y),y+=3,A.toArray(d,y),y+=3}const g=new jn;g.setAttribute("position",new Qt(m,3)),g.setAttribute("color",new Qt(d,3));const b=new Yx({vertexColors:!0,toneMapped:!1});super(g,b),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}function T_(a,e,n,r){const o=XT(r);switch(n){case zx:return a*e;case Hx:return a*e/o.components*o.byteLength;case Ip:return a*e/o.components*o.byteLength;case Ys:return a*e*2/o.components*o.byteLength;case Fp:return a*e*2/o.components*o.byteLength;case Bx:return a*e*3/o.components*o.byteLength;case Ni:return a*e*4/o.components*o.byteLength;case zp:return a*e*4/o.components*o.byteLength;case mu:case gu:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*8;case vu:case _u:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case Gh:case jh:return Math.max(a,16)*Math.max(e,8)/4;case kh:case Vh:return Math.max(a,8)*Math.max(e,8)/2;case Xh:case Wh:case Yh:case Zh:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*8;case qh:case Kh:case Qh:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case Jh:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case $h:return Math.floor((a+4)/5)*Math.floor((e+3)/4)*16;case ep:return Math.floor((a+4)/5)*Math.floor((e+4)/5)*16;case tp:return Math.floor((a+5)/6)*Math.floor((e+4)/5)*16;case np:return Math.floor((a+5)/6)*Math.floor((e+5)/6)*16;case ip:return Math.floor((a+7)/8)*Math.floor((e+4)/5)*16;case ap:return Math.floor((a+7)/8)*Math.floor((e+5)/6)*16;case rp:return Math.floor((a+7)/8)*Math.floor((e+7)/8)*16;case sp:return Math.floor((a+9)/10)*Math.floor((e+4)/5)*16;case op:return Math.floor((a+9)/10)*Math.floor((e+5)/6)*16;case lp:return Math.floor((a+9)/10)*Math.floor((e+7)/8)*16;case cp:return Math.floor((a+9)/10)*Math.floor((e+9)/10)*16;case up:return Math.floor((a+11)/12)*Math.floor((e+9)/10)*16;case fp:return Math.floor((a+11)/12)*Math.floor((e+11)/12)*16;case dp:case hp:case pp:return Math.ceil(a/4)*Math.ceil(e/4)*16;case mp:case gp:return Math.ceil(a/4)*Math.ceil(e/4)*8;case vp:case _p:return Math.ceil(a/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function XT(a){switch(a){case ci:case Ox:return{byteLength:1,components:1};case ml:case Px:case Ra:return{byteLength:2,components:1};case Op:case Pp:return{byteLength:2,components:4};case Zi:case Lp:case ji:return{byteLength:4,components:1};case Ix:case Fx:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Np}}));typeof window<"u"&&(window.__THREE__?st("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Np);function ey(){let a=null,e=!1,n=null,r=null;function o(c,f){n(c,f),r=a.requestAnimationFrame(o)}return{start:function(){e!==!0&&n!==null&&(r=a.requestAnimationFrame(o),e=!0)},stop:function(){a.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(c){n=c},setContext:function(c){a=c}}}function WT(a){const e=new WeakMap;function n(h,m){const d=h.array,g=h.usage,b=d.byteLength,_=a.createBuffer();a.bindBuffer(m,_),a.bufferData(m,d,g),h.onUploadCallback();let y;if(d instanceof Float32Array)y=a.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)y=a.HALF_FLOAT;else if(d instanceof Uint16Array)h.isFloat16BufferAttribute?y=a.HALF_FLOAT:y=a.UNSIGNED_SHORT;else if(d instanceof Int16Array)y=a.SHORT;else if(d instanceof Uint32Array)y=a.UNSIGNED_INT;else if(d instanceof Int32Array)y=a.INT;else if(d instanceof Int8Array)y=a.BYTE;else if(d instanceof Uint8Array)y=a.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)y=a.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:_,type:y,bytesPerElement:d.BYTES_PER_ELEMENT,version:h.version,size:b}}function r(h,m,d){const g=m.array,b=m.updateRanges;if(a.bindBuffer(d,h),b.length===0)a.bufferSubData(d,0,g);else{b.sort((y,S)=>y.start-S.start);let _=0;for(let y=1;y<b.length;y++){const S=b[_],A=b[y];A.start<=S.start+S.count+1?S.count=Math.max(S.count,A.start+A.count-S.start):(++_,b[_]=A)}b.length=_+1;for(let y=0,S=b.length;y<S;y++){const A=b[y];a.bufferSubData(d,A.start*g.BYTES_PER_ELEMENT,g,A.start,A.count)}m.clearUpdateRanges()}m.onUploadCallback()}function o(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=e.get(h);m&&(a.deleteBuffer(m.buffer),e.delete(h))}function f(h,m){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const g=e.get(h);(!g||g.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const d=e.get(h);if(d===void 0)e.set(h,n(h,m));else if(d.version<h.version){if(d.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,h,m),d.version=h.version}}return{get:o,remove:c,update:f}}var qT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,YT=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ZT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,KT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,QT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,JT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$T=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,eA=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tA=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,nA=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,iA=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,aA=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rA=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,sA=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,oA=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,lA=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,cA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,uA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fA=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,hA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,pA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,mA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,gA=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,vA=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,_A=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,xA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,SA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,MA="gl_FragColor = linearToOutputTexel( gl_FragColor );",EA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,TA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,AA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,wA=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,RA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,CA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,DA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,NA=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,UA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,LA=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,OA=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,PA=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,IA=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,FA=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zA=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,BA=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,HA=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kA=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,GA=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,VA=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jA=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,XA=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,WA=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,qA=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,YA=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ZA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,KA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,QA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,JA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$A=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ew=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,nw=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,iw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,aw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ow=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lw=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,cw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,fw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,dw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,mw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,gw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_w=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Sw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Mw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ew=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Aw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ww=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Cw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Dw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Nw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Uw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lw=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ow=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Iw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Fw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,kw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Gw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Xw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ww=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$w=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,eR=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,tR=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,nR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,iR=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aR=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rR=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,oR=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lR=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cR=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uR=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,fR=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dR=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,hR=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,pR=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mR=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gR=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,vR=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_R=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xR=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yR=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,bR=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,SR=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,MR=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ER=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,TR=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pt={alphahash_fragment:qT,alphahash_pars_fragment:YT,alphamap_fragment:ZT,alphamap_pars_fragment:KT,alphatest_fragment:QT,alphatest_pars_fragment:JT,aomap_fragment:$T,aomap_pars_fragment:eA,batching_pars_vertex:tA,batching_vertex:nA,begin_vertex:iA,beginnormal_vertex:aA,bsdfs:rA,iridescence_fragment:sA,bumpmap_pars_fragment:oA,clipping_planes_fragment:lA,clipping_planes_pars_fragment:cA,clipping_planes_pars_vertex:uA,clipping_planes_vertex:fA,color_fragment:dA,color_pars_fragment:hA,color_pars_vertex:pA,color_vertex:mA,common:gA,cube_uv_reflection_fragment:vA,defaultnormal_vertex:_A,displacementmap_pars_vertex:xA,displacementmap_vertex:yA,emissivemap_fragment:bA,emissivemap_pars_fragment:SA,colorspace_fragment:MA,colorspace_pars_fragment:EA,envmap_fragment:TA,envmap_common_pars_fragment:AA,envmap_pars_fragment:wA,envmap_pars_vertex:RA,envmap_physical_pars_fragment:BA,envmap_vertex:CA,fog_vertex:DA,fog_pars_vertex:NA,fog_fragment:UA,fog_pars_fragment:LA,gradientmap_pars_fragment:OA,lightmap_pars_fragment:PA,lights_lambert_fragment:IA,lights_lambert_pars_fragment:FA,lights_pars_begin:zA,lights_toon_fragment:HA,lights_toon_pars_fragment:kA,lights_phong_fragment:GA,lights_phong_pars_fragment:VA,lights_physical_fragment:jA,lights_physical_pars_fragment:XA,lights_fragment_begin:WA,lights_fragment_maps:qA,lights_fragment_end:YA,logdepthbuf_fragment:ZA,logdepthbuf_pars_fragment:KA,logdepthbuf_pars_vertex:QA,logdepthbuf_vertex:JA,map_fragment:$A,map_pars_fragment:ew,map_particle_fragment:tw,map_particle_pars_fragment:nw,metalnessmap_fragment:iw,metalnessmap_pars_fragment:aw,morphinstance_vertex:rw,morphcolor_vertex:sw,morphnormal_vertex:ow,morphtarget_pars_vertex:lw,morphtarget_vertex:cw,normal_fragment_begin:uw,normal_fragment_maps:fw,normal_pars_fragment:dw,normal_pars_vertex:hw,normal_vertex:pw,normalmap_pars_fragment:mw,clearcoat_normal_fragment_begin:gw,clearcoat_normal_fragment_maps:vw,clearcoat_pars_fragment:_w,iridescence_pars_fragment:xw,opaque_fragment:yw,packing:bw,premultiplied_alpha_fragment:Sw,project_vertex:Mw,dithering_fragment:Ew,dithering_pars_fragment:Tw,roughnessmap_fragment:Aw,roughnessmap_pars_fragment:ww,shadowmap_pars_fragment:Rw,shadowmap_pars_vertex:Cw,shadowmap_vertex:Dw,shadowmask_pars_fragment:Nw,skinbase_vertex:Uw,skinning_pars_vertex:Lw,skinning_vertex:Ow,skinnormal_vertex:Pw,specularmap_fragment:Iw,specularmap_pars_fragment:Fw,tonemapping_fragment:zw,tonemapping_pars_fragment:Bw,transmission_fragment:Hw,transmission_pars_fragment:kw,uv_pars_fragment:Gw,uv_pars_vertex:Vw,uv_vertex:jw,worldpos_vertex:Xw,background_vert:Ww,background_frag:qw,backgroundCube_vert:Yw,backgroundCube_frag:Zw,cube_vert:Kw,cube_frag:Qw,depth_vert:Jw,depth_frag:$w,distance_vert:eR,distance_frag:tR,equirect_vert:nR,equirect_frag:iR,linedashed_vert:aR,linedashed_frag:rR,meshbasic_vert:sR,meshbasic_frag:oR,meshlambert_vert:lR,meshlambert_frag:cR,meshmatcap_vert:uR,meshmatcap_frag:fR,meshnormal_vert:dR,meshnormal_frag:hR,meshphong_vert:pR,meshphong_frag:mR,meshphysical_vert:gR,meshphysical_frag:vR,meshtoon_vert:_R,meshtoon_frag:xR,points_vert:yR,points_frag:bR,shadow_vert:SR,shadow_frag:MR,sprite_vert:ER,sprite_frag:TR},Pe={common:{diffuse:{value:new yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ht}},envmap:{envMap:{value:null},envMapRotation:{value:new ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ht},normalScale:{value:new Ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0},uvTransform:{value:new ht}},sprite:{diffuse:{value:new yt(16777215)},opacity:{value:1},center:{value:new Ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}}},Vi={basic:{uniforms:Gn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:Gn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new yt(0)},envMapIntensity:{value:1}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:Gn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new yt(0)},specular:{value:new yt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:Gn([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:Gn([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new yt(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:Gn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:Gn([Pe.points,Pe.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:Gn([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:Gn([Pe.common,Pe.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:Gn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:Gn([Pe.sprite,Pe.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ht}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distance:{uniforms:Gn([Pe.common,Pe.displacementmap,{referencePosition:{value:new re},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distance_vert,fragmentShader:pt.distance_frag},shadow:{uniforms:Gn([Pe.lights,Pe.fog,{color:{value:new yt(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};Vi.physical={uniforms:Gn([Vi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ht},clearcoatNormalScale:{value:new Ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ht},sheen:{value:0},sheenColor:{value:new yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ht},transmissionSamplerSize:{value:new Ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ht},attenuationDistance:{value:0},attenuationColor:{value:new yt(0)},specularColor:{value:new yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ht},anisotropyVector:{value:new Ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ht}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};const su={r:0,b:0,g:0},Or=new Ki,AR=new en;function wR(a,e,n,r,o,c){const f=new yt(0);let h=o===!0?0:1,m,d,g=null,b=0,_=null;function y(T){let C=T.isScene===!0?T.background:null;if(C&&C.isTexture){const R=T.backgroundBlurriness>0;C=e.get(C,R)}return C}function S(T){let C=!1;const R=y(T);R===null?x(f,h):R&&R.isColor&&(x(R,1),C=!0);const P=a.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,c):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(a.autoClear||C)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil))}function A(T,C){const R=y(C);R&&(R.isCubeTexture||R.mapping===Cu)?(d===void 0&&(d=new Ui(new to(1,1,1),new Qi({name:"BackgroundCubeMaterial",uniforms:Ks(Vi.backgroundCube.uniforms),vertexShader:Vi.backgroundCube.vertexShader,fragmentShader:Vi.backgroundCube.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(P,O,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),Or.copy(C.backgroundRotation),Or.x*=-1,Or.y*=-1,Or.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Or.y*=-1,Or.z*=-1),d.material.uniforms.envMap.value=R,d.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(AR.makeRotationFromEuler(Or)),d.material.toneMapped=Rt.getTransfer(R.colorSpace)!==Gt,(g!==R||b!==R.version||_!==a.toneMapping)&&(d.material.needsUpdate=!0,g=R,b=R.version,_=a.toneMapping),d.layers.enableAll(),T.unshift(d,d.geometry,d.material,0,0,null)):R&&R.isTexture&&(m===void 0&&(m=new Ui(new no(2,2),new Qi({name:"BackgroundMaterial",uniforms:Ks(Vi.background.uniforms),vertexShader:Vi.background.vertexShader,fragmentShader:Vi.background.fragmentShader,side:dr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(m)),m.material.uniforms.t2D.value=R,m.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,m.material.toneMapped=Rt.getTransfer(R.colorSpace)!==Gt,R.matrixAutoUpdate===!0&&R.updateMatrix(),m.material.uniforms.uvTransform.value.copy(R.matrix),(g!==R||b!==R.version||_!==a.toneMapping)&&(m.material.needsUpdate=!0,g=R,b=R.version,_=a.toneMapping),m.layers.enableAll(),T.unshift(m,m.geometry,m.material,0,0,null))}function x(T,C){T.getRGB(su,Qx(a)),n.buffers.color.setClear(su.r,su.g,su.b,C,c)}function v(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(T,C=1){f.set(T),h=C,x(f,h)},getClearAlpha:function(){return h},setClearAlpha:function(T){h=T,x(f,h)},render:S,addToRenderList:A,dispose:v}}function RR(a,e){const n=a.getParameter(a.MAX_VERTEX_ATTRIBS),r={},o=_(null);let c=o,f=!1;function h(k,X,$,K,V){let I=!1;const B=b(k,K,$,X);c!==B&&(c=B,d(c.object)),I=y(k,K,$,V),I&&S(k,K,$,V),V!==null&&e.update(V,a.ELEMENT_ARRAY_BUFFER),(I||f)&&(f=!1,R(k,X,$,K),V!==null&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function m(){return a.createVertexArray()}function d(k){return a.bindVertexArray(k)}function g(k){return a.deleteVertexArray(k)}function b(k,X,$,K){const V=K.wireframe===!0;let I=r[X.id];I===void 0&&(I={},r[X.id]=I);const B=k.isInstancedMesh===!0?k.id:0;let se=I[B];se===void 0&&(se={},I[B]=se);let he=se[$.id];he===void 0&&(he={},se[$.id]=he);let L=he[V];return L===void 0&&(L=_(m()),he[V]=L),L}function _(k){const X=[],$=[],K=[];for(let V=0;V<n;V++)X[V]=0,$[V]=0,K[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:$,attributeDivisors:K,object:k,attributes:{},index:null}}function y(k,X,$,K){const V=c.attributes,I=X.attributes;let B=0;const se=$.getAttributes();for(const he in se)if(se[he].location>=0){const Q=V[he];let le=I[he];if(le===void 0&&(he==="instanceMatrix"&&k.instanceMatrix&&(le=k.instanceMatrix),he==="instanceColor"&&k.instanceColor&&(le=k.instanceColor)),Q===void 0||Q.attribute!==le||le&&Q.data!==le.data)return!0;B++}return c.attributesNum!==B||c.index!==K}function S(k,X,$,K){const V={},I=X.attributes;let B=0;const se=$.getAttributes();for(const he in se)if(se[he].location>=0){let Q=I[he];Q===void 0&&(he==="instanceMatrix"&&k.instanceMatrix&&(Q=k.instanceMatrix),he==="instanceColor"&&k.instanceColor&&(Q=k.instanceColor));const le={};le.attribute=Q,Q&&Q.data&&(le.data=Q.data),V[he]=le,B++}c.attributes=V,c.attributesNum=B,c.index=K}function A(){const k=c.newAttributes;for(let X=0,$=k.length;X<$;X++)k[X]=0}function x(k){v(k,0)}function v(k,X){const $=c.newAttributes,K=c.enabledAttributes,V=c.attributeDivisors;$[k]=1,K[k]===0&&(a.enableVertexAttribArray(k),K[k]=1),V[k]!==X&&(a.vertexAttribDivisor(k,X),V[k]=X)}function T(){const k=c.newAttributes,X=c.enabledAttributes;for(let $=0,K=X.length;$<K;$++)X[$]!==k[$]&&(a.disableVertexAttribArray($),X[$]=0)}function C(k,X,$,K,V,I,B){B===!0?a.vertexAttribIPointer(k,X,$,V,I):a.vertexAttribPointer(k,X,$,K,V,I)}function R(k,X,$,K){A();const V=K.attributes,I=$.getAttributes(),B=X.defaultAttributeValues;for(const se in I){const he=I[se];if(he.location>=0){let L=V[se];if(L===void 0&&(se==="instanceMatrix"&&k.instanceMatrix&&(L=k.instanceMatrix),se==="instanceColor"&&k.instanceColor&&(L=k.instanceColor)),L!==void 0){const Q=L.normalized,le=L.itemSize,ge=e.get(L);if(ge===void 0)continue;const we=ge.buffer,Le=ge.type,ee=ge.bytesPerElement,Me=Le===a.INT||Le===a.UNSIGNED_INT||L.gpuType===Lp;if(L.isInterleavedBufferAttribute){const Se=L.data,ze=Se.stride,Je=L.offset;if(Se.isInstancedInterleavedBuffer){for(let et=0;et<he.locationSize;et++)v(he.location+et,Se.meshPerAttribute);k.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=Se.meshPerAttribute*Se.count)}else for(let et=0;et<he.locationSize;et++)x(he.location+et);a.bindBuffer(a.ARRAY_BUFFER,we);for(let et=0;et<he.locationSize;et++)C(he.location+et,le/he.locationSize,Le,Q,ze*ee,(Je+le/he.locationSize*et)*ee,Me)}else{if(L.isInstancedBufferAttribute){for(let Se=0;Se<he.locationSize;Se++)v(he.location+Se,L.meshPerAttribute);k.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=L.meshPerAttribute*L.count)}else for(let Se=0;Se<he.locationSize;Se++)x(he.location+Se);a.bindBuffer(a.ARRAY_BUFFER,we);for(let Se=0;Se<he.locationSize;Se++)C(he.location+Se,le/he.locationSize,Le,Q,le*ee,le/he.locationSize*Se*ee,Me)}}else if(B!==void 0){const Q=B[se];if(Q!==void 0)switch(Q.length){case 2:a.vertexAttrib2fv(he.location,Q);break;case 3:a.vertexAttrib3fv(he.location,Q);break;case 4:a.vertexAttrib4fv(he.location,Q);break;default:a.vertexAttrib1fv(he.location,Q)}}}}T()}function P(){D();for(const k in r){const X=r[k];for(const $ in X){const K=X[$];for(const V in K){const I=K[V];for(const B in I)g(I[B].object),delete I[B];delete K[V]}}delete r[k]}}function O(k){if(r[k.id]===void 0)return;const X=r[k.id];for(const $ in X){const K=X[$];for(const V in K){const I=K[V];for(const B in I)g(I[B].object),delete I[B];delete K[V]}}delete r[k.id]}function F(k){for(const X in r){const $=r[X];for(const K in $){const V=$[K];if(V[k.id]===void 0)continue;const I=V[k.id];for(const B in I)g(I[B].object),delete I[B];delete V[k.id]}}}function E(k){for(const X in r){const $=r[X],K=k.isInstancedMesh===!0?k.id:0,V=$[K];if(V!==void 0){for(const I in V){const B=V[I];for(const se in B)g(B[se].object),delete B[se];delete V[I]}delete $[K],Object.keys($).length===0&&delete r[X]}}}function D(){Y(),f=!0,c!==o&&(c=o,d(c.object))}function Y(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:h,reset:D,resetDefaultState:Y,dispose:P,releaseStatesOfGeometry:O,releaseStatesOfObject:E,releaseStatesOfProgram:F,initAttributes:A,enableAttribute:x,disableUnusedAttributes:T}}function CR(a,e,n){let r;function o(d){r=d}function c(d,g){a.drawArrays(r,d,g),n.update(g,r,1)}function f(d,g,b){b!==0&&(a.drawArraysInstanced(r,d,g,b),n.update(g,r,b))}function h(d,g,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,d,0,g,0,b);let y=0;for(let S=0;S<b;S++)y+=g[S];n.update(y,r,1)}function m(d,g,b,_){if(b===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let S=0;S<d.length;S++)f(d[S],g[S],_[S]);else{y.multiDrawArraysInstancedWEBGL(r,d,0,g,0,_,0,b);let S=0;for(let A=0;A<b;A++)S+=g[A]*_[A];n.update(S,r,1)}}this.setMode=o,this.render=c,this.renderInstances=f,this.renderMultiDraw=h,this.renderMultiDrawInstances=m}function DR(a,e,n,r){let o;function c(){if(o!==void 0)return o;if(e.has("EXT_texture_filter_anisotropic")===!0){const F=e.get("EXT_texture_filter_anisotropic");o=a.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function f(F){return!(F!==Ni&&r.convert(F)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(F){const E=F===Ra&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(F!==ci&&r.convert(F)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_TYPE)&&F!==ji&&!E)}function m(F){if(F==="highp"){if(a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision>0)return"highp";F="mediump"}return F==="mediump"&&a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=n.precision!==void 0?n.precision:"highp";const g=m(d);g!==d&&(st("WebGLRenderer:",d,"not supported, using",g,"instead."),d=g);const b=n.logarithmicDepthBuffer===!0,_=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),y=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),S=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=a.getParameter(a.MAX_TEXTURE_SIZE),x=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),v=a.getParameter(a.MAX_VERTEX_ATTRIBS),T=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),C=a.getParameter(a.MAX_VARYING_VECTORS),R=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),P=a.getParameter(a.MAX_SAMPLES),O=a.getParameter(a.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:h,precision:d,logarithmicDepthBuffer:b,reversedDepthBuffer:_,maxTextures:y,maxVertexTextures:S,maxTextureSize:A,maxCubemapSize:x,maxAttributes:v,maxVertexUniforms:T,maxVaryings:C,maxFragmentUniforms:R,maxSamples:P,samples:O}}function NR(a){const e=this;let n=null,r=0,o=!1,c=!1;const f=new Fr,h=new ht,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(b,_){const y=b.length!==0||_||r!==0||o;return o=_,r=b.length,y},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(b,_){n=g(b,_,0)},this.setState=function(b,_,y){const S=b.clippingPlanes,A=b.clipIntersection,x=b.clipShadows,v=a.get(b);if(!o||S===null||S.length===0||c&&!x)c?g(null):d();else{const T=c?0:r,C=T*4;let R=v.clippingState||null;m.value=R,R=g(S,_,C,y);for(let P=0;P!==C;++P)R[P]=n[P];v.clippingState=R,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=T}};function d(){m.value!==n&&(m.value=n,m.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function g(b,_,y,S){const A=b!==null?b.length:0;let x=null;if(A!==0){if(x=m.value,S!==!0||x===null){const v=y+A*4,T=_.matrixWorldInverse;h.getNormalMatrix(T),(x===null||x.length<v)&&(x=new Float32Array(v));for(let C=0,R=y;C!==A;++C,R+=4)f.copy(b[C]).applyMatrix4(T,h),f.normal.toArray(x,R),x[R+3]=f.constant}m.value=x,m.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,x}}const ur=4,A_=[.125,.215,.35,.446,.526,.582],Br=20,UR=256,rl=new Jp,w_=new yt;let vh=null,_h=0,xh=0,yh=!1;const LR=new re;class R_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,r=.1,o=100,c={}){const{size:f=256,position:h=LR}=c;vh=this._renderer.getRenderTarget(),_h=this._renderer.getActiveCubeFace(),xh=this._renderer.getActiveMipmapLevel(),yh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,r,o,m,h),n>0&&this._blur(m,0,0,n),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=N_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=D_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(vh,_h,xh),this._renderer.xr.enabled=yh,e.scissorTest=!1,Bs(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Gr||e.mapping===qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vh=this._renderer.getRenderTarget(),_h=this._renderer.getActiveCubeFace(),xh=this._renderer.getActiveMipmapLevel(),yh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=n||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,r={magFilter:Bn,minFilter:Bn,generateMipmaps:!1,type:Ra,format:Ni,colorSpace:Zs,depthBuffer:!1},o=C_(e,n,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=C_(e,n,r);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=OR(c)),this._blurMaterial=IR(c,e,n),this._ggxMaterial=PR(c,e,n)}return o}_compileMaterial(e){const n=new Ui(new jn,e);this._renderer.compile(n,rl)}_sceneToCubeUV(e,n,r,o,c){const m=new yi(90,1,n,r),d=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],b=this._renderer,_=b.autoClear,y=b.toneMapping;b.getClearColor(w_),b.toneMapping=Wi,b.autoClear=!1,b.state.buffers.depth.getReversed()&&(b.setRenderTarget(o),b.clearDepth(),b.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ui(new to,new qx({name:"PMREM.Background",side:Jn,depthWrite:!1,depthTest:!1})));const A=this._backgroundBox,x=A.material;let v=!1;const T=e.background;T?T.isColor&&(x.color.copy(T),e.background=null,v=!0):(x.color.copy(w_),v=!0);for(let C=0;C<6;C++){const R=C%3;R===0?(m.up.set(0,d[C],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+g[C],c.y,c.z)):R===1?(m.up.set(0,0,d[C]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+g[C],c.z)):(m.up.set(0,d[C],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+g[C]));const P=this._cubeSize;Bs(o,R*P,C>2?P:0,P,P),b.setRenderTarget(o),v&&b.render(A,m),b.render(e,m)}b.toneMapping=y,b.autoClear=_,e.background=T}_textureToCubeUV(e,n){const r=this._renderer,o=e.mapping===Gr||e.mapping===qs;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=N_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=D_());const c=o?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const h=c.uniforms;h.envMap.value=e;const m=this._cubeSize;Bs(n,0,0,3*m,2*m),r.setRenderTarget(n),r.render(f,rl)}_applyPMREM(e){const n=this._renderer,r=n.autoClear;n.autoClear=!1;const o=this._lodMeshes.length;for(let c=1;c<o;c++)this._applyGGXFilter(e,c-1,c);n.autoClear=r}_applyGGXFilter(e,n,r){const o=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,h=this._lodMeshes[r];h.material=f;const m=f.uniforms,d=r/(this._lodMeshes.length-1),g=n/(this._lodMeshes.length-1),b=Math.sqrt(d*d-g*g),_=0+d*1.25,y=b*_,{_lodMax:S}=this,A=this._sizeLods[r],x=3*A*(r>S-ur?r-S+ur:0),v=4*(this._cubeSize-A);m.envMap.value=e.texture,m.roughness.value=y,m.mipInt.value=S-n,Bs(c,x,v,3*A,2*A),o.setRenderTarget(c),o.render(h,rl),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=S-r,Bs(e,x,v,3*A,2*A),o.setRenderTarget(e),o.render(h,rl)}_blur(e,n,r,o,c){const f=this._pingPongRenderTarget;this._halfBlur(e,f,n,r,o,"latitudinal",c),this._halfBlur(f,e,r,r,o,"longitudinal",c)}_halfBlur(e,n,r,o,c,f,h){const m=this._renderer,d=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&wt("blur direction must be either latitudinal or longitudinal!");const g=3,b=this._lodMeshes[o];b.material=d;const _=d.uniforms,y=this._sizeLods[r]-1,S=isFinite(c)?Math.PI/(2*y):2*Math.PI/(2*Br-1),A=c/S,x=isFinite(c)?1+Math.floor(g*A):Br;x>Br&&st(`sigmaRadians, ${c}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Br}`);const v=[];let T=0;for(let F=0;F<Br;++F){const E=F/A,D=Math.exp(-E*E/2);v.push(D),F===0?T+=D:F<x&&(T+=2*D)}for(let F=0;F<v.length;F++)v[F]=v[F]/T;_.envMap.value=e.texture,_.samples.value=x,_.weights.value=v,_.latitudinal.value=f==="latitudinal",h&&(_.poleAxis.value=h);const{_lodMax:C}=this;_.dTheta.value=S,_.mipInt.value=C-r;const R=this._sizeLods[o],P=3*R*(o>C-ur?o-C+ur:0),O=4*(this._cubeSize-R);Bs(n,P,O,3*R,2*R),m.setRenderTarget(n),m.render(b,rl)}}function OR(a){const e=[],n=[],r=[];let o=a;const c=a-ur+1+A_.length;for(let f=0;f<c;f++){const h=Math.pow(2,o);e.push(h);let m=1/h;f>a-ur?m=A_[f-a+ur-1]:f===0&&(m=0),n.push(m);const d=1/(h-2),g=-d,b=1+d,_=[g,g,b,g,b,b,g,g,b,b,g,b],y=6,S=6,A=3,x=2,v=1,T=new Float32Array(A*S*y),C=new Float32Array(x*S*y),R=new Float32Array(v*S*y);for(let O=0;O<y;O++){const F=O%3*2/3-1,E=O>2?0:-1,D=[F,E,0,F+2/3,E,0,F+2/3,E+1,0,F,E,0,F+2/3,E+1,0,F,E+1,0];T.set(D,A*S*O),C.set(_,x*S*O);const Y=[O,O,O,O,O,O];R.set(Y,v*S*O)}const P=new jn;P.setAttribute("position",new Yi(T,A)),P.setAttribute("uv",new Yi(C,x)),P.setAttribute("faceIndex",new Yi(R,v)),r.push(new Ui(P,null)),o>ur&&o--}return{lodMeshes:r,sizeLods:e,sigmas:n}}function C_(a,e,n){const r=new qi(a,e,n);return r.texture.mapping=Cu,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Bs(a,e,n,r,o){a.viewport.set(e,n,r,o),a.scissor.set(e,n,r,o)}function PR(a,e,n){return new Qi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:UR,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Nu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Aa,depthTest:!1,depthWrite:!1})}function IR(a,e,n){const r=new Float32Array(Br),o=new re(0,1,0);return new Qi({name:"SphericalGaussianBlur",defines:{n:Br,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:Nu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Aa,depthTest:!1,depthWrite:!1})}function D_(){return new Qi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Aa,depthTest:!1,depthWrite:!1})}function N_(){return new Qi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Aa,depthTest:!1,depthWrite:!1})}function Nu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class ty extends qi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},o=[r,r,r,r,r,r];this.texture=new Zx(o),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},o=new to(5,5,5),c=new Qi({name:"CubemapFromEquirect",uniforms:Ks(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Jn,blending:Aa});c.uniforms.tEquirect.value=n;const f=new Ui(o,c),h=n.minFilter;return n.minFilter===Hr&&(n.minFilter=Bn),new kT(1,10,this).update(e,f),n.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(e,n=!0,r=!0,o=!0){const c=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(n,r,o);e.setRenderTarget(c)}}function FR(a){let e=new WeakMap,n=new WeakMap,r=null;function o(_,y=!1){return _==null?null:y?f(_):c(_)}function c(_){if(_&&_.isTexture){const y=_.mapping;if(y===jd||y===Xd)if(e.has(_)){const S=e.get(_).texture;return h(S,_.mapping)}else{const S=_.image;if(S&&S.height>0){const A=new ty(S.height);return A.fromEquirectangularTexture(a,_),e.set(_,A),_.addEventListener("dispose",d),h(A.texture,_.mapping)}else return null}}return _}function f(_){if(_&&_.isTexture){const y=_.mapping,S=y===jd||y===Xd,A=y===Gr||y===qs;if(S||A){let x=n.get(_);const v=x!==void 0?x.texture.pmremVersion:0;if(_.isRenderTargetTexture&&_.pmremVersion!==v)return r===null&&(r=new R_(a)),x=S?r.fromEquirectangular(_,x):r.fromCubemap(_,x),x.texture.pmremVersion=_.pmremVersion,n.set(_,x),x.texture;if(x!==void 0)return x.texture;{const T=_.image;return S&&T&&T.height>0||A&&T&&m(T)?(r===null&&(r=new R_(a)),x=S?r.fromEquirectangular(_):r.fromCubemap(_),x.texture.pmremVersion=_.pmremVersion,n.set(_,x),_.addEventListener("dispose",g),x.texture):null}}}return _}function h(_,y){return y===jd?_.mapping=Gr:y===Xd&&(_.mapping=qs),_}function m(_){let y=0;const S=6;for(let A=0;A<S;A++)_[A]!==void 0&&y++;return y===S}function d(_){const y=_.target;y.removeEventListener("dispose",d);const S=e.get(y);S!==void 0&&(e.delete(y),S.dispose())}function g(_){const y=_.target;y.removeEventListener("dispose",g);const S=n.get(y);S!==void 0&&(n.delete(y),S.dispose())}function b(){e=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:o,dispose:b}}function zR(a){const e={};function n(r){if(e[r]!==void 0)return e[r];const o=a.getExtension(r);return e[r]=o,o}return{has:function(r){return n(r)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(r){const o=n(r);return o===null&&Eu("WebGLRenderer: "+r+" extension not supported."),o}}}function BR(a,e,n,r){const o={},c=new WeakMap;function f(b){const _=b.target;_.index!==null&&e.remove(_.index);for(const S in _.attributes)e.remove(_.attributes[S]);_.removeEventListener("dispose",f),delete o[_.id];const y=c.get(_);y&&(e.remove(y),c.delete(_)),r.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,n.memory.geometries--}function h(b,_){return o[_.id]===!0||(_.addEventListener("dispose",f),o[_.id]=!0,n.memory.geometries++),_}function m(b){const _=b.attributes;for(const y in _)e.update(_[y],a.ARRAY_BUFFER)}function d(b){const _=[],y=b.index,S=b.attributes.position;let A=0;if(S===void 0)return;if(y!==null){const T=y.array;A=y.version;for(let C=0,R=T.length;C<R;C+=3){const P=T[C+0],O=T[C+1],F=T[C+2];_.push(P,O,O,F,F,P)}}else{const T=S.array;A=S.version;for(let C=0,R=T.length/3-1;C<R;C+=3){const P=C+0,O=C+1,F=C+2;_.push(P,O,O,F,F,P)}}const x=new(S.count>=65535?Wx:Xx)(_,1);x.version=A;const v=c.get(b);v&&e.remove(v),c.set(b,x)}function g(b){const _=c.get(b);if(_){const y=b.index;y!==null&&_.version<y.version&&d(b)}else d(b);return c.get(b)}return{get:h,update:m,getWireframeAttribute:g}}function HR(a,e,n){let r;function o(_){r=_}let c,f;function h(_){c=_.type,f=_.bytesPerElement}function m(_,y){a.drawElements(r,y,c,_*f),n.update(y,r,1)}function d(_,y,S){S!==0&&(a.drawElementsInstanced(r,y,c,_*f,S),n.update(y,r,S))}function g(_,y,S){if(S===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,y,0,c,_,0,S);let x=0;for(let v=0;v<S;v++)x+=y[v];n.update(x,r,1)}function b(_,y,S,A){if(S===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let v=0;v<_.length;v++)d(_[v]/f,y[v],A[v]);else{x.multiDrawElementsInstancedWEBGL(r,y,0,c,_,0,A,0,S);let v=0;for(let T=0;T<S;T++)v+=y[T]*A[T];n.update(v,r,1)}}this.setMode=o,this.setIndex=h,this.render=m,this.renderInstances=d,this.renderMultiDraw=g,this.renderMultiDrawInstances=b}function kR(a){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(c,f,h){switch(n.calls++,f){case a.TRIANGLES:n.triangles+=h*(c/3);break;case a.LINES:n.lines+=h*(c/2);break;case a.LINE_STRIP:n.lines+=h*(c-1);break;case a.LINE_LOOP:n.lines+=h*c;break;case a.POINTS:n.points+=h*c;break;default:wt("WebGLInfo: Unknown draw mode:",f);break}}function o(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:o,update:r}}function GR(a,e,n){const r=new WeakMap,o=new on;function c(f,h,m){const d=f.morphTargetInfluences,g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,b=g!==void 0?g.length:0;let _=r.get(h);if(_===void 0||_.count!==b){let Y=function(){E.dispose(),r.delete(h),h.removeEventListener("dispose",Y)};var y=Y;_!==void 0&&_.texture.dispose();const S=h.morphAttributes.position!==void 0,A=h.morphAttributes.normal!==void 0,x=h.morphAttributes.color!==void 0,v=h.morphAttributes.position||[],T=h.morphAttributes.normal||[],C=h.morphAttributes.color||[];let R=0;S===!0&&(R=1),A===!0&&(R=2),x===!0&&(R=3);let P=h.attributes.position.count*R,O=1;P>e.maxTextureSize&&(O=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const F=new Float32Array(P*O*4*b),E=new Vx(F,P,O,b);E.type=ji,E.needsUpdate=!0;const D=R*4;for(let k=0;k<b;k++){const X=v[k],$=T[k],K=C[k],V=P*O*4*k;for(let I=0;I<X.count;I++){const B=I*D;S===!0&&(o.fromBufferAttribute(X,I),F[V+B+0]=o.x,F[V+B+1]=o.y,F[V+B+2]=o.z,F[V+B+3]=0),A===!0&&(o.fromBufferAttribute($,I),F[V+B+4]=o.x,F[V+B+5]=o.y,F[V+B+6]=o.z,F[V+B+7]=0),x===!0&&(o.fromBufferAttribute(K,I),F[V+B+8]=o.x,F[V+B+9]=o.y,F[V+B+10]=o.z,F[V+B+11]=K.itemSize===4?o.w:1)}}_={count:b,texture:E,size:new Ut(P,O)},r.set(h,_),h.addEventListener("dispose",Y)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(a,"morphTexture",f.morphTexture,n);else{let S=0;for(let x=0;x<d.length;x++)S+=d[x];const A=h.morphTargetsRelative?1:1-S;m.getUniforms().setValue(a,"morphTargetBaseInfluence",A),m.getUniforms().setValue(a,"morphTargetInfluences",d)}m.getUniforms().setValue(a,"morphTargetsTexture",_.texture,n),m.getUniforms().setValue(a,"morphTargetsTextureSize",_.size)}return{update:c}}function VR(a,e,n,r,o){let c=new WeakMap;function f(d){const g=o.render.frame,b=d.geometry,_=e.get(d,b);if(c.get(_)!==g&&(e.update(_),c.set(_,g)),d.isInstancedMesh&&(d.hasEventListener("dispose",m)===!1&&d.addEventListener("dispose",m),c.get(d)!==g&&(n.update(d.instanceMatrix,a.ARRAY_BUFFER),d.instanceColor!==null&&n.update(d.instanceColor,a.ARRAY_BUFFER),c.set(d,g))),d.isSkinnedMesh){const y=d.skeleton;c.get(y)!==g&&(y.update(),c.set(y,g))}return _}function h(){c=new WeakMap}function m(d){const g=d.target;g.removeEventListener("dispose",m),r.releaseStatesOfObject(g),n.remove(g.instanceMatrix),g.instanceColor!==null&&n.remove(g.instanceColor)}return{update:f,dispose:h}}const jR={[wx]:"LINEAR_TONE_MAPPING",[Rx]:"REINHARD_TONE_MAPPING",[Cx]:"CINEON_TONE_MAPPING",[Up]:"ACES_FILMIC_TONE_MAPPING",[Nx]:"AGX_TONE_MAPPING",[Ux]:"NEUTRAL_TONE_MAPPING",[Dx]:"CUSTOM_TONE_MAPPING"};function XR(a,e,n,r,o){const c=new qi(e,n,{type:a,depthBuffer:r,stencilBuffer:o}),f=new qi(e,n,{type:Ra,depthBuffer:!1,stencilBuffer:!1}),h=new jn;h.setAttribute("position",new Qt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Qt([0,2,0,0,2,0],2));const m=new LT({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Ui(h,m),g=new Jp(-1,1,1,-1,0,1);let b=null,_=null,y=!1,S,A=null,x=[],v=!1;this.setSize=function(T,C){c.setSize(T,C),f.setSize(T,C);for(let R=0;R<x.length;R++){const P=x[R];P.setSize&&P.setSize(T,C)}},this.setEffects=function(T){x=T,v=x.length>0&&x[0].isRenderPass===!0;const C=c.width,R=c.height;for(let P=0;P<x.length;P++){const O=x[P];O.setSize&&O.setSize(C,R)}},this.begin=function(T,C){if(y||T.toneMapping===Wi&&x.length===0)return!1;if(A=C,C!==null){const R=C.width,P=C.height;(c.width!==R||c.height!==P)&&this.setSize(R,P)}return v===!1&&T.setRenderTarget(c),S=T.toneMapping,T.toneMapping=Wi,!0},this.hasRenderPass=function(){return v},this.end=function(T,C){T.toneMapping=S,y=!0;let R=c,P=f;for(let O=0;O<x.length;O++){const F=x[O];if(F.enabled!==!1&&(F.render(T,P,R,C),F.needsSwap!==!1)){const E=R;R=P,P=E}}if(b!==T.outputColorSpace||_!==T.toneMapping){b=T.outputColorSpace,_=T.toneMapping,m.defines={},Rt.getTransfer(b)===Gt&&(m.defines.SRGB_TRANSFER="");const O=jR[_];O&&(m.defines[O]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=R.texture,T.setRenderTarget(A),T.render(d,g),A=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){c.dispose(),f.dispose(),h.dispose(),m.dispose()}}const ny=new Vn,yp=new xl(1,1),iy=new Vx,ay=new lT,ry=new Zx,U_=[],L_=[],O_=new Float32Array(16),P_=new Float32Array(9),I_=new Float32Array(4);function io(a,e,n){const r=a[0];if(r<=0||r>0)return a;const o=e*n;let c=U_[o];if(c===void 0&&(c=new Float32Array(o),U_[o]=c),e!==0){r.toArray(c,0);for(let f=1,h=0;f!==e;++f)h+=n,a[f].toArray(c,h)}return c}function yn(a,e){if(a.length!==e.length)return!1;for(let n=0,r=a.length;n<r;n++)if(a[n]!==e[n])return!1;return!0}function bn(a,e){for(let n=0,r=e.length;n<r;n++)a[n]=e[n]}function Uu(a,e){let n=L_[e];n===void 0&&(n=new Int32Array(e),L_[e]=n);for(let r=0;r!==e;++r)n[r]=a.allocateTextureUnit();return n}function WR(a,e){const n=this.cache;n[0]!==e&&(a.uniform1f(this.addr,e),n[0]=e)}function qR(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(a.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(yn(n,e))return;a.uniform2fv(this.addr,e),bn(n,e)}}function YR(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(a.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(a.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(yn(n,e))return;a.uniform3fv(this.addr,e),bn(n,e)}}function ZR(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(a.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(yn(n,e))return;a.uniform4fv(this.addr,e),bn(n,e)}}function KR(a,e){const n=this.cache,r=e.elements;if(r===void 0){if(yn(n,e))return;a.uniformMatrix2fv(this.addr,!1,e),bn(n,e)}else{if(yn(n,r))return;I_.set(r),a.uniformMatrix2fv(this.addr,!1,I_),bn(n,r)}}function QR(a,e){const n=this.cache,r=e.elements;if(r===void 0){if(yn(n,e))return;a.uniformMatrix3fv(this.addr,!1,e),bn(n,e)}else{if(yn(n,r))return;P_.set(r),a.uniformMatrix3fv(this.addr,!1,P_),bn(n,r)}}function JR(a,e){const n=this.cache,r=e.elements;if(r===void 0){if(yn(n,e))return;a.uniformMatrix4fv(this.addr,!1,e),bn(n,e)}else{if(yn(n,r))return;O_.set(r),a.uniformMatrix4fv(this.addr,!1,O_),bn(n,r)}}function $R(a,e){const n=this.cache;n[0]!==e&&(a.uniform1i(this.addr,e),n[0]=e)}function e2(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(a.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(yn(n,e))return;a.uniform2iv(this.addr,e),bn(n,e)}}function t2(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(a.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(yn(n,e))return;a.uniform3iv(this.addr,e),bn(n,e)}}function n2(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(a.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(yn(n,e))return;a.uniform4iv(this.addr,e),bn(n,e)}}function i2(a,e){const n=this.cache;n[0]!==e&&(a.uniform1ui(this.addr,e),n[0]=e)}function a2(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(a.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(yn(n,e))return;a.uniform2uiv(this.addr,e),bn(n,e)}}function r2(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(a.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(yn(n,e))return;a.uniform3uiv(this.addr,e),bn(n,e)}}function s2(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(a.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(yn(n,e))return;a.uniform4uiv(this.addr,e),bn(n,e)}}function o2(a,e,n){const r=this.cache,o=n.allocateTextureUnit();r[0]!==o&&(a.uniform1i(this.addr,o),r[0]=o);let c;this.type===a.SAMPLER_2D_SHADOW?(yp.compareFunction=n.isReversedDepthBuffer()?Hp:Bp,c=yp):c=ny,n.setTexture2D(e||c,o)}function l2(a,e,n){const r=this.cache,o=n.allocateTextureUnit();r[0]!==o&&(a.uniform1i(this.addr,o),r[0]=o),n.setTexture3D(e||ay,o)}function c2(a,e,n){const r=this.cache,o=n.allocateTextureUnit();r[0]!==o&&(a.uniform1i(this.addr,o),r[0]=o),n.setTextureCube(e||ry,o)}function u2(a,e,n){const r=this.cache,o=n.allocateTextureUnit();r[0]!==o&&(a.uniform1i(this.addr,o),r[0]=o),n.setTexture2DArray(e||iy,o)}function f2(a){switch(a){case 5126:return WR;case 35664:return qR;case 35665:return YR;case 35666:return ZR;case 35674:return KR;case 35675:return QR;case 35676:return JR;case 5124:case 35670:return $R;case 35667:case 35671:return e2;case 35668:case 35672:return t2;case 35669:case 35673:return n2;case 5125:return i2;case 36294:return a2;case 36295:return r2;case 36296:return s2;case 35678:case 36198:case 36298:case 36306:case 35682:return o2;case 35679:case 36299:case 36307:return l2;case 35680:case 36300:case 36308:case 36293:return c2;case 36289:case 36303:case 36311:case 36292:return u2}}function d2(a,e){a.uniform1fv(this.addr,e)}function h2(a,e){const n=io(e,this.size,2);a.uniform2fv(this.addr,n)}function p2(a,e){const n=io(e,this.size,3);a.uniform3fv(this.addr,n)}function m2(a,e){const n=io(e,this.size,4);a.uniform4fv(this.addr,n)}function g2(a,e){const n=io(e,this.size,4);a.uniformMatrix2fv(this.addr,!1,n)}function v2(a,e){const n=io(e,this.size,9);a.uniformMatrix3fv(this.addr,!1,n)}function _2(a,e){const n=io(e,this.size,16);a.uniformMatrix4fv(this.addr,!1,n)}function x2(a,e){a.uniform1iv(this.addr,e)}function y2(a,e){a.uniform2iv(this.addr,e)}function b2(a,e){a.uniform3iv(this.addr,e)}function S2(a,e){a.uniform4iv(this.addr,e)}function M2(a,e){a.uniform1uiv(this.addr,e)}function E2(a,e){a.uniform2uiv(this.addr,e)}function T2(a,e){a.uniform3uiv(this.addr,e)}function A2(a,e){a.uniform4uiv(this.addr,e)}function w2(a,e,n){const r=this.cache,o=e.length,c=Uu(n,o);yn(r,c)||(a.uniform1iv(this.addr,c),bn(r,c));let f;this.type===a.SAMPLER_2D_SHADOW?f=yp:f=ny;for(let h=0;h!==o;++h)n.setTexture2D(e[h]||f,c[h])}function R2(a,e,n){const r=this.cache,o=e.length,c=Uu(n,o);yn(r,c)||(a.uniform1iv(this.addr,c),bn(r,c));for(let f=0;f!==o;++f)n.setTexture3D(e[f]||ay,c[f])}function C2(a,e,n){const r=this.cache,o=e.length,c=Uu(n,o);yn(r,c)||(a.uniform1iv(this.addr,c),bn(r,c));for(let f=0;f!==o;++f)n.setTextureCube(e[f]||ry,c[f])}function D2(a,e,n){const r=this.cache,o=e.length,c=Uu(n,o);yn(r,c)||(a.uniform1iv(this.addr,c),bn(r,c));for(let f=0;f!==o;++f)n.setTexture2DArray(e[f]||iy,c[f])}function N2(a){switch(a){case 5126:return d2;case 35664:return h2;case 35665:return p2;case 35666:return m2;case 35674:return g2;case 35675:return v2;case 35676:return _2;case 5124:case 35670:return x2;case 35667:case 35671:return y2;case 35668:case 35672:return b2;case 35669:case 35673:return S2;case 5125:return M2;case 36294:return E2;case 36295:return T2;case 36296:return A2;case 35678:case 36198:case 36298:case 36306:case 35682:return w2;case 35679:case 36299:case 36307:return R2;case 35680:case 36300:case 36308:case 36293:return C2;case 36289:case 36303:case 36311:case 36292:return D2}}class U2{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.setValue=f2(n.type)}}class L2{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=N2(n.type)}}class O2{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,r){const o=this.seq;for(let c=0,f=o.length;c!==f;++c){const h=o[c];h.setValue(e,n[h.id],r)}}}const bh=/(\w+)(\])?(\[|\.)?/g;function F_(a,e){a.seq.push(e),a.map[e.id]=e}function P2(a,e,n){const r=a.name,o=r.length;for(bh.lastIndex=0;;){const c=bh.exec(r),f=bh.lastIndex;let h=c[1];const m=c[2]==="]",d=c[3];if(m&&(h=h|0),d===void 0||d==="["&&f+2===o){F_(n,d===void 0?new U2(h,a,e):new L2(h,a,e));break}else{let b=n.map[h];b===void 0&&(b=new O2(h),F_(n,b)),n=b}}}class xu{constructor(e,n){this.seq=[],this.map={};const r=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let f=0;f<r;++f){const h=e.getActiveUniform(n,f),m=e.getUniformLocation(n,h.name);P2(h,m,this)}const o=[],c=[];for(const f of this.seq)f.type===e.SAMPLER_2D_SHADOW||f.type===e.SAMPLER_CUBE_SHADOW||f.type===e.SAMPLER_2D_ARRAY_SHADOW?o.push(f):c.push(f);o.length>0&&(this.seq=o.concat(c))}setValue(e,n,r,o){const c=this.map[n];c!==void 0&&c.setValue(e,r,o)}setOptional(e,n,r){const o=n[r];o!==void 0&&this.setValue(e,r,o)}static upload(e,n,r,o){for(let c=0,f=n.length;c!==f;++c){const h=n[c],m=r[h.id];m.needsUpdate!==!1&&h.setValue(e,m.value,o)}}static seqWithValue(e,n){const r=[];for(let o=0,c=e.length;o!==c;++o){const f=e[o];f.id in n&&r.push(f)}return r}}function z_(a,e,n){const r=a.createShader(e);return a.shaderSource(r,n),a.compileShader(r),r}const I2=37297;let F2=0;function z2(a,e){const n=a.split(`
`),r=[],o=Math.max(e-6,0),c=Math.min(e+6,n.length);for(let f=o;f<c;f++){const h=f+1;r.push(`${h===e?">":" "} ${h}: ${n[f]}`)}return r.join(`
`)}const B_=new ht;function B2(a){Rt._getMatrix(B_,Rt.workingColorSpace,a);const e=`mat3( ${B_.elements.map(n=>n.toFixed(4))} )`;switch(Rt.getTransfer(a)){case Su:return[e,"LinearTransferOETF"];case Gt:return[e,"sRGBTransferOETF"];default:return st("WebGLProgram: Unsupported color space: ",a),[e,"LinearTransferOETF"]}}function H_(a,e,n){const r=a.getShaderParameter(e,a.COMPILE_STATUS),c=(a.getShaderInfoLog(e)||"").trim();if(r&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const h=parseInt(f[1]);return n.toUpperCase()+`

`+c+`

`+z2(a.getShaderSource(e),h)}else return c}function H2(a,e){const n=B2(e);return[`vec4 ${a}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const k2={[wx]:"Linear",[Rx]:"Reinhard",[Cx]:"Cineon",[Up]:"ACESFilmic",[Nx]:"AgX",[Ux]:"Neutral",[Dx]:"Custom"};function G2(a,e){const n=k2[e];return n===void 0?(st("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+a+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+a+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const ou=new re;function V2(){Rt.getLuminanceCoefficients(ou);const a=ou.x.toFixed(4),e=ou.y.toFixed(4),n=ou.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${a}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function j2(a){return[a.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",a.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(cl).join(`
`)}function X2(a){const e=[];for(const n in a){const r=a[n];r!==!1&&e.push("#define "+n+" "+r)}return e.join(`
`)}function W2(a,e){const n={},r=a.getProgramParameter(e,a.ACTIVE_ATTRIBUTES);for(let o=0;o<r;o++){const c=a.getActiveAttrib(e,o),f=c.name;let h=1;c.type===a.FLOAT_MAT2&&(h=2),c.type===a.FLOAT_MAT3&&(h=3),c.type===a.FLOAT_MAT4&&(h=4),n[f]={type:c.type,location:a.getAttribLocation(e,f),locationSize:h}}return n}function cl(a){return a!==""}function k_(a,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function G_(a,e){return a.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const q2=/^[ \t]*#include +<([\w\d./]+)>/gm;function bp(a){return a.replace(q2,Z2)}const Y2=new Map;function Z2(a,e){let n=pt[e];if(n===void 0){const r=Y2.get(e);if(r!==void 0)n=pt[r],st('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return bp(n)}const K2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function V_(a){return a.replace(K2,Q2)}function Q2(a,e,n,r){let o="";for(let c=parseInt(e);c<parseInt(n);c++)o+=r.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return o}function j_(a){let e=`precision ${a.precision} float;
	precision ${a.precision} int;
	precision ${a.precision} sampler2D;
	precision ${a.precision} samplerCube;
	precision ${a.precision} sampler3D;
	precision ${a.precision} sampler2DArray;
	precision ${a.precision} sampler2DShadow;
	precision ${a.precision} samplerCubeShadow;
	precision ${a.precision} sampler2DArrayShadow;
	precision ${a.precision} isampler2D;
	precision ${a.precision} isampler3D;
	precision ${a.precision} isamplerCube;
	precision ${a.precision} isampler2DArray;
	precision ${a.precision} usampler2D;
	precision ${a.precision} usampler3D;
	precision ${a.precision} usamplerCube;
	precision ${a.precision} usampler2DArray;
	`;return a.precision==="highp"?e+=`
#define HIGH_PRECISION`:a.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:a.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const J2={[pu]:"SHADOWMAP_TYPE_PCF",[ll]:"SHADOWMAP_TYPE_VSM"};function $2(a){return J2[a.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const eC={[Gr]:"ENVMAP_TYPE_CUBE",[qs]:"ENVMAP_TYPE_CUBE",[Cu]:"ENVMAP_TYPE_CUBE_UV"};function tC(a){return a.envMap===!1?"ENVMAP_TYPE_CUBE":eC[a.envMapMode]||"ENVMAP_TYPE_CUBE"}const nC={[qs]:"ENVMAP_MODE_REFRACTION"};function iC(a){return a.envMap===!1?"ENVMAP_MODE_REFLECTION":nC[a.envMapMode]||"ENVMAP_MODE_REFLECTION"}const aC={[Ax]:"ENVMAP_BLENDING_MULTIPLY",[AE]:"ENVMAP_BLENDING_MIX",[wE]:"ENVMAP_BLENDING_ADD"};function rC(a){return a.envMap===!1?"ENVMAP_BLENDING_NONE":aC[a.combine]||"ENVMAP_BLENDING_NONE"}function sC(a){const e=a.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:r,maxMip:n}}function oC(a,e,n,r){const o=a.getContext(),c=n.defines;let f=n.vertexShader,h=n.fragmentShader;const m=$2(n),d=tC(n),g=iC(n),b=rC(n),_=sC(n),y=j2(n),S=X2(c),A=o.createProgram();let x,v,T=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(x=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,S].filter(cl).join(`
`),x.length>0&&(x+=`
`),v=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,S].filter(cl).join(`
`),v.length>0&&(v+=`
`)):(x=[j_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,S,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cl).join(`
`),v=[j_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,S,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.envMap?"#define "+g:"",n.envMap?"#define "+b:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Wi?"#define TONE_MAPPING":"",n.toneMapping!==Wi?pt.tonemapping_pars_fragment:"",n.toneMapping!==Wi?G2("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,H2("linearToOutputTexel",n.outputColorSpace),V2(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(cl).join(`
`)),f=bp(f),f=k_(f,n),f=G_(f,n),h=bp(h),h=k_(h,n),h=G_(h,n),f=V_(f),h=V_(h),n.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,x=[y,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,v=["#define varying in",n.glslVersion===Qv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Qv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const C=T+x+f,R=T+v+h,P=z_(o,o.VERTEX_SHADER,C),O=z_(o,o.FRAGMENT_SHADER,R);o.attachShader(A,P),o.attachShader(A,O),n.index0AttributeName!==void 0?o.bindAttribLocation(A,0,n.index0AttributeName):n.morphTargets===!0&&o.bindAttribLocation(A,0,"position"),o.linkProgram(A);function F(k){if(a.debug.checkShaderErrors){const X=o.getProgramInfoLog(A)||"",$=o.getShaderInfoLog(P)||"",K=o.getShaderInfoLog(O)||"",V=X.trim(),I=$.trim(),B=K.trim();let se=!0,he=!0;if(o.getProgramParameter(A,o.LINK_STATUS)===!1)if(se=!1,typeof a.debug.onShaderError=="function")a.debug.onShaderError(o,A,P,O);else{const L=H_(o,P,"vertex"),Q=H_(o,O,"fragment");wt("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(A,o.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+V+`
`+L+`
`+Q)}else V!==""?st("WebGLProgram: Program Info Log:",V):(I===""||B==="")&&(he=!1);he&&(k.diagnostics={runnable:se,programLog:V,vertexShader:{log:I,prefix:x},fragmentShader:{log:B,prefix:v}})}o.deleteShader(P),o.deleteShader(O),E=new xu(o,A),D=W2(o,A)}let E;this.getUniforms=function(){return E===void 0&&F(this),E};let D;this.getAttributes=function(){return D===void 0&&F(this),D};let Y=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return Y===!1&&(Y=o.getProgramParameter(A,I2)),Y},this.destroy=function(){r.releaseStatesOfProgram(this),o.deleteProgram(A),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=F2++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=P,this.fragmentShader=O,this}let lC=0;class cC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,r=e.fragmentShader,o=this._getShaderStage(n),c=this._getShaderStage(r),f=this._getShaderCacheForMaterial(e);return f.has(o)===!1&&(f.add(o),o.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const r of n)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let r=n.get(e);return r===void 0&&(r=new Set,n.set(e,r)),r}_getShaderStage(e){const n=this.shaderCache;let r=n.get(e);return r===void 0&&(r=new uC(e),n.set(e,r)),r}}class uC{constructor(e){this.id=lC++,this.code=e,this.usedTimes=0}}function fC(a,e,n,r,o,c){const f=new Vp,h=new cC,m=new Set,d=[],g=new Map,b=r.logarithmicDepthBuffer;let _=r.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(E){return m.add(E),E===0?"uv":`uv${E}`}function A(E,D,Y,k,X){const $=k.fog,K=X.geometry,V=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?k.environment:null,I=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,B=e.get(E.envMap||V,I),se=B&&B.mapping===Cu?B.image.height:null,he=y[E.type];E.precision!==null&&(_=r.getMaxPrecision(E.precision),_!==E.precision&&st("WebGLProgram.getParameters:",E.precision,"not supported, using",_,"instead."));const L=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Q=L!==void 0?L.length:0;let le=0;K.morphAttributes.position!==void 0&&(le=1),K.morphAttributes.normal!==void 0&&(le=2),K.morphAttributes.color!==void 0&&(le=3);let ge,we,Le,ee;if(he){const Dt=Vi[he];ge=Dt.vertexShader,we=Dt.fragmentShader}else ge=E.vertexShader,we=E.fragmentShader,h.update(E),Le=h.getVertexShaderID(E),ee=h.getFragmentShaderID(E);const Me=a.getRenderTarget(),Se=a.state.buffers.depth.getReversed(),ze=X.isInstancedMesh===!0,Je=X.isBatchedMesh===!0,et=!!E.map,Wt=!!E.matcap,ct=!!B,_t=!!E.aoMap,Bt=!!E.lightMap,ut=!!E.bumpMap,Ct=!!E.normalMap,j=!!E.displacementMap,tn=!!E.emissiveMap,At=!!E.metalnessMap,Lt=!!E.roughnessMap,Ye=E.anisotropy>0,H=E.clearcoat>0,w=E.dispersion>0,J=E.iridescence>0,ve=E.sheen>0,xe=E.transmission>0,pe=Ye&&!!E.anisotropyMap,Oe=H&&!!E.clearcoatMap,De=H&&!!E.clearcoatNormalMap,$e=H&&!!E.clearcoatRoughnessMap,nt=J&&!!E.iridescenceMap,Ee=J&&!!E.iridescenceThicknessMap,Ae=ve&&!!E.sheenColorMap,Be=ve&&!!E.sheenRoughnessMap,Ge=!!E.specularMap,Ie=!!E.specularColorMap,ft=!!E.specularIntensityMap,Z=xe&&!!E.transmissionMap,Ce=xe&&!!E.thicknessMap,Re=!!E.gradientMap,Fe=!!E.alphaMap,Te=E.alphaTest>0,me=!!E.alphaHash,Ve=!!E.extensions;let at=Wi;E.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(at=a.toneMapping);const Ft={shaderID:he,shaderType:E.type,shaderName:E.name,vertexShader:ge,fragmentShader:we,defines:E.defines,customVertexShaderID:Le,customFragmentShaderID:ee,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:_,batching:Je,batchingColor:Je&&X._colorsTexture!==null,instancing:ze,instancingColor:ze&&X.instanceColor!==null,instancingMorph:ze&&X.morphTexture!==null,outputColorSpace:Me===null?a.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:Zs,alphaToCoverage:!!E.alphaToCoverage,map:et,matcap:Wt,envMap:ct,envMapMode:ct&&B.mapping,envMapCubeUVHeight:se,aoMap:_t,lightMap:Bt,bumpMap:ut,normalMap:Ct,displacementMap:j,emissiveMap:tn,normalMapObjectSpace:Ct&&E.normalMapType===DE,normalMapTangentSpace:Ct&&E.normalMapType===kx,metalnessMap:At,roughnessMap:Lt,anisotropy:Ye,anisotropyMap:pe,clearcoat:H,clearcoatMap:Oe,clearcoatNormalMap:De,clearcoatRoughnessMap:$e,dispersion:w,iridescence:J,iridescenceMap:nt,iridescenceThicknessMap:Ee,sheen:ve,sheenColorMap:Ae,sheenRoughnessMap:Be,specularMap:Ge,specularColorMap:Ie,specularIntensityMap:ft,transmission:xe,transmissionMap:Z,thicknessMap:Ce,gradientMap:Re,opaque:E.transparent===!1&&E.blending===Vs&&E.alphaToCoverage===!1,alphaMap:Fe,alphaTest:Te,alphaHash:me,combine:E.combine,mapUv:et&&S(E.map.channel),aoMapUv:_t&&S(E.aoMap.channel),lightMapUv:Bt&&S(E.lightMap.channel),bumpMapUv:ut&&S(E.bumpMap.channel),normalMapUv:Ct&&S(E.normalMap.channel),displacementMapUv:j&&S(E.displacementMap.channel),emissiveMapUv:tn&&S(E.emissiveMap.channel),metalnessMapUv:At&&S(E.metalnessMap.channel),roughnessMapUv:Lt&&S(E.roughnessMap.channel),anisotropyMapUv:pe&&S(E.anisotropyMap.channel),clearcoatMapUv:Oe&&S(E.clearcoatMap.channel),clearcoatNormalMapUv:De&&S(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$e&&S(E.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&S(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ee&&S(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&S(E.sheenColorMap.channel),sheenRoughnessMapUv:Be&&S(E.sheenRoughnessMap.channel),specularMapUv:Ge&&S(E.specularMap.channel),specularColorMapUv:Ie&&S(E.specularColorMap.channel),specularIntensityMapUv:ft&&S(E.specularIntensityMap.channel),transmissionMapUv:Z&&S(E.transmissionMap.channel),thicknessMapUv:Ce&&S(E.thicknessMap.channel),alphaMapUv:Fe&&S(E.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Ct||Ye),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!K.attributes.uv&&(et||Fe),fog:!!$,useFog:E.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||K.attributes.normal===void 0&&Ct===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:b,reversedDepthBuffer:Se,skinning:X.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:le,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:E.dithering,shadowMapEnabled:a.shadowMap.enabled&&Y.length>0,shadowMapType:a.shadowMap.type,toneMapping:at,decodeVideoTexture:et&&E.map.isVideoTexture===!0&&Rt.getTransfer(E.map.colorSpace)===Gt,decodeVideoTextureEmissive:tn&&E.emissiveMap.isVideoTexture===!0&&Rt.getTransfer(E.emissiveMap.colorSpace)===Gt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ea,flipSided:E.side===Jn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Ve&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ve&&E.extensions.multiDraw===!0||Je)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Ft.vertexUv1s=m.has(1),Ft.vertexUv2s=m.has(2),Ft.vertexUv3s=m.has(3),m.clear(),Ft}function x(E){const D=[];if(E.shaderID?D.push(E.shaderID):(D.push(E.customVertexShaderID),D.push(E.customFragmentShaderID)),E.defines!==void 0)for(const Y in E.defines)D.push(Y),D.push(E.defines[Y]);return E.isRawShaderMaterial===!1&&(v(D,E),T(D,E),D.push(a.outputColorSpace)),D.push(E.customProgramCacheKey),D.join()}function v(E,D){E.push(D.precision),E.push(D.outputColorSpace),E.push(D.envMapMode),E.push(D.envMapCubeUVHeight),E.push(D.mapUv),E.push(D.alphaMapUv),E.push(D.lightMapUv),E.push(D.aoMapUv),E.push(D.bumpMapUv),E.push(D.normalMapUv),E.push(D.displacementMapUv),E.push(D.emissiveMapUv),E.push(D.metalnessMapUv),E.push(D.roughnessMapUv),E.push(D.anisotropyMapUv),E.push(D.clearcoatMapUv),E.push(D.clearcoatNormalMapUv),E.push(D.clearcoatRoughnessMapUv),E.push(D.iridescenceMapUv),E.push(D.iridescenceThicknessMapUv),E.push(D.sheenColorMapUv),E.push(D.sheenRoughnessMapUv),E.push(D.specularMapUv),E.push(D.specularColorMapUv),E.push(D.specularIntensityMapUv),E.push(D.transmissionMapUv),E.push(D.thicknessMapUv),E.push(D.combine),E.push(D.fogExp2),E.push(D.sizeAttenuation),E.push(D.morphTargetsCount),E.push(D.morphAttributeCount),E.push(D.numDirLights),E.push(D.numPointLights),E.push(D.numSpotLights),E.push(D.numSpotLightMaps),E.push(D.numHemiLights),E.push(D.numRectAreaLights),E.push(D.numDirLightShadows),E.push(D.numPointLightShadows),E.push(D.numSpotLightShadows),E.push(D.numSpotLightShadowsWithMaps),E.push(D.numLightProbes),E.push(D.shadowMapType),E.push(D.toneMapping),E.push(D.numClippingPlanes),E.push(D.numClipIntersection),E.push(D.depthPacking)}function T(E,D){f.disableAll(),D.instancing&&f.enable(0),D.instancingColor&&f.enable(1),D.instancingMorph&&f.enable(2),D.matcap&&f.enable(3),D.envMap&&f.enable(4),D.normalMapObjectSpace&&f.enable(5),D.normalMapTangentSpace&&f.enable(6),D.clearcoat&&f.enable(7),D.iridescence&&f.enable(8),D.alphaTest&&f.enable(9),D.vertexColors&&f.enable(10),D.vertexAlphas&&f.enable(11),D.vertexUv1s&&f.enable(12),D.vertexUv2s&&f.enable(13),D.vertexUv3s&&f.enable(14),D.vertexTangents&&f.enable(15),D.anisotropy&&f.enable(16),D.alphaHash&&f.enable(17),D.batching&&f.enable(18),D.dispersion&&f.enable(19),D.batchingColor&&f.enable(20),D.gradientMap&&f.enable(21),E.push(f.mask),f.disableAll(),D.fog&&f.enable(0),D.useFog&&f.enable(1),D.flatShading&&f.enable(2),D.logarithmicDepthBuffer&&f.enable(3),D.reversedDepthBuffer&&f.enable(4),D.skinning&&f.enable(5),D.morphTargets&&f.enable(6),D.morphNormals&&f.enable(7),D.morphColors&&f.enable(8),D.premultipliedAlpha&&f.enable(9),D.shadowMapEnabled&&f.enable(10),D.doubleSided&&f.enable(11),D.flipSided&&f.enable(12),D.useDepthPacking&&f.enable(13),D.dithering&&f.enable(14),D.transmission&&f.enable(15),D.sheen&&f.enable(16),D.opaque&&f.enable(17),D.pointsUvs&&f.enable(18),D.decodeVideoTexture&&f.enable(19),D.decodeVideoTextureEmissive&&f.enable(20),D.alphaToCoverage&&f.enable(21),E.push(f.mask)}function C(E){const D=y[E.type];let Y;if(D){const k=Vi[D];Y=DT.clone(k.uniforms)}else Y=E.uniforms;return Y}function R(E,D){let Y=g.get(D);return Y!==void 0?++Y.usedTimes:(Y=new oC(a,D,E,o),d.push(Y),g.set(D,Y)),Y}function P(E){if(--E.usedTimes===0){const D=d.indexOf(E);d[D]=d[d.length-1],d.pop(),g.delete(E.cacheKey),E.destroy()}}function O(E){h.remove(E)}function F(){h.dispose()}return{getParameters:A,getProgramCacheKey:x,getUniforms:C,acquireProgram:R,releaseProgram:P,releaseShaderCache:O,programs:d,dispose:F}}function dC(){let a=new WeakMap;function e(f){return a.has(f)}function n(f){let h=a.get(f);return h===void 0&&(h={},a.set(f,h)),h}function r(f){a.delete(f)}function o(f,h,m){a.get(f)[h]=m}function c(){a=new WeakMap}return{has:e,get:n,remove:r,update:o,dispose:c}}function hC(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.material.id!==e.material.id?a.material.id-e.material.id:a.materialVariant!==e.materialVariant?a.materialVariant-e.materialVariant:a.z!==e.z?a.z-e.z:a.id-e.id}function X_(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.z!==e.z?e.z-a.z:a.id-e.id}function W_(){const a=[];let e=0;const n=[],r=[],o=[];function c(){e=0,n.length=0,r.length=0,o.length=0}function f(_){let y=0;return _.isInstancedMesh&&(y+=2),_.isSkinnedMesh&&(y+=1),y}function h(_,y,S,A,x,v){let T=a[e];return T===void 0?(T={id:_.id,object:_,geometry:y,material:S,materialVariant:f(_),groupOrder:A,renderOrder:_.renderOrder,z:x,group:v},a[e]=T):(T.id=_.id,T.object=_,T.geometry=y,T.material=S,T.materialVariant=f(_),T.groupOrder=A,T.renderOrder=_.renderOrder,T.z=x,T.group=v),e++,T}function m(_,y,S,A,x,v){const T=h(_,y,S,A,x,v);S.transmission>0?r.push(T):S.transparent===!0?o.push(T):n.push(T)}function d(_,y,S,A,x,v){const T=h(_,y,S,A,x,v);S.transmission>0?r.unshift(T):S.transparent===!0?o.unshift(T):n.unshift(T)}function g(_,y){n.length>1&&n.sort(_||hC),r.length>1&&r.sort(y||X_),o.length>1&&o.sort(y||X_)}function b(){for(let _=e,y=a.length;_<y;_++){const S=a[_];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:n,transmissive:r,transparent:o,init:c,push:m,unshift:d,finish:b,sort:g}}function pC(){let a=new WeakMap;function e(r,o){const c=a.get(r);let f;return c===void 0?(f=new W_,a.set(r,[f])):o>=c.length?(f=new W_,c.push(f)):f=c[o],f}function n(){a=new WeakMap}return{get:e,dispose:n}}function mC(){const a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new re,color:new yt};break;case"SpotLight":n={position:new re,direction:new re,color:new yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new re,color:new yt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new re,skyColor:new yt,groundColor:new yt};break;case"RectAreaLight":n={color:new yt,position:new re,halfWidth:new re,halfHeight:new re};break}return a[e.id]=n,n}}}function gC(){const a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[e.id]=n,n}}}let vC=0;function _C(a,e){return(e.castShadow?2:0)-(a.castShadow?2:0)+(e.map?1:0)-(a.map?1:0)}function xC(a){const e=new mC,n=gC(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)r.probe.push(new re);const o=new re,c=new en,f=new en;function h(d){let g=0,b=0,_=0;for(let D=0;D<9;D++)r.probe[D].set(0,0,0);let y=0,S=0,A=0,x=0,v=0,T=0,C=0,R=0,P=0,O=0,F=0;d.sort(_C);for(let D=0,Y=d.length;D<Y;D++){const k=d[D],X=k.color,$=k.intensity,K=k.distance;let V=null;if(k.shadow&&k.shadow.map&&(k.shadow.map.texture.format===Ys?V=k.shadow.map.texture:V=k.shadow.map.depthTexture||k.shadow.map.texture),k.isAmbientLight)g+=X.r*$,b+=X.g*$,_+=X.b*$;else if(k.isLightProbe){for(let I=0;I<9;I++)r.probe[I].addScaledVector(k.sh.coefficients[I],$);F++}else if(k.isDirectionalLight){const I=e.get(k);if(I.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const B=k.shadow,se=n.get(k);se.shadowIntensity=B.intensity,se.shadowBias=B.bias,se.shadowNormalBias=B.normalBias,se.shadowRadius=B.radius,se.shadowMapSize=B.mapSize,r.directionalShadow[y]=se,r.directionalShadowMap[y]=V,r.directionalShadowMatrix[y]=k.shadow.matrix,T++}r.directional[y]=I,y++}else if(k.isSpotLight){const I=e.get(k);I.position.setFromMatrixPosition(k.matrixWorld),I.color.copy(X).multiplyScalar($),I.distance=K,I.coneCos=Math.cos(k.angle),I.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),I.decay=k.decay,r.spot[A]=I;const B=k.shadow;if(k.map&&(r.spotLightMap[P]=k.map,P++,B.updateMatrices(k),k.castShadow&&O++),r.spotLightMatrix[A]=B.matrix,k.castShadow){const se=n.get(k);se.shadowIntensity=B.intensity,se.shadowBias=B.bias,se.shadowNormalBias=B.normalBias,se.shadowRadius=B.radius,se.shadowMapSize=B.mapSize,r.spotShadow[A]=se,r.spotShadowMap[A]=V,R++}A++}else if(k.isRectAreaLight){const I=e.get(k);I.color.copy(X).multiplyScalar($),I.halfWidth.set(k.width*.5,0,0),I.halfHeight.set(0,k.height*.5,0),r.rectArea[x]=I,x++}else if(k.isPointLight){const I=e.get(k);if(I.color.copy(k.color).multiplyScalar(k.intensity),I.distance=k.distance,I.decay=k.decay,k.castShadow){const B=k.shadow,se=n.get(k);se.shadowIntensity=B.intensity,se.shadowBias=B.bias,se.shadowNormalBias=B.normalBias,se.shadowRadius=B.radius,se.shadowMapSize=B.mapSize,se.shadowCameraNear=B.camera.near,se.shadowCameraFar=B.camera.far,r.pointShadow[S]=se,r.pointShadowMap[S]=V,r.pointShadowMatrix[S]=k.shadow.matrix,C++}r.point[S]=I,S++}else if(k.isHemisphereLight){const I=e.get(k);I.skyColor.copy(k.color).multiplyScalar($),I.groundColor.copy(k.groundColor).multiplyScalar($),r.hemi[v]=I,v++}}x>0&&(a.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Pe.LTC_FLOAT_1,r.rectAreaLTC2=Pe.LTC_FLOAT_2):(r.rectAreaLTC1=Pe.LTC_HALF_1,r.rectAreaLTC2=Pe.LTC_HALF_2)),r.ambient[0]=g,r.ambient[1]=b,r.ambient[2]=_;const E=r.hash;(E.directionalLength!==y||E.pointLength!==S||E.spotLength!==A||E.rectAreaLength!==x||E.hemiLength!==v||E.numDirectionalShadows!==T||E.numPointShadows!==C||E.numSpotShadows!==R||E.numSpotMaps!==P||E.numLightProbes!==F)&&(r.directional.length=y,r.spot.length=A,r.rectArea.length=x,r.point.length=S,r.hemi.length=v,r.directionalShadow.length=T,r.directionalShadowMap.length=T,r.pointShadow.length=C,r.pointShadowMap.length=C,r.spotShadow.length=R,r.spotShadowMap.length=R,r.directionalShadowMatrix.length=T,r.pointShadowMatrix.length=C,r.spotLightMatrix.length=R+P-O,r.spotLightMap.length=P,r.numSpotLightShadowsWithMaps=O,r.numLightProbes=F,E.directionalLength=y,E.pointLength=S,E.spotLength=A,E.rectAreaLength=x,E.hemiLength=v,E.numDirectionalShadows=T,E.numPointShadows=C,E.numSpotShadows=R,E.numSpotMaps=P,E.numLightProbes=F,r.version=vC++)}function m(d,g){let b=0,_=0,y=0,S=0,A=0;const x=g.matrixWorldInverse;for(let v=0,T=d.length;v<T;v++){const C=d[v];if(C.isDirectionalLight){const R=r.directional[b];R.direction.setFromMatrixPosition(C.matrixWorld),o.setFromMatrixPosition(C.target.matrixWorld),R.direction.sub(o),R.direction.transformDirection(x),b++}else if(C.isSpotLight){const R=r.spot[y];R.position.setFromMatrixPosition(C.matrixWorld),R.position.applyMatrix4(x),R.direction.setFromMatrixPosition(C.matrixWorld),o.setFromMatrixPosition(C.target.matrixWorld),R.direction.sub(o),R.direction.transformDirection(x),y++}else if(C.isRectAreaLight){const R=r.rectArea[S];R.position.setFromMatrixPosition(C.matrixWorld),R.position.applyMatrix4(x),f.identity(),c.copy(C.matrixWorld),c.premultiply(x),f.extractRotation(c),R.halfWidth.set(C.width*.5,0,0),R.halfHeight.set(0,C.height*.5,0),R.halfWidth.applyMatrix4(f),R.halfHeight.applyMatrix4(f),S++}else if(C.isPointLight){const R=r.point[_];R.position.setFromMatrixPosition(C.matrixWorld),R.position.applyMatrix4(x),_++}else if(C.isHemisphereLight){const R=r.hemi[A];R.direction.setFromMatrixPosition(C.matrixWorld),R.direction.transformDirection(x),A++}}}return{setup:h,setupView:m,state:r}}function q_(a){const e=new xC(a),n=[],r=[];function o(g){d.camera=g,n.length=0,r.length=0}function c(g){n.push(g)}function f(g){r.push(g)}function h(){e.setup(n)}function m(g){e.setupView(n,g)}const d={lightsArray:n,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:o,state:d,setupLights:h,setupLightsView:m,pushLight:c,pushShadow:f}}function yC(a){let e=new WeakMap;function n(o,c=0){const f=e.get(o);let h;return f===void 0?(h=new q_(a),e.set(o,[h])):c>=f.length?(h=new q_(a),f.push(h)):h=f[c],h}function r(){e=new WeakMap}return{get:n,dispose:r}}const bC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,SC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,MC=[new re(1,0,0),new re(-1,0,0),new re(0,1,0),new re(0,-1,0),new re(0,0,1),new re(0,0,-1)],EC=[new re(0,-1,0),new re(0,-1,0),new re(0,0,1),new re(0,0,-1),new re(0,-1,0),new re(0,-1,0)],Y_=new en,sl=new re,Sh=new re;function TC(a,e,n){let r=new Wp;const o=new Ut,c=new Ut,f=new on,h=new OT,m=new PT,d={},g=n.maxTextureSize,b={[dr]:Jn,[Jn]:dr,[Ea]:Ea},_=new Qi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ut},radius:{value:4}},vertexShader:bC,fragmentShader:SC}),y=_.clone();y.defines.HORIZONTAL_PASS=1;const S=new jn;S.setAttribute("position",new Yi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new Ui(S,_),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pu;let v=this.type;this.render=function(O,F,E){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||O.length===0)return;this.type===Tx&&(st("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=pu);const D=a.getRenderTarget(),Y=a.getActiveCubeFace(),k=a.getActiveMipmapLevel(),X=a.state;X.setBlending(Aa),X.buffers.depth.getReversed()===!0?X.buffers.color.setClear(0,0,0,0):X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const $=v!==this.type;$&&F.traverse(function(K){K.material&&(Array.isArray(K.material)?K.material.forEach(V=>V.needsUpdate=!0):K.material.needsUpdate=!0)});for(let K=0,V=O.length;K<V;K++){const I=O[K],B=I.shadow;if(B===void 0){st("WebGLShadowMap:",I,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;o.copy(B.mapSize);const se=B.getFrameExtents();o.multiply(se),c.copy(B.mapSize),(o.x>g||o.y>g)&&(o.x>g&&(c.x=Math.floor(g/se.x),o.x=c.x*se.x,B.mapSize.x=c.x),o.y>g&&(c.y=Math.floor(g/se.y),o.y=c.y*se.y,B.mapSize.y=c.y));const he=a.state.buffers.depth.getReversed();if(B.camera._reversedDepth=he,B.map===null||$===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===ll){if(I.isPointLight){st("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new qi(o.x,o.y,{format:Ys,type:Ra,minFilter:Bn,magFilter:Bn,generateMipmaps:!1}),B.map.texture.name=I.name+".shadowMap",B.map.depthTexture=new xl(o.x,o.y,ji),B.map.depthTexture.name=I.name+".shadowMapDepth",B.map.depthTexture.format=Ca,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Ln,B.map.depthTexture.magFilter=Ln}else I.isPointLight?(B.map=new ty(o.x),B.map.depthTexture=new RT(o.x,Zi)):(B.map=new qi(o.x,o.y),B.map.depthTexture=new xl(o.x,o.y,Zi)),B.map.depthTexture.name=I.name+".shadowMap",B.map.depthTexture.format=Ca,this.type===pu?(B.map.depthTexture.compareFunction=he?Hp:Bp,B.map.depthTexture.minFilter=Bn,B.map.depthTexture.magFilter=Bn):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Ln,B.map.depthTexture.magFilter=Ln);B.camera.updateProjectionMatrix()}const L=B.map.isWebGLCubeRenderTarget?6:1;for(let Q=0;Q<L;Q++){if(B.map.isWebGLCubeRenderTarget)a.setRenderTarget(B.map,Q),a.clear();else{Q===0&&(a.setRenderTarget(B.map),a.clear());const le=B.getViewport(Q);f.set(c.x*le.x,c.y*le.y,c.x*le.z,c.y*le.w),X.viewport(f)}if(I.isPointLight){const le=B.camera,ge=B.matrix,we=I.distance||le.far;we!==le.far&&(le.far=we,le.updateProjectionMatrix()),sl.setFromMatrixPosition(I.matrixWorld),le.position.copy(sl),Sh.copy(le.position),Sh.add(MC[Q]),le.up.copy(EC[Q]),le.lookAt(Sh),le.updateMatrixWorld(),ge.makeTranslation(-sl.x,-sl.y,-sl.z),Y_.multiplyMatrices(le.projectionMatrix,le.matrixWorldInverse),B._frustum.setFromProjectionMatrix(Y_,le.coordinateSystem,le.reversedDepth)}else B.updateMatrices(I);r=B.getFrustum(),R(F,E,B.camera,I,this.type)}B.isPointLightShadow!==!0&&this.type===ll&&T(B,E),B.needsUpdate=!1}v=this.type,x.needsUpdate=!1,a.setRenderTarget(D,Y,k)};function T(O,F){const E=e.update(A);_.defines.VSM_SAMPLES!==O.blurSamples&&(_.defines.VSM_SAMPLES=O.blurSamples,y.defines.VSM_SAMPLES=O.blurSamples,_.needsUpdate=!0,y.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new qi(o.x,o.y,{format:Ys,type:Ra})),_.uniforms.shadow_pass.value=O.map.depthTexture,_.uniforms.resolution.value=O.mapSize,_.uniforms.radius.value=O.radius,a.setRenderTarget(O.mapPass),a.clear(),a.renderBufferDirect(F,null,E,_,A,null),y.uniforms.shadow_pass.value=O.mapPass.texture,y.uniforms.resolution.value=O.mapSize,y.uniforms.radius.value=O.radius,a.setRenderTarget(O.map),a.clear(),a.renderBufferDirect(F,null,E,y,A,null)}function C(O,F,E,D){let Y=null;const k=E.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(k!==void 0)Y=k;else if(Y=E.isPointLight===!0?m:h,a.localClippingEnabled&&F.clipShadows===!0&&Array.isArray(F.clippingPlanes)&&F.clippingPlanes.length!==0||F.displacementMap&&F.displacementScale!==0||F.alphaMap&&F.alphaTest>0||F.map&&F.alphaTest>0||F.alphaToCoverage===!0){const X=Y.uuid,$=F.uuid;let K=d[X];K===void 0&&(K={},d[X]=K);let V=K[$];V===void 0&&(V=Y.clone(),K[$]=V,F.addEventListener("dispose",P)),Y=V}if(Y.visible=F.visible,Y.wireframe=F.wireframe,D===ll?Y.side=F.shadowSide!==null?F.shadowSide:F.side:Y.side=F.shadowSide!==null?F.shadowSide:b[F.side],Y.alphaMap=F.alphaMap,Y.alphaTest=F.alphaToCoverage===!0?.5:F.alphaTest,Y.map=F.map,Y.clipShadows=F.clipShadows,Y.clippingPlanes=F.clippingPlanes,Y.clipIntersection=F.clipIntersection,Y.displacementMap=F.displacementMap,Y.displacementScale=F.displacementScale,Y.displacementBias=F.displacementBias,Y.wireframeLinewidth=F.wireframeLinewidth,Y.linewidth=F.linewidth,E.isPointLight===!0&&Y.isMeshDistanceMaterial===!0){const X=a.properties.get(Y);X.light=E}return Y}function R(O,F,E,D,Y){if(O.visible===!1)return;if(O.layers.test(F.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&Y===ll)&&(!O.frustumCulled||r.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,O.matrixWorld);const $=e.update(O),K=O.material;if(Array.isArray(K)){const V=$.groups;for(let I=0,B=V.length;I<B;I++){const se=V[I],he=K[se.materialIndex];if(he&&he.visible){const L=C(O,he,D,Y);O.onBeforeShadow(a,O,F,E,$,L,se),a.renderBufferDirect(E,null,$,L,O,se),O.onAfterShadow(a,O,F,E,$,L,se)}}}else if(K.visible){const V=C(O,K,D,Y);O.onBeforeShadow(a,O,F,E,$,V,null),a.renderBufferDirect(E,null,$,V,O,null),O.onAfterShadow(a,O,F,E,$,V,null)}}const X=O.children;for(let $=0,K=X.length;$<K;$++)R(X[$],F,E,D,Y)}function P(O){O.target.removeEventListener("dispose",P);for(const E in d){const D=d[E],Y=O.target.uuid;Y in D&&(D[Y].dispose(),delete D[Y])}}}function AC(a,e){function n(){let Z=!1;const Ce=new on;let Re=null;const Fe=new on(0,0,0,0);return{setMask:function(Te){Re!==Te&&!Z&&(a.colorMask(Te,Te,Te,Te),Re=Te)},setLocked:function(Te){Z=Te},setClear:function(Te,me,Ve,at,Ft){Ft===!0&&(Te*=at,me*=at,Ve*=at),Ce.set(Te,me,Ve,at),Fe.equals(Ce)===!1&&(a.clearColor(Te,me,Ve,at),Fe.copy(Ce))},reset:function(){Z=!1,Re=null,Fe.set(-1,0,0,0)}}}function r(){let Z=!1,Ce=!1,Re=null,Fe=null,Te=null;return{setReversed:function(me){if(Ce!==me){const Ve=e.get("EXT_clip_control");me?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT),Ce=me;const at=Te;Te=null,this.setClear(at)}},getReversed:function(){return Ce},setTest:function(me){me?Me(a.DEPTH_TEST):Se(a.DEPTH_TEST)},setMask:function(me){Re!==me&&!Z&&(a.depthMask(me),Re=me)},setFunc:function(me){if(Ce&&(me=HE[me]),Fe!==me){switch(me){case Uh:a.depthFunc(a.NEVER);break;case Lh:a.depthFunc(a.ALWAYS);break;case Oh:a.depthFunc(a.LESS);break;case Ws:a.depthFunc(a.LEQUAL);break;case Ph:a.depthFunc(a.EQUAL);break;case Ih:a.depthFunc(a.GEQUAL);break;case Fh:a.depthFunc(a.GREATER);break;case zh:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}Fe=me}},setLocked:function(me){Z=me},setClear:function(me){Te!==me&&(Te=me,Ce&&(me=1-me),a.clearDepth(me))},reset:function(){Z=!1,Re=null,Fe=null,Te=null,Ce=!1}}}function o(){let Z=!1,Ce=null,Re=null,Fe=null,Te=null,me=null,Ve=null,at=null,Ft=null;return{setTest:function(Dt){Z||(Dt?Me(a.STENCIL_TEST):Se(a.STENCIL_TEST))},setMask:function(Dt){Ce!==Dt&&!Z&&(a.stencilMask(Dt),Ce=Dt)},setFunc:function(Dt,bi,Sn){(Re!==Dt||Fe!==bi||Te!==Sn)&&(a.stencilFunc(Dt,bi,Sn),Re=Dt,Fe=bi,Te=Sn)},setOp:function(Dt,bi,Sn){(me!==Dt||Ve!==bi||at!==Sn)&&(a.stencilOp(Dt,bi,Sn),me=Dt,Ve=bi,at=Sn)},setLocked:function(Dt){Z=Dt},setClear:function(Dt){Ft!==Dt&&(a.clearStencil(Dt),Ft=Dt)},reset:function(){Z=!1,Ce=null,Re=null,Fe=null,Te=null,me=null,Ve=null,at=null,Ft=null}}}const c=new n,f=new r,h=new o,m=new WeakMap,d=new WeakMap;let g={},b={},_=new WeakMap,y=[],S=null,A=!1,x=null,v=null,T=null,C=null,R=null,P=null,O=null,F=new yt(0,0,0),E=0,D=!1,Y=null,k=null,X=null,$=null,K=null;const V=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let I=!1,B=0;const se=a.getParameter(a.VERSION);se.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(se)[1]),I=B>=1):se.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(se)[1]),I=B>=2);let he=null,L={};const Q=a.getParameter(a.SCISSOR_BOX),le=a.getParameter(a.VIEWPORT),ge=new on().fromArray(Q),we=new on().fromArray(le);function Le(Z,Ce,Re,Fe){const Te=new Uint8Array(4),me=a.createTexture();a.bindTexture(Z,me),a.texParameteri(Z,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(Z,a.TEXTURE_MAG_FILTER,a.NEAREST);for(let Ve=0;Ve<Re;Ve++)Z===a.TEXTURE_3D||Z===a.TEXTURE_2D_ARRAY?a.texImage3D(Ce,0,a.RGBA,1,1,Fe,0,a.RGBA,a.UNSIGNED_BYTE,Te):a.texImage2D(Ce+Ve,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,Te);return me}const ee={};ee[a.TEXTURE_2D]=Le(a.TEXTURE_2D,a.TEXTURE_2D,1),ee[a.TEXTURE_CUBE_MAP]=Le(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[a.TEXTURE_2D_ARRAY]=Le(a.TEXTURE_2D_ARRAY,a.TEXTURE_2D_ARRAY,1,1),ee[a.TEXTURE_3D]=Le(a.TEXTURE_3D,a.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),h.setClear(0),Me(a.DEPTH_TEST),f.setFunc(Ws),ut(!1),Ct(Xv),Me(a.CULL_FACE),_t(Aa);function Me(Z){g[Z]!==!0&&(a.enable(Z),g[Z]=!0)}function Se(Z){g[Z]!==!1&&(a.disable(Z),g[Z]=!1)}function ze(Z,Ce){return b[Z]!==Ce?(a.bindFramebuffer(Z,Ce),b[Z]=Ce,Z===a.DRAW_FRAMEBUFFER&&(b[a.FRAMEBUFFER]=Ce),Z===a.FRAMEBUFFER&&(b[a.DRAW_FRAMEBUFFER]=Ce),!0):!1}function Je(Z,Ce){let Re=y,Fe=!1;if(Z){Re=_.get(Ce),Re===void 0&&(Re=[],_.set(Ce,Re));const Te=Z.textures;if(Re.length!==Te.length||Re[0]!==a.COLOR_ATTACHMENT0){for(let me=0,Ve=Te.length;me<Ve;me++)Re[me]=a.COLOR_ATTACHMENT0+me;Re.length=Te.length,Fe=!0}}else Re[0]!==a.BACK&&(Re[0]=a.BACK,Fe=!0);Fe&&a.drawBuffers(Re)}function et(Z){return S!==Z?(a.useProgram(Z),S=Z,!0):!1}const Wt={[zr]:a.FUNC_ADD,[cE]:a.FUNC_SUBTRACT,[uE]:a.FUNC_REVERSE_SUBTRACT};Wt[fE]=a.MIN,Wt[dE]=a.MAX;const ct={[hE]:a.ZERO,[pE]:a.ONE,[mE]:a.SRC_COLOR,[Dh]:a.SRC_ALPHA,[bE]:a.SRC_ALPHA_SATURATE,[xE]:a.DST_COLOR,[vE]:a.DST_ALPHA,[gE]:a.ONE_MINUS_SRC_COLOR,[Nh]:a.ONE_MINUS_SRC_ALPHA,[yE]:a.ONE_MINUS_DST_COLOR,[_E]:a.ONE_MINUS_DST_ALPHA,[SE]:a.CONSTANT_COLOR,[ME]:a.ONE_MINUS_CONSTANT_COLOR,[EE]:a.CONSTANT_ALPHA,[TE]:a.ONE_MINUS_CONSTANT_ALPHA};function _t(Z,Ce,Re,Fe,Te,me,Ve,at,Ft,Dt){if(Z===Aa){A===!0&&(Se(a.BLEND),A=!1);return}if(A===!1&&(Me(a.BLEND),A=!0),Z!==lE){if(Z!==x||Dt!==D){if((v!==zr||R!==zr)&&(a.blendEquation(a.FUNC_ADD),v=zr,R=zr),Dt)switch(Z){case Vs:a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case Wv:a.blendFunc(a.ONE,a.ONE);break;case qv:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case Yv:a.blendFuncSeparate(a.DST_COLOR,a.ONE_MINUS_SRC_ALPHA,a.ZERO,a.ONE);break;default:wt("WebGLState: Invalid blending: ",Z);break}else switch(Z){case Vs:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case Wv:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE,a.ONE,a.ONE);break;case qv:wt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Yv:wt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:wt("WebGLState: Invalid blending: ",Z);break}T=null,C=null,P=null,O=null,F.set(0,0,0),E=0,x=Z,D=Dt}return}Te=Te||Ce,me=me||Re,Ve=Ve||Fe,(Ce!==v||Te!==R)&&(a.blendEquationSeparate(Wt[Ce],Wt[Te]),v=Ce,R=Te),(Re!==T||Fe!==C||me!==P||Ve!==O)&&(a.blendFuncSeparate(ct[Re],ct[Fe],ct[me],ct[Ve]),T=Re,C=Fe,P=me,O=Ve),(at.equals(F)===!1||Ft!==E)&&(a.blendColor(at.r,at.g,at.b,Ft),F.copy(at),E=Ft),x=Z,D=!1}function Bt(Z,Ce){Z.side===Ea?Se(a.CULL_FACE):Me(a.CULL_FACE);let Re=Z.side===Jn;Ce&&(Re=!Re),ut(Re),Z.blending===Vs&&Z.transparent===!1?_t(Aa):_t(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.blendColor,Z.blendAlpha,Z.premultipliedAlpha),f.setFunc(Z.depthFunc),f.setTest(Z.depthTest),f.setMask(Z.depthWrite),c.setMask(Z.colorWrite);const Fe=Z.stencilWrite;h.setTest(Fe),Fe&&(h.setMask(Z.stencilWriteMask),h.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),h.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),tn(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?Me(a.SAMPLE_ALPHA_TO_COVERAGE):Se(a.SAMPLE_ALPHA_TO_COVERAGE)}function ut(Z){Y!==Z&&(Z?a.frontFace(a.CW):a.frontFace(a.CCW),Y=Z)}function Ct(Z){Z!==sE?(Me(a.CULL_FACE),Z!==k&&(Z===Xv?a.cullFace(a.BACK):Z===oE?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):Se(a.CULL_FACE),k=Z}function j(Z){Z!==X&&(I&&a.lineWidth(Z),X=Z)}function tn(Z,Ce,Re){Z?(Me(a.POLYGON_OFFSET_FILL),($!==Ce||K!==Re)&&($=Ce,K=Re,f.getReversed()&&(Ce=-Ce),a.polygonOffset(Ce,Re))):Se(a.POLYGON_OFFSET_FILL)}function At(Z){Z?Me(a.SCISSOR_TEST):Se(a.SCISSOR_TEST)}function Lt(Z){Z===void 0&&(Z=a.TEXTURE0+V-1),he!==Z&&(a.activeTexture(Z),he=Z)}function Ye(Z,Ce,Re){Re===void 0&&(he===null?Re=a.TEXTURE0+V-1:Re=he);let Fe=L[Re];Fe===void 0&&(Fe={type:void 0,texture:void 0},L[Re]=Fe),(Fe.type!==Z||Fe.texture!==Ce)&&(he!==Re&&(a.activeTexture(Re),he=Re),a.bindTexture(Z,Ce||ee[Z]),Fe.type=Z,Fe.texture=Ce)}function H(){const Z=L[he];Z!==void 0&&Z.type!==void 0&&(a.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function w(){try{a.compressedTexImage2D(...arguments)}catch(Z){wt("WebGLState:",Z)}}function J(){try{a.compressedTexImage3D(...arguments)}catch(Z){wt("WebGLState:",Z)}}function ve(){try{a.texSubImage2D(...arguments)}catch(Z){wt("WebGLState:",Z)}}function xe(){try{a.texSubImage3D(...arguments)}catch(Z){wt("WebGLState:",Z)}}function pe(){try{a.compressedTexSubImage2D(...arguments)}catch(Z){wt("WebGLState:",Z)}}function Oe(){try{a.compressedTexSubImage3D(...arguments)}catch(Z){wt("WebGLState:",Z)}}function De(){try{a.texStorage2D(...arguments)}catch(Z){wt("WebGLState:",Z)}}function $e(){try{a.texStorage3D(...arguments)}catch(Z){wt("WebGLState:",Z)}}function nt(){try{a.texImage2D(...arguments)}catch(Z){wt("WebGLState:",Z)}}function Ee(){try{a.texImage3D(...arguments)}catch(Z){wt("WebGLState:",Z)}}function Ae(Z){ge.equals(Z)===!1&&(a.scissor(Z.x,Z.y,Z.z,Z.w),ge.copy(Z))}function Be(Z){we.equals(Z)===!1&&(a.viewport(Z.x,Z.y,Z.z,Z.w),we.copy(Z))}function Ge(Z,Ce){let Re=d.get(Ce);Re===void 0&&(Re=new WeakMap,d.set(Ce,Re));let Fe=Re.get(Z);Fe===void 0&&(Fe=a.getUniformBlockIndex(Ce,Z.name),Re.set(Z,Fe))}function Ie(Z,Ce){const Fe=d.get(Ce).get(Z);m.get(Ce)!==Fe&&(a.uniformBlockBinding(Ce,Fe,Z.__bindingPointIndex),m.set(Ce,Fe))}function ft(){a.disable(a.BLEND),a.disable(a.CULL_FACE),a.disable(a.DEPTH_TEST),a.disable(a.POLYGON_OFFSET_FILL),a.disable(a.SCISSOR_TEST),a.disable(a.STENCIL_TEST),a.disable(a.SAMPLE_ALPHA_TO_COVERAGE),a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ONE,a.ZERO),a.blendFuncSeparate(a.ONE,a.ZERO,a.ONE,a.ZERO),a.blendColor(0,0,0,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(a.LESS),f.setReversed(!1),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(a.ALWAYS,0,4294967295),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),a.clearStencil(0),a.cullFace(a.BACK),a.frontFace(a.CCW),a.polygonOffset(0,0),a.activeTexture(a.TEXTURE0),a.bindFramebuffer(a.FRAMEBUFFER,null),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),a.bindFramebuffer(a.READ_FRAMEBUFFER,null),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),g={},he=null,L={},b={},_=new WeakMap,y=[],S=null,A=!1,x=null,v=null,T=null,C=null,R=null,P=null,O=null,F=new yt(0,0,0),E=0,D=!1,Y=null,k=null,X=null,$=null,K=null,ge.set(0,0,a.canvas.width,a.canvas.height),we.set(0,0,a.canvas.width,a.canvas.height),c.reset(),f.reset(),h.reset()}return{buffers:{color:c,depth:f,stencil:h},enable:Me,disable:Se,bindFramebuffer:ze,drawBuffers:Je,useProgram:et,setBlending:_t,setMaterial:Bt,setFlipSided:ut,setCullFace:Ct,setLineWidth:j,setPolygonOffset:tn,setScissorTest:At,activeTexture:Lt,bindTexture:Ye,unbindTexture:H,compressedTexImage2D:w,compressedTexImage3D:J,texImage2D:nt,texImage3D:Ee,updateUBOMapping:Ge,uniformBlockBinding:Ie,texStorage2D:De,texStorage3D:$e,texSubImage2D:ve,texSubImage3D:xe,compressedTexSubImage2D:pe,compressedTexSubImage3D:Oe,scissor:Ae,viewport:Be,reset:ft}}function wC(a,e,n,r,o,c,f){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new Ut,g=new WeakMap;let b;const _=new WeakMap;let y=!1;try{y=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(H,w){return y?new OffscreenCanvas(H,w):Mu("canvas")}function A(H,w,J){let ve=1;const xe=Ye(H);if((xe.width>J||xe.height>J)&&(ve=J/Math.max(xe.width,xe.height)),ve<1)if(typeof HTMLImageElement<"u"&&H instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&H instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&H instanceof ImageBitmap||typeof VideoFrame<"u"&&H instanceof VideoFrame){const pe=Math.floor(ve*xe.width),Oe=Math.floor(ve*xe.height);b===void 0&&(b=S(pe,Oe));const De=w?S(pe,Oe):b;return De.width=pe,De.height=Oe,De.getContext("2d").drawImage(H,0,0,pe,Oe),st("WebGLRenderer: Texture has been resized from ("+xe.width+"x"+xe.height+") to ("+pe+"x"+Oe+")."),De}else return"data"in H&&st("WebGLRenderer: Image in DataTexture is too big ("+xe.width+"x"+xe.height+")."),H;return H}function x(H){return H.generateMipmaps}function v(H){a.generateMipmap(H)}function T(H){return H.isWebGLCubeRenderTarget?a.TEXTURE_CUBE_MAP:H.isWebGL3DRenderTarget?a.TEXTURE_3D:H.isWebGLArrayRenderTarget||H.isCompressedArrayTexture?a.TEXTURE_2D_ARRAY:a.TEXTURE_2D}function C(H,w,J,ve,xe=!1){if(H!==null){if(a[H]!==void 0)return a[H];st("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+H+"'")}let pe=w;if(w===a.RED&&(J===a.FLOAT&&(pe=a.R32F),J===a.HALF_FLOAT&&(pe=a.R16F),J===a.UNSIGNED_BYTE&&(pe=a.R8)),w===a.RED_INTEGER&&(J===a.UNSIGNED_BYTE&&(pe=a.R8UI),J===a.UNSIGNED_SHORT&&(pe=a.R16UI),J===a.UNSIGNED_INT&&(pe=a.R32UI),J===a.BYTE&&(pe=a.R8I),J===a.SHORT&&(pe=a.R16I),J===a.INT&&(pe=a.R32I)),w===a.RG&&(J===a.FLOAT&&(pe=a.RG32F),J===a.HALF_FLOAT&&(pe=a.RG16F),J===a.UNSIGNED_BYTE&&(pe=a.RG8)),w===a.RG_INTEGER&&(J===a.UNSIGNED_BYTE&&(pe=a.RG8UI),J===a.UNSIGNED_SHORT&&(pe=a.RG16UI),J===a.UNSIGNED_INT&&(pe=a.RG32UI),J===a.BYTE&&(pe=a.RG8I),J===a.SHORT&&(pe=a.RG16I),J===a.INT&&(pe=a.RG32I)),w===a.RGB_INTEGER&&(J===a.UNSIGNED_BYTE&&(pe=a.RGB8UI),J===a.UNSIGNED_SHORT&&(pe=a.RGB16UI),J===a.UNSIGNED_INT&&(pe=a.RGB32UI),J===a.BYTE&&(pe=a.RGB8I),J===a.SHORT&&(pe=a.RGB16I),J===a.INT&&(pe=a.RGB32I)),w===a.RGBA_INTEGER&&(J===a.UNSIGNED_BYTE&&(pe=a.RGBA8UI),J===a.UNSIGNED_SHORT&&(pe=a.RGBA16UI),J===a.UNSIGNED_INT&&(pe=a.RGBA32UI),J===a.BYTE&&(pe=a.RGBA8I),J===a.SHORT&&(pe=a.RGBA16I),J===a.INT&&(pe=a.RGBA32I)),w===a.RGB&&(J===a.UNSIGNED_INT_5_9_9_9_REV&&(pe=a.RGB9_E5),J===a.UNSIGNED_INT_10F_11F_11F_REV&&(pe=a.R11F_G11F_B10F)),w===a.RGBA){const Oe=xe?Su:Rt.getTransfer(ve);J===a.FLOAT&&(pe=a.RGBA32F),J===a.HALF_FLOAT&&(pe=a.RGBA16F),J===a.UNSIGNED_BYTE&&(pe=Oe===Gt?a.SRGB8_ALPHA8:a.RGBA8),J===a.UNSIGNED_SHORT_4_4_4_4&&(pe=a.RGBA4),J===a.UNSIGNED_SHORT_5_5_5_1&&(pe=a.RGB5_A1)}return(pe===a.R16F||pe===a.R32F||pe===a.RG16F||pe===a.RG32F||pe===a.RGBA16F||pe===a.RGBA32F)&&e.get("EXT_color_buffer_float"),pe}function R(H,w){let J;return H?w===null||w===Zi||w===gl?J=a.DEPTH24_STENCIL8:w===ji?J=a.DEPTH32F_STENCIL8:w===ml&&(J=a.DEPTH24_STENCIL8,st("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Zi||w===gl?J=a.DEPTH_COMPONENT24:w===ji?J=a.DEPTH_COMPONENT32F:w===ml&&(J=a.DEPTH_COMPONENT16),J}function P(H,w){return x(H)===!0||H.isFramebufferTexture&&H.minFilter!==Ln&&H.minFilter!==Bn?Math.log2(Math.max(w.width,w.height))+1:H.mipmaps!==void 0&&H.mipmaps.length>0?H.mipmaps.length:H.isCompressedTexture&&Array.isArray(H.image)?w.mipmaps.length:1}function O(H){const w=H.target;w.removeEventListener("dispose",O),E(w),w.isVideoTexture&&g.delete(w)}function F(H){const w=H.target;w.removeEventListener("dispose",F),Y(w)}function E(H){const w=r.get(H);if(w.__webglInit===void 0)return;const J=H.source,ve=_.get(J);if(ve){const xe=ve[w.__cacheKey];xe.usedTimes--,xe.usedTimes===0&&D(H),Object.keys(ve).length===0&&_.delete(J)}r.remove(H)}function D(H){const w=r.get(H);a.deleteTexture(w.__webglTexture);const J=H.source,ve=_.get(J);delete ve[w.__cacheKey],f.memory.textures--}function Y(H){const w=r.get(H);if(H.depthTexture&&(H.depthTexture.dispose(),r.remove(H.depthTexture)),H.isWebGLCubeRenderTarget)for(let ve=0;ve<6;ve++){if(Array.isArray(w.__webglFramebuffer[ve]))for(let xe=0;xe<w.__webglFramebuffer[ve].length;xe++)a.deleteFramebuffer(w.__webglFramebuffer[ve][xe]);else a.deleteFramebuffer(w.__webglFramebuffer[ve]);w.__webglDepthbuffer&&a.deleteRenderbuffer(w.__webglDepthbuffer[ve])}else{if(Array.isArray(w.__webglFramebuffer))for(let ve=0;ve<w.__webglFramebuffer.length;ve++)a.deleteFramebuffer(w.__webglFramebuffer[ve]);else a.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&a.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&a.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ve=0;ve<w.__webglColorRenderbuffer.length;ve++)w.__webglColorRenderbuffer[ve]&&a.deleteRenderbuffer(w.__webglColorRenderbuffer[ve]);w.__webglDepthRenderbuffer&&a.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const J=H.textures;for(let ve=0,xe=J.length;ve<xe;ve++){const pe=r.get(J[ve]);pe.__webglTexture&&(a.deleteTexture(pe.__webglTexture),f.memory.textures--),r.remove(J[ve])}r.remove(H)}let k=0;function X(){k=0}function $(){const H=k;return H>=o.maxTextures&&st("WebGLTextures: Trying to use "+H+" texture units while this GPU supports only "+o.maxTextures),k+=1,H}function K(H){const w=[];return w.push(H.wrapS),w.push(H.wrapT),w.push(H.wrapR||0),w.push(H.magFilter),w.push(H.minFilter),w.push(H.anisotropy),w.push(H.internalFormat),w.push(H.format),w.push(H.type),w.push(H.generateMipmaps),w.push(H.premultiplyAlpha),w.push(H.flipY),w.push(H.unpackAlignment),w.push(H.colorSpace),w.join()}function V(H,w){const J=r.get(H);if(H.isVideoTexture&&At(H),H.isRenderTargetTexture===!1&&H.isExternalTexture!==!0&&H.version>0&&J.__version!==H.version){const ve=H.image;if(ve===null)st("WebGLRenderer: Texture marked for update but no image data found.");else if(ve.complete===!1)st("WebGLRenderer: Texture marked for update but image is incomplete");else{ee(J,H,w);return}}else H.isExternalTexture&&(J.__webglTexture=H.sourceTexture?H.sourceTexture:null);n.bindTexture(a.TEXTURE_2D,J.__webglTexture,a.TEXTURE0+w)}function I(H,w){const J=r.get(H);if(H.isRenderTargetTexture===!1&&H.version>0&&J.__version!==H.version){ee(J,H,w);return}else H.isExternalTexture&&(J.__webglTexture=H.sourceTexture?H.sourceTexture:null);n.bindTexture(a.TEXTURE_2D_ARRAY,J.__webglTexture,a.TEXTURE0+w)}function B(H,w){const J=r.get(H);if(H.isRenderTargetTexture===!1&&H.version>0&&J.__version!==H.version){ee(J,H,w);return}n.bindTexture(a.TEXTURE_3D,J.__webglTexture,a.TEXTURE0+w)}function se(H,w){const J=r.get(H);if(H.isCubeDepthTexture!==!0&&H.version>0&&J.__version!==H.version){Me(J,H,w);return}n.bindTexture(a.TEXTURE_CUBE_MAP,J.__webglTexture,a.TEXTURE0+w)}const he={[Bh]:a.REPEAT,[Ta]:a.CLAMP_TO_EDGE,[Hh]:a.MIRRORED_REPEAT},L={[Ln]:a.NEAREST,[RE]:a.NEAREST_MIPMAP_NEAREST,[Fc]:a.NEAREST_MIPMAP_LINEAR,[Bn]:a.LINEAR,[Wd]:a.LINEAR_MIPMAP_NEAREST,[Hr]:a.LINEAR_MIPMAP_LINEAR},Q={[NE]:a.NEVER,[IE]:a.ALWAYS,[UE]:a.LESS,[Bp]:a.LEQUAL,[LE]:a.EQUAL,[Hp]:a.GEQUAL,[OE]:a.GREATER,[PE]:a.NOTEQUAL};function le(H,w){if(w.type===ji&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Bn||w.magFilter===Wd||w.magFilter===Fc||w.magFilter===Hr||w.minFilter===Bn||w.minFilter===Wd||w.minFilter===Fc||w.minFilter===Hr)&&st("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),a.texParameteri(H,a.TEXTURE_WRAP_S,he[w.wrapS]),a.texParameteri(H,a.TEXTURE_WRAP_T,he[w.wrapT]),(H===a.TEXTURE_3D||H===a.TEXTURE_2D_ARRAY)&&a.texParameteri(H,a.TEXTURE_WRAP_R,he[w.wrapR]),a.texParameteri(H,a.TEXTURE_MAG_FILTER,L[w.magFilter]),a.texParameteri(H,a.TEXTURE_MIN_FILTER,L[w.minFilter]),w.compareFunction&&(a.texParameteri(H,a.TEXTURE_COMPARE_MODE,a.COMPARE_REF_TO_TEXTURE),a.texParameteri(H,a.TEXTURE_COMPARE_FUNC,Q[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Ln||w.minFilter!==Fc&&w.minFilter!==Hr||w.type===ji&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||r.get(w).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");a.texParameterf(H,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,o.getMaxAnisotropy())),r.get(w).__currentAnisotropy=w.anisotropy}}}function ge(H,w){let J=!1;H.__webglInit===void 0&&(H.__webglInit=!0,w.addEventListener("dispose",O));const ve=w.source;let xe=_.get(ve);xe===void 0&&(xe={},_.set(ve,xe));const pe=K(w);if(pe!==H.__cacheKey){xe[pe]===void 0&&(xe[pe]={texture:a.createTexture(),usedTimes:0},f.memory.textures++,J=!0),xe[pe].usedTimes++;const Oe=xe[H.__cacheKey];Oe!==void 0&&(xe[H.__cacheKey].usedTimes--,Oe.usedTimes===0&&D(w)),H.__cacheKey=pe,H.__webglTexture=xe[pe].texture}return J}function we(H,w,J){return Math.floor(Math.floor(H/J)/w)}function Le(H,w,J,ve){const pe=H.updateRanges;if(pe.length===0)n.texSubImage2D(a.TEXTURE_2D,0,0,0,w.width,w.height,J,ve,w.data);else{pe.sort((Ee,Ae)=>Ee.start-Ae.start);let Oe=0;for(let Ee=1;Ee<pe.length;Ee++){const Ae=pe[Oe],Be=pe[Ee],Ge=Ae.start+Ae.count,Ie=we(Be.start,w.width,4),ft=we(Ae.start,w.width,4);Be.start<=Ge+1&&Ie===ft&&we(Be.start+Be.count-1,w.width,4)===Ie?Ae.count=Math.max(Ae.count,Be.start+Be.count-Ae.start):(++Oe,pe[Oe]=Be)}pe.length=Oe+1;const De=a.getParameter(a.UNPACK_ROW_LENGTH),$e=a.getParameter(a.UNPACK_SKIP_PIXELS),nt=a.getParameter(a.UNPACK_SKIP_ROWS);a.pixelStorei(a.UNPACK_ROW_LENGTH,w.width);for(let Ee=0,Ae=pe.length;Ee<Ae;Ee++){const Be=pe[Ee],Ge=Math.floor(Be.start/4),Ie=Math.ceil(Be.count/4),ft=Ge%w.width,Z=Math.floor(Ge/w.width),Ce=Ie,Re=1;a.pixelStorei(a.UNPACK_SKIP_PIXELS,ft),a.pixelStorei(a.UNPACK_SKIP_ROWS,Z),n.texSubImage2D(a.TEXTURE_2D,0,ft,Z,Ce,Re,J,ve,w.data)}H.clearUpdateRanges(),a.pixelStorei(a.UNPACK_ROW_LENGTH,De),a.pixelStorei(a.UNPACK_SKIP_PIXELS,$e),a.pixelStorei(a.UNPACK_SKIP_ROWS,nt)}}function ee(H,w,J){let ve=a.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ve=a.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ve=a.TEXTURE_3D);const xe=ge(H,w),pe=w.source;n.bindTexture(ve,H.__webglTexture,a.TEXTURE0+J);const Oe=r.get(pe);if(pe.version!==Oe.__version||xe===!0){n.activeTexture(a.TEXTURE0+J);const De=Rt.getPrimaries(Rt.workingColorSpace),$e=w.colorSpace===cr?null:Rt.getPrimaries(w.colorSpace),nt=w.colorSpace===cr||De===$e?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,w.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,w.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let Ee=A(w.image,!1,o.maxTextureSize);Ee=Lt(w,Ee);const Ae=c.convert(w.format,w.colorSpace),Be=c.convert(w.type);let Ge=C(w.internalFormat,Ae,Be,w.colorSpace,w.isVideoTexture);le(ve,w);let Ie;const ft=w.mipmaps,Z=w.isVideoTexture!==!0,Ce=Oe.__version===void 0||xe===!0,Re=pe.dataReady,Fe=P(w,Ee);if(w.isDepthTexture)Ge=R(w.format===kr,w.type),Ce&&(Z?n.texStorage2D(a.TEXTURE_2D,1,Ge,Ee.width,Ee.height):n.texImage2D(a.TEXTURE_2D,0,Ge,Ee.width,Ee.height,0,Ae,Be,null));else if(w.isDataTexture)if(ft.length>0){Z&&Ce&&n.texStorage2D(a.TEXTURE_2D,Fe,Ge,ft[0].width,ft[0].height);for(let Te=0,me=ft.length;Te<me;Te++)Ie=ft[Te],Z?Re&&n.texSubImage2D(a.TEXTURE_2D,Te,0,0,Ie.width,Ie.height,Ae,Be,Ie.data):n.texImage2D(a.TEXTURE_2D,Te,Ge,Ie.width,Ie.height,0,Ae,Be,Ie.data);w.generateMipmaps=!1}else Z?(Ce&&n.texStorage2D(a.TEXTURE_2D,Fe,Ge,Ee.width,Ee.height),Re&&Le(w,Ee,Ae,Be)):n.texImage2D(a.TEXTURE_2D,0,Ge,Ee.width,Ee.height,0,Ae,Be,Ee.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Z&&Ce&&n.texStorage3D(a.TEXTURE_2D_ARRAY,Fe,Ge,ft[0].width,ft[0].height,Ee.depth);for(let Te=0,me=ft.length;Te<me;Te++)if(Ie=ft[Te],w.format!==Ni)if(Ae!==null)if(Z){if(Re)if(w.layerUpdates.size>0){const Ve=T_(Ie.width,Ie.height,w.format,w.type);for(const at of w.layerUpdates){const Ft=Ie.data.subarray(at*Ve/Ie.data.BYTES_PER_ELEMENT,(at+1)*Ve/Ie.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,Te,0,0,at,Ie.width,Ie.height,1,Ae,Ft)}w.clearLayerUpdates()}else n.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,Te,0,0,0,Ie.width,Ie.height,Ee.depth,Ae,Ie.data)}else n.compressedTexImage3D(a.TEXTURE_2D_ARRAY,Te,Ge,Ie.width,Ie.height,Ee.depth,0,Ie.data,0,0);else st("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Z?Re&&n.texSubImage3D(a.TEXTURE_2D_ARRAY,Te,0,0,0,Ie.width,Ie.height,Ee.depth,Ae,Be,Ie.data):n.texImage3D(a.TEXTURE_2D_ARRAY,Te,Ge,Ie.width,Ie.height,Ee.depth,0,Ae,Be,Ie.data)}else{Z&&Ce&&n.texStorage2D(a.TEXTURE_2D,Fe,Ge,ft[0].width,ft[0].height);for(let Te=0,me=ft.length;Te<me;Te++)Ie=ft[Te],w.format!==Ni?Ae!==null?Z?Re&&n.compressedTexSubImage2D(a.TEXTURE_2D,Te,0,0,Ie.width,Ie.height,Ae,Ie.data):n.compressedTexImage2D(a.TEXTURE_2D,Te,Ge,Ie.width,Ie.height,0,Ie.data):st("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Z?Re&&n.texSubImage2D(a.TEXTURE_2D,Te,0,0,Ie.width,Ie.height,Ae,Be,Ie.data):n.texImage2D(a.TEXTURE_2D,Te,Ge,Ie.width,Ie.height,0,Ae,Be,Ie.data)}else if(w.isDataArrayTexture)if(Z){if(Ce&&n.texStorage3D(a.TEXTURE_2D_ARRAY,Fe,Ge,Ee.width,Ee.height,Ee.depth),Re)if(w.layerUpdates.size>0){const Te=T_(Ee.width,Ee.height,w.format,w.type);for(const me of w.layerUpdates){const Ve=Ee.data.subarray(me*Te/Ee.data.BYTES_PER_ELEMENT,(me+1)*Te/Ee.data.BYTES_PER_ELEMENT);n.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,me,Ee.width,Ee.height,1,Ae,Be,Ve)}w.clearLayerUpdates()}else n.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,0,Ee.width,Ee.height,Ee.depth,Ae,Be,Ee.data)}else n.texImage3D(a.TEXTURE_2D_ARRAY,0,Ge,Ee.width,Ee.height,Ee.depth,0,Ae,Be,Ee.data);else if(w.isData3DTexture)Z?(Ce&&n.texStorage3D(a.TEXTURE_3D,Fe,Ge,Ee.width,Ee.height,Ee.depth),Re&&n.texSubImage3D(a.TEXTURE_3D,0,0,0,0,Ee.width,Ee.height,Ee.depth,Ae,Be,Ee.data)):n.texImage3D(a.TEXTURE_3D,0,Ge,Ee.width,Ee.height,Ee.depth,0,Ae,Be,Ee.data);else if(w.isFramebufferTexture){if(Ce)if(Z)n.texStorage2D(a.TEXTURE_2D,Fe,Ge,Ee.width,Ee.height);else{let Te=Ee.width,me=Ee.height;for(let Ve=0;Ve<Fe;Ve++)n.texImage2D(a.TEXTURE_2D,Ve,Ge,Te,me,0,Ae,Be,null),Te>>=1,me>>=1}}else if(ft.length>0){if(Z&&Ce){const Te=Ye(ft[0]);n.texStorage2D(a.TEXTURE_2D,Fe,Ge,Te.width,Te.height)}for(let Te=0,me=ft.length;Te<me;Te++)Ie=ft[Te],Z?Re&&n.texSubImage2D(a.TEXTURE_2D,Te,0,0,Ae,Be,Ie):n.texImage2D(a.TEXTURE_2D,Te,Ge,Ae,Be,Ie);w.generateMipmaps=!1}else if(Z){if(Ce){const Te=Ye(Ee);n.texStorage2D(a.TEXTURE_2D,Fe,Ge,Te.width,Te.height)}Re&&n.texSubImage2D(a.TEXTURE_2D,0,0,0,Ae,Be,Ee)}else n.texImage2D(a.TEXTURE_2D,0,Ge,Ae,Be,Ee);x(w)&&v(ve),Oe.__version=pe.version,w.onUpdate&&w.onUpdate(w)}H.__version=w.version}function Me(H,w,J){if(w.image.length!==6)return;const ve=ge(H,w),xe=w.source;n.bindTexture(a.TEXTURE_CUBE_MAP,H.__webglTexture,a.TEXTURE0+J);const pe=r.get(xe);if(xe.version!==pe.__version||ve===!0){n.activeTexture(a.TEXTURE0+J);const Oe=Rt.getPrimaries(Rt.workingColorSpace),De=w.colorSpace===cr?null:Rt.getPrimaries(w.colorSpace),$e=w.colorSpace===cr||Oe===De?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,w.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,w.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);const nt=w.isCompressedTexture||w.image[0].isCompressedTexture,Ee=w.image[0]&&w.image[0].isDataTexture,Ae=[];for(let me=0;me<6;me++)!nt&&!Ee?Ae[me]=A(w.image[me],!0,o.maxCubemapSize):Ae[me]=Ee?w.image[me].image:w.image[me],Ae[me]=Lt(w,Ae[me]);const Be=Ae[0],Ge=c.convert(w.format,w.colorSpace),Ie=c.convert(w.type),ft=C(w.internalFormat,Ge,Ie,w.colorSpace),Z=w.isVideoTexture!==!0,Ce=pe.__version===void 0||ve===!0,Re=xe.dataReady;let Fe=P(w,Be);le(a.TEXTURE_CUBE_MAP,w);let Te;if(nt){Z&&Ce&&n.texStorage2D(a.TEXTURE_CUBE_MAP,Fe,ft,Be.width,Be.height);for(let me=0;me<6;me++){Te=Ae[me].mipmaps;for(let Ve=0;Ve<Te.length;Ve++){const at=Te[Ve];w.format!==Ni?Ge!==null?Z?Re&&n.compressedTexSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ve,0,0,at.width,at.height,Ge,at.data):n.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ve,ft,at.width,at.height,0,at.data):st("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Z?Re&&n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ve,0,0,at.width,at.height,Ge,Ie,at.data):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ve,ft,at.width,at.height,0,Ge,Ie,at.data)}}}else{if(Te=w.mipmaps,Z&&Ce){Te.length>0&&Fe++;const me=Ye(Ae[0]);n.texStorage2D(a.TEXTURE_CUBE_MAP,Fe,ft,me.width,me.height)}for(let me=0;me<6;me++)if(Ee){Z?Re&&n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,Ae[me].width,Ae[me].height,Ge,Ie,Ae[me].data):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,ft,Ae[me].width,Ae[me].height,0,Ge,Ie,Ae[me].data);for(let Ve=0;Ve<Te.length;Ve++){const Ft=Te[Ve].image[me].image;Z?Re&&n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ve+1,0,0,Ft.width,Ft.height,Ge,Ie,Ft.data):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ve+1,ft,Ft.width,Ft.height,0,Ge,Ie,Ft.data)}}else{Z?Re&&n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,Ge,Ie,Ae[me]):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,ft,Ge,Ie,Ae[me]);for(let Ve=0;Ve<Te.length;Ve++){const at=Te[Ve];Z?Re&&n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ve+1,0,0,Ge,Ie,at.image[me]):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ve+1,ft,Ge,Ie,at.image[me])}}}x(w)&&v(a.TEXTURE_CUBE_MAP),pe.__version=xe.version,w.onUpdate&&w.onUpdate(w)}H.__version=w.version}function Se(H,w,J,ve,xe,pe){const Oe=c.convert(J.format,J.colorSpace),De=c.convert(J.type),$e=C(J.internalFormat,Oe,De,J.colorSpace),nt=r.get(w),Ee=r.get(J);if(Ee.__renderTarget=w,!nt.__hasExternalTextures){const Ae=Math.max(1,w.width>>pe),Be=Math.max(1,w.height>>pe);xe===a.TEXTURE_3D||xe===a.TEXTURE_2D_ARRAY?n.texImage3D(xe,pe,$e,Ae,Be,w.depth,0,Oe,De,null):n.texImage2D(xe,pe,$e,Ae,Be,0,Oe,De,null)}n.bindFramebuffer(a.FRAMEBUFFER,H),tn(w)?h.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,ve,xe,Ee.__webglTexture,0,j(w)):(xe===a.TEXTURE_2D||xe>=a.TEXTURE_CUBE_MAP_POSITIVE_X&&xe<=a.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&a.framebufferTexture2D(a.FRAMEBUFFER,ve,xe,Ee.__webglTexture,pe),n.bindFramebuffer(a.FRAMEBUFFER,null)}function ze(H,w,J){if(a.bindRenderbuffer(a.RENDERBUFFER,H),w.depthBuffer){const ve=w.depthTexture,xe=ve&&ve.isDepthTexture?ve.type:null,pe=R(w.stencilBuffer,xe),Oe=w.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;tn(w)?h.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,j(w),pe,w.width,w.height):J?a.renderbufferStorageMultisample(a.RENDERBUFFER,j(w),pe,w.width,w.height):a.renderbufferStorage(a.RENDERBUFFER,pe,w.width,w.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,Oe,a.RENDERBUFFER,H)}else{const ve=w.textures;for(let xe=0;xe<ve.length;xe++){const pe=ve[xe],Oe=c.convert(pe.format,pe.colorSpace),De=c.convert(pe.type),$e=C(pe.internalFormat,Oe,De,pe.colorSpace);tn(w)?h.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,j(w),$e,w.width,w.height):J?a.renderbufferStorageMultisample(a.RENDERBUFFER,j(w),$e,w.width,w.height):a.renderbufferStorage(a.RENDERBUFFER,$e,w.width,w.height)}}a.bindRenderbuffer(a.RENDERBUFFER,null)}function Je(H,w,J){const ve=w.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(a.FRAMEBUFFER,H),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const xe=r.get(w.depthTexture);if(xe.__renderTarget=w,(!xe.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),ve){if(xe.__webglInit===void 0&&(xe.__webglInit=!0,w.depthTexture.addEventListener("dispose",O)),xe.__webglTexture===void 0){xe.__webglTexture=a.createTexture(),n.bindTexture(a.TEXTURE_CUBE_MAP,xe.__webglTexture),le(a.TEXTURE_CUBE_MAP,w.depthTexture);const nt=c.convert(w.depthTexture.format),Ee=c.convert(w.depthTexture.type);let Ae;w.depthTexture.format===Ca?Ae=a.DEPTH_COMPONENT24:w.depthTexture.format===kr&&(Ae=a.DEPTH24_STENCIL8);for(let Be=0;Be<6;Be++)a.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Be,0,Ae,w.width,w.height,0,nt,Ee,null)}}else V(w.depthTexture,0);const pe=xe.__webglTexture,Oe=j(w),De=ve?a.TEXTURE_CUBE_MAP_POSITIVE_X+J:a.TEXTURE_2D,$e=w.depthTexture.format===kr?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;if(w.depthTexture.format===Ca)tn(w)?h.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,$e,De,pe,0,Oe):a.framebufferTexture2D(a.FRAMEBUFFER,$e,De,pe,0);else if(w.depthTexture.format===kr)tn(w)?h.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,$e,De,pe,0,Oe):a.framebufferTexture2D(a.FRAMEBUFFER,$e,De,pe,0);else throw new Error("Unknown depthTexture format")}function et(H){const w=r.get(H),J=H.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==H.depthTexture){const ve=H.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ve){const xe=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ve.removeEventListener("dispose",xe)};ve.addEventListener("dispose",xe),w.__depthDisposeCallback=xe}w.__boundDepthTexture=ve}if(H.depthTexture&&!w.__autoAllocateDepthBuffer)if(J)for(let ve=0;ve<6;ve++)Je(w.__webglFramebuffer[ve],H,ve);else{const ve=H.texture.mipmaps;ve&&ve.length>0?Je(w.__webglFramebuffer[0],H,0):Je(w.__webglFramebuffer,H,0)}else if(J){w.__webglDepthbuffer=[];for(let ve=0;ve<6;ve++)if(n.bindFramebuffer(a.FRAMEBUFFER,w.__webglFramebuffer[ve]),w.__webglDepthbuffer[ve]===void 0)w.__webglDepthbuffer[ve]=a.createRenderbuffer(),ze(w.__webglDepthbuffer[ve],H,!1);else{const xe=H.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,pe=w.__webglDepthbuffer[ve];a.bindRenderbuffer(a.RENDERBUFFER,pe),a.framebufferRenderbuffer(a.FRAMEBUFFER,xe,a.RENDERBUFFER,pe)}}else{const ve=H.texture.mipmaps;if(ve&&ve.length>0?n.bindFramebuffer(a.FRAMEBUFFER,w.__webglFramebuffer[0]):n.bindFramebuffer(a.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=a.createRenderbuffer(),ze(w.__webglDepthbuffer,H,!1);else{const xe=H.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,pe=w.__webglDepthbuffer;a.bindRenderbuffer(a.RENDERBUFFER,pe),a.framebufferRenderbuffer(a.FRAMEBUFFER,xe,a.RENDERBUFFER,pe)}}n.bindFramebuffer(a.FRAMEBUFFER,null)}function Wt(H,w,J){const ve=r.get(H);w!==void 0&&Se(ve.__webglFramebuffer,H,H.texture,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,0),J!==void 0&&et(H)}function ct(H){const w=H.texture,J=r.get(H),ve=r.get(w);H.addEventListener("dispose",F);const xe=H.textures,pe=H.isWebGLCubeRenderTarget===!0,Oe=xe.length>1;if(Oe||(ve.__webglTexture===void 0&&(ve.__webglTexture=a.createTexture()),ve.__version=w.version,f.memory.textures++),pe){J.__webglFramebuffer=[];for(let De=0;De<6;De++)if(w.mipmaps&&w.mipmaps.length>0){J.__webglFramebuffer[De]=[];for(let $e=0;$e<w.mipmaps.length;$e++)J.__webglFramebuffer[De][$e]=a.createFramebuffer()}else J.__webglFramebuffer[De]=a.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){J.__webglFramebuffer=[];for(let De=0;De<w.mipmaps.length;De++)J.__webglFramebuffer[De]=a.createFramebuffer()}else J.__webglFramebuffer=a.createFramebuffer();if(Oe)for(let De=0,$e=xe.length;De<$e;De++){const nt=r.get(xe[De]);nt.__webglTexture===void 0&&(nt.__webglTexture=a.createTexture(),f.memory.textures++)}if(H.samples>0&&tn(H)===!1){J.__webglMultisampledFramebuffer=a.createFramebuffer(),J.__webglColorRenderbuffer=[],n.bindFramebuffer(a.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let De=0;De<xe.length;De++){const $e=xe[De];J.__webglColorRenderbuffer[De]=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,J.__webglColorRenderbuffer[De]);const nt=c.convert($e.format,$e.colorSpace),Ee=c.convert($e.type),Ae=C($e.internalFormat,nt,Ee,$e.colorSpace,H.isXRRenderTarget===!0),Be=j(H);a.renderbufferStorageMultisample(a.RENDERBUFFER,Be,Ae,H.width,H.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+De,a.RENDERBUFFER,J.__webglColorRenderbuffer[De])}a.bindRenderbuffer(a.RENDERBUFFER,null),H.depthBuffer&&(J.__webglDepthRenderbuffer=a.createRenderbuffer(),ze(J.__webglDepthRenderbuffer,H,!0)),n.bindFramebuffer(a.FRAMEBUFFER,null)}}if(pe){n.bindTexture(a.TEXTURE_CUBE_MAP,ve.__webglTexture),le(a.TEXTURE_CUBE_MAP,w);for(let De=0;De<6;De++)if(w.mipmaps&&w.mipmaps.length>0)for(let $e=0;$e<w.mipmaps.length;$e++)Se(J.__webglFramebuffer[De][$e],H,w,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+De,$e);else Se(J.__webglFramebuffer[De],H,w,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+De,0);x(w)&&v(a.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Oe){for(let De=0,$e=xe.length;De<$e;De++){const nt=xe[De],Ee=r.get(nt);let Ae=a.TEXTURE_2D;(H.isWebGL3DRenderTarget||H.isWebGLArrayRenderTarget)&&(Ae=H.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),n.bindTexture(Ae,Ee.__webglTexture),le(Ae,nt),Se(J.__webglFramebuffer,H,nt,a.COLOR_ATTACHMENT0+De,Ae,0),x(nt)&&v(Ae)}n.unbindTexture()}else{let De=a.TEXTURE_2D;if((H.isWebGL3DRenderTarget||H.isWebGLArrayRenderTarget)&&(De=H.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),n.bindTexture(De,ve.__webglTexture),le(De,w),w.mipmaps&&w.mipmaps.length>0)for(let $e=0;$e<w.mipmaps.length;$e++)Se(J.__webglFramebuffer[$e],H,w,a.COLOR_ATTACHMENT0,De,$e);else Se(J.__webglFramebuffer,H,w,a.COLOR_ATTACHMENT0,De,0);x(w)&&v(De),n.unbindTexture()}H.depthBuffer&&et(H)}function _t(H){const w=H.textures;for(let J=0,ve=w.length;J<ve;J++){const xe=w[J];if(x(xe)){const pe=T(H),Oe=r.get(xe).__webglTexture;n.bindTexture(pe,Oe),v(pe),n.unbindTexture()}}}const Bt=[],ut=[];function Ct(H){if(H.samples>0){if(tn(H)===!1){const w=H.textures,J=H.width,ve=H.height;let xe=a.COLOR_BUFFER_BIT;const pe=H.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,Oe=r.get(H),De=w.length>1;if(De)for(let nt=0;nt<w.length;nt++)n.bindFramebuffer(a.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+nt,a.RENDERBUFFER,null),n.bindFramebuffer(a.FRAMEBUFFER,Oe.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+nt,a.TEXTURE_2D,null,0);n.bindFramebuffer(a.READ_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer);const $e=H.texture.mipmaps;$e&&$e.length>0?n.bindFramebuffer(a.DRAW_FRAMEBUFFER,Oe.__webglFramebuffer[0]):n.bindFramebuffer(a.DRAW_FRAMEBUFFER,Oe.__webglFramebuffer);for(let nt=0;nt<w.length;nt++){if(H.resolveDepthBuffer&&(H.depthBuffer&&(xe|=a.DEPTH_BUFFER_BIT),H.stencilBuffer&&H.resolveStencilBuffer&&(xe|=a.STENCIL_BUFFER_BIT)),De){a.framebufferRenderbuffer(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,Oe.__webglColorRenderbuffer[nt]);const Ee=r.get(w[nt]).__webglTexture;a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,Ee,0)}a.blitFramebuffer(0,0,J,ve,0,0,J,ve,xe,a.NEAREST),m===!0&&(Bt.length=0,ut.length=0,Bt.push(a.COLOR_ATTACHMENT0+nt),H.depthBuffer&&H.resolveDepthBuffer===!1&&(Bt.push(pe),ut.push(pe),a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,ut)),a.invalidateFramebuffer(a.READ_FRAMEBUFFER,Bt))}if(n.bindFramebuffer(a.READ_FRAMEBUFFER,null),n.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),De)for(let nt=0;nt<w.length;nt++){n.bindFramebuffer(a.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+nt,a.RENDERBUFFER,Oe.__webglColorRenderbuffer[nt]);const Ee=r.get(w[nt]).__webglTexture;n.bindFramebuffer(a.FRAMEBUFFER,Oe.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+nt,a.TEXTURE_2D,Ee,0)}n.bindFramebuffer(a.DRAW_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer)}else if(H.depthBuffer&&H.resolveDepthBuffer===!1&&m){const w=H.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,[w])}}}function j(H){return Math.min(o.maxSamples,H.samples)}function tn(H){const w=r.get(H);return H.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function At(H){const w=f.render.frame;g.get(H)!==w&&(g.set(H,w),H.update())}function Lt(H,w){const J=H.colorSpace,ve=H.format,xe=H.type;return H.isCompressedTexture===!0||H.isVideoTexture===!0||J!==Zs&&J!==cr&&(Rt.getTransfer(J)===Gt?(ve!==Ni||xe!==ci)&&st("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):wt("WebGLTextures: Unsupported texture color space:",J)),w}function Ye(H){return typeof HTMLImageElement<"u"&&H instanceof HTMLImageElement?(d.width=H.naturalWidth||H.width,d.height=H.naturalHeight||H.height):typeof VideoFrame<"u"&&H instanceof VideoFrame?(d.width=H.displayWidth,d.height=H.displayHeight):(d.width=H.width,d.height=H.height),d}this.allocateTextureUnit=$,this.resetTextureUnits=X,this.setTexture2D=V,this.setTexture2DArray=I,this.setTexture3D=B,this.setTextureCube=se,this.rebindTextures=Wt,this.setupRenderTarget=ct,this.updateRenderTargetMipmap=_t,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=tn,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function RC(a,e){function n(r,o=cr){let c;const f=Rt.getTransfer(o);if(r===ci)return a.UNSIGNED_BYTE;if(r===Op)return a.UNSIGNED_SHORT_4_4_4_4;if(r===Pp)return a.UNSIGNED_SHORT_5_5_5_1;if(r===Ix)return a.UNSIGNED_INT_5_9_9_9_REV;if(r===Fx)return a.UNSIGNED_INT_10F_11F_11F_REV;if(r===Ox)return a.BYTE;if(r===Px)return a.SHORT;if(r===ml)return a.UNSIGNED_SHORT;if(r===Lp)return a.INT;if(r===Zi)return a.UNSIGNED_INT;if(r===ji)return a.FLOAT;if(r===Ra)return a.HALF_FLOAT;if(r===zx)return a.ALPHA;if(r===Bx)return a.RGB;if(r===Ni)return a.RGBA;if(r===Ca)return a.DEPTH_COMPONENT;if(r===kr)return a.DEPTH_STENCIL;if(r===Hx)return a.RED;if(r===Ip)return a.RED_INTEGER;if(r===Ys)return a.RG;if(r===Fp)return a.RG_INTEGER;if(r===zp)return a.RGBA_INTEGER;if(r===mu||r===gu||r===vu||r===_u)if(f===Gt)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(r===mu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===gu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===vu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===_u)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(r===mu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===gu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===vu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===_u)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===kh||r===Gh||r===Vh||r===jh)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(r===kh)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Gh)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Vh)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===jh)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Xh||r===Wh||r===qh||r===Yh||r===Zh||r===Kh||r===Qh)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(r===Xh||r===Wh)return f===Gt?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(r===qh)return f===Gt?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(r===Yh)return c.COMPRESSED_R11_EAC;if(r===Zh)return c.COMPRESSED_SIGNED_R11_EAC;if(r===Kh)return c.COMPRESSED_RG11_EAC;if(r===Qh)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(r===Jh||r===$h||r===ep||r===tp||r===np||r===ip||r===ap||r===rp||r===sp||r===op||r===lp||r===cp||r===up||r===fp)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(r===Jh)return f===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===$h)return f===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===ep)return f===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===tp)return f===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===np)return f===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ip)return f===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===ap)return f===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===rp)return f===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===sp)return f===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===op)return f===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===lp)return f===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===cp)return f===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===up)return f===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===fp)return f===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===dp||r===hp||r===pp)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(r===dp)return f===Gt?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===hp)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===pp)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===mp||r===gp||r===vp||r===_p)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(r===mp)return c.COMPRESSED_RED_RGTC1_EXT;if(r===gp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===vp)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===_p)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===gl?a.UNSIGNED_INT_24_8:a[r]!==void 0?a[r]:null}return{convert:n}}const CC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,DC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class NC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const r=new Kx(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,r=new Qi({vertexShader:CC,fragmentShader:DC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ui(new no(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class UC extends Qs{constructor(e,n){super();const r=this;let o=null,c=1,f=null,h="local-floor",m=1,d=null,g=null,b=null,_=null,y=null,S=null;const A=typeof XRWebGLBinding<"u",x=new NC,v={},T=n.getContextAttributes();let C=null,R=null;const P=[],O=[],F=new Ut;let E=null;const D=new yi;D.viewport=new on;const Y=new yi;Y.viewport=new on;const k=[D,Y],X=new GT;let $=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let Me=P[ee];return Me===void 0&&(Me=new Jd,P[ee]=Me),Me.getTargetRaySpace()},this.getControllerGrip=function(ee){let Me=P[ee];return Me===void 0&&(Me=new Jd,P[ee]=Me),Me.getGripSpace()},this.getHand=function(ee){let Me=P[ee];return Me===void 0&&(Me=new Jd,P[ee]=Me),Me.getHandSpace()};function V(ee){const Me=O.indexOf(ee.inputSource);if(Me===-1)return;const Se=P[Me];Se!==void 0&&(Se.update(ee.inputSource,ee.frame,d||f),Se.dispatchEvent({type:ee.type,data:ee.inputSource}))}function I(){o.removeEventListener("select",V),o.removeEventListener("selectstart",V),o.removeEventListener("selectend",V),o.removeEventListener("squeeze",V),o.removeEventListener("squeezestart",V),o.removeEventListener("squeezeend",V),o.removeEventListener("end",I),o.removeEventListener("inputsourceschange",B);for(let ee=0;ee<P.length;ee++){const Me=O[ee];Me!==null&&(O[ee]=null,P[ee].disconnect(Me))}$=null,K=null,x.reset();for(const ee in v)delete v[ee];e.setRenderTarget(C),y=null,_=null,b=null,o=null,R=null,Le.stop(),r.isPresenting=!1,e.setPixelRatio(E),e.setSize(F.width,F.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){c=ee,r.isPresenting===!0&&st("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){h=ee,r.isPresenting===!0&&st("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||f},this.setReferenceSpace=function(ee){d=ee},this.getBaseLayer=function(){return _!==null?_:y},this.getBinding=function(){return b===null&&A&&(b=new XRWebGLBinding(o,n)),b},this.getFrame=function(){return S},this.getSession=function(){return o},this.setSession=async function(ee){if(o=ee,o!==null){if(C=e.getRenderTarget(),o.addEventListener("select",V),o.addEventListener("selectstart",V),o.addEventListener("selectend",V),o.addEventListener("squeeze",V),o.addEventListener("squeezestart",V),o.addEventListener("squeezeend",V),o.addEventListener("end",I),o.addEventListener("inputsourceschange",B),T.xrCompatible!==!0&&await n.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(F),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let Se=null,ze=null,Je=null;T.depth&&(Je=T.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Se=T.stencil?kr:Ca,ze=T.stencil?gl:Zi);const et={colorFormat:n.RGBA8,depthFormat:Je,scaleFactor:c};b=this.getBinding(),_=b.createProjectionLayer(et),o.updateRenderState({layers:[_]}),e.setPixelRatio(1),e.setSize(_.textureWidth,_.textureHeight,!1),R=new qi(_.textureWidth,_.textureHeight,{format:Ni,type:ci,depthTexture:new xl(_.textureWidth,_.textureHeight,ze,void 0,void 0,void 0,void 0,void 0,void 0,Se),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1})}else{const Se={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:c};y=new XRWebGLLayer(o,n,Se),o.updateRenderState({baseLayer:y}),e.setPixelRatio(1),e.setSize(y.framebufferWidth,y.framebufferHeight,!1),R=new qi(y.framebufferWidth,y.framebufferHeight,{format:Ni,type:ci,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:y.ignoreDepthValues===!1,resolveStencilBuffer:y.ignoreDepthValues===!1})}R.isXRRenderTarget=!0,this.setFoveation(m),d=null,f=await o.requestReferenceSpace(h),Le.setContext(o),Le.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function B(ee){for(let Me=0;Me<ee.removed.length;Me++){const Se=ee.removed[Me],ze=O.indexOf(Se);ze>=0&&(O[ze]=null,P[ze].disconnect(Se))}for(let Me=0;Me<ee.added.length;Me++){const Se=ee.added[Me];let ze=O.indexOf(Se);if(ze===-1){for(let et=0;et<P.length;et++)if(et>=O.length){O.push(Se),ze=et;break}else if(O[et]===null){O[et]=Se,ze=et;break}if(ze===-1)break}const Je=P[ze];Je&&Je.connect(Se)}}const se=new re,he=new re;function L(ee,Me,Se){se.setFromMatrixPosition(Me.matrixWorld),he.setFromMatrixPosition(Se.matrixWorld);const ze=se.distanceTo(he),Je=Me.projectionMatrix.elements,et=Se.projectionMatrix.elements,Wt=Je[14]/(Je[10]-1),ct=Je[14]/(Je[10]+1),_t=(Je[9]+1)/Je[5],Bt=(Je[9]-1)/Je[5],ut=(Je[8]-1)/Je[0],Ct=(et[8]+1)/et[0],j=Wt*ut,tn=Wt*Ct,At=ze/(-ut+Ct),Lt=At*-ut;if(Me.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(Lt),ee.translateZ(At),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),Je[10]===-1)ee.projectionMatrix.copy(Me.projectionMatrix),ee.projectionMatrixInverse.copy(Me.projectionMatrixInverse);else{const Ye=Wt+At,H=ct+At,w=j-Lt,J=tn+(ze-Lt),ve=_t*ct/H*Ye,xe=Bt*ct/H*Ye;ee.projectionMatrix.makePerspective(w,J,ve,xe,Ye,H),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function Q(ee,Me){Me===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(Me.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(o===null)return;let Me=ee.near,Se=ee.far;x.texture!==null&&(x.depthNear>0&&(Me=x.depthNear),x.depthFar>0&&(Se=x.depthFar)),X.near=Y.near=D.near=Me,X.far=Y.far=D.far=Se,($!==X.near||K!==X.far)&&(o.updateRenderState({depthNear:X.near,depthFar:X.far}),$=X.near,K=X.far),X.layers.mask=ee.layers.mask|6,D.layers.mask=X.layers.mask&-5,Y.layers.mask=X.layers.mask&-3;const ze=ee.parent,Je=X.cameras;Q(X,ze);for(let et=0;et<Je.length;et++)Q(Je[et],ze);Je.length===2?L(X,D,Y):X.projectionMatrix.copy(D.projectionMatrix),le(ee,X,ze)};function le(ee,Me,Se){Se===null?ee.matrix.copy(Me.matrixWorld):(ee.matrix.copy(Se.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(Me.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(Me.projectionMatrix),ee.projectionMatrixInverse.copy(Me.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=_l*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(_===null&&y===null))return m},this.setFoveation=function(ee){m=ee,_!==null&&(_.fixedFoveation=ee),y!==null&&y.fixedFoveation!==void 0&&(y.fixedFoveation=ee)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(X)},this.getCameraTexture=function(ee){return v[ee]};let ge=null;function we(ee,Me){if(g=Me.getViewerPose(d||f),S=Me,g!==null){const Se=g.views;y!==null&&(e.setRenderTargetFramebuffer(R,y.framebuffer),e.setRenderTarget(R));let ze=!1;Se.length!==X.cameras.length&&(X.cameras.length=0,ze=!0);for(let ct=0;ct<Se.length;ct++){const _t=Se[ct];let Bt=null;if(y!==null)Bt=y.getViewport(_t);else{const Ct=b.getViewSubImage(_,_t);Bt=Ct.viewport,ct===0&&(e.setRenderTargetTextures(R,Ct.colorTexture,Ct.depthStencilTexture),e.setRenderTarget(R))}let ut=k[ct];ut===void 0&&(ut=new yi,ut.layers.enable(ct),ut.viewport=new on,k[ct]=ut),ut.matrix.fromArray(_t.transform.matrix),ut.matrix.decompose(ut.position,ut.quaternion,ut.scale),ut.projectionMatrix.fromArray(_t.projectionMatrix),ut.projectionMatrixInverse.copy(ut.projectionMatrix).invert(),ut.viewport.set(Bt.x,Bt.y,Bt.width,Bt.height),ct===0&&(X.matrix.copy(ut.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),ze===!0&&X.cameras.push(ut)}const Je=o.enabledFeatures;if(Je&&Je.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&A){b=r.getBinding();const ct=b.getDepthInformation(Se[0]);ct&&ct.isValid&&ct.texture&&x.init(ct,o.renderState)}if(Je&&Je.includes("camera-access")&&A){e.state.unbindTexture(),b=r.getBinding();for(let ct=0;ct<Se.length;ct++){const _t=Se[ct].camera;if(_t){let Bt=v[_t];Bt||(Bt=new Kx,v[_t]=Bt);const ut=b.getCameraImage(_t);Bt.sourceTexture=ut}}}}for(let Se=0;Se<P.length;Se++){const ze=O[Se],Je=P[Se];ze!==null&&Je!==void 0&&Je.update(ze,Me,d||f)}ge&&ge(ee,Me),Me.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:Me}),S=null}const Le=new ey;Le.setAnimationLoop(we),this.setAnimationLoop=function(ee){ge=ee},this.dispose=function(){}}}const Pr=new Ki,LC=new en;function OC(a,e){function n(x,v){x.matrixAutoUpdate===!0&&x.updateMatrix(),v.value.copy(x.matrix)}function r(x,v){v.color.getRGB(x.fogColor.value,Qx(a)),v.isFog?(x.fogNear.value=v.near,x.fogFar.value=v.far):v.isFogExp2&&(x.fogDensity.value=v.density)}function o(x,v,T,C,R){v.isMeshBasicMaterial?c(x,v):v.isMeshLambertMaterial?(c(x,v),v.envMap&&(x.envMapIntensity.value=v.envMapIntensity)):v.isMeshToonMaterial?(c(x,v),b(x,v)):v.isMeshPhongMaterial?(c(x,v),g(x,v),v.envMap&&(x.envMapIntensity.value=v.envMapIntensity)):v.isMeshStandardMaterial?(c(x,v),_(x,v),v.isMeshPhysicalMaterial&&y(x,v,R)):v.isMeshMatcapMaterial?(c(x,v),S(x,v)):v.isMeshDepthMaterial?c(x,v):v.isMeshDistanceMaterial?(c(x,v),A(x,v)):v.isMeshNormalMaterial?c(x,v):v.isLineBasicMaterial?(f(x,v),v.isLineDashedMaterial&&h(x,v)):v.isPointsMaterial?m(x,v,T,C):v.isSpriteMaterial?d(x,v):v.isShadowMaterial?(x.color.value.copy(v.color),x.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function c(x,v){x.opacity.value=v.opacity,v.color&&x.diffuse.value.copy(v.color),v.emissive&&x.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(x.map.value=v.map,n(v.map,x.mapTransform)),v.alphaMap&&(x.alphaMap.value=v.alphaMap,n(v.alphaMap,x.alphaMapTransform)),v.bumpMap&&(x.bumpMap.value=v.bumpMap,n(v.bumpMap,x.bumpMapTransform),x.bumpScale.value=v.bumpScale,v.side===Jn&&(x.bumpScale.value*=-1)),v.normalMap&&(x.normalMap.value=v.normalMap,n(v.normalMap,x.normalMapTransform),x.normalScale.value.copy(v.normalScale),v.side===Jn&&x.normalScale.value.negate()),v.displacementMap&&(x.displacementMap.value=v.displacementMap,n(v.displacementMap,x.displacementMapTransform),x.displacementScale.value=v.displacementScale,x.displacementBias.value=v.displacementBias),v.emissiveMap&&(x.emissiveMap.value=v.emissiveMap,n(v.emissiveMap,x.emissiveMapTransform)),v.specularMap&&(x.specularMap.value=v.specularMap,n(v.specularMap,x.specularMapTransform)),v.alphaTest>0&&(x.alphaTest.value=v.alphaTest);const T=e.get(v),C=T.envMap,R=T.envMapRotation;C&&(x.envMap.value=C,Pr.copy(R),Pr.x*=-1,Pr.y*=-1,Pr.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Pr.y*=-1,Pr.z*=-1),x.envMapRotation.value.setFromMatrix4(LC.makeRotationFromEuler(Pr)),x.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=v.reflectivity,x.ior.value=v.ior,x.refractionRatio.value=v.refractionRatio),v.lightMap&&(x.lightMap.value=v.lightMap,x.lightMapIntensity.value=v.lightMapIntensity,n(v.lightMap,x.lightMapTransform)),v.aoMap&&(x.aoMap.value=v.aoMap,x.aoMapIntensity.value=v.aoMapIntensity,n(v.aoMap,x.aoMapTransform))}function f(x,v){x.diffuse.value.copy(v.color),x.opacity.value=v.opacity,v.map&&(x.map.value=v.map,n(v.map,x.mapTransform))}function h(x,v){x.dashSize.value=v.dashSize,x.totalSize.value=v.dashSize+v.gapSize,x.scale.value=v.scale}function m(x,v,T,C){x.diffuse.value.copy(v.color),x.opacity.value=v.opacity,x.size.value=v.size*T,x.scale.value=C*.5,v.map&&(x.map.value=v.map,n(v.map,x.uvTransform)),v.alphaMap&&(x.alphaMap.value=v.alphaMap,n(v.alphaMap,x.alphaMapTransform)),v.alphaTest>0&&(x.alphaTest.value=v.alphaTest)}function d(x,v){x.diffuse.value.copy(v.color),x.opacity.value=v.opacity,x.rotation.value=v.rotation,v.map&&(x.map.value=v.map,n(v.map,x.mapTransform)),v.alphaMap&&(x.alphaMap.value=v.alphaMap,n(v.alphaMap,x.alphaMapTransform)),v.alphaTest>0&&(x.alphaTest.value=v.alphaTest)}function g(x,v){x.specular.value.copy(v.specular),x.shininess.value=Math.max(v.shininess,1e-4)}function b(x,v){v.gradientMap&&(x.gradientMap.value=v.gradientMap)}function _(x,v){x.metalness.value=v.metalness,v.metalnessMap&&(x.metalnessMap.value=v.metalnessMap,n(v.metalnessMap,x.metalnessMapTransform)),x.roughness.value=v.roughness,v.roughnessMap&&(x.roughnessMap.value=v.roughnessMap,n(v.roughnessMap,x.roughnessMapTransform)),v.envMap&&(x.envMapIntensity.value=v.envMapIntensity)}function y(x,v,T){x.ior.value=v.ior,v.sheen>0&&(x.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),x.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(x.sheenColorMap.value=v.sheenColorMap,n(v.sheenColorMap,x.sheenColorMapTransform)),v.sheenRoughnessMap&&(x.sheenRoughnessMap.value=v.sheenRoughnessMap,n(v.sheenRoughnessMap,x.sheenRoughnessMapTransform))),v.clearcoat>0&&(x.clearcoat.value=v.clearcoat,x.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(x.clearcoatMap.value=v.clearcoatMap,n(v.clearcoatMap,x.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,n(v.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(x.clearcoatNormalMap.value=v.clearcoatNormalMap,n(v.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Jn&&x.clearcoatNormalScale.value.negate())),v.dispersion>0&&(x.dispersion.value=v.dispersion),v.iridescence>0&&(x.iridescence.value=v.iridescence,x.iridescenceIOR.value=v.iridescenceIOR,x.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(x.iridescenceMap.value=v.iridescenceMap,n(v.iridescenceMap,x.iridescenceMapTransform)),v.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=v.iridescenceThicknessMap,n(v.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),v.transmission>0&&(x.transmission.value=v.transmission,x.transmissionSamplerMap.value=T.texture,x.transmissionSamplerSize.value.set(T.width,T.height),v.transmissionMap&&(x.transmissionMap.value=v.transmissionMap,n(v.transmissionMap,x.transmissionMapTransform)),x.thickness.value=v.thickness,v.thicknessMap&&(x.thicknessMap.value=v.thicknessMap,n(v.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=v.attenuationDistance,x.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(x.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(x.anisotropyMap.value=v.anisotropyMap,n(v.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=v.specularIntensity,x.specularColor.value.copy(v.specularColor),v.specularColorMap&&(x.specularColorMap.value=v.specularColorMap,n(v.specularColorMap,x.specularColorMapTransform)),v.specularIntensityMap&&(x.specularIntensityMap.value=v.specularIntensityMap,n(v.specularIntensityMap,x.specularIntensityMapTransform))}function S(x,v){v.matcap&&(x.matcap.value=v.matcap)}function A(x,v){const T=e.get(v).light;x.referencePosition.value.setFromMatrixPosition(T.matrixWorld),x.nearDistance.value=T.shadow.camera.near,x.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:o}}function PC(a,e,n,r){let o={},c={},f=[];const h=a.getParameter(a.MAX_UNIFORM_BUFFER_BINDINGS);function m(T,C){const R=C.program;r.uniformBlockBinding(T,R)}function d(T,C){let R=o[T.id];R===void 0&&(S(T),R=g(T),o[T.id]=R,T.addEventListener("dispose",x));const P=C.program;r.updateUBOMapping(T,P);const O=e.render.frame;c[T.id]!==O&&(_(T),c[T.id]=O)}function g(T){const C=b();T.__bindingPointIndex=C;const R=a.createBuffer(),P=T.__size,O=T.usage;return a.bindBuffer(a.UNIFORM_BUFFER,R),a.bufferData(a.UNIFORM_BUFFER,P,O),a.bindBuffer(a.UNIFORM_BUFFER,null),a.bindBufferBase(a.UNIFORM_BUFFER,C,R),R}function b(){for(let T=0;T<h;T++)if(f.indexOf(T)===-1)return f.push(T),T;return wt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(T){const C=o[T.id],R=T.uniforms,P=T.__cache;a.bindBuffer(a.UNIFORM_BUFFER,C);for(let O=0,F=R.length;O<F;O++){const E=Array.isArray(R[O])?R[O]:[R[O]];for(let D=0,Y=E.length;D<Y;D++){const k=E[D];if(y(k,O,D,P)===!0){const X=k.__offset,$=Array.isArray(k.value)?k.value:[k.value];let K=0;for(let V=0;V<$.length;V++){const I=$[V],B=A(I);typeof I=="number"||typeof I=="boolean"?(k.__data[0]=I,a.bufferSubData(a.UNIFORM_BUFFER,X+K,k.__data)):I.isMatrix3?(k.__data[0]=I.elements[0],k.__data[1]=I.elements[1],k.__data[2]=I.elements[2],k.__data[3]=0,k.__data[4]=I.elements[3],k.__data[5]=I.elements[4],k.__data[6]=I.elements[5],k.__data[7]=0,k.__data[8]=I.elements[6],k.__data[9]=I.elements[7],k.__data[10]=I.elements[8],k.__data[11]=0):(I.toArray(k.__data,K),K+=B.storage/Float32Array.BYTES_PER_ELEMENT)}a.bufferSubData(a.UNIFORM_BUFFER,X,k.__data)}}}a.bindBuffer(a.UNIFORM_BUFFER,null)}function y(T,C,R,P){const O=T.value,F=C+"_"+R;if(P[F]===void 0)return typeof O=="number"||typeof O=="boolean"?P[F]=O:P[F]=O.clone(),!0;{const E=P[F];if(typeof O=="number"||typeof O=="boolean"){if(E!==O)return P[F]=O,!0}else if(E.equals(O)===!1)return E.copy(O),!0}return!1}function S(T){const C=T.uniforms;let R=0;const P=16;for(let F=0,E=C.length;F<E;F++){const D=Array.isArray(C[F])?C[F]:[C[F]];for(let Y=0,k=D.length;Y<k;Y++){const X=D[Y],$=Array.isArray(X.value)?X.value:[X.value];for(let K=0,V=$.length;K<V;K++){const I=$[K],B=A(I),se=R%P,he=se%B.boundary,L=se+he;R+=he,L!==0&&P-L<B.storage&&(R+=P-L),X.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=R,R+=B.storage}}}const O=R%P;return O>0&&(R+=P-O),T.__size=R,T.__cache={},this}function A(T){const C={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(C.boundary=4,C.storage=4):T.isVector2?(C.boundary=8,C.storage=8):T.isVector3||T.isColor?(C.boundary=16,C.storage=12):T.isVector4?(C.boundary=16,C.storage=16):T.isMatrix3?(C.boundary=48,C.storage=48):T.isMatrix4?(C.boundary=64,C.storage=64):T.isTexture?st("WebGLRenderer: Texture samplers can not be part of an uniforms group."):st("WebGLRenderer: Unsupported uniform value type.",T),C}function x(T){const C=T.target;C.removeEventListener("dispose",x);const R=f.indexOf(C.__bindingPointIndex);f.splice(R,1),a.deleteBuffer(o[C.id]),delete o[C.id],delete c[C.id]}function v(){for(const T in o)a.deleteBuffer(o[T]);f=[],o={},c={}}return{bind:m,update:d,dispose:v}}const IC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Gi=null;function FC(){return Gi===null&&(Gi=new ST(IC,16,16,Ys,Ra),Gi.name="DFG_LUT",Gi.minFilter=Bn,Gi.magFilter=Bn,Gi.wrapS=Ta,Gi.wrapT=Ta,Gi.generateMipmaps=!1,Gi.needsUpdate=!0),Gi}class zC{constructor(e={}){const{canvas:n=zE(),context:r=null,depth:o=!0,stencil:c=!1,alpha:f=!1,antialias:h=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:d=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:b=!1,reversedDepthBuffer:_=!1,outputBufferType:y=ci}=e;this.isWebGLRenderer=!0;let S;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=r.getContextAttributes().alpha}else S=f;const A=y,x=new Set([zp,Fp,Ip]),v=new Set([ci,Zi,ml,gl,Op,Pp]),T=new Uint32Array(4),C=new Int32Array(4);let R=null,P=null;const O=[],F=[];let E=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let Y=!1;this._outputColorSpace=xi;let k=0,X=0,$=null,K=-1,V=null;const I=new on,B=new on;let se=null;const he=new yt(0);let L=0,Q=n.width,le=n.height,ge=1,we=null,Le=null;const ee=new on(0,0,Q,le),Me=new on(0,0,Q,le);let Se=!1;const ze=new Wp;let Je=!1,et=!1;const Wt=new en,ct=new re,_t=new on,Bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ut=!1;function Ct(){return $===null?ge:1}let j=r;function tn(U,te){return n.getContext(U,te)}try{const U={alpha:!0,depth:o,stencil:c,antialias:h,premultipliedAlpha:m,preserveDrawingBuffer:d,powerPreference:g,failIfMajorPerformanceCaveat:b};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Np}`),n.addEventListener("webglcontextlost",Ve,!1),n.addEventListener("webglcontextrestored",at,!1),n.addEventListener("webglcontextcreationerror",Ft,!1),j===null){const te="webgl2";if(j=tn(te,U),j===null)throw tn(te)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(U){throw wt("WebGLRenderer: "+U.message),U}let At,Lt,Ye,H,w,J,ve,xe,pe,Oe,De,$e,nt,Ee,Ae,Be,Ge,Ie,ft,Z,Ce,Re,Fe;function Te(){At=new zR(j),At.init(),Ce=new RC(j,At),Lt=new DR(j,At,e,Ce),Ye=new AC(j,At),Lt.reversedDepthBuffer&&_&&Ye.buffers.depth.setReversed(!0),H=new kR(j),w=new dC,J=new wC(j,At,Ye,w,Lt,Ce,H),ve=new FR(D),xe=new WT(j),Re=new RR(j,xe),pe=new BR(j,xe,H,Re),Oe=new VR(j,pe,xe,Re,H),Ie=new GR(j,Lt,J),Ae=new NR(w),De=new fC(D,ve,At,Lt,Re,Ae),$e=new OC(D,w),nt=new pC,Ee=new yC(At),Ge=new wR(D,ve,Ye,Oe,S,m),Be=new TC(D,Oe,Lt),Fe=new PC(j,H,Lt,Ye),ft=new CR(j,At,H),Z=new HR(j,At,H),H.programs=De.programs,D.capabilities=Lt,D.extensions=At,D.properties=w,D.renderLists=nt,D.shadowMap=Be,D.state=Ye,D.info=H}Te(),A!==ci&&(E=new XR(A,n.width,n.height,o,c));const me=new UC(D,j);this.xr=me,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const U=At.get("WEBGL_lose_context");U&&U.loseContext()},this.forceContextRestore=function(){const U=At.get("WEBGL_lose_context");U&&U.restoreContext()},this.getPixelRatio=function(){return ge},this.setPixelRatio=function(U){U!==void 0&&(ge=U,this.setSize(Q,le,!1))},this.getSize=function(U){return U.set(Q,le)},this.setSize=function(U,te,de=!0){if(me.isPresenting){st("WebGLRenderer: Can't change size while VR device is presenting.");return}Q=U,le=te,n.width=Math.floor(U*ge),n.height=Math.floor(te*ge),de===!0&&(n.style.width=U+"px",n.style.height=te+"px"),E!==null&&E.setSize(n.width,n.height),this.setViewport(0,0,U,te)},this.getDrawingBufferSize=function(U){return U.set(Q*ge,le*ge).floor()},this.setDrawingBufferSize=function(U,te,de){Q=U,le=te,ge=de,n.width=Math.floor(U*de),n.height=Math.floor(te*de),this.setViewport(0,0,U,te)},this.setEffects=function(U){if(A===ci){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(U){for(let te=0;te<U.length;te++)if(U[te].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(U||[])},this.getCurrentViewport=function(U){return U.copy(I)},this.getViewport=function(U){return U.copy(ee)},this.setViewport=function(U,te,de,ce){U.isVector4?ee.set(U.x,U.y,U.z,U.w):ee.set(U,te,de,ce),Ye.viewport(I.copy(ee).multiplyScalar(ge).round())},this.getScissor=function(U){return U.copy(Me)},this.setScissor=function(U,te,de,ce){U.isVector4?Me.set(U.x,U.y,U.z,U.w):Me.set(U,te,de,ce),Ye.scissor(B.copy(Me).multiplyScalar(ge).round())},this.getScissorTest=function(){return Se},this.setScissorTest=function(U){Ye.setScissorTest(Se=U)},this.setOpaqueSort=function(U){we=U},this.setTransparentSort=function(U){Le=U},this.getClearColor=function(U){return U.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(U=!0,te=!0,de=!0){let ce=0;if(U){let ie=!1;if($!==null){const Ue=$.texture.format;ie=x.has(Ue)}if(ie){const Ue=$.texture.type,He=v.has(Ue),Ne=Ge.getClearColor(),je=Ge.getClearAlpha(),Ze=Ne.r,ot=Ne.g,lt=Ne.b;He?(T[0]=Ze,T[1]=ot,T[2]=lt,T[3]=je,j.clearBufferuiv(j.COLOR,0,T)):(C[0]=Ze,C[1]=ot,C[2]=lt,C[3]=je,j.clearBufferiv(j.COLOR,0,C))}else ce|=j.COLOR_BUFFER_BIT}te&&(ce|=j.DEPTH_BUFFER_BIT),de&&(ce|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ce!==0&&j.clear(ce)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Ve,!1),n.removeEventListener("webglcontextrestored",at,!1),n.removeEventListener("webglcontextcreationerror",Ft,!1),Ge.dispose(),nt.dispose(),Ee.dispose(),w.dispose(),ve.dispose(),Oe.dispose(),Re.dispose(),Fe.dispose(),De.dispose(),me.dispose(),me.removeEventListener("sessionstart",Wr),me.removeEventListener("sessionend",Al),$i.stop()};function Ve(U){U.preventDefault(),$v("WebGLRenderer: Context Lost."),Y=!0}function at(){$v("WebGLRenderer: Context Restored."),Y=!1;const U=H.autoReset,te=Be.enabled,de=Be.autoUpdate,ce=Be.needsUpdate,ie=Be.type;Te(),H.autoReset=U,Be.enabled=te,Be.autoUpdate=de,Be.needsUpdate=ce,Be.type=ie}function Ft(U){wt("WebGLRenderer: A WebGL context could not be created. Reason: ",U.statusMessage)}function Dt(U){const te=U.target;te.removeEventListener("dispose",Dt),bi(te)}function bi(U){Sn(U),w.remove(U)}function Sn(U){const te=w.get(U).programs;te!==void 0&&(te.forEach(function(de){De.releaseProgram(de)}),U.isShaderMaterial&&De.releaseShaderCache(U))}this.renderBufferDirect=function(U,te,de,ce,ie,Ue){te===null&&(te=Bt);const He=ie.isMesh&&ie.matrixWorld.determinant()<0,Ne=wl(U,te,de,ce,ie);Ye.setMaterial(ce,He);let je=de.index,Ze=1;if(ce.wireframe===!0){if(je=pe.getWireframeAttribute(de),je===void 0)return;Ze=2}const ot=de.drawRange,lt=de.attributes.position;let ke=ot.start*Ze,Ot=(ot.start+ot.count)*Ze;Ue!==null&&(ke=Math.max(ke,Ue.start*Ze),Ot=Math.min(Ot,(Ue.start+Ue.count)*Ze)),je!==null?(ke=Math.max(ke,0),Ot=Math.min(Ot,je.count)):lt!=null&&(ke=Math.max(ke,0),Ot=Math.min(Ot,lt.count));const nn=Ot-ke;if(nn<0||nn===1/0)return;Re.setup(ie,ce,Ne,de,je);let qt,Pt=ft;if(je!==null&&(qt=xe.get(je),Pt=Z,Pt.setIndex(qt)),ie.isMesh)ce.wireframe===!0?(Ye.setLineWidth(ce.wireframeLinewidth*Ct()),Pt.setMode(j.LINES)):Pt.setMode(j.TRIANGLES);else if(ie.isLine){let cn=ce.linewidth;cn===void 0&&(cn=1),Ye.setLineWidth(cn*Ct()),ie.isLineSegments?Pt.setMode(j.LINES):ie.isLineLoop?Pt.setMode(j.LINE_LOOP):Pt.setMode(j.LINE_STRIP)}else ie.isPoints?Pt.setMode(j.POINTS):ie.isSprite&&Pt.setMode(j.TRIANGLES);if(ie.isBatchedMesh)if(ie._multiDrawInstances!==null)Eu("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Pt.renderMultiDrawInstances(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount,ie._multiDrawInstances);else if(At.get("WEBGL_multi_draw"))Pt.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else{const cn=ie._multiDrawStarts,Ke=ie._multiDrawCounts,Zt=ie._multiDrawCount,Mt=je?xe.get(je).bytesPerElement:1,Xn=w.get(ce).currentProgram.getUniforms();for(let Wn=0;Wn<Zt;Wn++)Xn.setValue(j,"_gl_DrawID",Wn),Pt.render(cn[Wn]/Mt,Ke[Wn])}else if(ie.isInstancedMesh)Pt.renderInstances(ke,nn,ie.count);else if(de.isInstancedBufferGeometry){const cn=de._maxInstanceCount!==void 0?de._maxInstanceCount:1/0,Ke=Math.min(de.instanceCount,cn);Pt.renderInstances(ke,nn,Ke)}else Pt.render(ke,nn)};function gn(U,te,de){U.transparent===!0&&U.side===Ea&&U.forceSinglePass===!1?(U.side=Jn,U.needsUpdate=!0,Li(U,te,de),U.side=dr,U.needsUpdate=!0,Li(U,te,de),U.side=Ea):Li(U,te,de)}this.compile=function(U,te,de=null){de===null&&(de=U),P=Ee.get(de),P.init(te),F.push(P),de.traverseVisible(function(ie){ie.isLight&&ie.layers.test(te.layers)&&(P.pushLight(ie),ie.castShadow&&P.pushShadow(ie))}),U!==de&&U.traverseVisible(function(ie){ie.isLight&&ie.layers.test(te.layers)&&(P.pushLight(ie),ie.castShadow&&P.pushShadow(ie))}),P.setupLights();const ce=new Set;return U.traverse(function(ie){if(!(ie.isMesh||ie.isPoints||ie.isLine||ie.isSprite))return;const Ue=ie.material;if(Ue)if(Array.isArray(Ue))for(let He=0;He<Ue.length;He++){const Ne=Ue[He];gn(Ne,de,ie),ce.add(Ne)}else gn(Ue,de,ie),ce.add(Ue)}),P=F.pop(),ce},this.compileAsync=function(U,te,de=null){const ce=this.compile(U,te,de);return new Promise(ie=>{function Ue(){if(ce.forEach(function(He){w.get(He).currentProgram.isReady()&&ce.delete(He)}),ce.size===0){ie(U);return}setTimeout(Ue,10)}At.get("KHR_parallel_shader_compile")!==null?Ue():setTimeout(Ue,10)})};let Mn=null;function Da(U){Mn&&Mn(U)}function Wr(){$i.stop()}function Al(){$i.start()}const $i=new ey;$i.setAnimationLoop(Da),typeof self<"u"&&$i.setContext(self),this.setAnimationLoop=function(U){Mn=U,me.setAnimationLoop(U),U===null?$i.stop():$i.start()},me.addEventListener("sessionstart",Wr),me.addEventListener("sessionend",Al),this.render=function(U,te){if(te!==void 0&&te.isCamera!==!0){wt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Y===!0)return;const de=me.enabled===!0&&me.isPresenting===!0,ce=E!==null&&($===null||de)&&E.begin(D,$);if(U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),te.parent===null&&te.matrixWorldAutoUpdate===!0&&te.updateMatrixWorld(),me.enabled===!0&&me.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(me.cameraAutoUpdate===!0&&me.updateCamera(te),te=me.getCamera()),U.isScene===!0&&U.onBeforeRender(D,U,te,$),P=Ee.get(U,F.length),P.init(te),F.push(P),Wt.multiplyMatrices(te.projectionMatrix,te.matrixWorldInverse),ze.setFromProjectionMatrix(Wt,Xi,te.reversedDepth),et=this.localClippingEnabled,Je=Ae.init(this.clippingPlanes,et),R=nt.get(U,O.length),R.init(),O.push(R),me.enabled===!0&&me.isPresenting===!0){const He=D.xr.getDepthSensingMesh();He!==null&&qr(He,te,-1/0,D.sortObjects)}qr(U,te,0,D.sortObjects),R.finish(),D.sortObjects===!0&&R.sort(we,Le),ut=me.enabled===!1||me.isPresenting===!1||me.hasDepthSensing()===!1,ut&&Ge.addToRenderList(R,U),this.info.render.frame++,Je===!0&&Ae.beginShadows();const ie=P.state.shadowsArray;if(Be.render(ie,U,te),Je===!0&&Ae.endShadows(),this.info.autoReset===!0&&this.info.reset(),(ce&&E.hasRenderPass())===!1){const He=R.opaque,Ne=R.transmissive;if(P.setupLights(),te.isArrayCamera){const je=te.cameras;if(Ne.length>0)for(let Ze=0,ot=je.length;Ze<ot;Ze++){const lt=je[Ze];Yr(He,Ne,U,lt)}ut&&Ge.render(U);for(let Ze=0,ot=je.length;Ze<ot;Ze++){const lt=je[Ze];Na(R,U,lt,lt.viewport)}}else Ne.length>0&&Yr(He,Ne,U,te),ut&&Ge.render(U),Na(R,U,te)}$!==null&&X===0&&(J.updateMultisampleRenderTarget($),J.updateRenderTargetMipmap($)),ce&&E.end(D),U.isScene===!0&&U.onAfterRender(D,U,te),Re.resetDefaultState(),K=-1,V=null,F.pop(),F.length>0?(P=F[F.length-1],Je===!0&&Ae.setGlobalState(D.clippingPlanes,P.state.camera)):P=null,O.pop(),O.length>0?R=O[O.length-1]:R=null};function qr(U,te,de,ce){if(U.visible===!1)return;if(U.layers.test(te.layers)){if(U.isGroup)de=U.renderOrder;else if(U.isLOD)U.autoUpdate===!0&&U.update(te);else if(U.isLight)P.pushLight(U),U.castShadow&&P.pushShadow(U);else if(U.isSprite){if(!U.frustumCulled||ze.intersectsSprite(U)){ce&&_t.setFromMatrixPosition(U.matrixWorld).applyMatrix4(Wt);const He=Oe.update(U),Ne=U.material;Ne.visible&&R.push(U,He,Ne,de,_t.z,null)}}else if((U.isMesh||U.isLine||U.isPoints)&&(!U.frustumCulled||ze.intersectsObject(U))){const He=Oe.update(U),Ne=U.material;if(ce&&(U.boundingSphere!==void 0?(U.boundingSphere===null&&U.computeBoundingSphere(),_t.copy(U.boundingSphere.center)):(He.boundingSphere===null&&He.computeBoundingSphere(),_t.copy(He.boundingSphere.center)),_t.applyMatrix4(U.matrixWorld).applyMatrix4(Wt)),Array.isArray(Ne)){const je=He.groups;for(let Ze=0,ot=je.length;Ze<ot;Ze++){const lt=je[Ze],ke=Ne[lt.materialIndex];ke&&ke.visible&&R.push(U,He,ke,de,_t.z,lt)}}else Ne.visible&&R.push(U,He,Ne,de,_t.z,null)}}const Ue=U.children;for(let He=0,Ne=Ue.length;He<Ne;He++)qr(Ue[He],te,de,ce)}function Na(U,te,de,ce){const{opaque:ie,transmissive:Ue,transparent:He}=U;P.setupLightsView(de),Je===!0&&Ae.setGlobalState(D.clippingPlanes,de),ce&&Ye.viewport(I.copy(ce)),ie.length>0&&Si(ie,te,de),Ue.length>0&&Si(Ue,te,de),He.length>0&&Si(He,te,de),Ye.buffers.depth.setTest(!0),Ye.buffers.depth.setMask(!0),Ye.buffers.color.setMask(!0),Ye.setPolygonOffset(!1)}function Yr(U,te,de,ce){if((de.isScene===!0?de.overrideMaterial:null)!==null)return;if(P.state.transmissionRenderTarget[ce.id]===void 0){const ke=At.has("EXT_color_buffer_half_float")||At.has("EXT_color_buffer_float");P.state.transmissionRenderTarget[ce.id]=new qi(1,1,{generateMipmaps:!0,type:ke?Ra:ci,minFilter:Hr,samples:Math.max(4,Lt.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Rt.workingColorSpace})}const Ue=P.state.transmissionRenderTarget[ce.id],He=ce.viewport||I;Ue.setSize(He.z*D.transmissionResolutionScale,He.w*D.transmissionResolutionScale);const Ne=D.getRenderTarget(),je=D.getActiveCubeFace(),Ze=D.getActiveMipmapLevel();D.setRenderTarget(Ue),D.getClearColor(he),L=D.getClearAlpha(),L<1&&D.setClearColor(16777215,.5),D.clear(),ut&&Ge.render(de);const ot=D.toneMapping;D.toneMapping=Wi;const lt=ce.viewport;if(ce.viewport!==void 0&&(ce.viewport=void 0),P.setupLightsView(ce),Je===!0&&Ae.setGlobalState(D.clippingPlanes,ce),Si(U,de,ce),J.updateMultisampleRenderTarget(Ue),J.updateRenderTargetMipmap(Ue),At.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let Ot=0,nn=te.length;Ot<nn;Ot++){const qt=te[Ot],{object:Pt,geometry:cn,material:Ke,group:Zt}=qt;if(Ke.side===Ea&&Pt.layers.test(ce.layers)){const Mt=Ke.side;Ke.side=Jn,Ke.needsUpdate=!0,ea(Pt,de,ce,cn,Ke,Zt),Ke.side=Mt,Ke.needsUpdate=!0,ke=!0}}ke===!0&&(J.updateMultisampleRenderTarget(Ue),J.updateRenderTargetMipmap(Ue))}D.setRenderTarget(Ne,je,Ze),D.setClearColor(he,L),lt!==void 0&&(ce.viewport=lt),D.toneMapping=ot}function Si(U,te,de){const ce=te.isScene===!0?te.overrideMaterial:null;for(let ie=0,Ue=U.length;ie<Ue;ie++){const He=U[ie],{object:Ne,geometry:je,group:Ze}=He;let ot=He.material;ot.allowOverride===!0&&ce!==null&&(ot=ce),Ne.layers.test(de.layers)&&ea(Ne,te,de,je,ot,Ze)}}function ea(U,te,de,ce,ie,Ue){U.onBeforeRender(D,te,de,ce,ie,Ue),U.modelViewMatrix.multiplyMatrices(de.matrixWorldInverse,U.matrixWorld),U.normalMatrix.getNormalMatrix(U.modelViewMatrix),ie.onBeforeRender(D,te,de,ce,U,Ue),ie.transparent===!0&&ie.side===Ea&&ie.forceSinglePass===!1?(ie.side=Jn,ie.needsUpdate=!0,D.renderBufferDirect(de,te,ce,ie,U,Ue),ie.side=dr,ie.needsUpdate=!0,D.renderBufferDirect(de,te,ce,ie,U,Ue),ie.side=Ea):D.renderBufferDirect(de,te,ce,ie,U,Ue),U.onAfterRender(D,te,de,ce,ie,Ue)}function Li(U,te,de){te.isScene!==!0&&(te=Bt);const ce=w.get(U),ie=P.state.lights,Ue=P.state.shadowsArray,He=ie.state.version,Ne=De.getParameters(U,ie.state,Ue,te,de),je=De.getProgramCacheKey(Ne);let Ze=ce.programs;ce.environment=U.isMeshStandardMaterial||U.isMeshLambertMaterial||U.isMeshPhongMaterial?te.environment:null,ce.fog=te.fog;const ot=U.isMeshStandardMaterial||U.isMeshLambertMaterial&&!U.envMap||U.isMeshPhongMaterial&&!U.envMap;ce.envMap=ve.get(U.envMap||ce.environment,ot),ce.envMapRotation=ce.environment!==null&&U.envMap===null?te.environmentRotation:U.envMapRotation,Ze===void 0&&(U.addEventListener("dispose",Dt),Ze=new Map,ce.programs=Ze);let lt=Ze.get(je);if(lt!==void 0){if(ce.currentProgram===lt&&ce.lightsStateVersion===He)return ln(U,Ne),lt}else Ne.uniforms=De.getUniforms(U),U.onBeforeCompile(Ne,D),lt=De.acquireProgram(Ne,je),Ze.set(je,lt),ce.uniforms=Ne.uniforms;const ke=ce.uniforms;return(!U.isShaderMaterial&&!U.isRawShaderMaterial||U.clipping===!0)&&(ke.clippingPlanes=Ae.uniform),ln(U,Ne),ce.needsLights=na(U),ce.lightsStateVersion=He,ce.needsLights&&(ke.ambientLightColor.value=ie.state.ambient,ke.lightProbe.value=ie.state.probe,ke.directionalLights.value=ie.state.directional,ke.directionalLightShadows.value=ie.state.directionalShadow,ke.spotLights.value=ie.state.spot,ke.spotLightShadows.value=ie.state.spotShadow,ke.rectAreaLights.value=ie.state.rectArea,ke.ltc_1.value=ie.state.rectAreaLTC1,ke.ltc_2.value=ie.state.rectAreaLTC2,ke.pointLights.value=ie.state.point,ke.pointLightShadows.value=ie.state.pointShadow,ke.hemisphereLights.value=ie.state.hemi,ke.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,ke.spotLightMatrix.value=ie.state.spotLightMatrix,ke.spotLightMap.value=ie.state.spotLightMap,ke.pointShadowMatrix.value=ie.state.pointShadowMatrix),ce.currentProgram=lt,ce.uniformsList=null,lt}function ta(U){if(U.uniformsList===null){const te=U.currentProgram.getUniforms();U.uniformsList=xu.seqWithValue(te.seq,U.uniforms)}return U.uniformsList}function ln(U,te){const de=w.get(U);de.outputColorSpace=te.outputColorSpace,de.batching=te.batching,de.batchingColor=te.batchingColor,de.instancing=te.instancing,de.instancingColor=te.instancingColor,de.instancingMorph=te.instancingMorph,de.skinning=te.skinning,de.morphTargets=te.morphTargets,de.morphNormals=te.morphNormals,de.morphColors=te.morphColors,de.morphTargetsCount=te.morphTargetsCount,de.numClippingPlanes=te.numClippingPlanes,de.numIntersection=te.numClipIntersection,de.vertexAlphas=te.vertexAlphas,de.vertexTangents=te.vertexTangents,de.toneMapping=te.toneMapping}function wl(U,te,de,ce,ie){te.isScene!==!0&&(te=Bt),J.resetTextureUnits();const Ue=te.fog,He=ce.isMeshStandardMaterial||ce.isMeshLambertMaterial||ce.isMeshPhongMaterial?te.environment:null,Ne=$===null?D.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Zs,je=ce.isMeshStandardMaterial||ce.isMeshLambertMaterial&&!ce.envMap||ce.isMeshPhongMaterial&&!ce.envMap,Ze=ve.get(ce.envMap||He,je),ot=ce.vertexColors===!0&&!!de.attributes.color&&de.attributes.color.itemSize===4,lt=!!de.attributes.tangent&&(!!ce.normalMap||ce.anisotropy>0),ke=!!de.morphAttributes.position,Ot=!!de.morphAttributes.normal,nn=!!de.morphAttributes.color;let qt=Wi;ce.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(qt=D.toneMapping);const Pt=de.morphAttributes.position||de.morphAttributes.normal||de.morphAttributes.color,cn=Pt!==void 0?Pt.length:0,Ke=w.get(ce),Zt=P.state.lights;if(Je===!0&&(et===!0||U!==V)){const un=U===V&&ce.id===K;Ae.setState(ce,U,un)}let Mt=!1;ce.version===Ke.__version?(Ke.needsLights&&Ke.lightsStateVersion!==Zt.state.version||Ke.outputColorSpace!==Ne||ie.isBatchedMesh&&Ke.batching===!1||!ie.isBatchedMesh&&Ke.batching===!0||ie.isBatchedMesh&&Ke.batchingColor===!0&&ie.colorTexture===null||ie.isBatchedMesh&&Ke.batchingColor===!1&&ie.colorTexture!==null||ie.isInstancedMesh&&Ke.instancing===!1||!ie.isInstancedMesh&&Ke.instancing===!0||ie.isSkinnedMesh&&Ke.skinning===!1||!ie.isSkinnedMesh&&Ke.skinning===!0||ie.isInstancedMesh&&Ke.instancingColor===!0&&ie.instanceColor===null||ie.isInstancedMesh&&Ke.instancingColor===!1&&ie.instanceColor!==null||ie.isInstancedMesh&&Ke.instancingMorph===!0&&ie.morphTexture===null||ie.isInstancedMesh&&Ke.instancingMorph===!1&&ie.morphTexture!==null||Ke.envMap!==Ze||ce.fog===!0&&Ke.fog!==Ue||Ke.numClippingPlanes!==void 0&&(Ke.numClippingPlanes!==Ae.numPlanes||Ke.numIntersection!==Ae.numIntersection)||Ke.vertexAlphas!==ot||Ke.vertexTangents!==lt||Ke.morphTargets!==ke||Ke.morphNormals!==Ot||Ke.morphColors!==nn||Ke.toneMapping!==qt||Ke.morphTargetsCount!==cn)&&(Mt=!0):(Mt=!0,Ke.__version=ce.version);let Xn=Ke.currentProgram;Mt===!0&&(Xn=Li(ce,te,ie));let Wn=!1,qn=!1,ia=!1;const zt=Xn.getUniforms(),Jt=Ke.uniforms;if(Ye.useProgram(Xn.program)&&(Wn=!0,qn=!0,ia=!0),ce.id!==K&&(K=ce.id,qn=!0),Wn||V!==U){Ye.buffers.depth.getReversed()&&U.reversedDepth!==!0&&(U._reversedDepth=!0,U.updateProjectionMatrix()),zt.setValue(j,"projectionMatrix",U.projectionMatrix),zt.setValue(j,"viewMatrix",U.matrixWorldInverse);const Mi=zt.map.cameraPosition;Mi!==void 0&&Mi.setValue(j,ct.setFromMatrixPosition(U.matrixWorld)),Lt.logarithmicDepthBuffer&&zt.setValue(j,"logDepthBufFC",2/(Math.log(U.far+1)/Math.LN2)),(ce.isMeshPhongMaterial||ce.isMeshToonMaterial||ce.isMeshLambertMaterial||ce.isMeshBasicMaterial||ce.isMeshStandardMaterial||ce.isShaderMaterial)&&zt.setValue(j,"isOrthographic",U.isOrthographicCamera===!0),V!==U&&(V=U,qn=!0,ia=!0)}if(Ke.needsLights&&(Zt.state.directionalShadowMap.length>0&&zt.setValue(j,"directionalShadowMap",Zt.state.directionalShadowMap,J),Zt.state.spotShadowMap.length>0&&zt.setValue(j,"spotShadowMap",Zt.state.spotShadowMap,J),Zt.state.pointShadowMap.length>0&&zt.setValue(j,"pointShadowMap",Zt.state.pointShadowMap,J)),ie.isSkinnedMesh){zt.setOptional(j,ie,"bindMatrix"),zt.setOptional(j,ie,"bindMatrixInverse");const un=ie.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),zt.setValue(j,"boneTexture",un.boneTexture,J))}ie.isBatchedMesh&&(zt.setOptional(j,ie,"batchingTexture"),zt.setValue(j,"batchingTexture",ie._matricesTexture,J),zt.setOptional(j,ie,"batchingIdTexture"),zt.setValue(j,"batchingIdTexture",ie._indirectTexture,J),zt.setOptional(j,ie,"batchingColorTexture"),ie._colorsTexture!==null&&zt.setValue(j,"batchingColorTexture",ie._colorsTexture,J));const Oi=de.morphAttributes;if((Oi.position!==void 0||Oi.normal!==void 0||Oi.color!==void 0)&&Ie.update(ie,de,Xn),(qn||Ke.receiveShadow!==ie.receiveShadow)&&(Ke.receiveShadow=ie.receiveShadow,zt.setValue(j,"receiveShadow",ie.receiveShadow)),(ce.isMeshStandardMaterial||ce.isMeshLambertMaterial||ce.isMeshPhongMaterial)&&ce.envMap===null&&te.environment!==null&&(Jt.envMapIntensity.value=te.environmentIntensity),Jt.dfgLUT!==void 0&&(Jt.dfgLUT.value=FC()),qn&&(zt.setValue(j,"toneMappingExposure",D.toneMappingExposure),Ke.needsLights&&Rl(Jt,ia),Ue&&ce.fog===!0&&$e.refreshFogUniforms(Jt,Ue),$e.refreshMaterialUniforms(Jt,ce,ge,le,P.state.transmissionRenderTarget[U.id]),xu.upload(j,ta(Ke),Jt,J)),ce.isShaderMaterial&&ce.uniformsNeedUpdate===!0&&(xu.upload(j,ta(Ke),Jt,J),ce.uniformsNeedUpdate=!1),ce.isSpriteMaterial&&zt.setValue(j,"center",ie.center),zt.setValue(j,"modelViewMatrix",ie.modelViewMatrix),zt.setValue(j,"normalMatrix",ie.normalMatrix),zt.setValue(j,"modelMatrix",ie.matrixWorld),ce.isShaderMaterial||ce.isRawShaderMaterial){const un=ce.uniformsGroups;for(let Mi=0,Pi=un.length;Mi<Pi;Mi++){const Dl=un[Mi];Fe.update(Dl,Xn),Fe.bind(Dl,Xn)}}return Xn}function Rl(U,te){U.ambientLightColor.needsUpdate=te,U.lightProbe.needsUpdate=te,U.directionalLights.needsUpdate=te,U.directionalLightShadows.needsUpdate=te,U.pointLights.needsUpdate=te,U.pointLightShadows.needsUpdate=te,U.spotLights.needsUpdate=te,U.spotLightShadows.needsUpdate=te,U.rectAreaLights.needsUpdate=te,U.hemisphereLights.needsUpdate=te}function na(U){return U.isMeshLambertMaterial||U.isMeshToonMaterial||U.isMeshPhongMaterial||U.isMeshStandardMaterial||U.isShadowMaterial||U.isShaderMaterial&&U.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(U,te,de){const ce=w.get(U);ce.__autoAllocateDepthBuffer=U.resolveDepthBuffer===!1,ce.__autoAllocateDepthBuffer===!1&&(ce.__useRenderToTexture=!1),w.get(U.texture).__webglTexture=te,w.get(U.depthTexture).__webglTexture=ce.__autoAllocateDepthBuffer?void 0:de,ce.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(U,te){const de=w.get(U);de.__webglFramebuffer=te,de.__useDefaultFramebuffer=te===void 0};const Ua=j.createFramebuffer();this.setRenderTarget=function(U,te=0,de=0){$=U,k=te,X=de;let ce=null,ie=!1,Ue=!1;if(U){const Ne=w.get(U);if(Ne.__useDefaultFramebuffer!==void 0){Ye.bindFramebuffer(j.FRAMEBUFFER,Ne.__webglFramebuffer),I.copy(U.viewport),B.copy(U.scissor),se=U.scissorTest,Ye.viewport(I),Ye.scissor(B),Ye.setScissorTest(se),K=-1;return}else if(Ne.__webglFramebuffer===void 0)J.setupRenderTarget(U);else if(Ne.__hasExternalTextures)J.rebindTextures(U,w.get(U.texture).__webglTexture,w.get(U.depthTexture).__webglTexture);else if(U.depthBuffer){const ot=U.depthTexture;if(Ne.__boundDepthTexture!==ot){if(ot!==null&&w.has(ot)&&(U.width!==ot.image.width||U.height!==ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(U)}}const je=U.texture;(je.isData3DTexture||je.isDataArrayTexture||je.isCompressedArrayTexture)&&(Ue=!0);const Ze=w.get(U).__webglFramebuffer;U.isWebGLCubeRenderTarget?(Array.isArray(Ze[te])?ce=Ze[te][de]:ce=Ze[te],ie=!0):U.samples>0&&J.useMultisampledRTT(U)===!1?ce=w.get(U).__webglMultisampledFramebuffer:Array.isArray(Ze)?ce=Ze[de]:ce=Ze,I.copy(U.viewport),B.copy(U.scissor),se=U.scissorTest}else I.copy(ee).multiplyScalar(ge).floor(),B.copy(Me).multiplyScalar(ge).floor(),se=Se;if(de!==0&&(ce=Ua),Ye.bindFramebuffer(j.FRAMEBUFFER,ce)&&Ye.drawBuffers(U,ce),Ye.viewport(I),Ye.scissor(B),Ye.setScissorTest(se),ie){const Ne=w.get(U.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne.__webglTexture,de)}else if(Ue){const Ne=te;for(let je=0;je<U.textures.length;je++){const Ze=w.get(U.textures[je]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+je,Ze.__webglTexture,de,Ne)}}else if(U!==null&&de!==0){const Ne=w.get(U.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,Ne.__webglTexture,de)}K=-1},this.readRenderTargetPixels=function(U,te,de,ce,ie,Ue,He,Ne=0){if(!(U&&U.isWebGLRenderTarget)){wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let je=w.get(U).__webglFramebuffer;if(U.isWebGLCubeRenderTarget&&He!==void 0&&(je=je[He]),je){Ye.bindFramebuffer(j.FRAMEBUFFER,je);try{const Ze=U.textures[Ne],ot=Ze.format,lt=Ze.type;if(U.textures.length>1&&j.readBuffer(j.COLOR_ATTACHMENT0+Ne),!Lt.textureFormatReadable(ot)){wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Lt.textureTypeReadable(lt)){wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}te>=0&&te<=U.width-ce&&de>=0&&de<=U.height-ie&&j.readPixels(te,de,ce,ie,Ce.convert(ot),Ce.convert(lt),Ue)}finally{const Ze=$!==null?w.get($).__webglFramebuffer:null;Ye.bindFramebuffer(j.FRAMEBUFFER,Ze)}}},this.readRenderTargetPixelsAsync=async function(U,te,de,ce,ie,Ue,He,Ne=0){if(!(U&&U.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let je=w.get(U).__webglFramebuffer;if(U.isWebGLCubeRenderTarget&&He!==void 0&&(je=je[He]),je)if(te>=0&&te<=U.width-ce&&de>=0&&de<=U.height-ie){Ye.bindFramebuffer(j.FRAMEBUFFER,je);const Ze=U.textures[Ne],ot=Ze.format,lt=Ze.type;if(U.textures.length>1&&j.readBuffer(j.COLOR_ATTACHMENT0+Ne),!Lt.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Lt.textureTypeReadable(lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ke=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,ke),j.bufferData(j.PIXEL_PACK_BUFFER,Ue.byteLength,j.STREAM_READ),j.readPixels(te,de,ce,ie,Ce.convert(ot),Ce.convert(lt),0);const Ot=$!==null?w.get($).__webglFramebuffer:null;Ye.bindFramebuffer(j.FRAMEBUFFER,Ot);const nn=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await BE(j,nn,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,ke),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,Ue),j.deleteBuffer(ke),j.deleteSync(nn),Ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(U,te=null,de=0){const ce=Math.pow(2,-de),ie=Math.floor(U.image.width*ce),Ue=Math.floor(U.image.height*ce),He=te!==null?te.x:0,Ne=te!==null?te.y:0;J.setTexture2D(U,0),j.copyTexSubImage2D(j.TEXTURE_2D,de,0,0,He,Ne,ie,Ue),Ye.unbindTexture()};const Pu=j.createFramebuffer(),Cl=j.createFramebuffer();this.copyTextureToTexture=function(U,te,de=null,ce=null,ie=0,Ue=0){let He,Ne,je,Ze,ot,lt,ke,Ot,nn;const qt=U.isCompressedTexture?U.mipmaps[Ue]:U.image;if(de!==null)He=de.max.x-de.min.x,Ne=de.max.y-de.min.y,je=de.isBox3?de.max.z-de.min.z:1,Ze=de.min.x,ot=de.min.y,lt=de.isBox3?de.min.z:0;else{const Jt=Math.pow(2,-ie);He=Math.floor(qt.width*Jt),Ne=Math.floor(qt.height*Jt),U.isDataArrayTexture?je=qt.depth:U.isData3DTexture?je=Math.floor(qt.depth*Jt):je=1,Ze=0,ot=0,lt=0}ce!==null?(ke=ce.x,Ot=ce.y,nn=ce.z):(ke=0,Ot=0,nn=0);const Pt=Ce.convert(te.format),cn=Ce.convert(te.type);let Ke;te.isData3DTexture?(J.setTexture3D(te,0),Ke=j.TEXTURE_3D):te.isDataArrayTexture||te.isCompressedArrayTexture?(J.setTexture2DArray(te,0),Ke=j.TEXTURE_2D_ARRAY):(J.setTexture2D(te,0),Ke=j.TEXTURE_2D),j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,te.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,te.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,te.unpackAlignment);const Zt=j.getParameter(j.UNPACK_ROW_LENGTH),Mt=j.getParameter(j.UNPACK_IMAGE_HEIGHT),Xn=j.getParameter(j.UNPACK_SKIP_PIXELS),Wn=j.getParameter(j.UNPACK_SKIP_ROWS),qn=j.getParameter(j.UNPACK_SKIP_IMAGES);j.pixelStorei(j.UNPACK_ROW_LENGTH,qt.width),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,qt.height),j.pixelStorei(j.UNPACK_SKIP_PIXELS,Ze),j.pixelStorei(j.UNPACK_SKIP_ROWS,ot),j.pixelStorei(j.UNPACK_SKIP_IMAGES,lt);const ia=U.isDataArrayTexture||U.isData3DTexture,zt=te.isDataArrayTexture||te.isData3DTexture;if(U.isDepthTexture){const Jt=w.get(U),Oi=w.get(te),un=w.get(Jt.__renderTarget),Mi=w.get(Oi.__renderTarget);Ye.bindFramebuffer(j.READ_FRAMEBUFFER,un.__webglFramebuffer),Ye.bindFramebuffer(j.DRAW_FRAMEBUFFER,Mi.__webglFramebuffer);for(let Pi=0;Pi<je;Pi++)ia&&(j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,w.get(U).__webglTexture,ie,lt+Pi),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,w.get(te).__webglTexture,Ue,nn+Pi)),j.blitFramebuffer(Ze,ot,He,Ne,ke,Ot,He,Ne,j.DEPTH_BUFFER_BIT,j.NEAREST);Ye.bindFramebuffer(j.READ_FRAMEBUFFER,null),Ye.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(ie!==0||U.isRenderTargetTexture||w.has(U)){const Jt=w.get(U),Oi=w.get(te);Ye.bindFramebuffer(j.READ_FRAMEBUFFER,Pu),Ye.bindFramebuffer(j.DRAW_FRAMEBUFFER,Cl);for(let un=0;un<je;un++)ia?j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Jt.__webglTexture,ie,lt+un):j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,Jt.__webglTexture,ie),zt?j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Oi.__webglTexture,Ue,nn+un):j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,Oi.__webglTexture,Ue),ie!==0?j.blitFramebuffer(Ze,ot,He,Ne,ke,Ot,He,Ne,j.COLOR_BUFFER_BIT,j.NEAREST):zt?j.copyTexSubImage3D(Ke,Ue,ke,Ot,nn+un,Ze,ot,He,Ne):j.copyTexSubImage2D(Ke,Ue,ke,Ot,Ze,ot,He,Ne);Ye.bindFramebuffer(j.READ_FRAMEBUFFER,null),Ye.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else zt?U.isDataTexture||U.isData3DTexture?j.texSubImage3D(Ke,Ue,ke,Ot,nn,He,Ne,je,Pt,cn,qt.data):te.isCompressedArrayTexture?j.compressedTexSubImage3D(Ke,Ue,ke,Ot,nn,He,Ne,je,Pt,qt.data):j.texSubImage3D(Ke,Ue,ke,Ot,nn,He,Ne,je,Pt,cn,qt):U.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,Ue,ke,Ot,He,Ne,Pt,cn,qt.data):U.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,Ue,ke,Ot,qt.width,qt.height,Pt,qt.data):j.texSubImage2D(j.TEXTURE_2D,Ue,ke,Ot,He,Ne,Pt,cn,qt);j.pixelStorei(j.UNPACK_ROW_LENGTH,Zt),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,Mt),j.pixelStorei(j.UNPACK_SKIP_PIXELS,Xn),j.pixelStorei(j.UNPACK_SKIP_ROWS,Wn),j.pixelStorei(j.UNPACK_SKIP_IMAGES,qn),Ue===0&&te.generateMipmaps&&j.generateMipmap(Ke),Ye.unbindTexture()},this.initRenderTarget=function(U){w.get(U).__webglFramebuffer===void 0&&J.setupRenderTarget(U)},this.initTexture=function(U){U.isCubeTexture?J.setTextureCube(U,0):U.isData3DTexture?J.setTexture3D(U,0):U.isDataArrayTexture||U.isCompressedArrayTexture?J.setTexture2DArray(U,0):J.setTexture2D(U,0),Ye.unbindTexture()},this.resetState=function(){k=0,X=0,$=null,Ye.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Rt._getDrawingBufferColorSpace(e),n.unpackColorSpace=Rt._getUnpackColorSpace()}}function BC(a){let e;switch(a.type){case"sphere":e=new Zp(.5,32,32);break;case"cylinder":e=new yl(.5,.5,1,32);break;case"plane":e=new no(4,4);break;case"cone":e=new Yp(.5,1,32);break;case"torus":e=new Kp(.5,.2,16,100);break;case"character":e=new qp(.3,.8,4,16);break;case"pillar":e=new yl(.2,.2,2,16);break;default:e=new to(1,1,1)}const n=new Jx({color:new yt(a.color),roughness:.6,metalness:.1}),r=new Ui(e,n);return r.name=a.id,r.position.set(...a.transform.position),r.rotation.set(js.degToRad(a.transform.rotation[0]),js.degToRad(a.transform.rotation[1]),js.degToRad(a.transform.rotation[2])),r.scale.set(...a.transform.scale),a.type==="plane"&&(r.rotation.x=-Math.PI/2),r.castShadow=!0,r.receiveShadow=!0,r}class HC extends q.Component{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}render(){return this.state.hasError?this.props.fallback:this.props.children}}function Z_(){const{project:a,selectedObjectId:e,setSelectedObject:n}=On();return z.jsxs("div",{className:"w-full h-full relative overflow-hidden bg-[#0a1628]",children:[z.jsx("div",{className:"absolute inset-0",style:{backgroundImage:"radial-gradient(circle at 50% 50%, #0f2040 0%, #070f1c 100%)"},children:z.jsx("div",{className:"absolute inset-0",style:{backgroundImage:"linear-gradient(rgba(30,58,95,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,95,0.3) 1px, transparent 1px)",backgroundSize:"50px 50px"}})}),z.jsxs("div",{className:"relative z-10 w-full h-full flex flex-col",children:[z.jsxs("div",{className:"absolute top-3 left-3 bg-black/60 text-xs text-gray-300 px-2 py-1 rounded font-mono flex items-center gap-2",children:[z.jsx("span",{className:"w-2 h-2 rounded-full bg-blue-400 animate-pulse"}),"3D Scene · ",a.objects.length," objects"]}),z.jsx("div",{className:"flex-1 flex items-center justify-center p-6",children:a.objects.length===0?z.jsxs("div",{className:"text-center",children:[z.jsx("div",{className:"text-6xl mb-4 opacity-20",children:"🎮"}),z.jsx("div",{className:"text-gray-500 text-sm",children:"Empty scene"}),z.jsx("div",{className:"text-gray-600 text-xs mt-1",children:"Add objects from the Marketplace →"})]}):z.jsx("div",{className:"flex flex-wrap gap-3 justify-center max-w-2xl",children:a.objects.filter(r=>r.visible).map(r=>{const o=r.id===e;return z.jsxs("div",{onClick:()=>n(o?null:r.id),className:"flex flex-col items-center gap-1.5 p-3 rounded-xl cursor-pointer transition-all",style:{background:o?r.color+"22":"rgba(255,255,255,0.04)",border:`2px solid ${o?r.color:"rgba(255,255,255,0.08)"}`,minWidth:80},children:[z.jsx("div",{className:"w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg",style:{background:`linear-gradient(135deg, ${r.color}44, ${r.color}22)`,color:r.color},children:r.type==="sphere"?"●":r.type==="character"?"♟":r.type==="cone"?"▲":r.type==="torus"?"◎":"■"}),z.jsx("div",{className:"text-xs text-gray-300 text-center truncate max-w-16",children:r.name}),z.jsx("div",{className:"text-xs text-gray-600 capitalize",children:r.type})]},r.id)})})})]}),z.jsxs("div",{className:"absolute bottom-3 right-3 text-xs text-gray-600 font-mono",children:[a.objects.length," objects · 3D renders in browser"]})]})}function kC(){try{const a=document.createElement("canvas");return!!(a.getContext("webgl")||a.getContext("experimental-webgl"))}catch{return!1}}function GC(){const a=q.useRef(null),e=q.useRef(null),n=q.useRef(null),r=q.useRef(null),o=q.useRef(new Map),c=q.useRef({theta:Math.PI/4,phi:Math.PI/3,radius:14}),f=q.useRef(new VT),h=q.useRef({x:0,y:0,down:!1,button:0}),m=q.useRef(!1),d=q.useRef({x:0,y:0}),[g,b]=q.useState(null),{project:_,selectedObjectId:y,setSelectedObject:S}=On(),A=q.useCallback(()=>{const x=n.current;if(!x)return;const v=o.current,T=new Set(_.objects.map(C=>C.id));v.forEach((C,R)=>{T.has(R)||(x.remove(C),C.geometry.dispose(),C.material.dispose(),v.delete(R))}),_.objects.forEach(C=>{if(!C.visible){const F=v.get(C.id);F&&(F.visible=!1);return}let R=v.get(C.id);R?(R.visible=!0,R.position.set(...C.transform.position),R.rotation.set(js.degToRad(C.transform.rotation[0]),js.degToRad(C.transform.rotation[1]),js.degToRad(C.transform.rotation[2])),R.scale.set(...C.transform.scale),R.material.color.set(C.color)):(R=BC(C),x.add(R),v.set(C.id,R));const P=C.id===y,O=C.id===g;R.material.emissive.set(P?"#1d4ed8":O?"#374151":"#000000"),R.material.emissiveIntensity=P?.4:O?.2:0})},[_.objects,y,g]);return q.useEffect(()=>{const x=a.current;if(!x)return;let v;try{v=new zC({antialias:!0,alpha:!1})}catch{return}v.setPixelRatio(Math.min(window.devicePixelRatio,2)),v.shadowMap.enabled=!0,v.shadowMap.type=Tx,v.toneMapping=Up,v.toneMappingExposure=1,x.appendChild(v.domElement),e.current=v;const T=new gT;T.background=new yt("#0f172a"),T.fog=new jp("#0f172a",30,60),n.current=T;const C=new yi(60,x.clientWidth/x.clientHeight,.1,200);r.current=C,T.add(new HT(16777215,.5));const R=new BT(16777215,1.5);R.position.set(8,16,8),R.castShadow=!0,R.shadow.mapSize.width=2048,R.shadow.mapSize.height=2048,R.shadow.camera.near=.5,R.shadow.camera.far=100,R.shadow.camera.left=-20,R.shadow.camera.right=20,R.shadow.camera.top=20,R.shadow.camera.bottom=-20,T.add(R),T.add(new IT(9163775,4008735,.3)),T.add(new jT(40,40,"#1e3a5f","#1e293b"));const P=new no(40,40),O=new Jx({color:"#0f1e35",roughness:1,metalness:0}),F=new Ui(P,O);F.rotation.x=-Math.PI/2,F.receiveShadow=!0,F.name="__ground__",T.add(F);const E=()=>{!x||!v||!C||(v.setSize(x.clientWidth,x.clientHeight),C.aspect=x.clientWidth/x.clientHeight,C.updateProjectionMatrix())};E();const D=new ResizeObserver(E);D.observe(x);const Y=()=>{const{theta:B,phi:se,radius:he}=c.current;C.position.x=he*Math.sin(se)*Math.sin(B),C.position.y=he*Math.cos(se),C.position.z=he*Math.sin(se)*Math.cos(B),C.lookAt(0,1,0)};Y();let k=0;const X=()=>{k=requestAnimationFrame(X),Y(),v.render(T,C)};X();const $=B=>{h.current={x:B.clientX,y:B.clientY,down:!0,button:B.button},d.current={x:B.clientX,y:B.clientY},m.current=!1},K=B=>{if(!h.current.down){const le=x.getBoundingClientRect(),ge=(B.clientX-le.left)/le.width*2-1,we=-((B.clientY-le.top)/le.height)*2+1;f.current.setFromCamera({x:ge,y:we},C);const Le=Array.from(o.current.values()),ee=f.current.intersectObjects(Le);b(ee.length>0?ee[0].object.name:null);return}const se=B.clientX-h.current.x,he=B.clientY-h.current.y,L=Math.abs(B.clientX-d.current.x),Q=Math.abs(B.clientY-d.current.y);(L>4||Q>4)&&(m.current=!0),h.current.x=B.clientX,h.current.y=B.clientY,(h.current.button===2||h.current.button===1)&&(c.current.theta-=se*.005,c.current.phi=Math.max(.1,Math.min(Math.PI-.1,c.current.phi+he*.005)))},V=B=>{if(h.current.down=!1,!m.current&&h.current.button===0){const se=x.getBoundingClientRect(),he=(B.clientX-se.left)/se.width*2-1,L=-((B.clientY-se.top)/se.height)*2+1;f.current.setFromCamera({x:he,y:L},C);const Q=Array.from(o.current.values()),le=f.current.intersectObjects(Q);le.length>0?S(le[0].object.name):S(null)}m.current=!1},I=B=>{c.current.radius=Math.max(3,Math.min(40,c.current.radius+B.deltaY*.02))};return x.addEventListener("mousedown",$),window.addEventListener("mousemove",K),window.addEventListener("mouseup",V),x.addEventListener("wheel",I,{passive:!0}),x.addEventListener("contextmenu",B=>B.preventDefault()),()=>{cancelAnimationFrame(k),D.disconnect(),x.removeEventListener("mousedown",$),window.removeEventListener("mousemove",K),window.removeEventListener("mouseup",V),x.removeEventListener("wheel",I),v.dispose(),x.contains(v.domElement)&&x.removeChild(v.domElement)}},[]),q.useEffect(()=>{A()},[A]),z.jsxs("div",{ref:a,className:"w-full h-full relative",style:{cursor:g?"pointer":"default"},children:[z.jsx("div",{className:"absolute top-3 left-3 flex gap-2 pointer-events-none",children:z.jsx("div",{className:"bg-black/60 text-xs text-gray-300 px-2 py-1 rounded font-mono",children:"3D Mode · Right-drag: orbit · Scroll: zoom"})}),z.jsxs("div",{className:"absolute bottom-3 right-3 pointer-events-none text-xs text-gray-500 font-mono",children:[_.objects.length," objects"]})]})}function VC(){return kC()?z.jsx(HC,{fallback:z.jsx(Z_,{}),children:z.jsx(GC,{})}):z.jsx(Z_,{})}const Sp={cube:(a,e,n)=>{const[r,,o]=e.transform.position,[c,,f]=e.transform.scale,h=60*c,m=60*f;a.fillStyle=e.color,a.strokeStyle=n?"#60a5fa":"rgba(255,255,255,0.15)",a.lineWidth=n?3:1,a.beginPath(),a.roundRect(r-h/2,o-m/2,h,m,4),a.fill(),a.stroke()},sphere:(a,e,n)=>{const[r,,o]=e.transform.position,[c]=e.transform.scale,f=30*c;a.fillStyle=e.color,a.strokeStyle=n?"#60a5fa":"rgba(255,255,255,0.15)",a.lineWidth=n?3:1,a.beginPath(),a.arc(r,o,f,0,Math.PI*2),a.fill(),a.stroke()},cylinder:(a,e,n)=>{const[r,,o]=e.transform.position,[c]=e.transform.scale,f=30*c;a.fillStyle=e.color,a.strokeStyle=n?"#60a5fa":"rgba(255,255,255,0.15)",a.lineWidth=n?3:1,a.beginPath(),a.ellipse(r,o,f,f*.4,0,0,Math.PI*2),a.fill(),a.stroke()}},jC=Sp.cube;function XC(){const a=q.useRef(null),{project:e,selectedObjectId:n,setSelectedObject:r}=On(),o=q.useRef({x:0,y:0}),c=q.useRef(1),f=q.useRef({id:null,startX:0,startY:0,objStartX:0,objStartZ:0}),h=q.useRef(!1),m=q.useRef({x:0,y:0}),{updateObject:d}=On(),g=q.useCallback((y,S,A)=>{const x=(y-A.width/2-o.current.x)/(50*c.current),v=(S-A.height/2-o.current.y)/(50*c.current);return{x,z:v}},[]),b=q.useCallback(()=>{const y=a.current;if(!y)return;const S=y.getContext("2d");if(!S)return;const{width:A,height:x}=y;S.clearRect(0,0,A,x),S.fillStyle="#0f172a",S.fillRect(0,0,A,x);const v=50*c.current,T=(A/2+o.current.x)%v,C=(x/2+o.current.y)%v;S.strokeStyle="#1e293b",S.lineWidth=1;for(let O=T;O<A;O+=v)S.beginPath(),S.moveTo(O,0),S.lineTo(O,x),S.stroke();for(let O=C;O<x;O+=v)S.beginPath(),S.moveTo(0,O),S.lineTo(A,O),S.stroke();S.strokeStyle="#1e3a5f",S.lineWidth=2;const R=A/2+o.current.x,P=x/2+o.current.y;S.beginPath(),S.moveTo(R,0),S.lineTo(R,x),S.stroke(),S.beginPath(),S.moveTo(0,P),S.lineTo(A,P),S.stroke(),S.save(),S.translate(R,P),S.scale(c.current,c.current),e.objects.filter(O=>O.visible).forEach(O=>{const F=O.id===n;Sp[O.type],{...S,fillStyle:O.color};const[E,,D]=O.transform.position,[Y,,k]=O.transform.scale;S.save(),F&&(S.shadowColor="#60a5fa",S.shadowBlur=12),S.fillStyle=O.color,S.strokeStyle=F?"#60a5fa":"rgba(255,255,255,0.15)",S.lineWidth=F?3/c.current:1/c.current;const X=60*Y,$=60*k,K=Sp[O.type];K?K(S,{...O,transform:{...O.transform,position:[E*50,0,D*50]}},F):(S.beginPath(),S.roundRect(E*50-X/2,D*50-$/2,X,$,4),S.fill(),S.stroke()),S.restore(),S.fillStyle="rgba(255,255,255,0.7)",S.font=`${Math.max(10,12/c.current)}px Inter, sans-serif`,S.textAlign="center",S.fillText(O.name,E*50,D*50+40*k)}),S.restore(),S.fillStyle="#64748b",S.font="11px Inter, sans-serif",S.textAlign="left",S.fillText("2D Top View · Scroll: zoom · Right-drag: pan",12,x-12)},[e.objects,n]);q.useEffect(()=>{const y=a.current;if(!y)return;const S=()=>{const x=y.parentElement.getBoundingClientRect();y.width=x.width,y.height=x.height,b()};S();const A=new ResizeObserver(S);return A.observe(y.parentElement),()=>A.disconnect()},[b]),q.useEffect(()=>{b()},[b]);const _=q.useCallback((y,S,A)=>{const x=g(y,S,A);for(let v=e.objects.length-1;v>=0;v--){const T=e.objects[v];if(!T.visible)continue;const[C,,R]=T.transform.position,[P,,O]=T.transform.scale,F=30*P,E=30*O;if(Math.abs(x.x-C)<F/50&&Math.abs(x.z-R)<E/50)return T}return null},[e.objects,g]);return q.useEffect(()=>{const y=a.current;if(!y)return;const S=T=>{const C=y.getBoundingClientRect(),R=T.clientX-C.left,P=T.clientY-C.top;if(T.button===2){h.current=!0,m.current={x:T.clientX-o.current.x,y:T.clientY-o.current.y};return}const O=_(R,P,y);O?(r(O.id),g(R,P,y),f.current={id:O.id,startX:R,startY:P,objStartX:O.transform.position[0],objStartZ:O.transform.position[2]}):(r(null),f.current={id:null,startX:0,startY:0,objStartX:0,objStartZ:0})},A=T=>{if(h.current){o.current={x:T.clientX-m.current.x,y:T.clientY-m.current.y},b();return}if(f.current.id){const C=y.getBoundingClientRect(),R=T.clientX-C.left,P=T.clientY-C.top,O=g(R,P,y),F=g(f.current.startX,f.current.startY,y),E=O.x-F.x,D=O.z-F.z;d(f.current.id,{transform:{position:[f.current.objStartX+E,1,f.current.objStartZ+D],rotation:[0,0,0],scale:[1,1,1]}}),b()}},x=()=>{h.current=!1,f.current.id=null},v=T=>{T.preventDefault(),c.current=Math.max(.2,Math.min(4,c.current*(T.deltaY>0?.9:1.1))),b()};return y.addEventListener("mousedown",S),window.addEventListener("mousemove",A),window.addEventListener("mouseup",x),y.addEventListener("wheel",v,{passive:!1}),y.addEventListener("contextmenu",T=>T.preventDefault()),()=>{y.removeEventListener("mousedown",S),window.removeEventListener("mousemove",A),window.removeEventListener("mouseup",x),y.removeEventListener("wheel",v)}},[_,b,r,d,g]),z.jsx("div",{className:"w-full h-full relative",children:z.jsx("canvas",{ref:a,className:"w-full h-full block"})})}const WC={Events:{color:"#f59e0b",blocks:[{type:"event_start",label:"When Game Starts"},{type:"event_key",label:"When Key Pressed"},{type:"event_click",label:"When Object Clicked"}]},Actions:{color:"#3b82f6",blocks:[{type:"action_move",label:"Move Object"},{type:"action_rotate",label:"Rotate Object"},{type:"action_scale",label:"Scale Object"},{type:"action_color",label:"Change Color"},{type:"action_print",label:"Print Message"},{type:"action_destroy",label:"Destroy Object"},{type:"action_spawn",label:"Spawn Object"}]},Control:{color:"#10b981",blocks:[{type:"control_if",label:"If Condition"},{type:"control_loop",label:"Repeat"},{type:"control_wait",label:"Wait"}]},Variables:{color:"#8b5cf6",blocks:[{type:"variable_set",label:"Set Variable"},{type:"variable_get",label:"Get Variable"}]},Math:{color:"#ec4899",blocks:[{type:"math_add",label:"Add Numbers"},{type:"math_random",label:"Random Number"},{type:"logic_compare",label:"Compare"}]}},sy={event_start:"#f59e0b",event_key:"#d97706",event_click:"#b45309",action_move:"#3b82f6",action_rotate:"#2563eb",action_scale:"#1d4ed8",action_color:"#7c3aed",action_print:"#4338ca",action_destroy:"#dc2626",action_spawn:"#0ea5e9",control_if:"#10b981",control_loop:"#059669",control_wait:"#047857",variable_set:"#8b5cf6",variable_get:"#7c3aed",math_add:"#ec4899",math_random:"#db2777",logic_compare:"#be185d"};function qC({block:a}){const{selectedBlockId:e,setSelectedBlock:n,removeBlock:r,updateBlock:o,updateBlockParam:c,project:f}=On(),h=a.id===e,m=q.useRef(null),d=q.useRef({mx:0,my:0,bx:0,by:0}),g=q.useRef(!1),b=sy[a.type]||"#3b82f6",_=q.useCallback(y=>{if(y.target.closest("input, select"))return;y.stopPropagation(),n(a.id),d.current={mx:y.clientX,my:y.clientY,bx:a.x,by:a.y},g.current=!1;const S=x=>{const v=x.clientX-d.current.mx,T=x.clientY-d.current.my;(Math.abs(v)>3||Math.abs(T)>3)&&(g.current=!0),o(a.id,{x:d.current.bx+v,y:d.current.by+T})},A=()=>{window.removeEventListener("mousemove",S),window.removeEventListener("mouseup",A)};window.addEventListener("mousemove",S),window.addEventListener("mouseup",A)},[a.id,a.x,a.y,n,o]);return z.jsxs("div",{ref:m,className:`absolute rounded-lg border select-none ${h?"ring-2 ring-blue-400":""}`,style:{left:a.x,top:a.y,minWidth:220,backgroundColor:b+"22",borderColor:b+"66",cursor:"grab",zIndex:h?10:1},onMouseDown:_,onClick:()=>n(a.id),children:[z.jsxs("div",{className:"flex items-center justify-between px-3 py-2 rounded-t-lg",style:{backgroundColor:b},children:[z.jsx("span",{className:"text-xs font-bold text-white",children:a.label||a.type}),z.jsx("button",{onClick:y=>{y.stopPropagation(),r(a.id)},className:"text-white/70 hover:text-white",children:z.jsx(Ex,{size:12})})]}),z.jsx("div",{className:"px-3 py-2 space-y-1.5",children:a.params.map(y=>z.jsxs("div",{className:"flex items-center gap-2",children:[z.jsx("span",{className:"text-xs text-gray-400 w-14 shrink-0 capitalize",children:y.name}),y.type==="color"?z.jsxs("div",{className:"flex gap-1 items-center",children:[z.jsx("input",{type:"color",value:String(y.value),onChange:S=>c(a.id,y.name,S.target.value),className:"w-6 h-5 rounded border-0 cursor-pointer"}),z.jsx("span",{className:"text-xs text-gray-300 font-mono",children:String(y.value)})]}):y.options?z.jsxs("select",{className:"flex-1 bg-black/30 border border-white/20 rounded px-1 py-0.5 text-xs text-white",value:String(y.value),onChange:S=>c(a.id,y.name,S.target.value),children:[y.options.map(S=>z.jsx("option",{value:S,children:S},S)),y.type==="object"&&f.objects.map(S=>z.jsx("option",{value:S.name,children:S.name},S.id))]}):y.type==="object"?z.jsxs("select",{className:"flex-1 bg-black/30 border border-white/20 rounded px-1 py-0.5 text-xs text-white",value:String(y.value),onChange:S=>c(a.id,y.name,S.target.value),children:[z.jsx("option",{value:"",children:"-- object --"}),f.objects.map(S=>z.jsx("option",{value:S.name,children:S.name},S.id))]}):z.jsx("input",{type:y.type==="number"?"number":"text",className:"flex-1 bg-black/30 border border-white/20 rounded px-2 py-0.5 text-xs text-white",value:String(y.value),onChange:S=>c(a.id,y.name,y.type==="number"?Number(S.target.value):S.target.value)})]},y.name))})]})}function YC(){const{project:a,addBlock:e,removeBlock:n,isPlaying:r,setPlaying:o}=On(),[c,f]=q.useState("Events"),[h,m]=q.useState(["Block Editor ready. Click blocks to add them to the canvas."]),d=q.useRef(null),g=y=>{const S=d.current;if(!S){e(y);return}const x=S.getBoundingClientRect().width/2-110+(Math.random()-.5)*80,v=60+Math.random()*100;e(y,x,v),m(T=>[...T,`Added block: ${y}`].slice(-20))},b=()=>{o(!r),m(r?y=>[...y,"■ Game stopped."].slice(-20):y=>[...y,"▶ Game started!",...a.blocks.filter(S=>S.type==="event_start").map(S=>"  → Triggered: When Game Starts")].slice(-20))},_=()=>{const y=ZC(a.blocks);m(S=>[...S,"--- Generated Code ---",...y.split(`
`).slice(0,10)].slice(-30))};return z.jsxs("div",{className:"flex h-full",children:[z.jsx("div",{className:"w-48 shrink-0 border-r border-white/10 overflow-y-auto",children:z.jsxs("div",{className:"p-2",children:[z.jsx("div",{className:"text-xs text-gray-400 uppercase font-semibold tracking-wider mb-2",children:"Block Library"}),Object.entries(WC).map(([y,S])=>z.jsxs("div",{className:"mb-1",children:[z.jsxs("button",{className:"w-full flex items-center justify-between px-2 py-1.5 rounded text-xs font-bold text-left transition-colors hover:bg-white/5",style:{color:S.color},onClick:()=>f(c===y?null:y),children:[y,z.jsx("span",{className:"text-gray-500 text-xs",children:c===y?"▾":"▸"})]}),c===y&&z.jsx("div",{className:"ml-2 space-y-0.5 mt-0.5",children:S.blocks.map(A=>z.jsxs("button",{onClick:()=>g(A.type),className:"w-full flex items-center gap-1.5 px-2 py-1 rounded text-xs text-gray-300 hover:bg-white/5 text-left transition-colors",children:[z.jsx("span",{className:"w-2 h-2 rounded-sm shrink-0",style:{backgroundColor:sy[A.type]}}),A.label]},A.type))})]},y))]})}),z.jsxs("div",{className:"flex-1 flex flex-col min-w-0",children:[z.jsxs("div",{className:"flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-black/20",children:[z.jsx("button",{onClick:b,className:`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${r?"bg-red-600 hover:bg-red-700 text-white":"bg-green-600 hover:bg-green-700 text-white"}`,children:r?z.jsxs(z.Fragment,{children:[z.jsx(Sx,{size:11})," Stop"]}):z.jsxs(z.Fragment,{children:[z.jsx(Dp,{size:11})," Run"]})}),z.jsx("button",{onClick:_,className:"flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-white/5 hover:bg-white/10 text-gray-300 transition-colors",children:"View Code"}),z.jsxs("button",{onClick:()=>{a.blocks.forEach(y=>n(y.id)),m(["Workspace cleared"])},className:"flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors",children:[z.jsx(Mx,{size:11})," Clear All"]}),z.jsxs("span",{className:"ml-auto text-xs text-gray-500",children:[a.blocks.length," blocks"]})]}),z.jsxs("div",{ref:d,className:"flex-1 relative overflow-hidden block-workspace",style:{background:"radial-gradient(circle at 50% 50%, #0f1729 0%, #070f1c 100%)"},children:[a.blocks.length===0&&z.jsx("div",{className:"absolute inset-0 flex items-center justify-center text-gray-600 text-sm pointer-events-none",children:z.jsxs("div",{className:"text-center",children:[z.jsx("div",{className:"text-4xl mb-3",children:"🧩"}),z.jsx("div",{children:"Add blocks from the left panel"}),z.jsx("div",{className:"text-xs mt-1",children:"Drag them around to arrange"})]})}),a.blocks.map(y=>z.jsx(qC,{block:y},y.id))]}),z.jsxs("div",{className:"h-28 border-t border-white/10 bg-black/40 overflow-y-auto",children:[z.jsx("div",{className:"px-3 py-1.5 text-xs text-gray-500 uppercase font-semibold border-b border-white/5",children:"Console"}),z.jsx("div",{className:"px-3 py-1 space-y-0.5 font-mono",children:h.map((y,S)=>z.jsx("div",{className:"text-xs text-gray-400",children:y},S))})]})]})]})}function ZC(a){const e=["// Auto-generated from Block Editor",""];return a.forEach(n=>{switch(n.type){case"event_start":e.push("function onStart() {","  // Game started","}","");break;case"event_key":{const r=n.params.find(o=>o.name==="key")?.value||"Space";e.push("function onKeyDown(key) {",`  if (key === "${r}") {`,"    // Key pressed","  }","}","");break}case"action_move":{const r=n.params.find(h=>h.name==="object")?.value||"object",o=n.params.find(h=>h.name==="x")?.value??0,c=n.params.find(h=>h.name==="y")?.value??0,f=n.params.find(h=>h.name==="z")?.value??0;e.push(`objects.get("${r}").position.add(${o}, ${c}, ${f});`);break}case"action_print":{const r=n.params.find(o=>o.name==="message")?.value||"";e.push(`console.log("${r}");`);break}case"control_loop":{const r=n.params.find(o=>o.name==="times")?.value??10;e.push(`for (let i = 0; i < ${r}; i++) {`,"  // Loop body","}","");break}case"control_wait":{const r=n.params.find(o=>o.name==="seconds")?.value??1;e.push(`await wait(${r});`);break}default:e.push(`// ${n.type}`)}}),e.join(`
`)}function K_(a,e){(e==null||e>a.length)&&(e=a.length);for(var n=0,r=Array(e);n<e;n++)r[n]=a[n];return r}function KC(a){if(Array.isArray(a))return a}function QC(a,e,n){return(e=a3(e))in a?Object.defineProperty(a,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):a[e]=n,a}function JC(a,e){var n=a==null?null:typeof Symbol<"u"&&a[Symbol.iterator]||a["@@iterator"];if(n!=null){var r,o,c,f,h=[],m=!0,d=!1;try{if(c=(n=n.call(a)).next,e!==0)for(;!(m=(r=c.call(n)).done)&&(h.push(r.value),h.length!==e);m=!0);}catch(g){d=!0,o=g}finally{try{if(!m&&n.return!=null&&(f=n.return(),Object(f)!==f))return}finally{if(d)throw o}}return h}}function $C(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Q_(a,e){var n=Object.keys(a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(a);e&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(a,o).enumerable})),n.push.apply(n,r)}return n}function J_(a){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Q_(Object(n),!0).forEach(function(r){QC(a,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(n)):Q_(Object(n)).forEach(function(r){Object.defineProperty(a,r,Object.getOwnPropertyDescriptor(n,r))})}return a}function e3(a,e){if(a==null)return{};var n,r,o=t3(a,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(a);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)===-1&&{}.propertyIsEnumerable.call(a,n)&&(o[n]=a[n])}return o}function t3(a,e){if(a==null)return{};var n={};for(var r in a)if({}.hasOwnProperty.call(a,r)){if(e.indexOf(r)!==-1)continue;n[r]=a[r]}return n}function n3(a,e){return KC(a)||JC(a,e)||r3(a,e)||$C()}function i3(a,e){if(typeof a!="object"||!a)return a;var n=a[Symbol.toPrimitive];if(n!==void 0){var r=n.call(a,e);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(a)}function a3(a){var e=i3(a,"string");return typeof e=="symbol"?e:e+""}function r3(a,e){if(a){if(typeof a=="string")return K_(a,e);var n={}.toString.call(a).slice(8,-1);return n==="Object"&&a.constructor&&(n=a.constructor.name),n==="Map"||n==="Set"?Array.from(a):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?K_(a,e):void 0}}function s3(a,e,n){return e in a?Object.defineProperty(a,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):a[e]=n,a}function $_(a,e){var n=Object.keys(a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(a);e&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(a,o).enumerable})),n.push.apply(n,r)}return n}function ex(a){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?$_(Object(n),!0).forEach(function(r){s3(a,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(n)):$_(Object(n)).forEach(function(r){Object.defineProperty(a,r,Object.getOwnPropertyDescriptor(n,r))})}return a}function o3(){for(var a=arguments.length,e=new Array(a),n=0;n<a;n++)e[n]=arguments[n];return function(r){return e.reduceRight(function(o,c){return c(o)},r)}}function ul(a){return function e(){for(var n=this,r=arguments.length,o=new Array(r),c=0;c<r;c++)o[c]=arguments[c];return o.length>=a.length?a.apply(this,o):function(){for(var f=arguments.length,h=new Array(f),m=0;m<f;m++)h[m]=arguments[m];return e.apply(n,[].concat(o,h))}}}function wu(a){return{}.toString.call(a).includes("Object")}function l3(a){return!Object.keys(a).length}function bl(a){return typeof a=="function"}function c3(a,e){return Object.prototype.hasOwnProperty.call(a,e)}function u3(a,e){return wu(e)||fr("changeType"),Object.keys(e).some(function(n){return!c3(a,n)})&&fr("changeField"),e}function f3(a){bl(a)||fr("selectorType")}function d3(a){bl(a)||wu(a)||fr("handlerType"),wu(a)&&Object.values(a).some(function(e){return!bl(e)})&&fr("handlersType")}function h3(a){a||fr("initialIsRequired"),wu(a)||fr("initialType"),l3(a)&&fr("initialContent")}function p3(a,e){throw new Error(a[e]||a.default)}var m3={initialIsRequired:"initial state is required",initialType:"initial state should be an object",initialContent:"initial state shouldn't be an empty object",handlerType:"handler should be an object or a function",handlersType:"all handlers should be a functions",selectorType:"selector should be a function",changeType:"provided value of changes should be an object",changeField:'it seams you want to change a field in the state which is not specified in the "initial" state',default:"an unknown error accured in `state-local` package"},fr=ul(p3)(m3),lu={changes:u3,selector:f3,handler:d3,initial:h3};function g3(a){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};lu.initial(a),lu.handler(e);var n={current:a},r=ul(x3)(n,e),o=ul(_3)(n),c=ul(lu.changes)(a),f=ul(v3)(n);function h(){var d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(g){return g};return lu.selector(d),d(n.current)}function m(d){o3(r,o,c,f)(d)}return[h,m]}function v3(a,e){return bl(e)?e(a.current):e}function _3(a,e){return a.current=ex(ex({},a.current),e),e}function x3(a,e,n){return bl(e)?e(a.current):Object.keys(n).forEach(function(r){var o;return(o=e[r])===null||o===void 0?void 0:o.call(e,a.current[r])}),n}var y3={create:g3},b3={paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs"}};function S3(a){return function e(){for(var n=this,r=arguments.length,o=new Array(r),c=0;c<r;c++)o[c]=arguments[c];return o.length>=a.length?a.apply(this,o):function(){for(var f=arguments.length,h=new Array(f),m=0;m<f;m++)h[m]=arguments[m];return e.apply(n,[].concat(o,h))}}}function M3(a){return{}.toString.call(a).includes("Object")}function E3(a){return a||tx("configIsRequired"),M3(a)||tx("configType"),a.urls?(T3(),{paths:{vs:a.urls.monacoBase}}):a}function T3(){console.warn(oy.deprecation)}function A3(a,e){throw new Error(a[e]||a.default)}var oy={configIsRequired:"the configuration object is required",configType:"the configuration object should be an object",default:"an unknown error accured in `@monaco-editor/loader` package",deprecation:`Deprecation warning!
    You are using deprecated way of configuration.

    Instead of using
      monaco.config({ urls: { monacoBase: '...' } })
    use
      monaco.config({ paths: { vs: '...' } })

    For more please check the link https://github.com/suren-atoyan/monaco-loader#config
  `},tx=S3(A3)(oy),w3={config:E3},R3=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return function(o){return n.reduceRight(function(c,f){return f(c)},o)}};function ly(a,e){return Object.keys(e).forEach(function(n){e[n]instanceof Object&&a[n]&&Object.assign(e[n],ly(a[n],e[n]))}),J_(J_({},a),e)}var C3={type:"cancelation",msg:"operation is manually canceled"};function Mh(a){var e=!1,n=new Promise(function(r,o){a.then(function(c){return e?o(C3):r(c)}),a.catch(o)});return n.cancel=function(){return e=!0},n}var D3=["monaco"],N3=y3.create({config:b3,isInitialized:!1,resolve:null,reject:null,monaco:null}),cy=n3(N3,2),El=cy[0],Lu=cy[1];function U3(a){var e=w3.config(a),n=e.monaco,r=e3(e,D3);Lu(function(o){return{config:ly(o.config,r),monaco:n}})}function L3(){var a=El(function(e){var n=e.monaco,r=e.isInitialized,o=e.resolve;return{monaco:n,isInitialized:r,resolve:o}});if(!a.isInitialized){if(Lu({isInitialized:!0}),a.monaco)return a.resolve(a.monaco),Mh(Eh);if(window.monaco&&window.monaco.editor)return uy(window.monaco),a.resolve(window.monaco),Mh(Eh);R3(O3,I3)(F3)}return Mh(Eh)}function O3(a){return document.body.appendChild(a)}function P3(a){var e=document.createElement("script");return a&&(e.src=a),e}function I3(a){var e=El(function(r){var o=r.config,c=r.reject;return{config:o,reject:c}}),n=P3("".concat(e.config.paths.vs,"/loader.js"));return n.onload=function(){return a()},n.onerror=e.reject,n}function F3(){var a=El(function(n){var r=n.config,o=n.resolve,c=n.reject;return{config:r,resolve:o,reject:c}}),e=window.require;e.config(a.config),e(["vs/editor/editor.main"],function(n){var r=n.m||n;uy(r),a.resolve(r)},function(n){a.reject(n)})}function uy(a){El().monaco||Lu({monaco:a})}function z3(){return El(function(a){var e=a.monaco;return e})}var Eh=new Promise(function(a,e){return Lu({resolve:a,reject:e})}),fy={config:U3,init:L3,__getMonacoInstance:z3},B3={wrapper:{display:"flex",position:"relative",textAlign:"initial"},fullWidth:{width:"100%"},hide:{display:"none"}},Th=B3,H3={container:{display:"flex",height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}},k3=H3;function G3({children:a}){return Rn.createElement("div",{style:k3.container},a)}var V3=G3,j3=V3;function X3({width:a,height:e,isEditorReady:n,loading:r,_ref:o,className:c,wrapperProps:f}){return Rn.createElement("section",{style:{...Th.wrapper,width:a,height:e},...f},!n&&Rn.createElement(j3,null,r),Rn.createElement("div",{ref:o,style:{...Th.fullWidth,...!n&&Th.hide},className:c}))}var W3=X3,dy=q.memo(W3);function q3(a){q.useEffect(a,[])}var hy=q3;function Y3(a,e,n=!0){let r=q.useRef(!0);q.useEffect(r.current||!n?()=>{r.current=!1}:a,e)}var li=Y3;function hl(){}function Gs(a,e,n,r){return Z3(a,r)||K3(a,e,n,r)}function Z3(a,e){return a.editor.getModel(py(a,e))}function K3(a,e,n,r){return a.editor.createModel(e,n,r?py(a,r):void 0)}function py(a,e){return a.Uri.parse(e)}function Q3({original:a,modified:e,language:n,originalLanguage:r,modifiedLanguage:o,originalModelPath:c,modifiedModelPath:f,keepCurrentOriginalModel:h=!1,keepCurrentModifiedModel:m=!1,theme:d="light",loading:g="Loading...",options:b={},height:_="100%",width:y="100%",className:S,wrapperProps:A={},beforeMount:x=hl,onMount:v=hl}){let[T,C]=q.useState(!1),[R,P]=q.useState(!0),O=q.useRef(null),F=q.useRef(null),E=q.useRef(null),D=q.useRef(v),Y=q.useRef(x),k=q.useRef(!1);hy(()=>{let V=fy.init();return V.then(I=>(F.current=I)&&P(!1)).catch(I=>I?.type!=="cancelation"&&console.error("Monaco initialization: error:",I)),()=>O.current?K():V.cancel()}),li(()=>{if(O.current&&F.current){let V=O.current.getOriginalEditor(),I=Gs(F.current,a||"",r||n||"text",c||"");I!==V.getModel()&&V.setModel(I)}},[c],T),li(()=>{if(O.current&&F.current){let V=O.current.getModifiedEditor(),I=Gs(F.current,e||"",o||n||"text",f||"");I!==V.getModel()&&V.setModel(I)}},[f],T),li(()=>{let V=O.current.getModifiedEditor();V.getOption(F.current.editor.EditorOption.readOnly)?V.setValue(e||""):e!==V.getValue()&&(V.executeEdits("",[{range:V.getModel().getFullModelRange(),text:e||"",forceMoveMarkers:!0}]),V.pushUndoStop())},[e],T),li(()=>{O.current?.getModel()?.original.setValue(a||"")},[a],T),li(()=>{let{original:V,modified:I}=O.current.getModel();F.current.editor.setModelLanguage(V,r||n||"text"),F.current.editor.setModelLanguage(I,o||n||"text")},[n,r,o],T),li(()=>{F.current?.editor.setTheme(d)},[d],T),li(()=>{O.current?.updateOptions(b)},[b],T);let X=q.useCallback(()=>{if(!F.current)return;Y.current(F.current);let V=Gs(F.current,a||"",r||n||"text",c||""),I=Gs(F.current,e||"",o||n||"text",f||"");O.current?.setModel({original:V,modified:I})},[n,e,o,a,r,c,f]),$=q.useCallback(()=>{!k.current&&E.current&&(O.current=F.current.editor.createDiffEditor(E.current,{automaticLayout:!0,...b}),X(),F.current?.editor.setTheme(d),C(!0),k.current=!0)},[b,d,X]);q.useEffect(()=>{T&&D.current(O.current,F.current)},[T]),q.useEffect(()=>{!R&&!T&&$()},[R,T,$]);function K(){let V=O.current?.getModel();h||V?.original?.dispose(),m||V?.modified?.dispose(),O.current?.dispose()}return Rn.createElement(dy,{width:y,height:_,isEditorReady:T,loading:g,_ref:E,className:S,wrapperProps:A})}var J3=Q3;q.memo(J3);function $3(a){let e=q.useRef();return q.useEffect(()=>{e.current=a},[a]),e.current}var eD=$3,cu=new Map;function tD({defaultValue:a,defaultLanguage:e,defaultPath:n,value:r,language:o,path:c,theme:f="light",line:h,loading:m="Loading...",options:d={},overrideServices:g={},saveViewState:b=!0,keepCurrentModel:_=!1,width:y="100%",height:S="100%",className:A,wrapperProps:x={},beforeMount:v=hl,onMount:T=hl,onChange:C,onValidate:R=hl}){let[P,O]=q.useState(!1),[F,E]=q.useState(!0),D=q.useRef(null),Y=q.useRef(null),k=q.useRef(null),X=q.useRef(T),$=q.useRef(v),K=q.useRef(),V=q.useRef(r),I=eD(c),B=q.useRef(!1),se=q.useRef(!1);hy(()=>{let Q=fy.init();return Q.then(le=>(D.current=le)&&E(!1)).catch(le=>le?.type!=="cancelation"&&console.error("Monaco initialization: error:",le)),()=>Y.current?L():Q.cancel()}),li(()=>{let Q=Gs(D.current,a||r||"",e||o||"",c||n||"");Q!==Y.current?.getModel()&&(b&&cu.set(I,Y.current?.saveViewState()),Y.current?.setModel(Q),b&&Y.current?.restoreViewState(cu.get(c)))},[c],P),li(()=>{Y.current?.updateOptions(d)},[d],P),li(()=>{!Y.current||r===void 0||(Y.current.getOption(D.current.editor.EditorOption.readOnly)?Y.current.setValue(r):r!==Y.current.getValue()&&(se.current=!0,Y.current.executeEdits("",[{range:Y.current.getModel().getFullModelRange(),text:r,forceMoveMarkers:!0}]),Y.current.pushUndoStop(),se.current=!1))},[r],P),li(()=>{let Q=Y.current?.getModel();Q&&o&&D.current?.editor.setModelLanguage(Q,o)},[o],P),li(()=>{h!==void 0&&Y.current?.revealLine(h)},[h],P),li(()=>{D.current?.editor.setTheme(f)},[f],P);let he=q.useCallback(()=>{if(!(!k.current||!D.current)&&!B.current){$.current(D.current);let Q=c||n,le=Gs(D.current,r||a||"",e||o||"",Q||"");Y.current=D.current?.editor.create(k.current,{model:le,automaticLayout:!0,...d},g),b&&Y.current.restoreViewState(cu.get(Q)),D.current.editor.setTheme(f),h!==void 0&&Y.current.revealLine(h),O(!0),B.current=!0}},[a,e,n,r,o,c,d,g,b,f,h]);q.useEffect(()=>{P&&X.current(Y.current,D.current)},[P]),q.useEffect(()=>{!F&&!P&&he()},[F,P,he]),V.current=r,q.useEffect(()=>{P&&C&&(K.current?.dispose(),K.current=Y.current?.onDidChangeModelContent(Q=>{se.current||C(Y.current.getValue(),Q)}))},[P,C]),q.useEffect(()=>{if(P){let Q=D.current.editor.onDidChangeMarkers(le=>{let ge=Y.current.getModel()?.uri;if(ge&&le.find(we=>we.path===ge.path)){let we=D.current.editor.getModelMarkers({resource:ge});R?.(we)}});return()=>{Q?.dispose()}}return()=>{}},[P,R]);function L(){K.current?.dispose(),_?b&&cu.set(c,Y.current.saveViewState()):Y.current.getModel()?.dispose(),Y.current.dispose()}return Rn.createElement(dy,{width:y,height:S,isEditorReady:P,loading:m,_ref:k,className:A,wrapperProps:x})}var nD=tD,iD=q.memo(nD),aD=iD;const nx={blank:`// Custom Game Code
// This code runs in your game scene.

function onStart() {
  console.log("Game started!");
}

function onUpdate(delta) {
  // Called every frame (delta = time since last frame)
}

function onKeyDown(key) {
  // Handle keyboard input
  if (key === "Space") {
    // Jump!
  }
}
`,movement:`// Player Movement Template

let speed = 5;
let jumpForce = 8;
let isGrounded = false;
let velocity = { x: 0, y: 0, z: 0 };

function onStart() {
  console.log("Player ready!");
}

function onUpdate(delta) {
  // Apply gravity
  velocity.y -= 9.8 * delta;
  
  // Move player
  let player = scene.getObject("player");
  if (player) {
    player.position.x += velocity.x * delta;
    player.position.y += velocity.y * delta;
    player.position.z += velocity.z * delta;
    
    // Ground check
    if (player.position.y <= 0) {
      player.position.y = 0;
      velocity.y = 0;
      isGrounded = true;
    }
  }
}

function onKeyDown(key) {
  switch(key) {
    case "ArrowLeft": velocity.x = -speed; break;
    case "ArrowRight": velocity.x = speed; break;
    case "ArrowUp": velocity.z = -speed; break;
    case "ArrowDown": velocity.z = speed; break;
    case "Space":
      if (isGrounded) {
        velocity.y = jumpForce;
        isGrounded = false;
      }
      break;
  }
}

function onKeyUp(key) {
  if (["ArrowLeft","ArrowRight"].includes(key)) velocity.x = 0;
  if (["ArrowUp","ArrowDown"].includes(key)) velocity.z = 0;
}
`,collectibles:`// Collectibles Game Template

let score = 0;
let coins = [];

function onStart() {
  console.log("Collect the coins!");
  coins = scene.getObjectsByType("coin");
  updateHUD();
}

function onUpdate(delta) {
  let player = scene.getObject("player");
  if (!player) return;
  
  coins.forEach((coin, i) => {
    if (coin && coin.visible) {
      // Spin coin
      coin.rotation.y += 90 * delta;
      
      // Check collision
      let dist = distance(player.position, coin.position);
      if (dist < 1.0) {
        coin.visible = false;
        score += 10;
        updateHUD();
        console.log("Collected! Score: " + score);
      }
    }
  });
}

function distance(a, b) {
  let dx = a.x - b.x;
  let dy = a.y - b.y;
  let dz = a.z - b.z;
  return Math.sqrt(dx*dx + dy*dy + dz*dz);
}

function updateHUD() {
  // Update score display
  scene.setHUDText("score", "Score: " + score);
}
`,physics:`// Physics & Obstacles Template

let obstacles = [];
let moveSpeed = 3;
let direction = 1;

function onStart() {
  obstacles = scene.getObjectsByType("cube");
  console.log("Physics game ready! Objects: " + obstacles.length);
}

function onUpdate(delta) {
  // Move obstacles back and forth
  obstacles.forEach((obs, i) => {
    if (!obs) return;
    let phase = (Date.now() / 1000 + i * 0.5) % (Math.PI * 2);
    obs.position.x = Math.sin(phase) * 3;
    
    // Rotate obstacles
    obs.rotation.y += 45 * delta;
    obs.rotation.x += 30 * delta;
  });
}

function onKeyDown(key) {
  let player = scene.getObject("player");
  if (!player) return;
  
  switch(key) {
    case "ArrowLeft": player.position.x -= 1; break;
    case "ArrowRight": player.position.x += 1; break;
    case "ArrowUp": player.position.z -= 1; break;
    case "ArrowDown": player.position.z += 1; break;
  }
}
`};function rD(){const{project:a,setCustomCode:e}=On(),[n,r]=q.useState(!1),[o,c]=q.useState(["Cloud Code Editor ready.","Write custom JavaScript to control your game."]),[f,h]=q.useState("blank"),m=()=>{try{const b=a.customCode.split(`
`).slice(0,5);c(_=>[..._,"▶ Running custom code...",...b.map(y=>`  ${y.trim()}`).filter(Boolean),"✓ Code validated successfully"].slice(-30))}catch(b){c(_=>[..._,`✗ Error: ${b}`].slice(-30))}},d=()=>{navigator.clipboard.writeText(a.customCode).then(()=>{r(!0),setTimeout(()=>r(!1),2e3)})},g=b=>{e(nx[b]),h(b),c(_=>[..._,`Loaded template: ${b}`].slice(-30))};return z.jsxs("div",{className:"flex flex-col h-full",children:[z.jsxs("div",{className:"flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-black/20 flex-wrap",children:[z.jsx("div",{className:"flex gap-1 flex-wrap",children:Object.keys(nx).map(b=>z.jsx("button",{onClick:()=>g(b),className:`px-2 py-1 rounded text-xs font-medium capitalize transition-colors ${f===b?"bg-blue-600 text-white":"bg-white/5 text-gray-400 hover:bg-white/10"}`,children:b},b))}),z.jsxs("div",{className:"ml-auto flex gap-1",children:[z.jsxs("button",{onClick:d,className:"flex items-center gap-1 px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-gray-300 transition-colors",children:[n?z.jsx(BM,{size:11,className:"text-green-400"}):z.jsx(yx,{size:11}),n?"Copied":"Copy"]}),z.jsxs("button",{onClick:m,className:"flex items-center gap-1.5 px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs font-medium text-white transition-colors",children:[z.jsx(Dp,{size:11})," Run"]})]})]}),z.jsx("div",{className:"flex-1 min-h-0",children:z.jsx(aD,{height:"100%",defaultLanguage:"javascript",value:a.customCode,onChange:b=>e(b||""),theme:"vs-dark",options:{fontSize:13,minimap:{enabled:!1},lineNumbers:"on",scrollBeyondLastLine:!1,wordWrap:"on",padding:{top:12,bottom:12},fontFamily:'"JetBrains Mono", "Fira Code", Menlo, monospace',fontLigatures:!0,cursorBlinking:"smooth",smoothScrolling:!0,automaticLayout:!0,tabSize:2,renderLineHighlight:"line",scrollbar:{verticalScrollbarSize:6,horizontalScrollbarSize:6}}})}),z.jsxs("div",{className:"h-28 border-t border-white/10 bg-black/50 overflow-y-auto",children:[z.jsxs("div",{className:"px-3 py-1.5 text-xs text-gray-500 uppercase font-semibold border-b border-white/5 flex justify-between",children:[z.jsx("span",{children:"Output"}),z.jsx("button",{onClick:()=>c(["Console cleared."]),className:"text-gray-600 hover:text-gray-400",children:"clear"})]}),z.jsx("div",{className:"px-3 py-1 space-y-0.5 font-mono",children:o.map((b,_)=>z.jsx("div",{className:`text-xs ${b.startsWith("✗")?"text-red-400":b.startsWith("✓")?"text-green-400":b.startsWith("▶")?"text-blue-400":"text-gray-400"}`,children:b},_))})]})]})}function sD(){const{activePanel:a,setActivePanel:e}=On(),[n,r]=q.useState(!1),[o,c]=q.useState(340),f=a==="blocks",m=f||a==="code",d=[{id:"blocks",icon:N1,label:"Block Editor"},{id:"code",icon:YM,label:"Cloud Code"}];return z.jsxs("div",{className:"flex flex-col border-t border-white/10 bg-black/20 transition-all",style:{height:m&&!n?o:40},children:[z.jsxs("div",{className:"flex items-center gap-1 px-2 border-b border-white/10 h-10 shrink-0",children:[d.map(({id:g,icon:b,label:_})=>z.jsxs("button",{onClick:()=>{a===g?r(y=>!y):(e(g),r(!1))},className:`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${a===g&&!n?"bg-white/10 text-white border border-white/20":"text-gray-500 hover:text-gray-300"}`,children:[z.jsx(b,{size:12}),_]},g)),z.jsx("div",{className:"ml-auto flex items-center gap-1",children:m&&z.jsx("button",{onClick:()=>r(g=>!g),className:"p-1 text-gray-500 hover:text-gray-300 rounded",children:n?z.jsx(jM,{size:13}):z.jsx(xx,{size:13})})})]}),m&&!n&&z.jsx("div",{className:"flex-1 overflow-hidden",children:f?z.jsx(YC,{}):z.jsx(rD,{})})]})}const oD=1,lD=1e6;let Ah=0;function cD(){return Ah=(Ah+1)%Number.MAX_SAFE_INTEGER,Ah.toString()}const wh=new Map,ix=a=>{if(wh.has(a))return;const e=setTimeout(()=>{wh.delete(a),pl({type:"REMOVE_TOAST",toastId:a})},lD);wh.set(a,e)},uD=(a,e)=>{switch(e.type){case"ADD_TOAST":return{...a,toasts:[e.toast,...a.toasts].slice(0,oD)};case"UPDATE_TOAST":return{...a,toasts:a.toasts.map(n=>n.id===e.toast.id?{...n,...e.toast}:n)};case"DISMISS_TOAST":{const{toastId:n}=e;return n?ix(n):a.toasts.forEach(r=>{ix(r.id)}),{...a,toasts:a.toasts.map(r=>r.id===n||n===void 0?{...r,open:!1}:r)}}case"REMOVE_TOAST":return e.toastId===void 0?{...a,toasts:[]}:{...a,toasts:a.toasts.filter(n=>n.id!==e.toastId)}}},yu=[];let bu={toasts:[]};function pl(a){bu=uD(bu,a),yu.forEach(e=>{e(bu)})}function fD({...a}){const e=cD(),n=o=>pl({type:"UPDATE_TOAST",toast:{...o,id:e}}),r=()=>pl({type:"DISMISS_TOAST",toastId:e});return pl({type:"ADD_TOAST",toast:{...a,id:e,open:!0,onOpenChange:o=>{o||r()}}}),{id:e,dismiss:r,update:n}}function my(){const[a,e]=q.useState(bu);return q.useEffect(()=>(yu.push(e),()=>{const n=yu.indexOf(e);n>-1&&yu.splice(n,1)}),[a]),{...a,toast:fD,dismiss:n=>pl({type:"DISMISS_TOAST",toastId:n})}}var $p=vx();const dD=gx($p);function ui(a,e,{checkForDefaultPrevented:n=!0}={}){return function(o){if(a?.(o),n===!1||!o.defaultPrevented)return e?.(o)}}function ax(a,e){if(typeof a=="function")return a(e);a!=null&&(a.current=e)}function gy(...a){return e=>{let n=!1;const r=a.map(o=>{const c=ax(o,e);return!n&&typeof c=="function"&&(n=!0),c});if(n)return()=>{for(let o=0;o<r.length;o++){const c=r[o];typeof c=="function"?c():ax(a[o],null)}}}}function Vr(...a){return q.useCallback(gy(...a),a)}function vy(a,e=[]){let n=[];function r(c,f){const h=q.createContext(f),m=n.length;n=[...n,f];const d=b=>{const{scope:_,children:y,...S}=b,A=_?.[a]?.[m]||h,x=q.useMemo(()=>S,Object.values(S));return z.jsx(A.Provider,{value:x,children:y})};d.displayName=c+"Provider";function g(b,_){const y=_?.[a]?.[m]||h,S=q.useContext(y);if(S)return S;if(f!==void 0)return f;throw new Error(`\`${b}\` must be used within \`${c}\``)}return[d,g]}const o=()=>{const c=n.map(f=>q.createContext(f));return function(h){const m=h?.[a]||c;return q.useMemo(()=>({[`__scope${a}`]:{...h,[a]:m}}),[h,m])}};return o.scopeName=a,[r,hD(o,...e)]}function hD(...a){const e=a[0];if(a.length===1)return e;const n=()=>{const r=a.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(c){const f=r.reduce((h,{useScope:m,scopeName:d})=>{const b=m(c)[`__scope${d}`];return{...h,...b}},{});return q.useMemo(()=>({[`__scope${e.scopeName}`]:f}),[f])}};return n.scopeName=e.scopeName,n}function Mp(a){const e=pD(a),n=q.forwardRef((r,o)=>{const{children:c,...f}=r,h=q.Children.toArray(c),m=h.find(gD);if(m){const d=m.props.children,g=h.map(b=>b===m?q.Children.count(d)>1?q.Children.only(null):q.isValidElement(d)?d.props.children:null:b);return z.jsx(e,{...f,ref:o,children:q.isValidElement(d)?q.cloneElement(d,void 0,g):null})}return z.jsx(e,{...f,ref:o,children:c})});return n.displayName=`${a}.Slot`,n}function pD(a){const e=q.forwardRef((n,r)=>{const{children:o,...c}=n;if(q.isValidElement(o)){const f=_D(o),h=vD(c,o.props);return o.type!==q.Fragment&&(h.ref=r?gy(r,f):f),q.cloneElement(o,h)}return q.Children.count(o)>1?q.Children.only(null):null});return e.displayName=`${a}.SlotClone`,e}var mD=Symbol("radix.slottable");function gD(a){return q.isValidElement(a)&&typeof a.type=="function"&&"__radixId"in a.type&&a.type.__radixId===mD}function vD(a,e){const n={...e};for(const r in e){const o=a[r],c=e[r];/^on[A-Z]/.test(r)?o&&c?n[r]=(...h)=>{const m=c(...h);return o(...h),m}:o&&(n[r]=o):r==="style"?n[r]={...o,...c}:r==="className"&&(n[r]=[o,c].filter(Boolean).join(" "))}return{...a,...n}}function _D(a){let e=Object.getOwnPropertyDescriptor(a.props,"ref")?.get,n=e&&"isReactWarning"in e&&e.isReactWarning;return n?a.ref:(e=Object.getOwnPropertyDescriptor(a,"ref")?.get,n=e&&"isReactWarning"in e&&e.isReactWarning,n?a.props.ref:a.props.ref||a.ref)}function xD(a){const e=a+"CollectionProvider",[n,r]=vy(e),[o,c]=n(e,{collectionRef:{current:null},itemMap:new Map}),f=A=>{const{scope:x,children:v}=A,T=Rn.useRef(null),C=Rn.useRef(new Map).current;return z.jsx(o,{scope:x,itemMap:C,collectionRef:T,children:v})};f.displayName=e;const h=a+"CollectionSlot",m=Mp(h),d=Rn.forwardRef((A,x)=>{const{scope:v,children:T}=A,C=c(h,v),R=Vr(x,C.collectionRef);return z.jsx(m,{ref:R,children:T})});d.displayName=h;const g=a+"CollectionItemSlot",b="data-radix-collection-item",_=Mp(g),y=Rn.forwardRef((A,x)=>{const{scope:v,children:T,...C}=A,R=Rn.useRef(null),P=Vr(x,R),O=c(g,v);return Rn.useEffect(()=>(O.itemMap.set(R,{ref:R,...C}),()=>{O.itemMap.delete(R)})),z.jsx(_,{[b]:"",ref:P,children:T})});y.displayName=g;function S(A){const x=c(a+"CollectionConsumer",A);return Rn.useCallback(()=>{const T=x.collectionRef.current;if(!T)return[];const C=Array.from(T.querySelectorAll(`[${b}]`));return Array.from(x.itemMap.values()).sort((O,F)=>C.indexOf(O.ref.current)-C.indexOf(F.ref.current))},[x.collectionRef,x.itemMap])}return[{Provider:f,Slot:d,ItemSlot:y},S,r]}var yD=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],Ji=yD.reduce((a,e)=>{const n=Mp(`Primitive.${e}`),r=q.forwardRef((o,c)=>{const{asChild:f,...h}=o,m=f?n:e;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),z.jsx(m,{...h,ref:c})});return r.displayName=`Primitive.${e}`,{...a,[e]:r}},{});function _y(a,e){a&&$p.flushSync(()=>a.dispatchEvent(e))}function jr(a){const e=q.useRef(a);return q.useEffect(()=>{e.current=a}),q.useMemo(()=>(...n)=>e.current?.(...n),[])}function bD(a,e=globalThis?.document){const n=jr(a);q.useEffect(()=>{const r=o=>{o.key==="Escape"&&n(o)};return e.addEventListener("keydown",r,{capture:!0}),()=>e.removeEventListener("keydown",r,{capture:!0})},[n,e])}var SD="DismissableLayer",Ep="dismissableLayer.update",MD="dismissableLayer.pointerDownOutside",ED="dismissableLayer.focusOutside",rx,xy=q.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),yy=q.forwardRef((a,e)=>{const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:r,onPointerDownOutside:o,onFocusOutside:c,onInteractOutside:f,onDismiss:h,...m}=a,d=q.useContext(xy),[g,b]=q.useState(null),_=g?.ownerDocument??globalThis?.document,[,y]=q.useState({}),S=Vr(e,F=>b(F)),A=Array.from(d.layers),[x]=[...d.layersWithOutsidePointerEventsDisabled].slice(-1),v=A.indexOf(x),T=g?A.indexOf(g):-1,C=d.layersWithOutsidePointerEventsDisabled.size>0,R=T>=v,P=AD(F=>{const E=F.target,D=[...d.branches].some(Y=>Y.contains(E));!R||D||(o?.(F),f?.(F),F.defaultPrevented||h?.())},_),O=wD(F=>{const E=F.target;[...d.branches].some(Y=>Y.contains(E))||(c?.(F),f?.(F),F.defaultPrevented||h?.())},_);return bD(F=>{T===d.layers.size-1&&(r?.(F),!F.defaultPrevented&&h&&(F.preventDefault(),h()))},_),q.useEffect(()=>{if(g)return n&&(d.layersWithOutsidePointerEventsDisabled.size===0&&(rx=_.body.style.pointerEvents,_.body.style.pointerEvents="none"),d.layersWithOutsidePointerEventsDisabled.add(g)),d.layers.add(g),sx(),()=>{n&&d.layersWithOutsidePointerEventsDisabled.size===1&&(_.body.style.pointerEvents=rx)}},[g,_,n,d]),q.useEffect(()=>()=>{g&&(d.layers.delete(g),d.layersWithOutsidePointerEventsDisabled.delete(g),sx())},[g,d]),q.useEffect(()=>{const F=()=>y({});return document.addEventListener(Ep,F),()=>document.removeEventListener(Ep,F)},[]),z.jsx(Ji.div,{...m,ref:S,style:{pointerEvents:C?R?"auto":"none":void 0,...a.style},onFocusCapture:ui(a.onFocusCapture,O.onFocusCapture),onBlurCapture:ui(a.onBlurCapture,O.onBlurCapture),onPointerDownCapture:ui(a.onPointerDownCapture,P.onPointerDownCapture)})});yy.displayName=SD;var TD="DismissableLayerBranch",by=q.forwardRef((a,e)=>{const n=q.useContext(xy),r=q.useRef(null),o=Vr(e,r);return q.useEffect(()=>{const c=r.current;if(c)return n.branches.add(c),()=>{n.branches.delete(c)}},[n.branches]),z.jsx(Ji.div,{...a,ref:o})});by.displayName=TD;function AD(a,e=globalThis?.document){const n=jr(a),r=q.useRef(!1),o=q.useRef(()=>{});return q.useEffect(()=>{const c=h=>{if(h.target&&!r.current){let m=function(){Sy(MD,n,d,{discrete:!0})};const d={originalEvent:h};h.pointerType==="touch"?(e.removeEventListener("click",o.current),o.current=m,e.addEventListener("click",o.current,{once:!0})):m()}else e.removeEventListener("click",o.current);r.current=!1},f=window.setTimeout(()=>{e.addEventListener("pointerdown",c)},0);return()=>{window.clearTimeout(f),e.removeEventListener("pointerdown",c),e.removeEventListener("click",o.current)}},[e,n]),{onPointerDownCapture:()=>r.current=!0}}function wD(a,e=globalThis?.document){const n=jr(a),r=q.useRef(!1);return q.useEffect(()=>{const o=c=>{c.target&&!r.current&&Sy(ED,n,{originalEvent:c},{discrete:!1})};return e.addEventListener("focusin",o),()=>e.removeEventListener("focusin",o)},[e,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function sx(){const a=new CustomEvent(Ep);document.dispatchEvent(a)}function Sy(a,e,n,{discrete:r}){const o=n.originalEvent.target,c=new CustomEvent(a,{bubbles:!1,cancelable:!0,detail:n});e&&o.addEventListener(a,e,{once:!0}),r?_y(o,c):o.dispatchEvent(c)}var RD=yy,CD=by,Sl=globalThis?.document?q.useLayoutEffect:()=>{},DD="Portal",My=q.forwardRef((a,e)=>{const{container:n,...r}=a,[o,c]=q.useState(!1);Sl(()=>c(!0),[]);const f=n||o&&globalThis?.document?.body;return f?dD.createPortal(z.jsx(Ji.div,{...r,ref:e}),f):null});My.displayName=DD;function ND(a,e){return q.useReducer((n,r)=>e[n][r]??n,a)}var Ey=a=>{const{present:e,children:n}=a,r=UD(e),o=typeof n=="function"?n({present:r.isPresent}):q.Children.only(n),c=Vr(r.ref,LD(o));return typeof n=="function"||r.isPresent?q.cloneElement(o,{ref:c}):null};Ey.displayName="Presence";function UD(a){const[e,n]=q.useState(),r=q.useRef(null),o=q.useRef(a),c=q.useRef("none"),f=a?"mounted":"unmounted",[h,m]=ND(f,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return q.useEffect(()=>{const d=uu(r.current);c.current=h==="mounted"?d:"none"},[h]),Sl(()=>{const d=r.current,g=o.current;if(g!==a){const _=c.current,y=uu(d);a?m("MOUNT"):y==="none"||d?.display==="none"?m("UNMOUNT"):m(g&&_!==y?"ANIMATION_OUT":"UNMOUNT"),o.current=a}},[a,m]),Sl(()=>{if(e){let d;const g=e.ownerDocument.defaultView??window,b=y=>{const A=uu(r.current).includes(CSS.escape(y.animationName));if(y.target===e&&A&&(m("ANIMATION_END"),!o.current)){const x=e.style.animationFillMode;e.style.animationFillMode="forwards",d=g.setTimeout(()=>{e.style.animationFillMode==="forwards"&&(e.style.animationFillMode=x)})}},_=y=>{y.target===e&&(c.current=uu(r.current))};return e.addEventListener("animationstart",_),e.addEventListener("animationcancel",b),e.addEventListener("animationend",b),()=>{g.clearTimeout(d),e.removeEventListener("animationstart",_),e.removeEventListener("animationcancel",b),e.removeEventListener("animationend",b)}}else m("ANIMATION_END")},[e,m]),{isPresent:["mounted","unmountSuspended"].includes(h),ref:q.useCallback(d=>{r.current=d?getComputedStyle(d):null,n(d)},[])}}function uu(a){return a?.animationName||"none"}function LD(a){let e=Object.getOwnPropertyDescriptor(a.props,"ref")?.get,n=e&&"isReactWarning"in e&&e.isReactWarning;return n?a.ref:(e=Object.getOwnPropertyDescriptor(a,"ref")?.get,n=e&&"isReactWarning"in e&&e.isReactWarning,n?a.props.ref:a.props.ref||a.ref)}var OD=SM[" useInsertionEffect ".trim().toString()]||Sl;function PD({prop:a,defaultProp:e,onChange:n=()=>{},caller:r}){const[o,c,f]=ID({defaultProp:e,onChange:n}),h=a!==void 0,m=h?a:o;{const g=q.useRef(a!==void 0);q.useEffect(()=>{const b=g.current;b!==h&&console.warn(`${r} is changing from ${b?"controlled":"uncontrolled"} to ${h?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),g.current=h},[h,r])}const d=q.useCallback(g=>{if(h){const b=FD(g)?g(a):g;b!==a&&f.current?.(b)}else c(g)},[h,a,c,f]);return[m,d]}function ID({defaultProp:a,onChange:e}){const[n,r]=q.useState(a),o=q.useRef(n),c=q.useRef(e);return OD(()=>{c.current=e},[e]),q.useEffect(()=>{o.current!==n&&(c.current?.(n),o.current=n)},[n,o]),[n,r,c]}function FD(a){return typeof a=="function"}var zD=Object.freeze({position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal"}),BD="VisuallyHidden",em=q.forwardRef((a,e)=>z.jsx(Ji.span,{...a,ref:e,style:{...zD,...a.style}}));em.displayName=BD;var tm="ToastProvider",[nm,HD,kD]=xD("Toast"),[Ty]=vy("Toast",[kD]),[GD,Ou]=Ty(tm),Ay=a=>{const{__scopeToast:e,label:n="Notification",duration:r=5e3,swipeDirection:o="right",swipeThreshold:c=50,children:f}=a,[h,m]=q.useState(null),[d,g]=q.useState(0),b=q.useRef(!1),_=q.useRef(!1);return n.trim()||console.error(`Invalid prop \`label\` supplied to \`${tm}\`. Expected non-empty \`string\`.`),z.jsx(nm.Provider,{scope:e,children:z.jsx(GD,{scope:e,label:n,duration:r,swipeDirection:o,swipeThreshold:c,toastCount:d,viewport:h,onViewportChange:m,onToastAdd:q.useCallback(()=>g(y=>y+1),[]),onToastRemove:q.useCallback(()=>g(y=>y-1),[]),isFocusedToastEscapeKeyDownRef:b,isClosePausedRef:_,children:f})})};Ay.displayName=tm;var wy="ToastViewport",VD=["F8"],Tp="toast.viewportPause",Ap="toast.viewportResume",Ry=q.forwardRef((a,e)=>{const{__scopeToast:n,hotkey:r=VD,label:o="Notifications ({hotkey})",...c}=a,f=Ou(wy,n),h=HD(n),m=q.useRef(null),d=q.useRef(null),g=q.useRef(null),b=q.useRef(null),_=Vr(e,b,f.onViewportChange),y=r.join("+").replace(/Key/g,"").replace(/Digit/g,""),S=f.toastCount>0;q.useEffect(()=>{const x=v=>{r.length!==0&&r.every(C=>v[C]||v.code===C)&&b.current?.focus()};return document.addEventListener("keydown",x),()=>document.removeEventListener("keydown",x)},[r]),q.useEffect(()=>{const x=m.current,v=b.current;if(S&&x&&v){const T=()=>{if(!f.isClosePausedRef.current){const O=new CustomEvent(Tp);v.dispatchEvent(O),f.isClosePausedRef.current=!0}},C=()=>{if(f.isClosePausedRef.current){const O=new CustomEvent(Ap);v.dispatchEvent(O),f.isClosePausedRef.current=!1}},R=O=>{!x.contains(O.relatedTarget)&&C()},P=()=>{x.contains(document.activeElement)||C()};return x.addEventListener("focusin",T),x.addEventListener("focusout",R),x.addEventListener("pointermove",T),x.addEventListener("pointerleave",P),window.addEventListener("blur",T),window.addEventListener("focus",C),()=>{x.removeEventListener("focusin",T),x.removeEventListener("focusout",R),x.removeEventListener("pointermove",T),x.removeEventListener("pointerleave",P),window.removeEventListener("blur",T),window.removeEventListener("focus",C)}}},[S,f.isClosePausedRef]);const A=q.useCallback(({tabbingDirection:x})=>{const T=h().map(C=>{const R=C.ref.current,P=[R,...nN(R)];return x==="forwards"?P:P.reverse()});return(x==="forwards"?T.reverse():T).flat()},[h]);return q.useEffect(()=>{const x=b.current;if(x){const v=T=>{const C=T.altKey||T.ctrlKey||T.metaKey;if(T.key==="Tab"&&!C){const P=document.activeElement,O=T.shiftKey;if(T.target===x&&O){d.current?.focus();return}const D=A({tabbingDirection:O?"backwards":"forwards"}),Y=D.findIndex(k=>k===P);Rh(D.slice(Y+1))?T.preventDefault():O?d.current?.focus():g.current?.focus()}};return x.addEventListener("keydown",v),()=>x.removeEventListener("keydown",v)}},[h,A]),z.jsxs(CD,{ref:m,role:"region","aria-label":o.replace("{hotkey}",y),tabIndex:-1,style:{pointerEvents:S?void 0:"none"},children:[S&&z.jsx(wp,{ref:d,onFocusFromOutsideViewport:()=>{const x=A({tabbingDirection:"forwards"});Rh(x)}}),z.jsx(nm.Slot,{scope:n,children:z.jsx(Ji.ol,{tabIndex:-1,...c,ref:_})}),S&&z.jsx(wp,{ref:g,onFocusFromOutsideViewport:()=>{const x=A({tabbingDirection:"backwards"});Rh(x)}})]})});Ry.displayName=wy;var Cy="ToastFocusProxy",wp=q.forwardRef((a,e)=>{const{__scopeToast:n,onFocusFromOutsideViewport:r,...o}=a,c=Ou(Cy,n);return z.jsx(em,{tabIndex:0,...o,ref:e,style:{position:"fixed"},onFocus:f=>{const h=f.relatedTarget;!c.viewport?.contains(h)&&r()}})});wp.displayName=Cy;var Tl="Toast",jD="toast.swipeStart",XD="toast.swipeMove",WD="toast.swipeCancel",qD="toast.swipeEnd",Dy=q.forwardRef((a,e)=>{const{forceMount:n,open:r,defaultOpen:o,onOpenChange:c,...f}=a,[h,m]=PD({prop:r,defaultProp:o??!0,onChange:c,caller:Tl});return z.jsx(Ey,{present:n||h,children:z.jsx(KD,{open:h,...f,ref:e,onClose:()=>m(!1),onPause:jr(a.onPause),onResume:jr(a.onResume),onSwipeStart:ui(a.onSwipeStart,d=>{d.currentTarget.setAttribute("data-swipe","start")}),onSwipeMove:ui(a.onSwipeMove,d=>{const{x:g,y:b}=d.detail.delta;d.currentTarget.setAttribute("data-swipe","move"),d.currentTarget.style.setProperty("--radix-toast-swipe-move-x",`${g}px`),d.currentTarget.style.setProperty("--radix-toast-swipe-move-y",`${b}px`)}),onSwipeCancel:ui(a.onSwipeCancel,d=>{d.currentTarget.setAttribute("data-swipe","cancel"),d.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),d.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),d.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),d.currentTarget.style.removeProperty("--radix-toast-swipe-end-y")}),onSwipeEnd:ui(a.onSwipeEnd,d=>{const{x:g,y:b}=d.detail.delta;d.currentTarget.setAttribute("data-swipe","end"),d.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),d.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),d.currentTarget.style.setProperty("--radix-toast-swipe-end-x",`${g}px`),d.currentTarget.style.setProperty("--radix-toast-swipe-end-y",`${b}px`),m(!1)})})})});Dy.displayName=Tl;var[YD,ZD]=Ty(Tl,{onClose(){}}),KD=q.forwardRef((a,e)=>{const{__scopeToast:n,type:r="foreground",duration:o,open:c,onClose:f,onEscapeKeyDown:h,onPause:m,onResume:d,onSwipeStart:g,onSwipeMove:b,onSwipeCancel:_,onSwipeEnd:y,...S}=a,A=Ou(Tl,n),[x,v]=q.useState(null),T=Vr(e,K=>v(K)),C=q.useRef(null),R=q.useRef(null),P=o||A.duration,O=q.useRef(0),F=q.useRef(P),E=q.useRef(0),{onToastAdd:D,onToastRemove:Y}=A,k=jr(()=>{x?.contains(document.activeElement)&&A.viewport?.focus(),f()}),X=q.useCallback(K=>{!K||K===1/0||(window.clearTimeout(E.current),O.current=new Date().getTime(),E.current=window.setTimeout(k,K))},[k]);q.useEffect(()=>{const K=A.viewport;if(K){const V=()=>{X(F.current),d?.()},I=()=>{const B=new Date().getTime()-O.current;F.current=F.current-B,window.clearTimeout(E.current),m?.()};return K.addEventListener(Tp,I),K.addEventListener(Ap,V),()=>{K.removeEventListener(Tp,I),K.removeEventListener(Ap,V)}}},[A.viewport,P,m,d,X]),q.useEffect(()=>{c&&!A.isClosePausedRef.current&&X(P)},[c,P,A.isClosePausedRef,X]),q.useEffect(()=>(D(),()=>Y()),[D,Y]);const $=q.useMemo(()=>x?Fy(x):null,[x]);return A.viewport?z.jsxs(z.Fragment,{children:[$&&z.jsx(QD,{__scopeToast:n,role:"status","aria-live":r==="foreground"?"assertive":"polite",children:$}),z.jsx(YD,{scope:n,onClose:k,children:$p.createPortal(z.jsx(nm.ItemSlot,{scope:n,children:z.jsx(RD,{asChild:!0,onEscapeKeyDown:ui(h,()=>{A.isFocusedToastEscapeKeyDownRef.current||k(),A.isFocusedToastEscapeKeyDownRef.current=!1}),children:z.jsx(Ji.li,{tabIndex:0,"data-state":c?"open":"closed","data-swipe-direction":A.swipeDirection,...S,ref:T,style:{userSelect:"none",touchAction:"none",...a.style},onKeyDown:ui(a.onKeyDown,K=>{K.key==="Escape"&&(h?.(K.nativeEvent),K.nativeEvent.defaultPrevented||(A.isFocusedToastEscapeKeyDownRef.current=!0,k()))}),onPointerDown:ui(a.onPointerDown,K=>{K.button===0&&(C.current={x:K.clientX,y:K.clientY})}),onPointerMove:ui(a.onPointerMove,K=>{if(!C.current)return;const V=K.clientX-C.current.x,I=K.clientY-C.current.y,B=!!R.current,se=["left","right"].includes(A.swipeDirection),he=["left","up"].includes(A.swipeDirection)?Math.min:Math.max,L=se?he(0,V):0,Q=se?0:he(0,I),le=K.pointerType==="touch"?10:2,ge={x:L,y:Q},we={originalEvent:K,delta:ge};B?(R.current=ge,fu(XD,b,we,{discrete:!1})):ox(ge,A.swipeDirection,le)?(R.current=ge,fu(jD,g,we,{discrete:!1}),K.target.setPointerCapture(K.pointerId)):(Math.abs(V)>le||Math.abs(I)>le)&&(C.current=null)}),onPointerUp:ui(a.onPointerUp,K=>{const V=R.current,I=K.target;if(I.hasPointerCapture(K.pointerId)&&I.releasePointerCapture(K.pointerId),R.current=null,C.current=null,V){const B=K.currentTarget,se={originalEvent:K,delta:V};ox(V,A.swipeDirection,A.swipeThreshold)?fu(qD,y,se,{discrete:!0}):fu(WD,_,se,{discrete:!0}),B.addEventListener("click",he=>he.preventDefault(),{once:!0})}})})})}),A.viewport)})]}):null}),QD=a=>{const{__scopeToast:e,children:n,...r}=a,o=Ou(Tl,e),[c,f]=q.useState(!1),[h,m]=q.useState(!1);return eN(()=>f(!0)),q.useEffect(()=>{const d=window.setTimeout(()=>m(!0),1e3);return()=>window.clearTimeout(d)},[]),h?null:z.jsx(My,{asChild:!0,children:z.jsx(em,{...r,children:c&&z.jsxs(z.Fragment,{children:[o.label," ",n]})})})},JD="ToastTitle",Ny=q.forwardRef((a,e)=>{const{__scopeToast:n,...r}=a;return z.jsx(Ji.div,{...r,ref:e})});Ny.displayName=JD;var $D="ToastDescription",Uy=q.forwardRef((a,e)=>{const{__scopeToast:n,...r}=a;return z.jsx(Ji.div,{...r,ref:e})});Uy.displayName=$D;var Ly="ToastAction",Oy=q.forwardRef((a,e)=>{const{altText:n,...r}=a;return n.trim()?z.jsx(Iy,{altText:n,asChild:!0,children:z.jsx(im,{...r,ref:e})}):(console.error(`Invalid prop \`altText\` supplied to \`${Ly}\`. Expected non-empty \`string\`.`),null)});Oy.displayName=Ly;var Py="ToastClose",im=q.forwardRef((a,e)=>{const{__scopeToast:n,...r}=a,o=ZD(Py,n);return z.jsx(Iy,{asChild:!0,children:z.jsx(Ji.button,{type:"button",...r,ref:e,onClick:ui(a.onClick,o.onClose)})})});im.displayName=Py;var Iy=q.forwardRef((a,e)=>{const{__scopeToast:n,altText:r,...o}=a;return z.jsx(Ji.div,{"data-radix-toast-announce-exclude":"","data-radix-toast-announce-alt":r||void 0,...o,ref:e})});function Fy(a){const e=[];return Array.from(a.childNodes).forEach(r=>{if(r.nodeType===r.TEXT_NODE&&r.textContent&&e.push(r.textContent),tN(r)){const o=r.ariaHidden||r.hidden||r.style.display==="none",c=r.dataset.radixToastAnnounceExclude==="";if(!o)if(c){const f=r.dataset.radixToastAnnounceAlt;f&&e.push(f)}else e.push(...Fy(r))}}),e}function fu(a,e,n,{discrete:r}){const o=n.originalEvent.currentTarget,c=new CustomEvent(a,{bubbles:!0,cancelable:!0,detail:n});e&&o.addEventListener(a,e,{once:!0}),r?_y(o,c):o.dispatchEvent(c)}var ox=(a,e,n=0)=>{const r=Math.abs(a.x),o=Math.abs(a.y),c=r>o;return e==="left"||e==="right"?c&&r>n:!c&&o>n};function eN(a=()=>{}){const e=jr(a);Sl(()=>{let n=0,r=0;return n=window.requestAnimationFrame(()=>r=window.requestAnimationFrame(e)),()=>{window.cancelAnimationFrame(n),window.cancelAnimationFrame(r)}},[e])}function tN(a){return a.nodeType===a.ELEMENT_NODE}function nN(a){const e=[],n=document.createTreeWalker(a,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const o=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||o?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)e.push(n.currentNode);return e}function Rh(a){const e=document.activeElement;return a.some(n=>n===e?!0:(n.focus(),document.activeElement!==e))}var iN=Ay,zy=Ry,By=Dy,Hy=Ny,ky=Uy,Gy=Oy,Vy=im;function jy(a){var e,n,r="";if(typeof a=="string"||typeof a=="number")r+=a;else if(typeof a=="object")if(Array.isArray(a)){var o=a.length;for(e=0;e<o;e++)a[e]&&(n=jy(a[e]))&&(r&&(r+=" "),r+=n)}else for(n in a)a[n]&&(r&&(r+=" "),r+=n);return r}function Xy(){for(var a,e,n=0,r="",o=arguments.length;n<o;n++)(a=arguments[n])&&(e=jy(a))&&(r&&(r+=" "),r+=e);return r}const lx=a=>typeof a=="boolean"?`${a}`:a===0?"0":a,cx=Xy,aN=(a,e)=>n=>{var r;if(e?.variants==null)return cx(a,n?.class,n?.className);const{variants:o,defaultVariants:c}=e,f=Object.keys(o).map(d=>{const g=n?.[d],b=c?.[d];if(g===null)return null;const _=lx(g)||lx(b);return o[d][_]}),h=n&&Object.entries(n).reduce((d,g)=>{let[b,_]=g;return _===void 0||(d[b]=_),d},{}),m=e==null||(r=e.compoundVariants)===null||r===void 0?void 0:r.reduce((d,g)=>{let{class:b,className:_,...y}=g;return Object.entries(y).every(S=>{let[A,x]=S;return Array.isArray(x)?x.includes({...c,...h}[A]):{...c,...h}[A]===x})?[...d,b,_]:d},[]);return cx(a,f,m,n?.class,n?.className)},rN=(a,e)=>{const n=new Array(a.length+e.length);for(let r=0;r<a.length;r++)n[r]=a[r];for(let r=0;r<e.length;r++)n[a.length+r]=e[r];return n},sN=(a,e)=>({classGroupId:a,validator:e}),Wy=(a=new Map,e=null,n)=>({nextPart:a,validators:e,classGroupId:n}),Ru="-",ux=[],oN="arbitrary..",lN=a=>{const e=uN(a),{conflictingClassGroups:n,conflictingClassGroupModifiers:r}=a;return{getClassGroupId:f=>{if(f.startsWith("[")&&f.endsWith("]"))return cN(f);const h=f.split(Ru),m=h[0]===""&&h.length>1?1:0;return qy(h,m,e)},getConflictingClassGroupIds:(f,h)=>{if(h){const m=r[f],d=n[f];return m?d?rN(d,m):m:d||ux}return n[f]||ux}}},qy=(a,e,n)=>{if(a.length-e===0)return n.classGroupId;const o=a[e],c=n.nextPart.get(o);if(c){const d=qy(a,e+1,c);if(d)return d}const f=n.validators;if(f===null)return;const h=e===0?a.join(Ru):a.slice(e).join(Ru),m=f.length;for(let d=0;d<m;d++){const g=f[d];if(g.validator(h))return g.classGroupId}},cN=a=>a.slice(1,-1).indexOf(":")===-1?void 0:(()=>{const e=a.slice(1,-1),n=e.indexOf(":"),r=e.slice(0,n);return r?oN+r:void 0})(),uN=a=>{const{theme:e,classGroups:n}=a;return fN(n,e)},fN=(a,e)=>{const n=Wy();for(const r in a){const o=a[r];am(o,n,r,e)}return n},am=(a,e,n,r)=>{const o=a.length;for(let c=0;c<o;c++){const f=a[c];dN(f,e,n,r)}},dN=(a,e,n,r)=>{if(typeof a=="string"){hN(a,e,n);return}if(typeof a=="function"){pN(a,e,n,r);return}mN(a,e,n,r)},hN=(a,e,n)=>{const r=a===""?e:Yy(e,a);r.classGroupId=n},pN=(a,e,n,r)=>{if(gN(a)){am(a(r),e,n,r);return}e.validators===null&&(e.validators=[]),e.validators.push(sN(n,a))},mN=(a,e,n,r)=>{const o=Object.entries(a),c=o.length;for(let f=0;f<c;f++){const[h,m]=o[f];am(m,Yy(e,h),n,r)}},Yy=(a,e)=>{let n=a;const r=e.split(Ru),o=r.length;for(let c=0;c<o;c++){const f=r[c];let h=n.nextPart.get(f);h||(h=Wy(),n.nextPart.set(f,h)),n=h}return n},gN=a=>"isThemeGetter"in a&&a.isThemeGetter===!0,vN=a=>{if(a<1)return{get:()=>{},set:()=>{}};let e=0,n=Object.create(null),r=Object.create(null);const o=(c,f)=>{n[c]=f,e++,e>a&&(e=0,r=n,n=Object.create(null))};return{get(c){let f=n[c];if(f!==void 0)return f;if((f=r[c])!==void 0)return o(c,f),f},set(c,f){c in n?n[c]=f:o(c,f)}}},Rp="!",fx=":",_N=[],dx=(a,e,n,r,o)=>({modifiers:a,hasImportantModifier:e,baseClassName:n,maybePostfixModifierPosition:r,isExternal:o}),xN=a=>{const{prefix:e,experimentalParseClassName:n}=a;let r=o=>{const c=[];let f=0,h=0,m=0,d;const g=o.length;for(let A=0;A<g;A++){const x=o[A];if(f===0&&h===0){if(x===fx){c.push(o.slice(m,A)),m=A+1;continue}if(x==="/"){d=A;continue}}x==="["?f++:x==="]"?f--:x==="("?h++:x===")"&&h--}const b=c.length===0?o:o.slice(m);let _=b,y=!1;b.endsWith(Rp)?(_=b.slice(0,-1),y=!0):b.startsWith(Rp)&&(_=b.slice(1),y=!0);const S=d&&d>m?d-m:void 0;return dx(c,y,_,S)};if(e){const o=e+fx,c=r;r=f=>f.startsWith(o)?c(f.slice(o.length)):dx(_N,!1,f,void 0,!0)}if(n){const o=r;r=c=>n({className:c,parseClassName:o})}return r},yN=a=>{const e=new Map;return a.orderSensitiveModifiers.forEach((n,r)=>{e.set(n,1e6+r)}),n=>{const r=[];let o=[];for(let c=0;c<n.length;c++){const f=n[c],h=f[0]==="[",m=e.has(f);h||m?(o.length>0&&(o.sort(),r.push(...o),o=[]),r.push(f)):o.push(f)}return o.length>0&&(o.sort(),r.push(...o)),r}},bN=a=>({cache:vN(a.cacheSize),parseClassName:xN(a),sortModifiers:yN(a),...lN(a)}),SN=/\s+/,MN=(a,e)=>{const{parseClassName:n,getClassGroupId:r,getConflictingClassGroupIds:o,sortModifiers:c}=e,f=[],h=a.trim().split(SN);let m="";for(let d=h.length-1;d>=0;d-=1){const g=h[d],{isExternal:b,modifiers:_,hasImportantModifier:y,baseClassName:S,maybePostfixModifierPosition:A}=n(g);if(b){m=g+(m.length>0?" "+m:m);continue}let x=!!A,v=r(x?S.substring(0,A):S);if(!v){if(!x){m=g+(m.length>0?" "+m:m);continue}if(v=r(S),!v){m=g+(m.length>0?" "+m:m);continue}x=!1}const T=_.length===0?"":_.length===1?_[0]:c(_).join(":"),C=y?T+Rp:T,R=C+v;if(f.indexOf(R)>-1)continue;f.push(R);const P=o(v,x);for(let O=0;O<P.length;++O){const F=P[O];f.push(C+F)}m=g+(m.length>0?" "+m:m)}return m},EN=(...a)=>{let e=0,n,r,o="";for(;e<a.length;)(n=a[e++])&&(r=Zy(n))&&(o&&(o+=" "),o+=r);return o},Zy=a=>{if(typeof a=="string")return a;let e,n="";for(let r=0;r<a.length;r++)a[r]&&(e=Zy(a[r]))&&(n&&(n+=" "),n+=e);return n},TN=(a,...e)=>{let n,r,o,c;const f=m=>{const d=e.reduce((g,b)=>b(g),a());return n=bN(d),r=n.cache.get,o=n.cache.set,c=h,h(m)},h=m=>{const d=r(m);if(d)return d;const g=MN(m,n);return o(m,g),g};return c=f,(...m)=>c(EN(...m))},AN=[],xn=a=>{const e=n=>n[a]||AN;return e.isThemeGetter=!0,e},Ky=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,Qy=/^\((?:(\w[\w-]*):)?(.+)\)$/i,wN=/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,RN=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,CN=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,DN=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,NN=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,UN=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,or=a=>wN.test(a),gt=a=>!!a&&!Number.isNaN(Number(a)),lr=a=>!!a&&Number.isInteger(Number(a)),Ch=a=>a.endsWith("%")&&gt(a.slice(0,-1)),Ma=a=>RN.test(a),Jy=()=>!0,LN=a=>CN.test(a)&&!DN.test(a),rm=()=>!1,ON=a=>NN.test(a),PN=a=>UN.test(a),IN=a=>!We(a)&&!qe(a),FN=a=>hr(a,tb,rm),We=a=>Ky.test(a),Ir=a=>hr(a,nb,LN),hx=a=>hr(a,XN,gt),zN=a=>hr(a,ab,Jy),BN=a=>hr(a,ib,rm),px=a=>hr(a,$y,rm),HN=a=>hr(a,eb,PN),du=a=>hr(a,rb,ON),qe=a=>Qy.test(a),ol=a=>Xr(a,nb),kN=a=>Xr(a,ib),mx=a=>Xr(a,$y),GN=a=>Xr(a,tb),VN=a=>Xr(a,eb),hu=a=>Xr(a,rb,!0),jN=a=>Xr(a,ab,!0),hr=(a,e,n)=>{const r=Ky.exec(a);return r?r[1]?e(r[1]):n(r[2]):!1},Xr=(a,e,n=!1)=>{const r=Qy.exec(a);return r?r[1]?e(r[1]):n:!1},$y=a=>a==="position"||a==="percentage",eb=a=>a==="image"||a==="url",tb=a=>a==="length"||a==="size"||a==="bg-size",nb=a=>a==="length",XN=a=>a==="number",ib=a=>a==="family-name",ab=a=>a==="number"||a==="weight",rb=a=>a==="shadow",WN=()=>{const a=xn("color"),e=xn("font"),n=xn("text"),r=xn("font-weight"),o=xn("tracking"),c=xn("leading"),f=xn("breakpoint"),h=xn("container"),m=xn("spacing"),d=xn("radius"),g=xn("shadow"),b=xn("inset-shadow"),_=xn("text-shadow"),y=xn("drop-shadow"),S=xn("blur"),A=xn("perspective"),x=xn("aspect"),v=xn("ease"),T=xn("animate"),C=()=>["auto","avoid","all","avoid-page","page","left","right","column"],R=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],P=()=>[...R(),qe,We],O=()=>["auto","hidden","clip","visible","scroll"],F=()=>["auto","contain","none"],E=()=>[qe,We,m],D=()=>[or,"full","auto",...E()],Y=()=>[lr,"none","subgrid",qe,We],k=()=>["auto",{span:["full",lr,qe,We]},lr,qe,We],X=()=>[lr,"auto",qe,We],$=()=>["auto","min","max","fr",qe,We],K=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],V=()=>["start","end","center","stretch","center-safe","end-safe"],I=()=>["auto",...E()],B=()=>[or,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...E()],se=()=>[or,"screen","full","dvw","lvw","svw","min","max","fit",...E()],he=()=>[or,"screen","full","lh","dvh","lvh","svh","min","max","fit",...E()],L=()=>[a,qe,We],Q=()=>[...R(),mx,px,{position:[qe,We]}],le=()=>["no-repeat",{repeat:["","x","y","space","round"]}],ge=()=>["auto","cover","contain",GN,FN,{size:[qe,We]}],we=()=>[Ch,ol,Ir],Le=()=>["","none","full",d,qe,We],ee=()=>["",gt,ol,Ir],Me=()=>["solid","dashed","dotted","double"],Se=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],ze=()=>[gt,Ch,mx,px],Je=()=>["","none",S,qe,We],et=()=>["none",gt,qe,We],Wt=()=>["none",gt,qe,We],ct=()=>[gt,qe,We],_t=()=>[or,"full",...E()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[Ma],breakpoint:[Ma],color:[Jy],container:[Ma],"drop-shadow":[Ma],ease:["in","out","in-out"],font:[IN],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[Ma],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[Ma],shadow:[Ma],spacing:["px",gt],text:[Ma],"text-shadow":[Ma],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",or,We,qe,x]}],container:["container"],columns:[{columns:[gt,We,qe,h]}],"break-after":[{"break-after":C()}],"break-before":[{"break-before":C()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:P()}],overflow:[{overflow:O()}],"overflow-x":[{"overflow-x":O()}],"overflow-y":[{"overflow-y":O()}],overscroll:[{overscroll:F()}],"overscroll-x":[{"overscroll-x":F()}],"overscroll-y":[{"overscroll-y":F()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:D()}],"inset-x":[{"inset-x":D()}],"inset-y":[{"inset-y":D()}],start:[{"inset-s":D(),start:D()}],end:[{"inset-e":D(),end:D()}],"inset-bs":[{"inset-bs":D()}],"inset-be":[{"inset-be":D()}],top:[{top:D()}],right:[{right:D()}],bottom:[{bottom:D()}],left:[{left:D()}],visibility:["visible","invisible","collapse"],z:[{z:[lr,"auto",qe,We]}],basis:[{basis:[or,"full","auto",h,...E()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[gt,or,"auto","initial","none",We]}],grow:[{grow:["",gt,qe,We]}],shrink:[{shrink:["",gt,qe,We]}],order:[{order:[lr,"first","last","none",qe,We]}],"grid-cols":[{"grid-cols":Y()}],"col-start-end":[{col:k()}],"col-start":[{"col-start":X()}],"col-end":[{"col-end":X()}],"grid-rows":[{"grid-rows":Y()}],"row-start-end":[{row:k()}],"row-start":[{"row-start":X()}],"row-end":[{"row-end":X()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":$()}],"auto-rows":[{"auto-rows":$()}],gap:[{gap:E()}],"gap-x":[{"gap-x":E()}],"gap-y":[{"gap-y":E()}],"justify-content":[{justify:[...K(),"normal"]}],"justify-items":[{"justify-items":[...V(),"normal"]}],"justify-self":[{"justify-self":["auto",...V()]}],"align-content":[{content:["normal",...K()]}],"align-items":[{items:[...V(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...V(),{baseline:["","last"]}]}],"place-content":[{"place-content":K()}],"place-items":[{"place-items":[...V(),"baseline"]}],"place-self":[{"place-self":["auto",...V()]}],p:[{p:E()}],px:[{px:E()}],py:[{py:E()}],ps:[{ps:E()}],pe:[{pe:E()}],pbs:[{pbs:E()}],pbe:[{pbe:E()}],pt:[{pt:E()}],pr:[{pr:E()}],pb:[{pb:E()}],pl:[{pl:E()}],m:[{m:I()}],mx:[{mx:I()}],my:[{my:I()}],ms:[{ms:I()}],me:[{me:I()}],mbs:[{mbs:I()}],mbe:[{mbe:I()}],mt:[{mt:I()}],mr:[{mr:I()}],mb:[{mb:I()}],ml:[{ml:I()}],"space-x":[{"space-x":E()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":E()}],"space-y-reverse":["space-y-reverse"],size:[{size:B()}],"inline-size":[{inline:["auto",...se()]}],"min-inline-size":[{"min-inline":["auto",...se()]}],"max-inline-size":[{"max-inline":["none",...se()]}],"block-size":[{block:["auto",...he()]}],"min-block-size":[{"min-block":["auto",...he()]}],"max-block-size":[{"max-block":["none",...he()]}],w:[{w:[h,"screen",...B()]}],"min-w":[{"min-w":[h,"screen","none",...B()]}],"max-w":[{"max-w":[h,"screen","none","prose",{screen:[f]},...B()]}],h:[{h:["screen","lh",...B()]}],"min-h":[{"min-h":["screen","lh","none",...B()]}],"max-h":[{"max-h":["screen","lh",...B()]}],"font-size":[{text:["base",n,ol,Ir]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[r,jN,zN]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",Ch,We]}],"font-family":[{font:[kN,BN,e]}],"font-features":[{"font-features":[We]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[o,qe,We]}],"line-clamp":[{"line-clamp":[gt,"none",qe,hx]}],leading:[{leading:[c,...E()]}],"list-image":[{"list-image":["none",qe,We]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",qe,We]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:L()}],"text-color":[{text:L()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...Me(),"wavy"]}],"text-decoration-thickness":[{decoration:[gt,"from-font","auto",qe,Ir]}],"text-decoration-color":[{decoration:L()}],"underline-offset":[{"underline-offset":[gt,"auto",qe,We]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:E()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",qe,We]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",qe,We]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:Q()}],"bg-repeat":[{bg:le()}],"bg-size":[{bg:ge()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},lr,qe,We],radial:["",qe,We],conic:[lr,qe,We]},VN,HN]}],"bg-color":[{bg:L()}],"gradient-from-pos":[{from:we()}],"gradient-via-pos":[{via:we()}],"gradient-to-pos":[{to:we()}],"gradient-from":[{from:L()}],"gradient-via":[{via:L()}],"gradient-to":[{to:L()}],rounded:[{rounded:Le()}],"rounded-s":[{"rounded-s":Le()}],"rounded-e":[{"rounded-e":Le()}],"rounded-t":[{"rounded-t":Le()}],"rounded-r":[{"rounded-r":Le()}],"rounded-b":[{"rounded-b":Le()}],"rounded-l":[{"rounded-l":Le()}],"rounded-ss":[{"rounded-ss":Le()}],"rounded-se":[{"rounded-se":Le()}],"rounded-ee":[{"rounded-ee":Le()}],"rounded-es":[{"rounded-es":Le()}],"rounded-tl":[{"rounded-tl":Le()}],"rounded-tr":[{"rounded-tr":Le()}],"rounded-br":[{"rounded-br":Le()}],"rounded-bl":[{"rounded-bl":Le()}],"border-w":[{border:ee()}],"border-w-x":[{"border-x":ee()}],"border-w-y":[{"border-y":ee()}],"border-w-s":[{"border-s":ee()}],"border-w-e":[{"border-e":ee()}],"border-w-bs":[{"border-bs":ee()}],"border-w-be":[{"border-be":ee()}],"border-w-t":[{"border-t":ee()}],"border-w-r":[{"border-r":ee()}],"border-w-b":[{"border-b":ee()}],"border-w-l":[{"border-l":ee()}],"divide-x":[{"divide-x":ee()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":ee()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...Me(),"hidden","none"]}],"divide-style":[{divide:[...Me(),"hidden","none"]}],"border-color":[{border:L()}],"border-color-x":[{"border-x":L()}],"border-color-y":[{"border-y":L()}],"border-color-s":[{"border-s":L()}],"border-color-e":[{"border-e":L()}],"border-color-bs":[{"border-bs":L()}],"border-color-be":[{"border-be":L()}],"border-color-t":[{"border-t":L()}],"border-color-r":[{"border-r":L()}],"border-color-b":[{"border-b":L()}],"border-color-l":[{"border-l":L()}],"divide-color":[{divide:L()}],"outline-style":[{outline:[...Me(),"none","hidden"]}],"outline-offset":[{"outline-offset":[gt,qe,We]}],"outline-w":[{outline:["",gt,ol,Ir]}],"outline-color":[{outline:L()}],shadow:[{shadow:["","none",g,hu,du]}],"shadow-color":[{shadow:L()}],"inset-shadow":[{"inset-shadow":["none",b,hu,du]}],"inset-shadow-color":[{"inset-shadow":L()}],"ring-w":[{ring:ee()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:L()}],"ring-offset-w":[{"ring-offset":[gt,Ir]}],"ring-offset-color":[{"ring-offset":L()}],"inset-ring-w":[{"inset-ring":ee()}],"inset-ring-color":[{"inset-ring":L()}],"text-shadow":[{"text-shadow":["none",_,hu,du]}],"text-shadow-color":[{"text-shadow":L()}],opacity:[{opacity:[gt,qe,We]}],"mix-blend":[{"mix-blend":[...Se(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":Se()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[gt]}],"mask-image-linear-from-pos":[{"mask-linear-from":ze()}],"mask-image-linear-to-pos":[{"mask-linear-to":ze()}],"mask-image-linear-from-color":[{"mask-linear-from":L()}],"mask-image-linear-to-color":[{"mask-linear-to":L()}],"mask-image-t-from-pos":[{"mask-t-from":ze()}],"mask-image-t-to-pos":[{"mask-t-to":ze()}],"mask-image-t-from-color":[{"mask-t-from":L()}],"mask-image-t-to-color":[{"mask-t-to":L()}],"mask-image-r-from-pos":[{"mask-r-from":ze()}],"mask-image-r-to-pos":[{"mask-r-to":ze()}],"mask-image-r-from-color":[{"mask-r-from":L()}],"mask-image-r-to-color":[{"mask-r-to":L()}],"mask-image-b-from-pos":[{"mask-b-from":ze()}],"mask-image-b-to-pos":[{"mask-b-to":ze()}],"mask-image-b-from-color":[{"mask-b-from":L()}],"mask-image-b-to-color":[{"mask-b-to":L()}],"mask-image-l-from-pos":[{"mask-l-from":ze()}],"mask-image-l-to-pos":[{"mask-l-to":ze()}],"mask-image-l-from-color":[{"mask-l-from":L()}],"mask-image-l-to-color":[{"mask-l-to":L()}],"mask-image-x-from-pos":[{"mask-x-from":ze()}],"mask-image-x-to-pos":[{"mask-x-to":ze()}],"mask-image-x-from-color":[{"mask-x-from":L()}],"mask-image-x-to-color":[{"mask-x-to":L()}],"mask-image-y-from-pos":[{"mask-y-from":ze()}],"mask-image-y-to-pos":[{"mask-y-to":ze()}],"mask-image-y-from-color":[{"mask-y-from":L()}],"mask-image-y-to-color":[{"mask-y-to":L()}],"mask-image-radial":[{"mask-radial":[qe,We]}],"mask-image-radial-from-pos":[{"mask-radial-from":ze()}],"mask-image-radial-to-pos":[{"mask-radial-to":ze()}],"mask-image-radial-from-color":[{"mask-radial-from":L()}],"mask-image-radial-to-color":[{"mask-radial-to":L()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":R()}],"mask-image-conic-pos":[{"mask-conic":[gt]}],"mask-image-conic-from-pos":[{"mask-conic-from":ze()}],"mask-image-conic-to-pos":[{"mask-conic-to":ze()}],"mask-image-conic-from-color":[{"mask-conic-from":L()}],"mask-image-conic-to-color":[{"mask-conic-to":L()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:Q()}],"mask-repeat":[{mask:le()}],"mask-size":[{mask:ge()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",qe,We]}],filter:[{filter:["","none",qe,We]}],blur:[{blur:Je()}],brightness:[{brightness:[gt,qe,We]}],contrast:[{contrast:[gt,qe,We]}],"drop-shadow":[{"drop-shadow":["","none",y,hu,du]}],"drop-shadow-color":[{"drop-shadow":L()}],grayscale:[{grayscale:["",gt,qe,We]}],"hue-rotate":[{"hue-rotate":[gt,qe,We]}],invert:[{invert:["",gt,qe,We]}],saturate:[{saturate:[gt,qe,We]}],sepia:[{sepia:["",gt,qe,We]}],"backdrop-filter":[{"backdrop-filter":["","none",qe,We]}],"backdrop-blur":[{"backdrop-blur":Je()}],"backdrop-brightness":[{"backdrop-brightness":[gt,qe,We]}],"backdrop-contrast":[{"backdrop-contrast":[gt,qe,We]}],"backdrop-grayscale":[{"backdrop-grayscale":["",gt,qe,We]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[gt,qe,We]}],"backdrop-invert":[{"backdrop-invert":["",gt,qe,We]}],"backdrop-opacity":[{"backdrop-opacity":[gt,qe,We]}],"backdrop-saturate":[{"backdrop-saturate":[gt,qe,We]}],"backdrop-sepia":[{"backdrop-sepia":["",gt,qe,We]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":E()}],"border-spacing-x":[{"border-spacing-x":E()}],"border-spacing-y":[{"border-spacing-y":E()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",qe,We]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[gt,"initial",qe,We]}],ease:[{ease:["linear","initial",v,qe,We]}],delay:[{delay:[gt,qe,We]}],animate:[{animate:["none",T,qe,We]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[A,qe,We]}],"perspective-origin":[{"perspective-origin":P()}],rotate:[{rotate:et()}],"rotate-x":[{"rotate-x":et()}],"rotate-y":[{"rotate-y":et()}],"rotate-z":[{"rotate-z":et()}],scale:[{scale:Wt()}],"scale-x":[{"scale-x":Wt()}],"scale-y":[{"scale-y":Wt()}],"scale-z":[{"scale-z":Wt()}],"scale-3d":["scale-3d"],skew:[{skew:ct()}],"skew-x":[{"skew-x":ct()}],"skew-y":[{"skew-y":ct()}],transform:[{transform:[qe,We,"","none","gpu","cpu"]}],"transform-origin":[{origin:P()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:_t()}],"translate-x":[{"translate-x":_t()}],"translate-y":[{"translate-y":_t()}],"translate-z":[{"translate-z":_t()}],"translate-none":["translate-none"],accent:[{accent:L()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:L()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",qe,We]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":E()}],"scroll-mx":[{"scroll-mx":E()}],"scroll-my":[{"scroll-my":E()}],"scroll-ms":[{"scroll-ms":E()}],"scroll-me":[{"scroll-me":E()}],"scroll-mbs":[{"scroll-mbs":E()}],"scroll-mbe":[{"scroll-mbe":E()}],"scroll-mt":[{"scroll-mt":E()}],"scroll-mr":[{"scroll-mr":E()}],"scroll-mb":[{"scroll-mb":E()}],"scroll-ml":[{"scroll-ml":E()}],"scroll-p":[{"scroll-p":E()}],"scroll-px":[{"scroll-px":E()}],"scroll-py":[{"scroll-py":E()}],"scroll-ps":[{"scroll-ps":E()}],"scroll-pe":[{"scroll-pe":E()}],"scroll-pbs":[{"scroll-pbs":E()}],"scroll-pbe":[{"scroll-pbe":E()}],"scroll-pt":[{"scroll-pt":E()}],"scroll-pr":[{"scroll-pr":E()}],"scroll-pb":[{"scroll-pb":E()}],"scroll-pl":[{"scroll-pl":E()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",qe,We]}],fill:[{fill:["none",...L()]}],"stroke-w":[{stroke:[gt,ol,Ir,hx]}],stroke:[{stroke:["none",...L()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","inset-bs","inset-be","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pbs","pbe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mbs","mbe","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-bs","border-w-be","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-bs","border-color-be","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mbs","scroll-mbe","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pbs","scroll-pbe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},qN=TN(WN);function ao(...a){return qN(Xy(a))}const YN=iN,sb=q.forwardRef(({className:a,...e},n)=>z.jsx(zy,{ref:n,className:ao("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",a),...e}));sb.displayName=zy.displayName;const ZN=aN("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),ob=q.forwardRef(({className:a,variant:e,...n},r)=>z.jsx(By,{ref:r,className:ao(ZN({variant:e}),a),...n}));ob.displayName=By.displayName;const KN=q.forwardRef(({className:a,...e},n)=>z.jsx(Gy,{ref:n,className:ao("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",a),...e}));KN.displayName=Gy.displayName;const lb=q.forwardRef(({className:a,...e},n)=>z.jsx(Vy,{ref:n,className:ao("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",a),"toast-close":"",...e,children:z.jsx(Ex,{className:"h-4 w-4"})}));lb.displayName=Vy.displayName;const cb=q.forwardRef(({className:a,...e},n)=>z.jsx(Hy,{ref:n,className:ao("text-sm font-semibold",a),...e}));cb.displayName=Hy.displayName;const ub=q.forwardRef(({className:a,...e},n)=>z.jsx(ky,{ref:n,className:ao("text-sm opacity-90",a),...e}));ub.displayName=ky.displayName;function QN(){const{toasts:a}=my();return z.jsxs(YN,{children:[a.map(function({id:e,title:n,description:r,action:o,...c}){return z.jsxs(ob,{...c,children:[z.jsxs("div",{className:"grid gap-1",children:[n&&z.jsx(cb,{children:n}),r&&z.jsx(ub,{children:r})]}),o,z.jsx(lb,{})]},e)}),z.jsx(sb,{})]})}function JN(){const{isPlaying:a,project:e}=On();return a?z.jsxs("div",{className:"absolute inset-0 pointer-events-none z-20",children:[z.jsxs("div",{className:"absolute top-4 left-1/2 -translate-x-1/2 bg-green-500/90 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2",children:[z.jsx("span",{className:"w-2 h-2 bg-white rounded-full animate-pulse"}),"PLAYING — ",e.name]}),z.jsxs("div",{className:"absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 text-xs",children:[e.blocks.length," blocks active · ",e.objects.length," objects"]})]}):null}function $N(){const{loadProject:a,project:e,saveProject:n,isDirty:r}=On(),{toast:o}=my();return q.useEffect(()=>{a()},[]),q.useEffect(()=>{const c=f=>{const h=f.target;if(h.tagName==="INPUT"||h.tagName==="TEXTAREA"||h.isContentEditable)return;const{setActiveTool:m,removeObject:d,selectedObjectId:g,duplicateObject:b}=On.getState();switch(f.key.toLowerCase()){case"v":m("select");break;case"g":m("move");break;case"r":m("rotate");break;case"s":if(!f.ctrlKey&&!f.metaKey){m("scale");break}break}(f.ctrlKey||f.metaKey)&&f.key==="s"&&(f.preventDefault(),n().then(()=>o({title:"Saved",description:"Project saved locally.",duration:1500}))),(f.key==="Delete"||f.key==="Backspace")&&g&&d(g),(f.ctrlKey||f.metaKey)&&f.key==="d"&&(f.preventDefault(),g&&b(g))};return window.addEventListener("keydown",c),()=>window.removeEventListener("keydown",c)},[n,o]),z.jsxs("div",{className:"h-screen w-screen flex flex-col overflow-hidden bg-background text-foreground",children:[z.jsx(K1,{}),z.jsxs("div",{className:"flex-1 flex min-h-0",children:[z.jsx("div",{className:"w-52 shrink-0 overflow-hidden",children:z.jsx(rE,{})}),z.jsxs("div",{className:"flex-1 flex flex-col min-w-0",children:[z.jsxs("div",{className:"flex-1 relative min-h-0",children:[z.jsx(JN,{}),e.mode==="3d"?z.jsx(VC,{}):z.jsx(XC,{})]}),z.jsx(sD,{})]})]}),z.jsx(QN,{})]})}bM.createRoot(document.getElementById("root")).render(z.jsx($N,{}));
