import{createContext as P}from"react";import{useContext as R}from"react";import w,{useCallback as M,useState as D,useRef as I,useEffect as S}from"react";var g=()=>crypto.randomUUID();var k=(o=0)=>{let[d,e]=D([]),r=I({}),c=M((t,a)=>{let n=g(),s=a?.onClose,m=w.cloneElement(t,{onClose:s});e(B=>[...B,{id:n,component:m,isVisible:!0,config:{useDim:a?.useDim??l.useDim,allowDimClickClose:a?.allowDimClickClose??l.allowDimClickClose,allowBackgroundScroll:a?.allowBackgroundScroll??l.allowBackgroundScroll},onClose:s}])},[]),i=M(()=>{e(t=>{if(t.length===0)return t;let a=t.map((n,s)=>s===t.length-1?{...n,isVisible:!1}:n);if(o>0){let n=t[t.length-1]?.id;n&&(r.current[n]=setTimeout(()=>{e(s=>s.filter(m=>m.id!==n)),delete r.current[n]},o))}else return a.filter((n,s)=>s!==a.length-1);return a})},[o]),u=M(()=>{e(t=>t.map(a=>({...a,isVisible:!1}))),o>0?setTimeout(()=>{e([])},o):e([])},[o]);return S(()=>()=>{Object.keys(r.current).forEach(t=>{clearTimeout(r.current[t])})},[]),{modals:d,openModal:c,closeModal:i,closeAllModals:u}};import{jsx as O,jsxs as N}from"react/jsx-runtime";var b=P(null),l={baseZindex:1e4,useDim:!0,allowDimClickClose:!0,allowBackgroundScroll:!0,dimBackgroundColor:"rgba(0,0,0,0.5)",cleanupDelay:300},v=({children:o,customModalContainer:d,initialConfig:e=l})=>{let{modals:r,openModal:c,closeModal:i,closeAllModals:u}=k(e.cleanupDelay??l.cleanupDelay);return N(b.Provider,{value:{modals:r,openModal:c,closeModal:i,closeAllModals:u},children:[d??O(f,{initialConfig:{useDim:e.useDim??l.useDim,allowDimClickClose:e.allowDimClickClose??l.allowDimClickClose,allowBackgroundScroll:e.allowBackgroundScroll??l.allowBackgroundScroll,dimBackgroundColor:e.dimBackgroundColor??l.dimBackgroundColor,baseZindex:e.baseZindex??l.baseZindex}}),o]})},C=()=>{let o=R(b);if(!o)throw new Error("useModal must be used within a ModalProvider");return o};import x from"./BasicModalContainer.module.module.css";import{Fragment as h,jsx as p}from"react/jsx-runtime";var f=({initialConfig:o})=>{let{modals:d,closeModal:e}=C();return p(h,{children:d.map((r,c)=>p("div",{className:`${r.isVisible?x.fadeIn:x.fadeOut}`,style:{position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:r.config.useDim?o.dimBackgroundColor:"transparent",zIndex:o.baseZindex+c,pointerEvents:r.isVisible?"auto":"none"},onClick:i=>r.config.allowDimClickClose??o.allowDimClickClose?e():i.preventDefault(),children:p("div",{style:{pointerEvents:r.isVisible?"auto":"none"},onClick:i=>i.stopPropagation(),children:r.component})},r.id))})};export{f as BasicModalContainer,v as ModalProvider,C as useModal};
//# sourceMappingURL=index.mjs.map