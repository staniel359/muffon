<template>
  <BaseArtistPageContainer
    ref="pageContainer"
    :artistName="artistName"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
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
          v-if="isWithArtistSelect"
        >
          <BaseArtistSourceSelect
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
          class="main-paginated-page-segment-container"
          :isLoading="pageSlotProps.isLoading"
        >
          <BasePaginatedListContainer
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
          </BasePaginatedListContainer>
        </BaseSegmentContainer>
      </div>
    </template>
  </BaseArtistPageContainer>
</template>

<script>
import BaseArtistPageContainer from './BaseArtistPageContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseArtistSourceSelect
  from '*/components/models/artist/BaseArtistSourceSelect.vue'
import BaseViewChangeButtons
  from '*/components/buttons/BaseViewChangeButtons.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'

export default {
  name: 'BaseArtistPaginatedPageContainer',
  components: {
    BaseArtistPageContainer,
    BaseSegmentContainer,
    BaseArtistSourceSelect,
    BaseViewChangeButtons,
    BasePaginatedListContainer
  },
  props: {
    artistName: String,
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

<style lang="sass" scoped></style>
