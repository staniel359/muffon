<template>
  <i class="icons">
    <BaseIcon
      v-for="(icon, index) in icons"
      :key="index"
      :icon="icon"
    />
  </i>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'IconsSection',
  components: {
    BaseIcon
  },
  props: {
    icons: Array
  }
}
</script>

<style lang="sass" scoped></style>
