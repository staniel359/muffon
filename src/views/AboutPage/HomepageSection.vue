<template>
  <strong
    class="main-link link-section"
    @click="handleClick"
    v-text="homepageText"
  />
</template>

<script>
import {
  shell
} from 'electron'
import {
  homepage
} from '@/../package.json'

export default {
  name: 'HomepageSection',
  computed: {
    homepageText () {
      return this.$t(
        'about.homepage'
      )
    }
  },
  methods: {
    handleClick () {
      shell.openExternal(
        homepage
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
