var sketch = function(p) {
  // some variables in no particular order
  var myFont, maxWidth, previousMessageType,
    c, textColor, position, xOffset, width,
    textOffset, heightScale, gifNext, gifWidth, gifHeight;
  var height = 28;
  var yOffset = height / 2;
  var next = 10;
  var spacing = 0;
  var self = this;

  p.preload = function() {
    myFont = p.loadFont('assets/sf-text-medium.ttf');
    // gif = p.loadGif('assets/test.gif');	
  }

  p.setup = function() {
    var c = p.createCanvas(screenWidth, screenHeight)
    c.parent('canvas-holder');
    p.background(255);
    p.stroke(200);
    p.fill(255);
    p.rect(0, 0, screenWidth - 1, screenHeight - 1);
    p.ellipseMode(p.CENTER);
    p.textFont(myFont);
    p.smooth();

    p.rectMode(p.CENTER);


  }

  p.draw = function() {
    next = 10;
    p.background(255);
    var t = p.text;
    maxWidth = Math.ceil(screenWidth * .6);

    // grabs the global variable "conversation" set from the form
    for (var m in conversation) {
      var a = undefined;

      if (m === 0) {
        previousMessageType = conversation[m].type;
      }

      if (previousMessageType == conversation[m].type) {
        spacing = 1;
      } else if (previousMessageType == "gif" && conversation[m].type == "sender") {
        spacing = 10;
      } else {
        spacing = 10;
      }

      // draw the message, return the value for where the next message is to be placed
      if (conversation[m].type == "sender") {
        // set the alpha value for multiple blue messages
        var a = (conversation.length - 1) * 3 - m * 3;

        next = drawMessage(conversation[m].message, next + spacing, conversation[m].type, a);
      } else if (conversation[m].type == "gif") {
        gifWidth = conversation[m].width;
        gifHeight = conversation[m].height;
        gifNext = next + spacing;
        next = next + spacing + gifHeight;
      } else {
        next = drawMessage(conversation[m].message, next + spacing, conversation[m].type, a);
      }

      previousMessageType = conversation[m].type;
    }
    if (gif && gif.loaded()) {
      p.image(gif, screenWidth * .925 - maxWidth - Math.abs(xOffset), gifNext, gifWidth, gifHeight);
    }
  }

  function drawMessage(copy, firstCornerY, orientation, alpha) {
    var layoutText = p.text;

    if (orientation == "sender") {
      position = .925;
      p.colorMode(p.HSB);
      c = p.color(211, 100 - alpha, 100);
      textColor = 255;
      xOffset = height / 2;
    } else {
      position = .075;
      p.colorMode(p.RGB);
      c = p.color(225, 225, 225);
      textColor = 55;
      xOffset = -height / 2;
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
      p.ellipse(secondCornerX, middleLeftY, height, height);
    }

    p.rectMode(p.CORNERS);
    p.colorMode(p.RGB);
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
}




var lineCounter = 0;
var myp5, conversation, gif, h, w, cut, allFrames; // gifWidth, gifHeight, gifRatio;
var screenWidth = 375;
var screenHeight = 0;

$('.delete').click(function(e) {
  e.preventDefault();
  $(this).parent().remove();
  lineCounter--;
});

// $('#the-form').on('submit', function(e) {
//   console.log('hi');
//   e.preventDefault();
// });

$('.add-line').click(function(e) {
  lineCounter++;

  var newMessage = '<div class="message" id=line-' + lineCounter + '><label><input type="radio" name="who-' + lineCounter + '" value="receiver">From You</label> <label><input type="radio" value="sender" name="who-' + lineCounter + '" checked>From Me</label> <input type="text" placeholder="message goes here"><button class="delete">Delete line</button></div>';
  $('#the-form').append(newMessage);

  $('#line-' + lineCounter).children('.delete').click(function(e) {
    e.preventDefault();
    $(this).parent().remove();
    lineCounter--;
  });
});

$('.add-gif').click(function(e) {
  if ($('#upload').length) {
    alert("Can only use gif at a time!");
  } else {
    $('#the-form').append('<div class="message"><input id="upload" type="file"><button class="delete">Delete line</button></div>');
    lineCounter++;
    $('#upload').siblings('.delete').click(function() {
      $(this).parent().remove();
      lineCounter--;
    });

    document.getElementById('upload').addEventListener('change', handleFileSelect, false);
    $('#upload').click();

  }

});

$('.preview').click(function(ev) {
  previewGif();
});

$('.generate').click(function(ev) {
  previewGif();
  setTimeout(generateGif, 1000);
});


function previewGif() {
  screenHeight = 0;
  // array to be handled by the p5 sketch 
  conversation = [];
  $('#the-form').children('.message').each(function(e) {
    var message;

    if ($(this).find('input:file').length) {
      message = {
        type: "gif",
        height: h,
        width: w
      };
      screenHeight += h + 20;
    } else if ($(this).find('input:text').val().trim() !== ''){
      message = {
        type: $(this).find('input:checked').val(),
        message: $(this).find('input:text').val()
      };
      screenHeight += Math.ceil($(this).find('input:text').val().length / 40) * 32;
    }

    if (message) {

      // new message objects are pushed to the array
      conversation.push(message);
    }
  });

  // console.log('screen height: ' + screenHeight);

  screenHeight += 30;

  if (myp5) myp5.remove();
  myp5 = new p5(sketch);
}

function generateGif() {
  cut = new GIF({
    workers: 4,
    quality: 10,
    workerScript: 'lib/gif.worker.js',
    width: screenWidth*2,
    height: screenHeight*2
  });

  gif.pause();

  var totalFrames = gif.totalFrames();
  allFrames = gif.frames();

  addFrames(0, totalFrames, function() {
    cut.render();
  });
  // for (var i = 0; i < totalFrames; i++) {
  //   gif.frame(i);
  //   console.log(i);
  //   cut.addFrame(myp5.canvas.getContext('2d'), {
  //     delay: allFrames[i].delay,
  //     copy: true
  //   });
  // }

  cut.on('finished', function(blob) {
    window.open(URL.createObjectURL(blob));
    console.log('finished the cut');
    gif.play();
  });

}

function addFrames(i, stop, cb) {
  if (i < stop) {
    gif.frame(i);
    setTimeout(function() {
      cut.addFrame(myp5.canvas.getContext('2d'), {
        delay: allFrames[i].delay,
        copy: true
      });
      setTimeout(function() {
        addFrames(i+1, stop, cb);
      }, 20);
    }, 20);

  } else {
    cb();
  }

}

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  var screenWidth = 375;

  for (var i = 0, f; f = files[i]; i++) {
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    reader.onload = (function(theFile) {
      return function(e) {
        // this is where the magic happens
        gif = p5.prototype.loadRawGif(e.target.result);

        // this is not a good solution, but i'm tired
        setTimeout(function() {
          w = Math.ceil(screenWidth * .6) + 28;
          var r = gif.width / gif.height;
          h = w / r;

        }, 500);
      };
    })(f);

    reader.readAsBinaryString(f);
  }
}
