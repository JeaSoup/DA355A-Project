console.log("Hej");


const coco = cocoSsd.load();
const image = $('#image');
console.log(image[0])

// Load the model.
coco.then(model => {
  console.log("trying...")
  model.detect(image[0]).then(predictions => {
    console.log('Predictions: ', predictions);
    console.log(predictions[0].class);
    $('.prediction').append(predictions[0].class);

  });
});
