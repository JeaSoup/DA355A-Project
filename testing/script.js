$('.status').text("Loading model, please wait..");

let cocoModel;
let image = new Image();
image.crossOrigin = "anonymous";
const coco = cocoSsd.load();
coco.then(model => {
  $('.status').text("Model loaded ready to make prediction!");
  cocoModel = model;
});




function fetchPrediction() {
  let prediction;

  cocoModel.detect(image).then(predictions => {
    prediction = predictions[0];
    console.log(prediction);
    $('.prediction').append(predictions[0].class);

    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    const width = prediction.bbox[2];
    const height = prediction.bbox[3];

    const canvas = document.getElementById("canvas-picture");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.strokeRect(x, y, width, height);


  });
}

$('#recognize').click(function() {
  let src = $('#src').val();
  image.src = src;
  image.onload = function() {
    fetchPrediction();
  }

});

const video = document.getElementById("video")

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
  }).catch(function (err0r) {
      console.log("Something went wrong!");
    });

function detectFrame() {
  model.detect(video).then(predictions => {
    renderOurPredictions(predictions)
    requestAnimationFrame(detectFrame)
  })
}
