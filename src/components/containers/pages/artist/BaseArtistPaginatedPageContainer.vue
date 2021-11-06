<template>
  <BaseArtistPageContainer
    ref="pageContainer"
    :pageNameKey="pageNameKey"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
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
          v-if="isWithArtistSelect"
        >
          <ArtistSourceSelect
            :artistName="pageSlotProps.artistName"
            @artistDataChange="handleArtistDataChange"
          />
        </BaseSegmentContainer>

        <BaseSegmentContainer
          v-if="isWithViewChange"
        >
          <BaseViewChangeButtons
            v-if="isWithViewChange"
            :viewIndex="viewIndex"
            @viewButtonClick="handleViewButtonClick"
          />
        </BaseSegmentContainer>

        <BaseSegmentContainer
          class="artist-segment"
          :isLoading="pageSlotProps.isLoading"
        >
          <BasePaginatedContainer
            ref="paginatedContainer"
            :isLoading="pageSlotProps.isLoading"
            :error="pageSlotProps.error"
            :responseData="pageSlotProps.artistData"
            :scope="scope"
            :clientPageLimit="clientPageLimit"
            :responsePageLimit="responsePageLimit"
            @focus="handleFocus"
            @fetchData="pageSlotProps.fetchData"
            @refresh="pageSlotProps.handleRefresh"
          >
            <template #default="slotProps">
              <slot
                :[scope]="slotProps[scope]"
                :artistName="pageSlotProps.artistName"
                :topTrackCount="pageSlotProps.topTrackCount"
                :profileId="pageSlotProps.profileId"
              ></slot>
            </template>
          </BasePaginatedContainer>
        </BaseSegmentContainer>
      </div>
    </template>
  </BaseArtistPageContainer>
</template>

<script>
import BaseArtistPageContainer from './BaseArtistPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import ArtistSourceSelect
  from './BaseArtistPaginatedPageContainer/ArtistSourceSelect.vue'
import BaseViewChangeButtons from '@/BaseViewChangeButtons.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseArtistPaginatedPageContainer',
  components: {
    BaseArtistPageContainer,
    BaseSegmentContainer,
    ArtistSourceSelect,
    BaseViewChangeButtons,
    BasePaginatedContainer
  },
  props: {
    pageNameKey: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    isWithViewChange: Boolean,
    viewIndex: Number,
    isWithArtistSelect: Boolean
  },
  emits: [
    'viewButtonClick'
  ],
  methods: {
    handleViewButtonClick (index) {
      this.$refs.paginatedContainer.reset()

      this.$emit(
        'viewButtonClick',
        index
      )

      this.$nextTick(() => {
        this.$refs.pageContainer.fetchData()
      })
    },
    handleArtistDataChange () {
      this.$refs.paginatedContainer.reset()
    },
    handleFocus () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="sass" scoped>
.main-paginated-page-segment-container
  @extend .flex-column

.artist-segment
  @extend .flex-full, .d-flex, .flex-column
</style>
