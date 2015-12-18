var screenWidth = 375;
var screenHeight = 672;

function setup(){
	createCanvas(screenWidth, screenHeight);
	background(12);
	rectMode(CENTER);
	smooth();
	var t = text;	
	drawBlueMessage(undefined, 375 / 1.6, 100, t);
}

function draw(){
}

function drawBlueMessage(text, centerX, centerY, func){
	var c = color(0, 122, 255);
	var width = screenWidth * .6;
	var height = 25;
	var left = centerX - width / 2;
	var right = centerX + width / 2;
	var textPadding = 20;
	fill(c);
	noStroke();
	rect(centerX, centerY, width, height);
	rect(centerX, centerY+height, width + height, height);
	ellipse(left, centerY, height, height);
	ellipse(right, centerY, height, height);

	ellipse(left, centerY + height, height, height);
	ellipse(right, centerY + height, height, height);


	textFont("Helvetica Neue");
	fill(255);
	textSize(13);
	var str = "hello world today and tomorrow and yesterday and forever";
	rectMode(CORNER);
	func(str, centerX - width / 2, centerY - 8, width, height * 3);

	var tw = textWidth(str);
	console.log(tw / width);

}

// function drawWhiteMessage()