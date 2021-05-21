<template>
  <div
    v-if="isLoading"
    class="ui active mini inline loader"
  ></div>
  <small v-else>
    {{ listenersCountFormatted }}
  </small>
</template>

<script>
import fetchAlbumData from '#/actions/api/album/fetchData'
import { listenersCount as listenersCountDecorated } from '#/decorators'

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
    }
  },
  data () {
    return {
      isLoading: false,
      error: null,
      albumData: null
    }
  },
  computed: {
    listenersCount () {
      return this.albumData?.listeners_count || 0
    },
    listenersCountFormatted () {
      return listenersCountDecorated(
        this.listenersCount
      )
    },
    albumDataArgs () {
      return {
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        scope: 'listeners_count'
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchAlbumData,
    fetchData () {
      this.fetchAlbumData(this.albumDataArgs)
    }
  }
}
</script>

<style lang="sass" scoped></style>
