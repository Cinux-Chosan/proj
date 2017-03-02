var myApp = new Framework7();
var $$ = Framework7.$;
var mainView = myApp.addView('.view-main', {
  dynamicNavbar: true,
  allowPageChange: true,
  domCache: true
});

$$(document).on('navbarInit', function(e) {
  var navbar = e.detail.navbar;
  var page = e.detail.page;
});

$$(document).on('navbarReinit', function(e) {
  var navbar = e.detail.navbar;
  var page = e.detail.page;
})

var mySearchbar = myApp.searchbar('.searchbar', {
    overlay: '.searchbar-overlay'
});

mySearchbar.onSearch = (function(){debugger});
mySearchbar.onClear = (function(){debugger});

// setTimeout(function() {mainView.router.loadPage('#second');}, 2000);
// setTimeout(function() {mainView.router.back();}, 4000);
// setTimeout(function() {mainView.router.loadContent($$('#page-content').html());}, 2000);
