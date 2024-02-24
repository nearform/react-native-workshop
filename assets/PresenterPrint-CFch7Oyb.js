import{d as _,S as d,T as h,h as m,g as p,N as u,b as s,e as t,Q as a,a as l,F as f,J as v,t as g,v as x,o as n,U as y,j as b,k,f as N,_ as w}from"./index-BhtGJjse.js";import{N as P}from"./NoteDisplay-D7oXXnSs.js";const S={class:"m-4"},T={class:"mb-10"},V={class:"text-4xl font-bold mt-2"},L={class:"opacity-50"},B={class:"text-lg"},D={class:"font-bold flex gap-2"},H={class:"opacity-50"},j=t("div",{class:"flex-auto"},null,-1),z={key:0,class:"border-gray-400/50 mb-8"},C=_({__name:"PresenterPrint",setup(F){d(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),h({title:`Notes - ${m.title}`});const i=p(()=>u.map(o=>{var r;return(r=o.meta)==null?void 0:r.slide}).filter(o=>o!==void 0&&o.noteHTML!==""));return(o,r)=>(n(),s("div",{id:"page-root",style:g(l(x))},[t("div",S,[t("div",T,[t("h1",V,a(l(m).title),1),t("div",L,a(new Date().toLocaleString()),1)]),(n(!0),s(f,null,v(i.value,(e,c)=>(n(),s("div",{key:c,class:"flex flex-col gap-4 break-inside-avoid-page"},[t("div",null,[t("h2",B,[t("div",D,[t("div",H,a(e==null?void 0:e.no)+"/"+a(l(y)),1),b(" "+a(e==null?void 0:e.title)+" ",1),j])]),k(P,{"note-html":e.noteHTML,class:"max-w-full"},null,8,["note-html"])]),c<i.value.length-1?(n(),s("hr",z)):N("v-if",!0)]))),128))])],4))}}),E=w(C,[["__file","/home/runner/work/react-native-workshop/react-native-workshop/slides/node_modules/@slidev/client/internals/PresenterPrint.vue"]]);export{E as default};
