<template>
  <BasePlaylistsPageContainer
    :profileId="profileId"
    :responsePageLimit="limit"
  >
    <template #default="pageSlotProps">
      <div
        :class="[
          'ui segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <BaseSegmentContainer
          v-if="isRenderCreateSegment"
        >
          <BaseButton
            class="primary"
            icon="plus"
            :text="createFormatted"
            @click="handleCreateButtonClick"
          />

          <BasePlaylistCreateModal
            ref="modal"
          />
        </BaseSegmentContainer>

        <BaseSegmentContainer
          class="main-paginated-page-segment-container"
          :isLoading="pageSlotProps.isLoading"
        >
          <BasePaginatedContainer
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
                :profileId="profileId"
              />
            </template>
          </BasePaginatedContainer>
        </BaseSegmentContainer>
      </div>
    </template>
  </BasePlaylistsPageContainer>
</template>

<script>
import BasePlaylistsPageContainer
  from '@/containers/pages/profile/playlists/BasePlaylistsPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import BasePlaylistCreateModal
  from '@/modals/playlist/BasePlaylistCreateModal.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'
import BasePlaylistsSimpleList
  from '@/lists/playlists/BasePlaylistsSimpleList.vue'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'PlaylistsPage',
  components: {
    BasePlaylistsPageContainer,
    BaseSegmentContainer,
    BaseButton,
    BasePlaylistCreateModal,
    BasePaginatedContainer,
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
    createFormatted () {
      return this.$t(
        'shared.playlists.create'
      )
    },
    isRenderCreateSegment () {
      return isCurrentProfile(
        this.profileId
      )
    }
  },
  methods: {
    handleFocus () {
      window.scrollTo(0, 0)
    },
    handleCreateButtonClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
