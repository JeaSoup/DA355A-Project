$('.status').text("Loading model, please wait..");
const pictureCanvas = document.getElementById("canvas-picture");
const videoCanvas = document.getElementById("canvas-video");

let cocoModel;
let image = new Image();
let video = document.createElement('video');
image.crossOrigin = "anonymous";
const coco = cocoSsd.load();
coco.then(model => {
  $('.status').text("Model loaded ready to make prediction!");
  cocoModel = model;
});


function renderPredictions(predictions, current) {
  const ctx = current.getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  // Font options.
  const font = "25px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";
  predictions.forEach(prediction => {
    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    const width = prediction.bbox[2];
    const height = prediction.bbox[3];
    // Draw the bounding box.

    pictureCanvas.width = image.width;
    pictureCanvas.height = image.height;
    videoCanvas.width = 600;
    videoCanvas.height = 500;

    //for image
    ctx.drawImage(image, 0, 0, pictureCanvas.width, pictureCanvas.height);
    //for video
    ctx.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);
    ctx.strokeRect(x, y, width, height);
    // Draw the label background.
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10); // base 10
  });

  predictions.forEach(prediction => {
    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    // Draw the text last to ensure it's on top.
    ctx.fillText(prediction.class, x, y);
  });
}

function fetchPrediction() {
  let prediction;

  cocoModel.detect(image).then(predictions => {
    console.log(prediction);
    $('.prediction').append(predictions[0].class);

    renderPredcitions(predictions, canvas);


  });
}

$('#recognize-picture').click(function() {
  let src = $('#src').val();
  image.src = src;
  image.onload = function() {
    fetchPrediction();
  }

});

$('#recognize-video').click(function() {
  detectFrame();

});


navigator.mediaDevices
  .getUserMedia({
    audio: false,
    video: {
      facingMode: "user",
      width: 600,
      height: 500
    }
  })
  .then(stream => {
    video.srcObject = stream
    video.onloadedmetadata = () => {
      video.play()
    }
    l
  }).catch(function(err0r) {
    console.log("Something went wrong!");
  });

function detectFrame() {
  cocoModel.detect(video).then(predictions => {
    console.log(predictions);
    $('.prediction').empty();
    if (predictions.length > 0) {
      $('.prediction').append(predictions[0].class);
    }
    renderPredictions(predictions, videoCanvas)
    requestAnimationFrame(detectFrame)
  })
}
