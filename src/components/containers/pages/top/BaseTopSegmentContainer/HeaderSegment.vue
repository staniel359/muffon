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
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseLink from '@/BaseLink.vue'
import {
  artists as formatTopArtistsLink,
  tracks as formatTopTracksLink,
  tags as formatTopTagsLink
} from '#/formatters/links/top'

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
    headerFormatted () {
      return this.$t(
        `layout.navigation.${this.scope}`
      )
    },
    linkFormatted () {
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
