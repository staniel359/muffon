<template>
  <BaseSidebarItem
    icon="library"
    :text="text"
    :link-data="linkData"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  main as formatProfileLibraryLinkData
} from '@/helpers/formatters/links/profile/library'

export default {
  name: 'LibraryItem',
  components: {
    BaseSidebarItem
  },
  props: {
    profileId: {
      type: Number,
      required: true
    }
  },
  computed: {
    text () {
      return this.$t(
        'navigation.library'
      )
    },
    linkData () {
      return formatProfileLibraryLinkData(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
