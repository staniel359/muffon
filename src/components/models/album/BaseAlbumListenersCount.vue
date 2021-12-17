<template>
  <div v-if="isLoading">
    <div
      class="ui active mini inline loader"
    ></div>
  </div>
  <div
    v-else
    class="main-small-container"
  >
    <small>
      <i class="user icon"></i>
      <span>
        {{ listenersCountFormatted }}
      </span>
    </small>
  </div>
</template>

<script>
import getAlbum from '#/actions/api/album/get'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'BaseAlbumListenersCount',
  props: {
    artistName: {
      type: String,
      required: true
    },
    albumTitle: {
      type: String,
      required: true
    },
    listenersCount: Number
  },
  emits: [
    'loadEnd'
  ],
  data () {
    return {
      isLoading: false,
      error: null,
      albumData: null
    }
  },
  computed: {
    listenersCountFetched () {
      return (
        this.listenersCount ||
          this.albumData?.listeners_count ||
            0
      )
    },
    listenersCountFormatted () {
      return formatNumber(
        this.listenersCountFetched
      )
    },
    albumArgs () {
      return {
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        scope: 'listeners_count'
      }
    }
  },
  watch: {
    listenersCountFetched: 'handleListenersCountFetchedChange'
  },
  mounted () {
    if (!this.listenersCount) {
      this.fetchData()
    }
  },
  methods: {
    handleListenersCountFetchedChange (value) {
      this.$emit('loadEnd', value)
    },
    getAlbum,
    fetchData () {
      this.getAlbum(
        this.albumArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
