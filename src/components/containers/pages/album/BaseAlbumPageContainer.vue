<template>
  <BasePageContainer
    :isShowLoader="!albumData"
    :isLoading="isLoading"
    :error="error"
    @init="handleInit"
    @refresh="handleRefresh"
  >
    <slot
      v-if="albumData"
      :isLoading="isLoading"
      :error="error"
      :albumData="albumData"
      :requestAlbumData="requestAlbumData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import { mapActions } from 'vuex'
import BasePageContainer from '@/containers/BasePageContainer.vue'
import formatAlbumPageNavigation from '#/formatters/navigation/album'
import formatAlbumPageTab from '#/formatters/tabs/album'
import fetchAlbumData from '#/actions/api/album/fetchData'
import fetchBandcampAlbumIdData
  from '#/actions/api/album/id/bandcamp/fetchData'
import { updateTab } from '#/actions'

export default {
  name: 'BaseAlbumPageContainer',
  components: {
    BasePageContainer
  },
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
    scope: String,
    responsePageLimit: Number,
    pageNameKey: String
  },
  emits: [
    'init'
  ],
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
        pageNameKey: this.pageNameKey
      }
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
    albumData: 'handleAlbumDataChange'
  },
  mounted () {
    this.resetRequestAlbumData()
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ]),
    handleInit (el) {
      this.$emit('init', el)
    },
    handleRefresh (page) {
      this.error = null

      this.fetchData(page)
    },
    handleAlbumDataChange () {
      this.setNavigationSections(
        this.navigationSections
      )

      updateTab(
        formatAlbumPageTab(
          this.navigationData
        )
      )
    },
    handleRequestAlbumDataChange () {
      this.fetchData()
    },
    resetRequestAlbumData () {
      this.setRequestAlbumData({
        artistName: this.artistName,
        albumTitle: this.albumTitle
      })
    },
    setRequestAlbumData (value) {
      if (value.sourceId === 'bandcamp') {
        this.fetchBandcampAlbumIdData(value)
      } else {
        this.requestAlbumData = value
      }
    },
    fetchBandcampAlbumIdData,
    fetchAlbumData,
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
