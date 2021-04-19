<template>
  <BasePageContainer
    :pageNameKey="pageNameKey"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedContainer
        class="ui segment main-segment-container main-page-segment-container"
        :class="{ loading: pageSlotProps.isLoading }"
        :responseData="pageSlotProps.trackData"
        :error="pageSlotProps.error"
        :scope="scope"
        :clientPageLimit="clientPageLimit"
        :responsePageLimit="responsePageLimit"
        @fetchData="pageSlotProps.fetchData"
        @refresh="pageSlotProps.handleRefresh"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot :[scope]="slotProps[scope]"></slot>
        </template>
      </BasePaginatedContainer>
    </template>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from './BasePageContainer.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BasePaginatedPageContainer',
  components: {
    BasePageContainer,
    BasePaginatedContainer
  },
  props: {
    pageNameKey: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number
  },
  methods: {
    handleFocus () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="sass" scoped></style>
