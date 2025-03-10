import{d as k,A as c,B as _,a as n,v,b as f,y,o as i,p as V,c as $,g as B,C as b,h as A,D as h,x as g,E as w,t as C}from"./index-Fwnne_Bv.js";const D={class:"validate-form-container"},U=k({__name:"ValidateForm",emits:["form-submit"],setup(p,{emit:m}){const d=m,u=()=>{const e=o.map(t=>t()).every(t=>t);d("form-submit",e)};let o=[];const l=e=>{e&&o.push(e)};return c.on("form-item-created",l),_(()=>{c.off("form-item-created",l),o=[]}),(e,t)=>(i(),n("form",D,[v(e.$slots,"default"),f("div",{class:"submit-area",onClick:y(u,["prevent"])},[v(e.$slots,"submit",{},()=>[t[0]||(t[0]=f("button",{class:"btn btn-primary"},"提交",-1))])])]))}}),M={class:"validate-input-container pb-3"},x={key:2,class:"invalid-feedback"},Z=k({inheritAttrs:!1,__name:"ValidateInput",props:{rules:{},modelValue:{},tag:{default:"input"}},emits:["update:modelValue"],setup(p,{expose:m,emit:d}){const u=/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,o=p,l=d,e=V({val:$({get:()=>o.modelValue||"",set:s=>{l("update:modelValue",s)}}),error:!1,message:""}),t=()=>{if(o.rules){const s=o.rules.every(a=>{let r=!0;switch(e.message=a.message,a.type){case"required":r=e.val.trim()!=="";break;case"email":r=u.test(e.val);break;case"password":r=a.validator?a.validator():!0;break}return r});return e.error=!s,s}return!0};return B(()=>{c.emit("form-item-created",t)}),m({validateInput:t}),(s,a)=>(i(),n("div",M,[s.tag!=="textarea"?b((i(),n("input",g({key:0,"onUpdate:modelValue":a[0]||(a[0]=r=>e.val=r),onBlur:t},s.$attrs,{class:["form-control",{"is-invalid":e.error}]}),null,16)),[[h,e.val]]):b((i(),n("textarea",g({key:1,class:["form-control",{"is-invalid":e.error}],"onUpdate:modelValue":a[1]||(a[1]=r=>e.val=r),onBlur:t},s.$attrs),"    ",16)),[[w,e.val]]),e.error?(i(),n("span",x,C(e.message),1)):A("",!0)]))}});export{U as _,Z as a};
