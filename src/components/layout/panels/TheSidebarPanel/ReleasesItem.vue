<template>
  <BaseSidebarItem
    icon="release"
    :text="releasesText"
    :link="releasesLink"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  main as formatReleasesLink
} from '@/helpers/formatters/links/releases'

export default {
  name: 'ReleasesItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    releasesText () {
      return this.$t(
        'navigation.releases'
      )
    },
    releasesLink () {
      return formatReleasesLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
