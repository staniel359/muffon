<template>
  <div>
    <div class="tag-header-container">
      <BaseHeaderContainer
        tag="h1"
        class="inverted tag-header"
        icon="tag"
      >
        {{ tagName }}
      </BaseHeaderContainer>
    </div>

    <SimilarSection :tagName="tagName" />

    <BaseCounters
      :taggersCount="taggersCount"
      :taggingsCount="taggingsCount"
    />

    <template v-if="description">
      <BaseDivider isInverted />

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
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import SimilarSection from './InfoSection/SimilarSection.vue'
import BaseCounters from '@/BaseCounters.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseTagDescription from '@/models/tag/BaseTagDescription.vue'

export default {
  name: 'InfoSection',
  components: {
    BaseHeaderContainer,
    SimilarSection,
    BaseCounters,
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
.tag-header-container
  margin-bottom: 25px

.tag-header
  font-size: 2.5rem !important
  ::v-deep(.icon)
    font-size: 0.75em !important

::v-deep(.tag-description)
  @extend .text-color-white
</style>
