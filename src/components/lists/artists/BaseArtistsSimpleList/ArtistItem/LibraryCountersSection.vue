<template>
  <CounterBar
    scope="tracks"
    :artist-data="artistData"
    :top-count="topTracksCount"
    :is-active="isTracksActive"
    @active-change="handleTracksActiveChange"
  />

  <CounterBar
    scope="albums"
    :artist-data="artistData"
    :top-count="topAlbumsCount"
    :is-active="isAlbumsActive"
    @active-change="handleAlbumsActiveChange"
  />
</template>

<script>
import CounterBar from './LibraryCountersSection/CounterBar.vue'

export default {
  name: 'LibraryCountersSection',
  components: {
    CounterBar
  },
  props: {
    artistData: Object,
    topTracksCount: Number,
    topAlbumsCount: Number,
    isTracksActive: Boolean,
    isAlbumsActive: Boolean
  },
  emits: [
    'tracksActiveChange',
    'albumsActiveChange'
  ],
  methods: {
    handleTracksActiveChange (
      value
    ) {
      this.$emit(
        'tracksActiveChange',
        value
      )
    },
    handleAlbumsActiveChange (
      value
    ) {
      this.$emit(
        'albumsActiveChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
