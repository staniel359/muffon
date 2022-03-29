<template>
  <BaseDescription
    :description="description"
    :isMore="isMore"
    @moreClick="handleMoreClick"
  />

  <BaseTrackDescriptionModal
    v-if="isMore"
    ref="modal"
    :requestTrackData="requestTrackData"
  />
</template>

<script>
import BaseDescription from '*/components/BaseDescription.vue'
import BaseTrackDescriptionModal
  from '*/components/modals/track/BaseTrackDescriptionModal.vue'

export default {
  name: 'BaseTrackDescription',
  components: {
    BaseDescription,
    BaseTrackDescriptionModal
  },
  props: {
    requestTrackData: Object,
    description: String,
    isMore: Boolean
  },
  methods: {
    handleMoreClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
