<template>
  <BaseDescription
    :description="description"
    :isMore="isMore"
    @moreClick="handleMoreClick"
  />

  <BaseTrackDescriptionModal
    v-if="isMore"
    ref="modal"
    :artistName="artistName"
    :trackTitle="trackTitle"
  />
</template>

<script>
import BaseDescription from '@/BaseDescription.vue'
import BaseTrackDescriptionModal
  from '@/modals/track/BaseTrackDescriptionModal.vue'

export default {
  name: 'BaseTrackDescription',
  components: {
    BaseDescription,
    BaseTrackDescriptionModal
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
