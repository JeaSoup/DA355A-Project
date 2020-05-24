<template>
  <div id="app">
    <el-row type="flex" justify="center">
    <el-col :span="18"><NavBar/></el-col>
    </el-row>
  </div>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>

<style>
#app {

}
</style>
