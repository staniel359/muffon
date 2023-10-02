<template>
  <BaseSegmentsContainer>
    <BaseSegmentContainer
      class="main-profile-page-info"
    >
      <BaseLinkContainer
        :link="tagLink"
      >
        <BaseHeader
          class="link tag-header"
          tag="h3"
          icon="tag"
          :text="tagName"
        />
      </BaseLinkContainer>
    </BaseSegmentContainer>
  </BaseSegmentsContainer>
</template>

<script>
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import {
  main as formatTagLink
} from '@/helpers/formatters/links/tag'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentsContainer,
    BaseSegmentContainer,
    BaseLinkContainer,
    BaseHeader
  },
  props: {
    tagData: {
      type: Object,
      required: true
    }
  },
  computed: {
    tagLink () {
      return formatTagLink(
        {
          tagName: this.tagName
        }
      )
    },
    tagName () {
      return this.tagData.name
    }
  }
}
</script>

<style lang="sass" scoped>
.tag-header
  :deep(.icon)
    @extend .main-left-mini-icon
    font-size: 1.2rem !important
</style>
