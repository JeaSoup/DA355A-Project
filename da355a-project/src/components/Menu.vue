<template>
<div class="md-layout md-gutter md-alignment-center-space-around" id="menu">
  <md-menu md-direction="bottom-start" >
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

#menu {
  box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 100px 80px rgba(0, 0, 0, 0.12)
;



  min-height: 50px;
  width: 70vw;
  margin: 25px auto;
  border-radius: 5px;
}
</style>
