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
        :video-id="videoId"
        @focus="slotProps.handleFocus"
      />
    </template>
  </BaseTabsSegmentContainer>
</template>

<script>
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import RelatedTab from './TabsSegment/RelatedTab.vue'

export default {
  name: 'TabsSegment',
  components: {
    BaseTabsSegmentContainer,
    RelatedTab
  },
  props: {
    videoId: String
  },
  data () {
    return {
      tabs: [
        {
          nameCode: 'navigation.related',
          component: 'RelatedTab'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
