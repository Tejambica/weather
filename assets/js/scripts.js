var apikey = ""; //Include your API key


$(document).ready(function() {
    //Enter Lat,Lon in the seach bar
    document.getElementById('search-btn').addEventListener('click', function(event) {
        var input = document.getElementById('search-bar').value.split(',');
        getWeatherData(input);
        $('#search-bar').val('');
    });

    //Functionality of Mertic conversion
    var metrics = document.getElementsByClassName('convert-btn');
    for (var i = 0; i < metrics.length; i++) {
        metrics[i].addEventListener('click', function(event) {
            var id = event.target.id;
            var value = document.getElementById(id);
            for (var i = 0; i < metrics.length; i++) {
                if(metrics[i]==value)
                    value.classList.add("active");
                else 
                    metrics[i].classList.remove("active");
            }
        })
    }
});

function getWeatherData(input) {
    var lat = parseFloat(input[0]);
    var lon = parseFloat(input[1]);
    // Write a function to use the OpenWeather api to gather weather data and update the screen.
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + 
    "&exclude=hourly,alert&appid=" + apikey + "&units=imperial";

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var current = data.current.dt;
        var days = data.daily;

        // Current temperature, date and time
        $('#today-temp').html(parseInt(data.current.temp) + " °F");
        $('#today-icon').html('<i class="fas ' + getIcon(data.current.weather[0].main) + '" id=today-icon></i>');
        $('#today-dd').html(getDay(current, 'long') + ', ' + getTime(current));
       // console.log("check");

        // Daily forecast for 7 days
        $('#day-1').html(getDay(days[0].dt, 'short'));
        $('#day-temp-1').html(parseInt(days[0].temp.min) + " / " + parseInt(days[0].temp.max));
        $('#icon-1').html('<i class="fas ' + getIcon(days[0].weather[0].main) + ' icon"></i>');

        $('#day-2').html(getDay(days[1].dt, 'short'));
        $('#day-temp-2').html(parseInt(days[1].temp.min) + " / " + parseInt(days[1].temp.max));
        $('#icon-2').html('<i class="fas ' + getIcon(days[1].weather[0].main) + ' icon"></i>');

        $('#day-3').html(getDay(days[2].dt, 'short'));
        $('#day-temp-3').html(parseInt(days[2].temp.min) + " / " + parseInt(days[2].temp.max));
        $('#icon-3').html('<i class="fas ' + getIcon(days[2].weather[0].main) + ' icon"></i>');

        $('#day-4').html(getDay(days[3].dt, 'short'));
        $('#day-temp-4').html(parseInt(days[3].temp.min) + " / " + parseInt(days[3].temp.max));
        $('#icon-4').html('<i class="fas ' + getIcon(days[3].weather[0].main) + ' icon"></i>');

        $('#day-5').html(getDay(days[4].dt, 'short'));
        $('#day-temp-5').html(parseInt(days[4].temp.min) + " / " + parseInt(days[4].temp.max));
        $('#icon-5').html('<i class="fas ' + getIcon(days[4].weather[0].main) + ' icon"></i>');

        $('#day-6').html(getDay(days[5].dt, 'short'));
        $('#day-temp-6').html(parseInt(days[5].temp.min) + " / " + parseInt(days[5].temp.max));
        $('#icon-6').html('<i class="fas ' + getIcon(days[5].weather[0].main) + ' icon"></i>');

        $('#day-7').html(getDay(days[6].dt, 'short'));
        $('#day-temp-7').html(parseInt(days[6].temp.min) + " / " + parseInt(days[6].temp.max));
        $('#icon-7').html('<i class="fas ' + getIcon(days[6].weather[0].main) + ' icon"></i>');

        // Today's highlights
        $('#uv').html(data.current.uvi);
        $('#wind').html(data.current.wind_speed + " <span>mp/h</span>");
        $('#sun').addClass('sun-time');
        $('#sun').html('<i class="fas fa-arrow-circle-up arrow"></i> ' + getTime(data.current.sunrise) + 
          '<br>' + '<i class="fas fa-arrow-circle-down arrow"></i> ' + getTime(data.current.sunset));
        $('#humidity').html(data.current.humidity + '%');
        $('#visibility').html((data.current.visibility * 0.00062137).toFixed(2) + " mi");
        $('#dew').html(data.current.dew_point + ' °F'); 
    }).catch(function(error) { 
        console.log(error)
    });
}

//Display the weather icon
function getIcon(weather) {
    switch(weather) {
        case 'Thunderstrom':
            return 'fa-poo-storm'
        case 'Rain':
            return 'fa-cloud-rain'
        case 'Snow':
            return 'fa-snowflake'
        case 'Clear':
            return 'fa-sun'
        case 'Clouds':
            return 'fa-cloud'       
        default:
            return 'fa-cloud-sun'
        
    }
}

// Returns human-readable time
function getTime(utc) {
    var dateObject = new Date(utc * 1000);
    return dateObject.toLocaleString("en-US", {hour: "numeric", minute: "numeric"})
}


// Returns day of the week
function getDay(utc, mode) {
    var dateObject = new Date(utc * 1000);
    return dateObject.toLocaleString("en-US", {weekday: mode})
}


