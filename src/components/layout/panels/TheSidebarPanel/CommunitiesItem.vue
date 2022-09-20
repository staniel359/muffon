<template>
  <BaseSidebarItem
    icon="users"
    :text="communitiesText"
    :link="communitiesLink"
  />
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  communities as formatProfileCommunitiesLink
} from '@/helpers/formatters/links/profile'
import {
  communities as formatCommunitiesLink
} from '@/helpers/formatters/links'

export default {
  name: 'CommunitiesItem',
  components: {
    BaseSidebarItem
  },
  props: {
    profileId: String
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        currentProfileId: 'id'
      }
    ),
    communitiesText () {
      return this.$t(
        'navigation.communities'
      )
    },
    communitiesLink () {
      if (this.currentProfileId) {
        return formatProfileCommunitiesLink(
          {
            profileId: this.profileId
          }
        )
      } else {
        return formatCommunitiesLink()
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
