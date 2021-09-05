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
import { localize } from '#/actions/plugins/i18n'

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
      return localize(
        'layout.navigation.library'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
