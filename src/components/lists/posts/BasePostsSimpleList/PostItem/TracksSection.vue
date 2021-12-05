<template>
  <BaseTracksSimpleList
    v-if="tracks"
    class="post-tracks"
    :tracks="tracksFormatted"
    isWithArtistName
  />
</template>

<script>
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'TracksSection',
  components: {
    BaseTracksSimpleList
  },
  props: {
    postData: {
      type: Object,
      required: true
    }
  },
  computed: {
    tracks () {
      return this.postData.tracks
    },
    tracksFormatted () {
      return formatCollection(
        this.tracks
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.post-tracks
  @extend .no-padding
  margin: 0.5em 0 !important
</style>
