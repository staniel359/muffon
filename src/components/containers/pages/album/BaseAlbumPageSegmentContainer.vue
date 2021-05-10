<template>
  <BaseSegmentContainer
    :class="[
      'main-segment-container',
      'main-page-segment-container'
    ]"
    :isLoading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      :albumData="albumData"
      :requestAlbumData="requestAlbumData"
    ></slot>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import { setNavigationSections } from '#/actions/layout'
import {
  navigation as formatAlbumPageNavigation
} from '#/formatters/navigation/album'
import fetchAlbumData from '#/actions/api/album/fetchData'
import fetchBandcampAlbumIdData
  from '#/actions/api/album/id/bandcamp/fetchData'

export default {
  name: 'BaseAlbumPageSegmentContainer',
  components: {
    BaseSegmentContainer
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
    artistName: 'handleNavigationDataChange',
    albumTitle: 'handleNavigationDataChange'
  },
  methods: {
    handleRequestAlbumDataChange () {
      this.fetchData()
    },
    handleRefresh () {
      this.error = null

      this.fetchData()
    },
    handleNavigationDataChange () {
      !this.error && setNavigationSections(
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
