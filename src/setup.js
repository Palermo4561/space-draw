
import imageList from "./images.js"
import { setImageFromJSON } from "./NASAapi.js";


// set up stickers
const stickerBar = document.getElementById("stickerBar")
const imagePaths = Object.values(imageList);
const imageStickersDiv = document.getElementById("imageStickers");
for (let i = 0; i < imagePaths.length; i++) {
    let sticker = document.createElement("img");
    sticker.id = `sticker${i+1}`;
    sticker.src = imagePaths[i]
    sticker.addEventListener("click", event => {
        let selectedSticker = document.createElement("img");
        selectedSticker.className = "selectedImage";
        selectedSticker.src = imagePaths[i];
        imageStickersDiv.appendChild(selectedSticker);

        // make it a functional selected sticker
        selectedSticker.style.top = event.clientY - 25 + "px";
        selectedSticker.style.left = event.clientX - 25 + "px";
        //selectedSticker.style.transform = "scale(2, 2)";
        createFunctionalSticker(selectedSticker);

    })
    stickerBar.appendChild(sticker);
}

// functionality of the stickers 
function createFunctionalSticker(sticker) {


    function mouseMove(event) {
        sticker.style.top = event.clientY - 25 + "px";
        sticker.style.left = event.clientX - 25 + "px";
        console.log("mouse was moved")
    }

    function click() {
        document.removeEventListener("mousemove", mouseMove);
        document.getElementById("spacePhoto").removeEventListener("click", click);
        sticker.style.opacity = 1; 
    }

    document.addEventListener("mousemove", mouseMove);
    document.getElementById("spacePhoto").addEventListener("click", click);
}


function resetStickers() {
    imageStickersDiv.innerHTML = ""; // remove all stickers
}

// add button event to change photo 
document.getElementById("dateButton").addEventListener("click", () => {
    setImageFromJSON(
        document.getElementById("dateInput").value
    )
    resetStickers();
});

// add to reset photos 
document.getElementById("resetStickersButton").onclick = resetStickers;


