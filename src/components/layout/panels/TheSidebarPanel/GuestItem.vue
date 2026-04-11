<template>
  <BaseSidebarItem
    class="top-item"
    :text="nickname"
    :is-clickable="false"
    is-text-strong
    is-image-logo
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'

export default {
  name: 'GuestItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    nickname () {
      return this.$t(
        'guest.nickname'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
