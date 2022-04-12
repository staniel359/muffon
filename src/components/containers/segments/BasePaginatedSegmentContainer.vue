<template>
  <BaseSegmentContainer
    ref="segment"
    class="main-paginated-segment-container"
    :isLoading="isLoading"
  >
    <BasePaginatedListContainer
      ref="list"
      :responseData="responseData"
      :scope="scope"
      :limit="limit"
      :clientPageLimit="clientPageLimit"
      :responsePageLimit="responsePageLimit"
      :isLoading="isLoading"
      :error="error"
      :isPaginationSimple="isPaginationSimple"
      :isReset="isReset"
      @fetchData="fetchData"
      @refresh="refresh"
      @focus="handleFocus"
    >
      <template #default="slotProps">
        <slot
          :[scope]="slotProps[scope]"
        ></slot>
      </template>
    </BasePaginatedListContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'

export default {
  name: 'BasePaginatedSegmentContainer',
  components: {
    BaseSegmentContainer,
    BasePaginatedListContainer
  },
  props: {
    slotPropsData: {
      type: Object,
      required: true
    },
    responseDataName: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    limit: Number,
    clientPageLimit: Number,
    responsePageLimit: Number,
    isPaginationSimple: Boolean,
    isReset: Boolean
  },
  emits: [
    'focus'
  ],
  computed: {
    isLoading () {
      return this.slotPropsData.isLoading
    },
    error () {
      return this.slotPropsData.error
    },
    responseData () {
      return this.slotPropsData[
        this.responseDataName
      ]
    },
    fetchData () {
      return this.slotPropsData.fetchData
    },
    refresh () {
      return this.slotPropsData.refresh
    }
  },
  methods: {
    handleFocus () {
      this.$emit('focus')
    },
    reset () {
      this.$refs.list.reset()
    },
    focus () {
      this.$refs.segment.focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
