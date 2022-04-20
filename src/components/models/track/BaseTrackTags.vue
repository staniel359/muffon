<template>
  <BaseTagsList
    :tags="tags"
    :is-more="isMore"
    is-with-icon
    @more-click="handleMoreClick"
  />

  <BaseTrackTagsModal
    v-if="isMore"
    ref="modal"
    :request-track-data="requestTrackData"
  />
</template>

<script>
import BaseTagsList from '*/components/lists/tags/BaseTagsList.vue'
import BaseTrackTagsModal
  from '*/components/modals/track/BaseTrackTagsModal.vue'

export default {
  name: 'BaseTrackTags',
  components: {
    BaseTagsList,
    BaseTrackTagsModal
  },
  props: {
    tags: Array,
    isMore: Boolean,
    requestTrackData: Object
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
