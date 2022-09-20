<template>
  <BaseHeaderSegmentsContainer
    ref="segment"
    :scope="scope"
    :header-link="headerLink"
  >
    <slot
      :album-data="albumData"
      :artist-name="artistName"
      :is-loading="isLoading"
      :error="error"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import getProfileLibraryAlbum
  from '@/helpers/actions/api/profile/library/album/get'

export default {
  name: 'BaseProfileLibraryAlbumSegmentContainer',
  components: {
    BaseHeaderSegmentsContainer
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryAlbumId: {
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
      profileData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    libraryAlbumArgs () {
      return {
        profileId: this.profileId,
        libraryAlbumId: this.libraryAlbumId,
        scope: this.scope,
        limit: this.limit
      }
    },
    albumData () {
      return this.profileData?.library?.album
    },
    artistName () {
      return this.albumData?.artist?.name
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getProfileLibraryAlbum,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfileLibraryAlbum(
        {
          ...this.libraryAlbumArgs,
          page
        }
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
