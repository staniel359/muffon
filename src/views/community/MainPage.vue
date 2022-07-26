<template>
  <BaseCommunityPageContainer
    :community-id="communityId"
    @init="handleContainerInit"
  >
    <template #default="slotProps">
      <InfoSegment
        :community-data="slotProps.communityData"
        :is-community-creator="slotProps.isCommunityCreator"
      />

      <div class="columns-container">
        <LeftColumn
          :community-data="slotProps.communityData"
          :scrollable="container"
        />

        <RightColumn
          :community-id="communityId"
          :is-community-creator="slotProps.isCommunityCreator"
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
  },
  data () {
    return {
      container: null
    }
  },
  methods: {
    handleContainerInit (
      element
    ) {
      this.container = element
    }
  }
}
</script>

<style lang="sass" scoped>
.columns-container
  @extend .d-flex, .align-items-start
</style>
