<template>
  <BaseProfileFavoritesPageContainer
    :profile-id="profileId"
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
          :profile-id="profileId"
          @focus="slotProps.handleFocus"
        />
      </template>
    </BaseTabsSegmentContainer>
  </BaseProfileFavoritesPageContainer>
</template>

<script>
import BaseProfileFavoritesPageContainer
  from '@/components/containers/pages/profile/favorites/BaseProfileFavoritesPageContainer.vue'
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import ArtistsTab from './MainPage/ArtistsTab.vue'
import AlbumsTab from './MainPage/AlbumsTab.vue'
import TracksTab from './MainPage/TracksTab.vue'
import VideosTab from './MainPage/VideosTab.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfileFavoritesPageContainer,
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
  }
}
</script>

<style lang="sass" scoped></style>
