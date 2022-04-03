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
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseStatistics from '*/components/BaseStatistics.vue'

export default {
  name: 'StatisticsSegment',
  components: {
    BaseSegmentContainer,
    BaseStatistics
  },
  props: {
    artistData: {
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
            'navigation.tracks'
          ),
          value: this.tracksCount
        }
      ]
    },
    albumsCount () {
      return this.artistData.albums_count
    },
    tracksCount () {
      return this.artistData.tracks_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
