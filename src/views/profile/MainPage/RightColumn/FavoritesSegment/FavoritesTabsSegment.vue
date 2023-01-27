<template>
  <BaseSegmentContainer
    ref="segment"
  >
    <BaseTabsContainer
      :tabs="tabs"
      is-fluid
      @tab-click="handleTabClick"
    >
      <template
        v-for="(tabData, index) in tabs"
        :key="index"
        #[index]="slotProps"
      >
        <Component
          :is="tabData.component"
          class="main-relative-tab"
          :class="slotProps.class"
          :is-active="slotProps.isActive"
          :profile-id="profileId"
          @focus="handleFocus"
        />
      </template>
    </BaseTabsContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseTabsContainer from '@/components/containers/tabs/BaseTabsContainer.vue'
import ArtistsTab from './FavoritesTabsSegment/ArtistsTab.vue'
import AlbumsTab from './FavoritesTabsSegment/AlbumsTab.vue'
import TracksTab from './FavoritesTabsSegment/TracksTab.vue'
import VideosTab from './FavoritesTabsSegment/VideosTab.vue'

export default {
  name: 'FavoritesTabsSegment',
  components: {
    BaseSegmentContainer,
    BaseTabsContainer,
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
