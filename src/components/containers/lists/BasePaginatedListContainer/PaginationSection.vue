<template>
  <BaseDivider />

  <div class="main-pagination-container">
    <PaginationSimpleMenu
      v-if="isPaginationSimple"
      :is-disabled="isDisabled"
      :prev-page="prevPage"
      :next-page="nextPage"
      @prev-page-click="handlePrevPageClick"
      @next-page-click="handleNextPageClick"
    />
    <PaginationMenu
      v-else
      :total-pages-count="totalPagesCount"
      :is-disabled="isDisabled"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import PaginationSimpleMenu from './PaginationSection/PaginationSimpleMenu.vue'
import PaginationMenu from './PaginationSection/PaginationMenu.vue'

export default {
  name: 'PaginationSection',
  components: {
    BaseDivider,
    PaginationSimpleMenu,
    PaginationMenu
  },
  props: {
    isLoading: Boolean,
    error: Error,
    totalPagesCount: Number,
    isPaginationSimple: Boolean,
    prevPage: String,
    nextPage: String
  },
  emits: [
    'prevPageClick',
    'nextPageClick',
    'pageChange'
  ],
  computed: {
    isDisabled () {
      return (
        this.isLoading ||
          !!this.error
      )
    }
  },
  methods: {
    handlePrevPageClick () {
      this.$emit(
        'prevPageClick'
      )
    },
    handleNextPageClick () {
      this.$emit(
        'nextPageClick'
      )
    },
    handlePageChange (
      value
    ) {
      this.$emit(
        'pageChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
