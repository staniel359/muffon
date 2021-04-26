<template>
  <BaseArtistSegmentContainer
    ref="segment"
    :artistName="artistName"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
    :headerTextKey="headerTextKey"
    :formatHeaderLink="formatHeaderLink"
  >
    <template #default="segmentSlotProps">
      <BaseSegmentContainer
        :isLoading="segmentSlotProps.isLoading"
        class="segment-container"
      >
        <BasePaginatedContainer
          :responseData="segmentSlotProps.artistData"
          :error="segmentSlotProps.error"
          :scope="scope"
          :clientPageLimit="clientPageLimit"
          :responsePageLimit="responsePageLimit"
          @fetchData="segmentSlotProps.fetchData"
          @refresh="segmentSlotProps.handleRefresh"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <slot
              v-if="isAlbums"
              :[scope]="slotProps[scope]"
              :isLoading="segmentSlotProps.isLoading"
            ></slot>
            <slot
              v-else-if="isTracks"
              :[scope]="slotProps[scope]"
              :topTrackCount="segmentSlotProps.topTrackCount"
            />
            <slot
              v-else
              :[scope]="slotProps[scope]"
            ></slot>
          </template>
        </BasePaginatedContainer>
      </BaseSegmentContainer>
    </template>
  </BaseArtistSegmentContainer>
</template>

<script>
import BaseArtistSegmentContainer from './BaseArtistSegmentContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseArtistPaginatedSegmentContainer',
  components: {
    BaseArtistSegmentContainer,
    BaseSegmentContainer,
    BasePaginatedContainer
  },
  props: {
    artistName: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    headerTextKey: String,
    formatHeaderLink: Function
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
      this.$refs.segment.focus()
    }
  }
}
</script>

<style lang="sass" scoped>
.segment-container
  @extend .d-flex
</style>
