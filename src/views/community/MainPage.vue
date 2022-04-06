<template>
  <BaseCommunityPageContainer
    :communityId="communityId"
  >
    <template #default="slotProps">
      <InfoSegment
        :communityData="slotProps.communityData"
        :communityCreatorId="slotProps.communityCreatorId"
      />

      <div class="columns-container">
        <LeftColumn
          :communityData="slotProps.communityData"
        />

        <RightColumn
          :communityId="communityId"
          :communityCreatorId="slotProps.communityCreatorId"
        />
      </div>
    </template>
  </BaseCommunityPageContainer>
</template>

<script>
import BaseCommunityPageContainer
  from '*/components/containers/pages/community/BaseCommunityPageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'

export default {
  name: 'MainPage',
  components: {
    BaseCommunityPageContainer,
    InfoSegment,
    LeftColumn,
    RightColumn
  },
  props: {
    communityId: String
  }
}
</script>

<style lang="sass" scoped>
.columns-container
  @extend .d-flex, .align-items-start
</style>
