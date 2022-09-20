<template>
  <strong
    class="main-link"
    @click="handleClick"
    v-text="homepageText"
  />
</template>

<script>
import {
  shell
} from 'electron'

export default {
  name: 'HomepageSection',
  computed: {
    homepage () {
      return this.info.homepage
    },
    info () {
      return require(
        '@/../package.json'
      )
    },
    homepageText () {
      return this.$t(
        'about.homepage'
      )
    }
  },
  methods: {
    handleClick () {
      shell.openExternal(
        this.homepage
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
