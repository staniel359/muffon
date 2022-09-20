<template>
  <BaseSidebarItem
    icon="record vinyl"
    :text="releasesText"
    :link="releasesLink"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  main as formatReleasesMainLink
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
      return formatReleasesMainLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
