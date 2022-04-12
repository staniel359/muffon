<template>
  <BaseProfilePaginatedSegmentContainer
    :scope="scope"
    :profileId="profileId"
    :limit="limit"
    :headerLink="headerLink"
  >
    <template #default="slotProps">
      <BasePlaylistsSimpleList
        :playlists="slotProps[scope]"
      />
    </template>
  </BaseProfilePaginatedSegmentContainer>
</template>

<script>
import BaseProfilePaginatedSegmentContainer
  from '*/components/containers/segments/profile/BaseProfilePaginatedSegmentContainer.vue'
import BasePlaylistsSimpleList
  from '*/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  playlists as formatProfilePlaylistsLink
} from '*/helpers/formatters/links/profile'

export default {
  name: 'PlaylistsSegment',
  components: {
    BaseProfilePaginatedSegmentContainer,
    BasePlaylistsSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit: 3,
      scope: 'playlists'
    }
  },
  computed: {
    headerLink () {
      return formatProfilePlaylistsLink({
        profileId: this.profileId
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
