<template>
  <BaseDescription
    :description="description"
    :isMore="isMore"
    @moreClick="handleMoreClick"
  />

  <BaseVideoDescriptionModal
    v-if="isMore"
    ref="modal"
    :videoId="videoId"
  />
</template>

<script>
import BaseDescription from '@/BaseDescription.vue'
import BaseVideoDescriptionModal
  from '@/modals/video/BaseVideoDescriptionModal.vue'

export default {
  name: 'BaseVideoDescription',
  components: {
    BaseDescription,
    BaseVideoDescriptionModal
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
