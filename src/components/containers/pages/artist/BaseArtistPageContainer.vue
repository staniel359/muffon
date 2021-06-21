<template>
  <BasePageContainer
    :isShowLoader="!artistData"
    :isLoading="isLoading"
    :error="pageError"
    @init="handleInit"
    @refresh="handleRefresh"
  >
    <slot
      v-if="artistData"
      :isLoading="isLoading"
      :error="error"
      :artistData="artistData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
      :topTrackCount="topTrackCount"
    ></slot>
  </BasePageContainer>
</template>

<script>
import { mapActions } from 'vuex'
import BasePageContainer from '@/containers/BasePageContainer.vue'
import formatArtistPageNavigation from '#/formatters/navigation/artist'
import formatArtistPageTab from '#/formatters/tabs/artist'
import fetchArtistData from '#/actions/api/artist/fetchData'
import { updateTab } from '#/actions'

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
      return formatArtistPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        artistName: this.artistNameFetched,
        pageNameKey: this.pageNameKey
      }
    },
    artistNameFetched () {
      return this.artistData?.name
    },
    artistDataArgs () {
      return {
        artistName: this.artistName,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    },
    pageError () {
      if (this.artistData) {
        return null
      } else {
        return this.error
      }
    }
  },
  watch: {
    artistData: 'handleArtistDataChange'
  },
  mounted () {
    this.fetchData()
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
    handleArtistDataChange () {
      this.setNavigationSections(
        this.navigationSections
      )

      updateTab(
        formatArtistPageTab(
          this.navigationData
        )
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
