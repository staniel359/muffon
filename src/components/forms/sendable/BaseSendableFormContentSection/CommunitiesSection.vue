<template>
  <BaseCommunitiesSimpleList
    :communities="communities"
    is-with-clear-button
    @link-click="handleLinkClick"
    @clear-button-click="handleClearButtonClick"
  />
</template>

<script>
import BaseCommunitiesSimpleList
  from '*/components/lists/communities/BaseCommunitiesSimpleList.vue'

export default {
  name: 'CommunitiesSection',
  components: {
    BaseCommunitiesSimpleList
  },
  inject: [
    'deleteCollectionItem'
  ],
  props: {
    communities: Array
  },
  emits: [
    'linkClick'
  ],
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleClearButtonClick (
      {
        uuid
      }
    ) {
      this.deleteCollectionItem(
        {
          collection: 'communities',
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
