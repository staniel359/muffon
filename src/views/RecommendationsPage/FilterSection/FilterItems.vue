<template>
  <div class="filter-items-container">
    <div class="ui labels">
      <FilterItem
        v-for="filterItemData in filterItems"
        :key="filterItemData.uuid"
        :filter-item-data="filterItemData"
        @delete-icon-click="handleDeleteIconClick"
      />
    </div>
  </div>
</template>

<script>
import FilterItem from './FilterItems/FilterItem.vue'

export default {
  name: 'FilterItems',
  components: {
    FilterItem
  },
  props: {
    filterItems: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'change'
  ],
  methods: {
    handleDeleteIconClick (
      {
        uuid
      }
    ) {
      function isMatchedItem (
        itemData
      ) {
        return itemData.uuid !== uuid
      }

      const filterItems = [
        ...this.filterItems.filter(
          isMatchedItem
        )
      ]

      this.$emit(
        'change',
        filterItems
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.filter-items-container
  margin-top: 1em
</style>
