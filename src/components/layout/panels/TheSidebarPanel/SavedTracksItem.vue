<template>
  <BaseSidebarItem
    icon="savedTrack"
    :text="text"
    :link-data="linkData"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  savedTracks as formatSavedTracksLinkData
} from '@/helpers/formatters/links'

export default {
  name: 'SavedTracksItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    text () {
      return this.$t(
        'navigation.savedTracks'
      )
    },
    linkData () {
      return formatSavedTracksLinkData()
    }
  }
}
</script>

<style lang="sass" scoped></style>
