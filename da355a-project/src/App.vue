<template>
<div id="app">
  <Header />
  <Menu />
  <Container v-bind:languages="languages"/>
</div>
</template>

<script>
import Menu from './components/Menu';
import Header from './components/Layout/Header';
import Container from './components/Container';
export default {
  name: 'App',
  components: {
    Header,
    Menu,
    Container
  },
  props: {

  },
  data() {
    return {
      languages: [
                    {name: "German", countryCode: "de", languageCode: "de"},
                    {name: "Italian", countryCode: "it", languageCode: "it"},
                    {name: "Russian", countryCode: "ru", languageCode: "ru"},
                    {name: "French", countryCode: "fr", languageCode: "fr"},
                    {name: "Turkish", countryCode: "tr", languageCode: "tr"},
                    {name: "Spanish", countryCode: "es", languageCode: "es"},
                    {name: "Ukrainian", countryCode: "ua", languageCode: "uk"},
                    {name: "Polish", countryCode: "pl", languageCode: "pl"},
                    {name: "Dutch", countryCode: "nl", languageCode: "nl"},
                    {name: "Romanian", countryCode: "ro", languageCode: "ro"},
                  ],
    }
  },
  methods: {
    identifyLanguage() {
      //console.log("Identification started")
      this.$getLocation()
        .then(coordinates => {
          let url = `https://secure.geonames.org/countryCode?lat=${coordinates.lat}&lng=${coordinates.lng}&username=christina3107&type=JSON`
          this.$http.get(url)
            .then((result) => {
              //console.log(result.data)
              //this.language = result.data.languages.substring(0, result.data.languages.indexOf(","));
              //this.countryCode = result.data.countryCode
              //this.language = this.language.slice(0, this.language.indexOf("-"));
              let language = result.data.languages.substring(0, result.data.languages.indexOf(","));
              let languageCode = language.slice(0, language.indexOf("-"));
              let countryCode = result.data.countryCode
              let currentLanguage = {name: "Current location", countryCode: countryCode, languageCode: languageCode}
              //console.log(currentLanguage)
              this.languages.splice(0, 0, currentLanguage)
            })
        })
        .catch(err => {
          console.log(err)
        });
    },

  },
  mounted() {
    this.identifyLanguage()
  }
}
</script>


<style lang="css" scoped>
#app {
  margin:10px;
  padding:5px;
}

@media only screen and (min-width: 1200px) {
  #app {
    margin-left:250px;
    margin-right:250px;
    margin-bottom: 150px;
  }
}
</style>
