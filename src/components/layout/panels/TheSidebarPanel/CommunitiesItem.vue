<template>
  <BaseSidebarItem
    icon="users"
    :text="communitiesText"
    :link="profileCommunitiesLink"
  />
</template>

<script>
import BaseSidebarItem from '*/components/BaseSidebarItem.vue'
import {
  communities as formatProfileCommunitiesLink
} from '*/helpers/formatters/links/profile'

export default {
  name: 'CommunitiesItem',
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
    communitiesText () {
      return this.$t(
        'navigation.communities'
      )
    },
    profileCommunitiesLink () {
      return formatProfileCommunitiesLink(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
