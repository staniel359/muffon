<template>
  <div class="collection-list">
    <div class="ui labels">
      <CollectionItem
        v-for="collectionItemData in collection"
        :key="collectionItemData.uuid"
        :collection-item-data="collectionItemData"
      />
    </div>
  </div>
</template>

<script>
import CollectionItem from './CollectionList/CollectionItem.vue'

export default {
  name: 'CollectionList',
  components: {
    CollectionItem
  },
  props: {
    collection: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.collection-list
  margin-top: 1em
</style>
