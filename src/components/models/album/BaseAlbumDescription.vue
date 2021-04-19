<template>
  <BaseDescription
    :description="description"
    :isMore="isMore"
    @viewMore="handleViewMore"
  />

  <AlbumDescriptionModal
    v-if="isMore"
    ref="modal"
    :requestAlbumData="requestAlbumData"
  />
</template>

<script>
import BaseDescription from '@/BaseDescription.vue'
import AlbumDescriptionModal
  from './BaseAlbumDescription/AlbumDescriptionModal.vue'

export default {
  name: 'BaseAlbumDescription',
  components: {
    BaseDescription,
    AlbumDescriptionModal
  },
  props: {
    description: String,
    isMore: Boolean,
    requestAlbumData: Object
  },
  methods: {
    handleViewMore () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
