(function(){
    "use strict";
    var sendRecipe = function(titl, ur, desc, collection) {
        var arr = { collect: collection, title: titl, url: ur, description: desc};
            $.ajax({
                url: 'http://localhost:3000/addToDB',
                type: 'POST',
                data: JSON.stringify(arr),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(msg) {
                    console.log(msg);
                }
            });
        };
    var sendMore = function(titl, desc, ingred, dir, collection) {
        var arr = { collect: collection, title: titl, description: desc, ingredients: ingred, direction: dir };
            $.ajax({
                url: 'http://localhost:3000/addToDB',
                type: 'POST',
                data: JSON.stringify(arr),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(msg) {
                    console.log(msg);
                }
            });
        };
    $('document').ready(function() {
        $('.clicker').on('click', function() {
            var title = $('#title').val();
            var url = $('#url').val();
            if (url === "") {
                url = "http://clubreduva.com/wp-content/uploads/2015/12/default-recipe.png";
            }
            var desc = $('#description').val();
            var ingredients = $('#ingredients').val();
            var directions = $('#directions').val();
            console.log(ingredients);
            sendRecipe(title, url, desc, "recipes");
            sendMore(title, desc, ingredients, directions, "learnmores");
        });
    });
}());