<template>
  <div class="main-lyrics-container">
    <p class="lyrics">
      {{ lyrics }}
    </p>

    <strong
      class="main-link"
      @click="handleMoreClick"
    >
      {{ moreFormatted }}
    </strong>
  </div>

  <BaseTrackLyricsModal
    ref="modal"
    :trackId="trackId"
  />
</template>

<script>
import BaseTrackLyricsModal from '@/modals/track/BaseTrackLyricsModal.vue'

export default {
  name: 'LyricsData',
  components: {
    BaseTrackLyricsModal
  },
  props: {
    lyrics: {
      type: String,
      required: true
    },
    trackId: Number
  },
  computed: {
    moreFormatted () {
      return this.$t(
        'shared.more'
      )
    }
  },
  methods: {
    handleMoreClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
