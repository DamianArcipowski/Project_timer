const play = document.getElementById("play");
const actualTime = document.getElementById("actualTime");
var sec = document.getElementById("sec");
var secDecimal = document.getElementById("secDecimal");
var min = document.getElementById("min");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const lastTime = document.getElementById("lastTime");
const cancel = document.getElementById("cancel");
const archieveHistory = document.getElementById("archieveHistory");
const archieve = document.getElementById("archieve");
const close = document.getElementById("close");
const infWindow = document.getElementById("modalWindow");
const info = document.getElementById("help");
const paint = document.getElementById("paint");
const colors = document.getElementById("colors");
const orangeTheme = document.getElementById("orange");
const blueTheme = document.getElementById("blue");
const greenTheme = document.getElementById("green");
const colon = document.getElementById("colon");
const insPlay = document.getElementById("insPlay");
const insStop = document.getElementById("insStop");
const insPause = document.getElementById("insPause");
const insCancel = document.getElementById("insCancel");
const insArch = document.getElementById("insArch");

var starterSec;
var starterMin;
var pomiar = 0;
var rgb = "rgb(166,50,15)";

function addSecs(){
    stop.style.backgroundColor = "rgb(40,40,40)";
    starterSec = setInterval(function(){
    if(sec.textContent == 9){
        sec.textContent = 0; 
        secDecimal.textContent++;
    }  else 
        sec.textContent++;
    },1000)
}

function addMins(){
    starterMin = setInterval(function(){
        min.textContent++;
        sec.textContent = 0;
        secDecimal.textContent = 0;
    },60000)
}

function setBtnColors(color,defaultColor,el1,el2,el3,el4){
    defaultColor.style.backgroundColor = color;
    el1.style.backgroundColor = "";
    el2.style.backgroundColor = "";
    el3.style.backgroundColor = "";
    el4.style.backgroundColor = "";
}

function resetBtnColorsWhenChange(el1,el2,el3,el4,el5){
    el1.style.backgroundColor = "";
    el2.style.backgroundColor = "";
    el3.style.backgroundColor = "";
    el4.style.backgroundColor = "";
    el5.style.backgroundColor = "";
}

function playTimer(){
    addSecs();
    addMins();
    play.disabled = true;
    setBtnColors(rgb,play,stop,reset,cancel,archieve);
}

function stopTimer(){
    clearInterval(starterSec);
    clearInterval(starterMin);
    play.disabled = false;
    setBtnColors(rgb,stop,play,reset,cancel,archieve);
}

function resetTimer(){
    play.disabled = false;
    lastTime.textContent = `Ostatni czas: ${min.textContent}:${secDecimal.textContent}${sec.textContent}`;
    archieveHistory.innerHTML += `Pomiar nr ${++pomiar}: ${min.textContent}:${secDecimal.textContent}${sec.textContent}` + "<br>";
    clearTimer();
    setBtnColors(rgb,reset,play,stop,cancel,archieve);
}

function clearTimer(){
    clearInterval(starterSec);
    clearInterval(starterMin);
    min.textContent = 0;
    secDecimal.textContent = 0;
    sec.textContent = 0;
}

function cancelTimer(){
    play.disabled = false;
    pomiar = 0;
    clearTimer();
    archieveHistory.innerHTML = "";
    lastTime.innerHTML = "";
    setBtnColors(rgb,cancel,reset,play,stop,archieve);
}

function showArchieve(){
    setBtnColors(rgb,archieve,cancel,reset,play,stop);
    
    if(archieveHistory.classList == "history hide")
        archieveHistory.classList.remove("hide");
    else if(archieveHistory.classList == "history")
        archieveHistory.classList.add("hide");
}

function showInfo(){
    infWindow.classList.remove("hidden");
}

function closeInfo(){
    infWindow.classList.add("hidden");
}

function showColorsPalette(){
    if(colors.classList == "hidden"){
        colors.classList.add("move1");
        colors.classList.remove("hidden");
    }
    else if(colors.classList == "move1"){
        colors.classList.add("hidden");
        colors.classList.remove("move1");
        colors.classList.add("move2");
    } else
        colors.classList.remove("move2");
}

var elemsToChangeColor = [min, secDecimal, sec, colon];
var elemsToChangeBorder = [play, stop, reset, cancel, close, archieve];
var elemsFromModal = [insPlay, insPause, insCancel, insStop, insArch];

function changeTheme(color, border, classColor, classIcon1, classIcon2, classIcon3, classIcon4, classIcon5){

    for(let i=0; i<elemsToChangeColor.length; i++){
        elemsToChangeColor[i].classList.add(color);
    }
    
    for(let i=0; i<elemsToChangeBorder.length; i++){
        elemsToChangeBorder[i].classList.add(border);
    }

    insPlay.classList.add(classIcon1,classColor);
    insPause.classList.add(classIcon2,classColor);
    insCancel.classList.add(classIcon3,classColor);
    insStop.classList.add(classIcon4,classColor);
    insArch.classList.add(classIcon5, classColor);
}

function deletePreviousTheme(color, border){
    
    for(let i=0; i<elemsToChangeColor.length; i++){
        elemsToChangeColor[i].classList.remove(color);
    }
  
    for(let i=0; i<elemsToChangeBorder.length; i++){
        elemsToChangeBorder[i].classList.remove(border);
    }

    for(let i=0; i<elemsFromModal.length; i++){
        elemsFromModal[i].removeAttribute("class");
    }
}

function changeHover(bgcColor, borderColor, color){
    var css = `#play:hover, #stop:hover, #cancel:hover, #reset:hover, #archieve:hover, #close:hover {background-color: ${bgcColor}; border: 1px solid ${borderColor}} .icon-help:hover, .icon-brush-1:hover {color: ${color}}`;
    var style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    play.appendChild(style);
}

play.addEventListener("click",playTimer);
stop.addEventListener("click",stopTimer);
reset.addEventListener("click",resetTimer);
cancel.addEventListener("click",cancelTimer);
archieve.addEventListener("click",showArchieve);
help.addEventListener("click",showInfo);
close.addEventListener("click",closeInfo);
paint.addEventListener("click",showColorsPalette);

orangeTheme.addEventListener("click", function(){
    deletePreviousTheme("blueBg", "blueBorder");
    deletePreviousTheme("greenBg", "greenBorder");
    rgb = "rgb(166,50,15)";
    resetBtnColorsWhenChange(play,stop,reset,cancel,archieve);
    changeTheme("orangeBg", "orangeBorder", "orangeBg", "icon-play-1", "icon-pause", "icon-stop-1", "icon-cancel", "insArch");
    changeHover(rgb, rgb, rgb);
});

blueTheme.addEventListener("click",function(){
    deletePreviousTheme("orangeBg", "orangeBorder");
    deletePreviousTheme("greenBg", "greenBorder");
    resetBtnColorsWhenChange(play,stop,reset,cancel,archieve);
    rgb = "rgb(58, 147, 207)";
    changeTheme("blueBg", "blueBorder", "blueBg", "icon-play-1", "icon-pause", "icon-stop-1", "icon-cancel", "insArch");
    changeHover(rgb, rgb, rgb);
});

greenTheme.addEventListener("click",function(){
    deletePreviousTheme("orangeBg", "orangeBorder");
    deletePreviousTheme("blueBg", "blueBorder");
    rgb = "rgb(48, 201, 84)";
    resetBtnColorsWhenChange(play,stop,reset,cancel,archieve);
    changeTheme("greenBg", "greenBorder", "greenBg", "icon-play-1", "icon-pause", "icon-stop-1", "icon-cancel", "insArch");
    changeHover(rgb, rgb, rgb);
});