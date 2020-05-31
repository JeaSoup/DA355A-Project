<template>
<div>
  <md-table v-model="objects" md-card @md-selected="onSelect">
    <md-table-toolbar>
      <h1 class="md-title">Predictions</h1>
    </md-table-toolbar>

    <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
      <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button" @click="save()" ><md-icon >save</md-icon></md-button>
        <md-button class="md-icon-button" @click="deletion()" >  <md-icon >delete</md-icon></md-button>
      </div>
    </md-table-toolbar>

    <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
      <md-table-cell id="name" md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
      <md-table-cell id="translation" md-label="translation" md-sort-by="translation">{{ item.translation }} <flag id="flag" :iso="item.countryCode" /></md-table-cell>
      <md-table-cell md-label="Score" md-sort-by="score">{{ item.score }}</md-table-cell>
    </md-table-row>
  </md-table>
</div>
</template>

<script>
export default {
  props: {
    objects: Array
  },
  data: () => ({
    selected: [],
  }),
  methods: {
    onSelect(items) {
      this.selected = items
    },
    getAlternateLabel(count) {
      let plural = ''

      if (count > 1) {
        plural = 's'
      }

      return `${count} oject${plural} selected`
    },
    deletion() {
      this.$emit("delete", this.selected);
    },
    save() {
      this.$emit('save-objects');
    },

  }
}
</script>

<style lang="css" scoped>
.md-table + .md-table {
    margin-top: 16px;
}

#flag {
  margin-right: 10px;
}
@media only screen and (max-width: 600px) {
  #flag {
    margin-right: auto;
  }

  #name>>> div{
    padding-right: 0;
  }

  #translation>>> div{
    padding-right: 0;
  }
}
</style>
