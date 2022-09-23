// input storage from the user
// pulled the id from input group
let city = $("#searchTerm").val()

// const variable to store api key
const apiKey = "&appid=419a6f585c25a4bb328b301f9ff349f4";
// date variable using Date to turn date/time into a string.
let date = new Date();

$("#searchTerm").keypress(function(event) {
    // key code 13 is enter
    if (event.keycode === 13) {
        event.preventDefault();
        $('#searchTerm').click();
    }
});

$("#searchTerm").on("click", function() {
    //use css to show the forcast header
    $('#forcastH5').addClass('show');

    // get value from the input tag store in city
    city = $("#searchTerm").val();

    //clear the input box
    $("#searchTerm").val("");

    //api url with city input and api key
    
    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
    
    // url
    // Type: String
    // A string containing the URL to which the request is sent.
    // settings
    // Type: PlainObject
    // A set of key/value pairs that configure the Ajax request. 
    // All settings are optional. 
    // A default can be set for any option with $.ajaxSetup(). 
    // See jQuery.ajax( settings ) below for a complete list of all settings.
    // use the ajax me

    $.ajax({
        url: queryUrl,
        method:"GET"
    })
    .then(function (response){

        console.log(response)
        console.log(response.name)
        console.log(response.main.humidity)
        console.log(response.wind.speed)
        console.log(response.weather[0])


        getCurrentConditions(response)
        getCurrentForecast(response)
        // need a list to put the conditions in duh
        generateList();
    })

    

});

// list to put the conditions in 

function generateList() {
    let listItems = $("<li>").addClass("list-group-item").text(city);
    //append items to the list
    $(".list").append(listItems);
}



// get the current conditions for the card
function getCurrentConditions(response) {
    //start with empty tag
    $("#currentCity").empty()

    // get set data
    // pull the class styling straight from bootstrap.. interesting
    const card = $("<div>").addClass("Card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h1>").addClass("card-title").text(response.name);
    //toLocalDateString = Converts a date to a string by using the current or specified locale.
    const cityDate = $("<h3>").addClass("card-title").text(date.toLocaleDateString('en-US'))
    const image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
    const temperature = $("<p>").addClass("card-text").text("Temperature" + response.main.temp + "°");
    const humidity = $("<p>").addClass("card-text").text("Humidity" + response.main.humidity + "%");
    const wind = $("<p>").addClass("card-text").text("Wind Speed" + response.wind.speed + "Mph")
    

    // add the variables to the page
    // when appending start from the button and work up.\
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)

}

function getCurrentForecast() {

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
        method: "GET"
    }).then(function (response) {

        console.log(response)
        console.log(response.dt)

        //list format for response 
        let results = response.list;
        console.log(results)


    })

}

