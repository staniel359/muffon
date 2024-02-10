<template>
  <div
    v-if="tags?.length"
  >
    <BaseTagsSimpleList
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
  </div>
</template>

<script>
import BaseTagsSimpleList from '@/components/lists/tags/BaseTagsSimpleList.vue'
import BaseTrackTagsModal
  from '@/components/modals/track/BaseTrackTagsModal.vue'

export default {
  name: 'BaseTrackTags',
  components: {
    BaseTagsSimpleList,
    BaseTrackTagsModal
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    requestTrackData: Object
  },
  computed: {
    tags () {
      return this.trackData.tags
    },
    isMore () {
      return this.trackData.with_more?.tags
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
