<template>
  <div class="content">
    <div class="header">
      {{ sourceName }}
    </div>
  </div>

  <div
    v-if="isRenderMaxBitrate"
    class="description extra"
  >
    {{ maxBitrateFormatted }}
  </div>
</template>

<script>
export default {
  name: 'InfoBlock',
  props: {
    sourceName: {
      type: String,
      required: true
    },
    maxBitrate: Number,
    isWithMaxBitrate: Boolean
  },
  computed: {
    isRenderMaxBitrate () {
      return (
        this.isWithMaxBitrate &&
          this.maxBitrate
      )
    },
    maxBitrateFormatted () {
      return `~${this.maxBitrate}`
    }
  }
}
</script>

<style lang="sass" scoped></style>
