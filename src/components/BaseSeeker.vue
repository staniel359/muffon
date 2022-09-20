<template>
  <div
    ref="seeker"
    class="ui small slider main-seeker"
    :class="{
      disabled: isDisabled,
      inverted: isDarkMode
    }"
    @mousedown.capture="handleMouseDown"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  setSeeker
} from '@/helpers/actions/plugins/semantic'

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
  data () {
    return {
      isMouseUp: true
    }
  },
  computed: {
    ...mapState(
      'layout',
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
    this.setSeekerData()

    this.$emit(
      'init',
      this.$refs.seeker
    )
  },
  methods: {
    async handleIsDisabledChange (
      value
    ) {
      if (!value) {
        await this.$nextTick()

        this.setSeekerData()
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
