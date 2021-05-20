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
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/BasePageContainer.vue'
import { setNavigationSections } from '#/actions/layout'
import {
  navigation as formatAlbumPageNavigation
} from '#/formatters/navigation/album'
import fetchAlbumData from '#/actions/api/album/fetchData'

export default {
  name: 'BaseAlbumPageContainer',
  components: {
    BasePageContainer
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
      isLoading: false,
      error: null,
      albumData: null
    }
  },
  computed: {
    navigationSections () {
      return formatAlbumPageNavigation({
        artistName: this.artistNameFormatted,
        albumTitle: this.albumTitleFormatted,
        pageNameKey: this.pageNameKey
      })
    },
    artistNameFormatted () {
      return (
        this.albumData?.artist?.name ||
          this.artistName
      )
    },
    albumTitleFormatted () {
      return (
        this.albumData?.title ||
          this.albumTitle
      )
    },
    requestAlbumData () {
      return {
        artistName: this.artistNameFormatted,
        albumTitle: this.albumTitleFormatted
      }
    },
    albumDataArgs () {
      return {
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  watch: {
    artistNameFormatted: {
      immediate: true,
      handler: 'handleNavigationDataChange'
    },
    albumTitleFormatted: {
      immediate: true,
      handler: 'handleNavigationDataChange'
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleInit (el) {
      this.$emit('init', el)
    },
    handleRefresh (page) {
      this.error = null

      this.fetchData(page)
    },
    handleNavigationDataChange () {
      setNavigationSections(
        this.navigationSections
      )
    },
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
