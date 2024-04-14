var ddHeader = document.getElementsByClassName("drop-down-header");
var ddContent = document.getElementsByClassName("drop-down-content");


API.saveButton.event("click",function(){
  let settings = {};
  var inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++){
    if (inputs[i].value != ""){
      if (inputs[i].type == "checkbox"){
        settings[inputs[i].name] = inputs[i].checked;
      } else if (inputs[i].type == "file" && inputs[i].id != "upload_settings"){
        console.log("File type");
        //settings[inputs[i].name] =
      } else {
        settings[inputs[i].name] = inputs[i].value;
      }
    }
  }
  localStorage.setItem("Settings",JSON.stringify(settings));
  //window.parent.location.reload();
  /*const reader = new FileReader();
  $('input').each(function(i){
    var input = document.getElementsByTagName("input")[i];
    if ($(this).attr("type") == "checkbox"){
      console.log($(this).is(":checked"));
    } else if ($(this).attr("type") == "file"){
      console.log(input.files[0]);
    } else {
      console.log($(this).val());
    }
  });*/
  //alert("This is coming Soon!!!");
});

function StyleStatement(elmt, property, valueTrue, valueFalse){
  if (elmt.style[property] == valueTrue){
    elmt.style[property] == valueFalse;
  } else if (elmt.style[property] == valueFalse){
    elmt.style[property] = valueTrue;
  }
}

document.getElementById("download_settings_json").addEventListener("click",function(){
  downloadSettings("download_linl");
});

document.getElementById("import_settings_json").addEventListener("click",function(){
  importSettings("upload_settings");
});

function importSettings(Id){
  var eleId = document.getElementById(Id);
  var file = eleId.files[0];

  if (file !== undefined){
    var fr = new FileReader();
    fr.readAsText(file);
    fr.addEventListener("load",(e) => {
      localStorage.setItem("Settings",e.target.result);
      loadSettings(e.target.result);
      alert("Import successful");
    });
  } else {
    alert("No json file has been chosen to be imported.");
  }
}

document.getElementById("btn_test").addEventListener("click",function(){
  fileReaderTest(document.getElementById("bg_file_upload"),(data) => {
    console.log(data);
  });
});

function fileReaderTest(data, callback){
  var frT = new FileReader();
  var test;
  frT.readAsDataURL(data.files[0]);
  frT.onload = function(data){
    test = data;
  }
  console.log(test);
  frT.addEventListener("load",(data) => {
    callback(data.target.result);
  });
}

function downloadSettings(Id){
  var encoded = encodeURIComponent(JSON.stringify(getSettings()));
  console.log(encoded);
  if (encoded !== null){
    var data = `data:text/json;charset=utf-8,${encoded}`;
    var eleId = document.getElementById(Id);
    eleId.setAttribute("href",data);
    eleId.setAttribute("download","settings.json");
  } else {
    alert("Settings has not been changed.");
  }
}

function loadSettings(jsonString){
  var settings;
  if (jsonString === undefined){
    settings = getSettings();
  } else {
    settings = JSON.parse(jsonString);
  }
  for (x in settings){
    let findQuery = document.querySelectorAll(`[name=${x}]`)[0];
    if (findQuery.tagName == "INPUT"){
      if (findQuery.type == "checkbox"){
        findQuery.checked = settings[x];
      } else {
        findQuery.value = settings[x];
      }
    }
  }
}

loadSettings();

for (let i = 0; i < ddHeader.length; i++){
  var caret = document.createElement("i");
  caret.setAttribute("id",`caret-${i}`);
  caret.style.transition = "all 0.4s";
  caret.setAttribute("class","fas fa-caret-down")
  ddHeader[i].insertBefore(caret, ddHeader[i].childNodes[0]);
  ddContent[i].style.maxHeight = "500px";
  ddContent[i].style.transition = "all 0.4s";
  StyleStatement(caret, "transform", "rotate(-90deg)", "rotate(0deg)");
  ddHeader[i].addEventListener("click",function(){
    var caretId = document.getElementById(`caret-${i}`);

    if (ddContent[i].style.maxHeight == "0px"){
      ddContent[i].style.maxHeight = "500px";
      caretId.style.transform = "rotate(0deg)";
    } else if (ddContent[i].style.maxHeight == "500px"){
      ddContent[i].style.maxHeight = "0px";
      caretId.style.transform = "rotate(-90deg)";
    }
  });
}
