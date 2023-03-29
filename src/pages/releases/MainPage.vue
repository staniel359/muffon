<template>
  <BaseReleasesPageContainer
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
  </BaseReleasesPageContainer>
</template>

<script>
import BaseReleasesPageContainer
  from '@/components/containers/pages/releases/BaseReleasesPageContainer.vue'
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import NewTab from './MainPage/NewTab.vue'
import UpcomingTab from './MainPage/UpcomingTab.vue'

export default {
  name: 'MainPage',
  components: {
    BaseReleasesPageContainer,
    BaseTabsSegmentContainer,
    NewTab,
    UpcomingTab
  },
  data () {
    return {
      tabs: [
        {
          nameCode: 'navigation.new',
          component: 'NewTab'
        },
        {
          nameCode: 'navigation.upcoming',
          component: 'UpcomingTab'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
