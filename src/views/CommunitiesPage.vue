<template>
  <BaseCommunitiesPaginatedPageContainer
    model="community"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
  >
    <template #top>
      <BaseCommunityCreateButton
        v-if="profileId"
      />
    </template>

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
  </BaseCommunitiesPaginatedPageContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseCommunitiesPaginatedPageContainer
  from '@/components/containers/pages/communities/BaseCommunitiesPaginatedPageContainer.vue'
import BaseCommunityCreateButton
  from '@/components/buttons/community/BaseCommunityCreateButton.vue'
import BaseCommunitiesSimpleList
  from '@/components/lists/communities/BaseCommunitiesSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import {
  communities as communitiesLimits
} from '@/helpers/data/limits'

export default {
  name: 'CommunitiesPage',
  components: {
    BaseCommunitiesPaginatedPageContainer,
    BaseCommunityCreateButton,
    BaseCommunitiesSimpleList
  },
  mixins: [
    orderChangeMixin
  ],
  data () {
    return {
      limit:
        communitiesLimits.simple.large,
      scope: 'communities',
      order: 'membersCountDesc'
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    )
  }
}
</script>

<style lang="sass" scoped></style>
