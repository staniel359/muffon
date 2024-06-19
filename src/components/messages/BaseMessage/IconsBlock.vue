<template>
  <i class="large icons main-list-left-medium-section">
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
  name: 'IconsBlock',
  components: {
    BaseIcon
  },
  props: {
    icons: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped></style>
