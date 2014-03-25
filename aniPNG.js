
// Global variable for holding animated images
pngSeq = new Array();

aniPNG = function(params, callback){
	this.container = params.container;
	this.imgName = params.imgName;

	var firstImage = params.firstImage,
		imgCount = params.imgCount,
		delay = (params.delay || 0),
		directions = /reverse|rev|rewind|rwd/,
		direction = (params.direction || null),
		repeat = (params.repeat || false),
		callback = (params.callback || callback),
		head = null, numbers = '',
		suffix = firstImage.substring(firstImage.length - 4, firstImage.length),	// Get image extension
		finishedNumbers = false, curIndex = firstImage.length - 5;
			
	this.images = new Array();
	this.delays = new Array();
	this.padCount = this.firstNum = this.lastNum = this.currentImage = 0;
	this.animationRunning = false;
	this.repeat = repeat;
	this.callback = (typeof callback == "function") ? callback : null;
	this.dir = directions.test(direction) ? "rwd" : "fwd";
	
	//this.setRepeat(this.repeat);
	this.setRepeat = function(repeat) {
		this.repeat = repeat;
		if (repeat && !this.animationRunning) this.startAnimation();
		return this;
	}

				
	if (suffix.search(/\.png/i) != 0 && suffix.search(/\.jpg/i) != 0)
		throw 'Invalid suffix for first image in animated PNG ' + this.imgName + ' - must be .png or .jpg';
	
	for (; curIndex >= 0 && !finishedNumbers; curIndex--) {
		if (/[0-9]/.test(firstImage.charAt(curIndex))) {
			numbers = firstImage.charAt(curIndex) + numbers;
			if (firstImage.charAt(curIndex) == '0') this.padCount++;
		} else {
			finishedNumbers = true;
		}
	}

	numbers = parseInt(numbers);		// Extract the number of the first image from the filename
	this.firstNum = this.currentImage = numbers;
	head = firstImage.substring(0, curIndex + 2);

	if(this.dir == "fwd"){
		for (var i = numbers; i < imgCount + numbers; i++) {
			this.images[i] = new Image; this.images[i].src = head + pad(i, this.padCount, this.dir) + suffix;
			this.lastNum = i; this.delays[i] = delay;
		}
	} else if(this.dir == "rwd"){
		for (var i = numbers; i > numbers - imgCount; i--) {
			this.images[i] = new Image; this.images[i].src = head + pad(i, this.padCount, this.dir) + suffix;
			this.lastNum = i; this.delays[i] = delay;
		}
	}

	function pad(number, padCount, dir) {
		var result = '' + number;
		if(dir == "rwd"){
			while (result.length < padCount + 2) result = '0' + result;
		} else {
			while (result.length < padCount + 1) result = '0' + result;
		}
		return result;
	}
	
	pngSeq[this.imgName] = this;
	
}

aniPNG.prototype = {
	isArray: function(o) { return Object.prototype.toString.call(o) === '[object Array]'; },
	stopAnimation: function() {
		this.animationRunning = false;
		this.currentImage = this.currentImage;
		return this;
	},
	startAnimation: function(delayBegin) {
		var that = this, time = (delayBegin || 100);
		this.stopAnimation();
		setTimeout(function(){ if (!that.animationRunning) that.animationRunning = true; that.drawFrame(); }, time);
		return this; 
	},
	jumpTo: function(frame){
		this.stopAnimation().draw(true).drawFrame(frame);
	},
	setFrameDelay: function(frame, delay) {
		if(frame == null && delay == null) return this;
		if(this.isArray(frame) && !this.isArray(delay)){
			for(var i=0; i < frame.length; i++){ this.delays[frame[i]] = delay; }
			return this;
		} else if(this.isArray(frame) && this.isArray(delay)){
			for(var i=0; i < frame.length; i++){ this.delays[frame[i]] = delay[i]; }
			return this;
		} else if(!this.isArray(frame) && this.isArray(delay)){
			this.delays[frame] = delay[0];
			return this;
		} else if(!this.isArray(frame) && !this.isArray(delay)){
			this.delays[frame] = delay;
			return this;
		}
	},
	draw: function(delayStart) {
		var html = new Array();
		html[html.length] = '<img id="' + this.imgName + '" src=""';
		if (this.altText) html[html.length] = ' alt="' + this.altText + '"';
		if (this.titleText) html[html.length] = ' title="' + this.titleText + '"';
		html[html.length] = '/>';
		document.getElementById(this.container).innerHTML = html.join('');

		document.getElementById(this.imgName).src = this.images[this.firstNum].src;
        if (!delayStart) {
            setTimeout('pngSeq[\'' + this.imgName + '\'].drawFrame()', this.delays[this.firstNum]);
            this.animationRunning = true;
		}
        this.drawn = true;
		return this;
	},
	drawFrame: function(val) {
		var drawImage = true, cb = this.callback;
		(this.dir == "rwd") ? this.currentImage-- : this.currentImage++;
		if ((this.dir == "fwd" && (this.currentImage > this.lastNum)) || (this.dir == "rwd" && (this.currentImage < this.lastNum))) {
			if (this.repeat) {
				this.currentImage = this.firstNum;
			} else {	
				drawImage = this.animationRunning = false;
				if(typeof cb == "function"){
					setTimeout(function(){ cb.call() },1);		// If animation is complete and callback exists
				} else {
					this.stopAnimation();
					//this.jumpTo(1);
				}
			}
		}
		if (drawImage && !val) {
			document.getElementById(this.imgName).src = this.images[this.currentImage].src;
			if (this.delays[this.currentImage]) delay = this.delays[this.currentImage];		// Calculate the delay before drawing the next frame
			if (this.animationRunning) setTimeout('pngSeq[\'' + this.imgName + '\'].drawFrame()', delay);		// Draw next frame after delay
		}
		else if (drawImage && val) {
			document.getElementById(this.imgName).src = this.images[val].src;
			if (this.delays[val]) delay = this.delays[val];		// Calculate the delay before drawing the next frame
			if (this.animationRunning) setTimeout('pngSeq[\'' + this.imgName + '\'].drawFrame()', delay);		// Draw next frame after delay
		}

	},
	callback: function(bool) { if(bool == false) this.callback = null; return this; }
}
