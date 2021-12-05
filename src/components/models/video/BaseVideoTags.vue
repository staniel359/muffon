<template>
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

<script>
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'
import BaseVideoTagsModal from '@/modals/video/BaseVideoTagsModal.vue'

export default {
  name: 'BaseVideoTags',
  components: {
    BaseTagsList,
    BaseVideoTagsModal
  },
  props: {
    tags: Array,
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
