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
        :profile-id="profileId"
        :is-self="isSelf"
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
import TagsTab from './TabsSegment/TagsTab.vue'

export default {
  name: 'TabsSegment',
  components: {
    BaseTabsSegmentContainer,
    ArtistsTab,
    AlbumsTab,
    TracksTab,
    TagsTab
  },
  props: {
    profileId: Number,
    isSelf: Boolean
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
