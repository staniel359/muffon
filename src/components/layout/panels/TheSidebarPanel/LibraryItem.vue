<template>
  <BaseSidebarItem
    icon="headphones"
    :text="profileLibraryText"
    :link="profileLibraryMainLink"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseSidebarItem from '@/BaseSidebarItem.vue'
import {
  main as formatProfileLibraryMainLink
} from '#/formatters/links/profile/library'

export default {
  name: 'LibraryItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    profileLibraryText () {
      return this.$t(
        'layout.navigation.library'
      )
    },
    profileLibraryMainLink () {
      return formatProfileLibraryMainLink({
        profileId: this.profileId
      })
    },
    profileId () {
      return this.profileInfo.id
    }
  }
}
</script>

<style lang="sass" scoped></style>
