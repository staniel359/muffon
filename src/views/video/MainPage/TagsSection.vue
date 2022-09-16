<template>
  <BaseTagsSimpleList
    :tags="tags"
    :is-more="isMore"
    is-with-icon
    @more-click="handleMoreClick"
  />

  <BaseVideoTagsModal
    v-if="isMore"
    ref="modal"
    :video-id="videoId"
  />
</template>

<script>
import BaseTagsSimpleList from '*/components/lists/tags/BaseTagsSimpleList.vue'
import BaseVideoTagsModal
  from '*/components/modals/video/BaseVideoTagsModal.vue'

export default {
  name: 'TagsSection',
  components: {
    BaseTagsSimpleList,
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
      return this.videoData.source.id
    }
  },
  methods: {
    handleMoreClick () {
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
