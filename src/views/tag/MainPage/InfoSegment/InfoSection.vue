<template>
  <div>
    <h1 class="ui header main-header">
      <i class="tag icon" />
      <div class="content">
        {{ tagName }}
      </div>
    </h1>

    <SimilarSection :tagName="tagName" />

    <BaseCounters
      :taggersCount="taggersCount"
      :taggingsCount="taggingsCount"
    />

    <template v-if="description">
      <div class="ui divider main-divider"></div>

      <BaseTagDescription
        class="tag-description"
        :description="description"
        :tagName="tagName"
        isMore
      />
    </template>
  </div>
</template>

<script>
import SimilarSection from './InfoSection/SimilarSection.vue'
import BaseCounters from '@/BaseCounters.vue'
import BaseTagDescription from '@/models/tag/BaseTagDescription.vue'

export default {
  name: 'InfoSection',
  components: {
    SimilarSection,
    BaseCounters,
    BaseTagDescription
  },
  props: {
    tagData: {
      type: Object,
      required: true
    }
  },
  computed: {
    tagName () {
      return this.tagData.name
    },
    taggersCount () {
      return this.tagData.taggers_count
    },
    taggingsCount () {
      return this.tagData.taggings_count
    },
    description () {
      return this.tagData.description
    }
  }
}
</script>

<style lang="sass" scoped>
.main-header
  @extend .text-color-white
  font-size: 2.5rem !important
  margin-bottom: 25px !important
  .icon
    font-size: 0.75em !important

::v-deep(.tag-description)
  @extend .text-color-white
</style>
