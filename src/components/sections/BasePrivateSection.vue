<template>
  <div class="middle-center-aligned-full word-break-break-word">
    <div class="middle-aligned">
      <BaseIcon
        class="main-left-small-icon"
        icon="private"
      />

      <span
        v-text="privateText"
      />
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'BasePrivateSection',
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
    privateText () {
      return this.$t(
        `private.${this.model}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
