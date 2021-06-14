<template>
  <div
    class="ui menu main-pagination"
    :class="{ inverted: isDarkMode }"
  >
    <a
      class="item"
      :class="{ disabled: !isWithPrevPage }"
      @click="handlePrevPageButtonClick"
    >
      <i class="angle left icon direction-icon" />
    </a>

    <a
      class="item"
      :class="{ disabled: !isWithNextPage }"
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
    isWithNextPage: Boolean
  },
  emits: [
    'prevPageButtonClick',
    'nextPageButtonClick'
  ],
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
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
