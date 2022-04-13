<template>
  <div
    class="description main-small-container"
    :class="{
      link: isTracksActive
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <small>
      <i class="music icon" />

      <span
        v-text="tracksCount"
      />
    </small>
  </div>
</template>

<script>
export default {
  name: 'TracksSection',
  props: {
    albumData: {
      type: Object,
      required: true
    },
    isTracksActive: Boolean
  },
  emits: [
    'activeChange'
  ],
  computed: {
    tracksCount () {
      return this.albumData.tracks_count
    }
  },
  methods: {
    handleMouseEnter () {
      this.$emit(
        'activeChange',
        true
      )
    },
    handleMouseLeave () {
      this.$emit(
        'activeChange',
        false
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
