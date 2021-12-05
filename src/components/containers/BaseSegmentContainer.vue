<template>
  <div
    class="ui segment main-segment"
    ref="segment"
    :class="{
      loading: isLoading,
      inverted: isDarkMode
    }"
  >
    <BaseError
      v-if="error"
      :error="error"
      @refresh="handleRefresh"
    />
    <slot v-else></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseError from '@/BaseErrorMessage.vue'
import { focusOnSegment } from '#/actions/layout'

export default {
  name: 'BaseSegmentContainer',
  components: {
    BaseError
  },
  props: {
    isLoading: Boolean,
    error: Error
  },
  emits: [
    'init',
    'refresh'
  ],
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  },
  mounted () {
    this.$emit(
      'init',
      this.$refs.segment
    )
  },
  methods: {
    handleRefresh () {
      this.$emit('refresh')
    },
    focus () {
      focusOnSegment(
        this.$refs.segment
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
