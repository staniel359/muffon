<template>
  <div
    class="ui raised segments main-segment-container"
    ref="segment"
  >
    <BaseHeaderSegment
      scope="playlists"
      :link="headerLink"
    />

    <BaseSegmentContainer
      class="playlists-segment"
      :isLoading="isLoading"
    >
      <BasePaginatedListContainer
        scope="playlists"
        :isLoading="isLoading"
        :error="error"
        :responseData="profileData"
        :clientPageLimit="limit"
        :responsePageLimit="limit"
        @focus="handleFocus"
        @fetchData="fetchData"
        @refresh="handleRefresh"
      >
        <template #default="slotProps">
          <BasePlaylistsSimpleList
            :playlists="slotProps.playlists"
          />
        </template>
      </BasePaginatedListContainer>
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BasePlaylistsSimpleList
  from '*/components/lists/playlists/BasePlaylistsSimpleList.vue'
import getProfilePlaylists from '*/helpers/actions/api/profile/playlists/get'
import { focusOnSegment } from '*/helpers/actions/layout'
import {
  playlists as formatProfilePlaylistsLink
} from '*/helpers/formatters/links/profile'

export default {
  name: 'PlaylistsSegment',
  components: {
    BaseHeaderSegment,
    BaseSegmentContainer,
    BasePaginatedListContainer,
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
      error: null,
      profileData: null,
      isLoading: false,
      limit: 5
    }
  },
  computed: {
    playlistsArgs () {
      return {
        profileId: this.profileId,
        limit: this.limit
      }
    },
    headerLink () {
      return formatProfilePlaylistsLink({
        profileId: this.profileId
      })
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleFocus () {
      focusOnSegment(
        this.$refs.segment
      )
    },
    getProfilePlaylists,
    fetchData (page) {
      this.getProfilePlaylists({
        ...this.playlistsArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.playlists-segment
  @extend .d-flex
</style>
