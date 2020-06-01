<template>
<div class="md-layout md-alignment-center">
  <span id="logo" class="md-display-4">Depicter</span>
</div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Acme&display=swap');

div {
  padding: 20px;
  border-bottom: 2px solid white;
  ;
}

@media only screen and (max-width: 600px) {
  .md-display-4>>> {
    font-size:  90px;
  }
}

.md-display-4>>> {
  color: white !important;
  font-family: 'Acme', sans-serif;
}
</style>
