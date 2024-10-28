function init() {
    let flicker = Flicker(ANIMALS, document.getElementById("content"));

    document.getElementById("leftButton").addEventListener("click", flicker.leftClick);
    document.getElementById("rightButton").addEventListener("click", flicker.rightClick);
}


window.addEventListener("load", init);