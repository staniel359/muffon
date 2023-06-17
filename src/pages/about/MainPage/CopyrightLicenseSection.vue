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
import {
  author,
  license
} from '@/../package.json'

export default {
  name: 'CopyrightLicenseSection',
  computed: {
    copyrightText () {
      return `Copyright (c) 2020-2023 ${this.authorName}`
    },
    authorName () {
      return author.name
    },
    licenseText () {
      return this.$t(
        'about.license',
        {
          license
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.copyright-license-section
  margin-top: 0.5em
</style>
