import{j as r}from"./index-BGyuhmuP.js";import{am as d}from"./antd-Dy5x7wqK.js";import"./faker-Dcf0Eyuj.js";import"./react-XqWWy1gx.js";function l(e){return[{dataIndex:"index",title:e("common.index"),valueType:"indexBorder",width:80},{title:e("system.role.name"),dataIndex:"name",disable:!0,ellipsis:!0,width:120,formItemProps:{rules:[{required:!0,message:e("form.required")}]}},{disable:!0,title:e("system.role.id"),dataIndex:"code",width:120,filters:!0,onFilter:!0,ellipsis:!0},{disable:!0,title:e("common.status"),dataIndex:"status",valueType:"select",width:80,render:(t,a)=>r.jsx(d,{color:a.status===1?"success":"default",children:t}),valueEnum:{1:{text:e("common.enabled")},0:{text:e("common.deactivated")}}},{title:e("common.remark"),dataIndex:"remark",search:!1},{title:e("common.createTime"),dataIndex:"createTime",valueType:"date",width:100,search:!1},{title:e("common.updateTime"),dataIndex:"updateTime",valueType:"dateTime",width:170,search:!1}]}export{l as getConstantColumns};
