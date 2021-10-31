<template>
  <BaseSegmentContainer>
    <BaseHeaderContainer tag="h3">
      <BaseLink
        :link="profileFavoritesLinkFormatted"
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
  playlists as formatProfilePlaylistsLink
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
    profileFavoritesLinkFormatted () {
      return formatProfilePlaylistsLink({
        profileId: this.profileId
      })
    },
    headerFormatted () {
      return this.$t(
        'layout.navigation.playlists'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
