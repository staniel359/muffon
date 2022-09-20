<template>
  <div class="main-lyrics-container">
    <p
      class="lyrics"
      v-text="lyrics"
    />

    <div class="more-container">
      <strong
        class="main-link"
        @click="handleMoreClick"
        v-text="moreText"
      />
    </div>
  </div>

  <BaseTrackLyricsModal
    ref="modal"
    :track-id="trackId"
  />
</template>

<script>
import BaseTrackLyricsModal
  from '@/components/modals/track/BaseTrackLyricsModal.vue'

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
    moreText () {
      return this.$t(
        'more'
      )
    }
  },
  methods: {
    handleMoreClick () {
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

<style lang="sass" scoped>
.more-container
  margin-top: 1em
</style>
