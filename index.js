//Initializing all elements constants
const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather3 img");
const emojiField= document.querySelector(".weather3 img");
const weatherField= document.querySelector(".weather3 span");
const searchField= document.querySelector(".searchField");
const form = document.querySelector("form");

//Adding event Listen to the form
form.addEventListener("submit",search);
//Default Location
let target ="delhi"

//function to fetch data from weather api

const fetchData = async(target) =>{
try {
    const url = `https://api.weatherapi.com/v1/current.json?key=01e324ba6a964897ae6222607231007&q=${target}`

    const response=await fetch(url);
    const data =await response.json();
    
   
    //desturcturing
    const{
        current:{temp_c,condition:{ text, icon},},
        location:{name,localtime},
    }=data;
    
    // calling update dom function
    updateDom(temp_c,name,localtime,icon,text);
    
} catch (error) {
    alert("Location not found");
}

};
// function to update dom
function updateDom(temperature,city,time,emoji,text){
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactDate).getDate );
    temperatureField.innerText=temperature;
    cityField.innerText=city;
    dateField.innerText=`${exactTime}- ${exactDay} ${exactDate}`;
    emojiField.src=emoji;
    weatherField.innerText=text;
}

fetchData(target);

//function to search the location
function search(e){
    e.preventDefault();

    target=searchField.value;
    fetchData(target);
}



// function to get name of day
function getDayFullName(num){
    switch (num) {
        case 0:
            return "Sunday";
            case 1:
                return "Monday";
                case 2:
                    return "Tuesday";
                    case 3:
                        return "Wednesday";
                        case 4:
                            return "Thursday";
                            case 5:
                                return "Friday";
                                case 6:
                                    return "Saturday";
                             

    
        default:
            return "Don't Know";
    }
}