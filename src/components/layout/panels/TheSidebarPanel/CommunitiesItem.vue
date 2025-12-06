<template>
  <BaseSidebarItem
    icon="community"
    :text="text"
    :link-data="linkData"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  communities as formatProfileCommunitiesLinkData
} from '@/helpers/formatters/links/profile'
import {
  communities as formatCommunitiesLinkData
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
    text () {
      return this.$t(
        'navigation.communities'
      )
    },
    linkData () {
      if (this.currentProfileId) {
        return formatProfileCommunitiesLinkData(
          {
            profileId: this.profileId
          }
        )
      } else {
        return formatCommunitiesLinkData()
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
