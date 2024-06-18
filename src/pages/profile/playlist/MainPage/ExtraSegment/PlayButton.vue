<template>
  <BasePlayableListPlayButton
    :is-loading="isLoading"
    :error="error"
    :checked-options="checkedOptions"
    @click="handleClick"
  />
</template>

<script>
import BasePlayableListPlayButton
  from '@/components/buttons/BasePlayableListPlayButton.vue'
import getProfilePlaylist from '@/helpers/actions/api/profile/playlist/get'
import playableListMixin from '@/mixins/playableListMixin'
import {
  getObjectKeysWithTrueValues
} from '@/helpers/utils'

export default {
  name: 'PlayButton',
  components: {
    BasePlayableListPlayButton
  },
  mixins: [
    playableListMixin
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
    },
    checkedOptions () {
      return getObjectKeysWithTrueValues(
        this.checkableOptions
      )
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
