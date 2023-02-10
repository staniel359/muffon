<template>
  <template
    v-if="isRenderPage"
  >
    <EmptyPageItem
      v-if="isPageEmpty"
      :total-pages="totalPages"
      :is-disabled="isDisabled"
      @select="handleSelect"
    />
    <NumberPageItem
      v-else
      :page="page"
      :active-page="activePage"
      :is-disabled="isDisabled"
      @click="handleClick"
    />
  </template>
</template>

<script>
import EmptyPageItem from './PageItem/EmptyPageItem.vue'
import NumberPageItem from './PageItem/NumberPageItem.vue'

export default {
  name: 'PageItem',
  components: {
    EmptyPageItem,
    NumberPageItem
  },
  props: {
    page: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    activePage: {
      type: Number,
      required: true
    },
    isDisabled: Boolean
  },
  emits: [
    'click',
    'select'
  ],
  data () {
    return {
      nearPages: 0,
      emptyPages: 1
    }
  },
  computed: {
    isRenderPage () {
      const p = this.page
      const t = this.totalPages
      const a = this.activePage
      const n = this.nearPages
      const e = this.emptyPages

      return (
        (a <= e + n + 2) &&
          (p <= e * 2 + n * 2 + 2)
      ) || (
        (a >= t - e - n - 1) &&
          (p >= t - e * 2 - n * 2 - 1)
      ) || (
        (p <= a + n + e) &&
          (p >= a - n - e)
      ) || (
        p <= 1
      ) || (
        p > t - 1
      )
    },
    isPageEmpty () {
      const p = this.page
      const t = this.totalPages
      const a = this.activePage
      const n = this.nearPages
      const e = this.emptyPages

      return (
        (a <= e + n + 2) &&
          (p > e + n * 2 + 2) &&
          (p < t)
      ) || (
        (a > e + n + 2) &&
          (a < t - e - n - 1) && (
          (p === a + n + 1) ||
            (p === a - n - 1)
        )
      ) || (
        (a >= t - e - n - 1) &&
          (p < t - e - n * 2 - 1) &&
          (p > 1)
      )
    }
  },
  methods: {
    handleClick (
      value
    ) {
      this.$emit(
        'click',
        value
      )
    },
    handleSelect (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
