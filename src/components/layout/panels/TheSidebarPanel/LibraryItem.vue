<template>
  <BaseSidebarItem
    icon="library"
    :text="profileLibraryText"
    :link="profileLibraryLink"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  main as formatProfileLibraryLink
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
    profileLibraryText () {
      return this.$t(
        'navigation.library'
      )
    },
    profileLibraryLink () {
      return formatProfileLibraryLink(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
