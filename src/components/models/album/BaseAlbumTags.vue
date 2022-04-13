<template>
  <BaseTagsList
    :tags="tags"
    :is-more="isMore"
    is-with-icon
    @more-click="handleMoreClick"
  />

  <BaseAlbumTagsModal
    v-if="isMore"
    ref="modal"
    :request-album-data="requestAlbumData"
  />
</template>

<script>
import BaseTagsList from '*/components/lists/tags/BaseTagsList.vue'
import BaseAlbumTagsModal
  from '*/components/modals/album/BaseAlbumTagsModal.vue'

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
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
