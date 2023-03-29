<template>
  <BaseProfileTabContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    @focus="handleFocus"
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
  </BaseProfileTabContainer>
</template>

<script>
import BaseProfileTabContainer
  from '@/components/containers/tabs/profile/BaseProfileTabContainer.vue'
import BaseCommunitiesSimpleList
  from '@/components/lists/communities/BaseCommunitiesSimpleList.vue'
import {
  communities as communitiesLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'CommunitiesTab',
  components: {
    BaseProfileTabContainer,
    BaseCommunitiesSimpleList
  },
  mixins: [
    tabMixin
  ],
  props: {
    profileId: String
  },
  data () {
    return {
      limit:
        communitiesLimits.simple.extrasmall,
      scope: 'communities'
    }
  }
}
</script>

<style lang="sass" scoped></style>
