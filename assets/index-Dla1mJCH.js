import{j as e,C as m,a as u}from"./index-DCJLHlK_.js";import"./react-B2eEhSVY.js";import{B as n}from"./index-BWNyU8Yp.js";import{N as c,ag as d,l as p,aJ as x,aC as f,i as h}from"./antd-CVnYY_BH.js";import{P as j}from"./index-BPh6kG-i.js";import{W as o}from"./BaseForm-DTXjb35e.js";import{F as w}from"./index-5e-8fS5G.js";import{P as g}from"./index-DseAqMde.js";import"./faker-Dcf0Eyuj.js";import"./index-Cxr5CkKM.js";function v({value:a,onChange:t}){return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex items-center gap-5",children:[e.jsx(c,{size:100,src:a}),e.jsx(m,{rotationSlider:!0,aspectSlider:!0,showReset:!0,showGrid:!0,cropShape:"rect",children:e.jsx(d,{accept:"image/*",showUploadList:!1,name:"file",action:"/api/upload",headers:{authorization:"authorization-text"},onChange:r=>{var s,i,l;r.file.status==="done"?((s=window.$message)==null||s.success(`${r.file.name} file uploaded successfully`),t==null||t((i=r.file.response)==null?void 0:i.result)):r.file.status==="error"&&((l=window.$message)==null||l.error(`${r.file.name} file upload failed.`))},children:e.jsx(p,{icon:e.jsx(x,{}),children:"更换头像"})})})]})})}function N(){const a=u(),t=()=>a?a.avatar?a.avatar:"https://avatar.vercel.sh/blur.svg?text=2":"",r=async()=>{var s;(s=window.$message)==null||s.success("更新基本信息成功")};return e.jsxs(n,{className:"max-w-md ml-10",children:[e.jsx("h3",{children:"我的资料"}),e.jsxs(j,{layout:"vertical",onFinish:r,initialValues:{...a,avatar:t()},requiredMark:!0,children:[e.jsx(f.Item,{name:"avatar",label:"头像",rules:[{required:!0,message:"请输入您的昵称!"}],children:e.jsx(v,{})}),e.jsx(o,{name:"username",label:"用户名",rules:[{required:!0,message:"请输入您的用户名!"}]}),e.jsx(o,{name:"email",label:"邮箱",rules:[{required:!0,message:"请输入您的邮箱!"}]}),e.jsx(w,{name:"phoneNumber",label:"联系电话",rules:[{required:!0,message:"请输入您的联系电话!"}],children:e.jsx(h,{type:"tel",allowClear:!0})}),e.jsx(g,{allowClear:!0,name:"description",label:"个人简介",placeholder:"个人简介"})]})]})}export{N as default};
