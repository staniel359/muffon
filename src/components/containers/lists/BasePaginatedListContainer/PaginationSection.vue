<template>
  <BaseDivider />

  <div class="main-pagination-container">
    <BaseMenuContainer
      class="small main-pagination"
    >
      <PreviousPageItem
        :is-disabled="isPrevPageDisabled"
        @click="handlePrevPageClick"
      />

      <template
        v-if="!isPaginationSimple"
      >
        <PageItem
          v-for="page in totalPagesCount"
          :key="page"
          :page="page"
          :total-pages-count="totalPagesCount"
          :active-page="clientPage"
          :is-disabled="isDisabled"
          @click="handlePageClick"
        />
      </template>

      <NextPageItem
        :is-disabled="isNextPageDisabled"
        @click="handleNextPageClick"
      />
    </BaseMenuContainer>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import BaseMenuContainer from '*/components/containers/BaseMenuContainer.vue'
import PreviousPageItem from './PaginationSection/PreviousPageItem.vue'
import PageItem from './PaginationSection/PageItem.vue'
import NextPageItem from './PaginationSection/NextPageItem.vue'

export default {
  name: 'PaginationSection',
  components: {
    BaseDivider,
    BaseMenuContainer,
    PreviousPageItem,
    PageItem,
    NextPageItem
  },
  props: {
    isLoading: Boolean,
    isError: Boolean,
    clientPage: Number,
    totalPagesCount: Number,
    isPaginationSimple: Boolean,
    isFirstPage: Boolean,
    isLastPage: Boolean
  },
  emits: [
    'pageClick',
    'prevPageClick',
    'nextPageClick'
  ],
  computed: {
    isPrevPageDisabled () {
      return (
        this.isDisabled ||
          this.isFirstPage
      )
    },
    isDisabled () {
      return (
        this.isLoading ||
          this.isError
      )
    },
    isNextPageDisabled () {
      return (
        this.isDisabled ||
          this.isLastPage
      )
    }
  },
  methods: {
    handlePageClick (
      value
    ) {
      this.$emit(
        'pageClick',
        value
      )
    },
    handlePrevPageClick () {
      this.$emit(
        'prevPageClick'
      )
    },
    handleNextPageClick () {
      this.$emit(
        'nextPageClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
