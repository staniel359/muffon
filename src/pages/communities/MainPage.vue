<template>
  <BaseCommunitiesPaginatedPageContainer
    :key="refreshKey"
    model="community"
    :scope="scope"
    :limit="limit"
    :order="order"
    :is-with-options="!!profileId"
    is-with-top-segment
    is-with-order-change
  >
    <template
      #options
    >
      <BaseCommunitiesOptionsPopup
        is-with-create-option
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
import BaseCommunitiesOptionsPopup
  from '@/components/popups/communities/BaseCommunitiesOptionsPopup.vue'
import BaseCommunitiesSimpleList
  from '@/components/lists/communities/BaseCommunitiesSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import pageMixin from '@/mixins/pageMixin'
import {
  communities as communitiesLimits
} from '@/helpers/data/limits'

export default {
  name: 'MainPage',
  components: {
    BaseCommunitiesPaginatedPageContainer,
    BaseCommunitiesOptionsPopup,
    BaseCommunitiesSimpleList
  },
  mixins: [
    orderChangeMixin,
    pageMixin
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
