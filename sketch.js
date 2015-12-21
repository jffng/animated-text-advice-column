// iPhone 6 dimensions
var screenWidth = 375;
var screenHeight = 672;
var myFont;

function preload(){
	myFont = loadFont('assets/sf-text-medium.ttf');
}

function setup(){
	createCanvas(screenWidth, screenHeight);
	background(255);
	stroke(0);
	fill(255);
	rect(0,0, 374, 671);
	ellipseMode(CENTER);
	smooth();

	rectMode(CENTER);
	var t = text;	
	// drawBlueMessage(undefined, 375 / 1.6, 50, t, myFont);

	// var sometext = "some more text";
	// var nextMsgY = drawBlueMessage(sometext, 10+ nextMsgY, t, myFont);

		sometext = "hey ?what is this going to look like...... .  who knows i sure don't. but it doens't look perfect yet. it's almost getting there after";
		nextMsgY = drawBlueMessage(sometext, 10, t, myFont);

		sometext = "some not so ordinary text blah blah blah ";
		next = drawBlueMessage(sometext, 10 + nextMsgY, t, myFont);

		sometext = "some not so ordinary text";
				drawBlueMessage(sometext, 10 + next, t, myFont);

		// sometext = "some other text";
		// nextMsgY = drawBlueMessage(sometext, 30+ nextMsgY, t, myFont);

}

function draw(){
}

function drawBlueMessage(text, firstCornerY, func, font){
	// iMessage blue
	var c = color(0, 122, 255);

	// maximum width of a message line
	var maxWidth = Math.ceil(screenWidth * .6);
	console.log('max width: '+ maxWidth);

	// cornerX
	var firstCornerX = screenWidth * .925;
	
	var str = text;
	var numLines = Math.ceil(textWidth(str) / (maxWidth - 20));

	// if (textWidth(str) > 195) numLines = 2;
	console.log("num lines: " + numLines);	
	console.log("num lines unrounded: " + textWidth(str) / (maxWidth- 20));	
	
	var height = 28; 
	var yOffset = height / 2;
	var xOffset = height / 2;
	var width, textOffset, heightScale;

	textAlign(LEFT);

	switch (numLines) {
		case 1:
			textAlign(CENTER);
			var tWidth = textWidth(str);
			textOffset = 4;
			console.log("text width: " + textWidth(str));

			if (tWidth > 20 && tWidth < 120){
				width = Math.ceil(textWidth(str) + xOffset);
			}
			else if (tWidth > 120 && tWidth < 207){
				width = Math.ceil(textWidth(str) + xOffset * 2);
			} 
			else if (tWidth > 207){
				width = maxWidth;
				numLines = 2;
				textOffset = 2;
				heightScale = .25;
				textAlign(LEFT);
			}

			break;
		case 2: 
			// height = 21;
			width = maxWidth;
			textOffset = 2;
			heightScale = .25;
			break;
		case 3:
			// height = 24;
			width = maxWidth;
			textOffset = 2;
			heightScale = .55;
			break;
		default:
			// height = 24;
			width = maxWidth;
			textOffset = 2;
			heightScale = .75;
			break;
	}

	var secondCornerY = firstCornerY + height; 
	var secondCornerX = firstCornerX - width; 

	// var left = centerX - width / 2;
	// var right = centerX + width / 2;

	fill(c);
	noStroke();
	
	rectMode(CORNERS);
	rect(firstCornerX, firstCornerY, secondCornerX, secondCornerY);

	// draw top right and left circles
	ellipse(firstCornerX, firstCornerY + height / 2, height, height);
	ellipse(secondCornerX, firstCornerY + height / 2, height, height);
	
	var middleRightX = firstCornerX + xOffset;
	var middleRightY = firstCornerY + yOffset;
	var middleLeftX = secondCornerX - xOffset;
	var middleLeftY = secondCornerY + yOffset * numLines * heightScale;
	var thirdCornerY = middleLeftY + yOffset;
	
	if (numLines > 1) {
		rect(middleRightX, middleRightY, middleLeftX, middleLeftY);
		rect(firstCornerX, firstCornerY, secondCornerX, thirdCornerY);
	
		// draw bottom right and left circles
		ellipse(firstCornerX, middleLeftY, height, height);
		ellipse(secondCornerX,  middleLeftY, height, height);
	
	} 

	
	textFont(font);
	fill(255);
	textSize(12);
	rectMode(CORNERS);
	func(str, secondCornerX, firstCornerY + yOffset / textOffset, width, thirdCornerY);

	return thirdCornerY;
}








