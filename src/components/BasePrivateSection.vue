<template>
  <small>
    <BaseIcon
      icon="lock"
    />

    <span
      v-text="privateText"
    />
  </small>
</template>

<script>
import BaseIcon from '*/components/BaseIcon.vue'

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
