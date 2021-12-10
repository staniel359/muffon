<template>
  <BaseTrackModalContainer
    ref="modal"
    scope="lyrics"
    sourceId="genius"
    :trackId="trackId"
  >
    <template #default="slotProps">
      <div class="main-lyrics-container">
        <p class="lyrics">
          {{ slotProps.lyrics }}
        </p>
      </div>
    </template>
  </BaseTrackModalContainer>
</template>

<script>
import BaseTrackModalContainer
  from '@/containers/modals/track/BaseTrackModalContainer.vue'

export default {
  name: 'BaseTrackLyricsModal',
  components: {
    BaseTrackModalContainer
  },
  props: {
    trackId: Number
  },
  methods: {
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
