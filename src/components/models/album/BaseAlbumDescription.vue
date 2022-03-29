<template>
  <BaseDescription
    :description="description"
    :isMore="isMore"
    @moreClick="handleMoreClick"
  />

  <BaseAlbumDescriptionModal
    v-if="isMore"
    ref="modal"
    :requestAlbumData="requestAlbumData"
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
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
