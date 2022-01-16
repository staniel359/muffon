<template>
  <BaseSidebarItem
    icon="users"
    :text="communitiesText"
    :link="profileCommunitiesLink"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseSidebarItem from '@/BaseSidebarItem.vue'
import {
  communities as formatProfileCommunitiesLink
} from '#/formatters/links/profile'

export default {
  name: 'CommunitiesItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    communitiesText () {
      return this.$t(
        'navigation.communities'
      )
    },
    profileCommunitiesLink () {
      return formatProfileCommunitiesLink({
        profileId: this.profileId
      })
    },
    profileId () {
      return this.profileInfo.id.toString()
    }
  }
}
</script>

<style lang="sass" scoped></style>
