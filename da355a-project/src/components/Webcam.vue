<template>
<div id="webcam">
  <div class="md-layout md-alignment-center">
    <div id="choose-action" class="md-layout">
      <div class="md-layout-item">
        <md-field id="select">
          <label for="language">Language</label>
          <md-select v-model="translationLanguage" id="language" name="language" v-on:input="setCountryCode">
            <md-option v-for="(language, idx) in populatedLanguages" v-bind:key="idx" v-bind:value="language.languageCode">{{language.name}} ({{language.languageCode}})</md-option>
          </md-select>
       </md-field>
      </div>
    </div>
  </div>
  <div class="md-layout md-alignment-center">
    <div id="choose-action" class="md-layout">
      <div class="md-layout-item ">
        <md-button class="md-raised md-primary" :disabled="!isLanguageChoosen" @click="startRecognition();">Start</md-button>
        <md-button class="md-raised md-accent" @click="stopRecognition();">Stop</md-button>
        <md-switch v-if="!isHidden" :disabled="toggleDisabled" class="md-primary" v-model="rearCamera" id="camera-mode">Rear Camera</md-switch>
      </div>
    </div>
    <md-content id="prediction-box">
      <span class="md-layout md-display-2 md-alignment-center" id="prediction"><span id="object">{{predictionMessage}}</span></span>
    </md-content>
  </div>
  <div class="md-layout md-alignment-center">
    <video ref="video" src="" class="video" autoPlay playsInline muted></video>
  </div>
  <PredictionTable id="prediction-table" v-bind:objects="objects" v-on:delete="deleteObject" v-on:save-objects="saveObjects" />
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
import axios from 'axios';
export default {
  props: ['languages'],
  components: {
    PredictionTable
  },
  data() {
    return {
      cocoSsd: false,
      videoRef: null,
      countryCode: null,
      translationLanguage: null,
      predictionMessage: "Choose a language to begin!",
      predictionScore: "N/A",
      stream: null,
      translation: null,
      showSnackbar: false,
      position: 'center',
      duration: 4000,
      isInfinity: false,
      statusMessage: "",
      facingMode: "user",
      rearCamera: false,
      toggleDisabled: false,
      windowWidth: null,
      objects: [],
      live: false,
      isHidden: false,
      isLanguageChoosen: false,
    }
  },
  methods: {
    /* Handles the prediction from the cocoSsd.
      Creating a new object for each unique prediction.
    */
    async handlePredictions(predictions) {
      for (let i = 0; i < predictions.length; i++) {
        let newObject = {
          id: uuid(),
          name: predictions[i].class,
          translation: "",
          score: Math.round((predictions[i].score + Number.EPSILON) * 100) / 100,
          language: this.translationLanguage,
          countryCode: this.countryCode
        }
        //Check if element does exist before pushing, AKA a unique object.
        if (!this.objects.find(o => o.name === newObject.name)) {
          //Fetching the translation.
          this.getTranslation(newObject.name, this.translationLanguage).then(data => {
            newObject.translation = data;
          })
          this.objects.push(newObject)
        }
        // Set displayed object name to toUpperCase.
        this.predictionMessage = predictions[i].class.toUpperCase();
      }
    },
    /* Detects what the model "sees" and returns the predictions.
      If the application is live this will continue if the stream has been
      ended by the user, recursion is stopped.
    */
    detectFrame(video, model) {
      model.detect(video).then(predictions => {
        this.handlePredictions(predictions);
        requestAnimationFrame(() => {
          if (this.live) {
            this.detectFrame(video, model);
          } else {
            return
          }
        });
      });
    },
    /* Start function, makes sure that the user allows camera acess and loads
      the object model.
    */
    async startRecognition() {
      this.toggleDisabled = true;

      //Display status message based on if the model has loaded.
      if (this.cocoSsd != true) {
        await this.statusMessages("Loading object model & setting up camera!");
      } else {
        this.statusMessages("Camera on. Capturing video!");
      }

      //Check camera direction.
      let facing;
      if (this.rearCamera) {
        facing = "environment";
      } else {
        facing = "user";
      }

      //Check if camera is available and capture stream if so.
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

        /*Loading predefined object model, sending video stream and model
          to detectFrame().
        */
        const modelPromise = cocoSsd.load();
        Promise.all([modelPromise, webCamPromise])
          .then(values => {
            this.live = true;
            this.cocoSsd = true;
            this.detectFrame(this.videoRef, values[0]);
          })
          .catch(error => {
            this.statusMessages("Camera access denied by user. Please retry!")
            console.error(error);
          });
      }
    },
    /*
    Stop the recognition, disabling the camera stream. Setting global live
      variabel to false.
    */
    stopRecognition() {
      this.live = false;
      this.toggleDisabled = false;
      try {
        this.statusMessages("Camera off. Stopped capturing video!")
        this.stream.getTracks().forEach(function(track) {
          track.stop();
        });
      } catch (err) {
        this.statusMessages("No video. Start to begin capturing video!")
        console.log("No stream available")
      }
    },
    deleteObject(selected) {
      //Filter and delete object based on id.
      selected.forEach((element) => {
        this.objects = this.objects.filter(obj => obj.id !== element.id);
        this.saveObjects(true);
      })
      this.statusMessages("Predictions deleted!")
    },
    saveObjects(isDelete) {
      if (!isDelete) {
        this.statusMessages("Predictions saved!")
      }
      localStorage.setItem('objects', JSON.stringify(this.objects));
    },
    //Help function for displaying status messages.
    async statusMessages(message, boolean = true) {
      this.statusMessage = message;
      this.showSnackbar = boolean;
    },

      //Retrieves country code for selected language from languages array, in order to be able to display flags
      setCountryCode(value) {
        let selectedCountry = this.populatedLanguages.find(o => o.languageCode === value );
        try {
            this.countryCode = selectedCountry.countryCode;
        } catch (e) {
          console.log("Fetching current location");
        }
        this.isLanguageChoosen = true;
    },
      //Axios.get to API to fetch translation.
      getTranslation(object, language) {
      let langpair = "en|" + language;
      let url = `https://api.mymemory.translated.net/get?q=${encodeURI(object)}&langpair=${langpair}`;
      return axios.get(url).then(response => {
        // returning the data here allows the caller to get it through another .then(...)
        return response.data.responseData.translatedText;
      })
    },
     //Function to show or hide the toggle swtich for mobile.
     displaySwitch(windowWidth) {
       if (windowWidth > 959) {
         this.isHidden = true;
       }
       if (windowWidth < 959) {
         this.isHidden = false;
       }
     }
  },
  mounted() {
    //Creates reference to the video tag.
    this.displaySwitch(window.innerWidth);
    this.videoRef = this.$refs.video;

    // Toggles option to switching camera based on screen width.
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      this.displaySwitch(this.windowWidth)
    })
    if (localStorage.getItem('objects')) this.objects = JSON.parse(localStorage.getItem('objects'));
    if (sessionStorage.getItem('language')) {
      this.translationLanguage = sessionStorage.getItem('language');
      this.isLanguageChoosen = true;
      this.predictionMessage = "Start to begin!";
    }
    if (sessionStorage.getItem('countryCode')) this.countryCode = sessionStorage.getItem('countryCode')
  },
  computed: {
    populatedLanguages: function () {
      return this.languages;
    }
  },
  watch: {
    translationLanguage: {
      handler() {
        sessionStorage.setItem('language', this.translationLanguage);
      }
    },
    countryCode: {
      handler() {
        sessionStorage.setItem('countryCode', this.countryCode);
      }
    },
    deep: true
  },
}
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Acme&display=swap');

#select {
  width: 182px;
}

#select label {
  color: white;
}

#prediction-table {
  margin-top: 10px;
}
button {
  margin-bottom: 10px;
  margin-left: -1px;
}
#prediction-box {
  margin-bottom: 10px;
}
video {
  width: 100%;
  max-height: auto;
  background-color: black;
}
#prediction-box span {
  text-align: center;
  font-family: 'Acme', sans-serif;
}
#object, #score {
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
