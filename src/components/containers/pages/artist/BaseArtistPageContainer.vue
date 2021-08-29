<template>
  <BasePageContainer
    :isShowLoader="!artistData"
    :isLoading="isLoading"
    :isError="!artistData && !!error"
    :error="pageError"
    @init="handleInit"
    @refresh="handleRefresh"
  >
    <slot
      v-if="artistData"
      :isLoading="isLoading"
      :error="error"
      :artistData="artistData"
      :artistName="artistNameFetched"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
      :topTrackCount="topTrackCount"
      :profileId="profileId"
      :libraryId="libraryId"
    ></slot>
  </BasePageContainer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BasePageContainer from '@/containers/BasePageContainer.vue'
import formatArtistPageNavigation from '#/formatters/navigation/artist'
import formatArtistPageTab from '#/formatters/tabs/artist'
import fetchArtistData from '#/actions/api/artist/fetchData'
import fetchBandcampArtistIdData
  from '#/actions/api/artist/id/bandcamp/fetchData'
import { updateTab } from '#/actions'

export default {
  name: 'BaseArtistPageContainer',
  components: {
    BasePageContainer
  },
  provide () {
    return {
      setRequestArtistData: this.setRequestArtistData,
      resetRequestArtistData: this.resetRequestArtistData
    }
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
      error: null,
      artistData: null,
      requestArtistData: null,
      topTrackCount: null,
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
        ...this.requestArtistData,
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
    },
    libraryId () {
      return this.artistData?.library_id?.toString()
    }
  },
  watch: {
    requestArtistData: 'handleRequestArtistDataChange',
    artistData: 'handleArtistDataChange'
  },
  mounted () {
    this.resetRequestArtistData()
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
    handleRequestArtistDataChange () {
      this.fetchData()
    },
    resetRequestArtistData () {
      this.setRequestArtistData({
        sourceId: 'lastfm',
        artistName: this.artistName
      })
    },
    setRequestArtistData (value) {
      if (value.sourceId === 'bandcamp') {
        this.fetchBandcampArtistIdData(value)
      } else {
        this.requestArtistData = value
      }
    },
    fetchBandcampArtistIdData,
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
