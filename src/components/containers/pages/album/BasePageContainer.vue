<template>
  <div ref="container">
    <BaseError
      v-if="error"
      :error="error"
      @refresh="handleRefresh"
    />
    <slot
      v-else-if="albumData"
      :isLoading="isLoading"
      :error="error"
      :albumData="albumData"
      :requestAlbumData="requestAlbumData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </div>
</template>

<script>
import BaseError from '@/BaseError.vue'
import pageLoadableMixin from '#/mixins/pageLoadable'
import { setNavigationSections } from '#/actions/layout'
import {
  navigation as formatAlbumPageNavigation
} from '#/formatters/navigation/album'
import fetchAlbumData from '#/actions/api/album/fetchData'

export default {
  name: 'BasePageContainer',
  components: {
    BaseError
  },
  mixins: [
    pageLoadableMixin
  ],
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
      container: null,
      isLoading: false,
      error: null,
      albumData: null
    }
  },
  computed: {
    isShowLoader () {
      return !this.albumData
    },
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
    this.$emit('init', this.$refs.container)

    this.fetchData()
  },
  methods: {
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
