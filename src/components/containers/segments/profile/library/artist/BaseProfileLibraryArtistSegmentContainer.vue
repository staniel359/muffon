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
      :libraryArtistData="libraryArtistData"
      :artistName="artistName"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </div>
</template>

<script>
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import getLibraryArtist from '*/helpers/actions/api/library/artist/get'
import { focusOnSegment } from '*/helpers/actions/layout'

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
    libraryArtistArgs () {
      return {
        profileId: this.profileId,
        artistId: this.artistId,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    },
    libraryArtistData () {
      return this.profileData?.library?.artist
    },
    artistName () {
      return this.libraryArtistData?.name
    }
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getLibraryArtist,
    fetchData (page) {
      this.getLibraryArtist({
        ...this.libraryArtistArgs,
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
