const t={body:document.querySelector("body"),dataStart:document.querySelector("button[data-start]"),dataStop:document.querySelector("button[data-stop]")};let a=null;t.dataStart.addEventListener("click",(function(){a=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),t.dataStop.removeAttribute("disabled"),t.dataStart.setAttribute("disabled",!0)})),t.dataStop.addEventListener("click",(function(){clearInterval(a),t.dataStart.removeAttribute("disabled"),t.dataStop.setAttribute("disabled",!0)}));
//# sourceMappingURL=01-color-switcher.151bc2ce.js.map
