<template>
  <BaseSegmentContainer
    :is-change-transparency="isChangeTransparency"
  >
    <BaseHeaderContainer
      tag="h3"
    >
      <BaseLink
        :link="link"
        :text="headerText"
      />
    </BaseHeaderContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseHeaderContainer
  from '@/components/containers/BaseHeaderContainer.vue'
import BaseLink from '@/components/links/BaseLink.vue'

export default {
  name: 'HeaderSegment',
  components: {
    BaseSegmentContainer,
    BaseHeaderContainer,
    BaseLink
  },
  props: {
    link: {
      type: Object,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    isChangeTransparency: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    headerText () {
      return this.$t(
        `navigation.${this.scope}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
