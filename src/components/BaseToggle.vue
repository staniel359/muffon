<template>
  <div
    class="ui toggle checkbox main-toggle-checkbox"
    :class="{ inverted: isDarkMode }"
    ref="checkbox"
  >
    <input type="checkbox">
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mainCheckboxOptions } from '#/data/plugins/semantic'
import { setCheckbox, checkCheckbox } from '#/actions/plugins/semantic'

export default {
  name: 'BaseToggle',
  props: {
    isChecked: Boolean
  },
  emits: [
    'on',
    'off'
  ],
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    checkboxOptions () {
      return mainCheckboxOptions({
        onChecked: this.handleOn,
        onUnchecked: this.handleOff
      })
    }
  },
  watch: {
    isChecked: {
      immediate: true,
      handler: 'handleIsChecked'
    }
  },
  mounted () {
    setCheckbox(
      this.$refs.checkbox,
      this.checkboxOptions
    )
  },
  methods: {
    handleIsChecked (value) {
      this.$nextTick(() => {
        checkCheckbox(
          this.$refs.checkbox,
          value
        )
      })
    },
    handleOn () {
      this.$emit('on')
    },
    handleOff () {
      this.$emit('off')
    }
  }
}
</script>

<style lang="sass" scoped></style>
