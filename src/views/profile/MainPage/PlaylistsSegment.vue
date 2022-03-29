<template>
  <div
    class="ui raised segments main-segment-container"
    ref="segment"
  >
    <HeaderSegment
      :profileId="profileId"
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
import HeaderSegment from './PlaylistsSegment/HeaderSegment.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BasePlaylistsSimpleList
  from '*/components/lists/playlists/BasePlaylistsSimpleList.vue'
import getProfilePlaylists from '*/helpers/actions/api/profile/playlists/get'
import { focusOnSegment } from '*/helpers/actions/layout'

export default {
  name: 'PlaylistsSegment',
  components: {
    HeaderSegment,
    BaseSegmentContainer,
    BasePaginatedListContainer,
    BasePlaylistsSimpleList
  },
  props: {
    profileId: String
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
    profilePlaylistsArgs () {
      return {
        profileId: this.profileId,
        limit: this.limit
      }
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
        ...this.profilePlaylistsArgs,
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
