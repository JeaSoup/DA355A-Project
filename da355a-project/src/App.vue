<template>
<div id="app">
  <el-row type="flex" justify="center">
    <el-col :span="18">
      <Header />
    </el-col>
  </el-row>
  <el-row type="flex" justify="center">
    <el-col :span="18">
      <NavBar />
    </el-col>
  </el-row>
</div>
</template>

<script>
import NavBar from './components/NavBar';
import Header from './components/Layout/Header';

export default {
  name: 'App',
  components: {
    NavBar,
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
