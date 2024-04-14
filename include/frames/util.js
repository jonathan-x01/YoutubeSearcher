const API = {
  frameVar : {
    saveBtn : window.parent.document.getElementById("modal-custom"),
    closeBtn : window.parent.document.getElementById("modal-close"),
    saveBtnPar : window.parent.document.getElementById("modal-custom")
  },
  saveButton : {
    rename : function(name){
      const saveBtn = API.frameVar.saveBtn;
      saveBtn.innerHTML = name;
    },
    style : function(property, value){
      const saveBtn = API.frameVar.saveBtn;
      saveBtn.style[property] = value;
    },
    event : function(evt, func, useCapture){
      const saveBtn = API.frameVar.saveBtnPar;
      saveBtn.addEventListener(evt,func,useCapture);
    }
  },
  closeButton : {
    rename : function(name){
      const closeBtn = API.frameVar.closeBtn;
      closeBtn.innerHTML = name;
    },
    style : function(property, value){
      const closeBtn = API.frameVar.closeBtn;
      if ((property == "display" && value == "none") || (property == "visibility" && value == "hidden")){
        console.error(`Style Error: You cannot the style to the close button to ${property}:${value}`);
      } else {
        closeBtn.style[property] = value;
      }
    }
  }
}

function modalClose(){
  const modalCustom = window.parent.document.getElementById("modal-custom");
  const modalClose = window.parent.document.getElementById("modal-close");
  modalCustom.removeAttribute("style");
  modalClose.removeAttribute("style");
}

console.log(window.parent.document);
window.parent.document.getElementById("modal-close").addEventListener("click",function(){
  modalClose();
});

window.parent.document.getElementById("modal-custom").addEventListener("click",function(){
  modalClose();
});
