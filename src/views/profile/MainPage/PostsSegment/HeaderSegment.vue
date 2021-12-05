<template>
  <BaseSegmentContainer>
    <BaseHeaderContainer tag="h3">
      <BaseLink
        :link="profilePostsLinkFormatted"
        :text="headerFormatted"
      />
    </BaseHeaderContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseLink from '@/BaseLink.vue'
import {
  posts as formatProfilePostsLink
} from '#/formatters/links/profile'

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
    profilePostsLinkFormatted () {
      return formatProfilePostsLink({
        profileId: this.profileId
      })
    },
    headerFormatted () {
      return this.$t(
        'layout.navigation.posts'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
