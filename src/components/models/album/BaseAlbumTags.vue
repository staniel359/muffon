<template>
  <div
    v-if="tags?.length"
  >
    <BaseTagsSimpleList
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
  </div>
</template>

<script>
import BaseTagsSimpleList from '@/components/lists/tags/BaseTagsSimpleList.vue'
import BaseAlbumTagsModal
  from '@/components/modals/album/BaseAlbumTagsModal.vue'

export default {
  name: 'BaseAlbumTags',
  components: {
    BaseTagsSimpleList,
    BaseAlbumTagsModal
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    requestAlbumData: Object
  },
  computed: {
    tags () {
      return this.albumData.tags
    },
    isMore () {
      return this.albumData.with_more?.tags
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
