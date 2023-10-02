<template>
  <BaseCommunityPageContainer
    :key="refreshKey"
    :community-id="communityId"
    @init="handleInit"
  >
    <template
      #default="slotProps"
    >
      <InfoSegment
        :community-data="slotProps.communityData"
        :is-community-creator="slotProps.isCommunityCreator"
      />

      <div class="main-columns-container main-bottom-section">
        <LeftColumn
          :community-data="slotProps.communityData"
          :scrollable="scrollable"
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
  from '@/components/containers/pages/community/BaseCommunityPageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'MainPage',
  components: {
    BaseCommunityPageContainer,
    InfoSegment,
    LeftColumn,
    RightColumn
  },
  mixins: [
    pageMixin
  ],
  props: {
    communityId: String
  },
  data () {
    return {
      scrollable: null
    }
  },
  methods: {
    handleInit (
      element
    ) {
      this.scrollable = element
    }
  }
}
</script>

<style lang="sass" scoped></style>
