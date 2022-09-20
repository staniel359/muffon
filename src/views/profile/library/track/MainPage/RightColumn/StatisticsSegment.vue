<template>
  <BaseSegmentContainer
    class="raised main-segment-container"
  >
    <BaseStatistics
      class="two small"
      :statistics="statistics"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseStatistics from '@/components/BaseStatistics.vue'

export default {
  name: 'StatisticsSegment',
  components: {
    BaseSegmentContainer,
    BaseStatistics
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    statistics () {
      return [
        {
          text: this.$t(
            'navigation.albums'
          ),
          value: this.albumsCount
        },
        {
          text: this.$t(
            'navigation.playlists'
          ),
          value: this.playlistsCount
        }
      ]
    },
    albumsCount () {
      return this.trackData.albums_count
    },
    playlistsCount () {
      return this.trackData.playlists_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
