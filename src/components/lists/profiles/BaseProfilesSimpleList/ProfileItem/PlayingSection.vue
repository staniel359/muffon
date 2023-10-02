<template>
  <div
    class="description right middle-aligned"
  >
    <BaseIcon
      class="small main-icon"
      icon="play"
    />

    <div class="main-right-extrasmall-section">
      <small
        v-text="playingFormatted"
      />
    </div>
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
  margin: 0 1rem !important
</style>
