<template>
  <div
    v-if="isLoading"
    class="ui active mini inline loader"
  />
  <BaseListCounterSection
    v-else-if="responseListenersCount"
    icon="listener"
    :count="responseListenersCount"
  />
</template>

<script>
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'
import getAlbum from '@/helpers/actions/api/album/get'

export default {
  name: 'BaseAlbumListenersCount',
  components: {
    BaseListCounterSection
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
