<template>
  <BaseListContainer class="selection">
    <CommunityItem
      v-for="communityData in communitiesCollection"
      :key="communityData.uuid"
      :communityData="communityData"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer from '@/containers/lists/BaseListContainer.vue'
import CommunityItem from './BaseCommunitiesSimpleList/CommunityItem.vue'
import { collection as formatCollection } from '#/formatters'

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
