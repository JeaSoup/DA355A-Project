<template>
<div id="app">
      <Header />
</div>
</template>

<script>
import Header from './components/Layout/Header';

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
#app {
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap');
  font-family: 'Oswald', sans-serif;
}
</style>
