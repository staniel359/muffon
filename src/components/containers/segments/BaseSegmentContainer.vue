<template>
  <div
    ref="segment"
    class="ui segment main-segment"
    :class="{
      loading: isLoading,
      inverted: isInverted || isDarkMode
    }"
    :style="isChangeTransparency && {
      background: backgroundStyle
    }"
  >
    <BaseErrorMessage
      v-if="isError"
      :error="error"
      is-with-refresh-button
      @refresh="handleRefresh"
    />
    <slot
      v-else
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import {
  focusOnSegment
} from '@/helpers/actions/layout'

export default {
  name: 'BaseSegmentContainer',
  components: {
    BaseErrorMessage
  },
  props: {
    isChangeTransparency: {
      type: Boolean,
      default: true
    },
    responseData: Object,
    isLoading: Boolean,
    error: Error,
    isInverted: Boolean
  },
  emits: [
    'init',
    'refresh'
  ],
  data () {
    return {
      colorCodes: {
        light: '255 255 255',
        dark: '32 33 34'
      }
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode',
        'transparency'
      ]
    ),
    isError () {
      return !!(
        !this.responseData &&
          this.error
      )
    },
    backgroundStyle () {
      return `rgb(${this.colorCode} / ${this.opacity}%) !important`
    },
    colorCode () {
      return this.colorCodes[
        this.color
      ]
    },
    color () {
      if (this.isDarkMode) {
        return 'dark'
      } else {
        return 'light'
      }
    },
    opacity () {
      return (
        100 - this.transparency
      )
    }
  },
  mounted () {
    this.$emit(
      'init',
      this.$refs.segment
    )
  },
  methods: {
    handleRefresh () {
      this.$emit(
        'refresh'
      )
    },
    focus () {
      focusOnSegment(
        this.$refs.segment
      )
    },
    scrollToTop () {
      this.$refs
        .segment
        .scrollTo(
          0,
          0
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
