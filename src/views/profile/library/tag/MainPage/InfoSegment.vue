<template>
  <div
    :class="[
      'ui raised segments',
      'main-segment-container'
    ]"
  >
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
          <template #default>
            {{ tagName }}
          </template>
        </BaseHeaderContainer>
      </BaseLinkContainer>
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseHeaderContainer
  from '*/components/containers/BaseHeaderContainer.vue'
import {
  main as formatTagMainLink
} from '*/helpers/formatters/links/tag'

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
      return formatTagMainLink(
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
