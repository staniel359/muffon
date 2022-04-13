<template>
  <template
    v-if="description"
  >
    <BaseDivider
      is-inverted
    />

    <BaseTagDescription
      :description="description"
      :tag-name="tagName"
      :is-more="isMore"
    />
  </template>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import BaseTagDescription from '*/components/models/tag/BaseTagDescription.vue'

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
      return this.tagData.with_more?.description
    }
  }
}
</script>

<style lang="sass" scoped></style>
