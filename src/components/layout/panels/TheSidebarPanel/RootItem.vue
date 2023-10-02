<template>
  <div
    class="item main-sidebar-item top-item"
    :class="{
      inverted: isDarkMode
    }"
  >
    <div class="main-sidebar-item-icon-image-container">
      <BaseLogoImage
        is-small
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseLogoImage from '@/components/images/BaseLogoImage.vue'

export default {
  name: 'RootItem',
  components: {
    BaseLogoImage
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    )
  }
}
</script>

<style lang="sass" scoped></style>
