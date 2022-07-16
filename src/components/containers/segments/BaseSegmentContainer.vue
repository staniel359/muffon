<template>
  <div
    ref="segment"
    class="ui segment main-segment"
    :class="{
      loading: isLoading,
      inverted: isDarkMode
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
} from 'vuex'
import BaseErrorMessage from '*/components/messages/BaseErrorMessage.vue'
import {
  focusOnSegment
} from '*/helpers/actions/layout'

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
    error: Error
  },
  emits: [
    'init',
    'refresh'
  ],
  data () {
    return {
      colorCodes: {
        light: '255 255 255',
        dark: '27 28 29'
      }
    }
  },
  computed: {
    ...mapState(
      'layout',
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
