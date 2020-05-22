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

    const canvas = document.getElementById("canvas");
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
