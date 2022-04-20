<template>
  <BaseSegmentContainer
    ref="segment"
    :response-data="playlistData"
    :is-loading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="playlistData"
      :playlist-data="playlistData"
      :is-loading="isLoading"
      :error="error"
      :fetch-data="fetchData"
      :refresh="refresh"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import getProfilePlaylist from '*/helpers/actions/api/profile/playlist/get'

export default {
  name: 'BasePlaylistSegmentContainer',
  components: {
    BaseSegmentContainer
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    playlistId: {
      type: String,
      required: true
    },
    scope: String,
    limit: Number
  },
  data () {
    return {
      isLoading: false,
      error: null,
      profileData: null
    }
  },
  computed: {
    playlistArgs () {
      return {
        profileId: this.profileId,
        playlistId: this.playlistId,
        scope: this.scope,
        limit: this.limit
      }
    },
    playlistData () {
      return this.profileData?.playlist
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getProfilePlaylist,
    handleRefresh () {
      this.refresh()
    },
    fetchData (
      page
    ) {
      this.getProfilePlaylist(
        {
          ...this.playlistArgs,
          page
        }
      )
    },
    refresh (
      page
    ) {
      this.fetchData(
        page
      )
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
