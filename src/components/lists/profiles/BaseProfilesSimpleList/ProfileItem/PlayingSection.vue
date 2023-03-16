<template>
  <div
    class="description playing-section"
  >
    <BaseIcon
      class="small"
      icon="play"
    />

    <small
      class="playing-section-content"
      v-text="playingFormatted"
    />
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'PlayingSection',
  components: {
    BaseIcon
  },
  props: {
    playing: {
      type: Object,
      required: true
    }
  },
  computed: {
    playingFormatted () {
      return [
        this.artistName,
        this.trackTitle
      ].join(
        ' - '
      )
    },
    artistName () {
      return this.playing.artist.name
    },
    trackTitle () {
      return this.playing.title
    }
  }
}
</script>

<style lang="sass" scoped>
.playing-section
  @extend .d-flex, .align-items-center
  margin-top: 0.5em !important

.playing-section-content
  margin-left: 0.2em
</style>
