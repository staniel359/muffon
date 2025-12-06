<template>
  <BaseSidebarItem
    icon="release"
    :text="text"
    :link-data="linkData"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  main as formatReleasesLinkData
} from '@/helpers/formatters/links/releases'

export default {
  name: 'ReleasesItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    text () {
      return this.$t(
        'navigation.releases'
      )
    },
    linkData () {
      return formatReleasesLinkData()
    }
  }
}
</script>

<style lang="sass" scoped></style>
