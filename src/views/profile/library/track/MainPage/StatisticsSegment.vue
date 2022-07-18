<template>
  <BaseSegmentContainer
    class="raised main-segment-container"
  >
    <BaseStatistics
      class="one small"
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
            'navigation.playlists'
          ),
          value: this.playlistsCount
        }
      ]
    },
    playlistsCount () {
      return this.trackData.playlists_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
