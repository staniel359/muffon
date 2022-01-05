<template>
  <BaseTagsList
    :tags="tags"
    :isMore="isMore"
    isWithIcon
    @moreClick="handleMoreClick"
  />

  <BaseAlbumTagsModal
    v-if="isMore"
    ref="modal"
    :requestAlbumData="requestAlbumData"
  />
</template>

<script>
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'
import BaseAlbumTagsModal from '@/modals/album/BaseAlbumTagsModal.vue'

export default {
  name: 'BaseAlbumTags',
  components: {
    BaseTagsList,
    BaseAlbumTagsModal
  },
  props: {
    tags: Array,
    isMore: Boolean,
    requestAlbumData: Object
  },
  methods: {
    handleMoreClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
