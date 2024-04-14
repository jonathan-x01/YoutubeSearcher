window.addEventListener("click",function(prop){
  if (prop.target.localName != "input"){
    if (globalInput.value == ""){
      removeSuggestions();
    }
  }
  globalInput.focus();
});

window.addEventListener("dblclick",function(prop){
  if (prop.target.localName != "input"){
    removeSuggestions();
    globalInput.blur();
  } else if (prop.target.localName == "input"){
    console.log(globalInput.value);
    autoComplete(globalInput.value);
  }
});
