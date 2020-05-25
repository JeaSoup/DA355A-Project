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
      <Webcam />
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
  methods: {
    identifyLanguage() {
      console.log("Identification started")
      this.$getLocation()
        .then(coordinates => {
        console.log(coordinates);
        let url = `https://secure.geonames.org/countryCode?lat=${coordinates.lat}&lng=${coordinates.lng}&username=christina3107&type=JSON`
        this.$http.get(url)
          .then((result) => {
            let language = result.data.languages.substring( 0, result.data.languages.indexOf(","))
            console.log(language)
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
