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
          nameCode: 'navigation.posts',
          component: 'PostsTab',
          counter: this.profileData.posts_count
        },
        {
          nameCode: 'navigation.playlists',
          component: 'PlaylistsTab',
          counter: this.profileData.playlists_count
        },
        {
          nameCode: 'navigation.communities',
          component: 'CommunitiesTab',
          counter: this.profileData.communities_count
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
