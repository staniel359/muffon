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
        :is-activated="slotProps.isActivated"
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
    profileData: {
      type: Object,
      required: true
    },
    profileId: Number
  },
  computed: {
    tabs () {
      return [
        {
          icon: 'artist',
          nameCode: 'navigation.artists',
          component: 'ArtistsTab',
          counter: this.favoritesData.artists_count
        },
        {
          icon: 'album',
          nameCode: 'navigation.albums',
          component: 'AlbumsTab',
          counter: this.favoritesData.albums_count
        },
        {
          icon: 'track',
          nameCode: 'navigation.tracks',
          component: 'TracksTab',
          counter: this.favoritesData.tracks_count
        },
        {
          icon: 'video',
          nameCode: 'navigation.videos',
          component: 'VideosTab',
          counter: this.favoritesData.videos_count
        }
      ]
    },
    favoritesData () {
      return this.profileData.favorites
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
