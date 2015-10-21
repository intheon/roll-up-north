$(document).ready(function(){
	$(".nav-item").click(function(){
		var which = event.target.id;
		turnDownLights(which);
	});
});

function turnDownLights(which)
{
	$(".overlay").fadeOut(function(){
		$(this).hide();
	});
	$(".behind-scenes-video").fadeOut(function(){
		$(this).hide();
	});
	$(".words").fadeOut(function(){
		$(this).hide();
	});

	switch (which)
	{
		case "watchVid":
			$(".beers").fadeIn(function(){
				$(".watch-vid").fadeIn();
			});
		break;

		case "aboutPeeps":
		break;

		case "skateMap":
		break;

		default:
			console.log("something went horribly wrong");
		break;
	}
}