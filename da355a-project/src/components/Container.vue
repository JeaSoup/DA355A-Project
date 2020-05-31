<template lang="html">
  <Webcam v-bind:languages="languages"/>
</template>

<script>
import Webcam from './Webcam';
export default {
  components: {
    Webcam,
  },
  props: {
    language: String,
    //countryCode: String,
    languages: Array
  }
}
</script>

<style lang="css" scoped>
</style>
