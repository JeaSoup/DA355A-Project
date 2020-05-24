<template lang="html">

<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-row type="flex" justify="space-between">
    <el-col :span="6"><el-menu-item index="1">Home</el-menu-item></el-col>
    <el-col :span="6"><el-menu-item index="2">About the project</el-menu-item></el-col>
    <el-col :span="6"><el-menu-item index="3">About us</el-menu-item></el-col>
      </el-row>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="css" scoped>
* {
  text-align: center;
}
</style>
