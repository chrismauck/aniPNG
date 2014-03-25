

$(document).ready(function(){
	
	var fwdWithCallback = new aniPNG({
			"container": 'sample',
			"imgName": 'anim1',
			"firstImage": 'images/_seq/carnevil_0001.jpg',
			"imgCount": 18,
			"delay": 99,
			"repeat": true
		});
		fwdWithCallback.draw(true).startAnimation();
	
});