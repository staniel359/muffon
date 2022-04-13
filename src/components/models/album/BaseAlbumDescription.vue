<template>
  <BaseDescription
    :description="description"
    :is-more="isMore"
    @more-click="handleMoreClick"
  />

  <BaseAlbumDescriptionModal
    v-if="isMore"
    ref="modal"
    :request-album-data="requestAlbumData"
  />
</template>

<script>
import BaseDescription from '*/components/BaseDescription.vue'
import BaseAlbumDescriptionModal
  from '*/components/modals/album/BaseAlbumDescriptionModal.vue'

export default {
  name: 'BaseAlbumDescription',
  components: {
    BaseDescription,
    BaseAlbumDescriptionModal
  },
  props: {
    description: String,
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
