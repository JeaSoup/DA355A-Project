$('.status').text("Loading model, please wait..");

let cocoModel;
const coco = cocoSsd.load();
coco.then(model => {
  $('.status').text("Model loaded ready to make prediction!");
   cocoModel = model;
});
let image = new Image();
console.log(src);
//image = document.getElementById('image');
//image.src = "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg"

let prediction;



$('#recognize').click(function() {
  let src = $('#src').val();
  image.src = src;
  console.log(image.src)
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
});
