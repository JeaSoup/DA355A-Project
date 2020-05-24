<template>
<div id="app">
  <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-size-15"> </div>
    <div class="md-layout-item">
      <Header />
    </div>
    <div class="md-layout-item md-size-15"></div>
  </div>
  <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item"> </div>
    <div class="md-layout-item">
      <Menu />
    </div>
    <div class="md-layout-item"></div>
  </div>
  <div class="md-layout md-gutter md-alignment-center">
    <div class="md-layout-item md-size-15"> </div>
    <div class="md-layout-item">
      <Webcam />
    </div>
    <div class="md-layout-item md-size-15"></div>
  </div>
</div>
</template>

<script>
import Menu from './components/Menu';
import Header from './components/Layout/Header';
import Webcam from './components/Webcam';
export default {
  name: 'App',
  components: {
    Header,
    Menu,
    Webcam
  }
}
</script>


<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";
</style>
