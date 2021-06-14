<template>
  <div
    class="ui menu main-pagination"
    :class="{ inverted: isDarkMode }"
  >
    <a
      v-if="isWithEdgeButtons"
      class="item"
      :class="{ disabled: isStartDisabled }"
      @click="handleStartClick"
    >
      <i class="angle double left icon direction-icon" />
    </a>

    <a
      v-if="isWithNearButtons"
      class="item"
      :class="{ disabled: isStartDisabled }"
      @click="handlePrevClick"
    >
      <i class="chevron left icon direction-icon" />
    </a>

    <template
      v-for="page in totalPages"
      :key="page"
    >
      <template v-if="isRenderPage(page)">
        <div
          v-if="isPageEmpty(page)"
          class="item"
          :class="{ disabled: isDisabled }"
        >
          ...
        </div>
        <a
          v-else
          class="item"
          :class="{
            disabled: isDisabled,
            active: isPageActive(page)
          }"
          @click="handlePageClick(page)"
        >
          {{ page }}
        </a>
      </template>
    </template>

    <a
      v-if="isWithNearButtons"
      class="item"
      :class="{ disabled: isEndDisabled }"
      @click="handleNextClick"
    >
      <i class="chevron right icon direction-icon" />
    </a>

    <a
      v-if="isWithEdgeButtons"
      class="item"
      :class="{ disabled: isEndDisabled }"
      @click="handleEndClick"
    >
      <i class="angle double right icon direction-icon" />
    </a>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BasePagination',
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    edgeCount: {
      type: Number,
      default: 1
    },
    nearCount: {
      type: Number,
      default: 0
    },
    emptyCount: {
      type: Number,
      default: 1
    },
    isWithNearButtons: Boolean,
    isWithEdgeButtons: Boolean,
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
    ...mapState('layout', [
      'isDarkMode'
    ]),
    isStartDisabled () {
      return (
        this.isDisabled ||
          this.activePage === 1
      )
    },
    isEndDisabled () {
      return this.isDisabled || (
        this.activePage === this.totalPages
      )
    }
  },
  watch: {
    activePage: 'handleActivePageChange'
  },
  methods: {
    handleStartClick () {
      this.activePage = 1
    },
    handlePrevClick () {
      this.activePage--
    },
    handlePageClick (page) {
      this.activePage = page
    },
    handleNextClick () {
      this.activePage++
    },
    handleEndClick () {
      this.activePage = this.totalPages
    },
    handleActivePageChange (value) {
      this.$emit('pageChange', value)
    },
    isPageActive (page) {
      return (
        !this.isDisabled &&
          page === this.activePage
      )
    },
    isRenderPage (page) {
      const total = this.totalPages
      const active = this.activePage
      const edge = this.edgeCount
      const near = this.nearCount
      const empty = this.emptyCount

      return (
        (active <= edge + empty + near + 1 &&
          page <= edge + empty * 2 + near * 2 + 1) ||
        (active >= total - edge - empty - near &&
          page >= total - edge - empty * 2 - near * 2) ||
        (page <= active + near + empty &&
          page >= active - near - empty) ||
        page <= edge ||
        page > total - edge
      )
    },
    isPageEmpty (page) {
      const total = this.totalPages
      const active = this.activePage
      const edge = this.edgeCount
      const near = this.nearCount
      const empty = this.emptyCount

      return (
        (active <= edge + empty + near + 1 &&
          page > edge + empty + near * 2 + 1 &&
          page < total - edge + 1) ||
        (active > edge + empty + near + 1 &&
          active < total - edge - empty - near &&
          (page === active + near + 1 ||
            page === active - near - 1)) ||
        (active >= total - edge - empty - near &&
          page < total - edge - empty - near * 2 &&
          page > edge)
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
