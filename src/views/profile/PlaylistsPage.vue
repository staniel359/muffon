<template>
  <BasePlaylistsPageContainer
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
          v-if="isRenderCreateSegment"
        >
          <BaseButton
            class="primary"
            icon="plus"
            :text="createText"
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
                :profileId="profileId"
              />
            </template>
          </BasePaginatedListContainer>
        </BaseSegmentContainer>
      </div>
    </template>
  </BasePlaylistsPageContainer>
</template>

<script>
import BasePlaylistsPageContainer
  from '@/containers/pages/profile/playlists/BasePlaylistsPageContainer.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import BasePlaylistCreateModal
  from '@/modals/playlist/BasePlaylistCreateModal.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
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
    createText () {
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
