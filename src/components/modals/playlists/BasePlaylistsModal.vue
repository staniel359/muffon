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
      <BasePaginatedListContainer
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
      </BasePaginatedListContainer>
    </BaseSegmentContainer>
  </BaseModalContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseModalContainer from '@/containers/modals/BaseModalContainer.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
import BasePlaylistsSimpleSelectableList
  from '@/lists/playlists/BasePlaylistsSimpleSelectableList.vue'
import getProfilePlaylists from '#/actions/api/profile/playlists/get'

export default {
  name: 'BasePlaylistsModal',
  components: {
    BaseModalContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer,
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
    playlistsArgs () {
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
      if (value) {
        this.fetchData()
      }
    },
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleFocus () {
      this.scrollable.scrollTo(0, 0)
    },
    getProfilePlaylists,
    fetchData (page) {
      this.getProfilePlaylists({
        ...this.playlistsArgs,
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
