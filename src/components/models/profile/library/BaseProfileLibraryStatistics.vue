<template>
  <BaseStatistics
    class="three small"
    :statistics="statistics"
  />
</template>

<script>
import BaseStatistics from '@/components/BaseStatistics.vue'

export default {
  name: 'BaseProfileLibraryStatistics',
  components: {
    BaseStatistics
  },
  props: {
    libraryData: {
      type: Object,
      required: true
    }
  },
  computed: {
    statistics () {
      return [
        {
          text: this.$t(
            'navigation.artists'
          ),
          value: this.artistsCount
        },
        {
          text: this.$t(
            'navigation.albums'
          ),
          value: this.albumsCount
        },
        {
          text: this.$t(
            'navigation.tracks'
          ),
          value: this.tracksCount
        }
      ]
    },
    artistsCount () {
      return this.libraryData.artists_count
    },
    albumsCount () {
      return this.libraryData.albums_count
    },
    tracksCount () {
      return this.libraryData.tracks_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
