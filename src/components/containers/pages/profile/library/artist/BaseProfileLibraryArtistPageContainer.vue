<template>
  <BasePageContainer
    :response-data="libraryArtistData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :library-artist-data="libraryArtistData"
      :artist-name="artistName"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatProfileLibraryArtistPageNavigation
  from '*/helpers/formatters/navigation/profile/library/artist'
import formatProfileLibraryArtistPageTab
  from '*/helpers/formatters/tabs/profile/library/artist'
import getProfileLibraryArtist
  from '*/helpers/actions/api/profile/library/artist/get'

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
      type: String,
      required: true
    },
    artistId: {
      type: String,
      required: true
    },
    scope: String,
    limit: Number
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
        artistId: this.artistId,
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
      return this.libraryArtistData?.name
    },
    libraryArtistData () {
      return this.libraryData?.artist
    },
    libraryData () {
      return this.profileData?.library
    },
    profileLibraryArtistArgs () {
      return {
        profileId: this.profileId,
        artistId: this.artistId,
        scope: this.scope,
        limit: this.limit
      }
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
