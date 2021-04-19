<template>
  <BaseSectionContainer
    ref="segment"
    :artistName="artistName"
    :trackTitle="trackTitle"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
    :headerText="headerText"
    :formatHeaderLink="formatHeaderLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedContainer
        class="ui segment main-segment"
        :class="{ loading: segmentSlotProps.isLoading }"
        :responseData="segmentSlotProps.trackData"
        :error="segmentSlotProps.error"
        :scope="scope"
        :clientPageLimit="clientPageLimit"
        :responsePageLimit="responsePageLimit"
        @fetchData="segmentSlotProps.fetchData"
        @refresh="segmentSlotProps.handleRefresh"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot :[scope]="slotProps[scope]" />
        </template>
      </BasePaginatedContainer>
    </template>
  </BaseSectionContainer>
</template>

<script>
import BaseSectionContainer from './BaseSectionContainer.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BasePaginatedSectionContainer',
  components: {
    BaseSectionContainer,
    BasePaginatedContainer
  },
  props: {
    artistName: String,
    trackTitle: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    headerText: String,
    formatHeaderLink: Function
  },
  methods: {
    handleFocus () {
      this.$refs.segment.focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
