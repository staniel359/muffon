<template>
  <BaseProfilePlaylistsPageContainer
    :profile-id="profileId"
    :limit="limit"
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
          <BasePlaylistCreateButton
            v-if="isRenderCreateButton"
          />

          <BaseLink
            :link="playlistsLink"
            :text="playlistsLinkText"
          />
        </BaseSegmentContainer>

        <BasePaginatedSegmentContainer
          class="main-paginated-page-segment-container"
          response-data-name="profileData"
          :slot-props-data="pageSlotProps"
          :scope="scope"
          :limit="limit"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <BasePlaylistsSimpleList
              :playlists="slotProps[scope]"
            />
          </template>
        </BasePaginatedSegmentContainer>
      </div>
    </template>
  </BaseProfilePlaylistsPageContainer>
</template>

<script>
import BaseProfilePlaylistsPageContainer
  from '*/components/containers/pages/profile/playlists/BaseProfilePlaylistsPageContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePlaylistCreateButton
  from '*/components/buttons/playlist/BasePlaylistCreateButton.vue'
import BaseLink from '*/components/links/BaseLink.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'
import BasePlaylistsSimpleList
  from '*/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'
import {
  playlists as formatPlaylistsLink
} from '*/helpers/formatters/links'

export default {
  name: 'PlaylistsPage',
  components: {
    BaseProfilePlaylistsPageContainer,
    BaseSegmentContainer,
    BasePlaylistCreateButton,
    BaseLink,
    BasePaginatedSegmentContainer,
    BasePlaylistsSimpleList
  },
  props: {
    profileId: String
  },
  data () {
    return {
      limit: 50,
      scope: 'playlists'
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
      window.scrollTo(
        0,
        0
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.top-segment
  @extend .d-flex, .align-items-center, .justify-content-space-between
</style>
