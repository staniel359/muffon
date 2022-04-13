<template>
  <div v-if="isLoading">
    <div
      class="ui active mini inline loader"
    />
  </div>
  <div
    v-else
    class="main-small-container"
  >
    <small>
      <i class="user icon" />

      <span
        v-text="listenersCountFormatted"
      />
    </small>
  </div>
</template>

<script>
import getAlbum from '*/helpers/actions/api/album/get'
import {
  number as formatNumber
} from '*/helpers/formatters'

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
      albumData: null,
      isLoading: false,
      scope: 'listeners_count'
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
        scope: this.scope
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
    handleListenersCountFetchedChange (
      value
    ) {
      this.$emit(
        'loadEnd',
        value
      )
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
