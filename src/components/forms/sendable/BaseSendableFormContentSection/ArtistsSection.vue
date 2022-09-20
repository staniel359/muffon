<template>
  <BaseArtistsSimpleList
    :artists="artists"
    :is-paginated="false"
    is-with-image
    is-with-clear-button
    @link-click="handleLinkClick"
    @clear-button-click="handleClearButtonClick"
  />
</template>

<script>
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'

export default {
  name: 'ArtistsSection',
  components: {
    BaseArtistsSimpleList
  },
  inject: [
    'deleteCollectionItem'
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
      this.deleteCollectionItem(
        {
          collection: 'artists',
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
