<template>
  <BaseSegmentContainer>
    <BaseHeaderContainer
      tag="h3"
    >
      <BaseLink
        v-if="link"
        :link="link"
        :text="headerText"
      />
      <span
        v-else
        v-text="headerText"
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
    scope: {
      type: String,
      required: true
    },
    link: Object
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
