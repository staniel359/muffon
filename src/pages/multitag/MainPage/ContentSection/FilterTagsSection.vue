<template>
  <div class="main-bottom-section">
    <div class="ui labels">
      <BaseFilterItemLabel
        v-for="tagData in tags"
        :key="tagData.uuid"
        :filter-item-data="tagData"
        @clear-icon-click="handleTagClearIconClick"
      />
    </div>
  </div>
</template>

<script>
import BaseFilterItemLabel from '@/components/labels/BaseFilterItemLabel.vue'

export default {
  name: 'FilterTagsSection',
  components: {
    BaseFilterItemLabel
  },
  inject: [
    'deleteCollectionItem'
  ],
  props: {
    tags: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleTagClearIconClick (
      {
        uuid
      }
    ) {
      this.deleteCollectionItem(
        {
          collection: 'tags',
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
