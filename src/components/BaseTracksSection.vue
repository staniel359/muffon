<template>
  <BaseTracksSimpleList
    v-if="tracks"
    class="tracks"
    :tracks="tracksCollection"
    isWithArtistName
  />
</template>

<script>
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseTracksSection',
  components: {
    BaseTracksSimpleList
  },
  props: {
    tracks: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    tracksCollection () {
      return formatCollection(
        this.tracks
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.tracks
  @extend .no-padding, .no-margin
</style>
