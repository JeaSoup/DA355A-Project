<template>
<div id="webcam">
  <div class="lg-layout md-alignment-center">
    <div id="choose-action" class="md-layout md-alignment-start">
      <md-button class="md-raised md-primary" @click="startRecognition(); showSnackbar = true">Start</md-button>
      <md-button class="md-raised md-accent" @click="stopRecognition(); showSnackbar = true">Stop</md-button>
      <md-switch :disabled="toggleDisabled" class="md-primary" v-model="frontCamera" id="camera-mode">Front Camera</md-switch>
    </div>
    <div id="container">
      <video ref="video" src="" class="video" autoPlay playsInline muted width="600" height="500" poster="@/assets/placeholder.png"></video>
    </div>
  </div>
  <div class="lg-layout md-alignment-center">
    <div id="object-box">
      <md-card>
        <md-card-header>
          <span class="md-title">Prediction</span><br>
          <span class="md-subhead">Score: <span id="score">{{predictionScore}}</span> </span>
        </md-card-header>

        <span class="md-layout md-display-3 md-alignment-center"><span id="object">{{predictionClass}}</span></span>
        <md-card-actions>
          <md-button>Save</md-button>
          <md-button>Translate</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
  <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
    <span>{{statusMessage}}</span>
    <md-button class="md-primary" @click="showSnackbar = false">Close</md-button>
  </md-snackbar>
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
      predictionClass: "N/A",
      predictionScore: "N/A",
      stream: null,
      showSnackbar: false,
      position: 'center',
      duration: 4000,
      isInfinity: false,
      statusMessage: "",
      facingMode: "user",
      frontCamera: false,
      toggleDisabled: false,
      windowWidth: null
    }
  },
  methods: {
    renderPredictions(predictions) {
      predictions.forEach(prediction => {
        console.log(prediction);
        let object = prediction.class.toUpperCase();
        this.predictionClass = object;
        this.predictionScore = prediction.score;
      });
    },
    detectFrame(video, model) {
      model.detect(video).then(predictions => {
        console.log(predictions);
        this.renderPredictions(predictions);
        requestAnimationFrame(() => {
          this.detectFrame(video, model);
        });
      });
    },
    startRecognition() {
      this.statusMessage = "Webcam on. Capturing video!";
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const webCamPromise = navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: {
              facingMode: this.frontCamera
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
      this.statusMessage = "Webcam off. Stop capturing video!"
      try {
        this.stream.getTracks().forEach(function(track) {
          track.stop();
        });
      } catch (err) {
        console.log("Not stream available")
      }
    }
  },
  mounted() {
    this.videoRef = this.$refs.video;
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 1279) {
        this.toggleDisabled = true;
      }
      if (this.windowWidth < 1279) {
        this.toggleDisabled = false;
      }
    })
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

#container {
  margin-bottom: 20px;
}

video[poster]{
  height:100%;
  width:100%;
}

#object, #score {
  color: #F29766;
  margin-left: 5px;
}

</style>
