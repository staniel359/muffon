<template>
  <BaseArtistsSimpleList
    :artists="artists"
    is-with-image
    is-with-delete-option
    is-clearable
    @link-click="handleLinkClick"
    @delete-option-click="handleDeleteOptionClick"
  />
</template>

<script>
import BaseArtistsSimpleList
  from '*/components/lists/artists/BaseArtistsSimpleList.vue'

export default {
  name: 'ArtistsSection',
  components: {
    BaseArtistsSimpleList
  },
  inject: [
    'deleteModel'
  ],
  props: {
    artists: Array
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
          scope: 'artists'
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
