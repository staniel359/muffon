<template>
  <div class="main-lyrics-container">
    <p
      class="lyrics"
      v-text="lyrics"
    />

    <BaseMoreButton
      @click="handleMoreButtonClick"
    />
  </div>

  <BaseTrackLyricsModal
    ref="modal"
    :track-id="trackId"
  />
</template>

<script>
import BaseMoreButton from '@/components/buttons/BaseMoreButton.vue'
import BaseTrackLyricsModal
  from '@/components/modals/track/BaseTrackLyricsModal.vue'

export default {
  name: 'LyricsTextSection',
  components: {
    BaseMoreButton,
    BaseTrackLyricsModal
  },
  props: {
    lyrics: {
      type: String,
      required: true
    },
    trackId: Number
  },
  methods: {
    handleMoreButtonClick () {
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
