<template>
  <BaseProfilePaginatedSegmentContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template
      #default="slotProps"
    >
      <BaseCommunitiesSimpleList
        :communities="slotProps[scope]"
        is-with-created
        is-with-join-option
        is-with-share-option
      />
    </template>
  </BaseProfilePaginatedSegmentContainer>
</template>

<script>
import BaseProfilePaginatedSegmentContainer
  from '@/components/containers/segments/profile/BaseProfilePaginatedSegmentContainer.vue'
import BaseCommunitiesSimpleList
  from '@/components/lists/communities/BaseCommunitiesSimpleList.vue'
import {
  communities as formatProfileCommunitiesLink
} from '@/helpers/formatters/links/profile'
import {
  communities as communitiesLimits
} from '@/helpers/data/limits'

export default {
  name: 'CommunitiesSegment',
  components: {
    BaseProfilePaginatedSegmentContainer,
    BaseCommunitiesSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit:
        communitiesLimits.simple.extrasmall,
      scope: 'communities'
    }
  },
  computed: {
    headerLink () {
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
