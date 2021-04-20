<template>
  <div class="options-section">
    <div
      class="ui toggle checkbox main-checkbox"
      ref="checkbox"
    >
      <input type="checkbox">
      <label>
        {{ labelFormatted }}
      </label>
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
  name: 'OptionsSection',
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
    labelFormatted () {
      return localize('layout.queue.autoplay')
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
.options-section
  padding: 1em
</style>
