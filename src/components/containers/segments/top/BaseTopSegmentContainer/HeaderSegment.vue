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
import {
  artists as formatTopArtistsLink,
  tracks as formatTopTracksLink,
  tags as formatTopTagsLink
} from '*/helpers/formatters/links/top'

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
    }
  },
  computed: {
    headerLink () {
      switch (this.scope) {
        case 'artists':
          return formatTopArtistsLink()
        case 'tracks':
          return formatTopTracksLink()
        case 'tags':
          return formatTopTagsLink()
        default:
          return null
      }
    },
    headerText () {
      return this.$t(
        `navigation.${this.scope}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
