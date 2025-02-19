<template>
  <BaseCommunityModalContainer
    ref="modal"
    :community-id="communityId"
    :scope="scope"
    :limit="limit"
    is-multiple
    is-paginated
  >
    <template
      #default="slotProps"
    >
      <BaseProfilesSimpleList
        :profiles="slotProps[scope]"
        is-with-created
        @link-click="handleLinkClick"
      />
    </template>
  </BaseCommunityModalContainer>
</template>

<script>
import BaseCommunityModalContainer
  from '@/components/containers/modals/community/BaseCommunityModalContainer.vue'
import BaseProfilesSimpleList
  from '@/components/lists/profiles/BaseProfilesSimpleList.vue'
import modalMixin from '@/mixins/modalMixin'
import {
  profiles as profilesLimits
} from '@/helpers/data/limits'

export default {
  name: 'BaseCommunityMembersModal',
  components: {
    BaseCommunityModalContainer,
    BaseProfilesSimpleList
  },
  mixins: [
    modalMixin
  ],
  props: {
    communityId: String
  },
  data () {
    return {
      limit:
        profilesLimits.simple.large,
      scope: 'members'
    }
  }
}
</script>

<style lang="sass" scoped></style>
