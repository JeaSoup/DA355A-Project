<template>
<div id="app">
  <Header />
  <Menu />
  <Container />

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
