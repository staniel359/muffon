<template>
  <BaseTabsSegmentContainer
    :tabs="tabs"
    is-attached
  >
    <template
      #default="slotProps"
    >
      <Component
        :is="slotProps.component"
        :class="slotProps.class"
        :is-active="slotProps.isActive"
        :profile-id="profileId"
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
import VideosTab from './TabsSegment/VideosTab.vue'

export default {
  name: 'TabsSegment',
  components: {
    BaseTabsSegmentContainer,
    ArtistsTab,
    AlbumsTab,
    TracksTab,
    VideosTab
  },
  props: {
    favoritesData: {
      type: Object,
      required: true
    },
    profileId: Number
  },
  computed: {
    tabs () {
      return [
        {
          nameCode: 'navigation.artists',
          component: 'ArtistsTab',
          counter: this.favoritesData.artists_count
        },
        {
          nameCode: 'navigation.albums',
          component: 'AlbumsTab',
          counter: this.favoritesData.albums_count
        },
        {
          nameCode: 'navigation.tracks',
          component: 'TracksTab',
          counter: this.favoritesData.tracks_count
        },
        {
          nameCode: 'navigation.videos',
          component: 'VideosTab',
          counter: this.favoritesData.videos_count
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
