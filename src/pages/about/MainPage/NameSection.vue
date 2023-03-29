<template>
  <BaseHeader
    tag="h2"
    :text="name"
  />
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import {
  name
} from '@/../package.json'

export default {
  name: 'NameSection',
  components: {
    BaseHeader
  },
  computed: {
    name () {
      return name
    }
  }
}
</script>

<style lang="sass" scoped></style>
