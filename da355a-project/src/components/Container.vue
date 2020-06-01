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
    languages: Array
  }
}
</script>

<style lang="css" scoped>
</style>
