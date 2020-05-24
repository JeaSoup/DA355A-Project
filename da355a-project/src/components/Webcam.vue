<template>
<div>
  <div class="md-layout md-alignment-center">
    <canvas id="canvas-video" />
    <h1>Här kommer canvas</h1>
  </div>
  <span class="md-layout md-headline md-alignment-center">Options:</span>
  <div id="choose-action" class="md-layout md-alignment-center">
    <md-button class="md-raised md-primary">Start</md-button>
    <md-button class="md-raised md-accent">Stop</md-button>
  </div>
</div>
</template>

<script>
//import $ from 'jquery';
export default {
  methods: {
    
  }
}
</script>

<style lang="css" scoped>

#choose-action .md-primary {
  margin-right: 15px;
}

#choose-action .md-accent {
  margin-left: 15px;
}

</style>
