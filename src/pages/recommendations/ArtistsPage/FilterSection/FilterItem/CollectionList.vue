<template>
  <div class="main-bottom-section">
    <div class="ui labels">
      <BaseFilterItemLabel
        v-for="collectionItemData in collection"
        :key="collectionItemData.uuid"
        :filter-item-data="collectionItemData"
        @delete-icon-click="handleDeleteIconClick"
      />
    </div>
  </div>
</template>

<script>
import BaseFilterItemLabel from '@/components/labels/BaseFilterItemLabel.vue'

export default {
  name: 'CollectionList',
  components: {
    BaseFilterItemLabel
  },
  inject: [
    'deleteCollectionItem'
  ],
  props: {
    collection: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleDeleteIconClick (
      {
        uuid
      }
    ) {
      this.deleteCollectionItem(
        {
          collection: 'collection',
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
