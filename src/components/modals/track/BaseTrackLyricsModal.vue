<template>
  <BaseTrackModalContainer
    ref="modal"
    :scope="scope"
    :request-track-data="requestTrackData"
  >
    <template
      #default="slotProps"
    >
      <ContentSection
        :lyrics="slotProps[scope]"
      />
    </template>
  </BaseTrackModalContainer>
</template>

<script>
import BaseTrackModalContainer
  from '@/components/containers/modals/track/BaseTrackModalContainer.vue'
import ContentSection from './BaseTrackLyricsModal/ContentSection.vue'

export default {
  name: 'BaseTrackLyricsModal',
  components: {
    BaseTrackModalContainer,
    ContentSection
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
        source: 'genius',
        trackId: this.trackId
      }
    }
  },
  methods: {
    show () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
