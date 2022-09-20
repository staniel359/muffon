<template>
  <strong
    v-text="versionText"
  />
</template>

<script>
export default {
  name: 'VersionSection',
  computed: {
    versionText () {
      return `v.${this.version}`
    },
    version () {
      return this.info.version
    },
    info () {
      return require(
        '@/../package.json'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
