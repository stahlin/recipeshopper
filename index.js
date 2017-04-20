(function() {
   "use strict";
    
    var loadRecipes = function() {
        var arr = { title: "", url: "ur", description: "desc"};

        $.ajax({
                url: '/getDataBase',
                type: 'POST',
                data: JSON.stringify(arr),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(msg) {
                    for(var i = 0; i < msg.length; i++) {
                        newRecipe(msg[i].title, msg[i].url, msg[i].description, msg[i].ingredients);
                    }
                }
            });
    };
    var newRecipe = function(title, url, descr, ingred) {
        $('#recipes').append($("<div>").load("newRecipe.html", function() {}).data("title", title).data("url", url).data("descr", descr).data("ingredients", ingred));
    };
    
   
    
    $('document').ready(function() {
        loadRecipes();
        
    });
    
}())












