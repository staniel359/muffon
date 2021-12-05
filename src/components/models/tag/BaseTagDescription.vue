<template>
  <BaseDescription
    v-bind="$attrs"
    :description="description"
    :isMore="isMore"
    @moreClick="handleMoreClick"
  />

  <BaseTagDescriptionModal
    v-if="isMore"
    ref="modal"
    :tagName="tagName"
  />
</template>

<script>
import BaseDescription from '@/BaseDescription.vue'
import BaseTagDescriptionModal from '@/modals/tag/BaseTagDescriptionModal.vue'

export default {
  name: 'BaseTagDescription',
  components: {
    BaseDescription,
    BaseTagDescriptionModal
  },
  props: {
    description: String,
    isMore: Boolean,
    tagName: String,
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
