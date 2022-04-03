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
    tagData: {
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
        }
      ]
    },
    artistsCount () {
      return this.tagData.artists_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
