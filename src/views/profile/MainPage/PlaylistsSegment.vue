<template>
  <div
    class="ui segments main-segment-container"
    ref="segment"
  >
    <HeaderSegment
      :profileId="profileId"
    />

    <BaseSegmentContainer
      :isLoading="isLoading"
    >
      <BasePaginatedContainer
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
      </BasePaginatedContainer>
    </BaseSegmentContainer>
  </div>
</template>

<script>
import HeaderSegment from './PlaylistsSegment/HeaderSegment.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'
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
    BasePaginatedContainer,
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
      this.error = null

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

<style lang="sass" scoped></style>
