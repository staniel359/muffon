<template>
  <div ref="scrollable">
    <BaseSegmentContainer
      class="basic scroll-segment"
      :is-loading="isLoading"
      :error="error"
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

export default {
  name: 'ScrollObserver',
  components: {
    BaseSegmentContainer
  },
  props: {
    isLoading: Boolean,
    error: Error
  },
  emits: [
    'bottomScroll',
    'refresh'
  ],
  computed: {
    visibilityOptions () {
      return {
        initialCheck: false,
        onTopVisible:
          this.handleTopVisible
      }
    }
  },
  mounted () {
    setVisibility(
      this.$refs.scrollable,
      this.visibilityOptions
    )
  },
  methods: {
    handleTopVisible () {
      if (!this.isLoading) {
        this.$emit(
          'bottomScroll'
        )
      }
    },
    handleRefresh () {
      this.$emit(
        'refresh'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.scroll-segment
  @extend .no-padding
  margin-top: 1em !important
  &.loading
    min-height: 100px !important
</style>
