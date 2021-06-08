<template>
  <BaseTagsList
    v-if="tags.length"
    :tags="tags"
    :isMore="isMore"
    @moreClick="handleMoreClick"
  />

  <TrackTagsModal
    v-if="isRenderModal"
    ref="modal"
    :artistName="artistName"
    :trackTitle="trackTitle"
  />
</template>

<script>
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'
import TrackTagsModal from './BaseTrackTags/TrackTagsModal.vue'

export default {
  name: 'BaseTrackTags',
  components: {
    BaseTagsList,
    TrackTagsModal
  },
  props: {
    tags: Array,
    isMore: Boolean,
    artistName: String,
    trackTitle: String
  },
  computed: {
    isRenderModal () {
      return (
        this.isMore &&
          this.tags.length
      )
    }
  },
  methods: {
    handleMoreClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
