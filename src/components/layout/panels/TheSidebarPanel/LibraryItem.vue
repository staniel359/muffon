<template>
  <BaseSidebarItem
    icon="headphones"
    :text="profileLibraryText"
    :link="profileLibraryMainLink"
  />
</template>

<script>
import BaseSidebarItem from '*/components/BaseSidebarItem.vue'
import {
  main as formatProfileLibraryMainLink
} from '*/helpers/formatters/links/profile/library'

export default {
  name: 'LibraryItem',
  components: {
    BaseSidebarItem
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    profileLibraryText () {
      return this.$t(
        'navigation.library'
      )
    },
    profileLibraryMainLink () {
      return formatProfileLibraryMainLink(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
