import{j as e,x as m,a as u}from"./index-BGyuhmuP.js";import"./react-XqWWy1gx.js";import{B as n}from"./index-B0h6aq4V.js";import{H as c,ac as d,k as p,aH as x,aA as f,ad as h}from"./antd-Dy5x7wqK.js";import{P as j}from"./index-WmGSvsOU.js";import{W as o}from"./BaseForm-C6Vn72NL.js";import{F as w}from"./index-DQrueZE8.js";import{P as v}from"./index-Bh65MQ7C.js";import"./faker-Dcf0Eyuj.js";import"./index-cFxgujD0.js";function g({value:a,onChange:t}){return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex items-center gap-5",children:[e.jsx(c,{size:100,src:a}),e.jsx(m,{rotationSlider:!0,aspectSlider:!0,showReset:!0,showGrid:!0,cropShape:"rect",children:e.jsx(d,{accept:"image/*",showUploadList:!1,name:"file",action:"/api/upload",headers:{authorization:"authorization-text"},onChange:r=>{var s,i,l;r.file.status==="done"?((s=window.$message)==null||s.success(`${r.file.name} file uploaded successfully`),t==null||t((i=r.file.response)==null?void 0:i.result)):r.file.status==="error"&&((l=window.$message)==null||l.error(`${r.file.name} file upload failed.`))},children:e.jsx(p,{icon:e.jsx(x,{}),children:"更换头像"})})})]})})}function S(){const a=u(),t=()=>a?a.avatar?a.avatar:"https://avatar.vercel.sh/blur.svg?text=2":"",r=async()=>{var s;(s=window.$message)==null||s.success("更新基本信息成功")};return e.jsxs(n,{className:"max-w-md ml-10",children:[e.jsx("h3",{children:"我的资料"}),e.jsxs(j,{layout:"vertical",onFinish:r,initialValues:{...a,avatar:t()},requiredMark:!0,children:[e.jsx(f.Item,{name:"avatar",label:"头像",rules:[{required:!0,message:"请输入您的昵称!"}],children:e.jsx(g,{})}),e.jsx(o,{name:"username",label:"用户名",rules:[{required:!0,message:"请输入您的用户名!"}]}),e.jsx(o,{name:"email",label:"邮箱",rules:[{required:!0,message:"请输入您的邮箱!"}]}),e.jsx(w,{name:"phoneNumber",label:"联系电话",rules:[{required:!0,message:"请输入您的联系电话!"}],children:e.jsx(h,{type:"tel",allowClear:!0})}),e.jsx(v,{allowClear:!0,name:"description",label:"个人简介",placeholder:"个人简介"})]})]})}export{S as default};
