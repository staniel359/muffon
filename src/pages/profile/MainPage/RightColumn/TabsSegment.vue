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
        @focus="slotProps.handleFocus"
      />
    </template>
  </BaseTabsSegmentContainer>
</template>

<script>
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import PostsTab from './TabsSegment/PostsTab.vue'
import PlaylistsTab from './TabsSegment/PlaylistsTab.vue'
import CommunitiesTab from './TabsSegment/CommunitiesTab.vue'

export default {
  name: 'TabsSegment',
  components: {
    BaseTabsSegmentContainer,
    PostsTab,
    PlaylistsTab,
    CommunitiesTab
  },
  props: {
    profileId: String
  },
  data () {
    return {
      tabs: [
        {
          nameCode: 'navigation.posts',
          component: 'PostsTab'
        },
        {
          nameCode: 'navigation.playlists',
          component: 'PlaylistsTab'
        },
        {
          nameCode: 'navigation.communities',
          component: 'CommunitiesTab'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
