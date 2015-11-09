// global... im not sure why
var map;
var rootUrl = "http://localhost/roll-up-north/";
var isEditing = false;

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

function createStars(integer)
{
	var starsHTML = "";

	for (var s = 0; s < integer; s++)
	{
		starsHTML += "<div class='star'><img src='../roll-up-north/img/star.png' width='24px'></div>";
	}

	return starsHTML;
}

function drawSkateParkData(rawData)
{
	// convert crap from db into a js obj
	var asJSON = JSON.parse(rawData);

	// all infowindows are added to an array
	var currentPoints = [];

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
		var lRatingAsStars = createStars(lRating);

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
				<div class='row'>\
					<div class='skate-location-rating column-7'>" + lRatingAsStars + "</div>\
					<div class='skate-location-adder column-5'>Added By: " + aName + "</div>\
				</div>\
			</div>"
		});

		// add it to google map
		var marker = new google.maps.Marker({
			position: latlong,
			map: map,
			title: lName
		});

		// and make the marker clickable so an infowindow appears
		marker.addListener("click", function(){
			info.open(map, marker);
		});

		// add it to the array so I know how many could be present
		currentPoints.push({
			marker: marker,
			info: info
		});
	}

	// allow users to add their own markers
	google.maps.event.addListener(map, "click", function(event){
		userAddSkatepark(event.latLng, currentPoints);
	});
}

function dismissInfoWindows(arrayOfItems)
{

}

function userAddSkatepark(location, currentPoints)
{
	if (!isEditing)
	{
		// create a marker
		var marker = new google.maps.Marker({
			position: location,
			map: map,
			title: "new park"
		});

		// create a pop up
		var request = new google.maps.InfoWindow({
			content: "<div class='add-skate-location tentative'>\
				<div class='add-skate-location-heading'><input type='text' placeholder='Add title...' 'adderTitle'></div>\
				<div class='add-skate-location-description'><textarea placeholder='Describe it...' id='adderDescription'></textarea></div>\
				<div class='row'>\
					<div class='add-skate-location-rating column-6'><img src='../roll-up-north/img/star.png' width='24px'><img src='../roll-up-north/img/star.png' width='24px'><img src='../roll-up-north/img/star.png' width='24px'><img src='../roll-up-north/img/star.png' width='24px'><img src='../roll-up-north/img/star.png' width='24px'></div>\
					<div class='add-skate-location-adder column-6'><input type='text' placeholder='your name' id='adderName'></div>\
				</div>\
			</div>"
		});

		// show the pop up info window
		request.open(map, marker);

		// dismiss all other info windows
		console.log(currentPoints);

		for (n = 0; n < currentPoints.length; n++)
		{
			currentPoints[n].info.close();
		}


		//currentPoints.push(request);

		isEditing = true;
	}
	else
	{
		console.log("already have one open boyo");
	}


}

function displayLastFewSkateParks()
{

}

function addFormEventListeners()
{

}
