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
import ArtistsTab from './FavoritesTabsSegment/ArtistsTab.vue'
import AlbumsTab from './FavoritesTabsSegment/AlbumsTab.vue'
import TracksTab from './FavoritesTabsSegment/TracksTab.vue'
import VideosTab from './FavoritesTabsSegment/VideosTab.vue'

export default {
  name: 'FavoritesTabsSegment',
  components: {
    BaseTabsSegmentContainer,
    ArtistsTab,
    AlbumsTab,
    TracksTab,
    VideosTab
  },
  props: {
    profileId: String
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
        },
        {
          nameCode: 'navigation.videos',
          component: 'VideosTab'
        }
      ]
    }
  },
  methods: {
    handleTabClick () {
      this.focus()
    },
    handleFocus () {
      this.focus()
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
