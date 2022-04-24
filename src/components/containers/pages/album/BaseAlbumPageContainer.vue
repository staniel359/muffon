<template>
  <BasePageContainer
    :response-data="albumData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :album-data="albumData"
      :request-album-data="requestAlbumData"
      :is-loading="isLoading"
      :error="error"
    />
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
      requestAlbumData: null,
      error: null,
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
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        sourceParams: this.sourceParams,
        scope: this.scope
      }
    },
    tabData () {
      return formatAlbumPageTab(
        this.navigationData
      )
    },
    artistName () {
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
    albumTitle () {
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
    getBandcampAlbumId,
    getAlbum,
    handleRequestAlbumDataChange () {
      this.getData()
    },
    getData () {
      this.getAlbum(
        this.albumArgs
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
    resetRequestAlbumData () {
      this.setRequestAlbumData(
        this.sourceParams
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
