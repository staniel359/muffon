<template>
  <BaseTracksSimpleList
    class="tracks-list"
    :tracks="tracks"
    is-with-image
    is-with-artist-name
    is-with-album-title
    is-with-delete-option
    is-clearable
    @delete-button-click="handleDeleteButtonClick"
  />
</template>

<script>
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'BaseFormTracksSection',
  components: {
    BaseTracksSimpleList
  },
  props: {
    tracks: Array
  },
  emits: [
    'tracksChange'
  ],
  methods: {
    handleDeleteButtonClick (
      {
        uuid
      }
    ) {
      function isMatchedTrack (
        trackData
      ) {
        return trackData.uuid !== uuid
      }

      const tracks =
        this.tracks.filter(
          isMatchedTrack
        )

      this.$emit(
        'tracksChange',
        tracks
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.tracks-list
  @extend .no-margin
</style>
