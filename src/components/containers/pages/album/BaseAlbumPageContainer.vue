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
import BasePageContainer from '@/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatAlbumPageNavigation from '#/formatters/navigation/album'
import formatAlbumPageTab from '#/formatters/tabs/album'
import fetchAlbumData from '#/actions/api/album/fetchData'
import fetchBandcampAlbumIdData
  from '#/actions/api/album/id/bandcamp/fetchData'

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
    responsePageLimit: Number,
    pageNameKey: String
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
        pageNameKey: this.pageNameKey
      }
    },
    tabData () {
      return formatAlbumPageTab(
        this.navigationData
      )
    },
    artistNameFetched () {
      return this.albumData?.artist?.name
    },
    albumTitleFetched () {
      return this.albumData?.title
    },
    albumDataArgs () {
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
    fetchBandcampAlbumIdData,
    fetchAlbumData,
    resetRequestAlbumData () {
      this.setRequestAlbumData(
        this.sourceParams
      )
    },
    setRequestAlbumData (value) {
      if (this.isFetchBandcampAlbumIdData(value)) {
        this.fetchBandcampAlbumIdData(value)
      } else {
        this.requestAlbumData = value
      }
    },
    isFetchBandcampAlbumIdData (value) {
      return (
        value.sourceId === 'bandcamp' &&
          !(
            value.albumId &&
              value.artistId
          )
      )
    },
    fetchData (page) {
      this.fetchAlbumData({
        ...this.albumDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
