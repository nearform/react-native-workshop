const __vite__fileDeps=["assets/slidev/DrawingControls-DWahCYCc.js","assets/modules/unplugin-icons-B-3P863m.js","assets/modules/vue-BLuUREMP.js","assets/modules/shiki-BRF4czga.js","assets/modules/shiki-BPvBenZD.css","assets/slidev/DrawingPreview-C8rlMvdO.js","assets/index-BeRQwvit.js","assets/index-IkN0pZCy.css","assets/DrawingPreview-BB_gIMFu.css","assets/slidev/ContextMenu-CAma7IFx.js","assets/slidev/IconButton-BH1jyv4E.js","assets/slidev/context-CUHJiZZX.js","assets/ContextMenu-EZAKxWQn.css","assets/DrawingControls-C5T1oZL5.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{d as p,aa as V,o as i,c as u,b as f,e as l,f as N,i as S,g as d,af as O,y as D,k as g,a6 as P,M as v,l as _,F as M,v as z,x as C,h as R,t as W}from"../modules/vue-BLuUREMP.js";import{_ as m,v as h,a as E,w as j,x as B,y as H,z as A,A as T,d as G,B as L,o as y,D as Q,E as U}from"../index-BeRQwvit.js";import{Q as F,G as K,C as X,u as Y,r as q,N as J,S as Z,o as $}from"./ContextMenu-CAma7IFx.js";import{b as ee,S as oe}from"./DrawingPreview-C8rlMvdO.js";import{o as te}from"../modules/unplugin-icons-B-3P863m.js";import"../modules/shiki-BRF4czga.js";import"./IconButton-BH1jyv4E.js";import"./context-CUHJiZZX.js";const re=p({__name:"Modal",props:{modelValue:{default:!1},class:{default:""}},emits:["update:modelValue"],setup(a,{expose:o,emit:t}){o();const e=a,r=t,n=V(e,"modelValue",r);function s(){n.value=!1}const c={props:e,emit:r,value:n,onClick:s};return Object.defineProperty(c,"__isScriptSetup",{enumerable:!1,value:!0}),c}}),ne={key:0,class:"fixed top-0 bottom-0 left-0 right-0 grid z-20"};function se(a,o,t,e,r,n){return i(),u(O,null,[e.value?(i(),f("div",ne,[l("div",{bg:"black opacity-80",class:"absolute top-0 bottom-0 left-0 right-0 -z-1",onClick:o[0]||(o[0]=s=>e.onClick())}),l("div",{class:S(["m-auto rounded-md bg-main shadow",e.props.class]),"dark:border":"~ main"},[N(a.$slots,"default")],2)])):d("v-if",!0)],1024)}const ie=m(re,[["render",se],["__file","/home/runner/work/react-native-workshop/react-native-workshop/slides/node_modules/@slidev/client/internals/Modal.vue"]]),ae=p({__name:"InfoDialog",props:{modelValue:{default:!1}},emits:["update:modelValue"],setup(a,{expose:o,emit:t}){o();const e=a,r=t,n=V(e,"modelValue",r),s=D(()=>typeof h.info=="string"),c={props:e,emit:r,value:n,hasInfo:s,get configs(){return h},Modal:ie};return Object.defineProperty(c,"__isScriptSetup",{enumerable:!1,value:!0}),c}}),le="/react-native-workshop/assets/logo-BYkHSa_O.png",de={class:"slidev-info-dialog slidev-layout flex flex-col gap-4 text-base"},ce=["innerHTML"],ue=l("a",{href:"https://github.com/slidevjs/slidev",target:"_blank",class:"!opacity-100 !border-none !text-current"},[l("div",{class:"flex gap-1 children:my-auto"},[l("div",{class:"opacity-50 text-sm mr-2"},"Powered by"),l("img",{class:"w-5 h-5",src:le,alt:"Slidev logo"}),l("div",{style:{color:"#2082A6"}},[l("b",null,"Sli"),P("dev ")])])],-1);function _e(a,o,t,e,r,n){return i(),u(e.Modal,{modelValue:e.value,"onUpdate:modelValue":o[0]||(o[0]=s=>e.value=s),class:"px-6 py-4"},{default:g(()=>[l("div",de,[e.hasInfo?(i(),f("div",{key:0,class:"mb-4",innerHTML:e.configs.info},null,8,ce)):d("v-if",!0),ue])]),_:1},8,["modelValue"])}const fe=m(ae,[["render",_e],["__file","/home/runner/work/react-native-workshop/react-native-workshop/slides/node_modules/@slidev/client/internals/InfoDialog.vue"]]),pe=p({__name:"Controls",setup(a,{expose:o}){o();const{isEmbedded:t}=E(),e=!h.drawings.presenterOnly&&!t.value,r=v();e&&j(()=>import("./DrawingControls-DWahCYCc.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13])).then(w=>r.value=w.default);const n=v(),s=v(),c={isEmbedded:t,drawingEnabled:e,DrawingControls:r,WebCamera:n,RecordingDialog:s,get showInfoDialog(){return B},get showRecordingDialog(){return H},get configs(){return h},QuickOverview:F,InfoDialog:fe,Goto:K,ContextMenu:X};return Object.defineProperty(c,"__isScriptSetup",{enumerable:!1,value:!0}),c}});function me(a,o,t,e,r,n){return i(),f(M,null,[e.drawingEnabled&&e.DrawingControls?(i(),u(e.DrawingControls,{key:0})):d("v-if",!0),_(e.QuickOverview),_(e.Goto),e.WebCamera?(i(),u(e.WebCamera,{key:1})):d("v-if",!0),e.RecordingDialog?(i(),u(e.RecordingDialog,{key:2,modelValue:e.showRecordingDialog,"onUpdate:modelValue":o[0]||(o[0]=s=>e.showRecordingDialog=s)},null,8,["modelValue"])):d("v-if",!0),e.configs.info?(i(),u(e.InfoDialog,{key:3,modelValue:e.showInfoDialog,"onUpdate:modelValue":o[1]||(o[1]=s=>e.showInfoDialog=s)},null,8,["modelValue"])):d("v-if",!0),_(e.ContextMenu)],64)}const ve=m(pe,[["render",me],["__file","/home/runner/work/react-native-workshop/react-native-workshop/slides/node_modules/@slidev/client/internals/Controls.vue"]]),ge=p({__name:"PrintStyle",setup(a,{expose:o}){o();function t(r,{slots:n}){if(n.default)return z("style",n.default())}const e={vStyle:t,get slideHeight(){return A},get slideWidth(){return T}};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}});function he(a,o,t,e,r,n){return i(),u(e.vStyle,null,{default:g(()=>[P(" @page { size: "+C(e.slideWidth)+"px "+C(e.slideHeight)+"px; margin: 0px; } ",1)]),_:1})}const we=m(ge,[["render",he],["__file","/home/runner/work/react-native-workshop/react-native-workshop/slides/node_modules/@slidev/client/internals/PrintStyle.vue"]]),ke=p({__name:"PresenterMouse",setup(a,{expose:o}){o();const t={get sharedState(){return G}};return Object.defineProperty(t,"__isScriptSetup",{enumerable:!1,value:!0}),t}}),ye={key:0,class:"absolute top-0 left-0 right-0 bottom-0 pointer-events-none text-xl"};function Se(a,o,t,e,r,n){const s=te;return e.sharedState.cursor?(i(),f("div",ye,[_(s,{class:"absolute stroke-white dark:stroke-black",style:R({left:`${e.sharedState.cursor.x}%`,top:`${e.sharedState.cursor.y}%`,strokeWidth:16})},null,8,["style"])])):d("v-if",!0)}const be=m(ke,[["render",Se],["__file","/home/runner/work/react-native-workshop/react-native-workshop/slides/node_modules/@slidev/client/internals/PresenterMouse.vue"]]),xe=p({__name:"play",setup(a,{expose:o}){o();const{next:t,prev:e,isPrintMode:r}=E(),{isDrawing:n}=ee(),s=W();function c(k){var x;y.value||k.button===0&&((x=k.target)==null?void 0:x.id)==="slide-container"&&(k.pageX/window.innerWidth>.5?t():e())}Y(s),q();const w=D(()=>L.value||y.value),I=v(),b={next:t,prev:e,isPrintMode:r,isDrawing:n,root:s,onClick:c,persistNav:w,SideEditor:I,get isEditorVertical(){return Q},get showEditor(){return y},get windowSize(){return U},Controls:ve,SlideContainer:oe,NavControls:J,SlidesShow:Z,PrintStyle:we,get onContextMenu(){return $},PresenterMouse:be};return Object.defineProperty(b,"__isScriptSetup",{enumerable:!1,value:!0}),b}}),Ce=l("div",{id:"twoslash-container"},null,-1);function Ve(a,o,t,e,r,n){return i(),f(M,null,[e.isPrintMode?(i(),u(e.PrintStyle,{key:0})):d("v-if",!0),l("div",{id:"page-root",ref:"root",class:S(["grid",e.isEditorVertical?"grid-rows-[1fr_max-content]":"grid-cols-[1fr_max-content]"])},[_(e.SlideContainer,{style:{background:"var(--slidev-slide-container-background, black)"},width:e.isPrintMode?e.windowSize.width.value:void 0,"is-main":"",onPointerdown:e.onClick,onContextmenu:e.onContextMenu},{default:g(()=>[_(e.SlidesShow,{"render-context":"slide"}),_(e.PresenterMouse)]),controls:g(()=>[e.isPrintMode?d("v-if",!0):(i(),f("div",{key:0,class:S(["absolute bottom-0 left-0 transition duration-300 opacity-0 hover:opacity-100",[e.persistNav?"!opacity-100 right-0":"opacity-0 p-2",e.isDrawing?"pointer-events-none":""]])},[_(e.NavControls,{persist:e.persistNav},null,8,["persist"])],2))]),_:1},8,["width","onContextmenu"]),e.SideEditor&&e.showEditor?(i(),u(e.SideEditor,{key:0,resize:!0})):d("v-if",!0)],2),e.isPrintMode?d("v-if",!0):(i(),u(e.Controls,{key:1})),Ce],64)}const Re=m(xe,[["render",Ve],["__file","/home/runner/work/react-native-workshop/react-native-workshop/slides/node_modules/@slidev/client/pages/play.vue"]]);export{Re as default};
