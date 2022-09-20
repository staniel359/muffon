<template>
  <BaseSidebarItem
    icon="save"
    :text="savedTracksText"
    :link="savedTracksLink"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  savedTracks as formatSavedTracksLink
} from '@/helpers/formatters/links'

export default {
  name: 'SavedTracksItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    savedTracksText () {
      return this.$t(
        'navigation.savedTracks'
      )
    },
    savedTracksLink () {
      return formatSavedTracksLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
