<template>
  <BaseSegmentContainer>
    <BaseHeaderContainer tag="h3">
      <BaseLink
        v-if="formatHeaderLink"
        :link="headerLink"
        :text="headerText"
      />
      <template v-else>
        {{ headerText }}
      </template>
    </BaseHeaderContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseLink from '@/links/BaseLink.vue'

export default {
  name: 'HeaderSegment',
  components: {
    BaseSegmentContainer,
    BaseHeaderContainer,
    BaseLink
  },
  props: {
    headerTextKey: {
      type: String,
      required: true
    },
    formatHeaderLink: Function,
    tagName: String
  },
  computed: {
    headerLink () {
      return this.formatHeaderLink({
        tagName: this.tagName
      })
    },
    headerText () {
      return this.$t(
        `layout.navigation.${this.headerTextKey}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
