<template>
  <template
    v-if="description"
  >
    <BaseDivider />

    <BaseDescriptionSection
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
</template>

<script>
import BaseDivider from '@/components/BaseDivider.vue'
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'
import BaseAlbumDescriptionModal
  from '@/components/modals/album/BaseAlbumDescriptionModal.vue'

export default {
  name: 'BaseAlbumDescription',
  components: {
    BaseDivider,
    BaseDescriptionSection,
    BaseAlbumDescriptionModal
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    requestAlbumData: Object
  },
  computed: {
    description () {
      return this.albumData.description
    },
    isMore () {
      return this.albumData.with_more?.description
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
