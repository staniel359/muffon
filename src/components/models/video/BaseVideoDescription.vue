<template>
  <BaseDescription
    :description="description"
    :isMore="isMore"
    @moreClick="handleMoreClick"
  />

  <VideoDescriptionModal
    v-if="isMore"
    ref="modal"
    :videoId="videoId"
  />
</template>

<script>
import BaseDescription from '@/BaseDescription.vue'
import VideoDescriptionModal
  from './BaseVideoDescription/VideoDescriptionModal.vue'

export default {
  name: 'BaseVideoDescription',
  components: {
    BaseDescription,
    VideoDescriptionModal
  },
  props: {
    description: String,
    isMore: Boolean,
    videoId: String
  },
  methods: {
    handleMoreClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
