<template>
  <template v-if="description">
    <BaseDivider isInverted />

    <BaseTagDescription
      :description="description"
      :tagName="tagName"
      :isMore="isMore"
      isWhite
    />
  </template>
</template>

<script>
import BaseDivider from '@/BaseDivider.vue'
import BaseTagDescription from '@/models/tag/BaseTagDescription.vue'

export default {
  name: 'DescriptionSection',
  components: {
    BaseDivider,
    BaseTagDescription
  },
  props: {
    tagData: {
      type: Object,
      required: true
    }
  },
  computed: {
    description () {
      return this.tagData.description
    },
    tagName () {
      return this.tagData.name
    },
    isMore () {
      return this.tagData.with_more.description
    }
  }
}
</script>

<style lang="sass" scoped></style>
