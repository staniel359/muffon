<template>
  <BaseDescription
    v-bind="$attrs"
    :description="description"
    :isMore="isMore"
    @viewMore="handleViewMore"
  />

  <TagDescriptionModal
    v-if="isMore"
    ref="modal"
    :tagName="tagName"
  />
</template>

<script>
import BaseDescription from '@/BaseDescription.vue'
import TagDescriptionModal from './BaseTagDescription/TagDescriptionModal.vue'

export default {
  name: 'BaseTagDescription',
  components: {
    BaseDescription,
    TagDescriptionModal
  },
  props: {
    description: String,
    isMore: Boolean,
    tagName: String,
    trackTitle: String
  },
  methods: {
    handleViewMore () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
