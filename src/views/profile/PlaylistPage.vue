<template>
  <BaseProfilePlaylistPageContainer
    :profile-id="profileId"
    :playlist-id="playlistId"
  >
    <template #default="pageSlotProps">
      <div
        :class="[
          'ui raised segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <InfoSegment
          :playlist-data="pageSlotProps.playlistData"
          :profile-id="profileId"
        />

        <ImportSegment
          v-if="isSelf"
          :playlist-id="playlistId"
        />

        <TracksSegment
          :key="key"
          :profile-id="profileId"
          :playlist-id="playlistId"
          :playlist-title="pageSlotProps.playlistTitle"
        />
      </div>
    </template>
  </BaseProfilePlaylistPageContainer>
</template>

<script>
import BaseProfilePlaylistPageContainer
  from '*/components/containers/pages/profile/playlist/BaseProfilePlaylistPageContainer.vue'
import InfoSegment from './PlaylistPage/InfoSegment.vue'
import ImportSegment from './PlaylistPage/ImportSegment.vue'
import TracksSegment from './PlaylistPage/TracksSegment.vue'
import {
  isCurrentProfile,
  generateKey
} from '*/helpers/utils'

export default {
  name: 'PlaylistPage',
  components: {
    BaseProfilePlaylistPageContainer,
    InfoSegment,
    ImportSegment,
    TracksSegment
  },
  provide () {
    return {
      refreshTracksList:
        this.refreshTracksList
    }
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    playlistId: String
  },
  data () {
    return {
      key: null
    }
  },
  computed: {
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  },
  methods: {
    refreshTracksList () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
