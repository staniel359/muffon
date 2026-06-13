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
        :artist-name="artistName"
        @focus="slotProps.handleFocus"
      />
    </template>
  </BaseTabsSegmentContainer>
</template>

<script>
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import TracksTab from './TabsSegment/TracksTab.vue'
import AlbumsTab from './TabsSegment/AlbumsTab.vue'
import SimilarTab from './TabsSegment/SimilarTab.vue'
import ShowsTab from './TabsSegment/ShowsTab.vue'

export default {
  name: 'TabsSegment',
  components: {
    BaseTabsSegmentContainer,
    TracksTab,
    AlbumsTab,
    SimilarTab,
    ShowsTab
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tabs: [
        {
          icon: 'track',
          nameCode: 'navigation.tracks',
          component: 'TracksTab'
        },
        {
          icon: 'album',
          nameCode: 'navigation.albums',
          component: 'AlbumsTab'
        },
        {
          icon: 'similar',
          nameCode: 'navigation.similar',
          component: 'SimilarTab'
        },
        {
          icon: 'artistEvent',
          nameCode: 'navigation.shows',
          component: 'ShowsTab'
        }
      ]
    }
  },
  computed: {
    artistName () {
      return this.artistData.name
    }
  }
}
</script>

<style lang="sass" scoped></style>
