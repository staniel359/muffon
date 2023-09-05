<template>
  <BaseRecommendationsPageContainer
    :key="refreshKey"
    :is-get-data="false"
  >
    <BaseTabsSegmentContainer
      :tabs="tabs"
    >
      <template
        #default="slotProps"
      >
        <Component
          :is="slotProps.component"
          :class="slotProps.class"
          :is-active="slotProps.isActive"
          @focus="slotProps.handleFocus"
        />
      </template>
    </BaseTabsSegmentContainer>
  </BaseRecommendationsPageContainer>
</template>

<script>
import BaseRecommendationsPageContainer
  from '@/components/containers/pages/recommendations/BaseRecommendationsPageContainer.vue'
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import ArtistsTab from './MainPage/ArtistsTab.vue'
import TracksTab from './MainPage/TracksTab.vue'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'MainPage',
  components: {
    BaseRecommendationsPageContainer,
    BaseTabsSegmentContainer,
    ArtistsTab,
    TracksTab
  },
  mixins: [
    pageMixin
  ],
  data () {
    return {
      tabs: [
        {
          nameCode: 'navigation.artists',
          component: 'ArtistsTab'
        },
        {
          nameCode: 'navigation.tracks',
          component: 'TracksTab'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
