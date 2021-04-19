<template>
  <div ref="container">
    <BaseError
      v-if="error"
      :error="error"
      @refresh="handleRefresh"
    />
    <slot
      v-else-if="artistData"
      :isLoading="isLoading"
      :error="error"
      :artistData="artistData"
      :artistName="artistName"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
      :topTrackCount="topTrackCount"
    ></slot>
  </div>
</template>

<script>
import BaseError from '@/BaseError.vue'
import pageLoadableMixin from '#/mixins/pageLoadable'
import { setNavigationSections } from '#/actions/layout'
import {
  navigation as formatArtistPageNavigation
} from '#/formatters/navigation/artist'
import fetchArtistData from '#/actions/api/artist/fetchData'

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
      artistData: null,
      topTrackCount: null
    }
  },
  computed: {
    isShowLoader () {
      return !this.artistData
    },
    artistName () {
      return (
        this.artistData?.name ||
          this.$route.params.artistName
      )
    },
    navigationSections () {
      return formatArtistPageNavigation({
        artistName: this.artistName,
        pageNameKey: this.pageNameKey
      })
    },
    artistDataArgs () {
      return {
        artistName: this.artistName,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  methods: {
    handleRefresh () {
      this.error = null

      this.fetchData()
    },
    handleArtistNameChange () {
      this.setNavigation()
    },
    setNavigation () {
      setNavigationSections(
        this.navigationSections
      )
    },
    fetchArtistData,
    fetchData (page) {
      this.fetchArtistData({
        ...this.artistDataArgs,
        page
      })
    }
  },
  watch: {
    artistName: {
      immediate: true,
      handler: 'handleArtistNameChange'
    }
  },
  mounted () {
    this.$emit('init', this.$refs.container)

    this.fetchData()
  }
}
</script>

<style lang="sass" scoped></style>
