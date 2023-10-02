<template>
  <div class="middle-center-aligned-full word-break-break-word">
    <div class="middle-aligned">
      <BaseIcon
        class="main-left-small-icon"
        icon="delete"
      />

      <span
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
