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
        :library-album-id="libraryAlbumId"
        :is-self="isSelf"
        @focus="slotProps.handleFocus"
      />
    </template>
  </BaseTabsSegmentContainer>
</template>

<script>
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import TracksTab from './TabsSegment/TracksTab.vue'
import PlaylistsTab from './TabsSegment/PlaylistsTab.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'TabsSegment',
  components: {
    BaseTabsSegmentContainer,
    TracksTab,
    PlaylistsTab
  },
  props: {
    profileId: {
      type: Number,
      required: true
    },
    libraryAlbumId: Number
  },
  data () {
    return {
      tabs: [
        {
          nameCode: 'navigation.tracks',
          component: 'TracksTab'
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
