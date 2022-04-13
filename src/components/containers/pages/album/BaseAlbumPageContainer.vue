<template>
  <BasePageContainer
    :response-data="albumData"
    :is-loading="isLoading"
    :error="error"
  >
    <template #default="slotProps">
      <slot
        :album-data="albumData"
        :request-album-data="requestAlbumData"
        :profile-id="slotProps.profileId"
        :is-loading="isLoading"
        :error="error"
        :refresh="refresh"
      />
    </template>
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatAlbumPageNavigation from '*/helpers/formatters/navigation/album'
import formatAlbumPageTab from '*/helpers/formatters/tabs/album'
import getAlbum from '*/helpers/actions/api/album/get'
import getBandcampAlbumId
  from '*/helpers/actions/api/bandcampId/album/get'
import {
  artistName as formatArtistName
} from '*/helpers/formatters'

export default {
  name: 'BaseAlbumPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  provide () {
    return {
      setRequestAlbumData: this.setRequestAlbumData,
      resetRequestAlbumData: this.resetRequestAlbumData
    }
  },
  props: {
    sourceParams: {
      type: Object,
      required: true
    },
    scope: String,
    limit: Number
  },
  data () {
    return {
      albumData: null,
      error: null,
      requestAlbumData: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatAlbumPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        artistName: this.artistNameFetched,
        albumTitle: this.albumTitleFetched,
        sourceParams: this.sourceParams,
        scope: this.scope
      }
    },
    tabData () {
      return formatAlbumPageTab(
        this.navigationData
      )
    },
    artistNameFetched () {
      if (this.artists) {
        return formatArtistName(
          this.artists
        )
      } else {
        return null
      }
    },
    artists () {
      return this.albumData?.artists
    },
    albumTitleFetched () {
      return this.albumData?.title
    },
    albumArgs () {
      return {
        ...this.requestAlbumData,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  watch: {
    requestAlbumData: 'handleRequestAlbumDataChange',
    albumData: 'handleNavigationDataChange'
  },
  mounted () {
    this.resetRequestAlbumData()
  },
  methods: {
    handleRequestAlbumDataChange () {
      this.fetchData()
    },
    getBandcampAlbumId,
    getAlbum,
    resetRequestAlbumData () {
      this.setRequestAlbumData(
        this.sourceParams
      )
    },
    setRequestAlbumData (
      value
    ) {
      if (this.isGetBandcampAlbumId(
        value
      )) {
        this.getBandcampAlbumId(
          value
        )
      } else {
        this.requestAlbumData = value
      }
    },
    isGetBandcampAlbumId (
      value
    ) {
      return (
        value.sourceId === 'bandcamp' &&
          !(
            value.albumId &&
              value.artistId
          )
      )
    },
    fetchData (
      page
    ) {
      this.getAlbum(
        {
          ...this.albumArgs,
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
