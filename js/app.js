// global... im not sure why
var map;
var rootUrl = "http://localhost/roll-up-north/";

// main init
$(document).ready(function(){

	// event listeners to determine which panel to show
	$(".nav-item").click(function(){
		var which = event.target.id;
		turnDownLights(which);
	});

});


function loadMapsAPI()
{
	// 	google.maps.visualRefresh = true;
	map = new google.maps.Map(document.getElementById('skate-map'), {
    	center: {lat: 53.559124, lng: -2.079675},
		zoom: 9
	});
}


function turnDownLights(which)
{
	$(".hideable").fadeOut(function(){
		$(this).hide();
	});

	switch (which)
	{
		case "watchVid":
			$(".watch-vid-overlay").fadeIn(function(){
				$(".watch-vid").fadeIn();
			});
		break;

		case "skateMap":
			$(".skate-map-overlay").fadeIn(function(){
				$(".skate-map").fadeIn();
				loadMapsAPI();
				initialiseSkateparks();
			});
		break;

		default:
			console.log("something went horribly wrong");
		break;
	}
}

function initialiseSkateparks()
{
	// does two major functions

	// first, gets skatepark data that already exists in the DB and draws it to the existing Google Map
	getSkateParkData();

	// second, adds event listeners to the DOM so peeps can add their own skateparks
	addFormEventListeners();


}


function getSkateParkData()
{
	// if the page has just been loaded, get the whole block

	var isFirst = true;

	if (isFirst)
	{
		$.ajax({
			type: "GET",
			url: rootUrl + "php/get_skateparks.php",
			success: function(response)
			{
				drawSkateParkData(response);
			}
		});
	}

	// if this was called by a successful ajax POST to the DB, just retreive the last record

	if (!isFirst)
	{
		
	}

	// also, get this function to display the last 3/4 skateparks added, for shits and gigs
	displayLastFewSkateParks();
}

function drawSkateParkData(rawData)
{
	// convert crap from db into a js obj
	var asJSON = JSON.parse(rawData);

	// run through entire thing and mark it on the google map

	for (var i = 0; i < asJSON.length; i++)
	{
		// relabel shit from obj
		var aName = asJSON[i].adder_name;
		var lDesc = asJSON[i].location_description;
		var lLat = parseFloat(asJSON[i].location_lat);
		var lLong = parseFloat(asJSON[i].location_long);
		var lName = asJSON[i].location_name;
		var lRating = asJSON[i].location_rating;

		// build a google friendly latlong
		var latlong = {
			lat: lLat,
			lng: lLong
		}

		// build a description about this location

		var info = new google.maps.InfoWindow({
			content: "<div class='skate-location'>\
				<div class='skate-location-heading'>" + lName + "</div>\
				<div class='skate-location-description'>" + lDesc + "</div>\
				<div class='skate-location-rating'>" + lRating + "</div>\
				<div class='skate-location-adder'>" + aName + "</div>\
			</div>"
		});

		// finally add it to google map
		var marker = new google.maps.Marker({
			position: latlong,
			map: map,
			title: lName
		});

		// and make the marker clickable
		marker.addListener("click", function(){
			info.open(map, marker);
		});
	}


}

function displayLastFewSkateParks()
{

}

function addFormEventListeners()
{

}
