(this.webpackJsonpblog=this.webpackJsonpblog||[]).push([[0],{38:function(e,t,n){e.exports=n(75)},43:function(e,t,n){},44:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){},52:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){},74:function(e,t,n){},75:function(e,t,n){"use strict";n.r(t);var a=n(1),l=n.n(a),c=n(19),r=n.n(c),o=(n(43),n(4)),i=n(3),u=n(16);n(44);var s=function(){var e=Object(a.useRef)(null),t=Object(a.useRef)(null),n=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(e.current)switch(n){case 0:e.current.classList.remove("on");break;case 1:e.current.classList.add("on");break;case 2:e.current.classList.toggle("on")}},c=function(){t.current&&(t.current.classList.add("on"),document.body.addEventListener("click",i))},r=function(){t.current&&(t.current.classList.remove("on"),document.body.removeEventListener("click",i))},i=function(e){console.log("bodyevent \uc2e4\ud589",e.srcElement.className);var t=!0;["bb-header__sub-menu-box-ul","bb-header__sub-menu-box-li"].forEach((function(n,a){e.srcElement.className!==n&&"icon-user"!==e.srcElement.className.baseVal||(t=!1)})),t&&r()};return Object(a.useMemo)((function(){window.addEventListener("resize",(function(){var n,a;null===(n=e.current)||void 0===n||n.classList.remove("on"),null===(a=t.current)||void 0===a||a.classList.remove("on")}))}),[]),l.a.createElement("nav",{className:"bb-header__nav"},l.a.createElement("div",{className:"bb-header__menu--desktop"},l.a.createElement("div",{className:"bb-header__mobile-menu-btn",onClick:function(e){return n(e,2)}},l.a.createElement(u.b,{className:"icon-menu"})),l.a.createElement("div",{className:"bb-header__logo-btn",onClick:function(e){return n(e,0)}},l.a.createElement(o.b,{className:"text-black ",to:"/"},"Bumblog")),l.a.createElement("div",{className:"bb-header__desktop-menu-wrapper"},l.a.createElement("ul",{className:"bb-header__desktop-menu"},l.a.createElement("li",null)),l.a.createElement("div",{className:"bb-header__sub-menu"},l.a.createElement("div",{className:"bb-header__sub-menu-icon",onClick:function(){t.current&&(t.current.classList.contains("on")?r():c())}},l.a.createElement(u.c,{className:"icon-user"})),l.a.createElement("div",{className:"bb-header__sub-menu-box",ref:t},l.a.createElement("div",{className:"edge-wrapper"},l.a.createElement("div",{className:"edge"})),l.a.createElement("ul",{className:"bb-header__sub-menu-box-ul"},l.a.createElement("li",{className:"bb-header__sub-menu-box-li"},"1\ubc88 \uba54\ub274"),l.a.createElement("li",{className:"bb-header__sub-menu-box-li"},"1\ubc88 \uba54\ub274"),l.a.createElement("li",{className:"bb-header__sub-menu-box-li"},"1\ubc88 \uba54\ub274"),l.a.createElement("li",{className:"bb-header__sub-menu-box-li"},"1\ubc88 \uba54\ub274"),l.a.createElement("li",{className:"bb-header__sub-menu-box-li"},"1\ubc88 \uba54\ub274")))))),l.a.createElement("div",{className:"bb-header__mobile-menu-wrapper"},l.a.createElement("ul",{className:"bb-header__mobile-menu",ref:e},l.a.createElement("li",{onClick:function(e){return n(e,0)}},l.a.createElement(o.b,{to:"/board"},"MENU-1")),l.a.createElement("li",null,"MENU-2"),l.a.createElement("li",null,"MENU-3"),l.a.createElement("li",null,"MENU-4"))))};n(49);var m=function(){return l.a.createElement("footer",{className:"footer"},l.a.createElement("div",{className:"bg-ft"},l.a.createElement("div",null,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium eos repudiandae, porro voluptas, quidem excepturi quo soluta officia odit, alias quod minima autem deleniti laboriosam labore quaerat cum consectetur? Sequi!"),l.a.createElement("div",{className:"bg-ft-row-2"},l.a.createElement("div",{className:"bg-ft-copyright"},l.a.createElement("div",null,"Copyright \xa9 2020 Bumlog Inc. All rights reserved"),l.a.createElement("ul",null,l.a.createElement("li",null,"menu-1"),l.a.createElement("li",null,"menu-2"),l.a.createElement("li",null,"menu-3"),l.a.createElement("li",null,"menu-4"))),l.a.createElement("div",null,"logo"))))},d=n(11),b=(n(50),n(18)),E=n(15),f="modal/open",v="modal/close",_={status:!1,title:"",desc:"",confirm:{isShow:!1,func:function(){}}};var h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case f:return{status:!0,title:t.payload.title,desc:t.payload.desc,confirm:{isShow:t.payload.confirm.isShow}};case"modal/open_confirm":return{status:!0,title:t.payload.title,desc:t.payload.desc,confirm:{isShow:t.payload.confirm.isShow,func:t.payload.confirm.func}};case v:return Object(E.a)(Object(E.a)({},e),{},{status:!1});default:return e}};var p=function(){var e=Object(b.c)((function(e){return e.modal})),t=Object(b.b)();return{state:e,onOpenModal:Object(a.useCallback)((function(e){t(function(e){return{type:f,payload:{title:e.title,desc:e.desc,confirm:{isShow:e.confirm.isShow}}}}(e))}),[t]),onOpenConfirmModal:Object(a.useCallback)((function(e){t(function(e){return{type:"modal/open_confirm",payload:{title:e.title,desc:e.desc,confirm:{isShow:e.confirm.isShow,func:e.confirm.func}}}}(e))}),[t]),onCloseModal:Object(a.useCallback)((function(){t({type:v})}),[t])}},N=n(9);function w(e){var t=e.data,n=p(),c=n.state,r=n.onCloseModal,o=Object(a.useRef)(null),i=Object(a.useState)(t),u=Object(d.a)(i,2),s=u[0],m=u[1];Object(a.useEffect)((function(){m(c)}),[c]);var b=function(){r()};return l.a.createElement("div",{className:"bb-modal__body ".concat(s.status&&"on"),ref:o},l.a.createElement("div",{className:"bb-modal__dim",onClick:b}),l.a.createElement("div",{className:"bb-modal__window"},l.a.createElement("div",{className:"bb-modal__window-close-btn",onClick:b},l.a.createElement(N.j,{className:"bb-modal__window-corss-icon"})),l.a.createElement("div",null,l.a.createElement("h1",{className:"bb-modal__window-title"},s.title),l.a.createElement("div",{className:"bb-modal__window-desc"},s.desc),l.a.createElement("div",{className:"bb-modal__window-btns ".concat(s.confirm.isShow&&"on")},l.a.createElement("button",{onClick:b},"\uc544\ub2c8\uc624"),l.a.createElement("button",{onClick:s.confirm.func},"\uc608")))))}w.defaultProps={data:{status:!1,title:"",desc:"",confirm:{isShow:!1}}};var g=w;n(52);n(53),n(54);var k=function(e){var t=e.data;return l.a.createElement("li",{className:"bb-board-list__body"},l.a.createElement(o.b,{to:"/board/view?_id=".concat(t._id)},l.a.createElement("div",{className:"bb-board-list__contents-wrapper"},l.a.createElement("div",{className:"bb-board-list__article"},l.a.createElement("h2",{className:"main-title"},t.title),l.a.createElement("div",{className:"sub-title"},t.subTitle),l.a.createElement("ul",{className:"info"},l.a.createElement("li",null,"\ub313\uae000"),l.a.createElement("li",null,"\ub0a0\uc9dc"),l.a.createElement("li",null,"by ",t.writer))),l.a.createElement("div",null,l.a.createElement("figure",{className:"bb-board-list__image"})))))},y=n(12),j=n.n(y);var C=function(){var e=Object(a.useState)([]),t=Object(d.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){console.log("BoardHome-useEffect \uc2e4\ud589"),j()({method:"get",url:"/api/board/list"}).then((function(e){console.log("data",e.data),c(e.data)}))}),[]),l.a.createElement("main",{className:"bb-board-home__main"},l.a.createElement("section",{className:"bb-board-home__hero-section"},l.a.createElement("div",null,l.a.createElement("h1",null,"My Blog"),l.a.createElement("div",{className:"bb-board-home__hero-desc"},"\uc0dd\uac01\ub098\ub294 \uac83\uc744 \uae30\ub85d\ud558\uace0 \uc800\uc7a5\ud558\ub294 \uacf5\uac04"))),l.a.createElement("section",{className:"bb-board-home__tag-section"},l.a.createElement("div",null,l.a.createElement("ul",{className:"bb-board-home__tag-ul"},l.a.createElement("li",{className:"on"},"\ubaa8\ub450"),l.a.createElement("li",null,"\ud504\ub85c\uadf8\ub798\ubc0d"),l.a.createElement("li",null,"\uc2a4\ub9c8\ud2b8\ud3f0"),l.a.createElement("li",null,"\ucf54\ub529"),l.a.createElement("li",null,"\uacf5\ubd80"),l.a.createElement("li",null,"\uc544\uc774\ud3f0")))),l.a.createElement("section",null,l.a.createElement("div",{className:"bb-board-home__btns-wrapper"},l.a.createElement("div",null,"\xa0"),l.a.createElement("div",null,l.a.createElement(o.b,{to:"/board/write"},"- \uae00\uc4f0\uae30 -")))),l.a.createElement("section",{className:"bb-board-home__list-section"},l.a.createElement("ul",null,n.map((function(e){return l.a.createElement(k,{key:e._id,data:e})})))))},O=(n(72),function(e){var t=e.substring(1).split("&"),n={};return t.forEach((function(e){var t=e.split("=");n[t[0]]=t[1]})),n});var S=function(e){var t=p(),n=t.onOpenConfirmModal,c=t.onCloseModal,r=Object(a.useState)({_id:"",subTitle:"",title:"",description:"",writer:""}),u=Object(d.a)(r,2),s=u[0],m=u[1],b=Object(i.f)();return Object(a.useEffect)((function(){console.log("useEffect");var t=e.location.search,n=O(t);console.log("searchData",n),j()({method:"get",url:"/api/board/list",params:n}).then((function(e){console.log("res",e.data[0]),e.data[0]&&m(e.data[0])}))}),[]),l.a.createElement("main",{className:"main"},l.a.createElement("section",{className:"bb-board-view__hero-section"},l.a.createElement("div",{className:"bb-board-view__hero-section-title-wrapper"},l.a.createElement("h1",null,null===s||void 0===s?void 0:s.title),l.a.createElement("div",{className:"bb-board-view__subtitle"},null===s||void 0===s?void 0:s.subTitle))),l.a.createElement("section",{className:"bb-board-view__article-section"},l.a.createElement("article",{className:"bb-board-view__article tui-editor-contents",dangerouslySetInnerHTML:{__html:s.description}}),l.a.createElement("ul",{className:"bb-board-view__update-btns"},l.a.createElement("li",null,l.a.createElement("button",null,l.a.createElement(o.b,{to:"/board/write?_id=".concat(null===s._id?"":s._id)},"\uc218\uc815"))),l.a.createElement("li",null,l.a.createElement("button",{onClick:function(){n({status:!0,title:"\uc815\ub9d0 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",desc:"\uc0ad\uc81c\ud55c \ub370\uc774\ud130\ub294 \ubcf5\uc6d0\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.",confirm:{isShow:!0,func:function(){j()({method:"delete",url:"/api/board/list",data:s}).then((function(e){console.log("deleteRes",e.data[0]),c(),b.push("/board")}))}}})}},"\uc0ad\uc81c")))))},x=n(21),D=(n(73),n(37));var L=function(e){var t=Object(a.useState)({title:"",subTitle:""}),n=Object(d.a)(t,2),c=n[0],r=n[1],o=Object(a.useState)(!1),u=Object(d.a)(o,2),s=u[0],m=u[1],b=Object(a.useState)({_id:null}),f=Object(d.a)(b,2),v=f[0],_=f[1],h=Object(i.f)(),p=Object(a.useRef)(null),w=Object(a.useRef)(null),g=function(e,t,n){p.current&&p.current.contentDocument&&(p.current.contentDocument.addEventListener("keyup",k),p.current.contentDocument.addEventListener("click",k)),n&&n.currentTarget.classList.toggle("on"),p.current&&p.current.contentDocument&&(""===t?p.current.contentDocument.execCommand(e):p.current.contentDocument.execCommand(e,!0,t)),p.current&&p.current.contentDocument&&p.current.contentDocument.body.focus()},k=function(){if(p.current&&p.current.contentDocument){var e=p.current.contentDocument;w.current&&w.current.childNodes.forEach((function(t){t.dataset.cmd&&(e.queryCommandState(t.dataset.cmd)?t.classList.add("on"):t.classList.remove("on"))}))}},y=Object(a.useRef)(null);Object(a.useEffect)((function(){p.current&&p.current.contentDocument&&(p.current.contentDocument.designMode="on",p.current.contentDocument.body.style.fontFamily="NotoSansKR-Regular");var t=e.location.search,n=O(t);return _(n),console.log("searchData",n),n._id?(m(!0),j()({method:"get",url:"/api/board/list",params:n}).then((function(e){console.log("res",e.data[0]),r({title:e.data[0].title,subTitle:e.data[0].subTitle}),p.current&&p.current.contentDocument&&(p.current.contentDocument.body.innerHTML=e.data[0].description)}))):m(!1),function(){p.current&&p.current.contentDocument&&(p.current.contentDocument.removeEventListener("keyup",k),p.current.contentDocument.removeEventListener("click",k))}}),[]);var C=function(e){var t=e.target,n=t.name,a=t.value;r(Object(E.a)(Object(E.a)({},c),{},Object(x.a)({},n,a)))};return l.a.createElement("main",{className:"bb-board-write__main"},l.a.createElement("form",{className:"bb-board-write__form",onSubmit:function(e){var t,n,a,l;e.preventDefault();var o={_id:v._id,title:c.title,subTitle:c.subTitle,description:null===(t=p.current)||void 0===t||null===(n=t.contentDocument)||void 0===n?void 0:n.body.innerHTML,writer:"bkshin2"};console.log("boardTitle",c),console.log("boardArticle",null===(a=p.current)||void 0===a||null===(l=a.contentDocument)||void 0===l?void 0:l.body.innerHTML),r({title:"",subTitle:""}),p.current&&p.current.contentDocument&&(p.current.contentDocument.body.innerHTML=""),s?j()({method:"put",url:"/api/board/list",data:o}).then((function(e){console.log("put_res",e.data[0]),h.push("/board/view?_id="+v._id)})):j()({method:"post",url:"/api/board/list",data:o}).then((function(e){console.log("post_res",e.data[0]),h.push("/board")}))}},l.a.createElement("input",{className:"bb-board-write__title",placeholder:"\uc81c\ubaa9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.",type:"text",name:"title",value:null===c||void 0===c?void 0:c.title,onChange:C}),l.a.createElement("input",{className:"bb-board-write__title--sub",placeholder:"\uc18c\uc81c\ubaa9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.",type:"text",name:"subTitle",value:null===c||void 0===c?void 0:c.subTitle,onChange:C}),l.a.createElement("div",{className:"bb-board-write__editor-wrapper"},l.a.createElement("ul",{className:"bb-board-write__editor-options",ref:w},l.a.createElement("li",{"data-cmd":"bold",onClick:function(e){return g("bold","",e)}},l.a.createElement(N.f,null)),l.a.createElement("li",{"data-cmd":"italic",onClick:function(e){return g("italic","",e)}},l.a.createElement(N.g,null)),l.a.createElement("li",{"data-cmd":"underline",onClick:function(e){return g("underline","",e)}},l.a.createElement(N.i,null)),l.a.createElement("li",{"data-cmd":"strikethrough",onClick:function(e){return g("strikethrough","",e)}},l.a.createElement(N.h,null)),l.a.createElement("li",{"data-cmd":"justifycenter",onClick:function(e){return g("justifycenter","",e)}},l.a.createElement(N.c,null)),l.a.createElement("li",{onClick:function(e){return g("insertunorderedlist","")}},l.a.createElement(N.b,null)),l.a.createElement("li",{onClick:function(e){return g("insertorderedlist","")}},l.a.createElement(N.a,null)),l.a.createElement("li",{onClick:function(e){return g("indent","")}},l.a.createElement(N.d,null)),l.a.createElement("li",{onClick:function(e){return g("outdent","")}},l.a.createElement(N.e,null)),l.a.createElement("li",{onClick:function(){y.current&&y.current.classList.toggle("on")}},l.a.createElement(D.a,null),l.a.createElement("ul",{className:"bb-board-write__editor-font-box",ref:y},l.a.createElement("li",{onClick:function(e){return g("fontSize","1")}},"10px"),l.a.createElement("li",{onClick:function(e){return g("fontSize","2")}},"13px"),l.a.createElement("li",{onClick:function(e){return g("fontSize","3")}},"16px"),l.a.createElement("li",{onClick:function(e){return g("fontSize","4")}},"18px"),l.a.createElement("li",{onClick:function(e){return g("fontSize","5")}},"24px"),l.a.createElement("li",{onClick:function(e){return g("fontSize","6")}},"32px"),l.a.createElement("li",{onClick:function(e){return g("fontSize","7")}},"48px")))),l.a.createElement("iframe",{className:"bb-board-wrtie__editor",name:"boadeditrot",ref:p})),l.a.createElement("div",{className:"bb-board-write__buttons"},l.a.createElement("button",null,"\ucde8\uc18c"),l.a.createElement("button",null,"\uc644\ub8cc"))))};n(74);var M=function(){return l.a.createElement("div",{className:"bb-body"},l.a.createElement(o.a,null,l.a.createElement(s,null),l.a.createElement(g,null),l.a.createElement(i.a,{exact:!0,path:"/",component:C}),l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/board/write",component:L}),l.a.createElement(i.a,{path:"/board/view",component:S}),l.a.createElement(i.a,{path:"/board",component:C})),l.a.createElement(m,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var T=n(14),R=Object(T.b)({modal:h}),z=Object(T.c)(R);r.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(b.a,{store:z},l.a.createElement(M,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[38,1,2]]]);
//# sourceMappingURL=main.5df85cb9.chunk.js.map