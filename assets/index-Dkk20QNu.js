import{u as w,d as y,a as b,b as C,j as s,e as T,A as a}from"./index-BGyuhmuP.js";import{f as k}from"./react-XqWWy1gx.js";import{B}from"./index-B0h6aq4V.js";import{at as x,ap as j,T as A,k as c}from"./antd-Dy5x7wqK.js";import"./faker-Dcf0Eyuj.js";const d={[a.admin]:{password:"123456789admin",username:a.admin},[a.common]:{password:"123456789admin",username:a.common}};function S(){const{t:e}=w(),r=k(),{enableFrontendAceess:o,enabledBackendAccess:t,setPreferences:m}=y(),{roles:p}=b(),i=C(n=>n.reset),l=C(n=>n.login);function u(n){return p.includes(n)?"primary":"default"}function g(n){if(p.includes(n))return;const h=d[n];i(),h&&l(h).then(()=>{r(0)})}async function f(){var n;if(o&&!t){m({enableFrontendAceess:!1,enabledBackendAccess:!0}),i(),l(d.admin).then(()=>{setTimeout(()=>{r(0)},150)});return}if(t&&!o){m({enableFrontendAceess:!0,enabledBackendAccess:!1}),i(),l(d.admin).then(()=>{setTimeout(()=>{r(0)},150)});return}(n=window.$message)==null||n.warning(e("access.pageControl.warningMessage"))}return s.jsxs(B,{className:"flex flex-col gap-4",children:[s.jsx(x,{type:"info",message:e("access.pageControl.alertMessage"),description:e("access.pageControl.alertDescription")}),s.jsxs(j,{title:e("access.pageControl.cardTitle"),children:[s.jsx(x,{type:"warning",className:T("mb-4",{hidden:o!==t}),description:e("access.pageControl.warningMessage")}),s.jsxs("div",{className:"flex items-center gap-4",children:[e("access.pageControl.currentPermissionMode"),o?s.jsx(A.Text,{code:!0,children:e("access.pageControl.frontendControl")}):"",t?s.jsx(A.Text,{code:!0,children:e("access.pageControl.backendControl")}):"",t?s.jsx(c,{disabled:o===t,type:"primary",onClick:()=>f(),children:e("access.pageControl.switchToFrontend")}):null,o?s.jsx(c,{disabled:o===t,type:"primary",onClick:()=>f(),children:e("access.pageControl.switchToBackend")}):null]})]}),s.jsx(j,{title:e("access.pageControl.accountSwitching"),children:s.jsxs("div",{className:"flex gap-4",children:[s.jsx(c,{type:u(a.admin),onClick:()=>g(a.admin),children:e("access.pageControl.switchAdmin")}),s.jsx(c,{type:u(a.common),onClick:()=>g(a.common),children:e("access.pageControl.switchCommon")})]})})]})}export{S as default};
