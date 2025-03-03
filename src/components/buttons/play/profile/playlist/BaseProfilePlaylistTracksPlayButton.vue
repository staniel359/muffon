<template>
  <BasePlayButton
    :is-loading="isLoading"
    :error="error"
    :checked-options="checkedOptions"
    @click="handleClick"
  />
</template>

<script>
import getProfilePlaylist from '@/helpers/actions/api/profile/playlist/get'
import playableListMixin from '@/mixins/playableListMixin'

export default {
  name: 'BaseProfilePlaylistTracksPlayButton',
  mixins: [
    playableListMixin
  ],
  props: {
    profileId: {
      type: Number,
      required: true
    },
    playlistId: {
      type: Number,
      required: true
    },
    order: String
  },
  data () {
    return {
      profileData: null
    }
  },
  computed: {
    profilePlaylistArgs () {
      return {
        profileId: this.profileId,
        playlistId: this.playlistId,
        scope: this.scope,
        limit: 'all',
        order: this.order
      }
    },
    tracksData () {
      return this.profileData?.playlist
    }
  },
  methods: {
    getProfilePlaylist,
    getTracksData () {
      return this.getProfilePlaylist(
        this.profilePlaylistArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
