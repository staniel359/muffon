<template>
  <div
    ref="seeker"
    class="ui small slider base-seeker no-padding"
    :class="{
      disabled: isDisabled,
      inverted: isDarkMode,
      reversed: isRtl
    }"
    @mousedown.capture="handleMouseDown"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  set as setSeeker,
  setValue as setSeekerValue
} from '@/helpers/actions/plugins/semantic/seeker'

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
    'mouseDown',
    'mouseUp',
    'move',
    'change'
  ],
  data () {
    return {
      isMouseUp: true
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode',
        'isRtl'
      ]
    ),
    seekerOptions () {
      return {
        ...this.options,
        onChange: this.handleChange,
        onMove: this.handleMove
      }
    }
  },
  watch: {
    isDisabled: 'handleIsDisabledChange',
    isMouseUp: 'handleIsMouseUpChange',
    isRtl: 'handleIsRtlChange'
  },
  mounted () {
    this.initialize()
  },
  methods: {
    async handleIsDisabledChange (
      value
    ) {
      if (!value) {
        await this.$nextTick()

        this.initialize()
      }
    },
    async handleIsRtlChange () {
      await this.$nextTick()

      this.initialize()
    },
    handleMouseDown () {
      this.isMouseUp = false

      this.$emit(
        'mouseDown'
      )
    },
    handleMouseUp () {
      this.isMouseUp = true
    },
    handleMove (
      _,
      value
    ) {
      this.$emit(
        'move',
        value
      )
    },
    handleChange (
      value
    ) {
      this.$emit(
        'change',
        value
      )

      if (this.isMouseUp) {
        this.$emit(
          'mouseUp',
          value
        )
      }
    },
    handleIsMouseUpChange (
      value
    ) {
      if (value) {
        document.removeEventListener(
          'mouseup',
          this.handleMouseUp
        )
      } else {
        document.addEventListener(
          'mouseup',
          this.handleMouseUp
        )
      }
    },
    initialize () {
      setSeeker(
        this.$refs.seeker,
        this.seekerOptions
      )
    },
    setValue (
      value
    ) {
      setSeekerValue(
        this.$refs.seeker,
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
