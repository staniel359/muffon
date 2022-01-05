<template>
  <div class="ui raised segments main-segment-container">
    <BaseSegmentContainer
      class="main-profile-page-info"
    >
      <BaseLinkContainer
        :link="tagMainLink"
      >
        <BaseHeaderContainer
          class="link tag-header"
          tag="h2"
          icon="tag"
        >
          {{ tagName }}
        </BaseHeaderContainer>
      </BaseLinkContainer>
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import { main as formatTagMainLink } from '#/formatters/links/tag'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseLinkContainer,
    BaseHeaderContainer
  },
  props: {
    tagData: {
      type: Object,
      required: true
    }
  },
  computed: {
    tagMainLink () {
      return formatTagMainLink({
        tagName: this.tagName
      })
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
