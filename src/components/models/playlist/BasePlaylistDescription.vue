<template>
  <BaseDescriptionSection
    :description="descriptionTruncated"
    :is-more="isMore"
    @more-click="handleMoreClick"
  />

  <BasePlaylistDescriptionModal
    v-if="isMore"
    ref="modal"
    :description="descriptionFormatted"
  />
</template>

<script>
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'
import BasePlaylistDescriptionModal
  from '@/components/modals/playlist/BasePlaylistDescriptionModal.vue'
import formatTextWithExternalLink
  from '@/helpers/formatters/textWithExternalLink'

export default {
  name: 'BasePlaylistDescription',
  components: {
    BaseDescriptionSection,
    BasePlaylistDescriptionModal
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    descriptionTruncated () {
      return this.playlistData.description_truncated
    },
    isMore () {
      return !!this.playlistData.with_more?.description
    },
    descriptionFormatted () {
      return formatTextWithExternalLink(
        {
          text: this.description,
          className: 'bold'
        }
      )
    },
    description () {
      return this.playlistData.description
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
