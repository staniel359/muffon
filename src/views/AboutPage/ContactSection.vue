<template>
  <strong
    class="main-link link-section"
    @click="handleClick"
    v-text="contactText"
  />
</template>

<script>
import {
  shell
} from 'electron'

export default {
  name: 'ContactSection',
  computed: {
    contactText () {
      return this.$t(
        'about.contact'
      )
    },
    contactLink () {
      return this.info.author.url
    },
    info () {
      return require(
        '@/../package.json'
      )
    }
  },
  methods: {
    handleClick () {
      shell.openExternal(
        this.contactLink
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
