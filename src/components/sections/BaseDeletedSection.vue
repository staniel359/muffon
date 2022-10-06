<template>
  <div class="main-deleted-container">
    <div>
      <BaseIcon
        class="deleted-icon"
        icon="trash alternate outline"
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

<style lang="sass" scoped></style>
