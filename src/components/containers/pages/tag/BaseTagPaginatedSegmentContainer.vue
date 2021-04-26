<template>
  <BaseTagSegmentContainer
    ref="segment"
    :tagName="tagName"
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
          :responseData="segmentSlotProps.tagData"
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
            />
            <slot
              v-else
              :[scope]="slotProps[scope]"
            ></slot>
          </template>
        </BasePaginatedContainer>
      </BaseSegmentContainer>
    </template>
  </BaseTagSegmentContainer>
</template>

<script>
import BaseTagSegmentContainer from './BaseTagSegmentContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseTagPaginatedSegmentContainer',
  components: {
    BaseTagSegmentContainer,
    BaseSegmentContainer,
    BasePaginatedContainer
  },
  props: {
    tagName: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    headerTextKey: String,
    formatHeaderLink: Function
  },
  computed: {
    isAlbums () {
      return this.scope === 'albums'
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
