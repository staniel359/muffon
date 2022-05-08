<template>
  <BaseHeaderSegmentsContainer
    ref="segment"
    :scope="scope"
    :header-link="headerLink"
  >
    <slot
      :artist-data="artistData"
      :artist-name="artistName"
      :is-loading="isLoading"
      :error="error"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '*/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import getProfileLibraryArtist
  from '*/helpers/actions/api/profile/library/artist/get'

export default {
  name: 'BaseProfileLibraryArtistSegmentContainer',
  components: {
    BaseHeaderSegmentsContainer
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryArtistId: {
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
    libraryArtistArgs () {
      return {
        profileId: this.profileId,
        libraryArtistId: this.libraryArtistId,
        scope: this.scope,
        limit: this.limit
      }
    },
    artistData () {
      return this.profileData?.library?.artist
    },
    artistName () {
      return this.artistData?.name
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getProfileLibraryArtist,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfileLibraryArtist(
        {
          ...this.libraryArtistArgs,
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
