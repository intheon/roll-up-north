var map;

function loadMapsAPI()
{
	map = new google.maps.Map(document.getElementById('skate-map'), {
    	center: {lat: 53.869065, lng: -2.394535},
		zoom: 11
	});


}

$(document).ready(function(){

	$(".nav-item").click(function(){
		var which = event.target.id;
		turnDownLights(which);
	});

	google.maps.visualRefresh = true;

	loadMapsAPI();

});

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
				loadMapsAPI()
			});
		break;

		default:
			console.log("something went horribly wrong");
		break;
	}
}
