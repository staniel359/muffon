<template>
  <BaseModalContainer
    ref="modal"
    :is-multiple="isMultiple"
    @show.once="handleCall"
  >
    <BasePaginatedSegmentContainer
      ref="segment"
      class="basic scrolling content large-padded"
      :class="{
        'full-height': responseData
      }"
      :response-data="responseData"
      :is-loading="isLoading"
      :error="error"
      :scope="scope"
      :text-scope="textScope"
      :limit="limit"
      :is-with-infinite-scroll="isWithInfiniteScroll"
      :scrollable="scrollable"
      @focus="handleFocus"
    >
      <template
        #top
      >
        <slot
          name="top"
        />
      </template>

      <template
        #default="slotProps"
      >
        <slot
          :[scope]="slotProps[scope]"
        />
      </template>
    </BasePaginatedSegmentContainer>
  </BaseModalContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'
import scrollMixin from '@/mixins/scrollMixin'

export default {
  name: 'BasePaginatedSegmentModalContainer',
  components: {
    BaseModalContainer,
    BasePaginatedSegmentContainer
  },
  mixins: [
    scrollMixin
  ],
  props: {
    responseData: Object,
    isLoading: Boolean,
    error: Error,
    scope: String,
    textScope: String,
    limit: Number,
    isMultiple: Boolean
  },
  emits: [
    'call'
  ],
  data () {
    return {
      scrollable: null
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isWithInfiniteScroll'
      ]
    )
  },
  methods: {
    handleCall () {
      this.$emit(
        'call'
      )

      this.scrollable =
        this.$refs.segment.$el
    },
    handleFocus () {
      this.scrollToTop()
    },
    scrollToTop () {
      this.$refs
        .segment
        .scrollToTop()
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
    refresh () {
      this.$refs
        .segment
        .refresh()
    }
  }
}
</script>

<style lang="sass" scoped></style>
