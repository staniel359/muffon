<template>
  <div :class="[
    'description',
    'library-counters-container',
    'main-small-container'
  ]">
    <small
      class="tracks-counter"
      :class="{ link: isTracksActive }"
      @mouseenter="handleTracksMouseEnter"
      @mouseleave="handleTracksMouseLeave"
    >
      <i class="music icon class"></i>
      <span>
        {{ tracksCount }}
      </span>
    </small>

    <small
      :class="{ link: isAlbumsActive }"
      @mouseenter="handleAlbumsMouseEnter"
      @mouseleave="handleAlbumsMouseLeave"
    >
      <i class="record vinyl icon class"></i>
      <span>
        {{ albumsCount }}
      </span>
    </small>
  </div>
</template>

<script>
export default {
  name: 'LibraryCountersSection',
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isTracksActive: Boolean,
    isAlbumsActive: Boolean
  },
  emits: [
    'tracksActiveChange',
    'albumsActiveChange'
  ],
  computed: {
    tracksCount () {
      return this.artistData.tracks_count
    },
    albumsCount () {
      return this.artistData.albums_count
    }
  },
  methods: {
    handleTracksMouseEnter () {
      this.$emit(
        'tracksActiveChange',
        true
      )
    },
    handleTracksMouseLeave () {
      this.$emit(
        'tracksActiveChange',
        false
      )
    },
    handleAlbumsMouseEnter () {
      this.$emit(
        'albumsActiveChange',
        true
      )
    },
    handleAlbumsMouseLeave () {
      this.$emit(
        'albumsActiveChange',
        false
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.library-counters-container
  @extend .d-flex, .justify-content-center
  .tracks-counter
    margin-right: 0.5em
</style>
