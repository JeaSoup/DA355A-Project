<template>
<div id="webcam">
  <div class="md-layout md-alignment-center">
    <div id="choose-action" class="md-layout md-alignment-start">
      <md-button class="md-raised md-primary" @click="startRecognition(); showSnackbar = true">Start</md-button>
      <md-button class="md-raised md-accent" @click="stopRecognition(); showSnackbar = true">Stop</md-button>
      <md-switch :disabled="toggleDisabled" class="md-primary" v-model="frontCamera" id="camera-mode">Front Camera</md-switch>
    </div>
  </div>
  <div class="md-layout md-alignment-center">
    <video ref="video" src="" class="video" autoPlay playsInline muted poster=""></video>
  </div>

  <md-content id="prediction-box">

    <span class="md-layout md-display-3 md-alignment-center" id="prediction"><span id="object">{{predictionClass}}</span></span>
  </md-content>
  <PredictionTable id="prediction-table" v-bind:objects="objects" />
  <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
    <span>{{statusMessage}}</span>
    <md-button class="md-primary" @click="showSnackbar = false">Close</md-button>
  </md-snackbar>
</div>
</template>

<script>
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import PredictionTable from './PredictionTable';
import {
  uuid
} from 'uuidv4';
export default {
  props: {
    language: String
  },
  components: {
    PredictionTable
  },
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
      windowWidth: null,
      objects: [],
      live: false,
    }
  },
  methods: {
    renderPredictions(predictions) {
      predictions.forEach(prediction => {
        console.log(prediction);
        let newObject = {
          id: uuid(),
          name: prediction.class,
          translation: "",
          language: this.language,
          score: prediction.score
        }
        //Check if element does exist before pushing.
        Array.prototype.inArray = function(comparer) {
          for (var i = 0; i < this.length; i++) {
            if (comparer(this[i])) return true;
          }
          return false;
        };
        Array.prototype.pushIfNotExist = function(element, comparer) {
          if (!this.inArray(comparer)) {
            this.push(element);
          }
        };
        this.objects.pushIfNotExist(newObject, function(e) {
          return e.name === newObject.name && e.text === newObject.text;
        });
        this.predictionClass = prediction.class.toUpperCase();
        this.predictionScore = prediction.score;
      });
    },
    detectFrame(video, model) {
      model.detect(video).then(predictions => {
        console.log(predictions);
        this.renderPredictions(predictions);
        requestAnimationFrame(() => {
          if (this.live) {
            this.detectFrame(video, model);
          } else {
            return
          }
        });
      });
    },
    startRecognition() {
      this.live = true;
      console.log(this.language);
      let facing;
      if (this.frontCamera) {
        facing = "environment";
      } else {
        facing = "user";
      }
      this.statusMessage = "Camera on. Capturing video!";
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const webCamPromise = navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: {
              facingMode: facing
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
      this.live = false;
      this.statusMessage = "Camera off. Stopped capturing video!"
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
    console.log(this.language)
    this.videoRef = this.$refs.video;
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 959) {
        this.toggleDisabled = true;
      }
      if (this.windowWidth < 959) {
        this.toggleDisabled = false;
      }
    })
  },
}
</script>

<style lang="css" scoped>
#prediction-table {
  margin-top: 10px;
}
button {
  margin-bottom: 10px;
}
#webcam {
  margin-top: 20px;
}
#prediction-box {
  margin-top: 20px;
}
video {
  width: 100%;
  max-height: auto;
  background-color: black;
}
#prediction-box span{
  text-align: center;
}
#object, #score, #lang {
  color: #F29766;
  margin-left: 5px;
}
.md-content {
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
