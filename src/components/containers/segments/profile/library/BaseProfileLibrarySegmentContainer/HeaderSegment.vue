<template>
  <BaseSegmentContainer>
    <BaseHeaderContainer tag="h3">
      <BaseLink
        :text="headerFormatted"
        :link="linkFormatted"
      />
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
    profileId: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    headerTextKey: {
      type: String,
      required: true
    },
    formatHeaderLink: {
      type: Function,
      required: true
    }
  },
  computed: {
    headerFormatted () {
      return this.$t(
        `layout.navigation.${this.headerTextKey}`
      )
    },
    linkFormatted () {
      return this.formatHeaderLink({
        profileId: this.profileId,
        scope: this.scope
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
