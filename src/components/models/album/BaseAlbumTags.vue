<template>
  <BaseTagsList
    :tags="tags"
    :isMore="isMore"
    @viewMore="handleViewMore"
  />

  <AlbumTagsModal
    v-if="isRenderModal"
    ref="modal"
    :requestAlbumData="requestAlbumData"
  />
</template>

<script>
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'
import AlbumTagsModal from './BaseAlbumTags/AlbumTagsModal.vue'

export default {
  name: 'BaseAlbumTags',
  components: {
    BaseTagsList,
    AlbumTagsModal
  },
  props: {
    tags: Array,
    isMore: Boolean,
    requestAlbumData: Object
  },
  computed: {
    isRenderModal () {
      return this.isMore && this.tags.length
    }
  },
  methods: {
    handleViewMore () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
