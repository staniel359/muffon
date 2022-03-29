<template>
  <BaseSegmentContainer>
    <BaseHeaderContainer tag="h3">
      <BaseLink
        :link="headerLink"
        :text="headerText"
      />
    </BaseHeaderContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseHeaderContainer
  from '*/components/containers/BaseHeaderContainer.vue'
import BaseLink from '*/components/links/BaseLink.vue'

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
    tagId: {
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
    headerLink () {
      return this.formatHeaderLink({
        profileId: this.profileId,
        tagId: this.tagId
      })
    },
    headerText () {
      return this.$t(
        `navigation.${this.headerTextKey}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
