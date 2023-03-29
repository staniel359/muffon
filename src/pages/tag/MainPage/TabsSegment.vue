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
        :tag-name="tagName"
        @focus="slotProps.handleFocus"
      />
    </template>
  </BaseTabsSegmentContainer>
</template>

<script>
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import ArtistsTab from './TabsSegment/ArtistsTab.vue'
import AlbumsTab from './TabsSegment/AlbumsTab.vue'
import TracksTab from './TabsSegment/TracksTab.vue'

export default {
  name: 'TabsSegment',
  components: {
    BaseTabsSegmentContainer,
    ArtistsTab,
    AlbumsTab,
    TracksTab
  },
  props: {
    tagName: String
  },
  data () {
    return {
      tabs: [
        {
          nameCode: 'navigation.artists',
          component: 'ArtistsTab'
        },
        {
          nameCode: 'navigation.albums',
          component: 'AlbumsTab'
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
