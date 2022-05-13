<template>
  <BaseTracksSimpleList
    :tracks="tracks"
    is-with-image
    is-with-artist-name
    is-with-album-title
    is-with-delete-option
    is-clearable
    @link-click="handleLinkClick"
    @delete-option-click="handleDeleteOptionClick"
  />
</template>

<script>
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'TracksSection',
  components: {
    BaseTracksSimpleList
  },
  inject: [
    'deleteModel'
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
    handleDeleteOptionClick (
      {
        uuid
      }
    ) {
      this.deleteModel(
        {
          uuid,
          scope: 'tracks'
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
