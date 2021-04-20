<template>
  <div class="header-section">
    <div class="left-block"></div>

    <h4 class="ui header central-block">
      {{ headerFormatted }}
    </h4>

    <div class="right-block">
      <OptionsButton @click="handleOptionsButtonClick" />
    </div>
  </div>
</template>

<script>
import OptionsButton from './HeaderSection/OptionsButton.vue'
import { pluralize } from '#/actions/plugins/i18n'
import { number as formatNumber } from '#/formatters'
import { getTracksCount as getQueueTracksCount } from '#/actions/queue'

export default {
  name: 'HeaderSection',
  components: {
    OptionsButton
  },
  emits: [
    'optionsButtonClick'
  ],
  computed: {
    headerFormatted () {
      return pluralize(
        'shared.tracks',
        this.queueTracksCount,
        { number: this.queueTracksCountFormatted }
      )
    },
    queueTracksCount () {
      return getQueueTracksCount()
    },
    queueTracksCountFormatted () {
      return formatNumber(
        this.queueTracksCount
      )
    }
  },
  methods: {
    handleOptionsButtonClick () {
      this.$emit('optionsButtonClick')
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
