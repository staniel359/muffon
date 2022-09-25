<template>
  <BaseProfilePageContainer
    ref="page"
    :profile-id="profileId"
    :scope="scope"
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
          <div>
            <BasePlaylistCreateButton
              v-if="isSelf"
              is-with-redirect
            />
          </div>

          <BaseLink
            :link="playlistsLink"
            :text="playlistsLinkText"
          />
        </BaseSegmentContainer>

        <BasePaginatedSegmentContainer
          ref="pagination"
          class="main-paginated-page-segment-container"
          :response-data="pageSlotProps.profileData"
          :is-loading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :scope="scope"
          :limit="limit"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <BasePlaylistsSimpleList
              :playlists="slotProps[scope]"
              is-with-share-option
              is-with-edit-option
              is-with-delete-option
            />
          </template>
        </BasePaginatedSegmentContainer>
      </div>
    </template>
  </BaseProfilePageContainer>
</template>

<script>
import BaseProfilePageContainer
  from '@/components/containers/pages/profile/BaseProfilePageContainer.vue'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BasePlaylistCreateButton
  from '@/components/buttons/playlist/BasePlaylistCreateButton.vue'
import BaseLink from '@/components/links/BaseLink.vue'
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'
import BasePlaylistsSimpleList
  from '@/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import {
  playlists as formatPlaylistsLink
} from '@/helpers/formatters/links'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'PlaylistsPage',
  components: {
    BaseProfilePageContainer,
    BaseSegmentContainer,
    BasePlaylistCreateButton,
    BaseLink,
    BasePaginatedSegmentContainer,
    BasePlaylistsSimpleList
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit: 50,
      scope: 'playlists'
    }
  },
  computed: {
    isSelf () {
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
  }
}
</script>

<style lang="sass" scoped>
.top-segment
  @extend .d-flex, .align-items-center, .justify-content-space-between
</style>
