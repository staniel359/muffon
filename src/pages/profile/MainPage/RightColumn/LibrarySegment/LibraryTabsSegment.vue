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
import ArtistsTab from './LibraryTabsSegment/ArtistsTab.vue'
import AlbumsTab from './LibraryTabsSegment/AlbumsTab.vue'
import TracksTab from './LibraryTabsSegment/TracksTab.vue'
import TagsTab from './LibraryTabsSegment/TagsTab.vue'

export default {
  name: 'LibraryTabsSegment',
  components: {
    BaseTabsSegmentContainer,
    ArtistsTab,
    AlbumsTab,
    TracksTab,
    TagsTab
  },
  props: {
    profileId: Number
  },
  data () {
    return {
      tabs: [
        {
          icon: 'artist',
          nameCode: 'navigation.artists',
          component: 'ArtistsTab'
        },
        {
          icon: 'album',
          nameCode: 'navigation.albums',
          component: 'AlbumsTab'
        },
        {
          icon: 'track',
          nameCode: 'navigation.tracks',
          component: 'TracksTab'
        },
        {
          icon: 'tag',
          nameCode: 'navigation.tags',
          component: 'TagsTab'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
