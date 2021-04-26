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
    artistName () {
      return (
        this.albumData?.artist?.name ||
          this.$route.params.artistName
      )
    },
    albumTitle () {
      return (
        this.albumData?.title ||
          this.$route.params.albumTitle
      )
    },
    navigationSections () {
      return formatAlbumPageNavigation({
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        pageNameKey: this.pageNameKey
      })
    },
    requestAlbumData () {
      return {
        artistName: this.artistName,
        albumTitle: this.albumTitle
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
    artistName: {
      immediate: true,
      handler: 'handleFullTitleChange'
    },
    albumTitle: {
      immediate: true,
      handler: 'handleFullTitleChange'
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleInit (el) {
      this.$emit('init', el)
    },
    handleRefresh () {
      this.error = null

      this.fetchData()
    },
    handleFullTitleChange () {
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
