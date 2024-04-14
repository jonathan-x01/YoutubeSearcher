let acParent = document.getElementById("auto-complete");

function insertTextFromAutoComplete(){
  setBottomBorderRadiusForAc(true);
  var acTextClass = document.getElementsByClassName("autocomplete-text");
  acParent.style.display = "block";
  for (let i = 0; i < acTextClass.length; i++){
    acTextClass[i].addEventListener("click",function(){
      console.log(acTextClass[i].innerHTML);
      setInputText(acTextClass[i].innerHTML);
    });
  }
}

function removeSuggestions(){
  setBottomBorderRadiusForAc(false);
  var previousChild = document.getElementsByClassName("autocomplete-text");
  for (let i = previousChild.length - 1; i >= 0; i--){
    acParent.removeChild(previousChild[i]);
  }
  acParent.style.display = "none";
}

function autoComplete(keyword){
  removeSuggestions();

  $.ajax({
    url : `http://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${keyword}`,
    type : 'GET',
    dataType : 'jsonp',
    success : function(result){
      var acArray = result[1]
      for (let i = 0; i < acArray.length; i++){
        var acPassage = document.createElement("p");
        acPassage.innerHTML = acArray[i][0];
        acPassage.setAttribute("class","autocomplete-text");
        acPassage.setAttribute("title",acArray[i][0]);
        acPassage.setAttribute("tabindex","0");
        acParent.appendChild(acPassage);
        if (i == acArray.length - 1){
          insertTextFromAutoComplete();
        }
      }
    }
  });
}
