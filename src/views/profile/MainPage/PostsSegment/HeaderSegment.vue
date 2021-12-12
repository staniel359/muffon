<template>
  <BaseSegmentContainer>
    <BaseHeaderContainer tag="h3">
      <BaseLink
        :link="profilePostsLink"
        :text="headerText"
      />
    </BaseHeaderContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseLink from '@/links/BaseLink.vue'
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
    profilePostsLink () {
      return formatProfilePostsLink({
        profileId: this.profileId
      })
    },
    headerText () {
      return this.$t(
        'layout.navigation.posts'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
