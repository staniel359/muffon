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
import {
  author
} from '@/../package.json'

export default {
  name: 'ContactSection',
  computed: {
    contactText () {
      return this.$t(
        'about.contact'
      )
    },
    contactLink () {
      return author.url
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
