<template>
  <div class="copyright-license-section">
    <small
      v-text="copyrightText"
    />

    <br>

    <small
      v-text="licenseText"
    />
  </div>
</template>

<script>
export default {
  name: 'CopyrightLicenseSection',
  computed: {
    copyrightText () {
      return `Copyright (c) 2020-2022 ${this.author}`
    },
    author () {
      return this.info.author.name
    },
    info () {
      return require(
        '*/../package.json'
      )
    },
    licenseText () {
      return this.$t(
        'about.license',
        {
          license: this.license
        }
      )
    },
    license () {
      return this.info.license
    }
  }
}
</script>

<style lang="sass" scoped>
.copyright-license-section
  margin-top: 0.5em
</style>
