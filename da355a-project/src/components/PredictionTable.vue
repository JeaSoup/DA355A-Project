<template>
<div>
  <md-table v-model="objects" md-card @md-selected="onSelect">
    <md-table-toolbar>
      <h1 class="md-title">Predictions</h1>
    </md-table-toolbar>

    <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
      <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

      <div class="md-toolbar-section-end">
        <md-button @click="deleteObject()" class="md-icon-button">
          <md-icon>delete</md-icon>
        </md-button>
      </div>
    </md-table-toolbar>

    <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
      <md-table-cell md-label="Object Name" md-sort-by="name">{{ item.name }}</md-table-cell>
      <md-table-cell md-label="Translation" md-sort-by="email">{{ item.translation }}</md-table-cell>
      <md-table-cell md-label="Language" md-sort-by="gender">{{ item.language }}</md-table-cell>
      <md-table-cell md-label="Prediction Score" md-sort-by="title">{{ item.score }}</md-table-cell>
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
    deleteObject() {
      //Filter and delete object based on id.
      this.selected.forEach((element) => {
        this.objects = this.objects.filter(obj => obj.id !== element.id);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.md-table + .md-table {
    margin-top: 16px;
}
</style>
