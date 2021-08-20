<template>
  <BaseSegmentContainer>
    <BaseHeaderContainer tag="h3">
      <BaseLink
        v-if="formatHeaderLink"
        :link="linkFormatted"
        :text="headerFormatted"
      />
      <template v-else>
        {{ headerFormatted }}
      </template>
    </BaseHeaderContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseLink from '@/BaseLink.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'HeaderSegment',
  components: {
    BaseSegmentContainer,
    BaseHeaderContainer,
    BaseLink
  },
  props: {
    headerTextKey: {
      type: String,
      required: true
    },
    formatHeaderLink: Function,
    artistName: String
  },
  computed: {
    headerFormatted () {
      return localize(
        `layout.navigation.artist.${this.headerTextKey}`
      )
    },
    linkFormatted () {
      return this.formatHeaderLink({
        artistName: this.artistName
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
