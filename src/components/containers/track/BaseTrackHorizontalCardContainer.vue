<template>
  <div
    class="ui horizontal card main-horizontal-card"
    :class="{ inverted: isDarkMode }"
  >
    <div></div>
    <BaseImage
      class="main-horizontal-card-image"
      :class="{ inverted: isDarkMode }"
      :image="image"
    />

    <div class="content">
      <slot></slot>
    </div>
    <div></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseImage from '@/BaseImage.vue'

export default {
  name: 'BaseTrackHorizontalCardContainer',
  components: {
    BaseImage
  },
  props: {
    image: String
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  }
}
</script>

<style lang="sass" scoped>
.content
  @extend .d-flex, .no-border
</style>
