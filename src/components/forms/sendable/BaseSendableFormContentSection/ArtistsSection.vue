<template>
  <BaseArtistsSimpleList
    :artists="artists"
    is-with-image
    is-with-clear-button
    @link-click="handleLinkClick"
    @clear-button-click="handleClearButtonClick"
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
    handleClearButtonClick (
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
