<template>
  <BasePageContainer
    :response-data="artistData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :artist-data="artistData"
      :top-tracks-count="topTracksCount"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import formatProfileLibraryArtistPageNavigation
  from '@/helpers/formatters/navigation/profile/library/artist'
import formatProfileLibraryArtistPageTab
  from '@/helpers/formatters/tabs/profile/library/artist'
import getProfileLibraryArtist
  from '@/helpers/actions/api/profile/library/artist/get'

export default {
  name: 'BaseProfileLibraryArtistPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
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
    scope: String,
    limit: Number,
    order: String
  },
  data () {
    return {
      profileData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatProfileLibraryArtistPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        profileId: this.profileId,
        profileNickname: this.profileNickname,
        libraryArtistId: this.libraryArtistId,
        artistName: this.artistName,
        scope: this.scope
      }
    },
    tabData () {
      return formatProfileLibraryArtistPageTab(
        this.navigationData
      )
    },
    profileNickname () {
      return this.profileData?.nickname
    },
    artistName () {
      return this.artistData?.name
    },
    artistData () {
      return this.libraryData?.artist
    },
    libraryData () {
      return this.profileData?.library
    },
    profileLibraryArtistArgs () {
      return {
        profileId: this.profileId,
        libraryArtistId: this.libraryArtistId,
        scope: this.scope,
        limit: this.limit,
        order: this.order
      }
    },
    topTracksCount () {
      return this.libraryData?.top_tracks_count
    }
  },
  watch: {
    profileData: 'handleNavigationDataChange'
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
          ...this.profileLibraryArtistArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
