<template>
  <BaseTracksSimpleList
    :tracks="tracks"
    :is-with-self-icons="false"
    is-with-image
    is-with-artist-name
    is-with-album-title
    is-with-source
    is-with-source-option
    is-with-clear-button
    @link-click="handleLinkClick"
    @clear-button-click="handleClearButtonClick"
  />
</template>

<script>
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'TracksSection',
  components: {
    BaseTracksSimpleList
  },
  inject: [
    'deleteCollectionItem'
  ],
  props: {
    tracks: Array
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
          collection: 'tracks',
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
