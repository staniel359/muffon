<template>
  <div
    v-if="isLoading"
    class="ui active mini inline loader"
  />
  <div v-else>
    <small>
      <BaseIcon
        icon="user"
      />

      <span
        v-text="listenersCountFormatted"
      />
    </small>
  </div>
</template>

<script>
import BaseIcon from '*/components/BaseIcon.vue'
import getArtist from '*/helpers/actions/api/artist/get'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'BaseArtistListenersCount',
  components: {
    BaseIcon
  },
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
      artistData: null,
      isLoading: false,
      scope: 'listeners_count'
    }
  },
  computed: {
    responseListenersCount () {
      return (
        this.listenersCount ||
          this.artistListenersCount ||
          0
      )
    },
    artistListenersCount () {
      return this.artistData?.listeners_count
    },
    listenersCountFormatted () {
      return formatNumber(
        this.responseListenersCount
      )
    },
    artistArgs () {
      return {
        artistName: this.artistName,
        scope: this.scope
      }
    }
  },
  watch: {
    responseListenersCount: 'handleResponseListenersCountChange'
  },
  mounted () {
    if (!this.listenersCount) {
      this.getData()
    }
  },
  methods: {
    getArtist,
    handleResponseListenersCountChange (
      value
    ) {
      this.$emit(
        'loadEnd',
        value
      )
    },
    getData () {
      this.getArtist(
        this.artistArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
