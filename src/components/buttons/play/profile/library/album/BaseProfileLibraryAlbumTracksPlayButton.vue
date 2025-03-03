<template>
  <BasePlayButton
    :is-loading="isLoading"
    :error="error"
    :checked-options="checkedOptions"
    @click="handleClick"
  />
</template>

<script>
import getProfileLibraryAlbum
  from '@/helpers/actions/api/profile/library/album/get'
import playableListMixin from '@/mixins/playableListMixin'

export default {
  name: 'BaseProfileLibraryAlbumTracksPlayButton',
  mixins: [
    playableListMixin
  ],
  props: {
    profileId: {
      type: Number,
      required: true
    },
    libraryAlbumId: {
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
    profileLibraryAlbumArgs () {
      return {
        profileId: this.profileId,
        libraryAlbumId:
          this.libraryAlbumId,
        scope: this.scope,
        limit: 'all',
        order: this.order
      }
    },
    tracksData () {
      return this.profileData?.library?.album
    }
  },
  methods: {
    getProfileLibraryAlbum,
    getTracksData () {
      return this.getProfileLibraryAlbum(
        this.profileLibraryAlbumArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
