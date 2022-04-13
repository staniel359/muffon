<template>
  <div
    ref="segment"
    class="ui segment main-segment"
    :class="{
      loading: isLoading,
      inverted: isDarkMode
    }"
  >
    <BaseErrorMessage
      v-if="error"
      :error="error"
      is-with-refresh-button
      @refresh="handleRefresh"
    />
    <slot v-else />
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
    isLoading: Boolean,
    error: Error
  },
  emits: [
    'init',
    'refresh'
  ],
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    )
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
