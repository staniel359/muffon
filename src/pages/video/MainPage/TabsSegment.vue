<template>
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
        :is-activated="slotProps.isActivated"
        :video-id="videoId"
        @focus="slotProps.handleFocus"
      />
    </template>
  </BaseTabsSegmentContainer>
</template>

<script>
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import SimilarTab from './TabsSegment/SimilarTab.vue'

export default {
  name: 'TabsSegment',
  components: {
    BaseTabsSegmentContainer,
    SimilarTab
  },
  props: {
    videoId: String
  },
  data () {
    return {
      tabs: [
        {
          icon: 'similar',
          nameCode: 'navigation.similar',
          component: 'SimilarTab'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
