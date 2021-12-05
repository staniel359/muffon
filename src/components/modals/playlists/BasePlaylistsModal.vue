<template>
  <BaseModalContainer ref="modal">
    <BaseSegmentContainer
      ref="scrollable"
      :class="[
        'scrolling content',
        'main-modal-content-full-height',
        'main-segment-container'
      ]"
      :isLoading="isLoading"
      @init="handleInit"
    >
      <BasePaginatedContainer
        scope="playlists"
        :isLoading="isLoading"
        :error="error"
        :responseData="profileData"
        :clientPageLimit="limit"
        :responsePageLimit="limit"
        @fetchData="fetchData"
        @refresh="handleRefresh"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <BasePlaylistsSimpleSelectableList
            :playlists="slotProps.playlists"
            :profileId="profileId"
            :trackTitle="trackTitle"
            :artistName="artistName"
            :albumTitle="albumTitle"
            :imageUrl="imageUrl"
          />
        </template>
      </BasePaginatedContainer>
    </BaseSegmentContainer>
  </BaseModalContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseModalContainer from '@/containers/BaseModalContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'
import BasePlaylistsSimpleSelectableList
  from '@/lists/playlists/BasePlaylistsSimpleSelectableList.vue'
import fetchProfilePlaylistsData from
  '#/actions/api/profile/playlists/fetchData'

export default {
  name: 'BasePlaylistsModal',
  components: {
    BaseModalContainer,
    BaseSegmentContainer,
    BasePaginatedContainer,
    BasePlaylistsSimpleSelectableList
  },
  props: {
    trackTitle: String,
    artistName: String,
    albumTitle: String,
    imageUrl: String
  },
  data () {
    return {
      error: null,
      scrollable: null,
      profileData: null,
      isLoading: false,
      isOpen: false,
      limit: 20
    }
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    playlistsDataArgs () {
      return {
        profileId: this.profileId,
        limit: this.limit,
        trackTitle: this.trackTitle,
        artistName: this.artistName
      }
    },
    profileId () {
      return this.profileInfo.id.toString()
    }
  },
  watch: {
    isOpen: 'handleIsOpenChange'
  },
  methods: {
    handleInit (el) {
      this.scrollable = el
    },
    handleIsOpenChange (value) {
      value && this.fetchData()
    },
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleFocus () {
      this.scrollable.scrollTo(0, 0)
    },
    fetchProfilePlaylistsData,
    fetchData (page) {
      this.fetchProfilePlaylistsData({
        ...this.playlistsDataArgs,
        page
      })
    },
    show () {
      this.$refs.modal.show()

      this.isOpen = true
    }
  }
}
</script>

<style lang="sass" scoped></style>
