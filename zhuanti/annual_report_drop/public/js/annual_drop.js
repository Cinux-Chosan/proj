(function(jQuery) {
  var $ = jQuery;
  var viewPort = $(window);
  var totalHeight = viewPort.height();
  var totalWidth = viewPort.width();
  var psdWidth = 750;
  var psdHeight = 1334;

  function writeStyle(el, key, val) {
    el = $(el);
    var elStyle = el.attr('style');
    elStyle = elStyle ? elStyle : '';
    var style = key + ":" + val + ";" + elStyle;
    return el.attr('style', style);
  }


  var noteHeader = $('.note_header');
  var noteBody = $('.note_body');
  noteBody.height(viewPort.height() - noteHeader.height());

  // init bodyContent position
  var bodyContent = $('.body_content');
  var left = 18 / psdWidth * viewPort.width();  // 18 笔记本离视窗左边像素
  var width = (psdWidth - 18 - 23) / psdWidth * viewPort.width();  // 23 为笔记本离视窗右边像素
  writeStyle(bodyContent, 'margin-left', left + 'px');
  writeStyle(bodyContent, 'width', width + 'px');

  // init saw position
  var saw = $('.saw');
  var sawHeight = 35 / psdHeight * viewPort.height();  // 35 为不动锯齿高度
  saw.height(sawHeight);

  // init pageContainer height
  var pageContainer = $('.page-container');
  var pageContainerHeight = 1126 / psdHeight * viewPort.height();
  pageContainer.height(pageContainerHeight);





})($);
