<template>
  <BaseModalContainer
    ref="modal"
    @show.once="handleCall"
  >
    <BasePaginatedSegmentContainer
      ref="segment"
      :class="[
        'basic scrolling content',
        {
          'main-modal-content-full-height':
            responseData
        }
      ]"
      :slot-props-data="slotPropsData"
      :response-data-name="responseDataName"
      :scope="scope"
      :limit="limit"
      @focus="handleFocus"
    >
      <template #default="slotProps">
        <slot
          :[scope]="slotProps[scope]"
        />
      </template>
    </BasePaginatedSegmentContainer>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'

export default {
  name: 'BasePaginatedSegmentModalContainer',
  components: {
    BaseModalContainer,
    BasePaginatedSegmentContainer
  },
  props: {
    slotPropsData: Object,
    responseDataName: String,
    scope: String,
    limit: Number
  },
  emits: [
    'call'
  ],
  computed: {
    responseData () {
      return this.slotPropsData[
        this.responseDataName
      ]
    }
  },
  methods: {
    handleCall () {
      this.$emit(
        'call'
      )
    },
    handleFocus () {
      this.scrollToTop()
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    },
    scrollToTop () {
      this.$refs
        .segment
        .scrollToTop()
    }
  }
}
</script>

<style lang="sass" scoped></style>
