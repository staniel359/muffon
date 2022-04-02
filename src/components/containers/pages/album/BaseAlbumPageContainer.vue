<template>
  <BasePageContainer
    :isShowLoader="!albumData"
    :isLoading="isLoading"
    :isError="!albumData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="albumData"
      :isLoading="isLoading"
      :error="error"
      :albumData="albumData"
      :requestAlbumData="requestAlbumData"
      :handleRefresh="handleRefresh"
      :profileId="profileId"
    ></slot>
  </BasePageContainer>
</template>

<script>
import { mapState } from 'vuex'
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatAlbumPageNavigation from '*/helpers/formatters/navigation/album'
import formatAlbumPageTab from '*/helpers/formatters/tabs/album'
import getAlbum from '*/helpers/actions/api/album/get'
import getBandcampAlbumId
  from '*/helpers/actions/api/bandcamp_id/album/get'
import { artistName as formatArtistName } from '*/helpers/formatters'

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
    artistName: {
      type: String,
      required: true
    },
    albumTitle: {
      type: String,
      required: true
    },
    sourceParams: {
      type: Object,
      required: true
    },
    scope: String,
    responsePageLimit: Number
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
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    profileId () {
      return this.profileInfo.id.toString()
    },
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
        limit: this.responsePageLimit
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
    handleRefresh (page) {
      this.fetchData(page)
    },
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
    setRequestAlbumData (value) {
      if (this.isGetBandcampAlbumId(value)) {
        this.getBandcampAlbumId(value)
      } else {
        this.requestAlbumData = value
      }
    },
    isGetBandcampAlbumId (value) {
      return (
        value.sourceId === 'bandcamp' &&
          !(
            value.albumId &&
              value.artistId
          )
      )
    },
    fetchData (page) {
      this.getAlbum({
        ...this.albumArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
