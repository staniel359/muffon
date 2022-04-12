<template>
  <BaseDivider />

  <div class="main-pagination-container">
    <PaginationSimpleMenu
      v-if="isPaginationSimple"
      :isDisabled="isDisabled"
      :prevPage="prevPage"
      :nextPage="nextPage"
      @prevPageClick="handlePrevPageClick"
      @nextPageClick="handleNextPageClick"
    />
    <PaginationMenu
      v-else
      :totalPagesCount="totalPagesCount"
      :isDisabled="isDisabled"
      @pageChange="handlePageChange"
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
    handlePageChange (value) {
      this.$emit(
        'pageChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
