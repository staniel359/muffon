<template>
  <BasePlayButton
    :is-loading="isLoading"
    :error="error"
    :checked-options="checkedOptions"
    @click="handleClick"
  />
</template>

<script>
import getProfileLibraryArtist
  from '@/helpers/actions/api/profile/library/artist/get'
import playableListMixin from '@/mixins/playableListMixin'

export default {
  name: 'BaseProfileLibraryArtistTracksPlayButton',
  mixins: [
    playableListMixin
  ],
  props: {
    profileId: {
      type: Number,
      required: true
    },
    libraryArtistId: {
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
    profileLibraryArtistArgs () {
      return {
        profileId: this.profileId,
        libraryArtistId:
          this.libraryArtistId,
        scope: this.scope,
        limit: 'all',
        order: this.order
      }
    },
    tracksData () {
      return this.profileData?.library?.artist
    }
  },
  methods: {
    getProfileLibraryArtist,
    getTracksData () {
      return this.getProfileLibraryArtist(
        this.profileLibraryArtistArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
