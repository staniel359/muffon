<template>
  <div
    class="ui segment main-segment-container main-page-segment-container"
    :class="{ loading: isLoading }"
  >
    <BaseError
      v-if="error"
      :error="error"
      @refresh="handleRefresh"
    />
    <slot
      v-else
      :albumData="albumData"
      :requestAlbumData="requestAlbumData"
    ></slot>
  </div>
</template>

<script>
import BaseError from '@/BaseError.vue'
import { setNavigationSections } from '#/actions/layout'
import {
  navigation as formatAlbumPageNavigation
} from '#/formatters/navigation/album'
import fetchAlbumData from '#/actions/api/album/fetchData'
import fetchBandcampAlbumIdData
  from '#/actions/api/album/id/bandcamp/fetchData'

export default {
  name: 'BasePageSegmentContainer',
  components: {
    BaseError
  },
  provide () {
    return {
      setRequestAlbumData: this.setRequestAlbumData
    }
  },
  data () {
    return {
      isLoading: false,
      error: null,
      albumData: null,
      requestAlbumData: null
    }
  },
  computed: {
    artistName () {
      return this.albumData?.artist?.name
    },
    albumTitle () {
      return this.albumData?.title
    },
    navigationSections () {
      return formatAlbumPageNavigation({
        artistName: this.artistName,
        albumTitle: this.albumTitle
      })
    }
  },
  watch: {
    requestAlbumData: 'handleRequestAlbumDataChange',
    artistName: 'handleFullTitleChange',
    albumTitle: 'handleFullTitleChange'
  },
  methods: {
    handleRequestAlbumDataChange () {
      this.fetchData()
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
    setRequestAlbumData (value) {
      if (value.sourceId === 'bandcamp') {
        this.fetchBandcampAlbumIdData(value)
      } else {
        this.requestAlbumData = value
      }
    },
    fetchAlbumData,
    fetchData () {
      this.fetchAlbumData(
        this.requestAlbumData
      )
    },
    fetchBandcampAlbumIdData
  }
}
</script>

<style lang="sass" scoped></style>
