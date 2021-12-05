<template>
  <BaseTagsList
    :tags="tags"
    :isMore="isMore"
    @moreClick="handleMoreClick"
  />

  <BaseTrackTagsModal
    v-if="isMore"
    ref="modal"
    :artistName="artistName"
    :trackTitle="trackTitle"
  />
</template>

<script>
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'
import BaseTrackTagsModal from '@/modals/track/BaseTrackTagsModal.vue'

export default {
  name: 'BaseTrackTags',
  components: {
    BaseTagsList,
    BaseTrackTagsModal
  },
  props: {
    tags: Array,
    isMore: Boolean,
    artistName: String,
    trackTitle: String
  },
  methods: {
    handleMoreClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
