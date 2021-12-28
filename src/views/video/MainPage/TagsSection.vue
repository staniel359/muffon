<template>
  <template v-if="tags.length">
    <BaseTagsList
      :tags="tags"
      :isMore="isMore"
      @moreClick="handleMoreClick"
    />

    <BaseVideoTagsModal
      v-if="isMore"
      ref="modal"
      :videoId="videoId"
    />
  </template>
</template>

<script>
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'
import BaseVideoTagsModal from '@/modals/video/BaseVideoTagsModal.vue'

export default {
  name: 'TagsSection',
  components: {
    BaseTagsList,
    BaseVideoTagsModal
  },
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  computed: {
    tags () {
      return this.videoData.tags
    },
    isMore () {
      return this.videoData.with_more?.tags
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
