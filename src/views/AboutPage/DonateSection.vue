<template>
  <strong
    class="main-link donate-section"
    @click="handleClick"
    v-text="donateText"
  />
</template>

<script>
import {
  shell
} from 'electron'
import {
  donate as donateLink
} from '*/helpers/data/links'

export default {
  name: 'DonateSection',
  computed: {
    donateText () {
      return this.$t(
        'donate.header'
      )
    }
  },
  methods: {
    handleClick () {
      shell.openExternal(
        donateLink
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.donate-section
  margin-left: 1em
</style>
