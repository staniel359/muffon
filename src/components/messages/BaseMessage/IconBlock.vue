<template>
  <i class="icons">
    <BaseIcon
      :icon="icon"
    />
  </i>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'IconBlock',
  components: {
    BaseIcon
  },
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped></style>
