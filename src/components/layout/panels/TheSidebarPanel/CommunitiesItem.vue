<template>
  <BaseSidebarItem
    icon="community"
    :text="communitiesText"
    :link="communitiesLink"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
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
    profileId: Number
  },
  computed: {
    ...mapState(
      profileStore,
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
