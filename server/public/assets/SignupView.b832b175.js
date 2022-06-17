import{_ as U,o as i,c as b,a as e,p as S,b as D,u as P,r as l,d as f,w as x,e as v,v as m,f as I,t as E,g as $,h as M,i as V,j as C,k as y,F}from"./index.12f74801.js";import{F as T}from"./FormTemplate.b186e581.js";const a=o=>(S("data-v-b5103556"),o=o(),D(),o),B={class:"discord-id-modal"},N={class:"discord-id-modal-content"},R=a(()=>e("h1",null,"How to get your Discord User ID",-1)),q=a(()=>e("p",null,"Go into any channel on The Mantra",-1)),H=a(()=>e("p",{class:"bold"},"OR",-1)),L=a(()=>e("p",null,"Start a direct message with SunBot",-1)),A=a(()=>e("p",{class:"bold"},"THEN",-1)),j=a(()=>e("b",null,"Send the following command:",-1)),z=a(()=>e("br",null,null,-1)),G=a(()=>e("p",{class:"code"},"!userid",-1)),O=a(()=>e("p",null,"The bot will send you a private message with your User ID.",-1)),Z=a(()=>e("p",null,"Copy it, and paste it in the sign up form.",-1)),J={name:"DiscordIdModal",emits:["showDiscordIdModal"],setup(o,{emit:u}){return(d,t)=>(i(),b("div",B,[e("div",N,[R,q,H,L,A,j,z,G,O,Z,e("button",{onClick:t[0]||(t[0]=c=>u("showDiscordIdModal"))},"Close")])]))}};var K=U(J,[["__scopeId","data-v-b5103556"]]);const g=o=>(S("data-v-698ab2d4"),o=o(),D(),o),Q=["onSubmit"],W=g(()=>e("label",{for:"username"},"Username",-1)),X=["disabled"],Y=g(()=>e("label",{for:"password"},"Password",-1)),ee=["disabled"],se=g(()=>e("label",{for:"repeatPassword"},"Re-enter Password",-1)),te=["disabled"],oe={for:"discordUserId"},ae=M(" Discord User ID "),re=["disabled"],ne=["disabled"],de=["disabled"],le={key:0,class:"error-message"},ie={name:"SignupForm",setup(o){const u=P(),d=l(""),t=l(""),c=l(""),_=l(""),r=l("initial"),p=l(""),w=l(!1),k=async()=>{r.value="sending",p.value="";try{if(_.value.length!==18)throw new Error("Invalid Discord User ID.");if(t.value!==c.value)throw new Error("Passwords do not match.");if(d.value.length<3)throw new Error("Username must be at least 3 characters long.");if(t.value.length<6)throw new Error("Password must be at least 6 characters long.");if(t.value.length>100)throw new Error("Password must be less than 100 characters long.");if(d.value.length>100)throw new Error("Username must be less than 100 characters long.");if(!/^[a-zA-Z0-9_]+$/.test(d.value))throw new Error("Username must use only letters, numbers, and underscores.");await new Promise(s=>setTimeout(s,3e3));const h={username:d.value,password:t.value,discordUserId:_.value};await u.signup(h).then(()=>{V.push("/")}).catch(s=>{throw s})}catch(h){p.value=h.message,r.value="initial";return}};return(h,s)=>(i(),f(T,{status:r.value},{default:x(()=>[e("form",{onSubmit:I(k,["prevent"])},[W,v(e("input",{type:"text",id:"username","onUpdate:modelValue":s[0]||(s[0]=n=>d.value=n),placeholder:"Username",disabled:r.value==="sending",required:""},null,8,X),[[m,d.value]]),Y,v(e("input",{type:"password",id:"password","onUpdate:modelValue":s[1]||(s[1]=n=>t.value=n),placeholder:"Password",disabled:r.value==="sending",required:""},null,8,ee),[[m,t.value]]),se,v(e("input",{type:"password",id:"repeatPassword","onUpdate:modelValue":s[2]||(s[2]=n=>c.value=n),placeholder:"Re-enter password",disabled:r.value==="sending",required:""},null,8,te),[[m,c.value]]),e("label",oe,[ae,e("button",{onClick:s[3]||(s[3]=I(n=>w.value=!0,["prevent"])),disabled:r.value==="sending"}," How? ",8,re)]),v(e("input",{type:"text",id:"discordUserId","onUpdate:modelValue":s[4]||(s[4]=n=>_.value=n),placeholder:"Discord User ID",disabled:r.value==="sending",required:""},null,8,ne),[[m,_.value]]),e("button",{class:"btn-submit",type:"submit",disabled:r.value==="sending"}," Create Account ",8,de),p.value?(i(),b("span",le,E(p.value),1)):$("",!0)],40,Q),w.value?(i(),f(K,{key:0,onShowDiscordIdModal:s[5]||(s[5]=n=>w.value=!1)})):$("",!0)]),_:1},8,["status"]))}};var ue=U(ie,[["__scopeId","data-v-698ab2d4"]]);const ce=e("h1",null,"Sign Up",-1),_e={class:"center"},pe=e("p",null,[e("small",null,"or")],-1),he=M("Log In"),we={name:"SignupView",setup(o){return(u,d)=>{const t=C("RouterLink");return i(),b(F,null,[ce,y(ue),e("div",_e,[pe,y(t,{to:"/login"},{default:x(()=>[he]),_:1})])],64)}}};export{we as default};
