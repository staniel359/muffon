<template>
  <BaseTracksSimpleList
    class="tracks-list"
    :tracks="tracks"
    isWithArtistName
    isWithDeleteOption
    isClearable
    @deleteButtonClick="handleDeleteButtonClick"
  />
</template>

<script>
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'

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
    handleDeleteButtonClick ({ uuid }) {
      const isMatchedTrack = trackData => {
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
