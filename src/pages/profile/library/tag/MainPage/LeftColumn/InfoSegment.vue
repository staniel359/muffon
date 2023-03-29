<template>
  <div class="ui raised segments main-segment-container">
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
  </div>
</template>

<script>
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
  ::v-deep(.icon)
    font-size: 0.75em !important
    margin-right: 0.5em !important
</style>
