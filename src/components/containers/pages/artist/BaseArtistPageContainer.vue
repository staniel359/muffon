<template>
  <BasePageContainer
    :response-data="artistData"
    :is-loading="isLoading"
    :error="pageError"
    @init="handleInit"
  >
    <slot
      :artist-data="artistData"
      :artist-name="artistNameFetched"
      :top-track-count="topTrackCount"
      :is-loading="isLoading"
      :error="error"
      :fetch-data="fetchData"
      :refresh="refresh"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatArtistPageNavigation from '*/helpers/formatters/navigation/artist'
import formatArtistPageTab from '*/helpers/formatters/tabs/artist'
import getArtist from '*/helpers/actions/api/artist/get'
import getBandcampArtistId
  from '*/helpers/actions/api/bandcampId/artist/get'

export default {
  name: 'BaseArtistPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  provide () {
    return {
      setRequestArtistData: this.setRequestArtistData,
      resetRequestArtistData: this.resetRequestArtistData
    }
  },
  props: {
    artistName: {
      type: String,
      required: true
    },
    scope: String,
    limit: Number
  },
  emits: [
    'init'
  ],
  data () {
    return {
      error: null,
      artistData: null,
      requestArtistData: null,
      topTrackCount: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatArtistPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        artistName: this.artistNameFetched,
        scope: this.scope
      }
    },
    tabData () {
      return formatArtistPageTab(
        this.navigationData
      )
    },
    artistNameFetched () {
      return this.artistData?.name
    },
    artistArgs () {
      return {
        ...this.requestArtistData,
        scope: this.scope,
        limit: this.artistLimit
      }
    },
    artistLimit () {
      if (this.isDiscogsSource) {
        return 25
      } else {
        return this.limit
      }
    },
    isDiscogsSource () {
      return (
        this.requestArtistData.sourceId ===
          'discogs'
      )
    },
    pageError () {
      if (this.artistData) {
        return null
      } else {
        return this.error
      }
    }
  },
  watch: {
    requestArtistData: 'handleRequestArtistDataChange',
    artistData: 'handleNavigationDataChange'
  },
  mounted () {
    this.resetRequestArtistData()
  },
  methods: {
    handleInit (
      el
    ) {
      this.$emit(
        'init',
        el
      )
    },
    handleRequestArtistDataChange () {
      this.fetchData()
    },
    resetRequestArtistData () {
      this.setRequestArtistData(
        {
          sourceId: 'lastfm',
          artistName: this.artistName
        }
      )
    },
    setRequestArtistData (
      value
    ) {
      if (value.sourceId === 'bandcamp') {
        this.getBandcampArtistId(
          value
        )
      } else {
        this.requestArtistData = value
      }
    },
    getBandcampArtistId,
    getArtist,
    fetchData (
      page
    ) {
      this.getArtist(
        {
          ...this.artistArgs,
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
