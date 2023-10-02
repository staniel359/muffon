<template>
  <div
    ref="observer"
    class="scroll-observer"
    :class="{
      loading: isLoading,
      'main-bottom-section': !isLastPage
    }"
  >
    <BaseSegmentContainer
      class="basic scroll-segment no-padding no-margin"
      :is-loading="isLoading"
      :error="error"
      :is-change-transparency="false"
      @refresh="handleRefresh"
    />
  </div>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import {
  set as setVisibility
} from '@/helpers/actions/plugins/semantic/visibility'
import {
  infiniteScrollObserver as infiniteScrollObserverVisibilityOptions
} from '@/helpers/formatters/plugins/semantic/options/visibility'

export default {
  name: 'ScrollObserver',
  components: {
    BaseSegmentContainer
  },
  props: {
    isLoading: Boolean,
    error: Error,
    isLastPage: Boolean,
    scrollable: HTMLDivElement
  },
  emits: [
    'bottomScroll',
    'refresh'
  ],
  data () {
    return {
      isTopVisible: false
    }
  },
  computed: {
    visibilityOptions () {
      return infiniteScrollObserverVisibilityOptions(
        {
          context: this.scrollable,
          onTopVisible:
            this.handleTopVisible,
          onUpdate:
            this.handleUpdate
        }
      )
    },
    isDisabled () {
      return (
        this.isLoading ||
          this.isLastPage
      )
    }
  },
  watch: {
    isTopVisible:
      'handleIsTopVisibleChange'
  },
  mounted () {
    setVisibility(
      this.$refs.observer,
      this.visibilityOptions
    )
  },
  activated () {
    setVisibility(
      this.$refs.observer,
      this.visibilityOptions
    )
  },
  methods: {
    handleIsTopVisibleChange (
      value
    ) {
      if (
        this.scrollable &&
          value
      ) {
        this.scrollToBottom()
      }
    },
    handleTopVisible () {
      this.scrollToBottom()
    },
    handleUpdate () {
      if (this.scrollable) {
        const contextOffsetHeight =
          this.scrollable.offsetHeight

        const contextScrollTop =
          this.scrollable.scrollTop

        const observerOffsetTop =
          this.$refs.observer.offsetTop

        const isTopVisible = (
          contextOffsetHeight +
            contextScrollTop
        ) >= observerOffsetTop

        this.isTopVisible = isTopVisible
      }
    },
    handleRefresh () {
      this.$emit(
        'refresh'
      )
    },
    scrollToBottom () {
      if (!this.isDisabled) {
        this.$emit(
          'bottomScroll'
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.scroll-segment
  &.loading
    min-height: 100px !important
</style>
