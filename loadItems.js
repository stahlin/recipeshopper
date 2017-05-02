function loadSearchedItems(msg) {
	$('.recipeDisplay').html("<div id='recipes'></div>");
	console.log(msg[0]);
	for (var i = 0; i < msg.length; i++) {
		newRecipe(msg[i].title, msg[i].url, msg[i].description);
	}
	
}
function newRecipe(title, url, descr, ingred) {
    $('#recipes').append($("<div>").load("newRecipe.html", function() {}).data("title", title).data("url", url).data("descr", descr));
};