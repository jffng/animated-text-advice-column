// iPhone 6 dimensions
var screenWidth = 375;
var screenHeight = 672;
var myFont, gif, maxWidth, gifHeight, gifWidth, gifRatio;

function preload(){
	myFont = loadFont('assets/sf-text-medium.ttf');
	gif = loadGif('assets/test.gif');
}

function setup(){
	createCanvas(screenWidth, screenHeight);
	background(255);
	stroke(200);
	fill(255);
	rect(0,0, 374, 671);
	ellipseMode(CENTER);
	smooth();
	textFont(myFont);

	rectMode(CENTER);
	var t = text;	
	var blue = color(0, 122, 255);
	var grey = color(205,205,205);
	maxWidth = Math.ceil(screenWidth * .6);


	sometext = "hey ?what is this going to look like...... .  who knows i sure don't. but it doens't look perfect yet. it's almost getting there after";
	nextMsgY = drawMessage(sometext, 10, t, "sender");

	sometext = "some not so ordinary text blah blah blah ";
	next = drawMessage(sometext, 1 + nextMsgY, t, "sender");

	sometext = "some not so";
	next = drawMessage(sometext, 10 + next, t, "receiver");

	sometext = "some not so ssssssssssssssssssssssss";
	next = drawMessage(sometext, 1 + next, t, "receiver");

	sometext = "some not";
	next = drawMessage(sometext, 10 + next, t, "sender");

	sometext = "some not so ordinary text blah blah blah ";
	next = drawMessage(sometext, 1 + next, t, "sender");


}

function draw(){

	gifRatio = gif.width / gif.height;
	gifHeight = maxWidth / gifRatio; 

	image(gif, width * .925 - maxWidth, 5 + next, maxWidth, gifHeight);

}

function drawMessage(text, firstCornerY, layoutText, orientation){
	var c, textColor, position, xOffset, width, textOffset, heightScale;
	var height = 28; 
	var yOffset = height / 2;

	if (orientation == "sender"){
		position = .925;
		c = color(0, 122, 255);
		textColor = 255;
		xOffset = height / 2;
	} else {
		position = .075;
		c = color(210,210,210);
		textColor = 55;
		xOffset = - height / 2;
	}

	// maximum width of a message line
	// console.log('max width: '+ maxWidth);

	// cornerX
	var firstCornerX = screenWidth * position;
	
	var str = text;
	textSize(12);
	var numLines = Math.ceil(textWidth(str) / (maxWidth - 20));

	textAlign(LEFT);

	switch (numLines) {
		case 1:
			textAlign(LEFT);
			var tWidth = textWidth(str);
			textOffset = 4;
			width = Math.ceil(textWidth(str) + 8);
			heightScale = 0;
			// console.log("text width: " + textWidth(str));

			// if (tWidth > 20 && tWidth < 120){
			// 	width = Math.ceil(textWidth(str) + xOffset);
			// }
			// else if (tWidth > 120 && tWidth < 207){
			// 	width = Math.ceil(textWidth(str) + xOffset * 2);
			// } 
			// else if (tWidth > 207){
			// 	width = maxWidth;
			// 	numLines = 2;
			// 	textOffset = 2;
			// 	heightScale = .25;
			// 	textAlign(LEFT);
			// }

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
	// console.log("middle left Y: " + middleLeftY);
	var thirdCornerY = middleLeftY + yOffset;
	
	if (numLines > 1) {
		rect(middleRightX, middleRightY, middleLeftX, middleLeftY);
		rect(firstCornerX, firstCornerY, secondCornerX, thirdCornerY);
	
		// draw bottom right and left circles
		ellipse(firstCornerX, middleLeftY, height, height);
		ellipse(secondCornerX,  middleLeftY, height, height);
	} 

	rectMode(CORNERS);
	fill(textColor);
	if (orientation == "sender") {
		// do nothing;	
	} else {
		secondCornerX -= width;
	} 
	layoutText(str, secondCornerX, firstCornerY + yOffset / textOffset, width, thirdCornerY);

	if (numLines === 1) thirdCornerY = secondCornerY;

	return thirdCornerY;
}








