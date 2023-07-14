<template>
  <div
    ref="seeker"
    class="ui small slider base-seeker"
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

<style lang="sass" scoped>
.base-seeker
  @extend .no-padding
  & > ::v-deep(.inner)
    @extend .cursor-pointer
    & > .track-fill
      @extend .background-base
    & > .track-progress
      @extend .background-grey
      transition: width 0.3s
    & > .thumb
      @extend .d-none, .no-shadow, .background-base
      width: 13px !important
      height: 13px !important
  &:not(.disabled)
    &:hover,
    &:active
      & > ::v-deep(.inner)
        & > .thumb
          @extend .d-block
  &:not(.vertical)
    &.small
      & > ::v-deep(.inner)
        & > .track,
        & > .track-fill
          height: 0.35em
    & > ::v-deep(.inner)
      & > .thumb
        top: 1px !important
  &.vertical
    &.small
      & > ::v-deep(.inner)
        & > .track,
        & > .track-fill
          width: 0.35em
    & > ::v-deep(.inner)
      & > .thumb
        left: 1px !important
  &.inverted
    & > ::v-deep(.inner)
      & > .track-progress
        @extend .background-grey-inverted
  &.with-thumb
    & > ::v-deep(.inner)
      & > .thumb
        @extend .d-block
</style>
