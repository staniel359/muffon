<template>
  <BaseSegmentContainer>
    <BaseHeaderContainer tag="h3">
      <BaseLink
        :link="profileLibraryMainLink"
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
  main as formatProfileLibraryMainLink
} from '*/helpers/formatters/links/profile/library'

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
    profileLibraryMainLink () {
      return formatProfileLibraryMainLink({
        profileId: this.profileId
      })
    },
    headerText () {
      return this.$t(
        'navigation.library'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
