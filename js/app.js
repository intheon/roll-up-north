$(document).ready(function(){
	$(".nav-item").click(function(){
		var which = event.target.id;
		turnDownLights(which);
	});
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
			});
		break;

		default:
			console.log("something went horribly wrong");
		break;
	}
}