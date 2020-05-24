<template>
<div class="md-layout md-gutter md-alignment-center-space-between">
  <md-menu md-direction="bottom-start">
    <md-button class="md-icon-button">
         <md-icon>home</md-icon>
       </md-button>
  </md-menu>

  <md-menu md-direction="bottom-end">
    <md-button md-menu-trigger>About us</md-button>
  </md-menu>

  <md-menu md-direction="top-start">
    <md-button md-menu-trigger>About the Project</md-button>
  </md-menu>

</div>
</template>

<script>
export default {
  name: 'Directions'
}
</script>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";
@import url("https://fonts.googleapis.com/css?family=Material+Icons");

.md-layout {
  padding: 5px;
}
</style>
