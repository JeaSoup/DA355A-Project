<template lang="html">
<div id="page-header">
  <el-page-header @back="goBack" :title="title" :content="content">
  </el-page-header>
</div>
</template>

<script>
export default {
  data() {
    return {
      title: "Back",
      content: "DA355A Project"
    }
  },
  methods: {
    goBack() {
      console.log('go back');
    }
  }
}
</script>

<style lang="css" scoped>
#page-header {
  background-color: #545c64;
  color: #fff;
  border-bottom: 2px solid #ffd04b;
}

#page-header >>> div.el-page-header__content {
  color: #fff;
  font-size: 24px;
}

</style>
