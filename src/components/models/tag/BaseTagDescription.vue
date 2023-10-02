<template>
  <BaseDescriptionSection
    class="text-color-white"
    :description="description"
    :is-more="isMore"
    @more-click="handleMoreClick"
  />

  <BaseTagDescriptionModal
    v-if="isMore"
    ref="modal"
    :tag-name="tagName"
  />
</template>

<script>
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'
import BaseTagDescriptionModal
  from '@/components/modals/tag/BaseTagDescriptionModal.vue'

export default {
  name: 'BaseTagDescription',
  components: {
    BaseDescriptionSection,
    BaseTagDescriptionModal
  },
  props: {
    description: String,
    isMore: Boolean,
    tagName: String
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
