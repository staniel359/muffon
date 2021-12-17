<template>
  <BaseSegmentContainer>
    <BaseHeaderContainer tag="h3">
      <BaseLink
        :link="profilePlaylistsLink"
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
    profilePlaylistsLink () {
      return formatProfilePlaylistsLink({
        profileId: this.profileId
      })
    },
    headerText () {
      return this.$t(
        'navigation.playlists'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
