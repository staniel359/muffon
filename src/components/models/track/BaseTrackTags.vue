<template>
  <BaseTagsList
    :tags="tags"
    :isMore="isMore"
    isWithIcon
    @moreClick="handleMoreClick"
  />

  <BaseTrackTagsModal
    v-if="isMore"
    ref="modal"
    :requestTrackData="requestTrackData"
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
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
