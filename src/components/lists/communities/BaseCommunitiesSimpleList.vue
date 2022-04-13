<template>
  <BaseListContainer class="selection">
    <CommunityItem
      v-for="communityData in communitiesCollection"
      :key="communityData.uuid"
      :community-data="communityData"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import CommunityItem from './BaseCommunitiesSimpleList/CommunityItem.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'BaseCommunitiesSimpleList',
  components: {
    BaseListContainer,
    CommunityItem
  },
  props: {
    communities: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    communitiesCollection () {
      return formatCollection(
        this.communities
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
