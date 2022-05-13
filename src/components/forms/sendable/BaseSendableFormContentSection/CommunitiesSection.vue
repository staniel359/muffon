<template>
  <BaseCommunitiesSimpleList
    :communities="communities"
    is-with-delete-option
    is-clearable
    @link-click="handleLinkClick"
    @delete-option-click="handleDeleteOptionClick"
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
    'deleteModel'
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
    handleDeleteOptionClick (
      {
        uuid
      }
    ) {
      this.deleteModel(
        {
          uuid,
          scope: 'communities'
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
