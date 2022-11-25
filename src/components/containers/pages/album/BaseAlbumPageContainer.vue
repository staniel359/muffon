<template>
  <BasePageContainer
    :response-data="albumData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :album-data="albumData"
      :request-album-data="requestAlbumData"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import formatAlbumPageNavigation from '@/helpers/formatters/navigation/album'
import formatAlbumPageTab from '@/helpers/formatters/tabs/album'
import formatRequestAlbumData from '@/helpers/formatters/request/album/data'
import getAlbum from '@/helpers/actions/api/album/get'

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
      setRequestAlbumData:
        this.setRequestAlbumData,
      resetRequestAlbumData:
        this.resetRequestAlbumData
    }
  },
  props: {
    sourceParams: {
      type: Object,
      required: true
    },
    scope: String,
    limit: Number
  },
  data () {
    return {
      albumData: null,
      requestAlbumData: null,
      error: null,
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
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        sourceParams:
          this.requestAlbumData,
        scope: this.scope
      }
    },
    artistName () {
      return this.albumData?.artist?.name
    },
    albumTitle () {
      return this.albumData?.title
    },
    tabData () {
      return formatAlbumPageTab(
        this.navigationData
      )
    },
    albumArgs () {
      return {
        ...this.requestAlbumData,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  watch: {
    requestAlbumData:
      'handleRequestAlbumDataChange',
    albumData:
      'handleNavigationDataChange'
  },
  mounted () {
    this.resetRequestAlbumData()
  },
  methods: {
    getAlbum,
    handleRequestAlbumDataChange () {
      this.getData()
    },
    resetRequestAlbumData () {
      this.setRequestAlbumData(
        this.sourceParams
      )
    },
    getData () {
      this.getAlbum(
        this.albumArgs
      )
    },
    setRequestAlbumData (
      value
    ) {
      this.requestAlbumData =
        formatRequestAlbumData(
          {
            albumData: value
          }
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
