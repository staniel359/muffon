<template>
  <BaseSegmentContainer class="header-section">
    <div class="left-block"></div>

    <h4 class="ui header main-header central-block">
      {{ tracksText }}
    </h4>

    <div class="right-block"></div>
  </BaseSegmentContainer>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'HeaderSection',
  components: {
    BaseSegmentContainer
  },
  computed: {
    ...mapGetters('queue', {
      queueTracksCount: 'tracksCount'
    }),
    tracksText () {
      return this.$t(
        'shared.tracks',
        { count: this.queueTracksCountFormatted }
      )
    },
    queueTracksCountFormatted () {
      return formatNumber(
        this.queueTracksCount
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.header-section
  @extend .d-flex, .align-items-center
  padding: calc(#{$navbarHeight} + 1em) 1em 1em 1em

.left-block
  @extend .d-flex, .align-items-center
  flex: 0.25

.central-block
  @extend .d-flex, .align-items-center, .justify-content-center
  flex: 0.5

.right-block
  @extend .d-flex, .align-items-center, .justify-content-flex-end
  flex: 0.25
</style>
