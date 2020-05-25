<template>
<div id="app">
  <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-size-15"> </div>
    <div class="md-layout-item">
      <Header />
    </div>
    <div class="md-layout-item md-size-15"></div>
  </div>
  <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item"> </div>
    <div class="md-layout-item">
      <Menu />
    </div>
    <div class="md-layout-item"></div>
  </div>
  <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-size-15"> </div>
    <div class="md-layout-item">
      <Webcam v-bind:language="language" />
    </div>
    <div class="md-layout-item md-size-15"></div>
  </div>
</div>
</template>

<script>
import Menu from './components/Menu';
import Header from './components/Layout/Header';
import Webcam from './components/Webcam';
export default {
  name: 'App',
  components: {
    Header,
    Menu,
    Webcam
  },
  props: {

  },
  data() {
    return {
      language: null,
    }
  },
  methods: {
    identifyLanguage() {
      console.log("Identification started")
      this.$getLocation()
        .then(coordinates => {
          let url = `https://secure.geonames.org/countryCode?lat=${coordinates.lat}&lng=${coordinates.lng}&username=christina3107&type=JSON`
          this.$http.get(url)
            .then((result) => {
              this.language = result.data.languages.substring(0, result.data.languages.indexOf(","))
            })
        })
        .catch(err => {
          console.log(err)
        });

    }
  },
  mounted() {
    this.identifyLanguage()
  }
}
</script>


<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";
</style>
