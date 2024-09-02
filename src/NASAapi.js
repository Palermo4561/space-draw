
import APIKey from "../config.js"; // put your own API key here

export async function photoJSON(date) {
    // YYYY-MM-DD format
    let dateResponse = (date)? `&date=${date}` : "";
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${APIKey + dateResponse}`);
    return await response.json();
}

export function setImageFromJSON(date) {
    const errorMessage = document.getElementById("errorMessage");
    
    photoJSON(date).then(data => {
        if (/apod.nasa.gov/.exec(data.url))  { // sometimes they have youtube videos 
            let strDate = new Date(Array.from(data.date.matchAll(/\d+/g)).map(element => element[0])) 
            console.log(strDate);
            document.getElementById("spaceDate").textContent = 
                `Date: ${strDate.toDateString()}`;
            document.getElementById("spacePhoto").src = data.url;
            errorMessage.textContent = "";
        }
        else errorMessage.textContent = "Invalid Date - No Photo Information (might be a YouTube video, which will be supported soon)"
    })
}