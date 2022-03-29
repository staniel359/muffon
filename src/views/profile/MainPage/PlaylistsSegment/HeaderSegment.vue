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
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseHeaderContainer
  from '*/components/containers/BaseHeaderContainer.vue'
import BaseLink from '*/components/links/BaseLink.vue'
import {
  playlists as formatProfilePlaylistsLink
} from '*/helpers/formatters/links/profile'

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
