const fileName = "index.html";
const youtubePre = "https://youtube.com/results?search_query=";
const youtubeMusicPre = "https://music.youtube.com/search?q=";
const youtubeSigninPre = "https://www.youtube.com/signin?action_handle_signin=true&app=desktop&hl=en&next=https%3A%2F%2Fwww.youtube.com%2Fresults%3Fsearch_query%3D";
const googleAccountsPrefix = "https://accounts.google.com/signin/v2/identifier?service=youtube&uilel=3&passive=true&";
const googleAccountsSuffix = "&hl=en&ec=65620&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
const errorTxtTag = document.getElementsByClassName("input-error-message")[0];
const globalInput = document.getElementById("search");
const submitBtn = document.getElementsByClassName("submit-btn")[0];

const originBg = document.getElementsByClassName("origin-bg")[0];
const originLg = document.getElementsByClassName("origin-lg")[0];
const autocomplete = document.getElementsByClassName("auto-complete")[0];

function keyValid(keycode){
  let blacklistKeys = [27, 37, 38, 39, 40, 16, 8, 9, 13, 91, 17, 18, 45, 46];
  for (let i = 0; i < blacklistKeys.length; i++){
    if (keycode == blacklistKeys[i]){
      return false;
    }
  }
  return true;
}

globalInput.addEventListener("keyup",function(key){
  //key.keyCode != 27
  if (keyValid(key.keyCode)){
    autoComplete(globalInput.value);
  }
});
window.onkeypress = onKey;
window.onkeyup = onKey;

window.onfocus = function(){globalInput.focus();}

// [HTML Element ID, Setting name, Description]
var settingsAttr = [
  ["search","search-youtube-text","The placeholder inside the search input"],
  ["search_btn","search-text","The search button inner HTML."]
]

function initLoad(){
  function checkValidation(setting){
    if (getSettings()[setting] !== null && getSettings()[setting] !== undefined){
      return true;
    }
    return false;
  }

  if (checkValidation(settingsAttr[1][1])){
    setSearchButtonText(getSettings()[settingsAttr[1][1]]);
  }

  if (checkValidation(settingsAttr[0][1])){
    setInputPlaceholder(getSettings()[settingsAttr[0][1]]);
  }
}

function setSearchButtonText(innerHTML){
  document.getElementById(settingsAttr[1][0]).innerHTML = innerHTML;
}

function setInputPlaceholder(placeholder){
  document.getElementById(settingsAttr[0][0]).setAttribute("placeholder",placeholder);
}

window.onload = function(){
  globalInput.focus();
  query.get();
  if (getSettings() === null){
    localStorage.setItem("Settings",'{"auto-login-page":true}')
  }
  initLoad();
  var documentStyle = getComputedStyle(document.body);
  document.getElementById("logo-img").src = documentStyle.getPropertyValue("--logo-bg-").replace("url(","include/").replace(")","").replace("\\.",".").replace("\\/","/");
}

var Url = {
  filterDecode: ["%252F", "%253A", "%253D", "%253F", "%252B", "%2B", "%3A", "%3D", "%3F", "%2F", "%26"],
  filterEncode: ["%2F", "%3A", "%3D", "%3F", "%2B", "+", ":", "=", "?", "/", "&"],
  strToRe: function(str) {
    let reStr = str.split("").map(c => '[' + c + ']').join('');
    return new RegExp(reStr, "g");
  },
  decode : function(decodeText){
    let a, b;
    let filterEncode = Url.filterEncode;
    let filterDecode = Url.filterDecode;
    for (a = 0; a < filterDecode.length; a++){
      decodeText = decodeText.replace(Url.strToRe(filterDecode[a]), filterEncode[a]);
    }
    return decodeText;
  },
  encode : function(encodeText){
    let a, b;
    let filterEncode = Url.filterEncode;
    let filterDecode = Url.filterDecode;

    for (a = 0; a < filterEncode.length; a++){
      encodeText = encodeText.replace(Url.strToRe(filterEncode[a]), filterDecode[a]);
    }
    return encodeText;
  }
}

/* Controls the query string for frames */
var query = {
  var : {
    queryString : location.search,
    regexp : /[?](.*)[=](.*)/gm
  },
  set : function(frame){
    let state = {"html":query.var.queryString};
    let title = '';
    if (frame != null){
      window.history.pushState(state,title,`?frame=${frame}`);
    } else {
      window.history.pushState(state,title,fileName);
    }
  },
  get : function(){
    let regexp = query.var.regexp;
    let queried = regexp.exec(query.var.queryString);
    if (query.var.queryString != ""){
      main.accessFrame(queried[2],null,false);
    }
  },
  dirGet : function(url,query){
    const queryUrl = new URLSearchParams(new URL(url).search);
    const searchQuery = queryUrl.get(query);
    if (searchQuery === null){
      return false;
    } else if (searchQuery){
      return searchQuery;
    }
  }
}

function setInputText(text){
  globalInput.value = text;
}

var main = {
  var : {
    iframe : document.getElementById("iframe"),
    modalTabIndex : document.getElementsByClassName("modal-tabindex"),
    mainTabIndex : document.getElementsByClassName("main-tabindex"),
    modal : document.getElementsByClassName("modal")[0]
  },
  tabIndexSwitch : function(Class, mode, custom){
    for (i = 0; i < Class.length; i++){
      if (mode == "add"){
        Class[i].setAttribute("tabindex","0");
      } else if (mode == "remove"){
        Class[i].removeAttribute("tabindex");
      } else if (mode == "disable"){
        Class[i].setAttribute("tabindex","-1");
      } else if (mode == "custom"){
        Class[i].setAttribute("tabindex",custom);
      }
    }
  },
  accessFrame : function(link, ext, linkTrue){
    let iframe = main.var.iframe;
    let modal = main.var.modal;
    if (ext == null){
      iframe.src = `include/frames/${link}.html`;
      if (linkTrue == null){
        query.set(link);
      }
    } else {
      iframe.src = `include/frames/${link}.${ext}`;
      if (linkTrue == null){
        query.set(link);
      }
    }
    main.tabIndexSwitch(main.var.modalTabIndex,"add");
    main.tabIndexSwitch(main.var.mainTabIndex,"remove");
    main.tabIndexSwitch(document.getElementsByClassName("nav-btn"),"disable")
    modal.style.display = "block";
  },
  closeFrame : function(){
    main.tabIndexSwitch(main.var.modalTabIndex,"remove");
    main.tabIndexSwitch(main.var.mainTabIndex,"add");
    main.tabIndexSwitch(document.getElementsByClassName("nav-btn"),"remove")
    main.var.modal.style.display = "none";
    main.var.iframe.src = "";
    query.set();
  },
  accessButton : window.parent.document.getElementById("modal-custom"),
  loadLocalStorage : function(){

  }
}

/* Controls the error text for input */
function ClearErrorText(){
  errorTxtTag.innerHTML = "";
  errorTxtTag.style.display = "none";
}

function ErrorText(txt){
  if (txt != null){
    errorTxtTag.innerHTML = txt;
    errorTxtTag.style.display = "block";
  } else {
    errorTxtTag.innerHTML = "";
    errorTxtTag.style.display = "none";
  }
}

/* Function to control when button is clicked or when shortcut key(s) is pressed */
function ClearText(shortcut){
  document.getElementById("search").value = "";
  let timeToSwitch = setInterval(function(){
    globalInput.focus();
    clearInterval(timeToSwitch)
  },100);
  if (shortcut === true){
    document.getElementsByClassName("clear-btn")[0].focus();
  }
}

function Click(Mode){
  const settings = getSettings();
  let Input = document.getElementById("search").value;
  let shortYTLink = Input.match(/https:\/\/youtu\.be\/(.*)/i);
  let youtubeLinkInclude = Input.includes("https://youtube.com") || Input.includes("http://youtube.com") || Input.includes("https://www.youtube.com") || Input.includes("http://www.youtube.com");
  let url = Input.includes("http://") || Input.includes("https://") || Input.match(/(.*):\/\//g);
  let queryUrl = `https://www.youtube.com/results?search_query=${Url.encode(Input)}`;

  let ytEP = "https://www.youtube.com/embed";
  let windowSpecs = `height=${screen.height},width=${screen.width},channelmode =1,scrollbars=1,status=0,titlebar=0,toolbar=0,resizable=1`;

  if (Input.includes("v=") && Input.includes("list=")){
    ClearErrorText();
    let videoId = query.dirGet(Input,"v");
    let listId = query.dirGet(Input,"list");
    window.open(`${ytEP}/${videoId}?list=${listId}`,"",windowSpecs)
  } else if (Input.includes("list=")){
    ClearErrorText();
    let listId = query.dirGet(Input,"list");
    window.open(`${ytEP}/videoseries?list=${listId}`,"",windowSpecs);
  } else if (shortYTLink){
    ClearErrorText();
    window.open(`${ytEP}/${shortYTLink[1]}`,"",windowSpecs);
  } else if (youtubeLinkInclude){
    ClearErrorText();
    let videoId = query.dirGet(Input,"v");
    window.open(`${ytEP}/${videoId}`,"",windowSpecs);
  } else if (url){
    ErrorText(`This is only meant to work for Youtube products only, not ${Input}`);
    globalInput.focus();
  } else if (Input != ""){
    ClearErrorText();
    let newStr = Input.replace(/ /g, '+');
    let compile = youtubePre + newStr;
    //let compileLogin = googleAccountsPrefix + "continue=" + youtubePre +  Url.encode(Url.encode(newStr)) + googleAccountsSuffix;
    let connect = googleAccountsPrefix + "continue=" + youtubePre +  Url.encode(newStr) + googleAccountsSuffix;
    if (settings !== null){
      if (settings['auto-login-page'] == true){
        connect = googleAccountsPrefix + "continue=" + youtubePre +  Url.encode(newStr) + googleAccountsSuffix;
      } else {
        connect = queryUrl;
      }
    }
    globalInput.blur();
    submitBtn.blur();
    if (Mode == "assign"){
      location.assign(connect);
    } else if (Mode == "newtab"){
      ClearErrorText();
      window.open(connect);
    }
  } else {
    ErrorText("Cannot leave field blank.");
    globalInput.focus();
  }
}

/* Controls the shortcut keys */
function onKey(event){
  let control = {
    focusEnt : function(param){
      if (document.activeElement == globalInput || document.activeElement == submitBtn){Click(param);}
      else if (document.activeElement == originBg){openImage("Background");}
      else if (document.activeElement == originLg){openImage("Logo");}
      else {globalInput.focus();}
    }
  }

  switch (event.keyCode){
    case event.ctrlKey && 13:
      control.focusEnt("newtab");
      break;
    case 13:
      control.focusEnt("assign");
      break;
    case 27:
      ClearText(true);
      removeSuggestions();
      globalInput.focus();
      break;
    case 40:
      //console.log(document.activeElement);
    break;
  }
}

document.getElementById("modal-reload").addEventListener("click",function(){
  main.var.iframe.contentWindow.location.reload();
});
originBg.addEventListener("click",function(){openImage("Background");});
originLg.addEventListener("click",function(){openImage("Logo");});
function openImage(type){window.open(`include/images/${type}.png`);}
errorTxtTag.addEventListener("click",function(){ErrorText();});

var cmAutologinInput = document.getElementById("context-menu-autologin-input");
var cmAutologin = document.getElementById("context-menu-autologin");

if (getSettings() !== null){
  cmAutologinInput.checked = getSettings()["auto-login-page"];
}

function saveAutologinSetting(){
  if (getSettings()["auto-login-page"] !== undefined){
    var newSettings = JSON.stringify(getSettings());
    newSettings = newSettings.replace(`"auto-login-page":${getSettings()["auto-login-page"]}`,`"auto-login-page":${cmAutologinInput.checked}`);
    localStorage.setItem("Settings",newSettings)
  }
}

cmAutologin.addEventListener("click", function(){
  if (cmAutologinInput.checked === true){
    cmAutologinInput.checked = false;
  } else {
    cmAutologinInput.checked = true;
  }

  saveAutologinSetting();
});
