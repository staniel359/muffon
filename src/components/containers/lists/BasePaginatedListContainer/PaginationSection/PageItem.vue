<template>
  <template
    v-if="isRenderPage"
  >
    <EmptyPageItem
      v-if="isPageEmpty"
      :is-disabled="isDisabled"
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
    totalPagesCount: {
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
    'click'
  ],
  data () {
    return {
      nearCount: 0,
      emptyCount: 1
    }
  },
  computed: {
    isRenderPage () {
      const p = this.page
      const t = this.totalPagesCount
      const a = this.activePage
      const n = this.nearCount
      const e = this.emptyCount

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
      const t = this.totalPagesCount
      const a = this.activePage
      const n = this.nearCount
      const e = this.emptyCount

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
    }
  }
}
</script>

<style lang="sass" scoped></style>
