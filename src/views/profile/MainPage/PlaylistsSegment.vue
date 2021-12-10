<template>
  <div
    class="ui segments main-segment-container"
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
            :profileId="profileId"
          />
        </template>
      </BasePaginatedListContainer>
    </BaseSegmentContainer>
  </div>
</template>

<script>
import HeaderSegment from './PlaylistsSegment/HeaderSegment.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
import BasePlaylistsSimpleList
  from '@/lists/playlists/BasePlaylistsSimpleList.vue'
import fetchProfilePlaylistsData
  from '#/actions/api/profile/playlists/fetchData'
import { focusOnSegment } from '#/actions/layout'

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
    playlistsDataArgs () {
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
    fetchProfilePlaylistsData,
    fetchData (page) {
      this.fetchProfilePlaylistsData({
        ...this.playlistsDataArgs,
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
