(function(jQuery) {
  var $ = jQuery;

  function writeStyle(el, key, val) {
    el = $(el);
    var style = key + ":" + val + ";" + el.attr('style');
    return el.attr('style', style);
  }

  $(function() {
    var $window = $(window),
      $header = $('.header'),
      body = $('.body'),
      flipbook = $("#flipbook"),
      bookContainer = $('.book-container');
    height = $window.height() - $header.height();
    body.height(height);

    // 调整 bookContainer 旋转 90 度后的位置
    // bookContainer.height(body.width()).width(body.height());
    // writeStyle(bookContainer, 'left', (body.width() - body.height()) / 2 + 'px');
    // writeStyle(bookContainer, 'top', (body.height() - body.width()) / 2 + 'px');


    // flipbook

    setTimeout(function() {
      flipbook.turn({
          height: "100%",
          width: "100%",
          // height: bookContainer.width(),
          // width: bookContainer.height(),
          acceleration: true,
          autoCenter: true,
          display: 'single'
        });
      }, 0);
  });
})($);
