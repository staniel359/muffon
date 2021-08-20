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
    },
    albumId: {
      type: String,
      required: true
    },
    scope: {
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
    headerFormatted () {
      return localize(
        `layout.navigation.library.album.${this.headerTextKey}`
      )
    },
    linkFormatted () {
      return this.formatHeaderLink({
        profileId: this.profileId,
        albumId: this.albumId,
        scope: this.scope
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
