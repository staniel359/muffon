<template>
  <div
    v-if="description"
  >
    <BaseDescriptionSection
      :description="description"
      :is-more="isMore"
      @more-click="handleMoreClick"
    />

    <BaseVideoPlaylistDescriptionModal
      v-if="isMore"
      ref="modal"
      :playlist-id="playlistId"
    />
  </div>
</template>

<script>
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'
import BaseVideoPlaylistDescriptionModal
  from '@/components/modals/videoPlaylist/BaseVideoPlaylistDescriptionModal.vue'

export default {
  name: 'DescriptionSection',
  components: {
    BaseDescriptionSection,
    BaseVideoPlaylistDescriptionModal
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    description () {
      return this.playlistData.description
    },
    isMore () {
      return this.playlistData.with_more?.description
    },
    playlistId () {
      return this.playlistData.source.id
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
