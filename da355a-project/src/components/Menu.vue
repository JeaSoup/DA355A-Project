<template>
<div class="md-layout md-gutter md-alignment-center-space-between">
  <md-menu md-direction="bottom-start">
    <md-button md-menu-trigger>Home</md-button>
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
</style>
