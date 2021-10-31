<template>
  <BasePlaylistsPageContainer
    :profileId="profileId"
    :responsePageLimit="50"
  >
    <template #default="pageSlotProps">
      <div
        :class="[
          'ui segments',
          'main-segment-container',
          'main-page-segment-container',
          'main-paginated-page-segment-container'
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

          <CreateModal ref="modal" />
        </BaseSegmentContainer>

        <BaseSegmentContainer
          class="playlists-segment"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
        >
          <BasePaginatedContainer
            scope="playlists"
            :isLoading="pageSlotProps.isLoading"
            :error="pageSlotProps.error"
            :responseData="pageSlotProps.profileData"
            :clientPageLimit="50"
            :responsePageLimit="50"
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
import BaseButton from '@/BaseButton.vue'
import CreateModal from './PlaylistsPage/CreateModal.vue'
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
    CreateModal,
    BasePaginatedContainer,
    BasePlaylistsSimpleList
  },
  props: {
    profileId: String
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

<style lang="sass" scoped>
.main-page-segment-container
  @extend .flex-column

.playlists-segment
  @extend .flex-full, .d-flex, .flex-column
</style>
