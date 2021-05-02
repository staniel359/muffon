<template>
  <div class="main-lyrics-container">
    <p class="lyrics">
      {{ lyrics }}
    </p>

    <a
      class="main-link"
      href=""
      @click.prevent="handleViewMore"
    >
      {{ readMoreFormatted }}
    </a>
  </div>

  <BaseTrackLyricsModal
    ref="modal"
    :trackId="trackId"
  />
</template>

<script>
import BaseTrackLyricsModal from '@/models/track/BaseTrackLyricsModal.vue'
import { localize } from '#/actions/plugins/i18n'

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
    trackId: String
  },
  computed: {
    readMoreFormatted () {
      return localize('shared.readMore')
    }
  },
  methods: {
    handleViewMore () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
