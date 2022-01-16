<template>
  <BaseProfilePageContainer
    scope="playlists"
    pageNameKey="playlists"
    :profileId="profileId"
    :responsePageLimit="limit"
  >
    <template #default="pageSlotProps">
      <div
        :class="[
          'ui raised segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <BaseSegmentContainer
          class="top-segment"
        >
          <div>
            <BasePlaylistCreateButton
              v-if="isRenderCreateButton"
            />
          </div>

          <BaseLink
            :link="playlistsLink"
            :text="playlistsLinkText"
          />
        </BaseSegmentContainer>

        <BaseSegmentContainer
          class="main-paginated-page-segment-container"
          :isLoading="pageSlotProps.isLoading"
        >
          <BasePaginatedListContainer
            scope="playlists"
            :isLoading="pageSlotProps.isLoading"
            :error="pageSlotProps.error"
            :responseData="pageSlotProps.profileData"
            :clientPageLimit="limit"
            :responsePageLimit="limit"
            @focus="handleFocus"
            @fetchData="pageSlotProps.fetchData"
            @refresh="pageSlotProps.handleRefresh"
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
  </BaseProfilePageContainer>
</template>

<script>
import BaseProfilePageContainer
  from '@/containers/pages/profile/BaseProfilePageContainer.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BasePlaylistCreateButton
  from '@/buttons/playlist/BasePlaylistCreateButton.vue'
import BaseLink from '@/links/BaseLink.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
import BasePlaylistsSimpleList
  from '@/lists/playlists/BasePlaylistsSimpleList.vue'
import { isCurrentProfile } from '#/utils'
import { playlists as formatPlaylistsLink } from '#/formatters/links'

export default {
  name: 'PlaylistsPage',
  components: {
    BaseProfilePageContainer,
    BaseSegmentContainer,
    BasePlaylistCreateButton,
    BaseLink,
    BasePaginatedListContainer,
    BasePlaylistsSimpleList
  },
  props: {
    profileId: String
  },
  data () {
    return {
      limit: 50
    }
  },
  computed: {
    isRenderCreateButton () {
      return isCurrentProfile(
        this.profileId
      )
    },
    playlistsLink () {
      return formatPlaylistsLink()
    },
    playlistsLinkText () {
      return this.$t(
        'links.playlists'
      )
    }
  },
  methods: {
    handleFocus () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="sass" scoped>
.top-segment
  @extend .d-flex, .align-items-center, .justify-content-space-between
</style>
