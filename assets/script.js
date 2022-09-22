// input storage from the user
// pulled the id from input group
let city = $("#searchTerm").val()

// const variable to store api key
const apiKey = "&appid=";
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

    $('#forcastH5').addClass('show');

    city = $("searchTerm").val();
})
