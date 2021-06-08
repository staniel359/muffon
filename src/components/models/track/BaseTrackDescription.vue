<template>
  <BaseDescription
    :description="description"
    :isMore="isMore"
    @moreClick="handleMoreClick"
  />

  <TrackDescriptionModal
    v-if="isMore"
    ref="modal"
    :artistName="artistName"
    :trackTitle="trackTitle"
  />
</template>

<script>
import BaseDescription from '@/BaseDescription.vue'
import TrackDescriptionModal
  from './BaseTrackDescription/TrackDescriptionModal.vue'

export default {
  name: 'BaseTrackDescription',
  components: {
    BaseDescription,
    TrackDescriptionModal
  },
  props: {
    description: String,
    isMore: Boolean,
    artistName: String,
    trackTitle: String
  },
  methods: {
    handleMoreClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
