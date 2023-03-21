<template>
  <div
    ref="segment"
    class="ui segment main-segment"
    :class="[
      transparentClass,
      {
        loading: isLoading,
        inverted: (
          isInverted || isDarkMode
        )
      }
    ]"
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
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import {
  focusOnSegment
} from '@/helpers/actions/layout'
import transparencyMixin from '@/mixins/transparencyMixin'

export default {
  name: 'BaseSegmentContainer',
  components: {
    BaseErrorMessage
  },
  mixins: [
    transparencyMixin
  ],
  props: {
    responseData: Object,
    isLoading: Boolean,
    error: Error,
    isInverted: Boolean
  },
  emits: [
    'init',
    'refresh'
  ],
  computed: {
    isError () {
      return !!(
        !this.responseData &&
          this.error
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
