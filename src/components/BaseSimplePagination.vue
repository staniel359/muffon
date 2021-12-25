<template>
  <div
    class="ui menu main-pagination"
    :class="{ inverted: isDarkMode }"
  >
    <a
      class="item"
      :class="{ disabled: isPrevDisabled }"
      @click="handlePrevPageButtonClick"
    >
      <i class="angle left icon direction-icon" />
    </a>

    <a
      class="item"
      :class="{ disabled: isNextDisabled }"
      @click="handleNextPageButtonClick"
    >
      <i class="angle right icon direction-icon" />
    </a>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseSimplePagination',
  props: {
    isWithPrevPage: Boolean,
    isWithNextPage: Boolean,
    isDisabled: Boolean
  },
  emits: [
    'prevPageButtonClick',
    'nextPageButtonClick'
  ],
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    isPrevDisabled () {
      return (
        !this.isWithPrevPage ||
          this.isDisabled
      )
    },
    isNextDisabled () {
      return (
        !this.isWithNextPage ||
          this.isDisabled
      )
    }
  },
  methods: {
    handlePrevPageButtonClick () {
      this.$emit('prevPageButtonClick')
    },
    handleNextPageButtonClick () {
      this.$emit('nextPageButtonClick')
    }
  }
}
</script>

<style lang="sass" scoped></style>
