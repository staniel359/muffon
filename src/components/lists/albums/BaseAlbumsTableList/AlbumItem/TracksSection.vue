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
      <BaseIcon
        icon="music"
      />

      <span
        v-text="tracksCount"
      />
    </small>
  </div>
</template>

<script>
import BaseIcon from '*/components/BaseIcon.vue'

export default {
  name: 'TracksSection',
  components: {
    BaseIcon
  },
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
