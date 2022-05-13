<template>
  <BaseProfilePaginatedSegmentContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseCommunitiesSimpleList
        :communities="slotProps[scope]"
        is-with-join-option
        is-with-share-option
      />
    </template>
  </BaseProfilePaginatedSegmentContainer>
</template>

<script>
import BaseProfilePaginatedSegmentContainer
  from '*/components/containers/segments/profile/BaseProfilePaginatedSegmentContainer.vue'
import BaseCommunitiesSimpleList
  from '*/components/lists/communities/BaseCommunitiesSimpleList.vue'
import {
  communities as formatProfileCommunitiesLink
} from '*/helpers/formatters/links/profile'

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
      limit: 3,
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
