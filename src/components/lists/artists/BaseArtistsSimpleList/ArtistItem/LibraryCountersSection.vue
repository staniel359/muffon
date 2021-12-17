<template>
  <CounterBar
    scope="tracks"
    :artistData="artistData"
    :topCount="topTracksCount"
    :isActive="isTracksActive"
    @activeChange="handleTracksActiveChange"
  />

  <CounterBar
    scope="albums"
    :artistData="artistData"
    :topCount="topAlbumsCount"
    :isActive="isAlbumsActive"
    @activeChange="handleAlbumsActiveChange"
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
    handleTracksActiveChange (value) {
      this.$emit(
        'tracksActiveChange',
        value
      )
    },
    handleAlbumsActiveChange (value) {
      this.$emit(
        'albumsActiveChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
