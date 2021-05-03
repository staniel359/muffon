<template>
  <BasePageContainer
    :isShowLoader="!artistData"
    :isLoading="isLoading"
    :error="error"
    @init="handleInit"
    @refresh="handleRefresh"
  >
    <slot
      v-if="artistData"
      :isLoading="isLoading"
      :error="error"
      :artistData="artistData"
      :artistName="artistNameFormatted"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
      :topTrackCount="topTrackCount"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/BasePageContainer.vue'
import { setNavigationSections } from '#/actions/layout'
import {
  navigation as formatArtistPageNavigation
} from '#/formatters/navigation/artist'
import fetchArtistData from '#/actions/api/artist/fetchData'

export default {
  name: 'BaseArtistPageContainer',
  components: {
    BasePageContainer
  },
  props: {
    artistName: {
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
      artistData: null,
      topTrackCount: null
    }
  },
  computed: {
    navigationSections () {
      return formatArtistPageNavigation({
        artistName: this.artistNameFormatted,
        pageNameKey: this.pageNameKey
      })
    },
    artistNameFormatted () {
      return (
        this.artistData?.name ||
          this.artistName
      )
    },
    artistDataArgs () {
      return {
        artistName: this.artistName,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  watch: {
    artistNameFormatted: {
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
    handleRefresh () {
      this.error = null

      this.fetchData()
    },
    handleNavigationDataChange () {
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
  }
}
</script>

<style lang="sass" scoped></style>
