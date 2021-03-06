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

		// add it to google map
		var marker = new google.maps.Marker({
			position: latlong,
			map: map,
			title: lName
		});

		// build a description about this location
		marker.info = new google.maps.InfoWindow({
			content: "<div class='skate-location'>\
				<div class='skate-location-heading'>" + lName + "</div>\
				<div class='skate-location-description'>" + lDesc + "</div>\
				<div class='row'>\
					<div class='skate-location-rating column-7'>" + lRatingAsStars + "</div>\
					<div class='skate-location-adder column-5'>Added By: " + aName + "</div>\
				</div>\
			</div>"
		});


		// and make the marker clickable so an infowindow appears
		google.maps.event.addListener(marker, "click", function(){
			this.info.open(map, this);
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

		// create a marker
		var marker = new google.maps.Marker({
			position: location,
			map: map,
			title: "new park"
		});

		// create a pop up
		var request = new google.maps.InfoWindow({
			content: "<div class='add-skate-location tentative'>\
				<div class='add-skate-location-heading'><input type='text' placeholder='Add title...' id='adderTitle'></div>\
				<div class='add-skate-location-description'><textarea placeholder='Describe it...' id='adderDescription'></textarea></div>\
				<div class='row flexy'>\
					<div class='add-skate-location-adder column-6'><input type='text' placeholder='Your name' id='adderName'></div>\
					<div class='add-skate-location-rating column-4'>\
						<div class='star-rating star-rating-1'>&#9733;</div>\
						<div class='star-rating star-rating-2'>&#9733;</div>\
						<div class='star-rating star-rating-3'>&#9733;</div>\
						<div class='star-rating star-rating-4'>&#9733;</div>\
						<div class='star-rating star-rating-5'>&#9733;</div>\
					</div>\
					<div class='add-skate-location-submit column-2'><input type='button' value='Submit!' id='submitSkatepark'></div>\
				</div>\
				<div class='information-panel'></div>\
			</div>"
		});

		// show the pop up info window
		request.open(map, marker);

		// dismiss all other info windows
		for (n = 0; n < currentPoints.length; n++)
		{
			currentPoints[n].info.close();
		}

		// dismiss stuff
		google.maps.event.addListener(map, "click", function(event){
			request.close();
			marker.setMap(null);
		});

		google.maps.event.addListener(request, "closeclick", function(event){
			marker.setMap(null);
		});

		// attach listeners to the stars
		$(".star-rating").mouseover(function(event){

			var star = event.currentTarget.className.split(" ")[1];

			var integer = star.split("-")[2];

			for (s = 1; s <= integer; s++)
			{	
				$(".star-rating-" + s).addClass("active-star");
			}

		});

		$(".star-rating").click(function(event){

			$(".star-rating").removeClass("active-star-persistent");

			var star = event.currentTarget.className.split(" ")[1];

			var integer = star.split("-")[2];

			for (s = 1; s <= integer; s++)
			{	
				$(".star-rating-" + s).addClass("active-star-persistent");
			}

		});

		$(".star-rating").mouseout(function(event){

			$(".star-rating").removeClass("active-star");

		});


		$("#submitSkatepark").click(function(){
			var skateparkTitle = $("#adderTitle").val();
			var skateparkDescription = $("#adderDescription").val();
			var personName = $("#adderName").val();
			var starRating = (function(){
				return $(".add-skate-location-rating .active-star-persistent").length;
			}());

			if (!skateparkTitle || !skateparkDescription || !personName)
			{
				$(".information-panel").html("");
				$(".information-panel").append("Please fill out all fields");
			}
			else
			{
				submitSkateparktoDB(location, skateparkTitle, skateparkDescription, personName, starRating);
				request.close();
				marker.setMap(null);
			}

		});

}

function displayLastFewSkateParks()
{

}

function addFormEventListeners()
{

}

function submitSkateparktoDB(location, skateparkTitle, skateparkDescription, personName, starRating)
{
	$.ajax({
		type: "POST",
		url: rootUrl + "php/add_skatepark.php",
		data: {
			location_lat: 		location.lat(),
			location_long: 		location.lng(),
			title: 				skateparkTitle,
			desc: 				skateparkDescription,
			adder: 				personName,
			rating: 			starRating
		},
		success: function(response)
		{
		if (response == "success")
			{
				getSkateParkData();
			}
		}
	});
}
