console.log("Hej");


const coco = cocoSsd.load();
const image = document.getElementById('image');

// Load the model.
coco.then(model => {
  console.log("trying...")
  model.detect(image).then(predictions => {
    console.log('Predictions: ', predictions);
    console.log(predictions[0].class);

  });
});
