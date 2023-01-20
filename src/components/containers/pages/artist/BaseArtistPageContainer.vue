<template>
  <BasePageContainer
    :response-data="artistData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :artist-data="artistData"
      :artist-name="responseArtistName"
      :top-track-count="topTrackCount"
      :is-loading="isLoading"
      :error="error"
      :response-page-limit="responsePageLimit"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import formatArtistPageNavigation from '@/helpers/formatters/navigation/artist'
import formatArtistPageTab from '@/helpers/formatters/tabs/artist'
import formatRequestArtistData from '@/helpers/formatters/request/artist/data'
import getArtist from '@/helpers/actions/api/artist/get'

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
      setRequestArtistData:
        this.setRequestArtistData,
      resetRequestArtistData:
        this.resetRequestArtistData
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
    'refresh'
  ],
  data () {
    return {
      artistData: null,
      requestArtistData: null,
      topTrackCount: null,
      error: null,
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
        artistName: this.responseArtistName,
        scope: this.scope
      }
    },
    tabData () {
      return formatArtistPageTab(
        this.navigationData
      )
    },
    responseArtistName () {
      return this.artistData?.name
    },
    artistArgs () {
      return {
        ...this.requestArtistData,
        scope: this.scope,
        limit: this.limit
      }
    },
    responsePageLimit () {
      if (this.isDiscogsSource) {
        return 25
      } else {
        return this.limit
      }
    },
    isDiscogsSource () {
      return (
        this.requestArtistData.source ===
          'discogs'
      )
    },
    sourceParams () {
      return {
        artistName: this.artistName
      }
    }
  },
  watch: {
    requestArtistData:
      'handleRequestArtistDataChange',
    artistData:
      'handleNavigationDataChange'
  },
  mounted () {
    this.resetRequestArtistData()

    this.getData()
  },
  methods: {
    getArtist,
    handleRequestArtistDataChange (
      value,
      oldValue
    ) {
      if (oldValue) {
        this.refresh()
      }
    },
    resetRequestArtistData () {
      this.requestArtistData =
        this.sourceParams
    },
    getData (
      {
        page
      } = {}
    ) {
      this.getArtist(
        {
          ...this.artistArgs,
          page
        }
      )
    },
    refresh () {
      this.$emit(
        'refresh'
      )
    },
    setRequestArtistData (
      value
    ) {
      this.requestArtistData =
        formatRequestArtistData(
          {
            artistData: value
          }
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
