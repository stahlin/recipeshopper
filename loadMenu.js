(function() {
    "use strict";
     var loadMenu = function() {
        $('#menu').load("menu.html", function() {
            //alert("menu Loaded");
        });
    };
    $('document').ready(function() {
        loadMenu();
    });
}())