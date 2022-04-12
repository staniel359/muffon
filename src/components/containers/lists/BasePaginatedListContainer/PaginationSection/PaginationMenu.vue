<template>
  <BaseMenuContainer
    class="small main-pagination"
  >
    <PreviousPageItem
      :isDisabled="isPreviousPageDisabled"
      @click="handlePreviousPageClick"
    />

    <PageItem
      v-for="page in totalPagesCount"
      :key="page"
      :page="page"
      :totalPagesCount="totalPagesCount"
      :activePage="activePage"
      :isDisabled="isDisabled"
      @click="handlePageClick"
    />

    <NextPageItem
      :isDisabled="isNextPageDisabled"
      @click="handleNextPageClick"
    />
  </BaseMenuContainer>
</template>

<script>
import BaseMenuContainer from '*/components/containers/BaseMenuContainer.vue'
import PreviousPageItem from './PaginationMenu/PreviousPageItem.vue'
import PageItem from './PaginationMenu/PageItem.vue'
import NextPageItem from './PaginationMenu/NextPageItem.vue'

export default {
  name: 'PaginationMenu',
  components: {
    BaseMenuContainer,
    PreviousPageItem,
    PageItem,
    NextPageItem
  },
  props: {
    totalPagesCount: {
      type: Number,
      required: true
    },
    isDisabled: Boolean
  },
  emits: [
    'pageChange'
  ],
  data () {
    return {
      activePage: 1
    }
  },
  computed: {
    isPreviousPageDisabled () {
      return (
        this.isDisabled ||
          this.isFirstPage
      )
    },
    isFirstPage () {
      return this.activePage === 1
    },
    isNextPageDisabled () {
      return (
        this.isDisabled ||
          this.isLastPage
      )
    },
    isLastPage () {
      return (
        this.activePage ===
          this.totalPagesCount
      )
    }
  },
  watch: {
    activePage: 'handleActivePageChange'
  },
  methods: {
    handlePreviousPageClick () {
      this.activePage--
    },
    handlePageClick (value) {
      this.activePage = value
    },
    handleNextPageClick () {
      this.activePage++
    },
    handleActivePageChange (value) {
      this.$emit(
        'pageChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
