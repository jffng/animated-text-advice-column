var sketch = function(p){
	// iPhone 6 dimensions
	var screenWidth = 375;
	var screenHeight = 672;
	var myFont, gif, maxWidth, gifHeight, gifWidth, gifRatio, previousMessageType;
	var c, textColor, position, xOffset, width, textOffset, heightScale;
	var height = 28; 
	var yOffset = height / 2;	
	var start = 10;
	var spacing = 0;

	p.preload = function(){
		myFont = p.loadFont('assets/sf-text-medium.ttf');
		gif = p.loadGif('assets/test.gif');	
	}

	function drawMessage(copy, firstCornerY, orientation){
		var layoutText = p.text;

		if (orientation == "sender"){
			position = .925;
			c = p.color(0, 122, 255);
			textColor = 255;
			xOffset = height / 2;
		} else {
			position = .075;
			c = p.color(225,225,225);
			textColor = 55;
			xOffset = - height / 2;
		}

		var firstCornerX = screenWidth * position;
		
		var str = copy;
		p.textSize(12);
		var numLines = Math.ceil(p.textWidth(str) / maxWidth);

		p.textAlign(p.LEFT);

		switch (numLines) {
			case 1:
				var tWidth = p.textWidth(str);
				textOffset = 4;
				width = Math.ceil(p.textWidth(str) + 4);
				heightScale = 0;
				break;
			case 2: 
				width = maxWidth;
				textOffset = 2;
				heightScale = .25;
	 			break;
			case 3:
				width = maxWidth;
				textOffset = 2;
				heightScale = .55;
				break;
			default:
				width = maxWidth;
				textOffset = 2;
				heightScale = .65;
				break;
		}

		var secondCornerY = firstCornerY + height; 
		if (orientation == "sender") var secondCornerX = firstCornerX - width;
		else var secondCornerX = firstCornerX + width;

		p.fill(c);
		p.noStroke();
		
		p.rectMode(p.CORNERS);
		p.rect(firstCornerX, firstCornerY, secondCornerX, secondCornerY);

		// draw top right and left circles
		p.ellipse(firstCornerX, firstCornerY + height / 2, height, height);
		p.ellipse(secondCornerX, firstCornerY + height / 2, height, height);
		
		var middleRightX = firstCornerX + xOffset;
		var middleRightY = firstCornerY + yOffset;
		var middleLeftX = secondCornerX - xOffset;
		var middleLeftY = secondCornerY + yOffset * numLines * heightScale;
		// console.log("middle left Y: " + middleLeftY);
		var thirdCornerY = middleLeftY + yOffset;
		
		if (numLines > 1) {
			p.rect(middleRightX, middleRightY, middleLeftX, middleLeftY);
			p.rect(firstCornerX, firstCornerY, secondCornerX, thirdCornerY);
		
			// draw bottom right and left circles
			p.ellipse(firstCornerX, middleLeftY, height, height);
			p.ellipse(secondCornerX,  middleLeftY, height, height);
		} 

		p.rectMode(p.CORNERS);
		p.fill(textColor);
		if (orientation == "sender") {
			// do nothing;	
		} else {
			secondCornerX -= width;
		} 
		p.text(str, secondCornerX, firstCornerY + yOffset / textOffset, width, thirdCornerY);

		if (numLines === 1) thirdCornerY = secondCornerY;

		return thirdCornerY;
	}

	p.setup = function(){
		p.createCanvas(screenWidth, screenHeight);
		p.background(255);
		p.stroke(200);
		p.fill(255);
		p.rect(0,0, 374, 671);
		p.ellipseMode(p.CENTER);
		p.textFont(myFont);
		p.smooth();

		p.rectMode(p.CENTER);
		var t = p.text;	
		maxWidth = Math.ceil(screenWidth * .6);

		// grabs the global variable "conversation" set from the form
		for (var m in conversation) {
			if (m === 0) {
				previousMessageType = conversation[m].type;
			}
			if (previousMessageType == conversation[m].type) {
				spacing = 1;
			} else {
				spacing = 10;
			}
			// draw the message, return the value for where the next message is to be placed
			start = drawMessage(conversation[m].message, start + spacing, conversation[m].type);
			
			previousMessageType = conversation[m].type;
		}

	}

	p.draw =function(){
		gifWidth = maxWidth + Math.abs(xOffset) * 2;
		gifRatio = gif.width / gif.height;
		gifHeight = gifWidth / gifRatio; 	

		p.image(gif, screenWidth * .925 - maxWidth - Math.abs(xOffset), start + spacing, gifWidth, gifHeight);

	}	
}








