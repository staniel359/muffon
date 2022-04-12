<template>
  <BaseMenuContainer
    class="small main-pagination"
  >
    <PreviousPageItem
      :isDisabled="isPreviousPageDisabled"
      @click="handlePrevPageClick"
    />

    <NextPageItem
      :isDisabled="isNextPageDisabled"
      @click="handleNextPageClick"
    />
  </BaseMenuContainer>
</template>

<script>
import BaseMenuContainer from '*/components/containers/BaseMenuContainer.vue'
import PreviousPageItem from './PaginationSimpleMenu/PreviousPageItem.vue'
import NextPageItem from './PaginationSimpleMenu/NextPageItem.vue'

export default {
  name: 'PaginationSimpleMenu',
  components: {
    BaseMenuContainer,
    PreviousPageItem,
    NextPageItem
  },
  props: {
    prevPage: String,
    nextPage: String,
    isDisabled: Boolean
  },
  emits: [
    'prevPageClick',
    'nextPageClick'
  ],
  computed: {
    isPreviousPageDisabled () {
      return (
        !this.prevPage ||
          this.isDisabled
      )
    },
    isNextPageDisabled () {
      return (
        !this.nextPage ||
          this.isDisabled
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
