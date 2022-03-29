<template>
  <BaseDescription
    class="tag-description"
    :class="{ white: isWhite }"
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
import BaseDescription from '*/components/BaseDescription.vue'
import BaseTagDescriptionModal
  from '*/components/modals/tag/BaseTagDescriptionModal.vue'

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
    trackTitle: String,
    isWhite: Boolean
  },
  methods: {
    handleMoreClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped>
.tag-description
  &.white
    @extend .text-color-white
</style>
