<template>
  <div
    class="ui raised segments main-segment-container"
    ref="segment"
  >
    <BaseHeaderSegment
      :scope="scope"
      :link="headerLink"
    />

    <slot
      :isLoading="isLoading"
      :error="error"
      :libraryAlbumData="libraryAlbumData"
      :artistName="artistNameFetched"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </div>
</template>

<script>
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import getLibraryAlbum from '*/helpers/actions/api/library/album/get'
import { focusOnSegment } from '*/helpers/actions/layout'

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
    responsePageLimit: Number,
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
        limit: this.responsePageLimit
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
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getLibraryAlbum,
    fetchData (page) {
      this.getLibraryAlbum({
        ...this.libraryAlbumArgs,
        page
      })
    },
    focus () {
      this.$nextTick(() => {
        focusOnSegment(
          this.$refs.segment
        )
      })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="sass" scoped></style>
