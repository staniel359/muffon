<template>
  <div
    ref="observer"
    class="scroll-observer"
    :class="{
      loading: isLoading
    }"
  >
    <BaseSegmentContainer
      class="basic scroll-segment"
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
  setVisibility
} from '@/helpers/actions/plugins/semantic'
import {
  infiniteScrollObserverVisibilityOptions
} from '@/helpers/formatters/plugins/semantic'

export default {
  name: 'ScrollObserver',
  components: {
    BaseSegmentContainer
  },
  props: {
    isLoading: Boolean,
    error: Error,
    isLastPage: Boolean,
    scrollContext: HTMLDivElement
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
          context:
            this.scrollContext,
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
        this.scrollContext &&
          value
      ) {
        this.scrollToBottom()
      }
    },
    handleTopVisible () {
      this.scrollToBottom()
    },
    handleUpdate () {
      if (this.scrollContext) {
        const contextOffsetHeight =
          this.scrollContext.offsetHeight

        const contextScrollTop =
          this.scrollContext.scrollTop

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
.scroll-observer
  &.loading
    margin-top: 1em

.scroll-segment
  @extend .no-padding, .no-margin
  &.loading
    min-height: 100px !important
</style>
