<template>
  <div
    v-show="!isLoading"
  >
    <div class="center-aligned main-bottom-large-section">
      <BaseMenuContainer
        class="background-transparent secondary"
      >
        <PreviousPageItem
          :is-disabled="isPreviousPageDisabled"
          @click="handlePreviousPageClick"
        />

        <template
          v-if="!isPaginationSimple"
        >
          <PageItem
            v-for="page in totalPages"
            :key="page"
            :page="page"
            :total-pages="totalPages"
            :active-page="clientPage"
            :is-disabled="isDisabled"
            @click="handlePageClick"
            @select="handlePageSelect"
          />
        </template>

        <NextPageItem
          :is-disabled="isNextPageDisabled"
          @click="handleNextPageClick"
        />
      </BaseMenuContainer>
    </div>
  </div>
</template>

<script>
import BaseMenuContainer from '@/components/containers/BaseMenuContainer.vue'
import PreviousPageItem from './PaginationSection/PreviousPageItem.vue'
import PageItem from './PaginationSection/PageItem.vue'
import NextPageItem from './PaginationSection/NextPageItem.vue'

export default {
  name: 'PaginationSection',
  components: {
    BaseMenuContainer,
    PreviousPageItem,
    PageItem,
    NextPageItem
  },
  props: {
    isLoading: Boolean,
    isError: Boolean,
    clientPage: Number,
    totalPages: Number,
    isPaginationSimple: Boolean,
    isFirstPage: Boolean,
    isLastPage: Boolean
  },
  emits: [
    'pageClick',
    'pageSelect',
    'previousPageClick',
    'nextPageClick'
  ],
  computed: {
    isPreviousPageDisabled () {
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
    handlePageSelect (
      value
    ) {
      this.$emit(
        'pageSelect',
        value
      )
    },
    handlePreviousPageClick () {
      this.$emit(
        'previousPageClick'
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
