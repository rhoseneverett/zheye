import{_ as V,a as u}from"./ValidateInput.vue_vue_type_script_setup_true_lang-Cu3nB_zu.js";import{d as v,j as _,k as r,l as g,w as m,b as s,e as i,m as w,o as y,n as R}from"./index-Fwnne_Bv.js";const U={class:"mb-3"},k={class:"mb-3"},C=v({__name:"Login",setup(q){const n=_(),a=r("111111"),d=[{type:"required",message:"密码不能为空"},{type:"password",message:"请输入数字和字母组合的8-16位密码"}],l=r("1453477168@qq.com"),p=[{type:"required",message:"电子邮箱不能为空"},{type:"email",message:"邮箱格式不符合要求"}],c=r(null),f=async o=>{console.log(o),o&&(await n.login(l.value,a.value),await n.fetchCurrentUser(),R("登录成功 1秒后跳转首页","success",1e3),setTimeout(()=>{b.push("/")},1e3))},b=w();return(o,e)=>(y(),g(V,{class:"validate-form-container",onFormSubmit:f},{submit:m(()=>e[4]||(e[4]=[s("span",{class:"btn btn-primary"},"提交",-1)])),default:m(()=>[s("div",U,[e[2]||(e[2]=s("label",{class:"form-label"},"邮箱地址",-1)),i(u,{rules:p,modelValue:l.value,"onUpdate:modelValue":e[0]||(e[0]=t=>l.value=t),placeholder:"请输入邮箱地址",ref_key:"inputRef",ref:c},null,8,["modelValue"])]),s("div",k,[e[3]||(e[3]=s("label",{class:"form-label"},"密码",-1)),i(u,{type:"password",rules:d,modelValue:a.value,"onUpdate:modelValue":e[1]||(e[1]=t=>a.value=t),placeholder:"请输入密码"},null,8,["modelValue"])])]),_:1}))}});export{C as default};
