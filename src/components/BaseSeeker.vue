<template>
  <div
    class="ui small slider main-seeker"
    ref="seeker"
    :class="{ disabled: isDisabled }"
    @mousedown.capture="handleMouseDown"
  ></div>
</template>

<script>
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
    'move',
    'change'
  ],
  computed: {
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

    this.$emit('init', this.$refs.seeker)
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

<style lang="sass" scoped>
.main-seeker
  @extend .no-padding
  ::v-deep(.inner)
    @extend .cursor-pointer
  ::v-deep(.track-fill)
    background: $colorBase !important
  ::v-deep(.thumb)
    @extend .d-none, .no-shadow
    background: $colorBase !important
    width: 12px !important
    height: 12px !important
  &:hover, &:active
    ::v-deep(.thumb)
      @extend .d-block
  &:not(.vertical)
    ::v-deep(.thumb)
      top: 1.5px !important
  &.vertical
    ::v-deep(.thumb)
      left: 1.5px !important
</style>
