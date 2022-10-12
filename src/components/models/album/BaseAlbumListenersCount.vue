<template>
  <div
    v-if="isLoading"
    class="ui active mini inline loader"
  />
  <div
    v-else
  >
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
import BaseIcon from '@/components/icons/BaseIcon.vue'
import getAlbum from '@/helpers/actions/api/album/get'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'BaseAlbumListenersCount',
  components: {
    BaseIcon
  },
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
    responseListenersCount () {
      return (
        this.listenersCount ||
          this.albumListenersCount ||
          0
      )
    },
    albumListenersCount () {
      return this.albumData?.listeners_count
    },
    listenersCountFormatted () {
      return formatNumber(
        this.responseListenersCount
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
    responseListenersCount:
      'handleResponseListenersCountChange'
  },
  mounted () {
    if (!this.listenersCount) {
      this.getData()
    }
  },
  methods: {
    getAlbum,
    handleResponseListenersCountChange (
      value
    ) {
      this.$emit(
        'loadEnd',
        value
      )
    },
    getData () {
      this.getAlbum(
        this.albumArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
