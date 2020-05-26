<template lang="html">
  <md-content id="prediction-box">
    <span class="md-layout md-display-3 md-alignment-center" id="prediction"><span id="object">{{predictionClass}}</span></span>
  </md-content>
</template>

<script>
export default {
  props: {
    predictionClass: String
  },
}
</script>

<style lang="css" scoped>
#object {
  color: #F29766;
  margin-left: 5px;
}
</style>
