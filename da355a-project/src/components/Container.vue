<template lang="html">
  <Webcam v-bind:translationLanguage="language"/>
</template>

<script>
import Webcam from './Webcam';
export default {
  components: {
    Webcam,
  },
  props: {
    language: String
  }
}
</script>

<style lang="css" scoped>
</style>
