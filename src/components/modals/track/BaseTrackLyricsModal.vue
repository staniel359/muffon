<template>
  <BaseTrackModalContainer
    ref="modal"
    sourceId="genius"
    :scope="scope"
    :requestTrackData="requestTrackData"
  >
    <template #default="slotProps">
      <div class="main-lyrics-container">
        <p class="lyrics">
          {{ slotProps[scope] }}
        </p>
      </div>
    </template>
  </BaseTrackModalContainer>
</template>

<script>
import BaseTrackModalContainer
  from '*/components/containers/modals/track/BaseTrackModalContainer.vue'

export default {
  name: 'BaseTrackLyricsModal',
  components: {
    BaseTrackModalContainer
  },
  props: {
    trackId: Number
  },
  data () {
    return {
      scope: 'lyrics'
    }
  },
  computed: {
    requestTrackData () {
      return {
        sourceId: 'genius',
        trackId: this.trackId
      }
    }
  },
  methods: {
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
