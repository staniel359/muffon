<template>
  <BaseQueuePlayButton
    :is-loading="isLoading"
    :error="error"
    @click="handleClick"
  />
</template>

<script>
import BaseQueuePlayButton from '@/components/buttons/BaseQueuePlayButton.vue'
import getProfilePlaylist from '@/helpers/actions/api/profile/playlist/get'
import queuePlayMixin from '@/mixins/queuePlayMixin'

export default {
  name: 'PlayButton',
  components: {
    BaseQueuePlayButton
  },
  mixins: [
    queuePlayMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    playlistData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      profileData: null
    }
  },
  computed: {
    playlistArgs () {
      return {
        profileId: this.profileId,
        playlistId: this.playlistId,
        scope: this.scope,
        limit: this.tracksCount
      }
    },
    playlistId () {
      return this.playlistData.id
    },
    tracksCount () {
      return this.playlistData.tracks_count
    },
    queueTracks () {
      return this.profileData?.playlist?.tracks
    }
  },
  methods: {
    getProfilePlaylist,
    handleClick () {
      this.getProfilePlaylist(
        this.playlistArgs
      ).then(
        this.handleQueueTracksGet
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
