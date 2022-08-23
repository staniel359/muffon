<template>
  <BaseHeader
    tag="h2"
    :text="name"
  />
</template>

<script>
import BaseHeader from '*/components/BaseHeader.vue'

export default {
  name: 'NameSection',
  components: {
    BaseHeader
  },
  computed: {
    name () {
      return this.info.name
    },
    info () {
      return require(
        '*/../package.json'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
