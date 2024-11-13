import{i as ee,d as te,e as re,j as e,$ as C,u as L,B as _,f as ae,g as se,h as ne,k as oe}from"./index-FW2ZYlEN.js";import{r as n,R as ie,l as le,i as ce,L as U}from"./react-BBS6oWoz.js";import{ae as ue,at as i,au as A,av as de,aw as T,ax as b,B as I,ay as B,az as E,z as S,aA as z,w as N,aB as me,f as he}from"./antd-1y0TrYnh.js";import{c as fe}from"./index-rG4bJj0n.js";var O=function(t){if(!t)return 0;var o=ue(t).valueOf()-Date.now();return o<0?0:o},pe=function(t){return{days:Math.floor(t/864e5),hours:Math.floor(t/36e5)%24,minutes:Math.floor(t/6e4)%60,seconds:Math.floor(t/1e3)%60,milliseconds:Math.floor(t)%1e3}},ge=function(t){t===void 0&&(t={});var o=t||{},a=o.leftTime,r=o.targetDate,u=o.interval,l=u===void 0?1e3:u,s=o.onEnd,m=n.useMemo(function(){return ee(a)&&a>0?Date.now()+a:void 0},[a]),h="leftTime"in t?m:r,f=te(n.useState(function(){return O(h)}),2),p=f[0],d=f[1],j=re(s);n.useEffect(function(){if(!h){d(0);return}d(O(h));var P=setInterval(function(){var w,y=O(h);d(y),y===0&&(clearInterval(P),(w=j.current)===null||w===void 0||w.call(j))},l);return function(){return clearInterval(P)}},[h,l]);var M=n.useMemo(function(){return pe(p)},[p]);return[p,M]},ye=["rules","name","phoneName","fieldProps","onTiming","captchaTextRender","captchaProps"],xe=ie.forwardRef(function(t,o){var a=i.useFormInstance(),r=n.useState(t.countDown||60),u=A(r,2),l=u[0],s=u[1],m=n.useState(!1),h=A(m,2),f=h[0],p=h[1],d=n.useState(),j=A(d,2),M=j[0],P=j[1];t.rules,t.name;var w=t.phoneName,y=t.fieldProps,k=t.onTiming,D=t.captchaTextRender,J=D===void 0?function(g,v){return g?"".concat(v," 秒后重新获取"):"获取验证码"}:D,Q=t.captchaProps,Z=de(t,ye),$=function(){var g=B(E().mark(function v(F){return E().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.prev=0,P(!0),x.next=4,Z.onGetCaptcha(F);case 4:P(!1),p(!0),x.next=13;break;case 8:x.prev=8,x.t0=x.catch(0),p(!1),P(!1),console.log(x.t0);case 13:case"end":return x.stop()}},v,null,[[0,8]])}));return function(F){return g.apply(this,arguments)}}();return n.useImperativeHandle(o,function(){return{startTiming:function(){return p(!0)},endTiming:function(){return p(!1)}}}),n.useEffect(function(){var g=0,v=t.countDown;return f&&(g=window.setInterval(function(){s(function(F){return F<=1?(p(!1),clearInterval(g),v||60):F-1})},1e3)),function(){return clearInterval(g)}},[f]),n.useEffect(function(){k&&k(l)},[l,k]),e.jsxs("div",{style:T(T({},y==null?void 0:y.style),{},{display:"flex",alignItems:"center"}),ref:o,children:[e.jsx(b,T(T({},y),{},{style:T({flex:1,transition:"width .3s",marginRight:8},y==null?void 0:y.style)})),e.jsx(I,T(T({style:{display:"block"},disabled:f,loading:M},Q),{},{onClick:B(E().mark(function g(){var v;return E().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:if(c.prev=0,!w){c.next=9;break}return c.next=4,a.validateFields([w].flat(1));case 4:return v=a.getFieldValue([w].flat(1)),c.next=7,$(v);case 7:c.next=11;break;case 9:return c.next=11,$("");case 11:c.next=16;break;case 13:c.prev=13,c.t0=c.catch(0),console.log(c.t0);case 16:case"end":return c.stop()}},g,null,[[0,13]])})),children:J(f,l)}))]})}),ve=fe(xe);const je=/^[\w-]{4,16}$/,we=/^(?:(?:\+|00)86)?1\d{10}$/;function G(){return{pattern:je,message:C("authority.usernameErrorTip")}}function H(){return{pattern:/^(?=.*\d)(?=.*[a-z])[\w~!@#$%^&*+.\-]{8,16}$/i,message:C("authority.passwordStrength")}}function Te(){return{pattern:we,message:C("authority.mobileErrortip")}}const{Title:be}=N,Pe={email:""};function W(){const[t,o]=n.useState(0),[a]=ge({targetDate:t,onEnd:()=>{o(0)}}),[r,u]=n.useState(!1),[l]=i.useForm(),{t:s}=L(),{setFormMode:m}=n.useContext(R),h=async()=>{u(!0),o(new Date().getTime()+1e3*30),setTimeout(()=>{u(!1)},1e3)};return e.jsxs(e.Fragment,{children:[e.jsxs(S,{direction:"vertical",children:[e.jsx(be,{level:3,children:s("authority.forgotPassword")}),e.jsx("p",{className:"text-xs opacity-80",children:s("authority.forgotPasswordSubtitle")})]}),e.jsxs(i,{name:"forgotForm",form:l,layout:"vertical",initialValues:Pe,onFinish:h,children:[e.jsx(i.Item,{label:s("authority.email"),name:"email",rules:[{required:!0},{type:"email",message:s("authority.emailValidErrorTip")}],children:e.jsx(b,{placeholder:s("authority.emailTip")})}),e.jsx(i.Item,{children:e.jsx(I,{block:!0,type:"primary",htmlType:"submit",loading:r,disabled:a>0,children:a>0?s("authority.retryAfterText",{count:Math.floor(a/1e3)}):s("authority.sendResetLink")})}),e.jsx("div",{className:"text-center text-sm",children:e.jsx(_,{type:"link",icon:e.jsx(z,{}),className:"px-1",onPointerDown:()=>{m("login")},children:s("common.back")})})]})]})}const Me=Object.freeze(Object.defineProperty({__proto__:null,ForgotPassword:W},Symbol.toStringTag,{value:"Module"})),{Title:V}=N,Fe={username:"admin",password:"123456789admin"};function X(){const[t,o]=n.useState(!1),[a]=i.useForm(),{t:r}=L(),[u]=le(),l=ce(),s=ae(d=>d.login),m=se(d=>d.handleAsyncRoutes),h=ne(d=>d.getUserInfo),{setFormMode:f}=n.useContext(R),p=async d=>{o(!0),await s(d),await Promise.all([h(),m()]).finally(()=>o(!1));const j=u.get("redirect");l(j?`/${j.slice(1)}`:"/")};return e.jsxs(e.Fragment,{children:[e.jsxs(S,{direction:"vertical",children:[e.jsx(V,{level:3,children:"Hello, Welcome to"}),e.jsx(V,{className:"mt-0",level:5,children:"React Antd Admin"})]}),e.jsxs(i,{name:"passwordLoginForm",form:a,layout:"vertical",initialValues:Fe,onFinish:p,children:[e.jsx(i.Item,{label:r("authority.username"),name:"username",rules:[{required:!0},G],children:e.jsx(b,{placeholder:r("authority.usernameTip")})}),e.jsx(i.Item,{label:r("authority.password"),name:"password",rules:[{required:!0},H],children:e.jsx(b.Password,{placeholder:r("authority.passwordTip")})}),e.jsxs(i.Item,{children:[e.jsxs("div",{className:"mb-5 -mt-1 flex justify-between text-sm",children:[e.jsx(_,{type:"link",className:"p-0",onPointerDown:()=>{f("codeLogin")},children:r("authority.codeLogin")}),e.jsx(_,{type:"link",className:"p-0",onPointerDown:()=>{f("forgotPassword")},children:r("authority.forgotPassword")})]}),e.jsx(I,{block:!0,type:"primary",htmlType:"submit",loading:t,children:r("authority.login")})]}),e.jsxs("div",{className:"text-center text-sm",children:[r("authority.noAccountYet"),e.jsx(_,{type:"link",className:"px-1",onPointerDown:()=>{f("register")},children:r("authority.goToRegister")})]})]})]})}const ke=Object.freeze(Object.defineProperty({__proto__:null,PasswordLogin:X},Symbol.toStringTag,{value:"Module"})),{Title:q}=N,_e={username:"",password:"",confirmPassword:""};function K(){const[t]=n.useState(!1),[o]=i.useForm(),{t:a}=L(),{setFormMode:r}=n.useContext(R),u=async()=>{var l;(l=window.$message)==null||l.success("注册成功")};return e.jsxs(e.Fragment,{children:[e.jsxs(S,{direction:"vertical",children:[e.jsx(q,{level:3,children:"Hello, Welcome to"}),e.jsx(q,{className:"mt-0",level:5,children:"React Antd Admin"})]}),e.jsxs(i,{name:"registerForm",form:o,layout:"vertical",initialValues:_e,onFinish:u,children:[e.jsx(i.Item,{label:a("authority.username"),name:"username",rules:[{required:!0},G],children:e.jsx(b,{placeholder:a("authority.usernameTip")})}),e.jsx(i.Item,{label:a("authority.password"),name:"password",rules:[{required:!0},H],children:e.jsx(b.Password,{placeholder:a("authority.passwordTip")})}),e.jsx(i.Item,{name:"confirm",label:a("authority.confirmPassword"),dependencies:["password"],hasFeedback:!0,rules:[{required:!0,message:a("authority.passwordTip")},({getFieldValue:l})=>({validator(s,m){return!m||l("password")===m?Promise.resolve():Promise.reject(new Error(a("authority.confirmPasswordTip")))}})],children:e.jsx(b.Password,{placeholder:a("authority.passwordTip")})}),e.jsx(i.Item,{rules:[()=>({validator(l,s){return s!==!0?Promise.reject(new Error(a("authority.agreeTip"))):Promise.resolve()}})],name:"termsAgreement",valuePropName:"checked",children:e.jsx(me,{children:e.jsx("div",{className:"flex flex-wrap text-xs",children:e.jsx(oe,{i18nKey:"authority.agree",components:[e.jsx(U,{to:"/terms-of-service",target:"_blank"},0),e.jsx(U,{to:"/privacy-policy",target:"_blank"},1)]})})})}),e.jsx(i.Item,{children:e.jsx(I,{block:!0,type:"primary",htmlType:"submit",loading:t,children:a("authority.register")})}),e.jsxs("div",{className:"text-center text-sm",children:[a("authority.alreadyHaveAnAccount"),e.jsx(_,{type:"link",className:"px-1",onPointerDown:()=>{r("login")},children:a("authority.goToLogin")})]})]})]})}const Ae=Object.freeze(Object.defineProperty({__proto__:null,RegisterPassword:K},Symbol.toStringTag,{value:"Module"})),Oe={login:n.createElement(X),register:n.createElement(K),forgotPassword:n.createElement(W),codeLogin:n.createElement(Y)},R=n.createContext({formMode:"login",setFormMode:()=>{}}),{Title:Ie}=N,Ee={phoneNumber:"",captcha:""};function Y(){const[t,o]=n.useState(!1),[a]=i.useForm(),{t:r}=L(),{setFormMode:u}=n.useContext(R),l=async()=>{o(!0),setTimeout(()=>{var s;o(!1),(s=window.$message)==null||s.success(r("common.success"))},1e3)};return e.jsxs(e.Fragment,{children:[e.jsx(S,{direction:"vertical",children:e.jsx(Ie,{level:3,children:r("authority.codeLogin")})}),e.jsxs(i,{name:"codeLoginForm",form:a,layout:"vertical",initialValues:Ee,onFinish:l,children:[e.jsx(i.Item,{label:r("authority.mobile"),name:"phoneNumber",rules:[{required:!0},Te],children:e.jsx(he,{controls:!1,className:"w-full",placeholder:r("authority.mobileTip")})}),e.jsx(ve,{label:r("authority.code"),placeholder:r("authority.codeTip"),captchaTextRender:(s,m)=>s?r("authority.sendText",{second:m}):r("authority.sendCode"),onGetCaptcha:()=>{var s;return(s=window.$message)==null||s.success(r("common.success")),Promise.resolve()},rules:[{required:!0}],phoneName:"phoneNumber",name:"captcha"}),e.jsx(i.Item,{children:e.jsx(I,{block:!0,type:"primary",htmlType:"submit",loading:t,children:r("authority.login")})}),e.jsx("div",{className:"text-center text-sm",children:e.jsx(_,{type:"link",icon:e.jsx(z,{}),className:"px-1",onPointerDown:()=>{u("login")},children:r("common.back")})})]})]})}const Ce=Object.freeze(Object.defineProperty({__proto__:null,CodeLogin:Y},Symbol.toStringTag,{value:"Module"}));export{R as F,Oe as a,Ce as c,Me as f,ke as p,Ae as r};
