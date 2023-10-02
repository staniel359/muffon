<template>
  <div class="main-bottom-section width-100 text-align-center">
    <BaseLabel
      class="mini empty circular base-paginated-infinite-list-end-label"
      :is-change-transparency="false"
    />
  </div>
</template>

<script>
import BaseLabel from '@/components/labels/BaseLabel.vue'

export default {
  name: 'ListEndLabel',
  components: {
    BaseLabel
  }
}
</script>

<style lang="sass" scoped></style>
