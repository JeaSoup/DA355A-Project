<template>
<div id="app">
  <div class="md-layout">
  <div class="md-layout-item"> </div>
      <div class="md-layout-item">
        <Menu />
      </div>
      <div class="md-layout-item"></div>
  </div>
</div>
</template>

<script>
import Menu from './components/Menu';
export default {
  name: 'App',
  components: {
    Menu
  }
}
</script>


<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";
</style>
