<template lang="html">
  <div class="md-layout md-alignment-center">
    <div id="choose-action" class="md-layout md-alignment-start">
      <md-button class="md-raised md-primary" v-on:click="$emit('start-camera'); showSnackbar = true">Start</md-button>
      <md-button class="md-raised md-accent" v-on:click="$emit('stop-camera'); showSnackbar = true">Stop</md-button>
      <md-switch :disabled="toggleDisabled" class="md-primary" v-model="frontCamera" id="camera-mode" >Front Camera</md-switch>
    </div>
    <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>{{statusMessage}}</span>
      <md-button class="md-primary" @click="showSnackbar = false">Close</md-button>
    </md-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    statusMessage: String
  },
  data() {
    return {
    frontCamera: false,
    toggleDisabled: false,
    showSnackbar: false,
    position: 'center',
    duration: 4000,
    isInfinity: false,
    }
  },
  mounted() {
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
</style>
