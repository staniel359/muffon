<template>
  <div
    v-if="isLoading"
    class="ui active mini inline loader"
  ></div>
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
import getArtist from '*/helpers/actions/api/artist/get'
import { number as formatNumber } from '*/helpers/formatters'

export default {
  name: 'BaseArtistListenersCount',
  props: {
    artistName: {
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
      artistData: null
    }
  },
  computed: {
    listenersCountFetched () {
      return (
        this.listenersCount ||
          this.artistData?.listeners_count ||
            0
      )
    },
    listenersCountFormatted () {
      return formatNumber(
        this.listenersCountFetched
      )
    },
    artistArgs () {
      return {
        artistName: this.artistName,
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
    getArtist,
    fetchData () {
      this.getArtist(
        this.artistArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
