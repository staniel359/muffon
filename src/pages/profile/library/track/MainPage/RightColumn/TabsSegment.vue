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
        :library-track-id="libraryTrackId"
        :is-self="isSelf"
        @focus="slotProps.handleFocus"
      />
    </template>
  </BaseTabsSegmentContainer>
</template>

<script>
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import AlbumsTab from './TabsSegment/AlbumsTab.vue'
import PlaylistsTab from './TabsSegment/PlaylistsTab.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'TabsSegment',
  components: {
    BaseTabsSegmentContainer,
    AlbumsTab,
    PlaylistsTab
  },
  props: {
    profileId: {
      type: Number,
      required: true
    },
    libraryTrackId: Number
  },
  data () {
    return {
      tabs: [
        {
          nameCode: 'navigation.albums',
          component: 'AlbumsTab'
        },
        {
          nameCode: 'navigation.playlists',
          component: 'PlaylistsTab'
        }
      ]
    }
  },
  computed: {
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
