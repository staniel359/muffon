<template>
  <BaseSegmentContainer>
    <BaseHeaderContainer tag="h3">
      <BaseLink
        :link="profileCommunitiesLink"
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
import {
  communities as formatProfileCommunitiesLink
} from '*/helpers/formatters/links/profile'

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
    }
  },
  computed: {
    profileCommunitiesLink () {
      return formatProfileCommunitiesLink({
        profileId: this.profileId
      })
    },
    headerText () {
      return this.$t(
        'navigation.communities'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
