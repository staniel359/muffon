<template>
  <div class="header-section">
    <div class="left-block"></div>

    <h4 class="ui header central-block">
      {{ headerFormatted }}
    </h4>

    <div class="right-block"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { pluralize } from '#/actions/plugins/i18n'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'HeaderSection',
  computed: {
    ...mapGetters('queue', {
      queueTracksCount: 'tracksCount'
    }),
    headerFormatted () {
      return pluralize(
        'shared.tracks',
        this.queueTracksCount,
        { number: this.queueTracksCountFormatted }
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
  padding: 1em

.left-block
  flex: 0.25

.central-block
  @extend .no-margin, .text-align-center
  flex: 0.5

.right-block
  @extend .text-align-right
  flex: 0.25
</style>
