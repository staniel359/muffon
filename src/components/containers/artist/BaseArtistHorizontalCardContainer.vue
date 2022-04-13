<template>
  <div
    class="ui horizontal card main-horizontal-card"
    :class="{
      inverted: isDarkMode
    }"
  >
    <div class="content main-basic-segments-container">
      <BaseSegmentContainer
        class="basic segment-container"
        :is-loading="isLoading"
        :error="error"
        @refresh="handleRefresh"
      >
        <slot />
      </BaseSegmentContainer>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'

export default {
  name: 'BaseArtistHorizontalCardContainer',
  components: {
    BaseSegmentContainer
  },
  props: {
    isLoading: Boolean,
    error: Error
  },
  emits: [
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
  methods: {
    handleRefresh () {
      this.$emit(
        'refresh'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.segment-container
  @extend .d-flex, .no-padding
</style>
