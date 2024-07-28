<template>
  <BaseSegmentContainer>
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
    albumData: {
      type: Object,
      required: true
    }
  },
  computed: {
    statistics () {
      return [
        {
          text: this.$t(
            'navigation.tracks'
          ),
          value: this.tracksCount
        },
        {
          text: this.$t(
            'navigation.playlists'
          ),
          value: this.playlistsCount
        }
      ]
    },
    tracksCount () {
      return this.albumData.tracks_count
    },
    playlistsCount () {
      return this.albumData.playlists_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
