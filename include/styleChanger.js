var gibr = "32px";
// Ac will stand for autocomplete.

// Will get the border radius of certain stuff.
// type = The type, such as globalinput or submitbtn. It is not case sensitive.
// Set = If you want to set the border radius, mark this. To get the border radius, leave blank or null.
function borderRadius(type, set){
  type = type.toLowerCase();
  if (type == "globalinput"){
    if (set === null){
      return globalInput.style.borderBottomLeftRadius;
    } else {
      globalInput.style.borderBottomLeftRadius = set;
    }
  } else if (type == "submitbtn"){
    if (set === null){
      return submitBtn.style.borderBottomRightRadius;
    } else {
      submitBtn.style.borderBottomRightRadius = set;
    }
  }
}

function autocompleteOpen(){

}

// Check if the the input border radius is set for the autoComplete DIV.
// A way to check if it is all nice and clean.
// If it is true then that will suppose to mean that the autocomplete DIV is on.
// If it is false, the autoComplete DIV should be off.
// This could be used for many other things, just the common thing is the autoComplete DIV.
function isInputAcBorderRadiusStyleSet(){
  if (borderRadius("globalInput") == 0 && borderRadius("submitBtn") == 0){
    return true;
  } else {
    return false;
  }
}

function setBottomBorderRadiusForAc(boolean){
  var globalInputRadius;
  if (globalInput === document.activeElement){
    globalInputRadius = "32px";
  } else {
    globalInputRadius = "12px";
  }

  if (boolean === true){
    globalInput.setAttribute("class","input-autocomplete-on");
    submitBtn.setAttribute("class",submitBtn.getAttribute("class") + " " + "btn-autocomplete-on")
    //borderRadius("globalInput",globalInputRadius);
    //borderRadius("submitBtn","0px");
  } else if (boolean === false){
    globalInput.removeAttribute("class");
    submitBtn.setAttribute("class",submitBtn.getAttribute("class").replace(" btn-autocomplete-on",""));
    //borderRadius("globalInput",globalInputRadius);
    //borderRadius("submitBtn","32px");
  }
}
