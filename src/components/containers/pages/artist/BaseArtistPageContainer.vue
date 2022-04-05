<template>
  <BasePageContainer
    :responseData="artistData"
    :isLoading="isLoading"
    :error="pageError"
    @init="handleInit"
  >
    <slot
      :artistData="artistData"
      :artistName="artistNameFetched"
      :profileId="profileId"
      :topTrackCount="topTrackCount"
      :isLoading="isLoading"
      :error="error"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import { mapState } from 'vuex'
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
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    profileId () {
      return this.profileInfo.id.toString()
    },
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
    handleInit (el) {
      this.$emit('init', el)
    },
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleRequestArtistDataChange () {
      this.fetchData()
    },
    resetRequestArtistData () {
      this.setRequestArtistData({
        sourceId: 'lastfm',
        artistName: this.artistName
      })
    },
    setRequestArtistData (value) {
      if (value.sourceId === 'bandcamp') {
        this.getBandcampArtistId(value)
      } else {
        this.requestArtistData = value
      }
    },
    getBandcampArtistId,
    getArtist,
    fetchData (page) {
      this.getArtist({
        ...this.artistArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
