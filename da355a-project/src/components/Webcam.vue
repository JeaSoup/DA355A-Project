<template>
<div id="webcam">
  <CamControls v-on:start-camera="startRecognition()" v-on:stop-camera="stopRecognition()" v-bind:statusMessage="statusMessage"/>
  <div class="md-layout md-alignment-center">
    <video ref="video" src="" class="video" autoPlay playsInline muted poster=""></video>
  </div>
  <PredictionBox v-bind:predictionClass="predictionClass" />
  <PredictionTable id="prediction-table" v-bind:objects="objects" />
</div>
</template>

<script>
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import PredictionTable from './PredictionTable';
import CamControls from './CamControls';
import PredictionBox from './PredictionBox';
import {
  uuid
} from 'uuidv4';
export default {
  props: {
    language: String
  },
  components: {
    PredictionTable,
    PredictionBox,
    CamControls
  },
  data() {
    return {
      cocoSsd: null,
      videoRef: null,
      predictionClass: "N/A",
      predictionScore: "N/A",
      stream: null,
      facingMode: "enivronment",
      statusMessage: null,
      frontCamera: false,
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
          score: prediction.score.toFixed(2)
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
      this.statusMessage = "Camera on, capturing video!";
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
      this.statusMessage = "Camera off, stopped capturing video!"
      try {
        this.stream.getTracks().forEach(function(track) {
          track.stop();
        });
      } catch (err) {
        console.log("Not stream available")
      }
    },
    changeCamera() {
      console.log("hello")
      //this.frontCamera = payload;
    }
  },
  mounted() {
    this.videoRef = this.$refs.video;
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

#container {
  margin-bottom: 20px;
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
