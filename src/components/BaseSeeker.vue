<template>
  <div
    ref="seeker"
    class="ui small slider base-seeker no-padding"
    :class="{
      disabled: isDisabled,
      inverted: isDarkMode
    }"
    @mousedown.capture="handleMouseDown"
    @wheel="handleMouseWheelScroll"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'

import {
  set as setSeeker,
  setValue as setSeekerValue,
  getValue as getSeekerValue
} from '@/helpers/actions/plugins/semantic/seeker'
import {
  sumFloats,
  subtractFloats
} from '@/helpers/utils'

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
    'change',
    'mouseWheelScrollUp',
    'mouseWheelScrollDown',
    'mouseWheelStop'
  ],
  data () {
    return {
      isMouseUp: true,
      wheelScrollTimer: null,
      wheelScrollTimeout: 1000
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
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
    isMouseUp: 'handleIsMouseUpChange'
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
    handleMouseWheelScroll (
      event
    ) {
      event.preventDefault()

      clearTimeout(
        this.wheelScrollTimer
      )

      this.isMouseUp = false

      const isScrollingUp = event.deltaY < 0

      const isScrollingDown = event.deltaY > 0

      if (isScrollingUp) {
        this.$emit(
          'mouseWheelScrollUp',
          event
        )
      } else if (isScrollingDown) {
        this.$emit(
          'mouseWheelScrollDown',
          event
        )
      }

      this.wheelScrollTimer =
        setTimeout(
          () => {
            this.handleMouseWheelStop()
          },
          this.wheelScrollTimeout
        )
    },
    handleMouseWheelStop () {
      this.$emit(
        'mouseWheelStop',
        this.getValue()
      )
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
    },
    increaseValue (
      value
    ) {
      const currentValue = this.getValue()

      if (currentValue >= 100) { return }

      const newValue =
        sumFloats(
          currentValue,
          value
        )

      this.setValue(
        newValue
      )
    },
    getValue () {
      return getSeekerValue(
        this.$refs.seeker
      )
    },
    decreaseValue (
      value
    ) {
      const currentValue = this.getValue()

      if (currentValue <= 0) { return }

      const newValue =
        subtractFloats(
          currentValue,
          value
        )

      this.setValue(
        newValue
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
