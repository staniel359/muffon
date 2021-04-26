<template>
  <BaseArtistPageContainer
    :pageNameKey="pageNameKey"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
  >
    <template #default="pageSlotProps">
      <BaseSegmentContainer
        :class="[
          'main-segment-container',
          'main-page-segment-container',
          'main-paginated-page-segment-container'
        ]"
        :isLoading="pageSlotProps.isLoading"
      >
        <BasePaginatedContainer
          :responseData="pageSlotProps.artistData"
          :error="pageSlotProps.error"
          :scope="scope"
          :clientPageLimit="clientPageLimit"
          :responsePageLimit="responsePageLimit"
          @fetchData="pageSlotProps.fetchData"
          @refresh="pageSlotProps.handleRefresh"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <slot
              v-if="isAlbums"
              :[scope]="slotProps[scope]"
              :artistName="pageSlotProps.artistName"
              :isLoading="pageSlotProps.isLoading"
            ></slot>
            <slot
              v-else-if="isTracks"
              :[scope]="slotProps[scope]"
              :artistName="pageSlotProps.artistName"
              :topTrackCount="pageSlotProps.topTrackCount"
            ></slot>
            <slot
              v-else
              :[scope]="slotProps[scope]"
            ></slot>
          </template>
        </BasePaginatedContainer>
      </BaseSegmentContainer>
    </template>
  </BaseArtistPageContainer>
</template>

<script>
import BaseArtistPageContainer from './BaseArtistPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseArtistPaginatedPageContainer',
  components: {
    BaseArtistPageContainer,
    BaseSegmentContainer,
    BasePaginatedContainer
  },
  props: {
    pageNameKey: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number
  },
  computed: {
    isAlbums () {
      return this.scope === 'albums'
    },
    isTracks () {
      return this.scope === 'tracks'
    }
  },
  methods: {
    handleFocus () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="sass" scoped></style>
