<template>
  <BaseSegmentContainer>
    <BaseHeaderContainer tag="h3">
      <BaseLink
        :link="profileLibraryMainLinkFormatted"
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
  main as formatProfileLibraryMainLink
} from '#/formatters/links/profile/library'

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
    profileLibraryMainLinkFormatted () {
      return formatProfileLibraryMainLink({
        profileId: this.profileId
      })
    },
    headerFormatted () {
      return this.$t(
        'layout.navigation.library'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
