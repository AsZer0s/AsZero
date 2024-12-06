---
title: JavaScript飞雪特效
date: 2024-12-03 17:36:19
tags: ['前端','JavaScript']
---
马上就要到了传统节日“春节”?
网站添加了飞雪❄️特效

从网上找了源代码
你可以复制到自己的网站或者博客体验一波

```html
<script>
(function($){
	$.fn.snow = function(options){
	var $flake = $('<div id="snowbox" />').css({'position': 'absolute','z-index':'9999', 'top': '-50px'}).html('❄'),
	documentHeight 	= $(document).height(),
	documentWidth	= $(document).width(),
	defaults = {
		minSize		: 6,
		maxSize		: 10,
		newOn		: 1000,
		flakeColor	: "#FFFFFF" /* 此处可以定义雪花颜色 */
	},
	options	= $.extend({}, defaults, options);
	var interval= setInterval( function(){
	var startPositionLeft = Math.random() * documentWidth - 100,
	startOpacity = 0.5 + Math.random(),
	sizeFlake = options.minSize + Math.random() * options.maxSize,
	endPositionTop = documentHeight - 200,
	endPositionLeft = startPositionLeft - 500 + Math.random() * 500,
	durationFall = documentHeight * 10 + Math.random() * 5000;
	$flake.clone().appendTo('body').css({
		left: startPositionLeft,
		opacity: startOpacity,
		'font-size': sizeFlake,
		color: options.flakeColor
	}).animate({
		top: endPositionTop,
		left: endPositionLeft,
		opacity: 0.2
	},durationFall,'linear',function(){
		$(this).remove()
	});
	}, options.newOn);
    };
})(jQuery);
$(function(){
    $.fn.snow({ 
	    minSize: 5, /* 定义雪花最小尺寸 */
	    maxSize: 20,/* 定义雪花最大尺寸 */
	    newOn: 800  /* 定义密集程度，数字越小越密集 */
    });
});
</script>
```