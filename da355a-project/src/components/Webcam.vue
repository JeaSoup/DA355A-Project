<template>
<div>
  <div class="md-layout md-alignment-center">
    <canvas id="canvas-video" />
    <h1>Här kommer canvas</h1>
  </div>
  <span class="md-layout md-headline md-alignment-center">Options:</span>
  <div id="choose-action" class="md-layout md-alignment-center">
    <md-button class="md-raised md-primary">Start</md-button>
    <md-button class="md-raised md-accent">Stop</md-button>
  </div>
</div>
</template>

<script>
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
export default {
  data() {
    return {
    cocoSsd: null,
    videoRef: null,
    }
  },
  methods: {

  },
  mounted() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user"
          }
        })
        .then(stream => {
          window.stream = stream;
          this.videoRef.current.srcObject = stream;
          return new Promise((resolve) => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        });
      const modelPromise = cocoSsd.load();
      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          this.detectFrame(this.videoRef.current, values[0]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
}
</script>

<style lang="css" scoped>

#choose-action .md-primary {
  margin-right: 15px;
}

#choose-action .md-accent {
  margin-left: 15px;
}

</style>
