<template>
  <strong
    v-text="versionText"
  />
</template>

<script>
import {
  version
} from '@/../package.json'

export default {
  name: 'VersionSection',
  computed: {
    versionText () {
      return `v.${version}`
    }
  }
}
</script>

<style lang="sass" scoped></style>
