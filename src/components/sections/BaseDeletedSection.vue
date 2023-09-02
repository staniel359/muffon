<template>
  <div class="base-deleted-section">
    <div>
      <BaseIcon
        class="deleted-icon"
        icon="delete"
      />

      <span
        class="deleted-text"
        v-text="deletedText"
      />
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'BaseDeletedSection',
  components: {
    BaseIcon
  },
  props: {
    model: {
      type: String,
      required: true
    }
  },
  computed: {
    deletedText () {
      return this.$t(
        `deleted.${this.model}`
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.base-deleted-section
  @extend .d-flex, .align-items-center, .justify-content-center, .flex-full, .text-align-center, .word-break-break-word
  .deleted-icon
    @extend .d-inline
    margin-right: 0.75em
  .deleted-text
    @extend .d-inline
</style>
