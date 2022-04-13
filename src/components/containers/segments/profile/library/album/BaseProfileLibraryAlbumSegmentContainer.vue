<template>
  <div
    ref="segment"
    :class="[
      'ui raised segments',
      'main-segment-container'
    ]"
  >
    <BaseHeaderSegment
      :scope="scope"
      :link="headerLink"
    />

    <slot
      :library-album-data="libraryAlbumData"
      :artist-name="artistNameFetched"
      :is-loading="isLoading"
      :error="error"
      :fetch-data="fetchData"
      :refresh="refresh"
    />
  </div>
</template>

<script>
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import getProfileLibraryAlbum
  from '*/helpers/actions/api/profile/library/album/get'
import {
  focusOnSegment
} from '*/helpers/actions/layout'

export default {
  name: 'BaseProfileLibraryAlbumSegmentContainer',
  components: {
    BaseHeaderSegment
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    albumId: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    limit: Number,
    headerLink: Object
  },
  data () {
    return {
      error: null,
      profileData: null,
      isLoading: false
    }
  },
  computed: {
    libraryAlbumArgs () {
      return {
        profileId: this.profileId,
        albumId: this.albumId,
        scope: this.scope,
        limit: this.limit
      }
    },
    libraryAlbumData () {
      return this.profileData?.library?.album
    },
    libraryAlbumArtistData () {
      return this.libraryAlbumData?.artist
    },
    artistNameFetched () {
      return this.libraryAlbumArtistData?.name
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getProfileLibraryAlbum,
    fetchData (
      page
    ) {
      this.getProfileLibraryAlbum(
        {
          ...this.libraryAlbumArgs,
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
      focusOnSegment(
        this.$refs.segment
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
