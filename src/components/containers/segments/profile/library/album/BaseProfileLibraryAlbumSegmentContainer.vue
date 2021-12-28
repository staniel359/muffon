<template>
  <div
    class="ui raised segments main-segment-container"
    ref="segment"
  >
    <HeaderSegment
      v-if="headerTextKey"
      :profileId="profileId"
      :albumId="albumId"
      :headerTextKey="headerTextKey"
      :formatHeaderLink="formatHeaderLink"
      :scope="scope"
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
import HeaderSegment
  from './BaseProfileLibraryAlbumSegmentContainer/HeaderSegment.vue'
import getLibraryAlbum from '#/actions/api/library/album/get'
import { focusOnSegment } from '#/actions/layout'

export default {
  name: 'BaseProfileLibraryAlbumSegmentContainer',
  components: {
    HeaderSegment
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
    responsePageLimit: Number,
    headerTextKey: String,
    formatHeaderLink: Function,
    scope: String
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
