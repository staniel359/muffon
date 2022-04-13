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
      :library-artist-data="libraryArtistData"
      :artist-name="artistName"
      :is-loading="isLoading"
      :error="error"
      :fetch-data="fetchData"
      :refresh="refresh"
    />
  </div>
</template>

<script>
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import getProfileLibraryArtist
  from '*/helpers/actions/api/profile/library/artist/get'
import {
  focusOnSegment
} from '*/helpers/actions/layout'

export default {
  name: 'BaseProfileLibraryArtistSegmentContainer',
  components: {
    BaseHeaderSegment
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    artistId: {
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
    libraryArtistArgs () {
      return {
        profileId: this.profileId,
        artistId: this.artistId,
        scope: this.scope,
        limit: this.limit
      }
    },
    libraryArtistData () {
      return this.profileData?.library?.artist
    },
    artistName () {
      return this.libraryArtistData?.name
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getProfileLibraryArtist,
    fetchData (
      page
    ) {
      this.getProfileLibraryArtist(
        {
          ...this.libraryArtistArgs,
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
