<template>
  <div class="main-deleted-container">
    <span
      v-text="deletedText"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseDeletedBlock',
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
