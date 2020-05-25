<template>
<div id="webcam">
  <div class="lg-layout md-alignment-center">
    <div id="choose-action" class="md-layout md-alignment-center">
      <md-button class="md-raised md-primary" @click="startRecognition()">Start</md-button>
      <md-button class="md-raised md-accent" @click="stopRecognition()">Stop</md-button>
    </div>
    <div id="container">
      <video ref="video" src="" class="video" autoPlay playsInline muted width="600" height="500" poster="@/assets/placeholder.png"></video>
    </div>
  </div>
  <div class="lg-layout md-alignment-center">
    <div id="object-box">
      <span class="md-layout md-headline md-alignment-center">Object Recognised: <br> <span id="object">{{predictionClass}}</span></span>
    </div>
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
      canvasRef: null,
      predictionClass: null,
      stream: null,
    }
  },
  methods: {
    renderPredictions(predictions) {
      predictions.forEach(prediction => {
        let object = prediction.class.toUpperCase();
        this.predictionClass = object;
      });
    },
    detectFrame(video, model) {
      model.detect(video).then(predictions => {
        //console.log(predictions);
        this.renderPredictions(predictions);
        requestAnimationFrame(() => {
          this.detectFrame(video, model);
        });
      });
    },
    startRecognition() {
      console.log("hello");
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const webCamPromise = navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: {
              facingMode: "user"
            }
          })
          .then(stream => {
            this.stream = stream;
            window.stream = this.stream;
            this.videoRef.srcObject = this.stream;
            return new Promise((resolve) => {
              this.videoRef.onloadedmetadata = () => {
                resolve();
              };
            });
          });
        const modelPromise = cocoSsd.load();
        this.loading = false;
        Promise.all([modelPromise, webCamPromise])
          .then(values => {
            this.detectFrame(this.videoRef, values[0]);
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    stopRecognition() {
      this.stream.getTracks().forEach(function(track) {
        track.stop();
      });
    }
  },
  mounted() {
    this.videoRef = this.$refs.video;
    this.canvasRef = this.$refs.canvas;
    console.log(this.videoRef);
  },
}
</script>

<style lang="css" scoped>

button {
  margin-bottom: 10px;
}

#webcam {
  margin-top: 20px;
}

#choose-action .md-primary {
  margin-right: 15px;
}

#choose-action .md-accent {
  margin-left: 15px;
}

#container {
  margin-bottom: 20px;
}

video[poster]{
height:100%;
width:100%;
}

#object {
  color: #F29766;
  margin-left: 5px;
}

</style>
