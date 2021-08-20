<template>
  <div :class="[
    'description',
    'library-counters-container',
    'main-small-container'
  ]">
    <div></div>

    <small
      v-if="isWithTracksCount"
      :class="{ link: isTracksLinkActive }"
      @mouseenter="handleTracksLinkMouseEnter"
      @mouseleave="handleTracksLinkMouseLeave"
    >
      <i class="music icon class"></i>
      <span>
        {{ tracksCount }}
      </span>
    </small>

    <small
      v-if="isWithAlbumsCount"
      :class="{ link: isAlbumsLinkActive }"
      @mouseenter="handleAlbumsLinkMouseEnter"
      @mouseleave="handleAlbumsLinkMouseLeave"
    >
      <i class="record vinyl icon class"></i>
      <span>
        {{ albumsCount }}
      </span>
    </small>

    <div></div>
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
    isWithTracksCount: Boolean,
    isWithAlbumsCount: Boolean
  },
  emits: [
    'tracksLinkActiveChange',
    'albumsLinkActiveChange'
  ],
  data () {
    return {
      isTracksLinkActive: false,
      isAlbumsLinkActive: false
    }
  },
  computed: {
    tracksCount () {
      return this.artistData.tracks_count
    },
    albumsCount () {
      return this.artistData.albums_count
    }
  },
  methods: {
    handleTracksLinkMouseEnter () {
      this.isTracksLinkActive = true

      this.$emit(
        'tracksLinkActiveChange',
        true
      )
    },
    handleTracksLinkMouseLeave () {
      this.isTracksLinkActive = false

      this.$emit(
        'tracksLinkActiveChange',
        false
      )
    },
    handleAlbumsLinkMouseEnter () {
      this.isAlbumsLinkActive = true

      this.$emit(
        'albumsLinkActiveChange',
        true
      )
    },
    handleAlbumsLinkMouseLeave () {
      this.isAlbumsLinkActive = false

      this.$emit(
        'albumsLinkActiveChange',
        false
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.library-counters-container
  @extend .d-flex, .justify-content-space-evenly
</style>
