<template>
  <div class="autoplay-option">
    <h4 class="ui header main-header">
      {{ textFormatted }}
    </h4>

    <div
      class="ui toggle checkbox main-checkbox"
      ref="checkbox"
    >
      <input type="checkbox">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mainCheckboxOptions } from '#/data/plugins/semantic'
import { setCheckbox, checkCheckbox } from '#/actions/plugins/semantic'
import { setIsAutoplay as setIsQueueAutoplay } from '#/actions/queue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'AutoplayOption',
  computed: {
    ...mapState('queue', {
      isQueueAutoplay: 'isAutoplay'
    }),
    checkboxOptions () {
      return mainCheckboxOptions({
        onChecked: this.handleCheck,
        onUnchecked: this.handleUncheck
      })
    },
    textFormatted () {
      return localize('settings.queue.autoplay')
    }
  },
  mounted () {
    setCheckbox(
      this.$refs.checkbox,
      this.checkboxOptions
    )

    if (this.isQueueAutoplay) {
      checkCheckbox(this.$refs.checkbox)
    }
  },
  methods: {
    handleCheck () {
      setIsQueueAutoplay(true)
    },
    handleUncheck () {
      setIsQueueAutoplay(false)
    }
  }
}
</script>

<style lang="sass" scoped>
.autoplay-option
  @extend .d-flex, .align-items-center

.main-header
  @extend .flex-full
</style>
