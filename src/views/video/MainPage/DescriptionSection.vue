<template>
  <template v-if="description">
    <BaseDivider />

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
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import BaseDescription from '*/components/BaseDescription.vue'
import BaseVideoDescriptionModal
  from '*/components/modals/video/BaseVideoDescriptionModal.vue'

export default {
  name: 'DescriptionSection',
  components: {
    BaseDivider,
    BaseDescription,
    BaseVideoDescriptionModal
  },
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  computed: {
    description () {
      return this.videoData.description
    },
    isMore () {
      return this.videoData.with_more?.description
    },
    videoId () {
      return this.videoData.youtube_id
    }
  },
  methods: {
    handleMoreClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
