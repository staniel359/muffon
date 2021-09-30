<template>
  <div class="main-deleted-container">
    <span>
      {{ textFormatted }}
    </span>
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
    textFormatted () {
      return this.$t(
        `shared.deleted.${this.model}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
