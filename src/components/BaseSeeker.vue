<template>
  <div
    class="ui small slider main-seeker"
    ref="seeker"
    :class="{
      disabled: isDisabled,
      inverted: isDarkMode
    }"
    @mousedown.capture="handleMouseDown"
    @mouseup.capture="handleMouseUp"
  ></div>
</template>

<script>
import { mapState } from 'vuex'
import { setSeeker } from '#/actions/plugins/semantic'

export default {
  name: 'BaseSeeker',
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    isDisabled: Boolean
  },
  emits: [
    'init',
    'mouseDown',
    'mouseUp',
    'move',
    'change'
  ],
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    seekerOptions () {
      return {
        ...this.options,
        onChange: this.handleChange,
        onMove: this.handleMove
      }
    }
  },
  watch: {
    isDisabled: 'handleIsDisabledChange'
  },
  mounted () {
    this.setSeekerData()

    this.$emit(
      'init',
      this.$refs.seeker
    )
  },
  methods: {
    handleIsDisabledChange (value) {
      !value && this.$nextTick(() => {
        this.setSeekerData()
      })
    },
    handleMouseDown () {
      this.$emit('mouseDown')
    },
    handleMouseUp () {
      this.$emit('mouseUp')
    },
    handleMove (value) {
      this.$emit('move', value)
    },
    handleChange (value) {
      this.$emit('change', value)
    },
    setSeekerData () {
      setSeeker(
        this.$refs.seeker,
        this.seekerOptions
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
