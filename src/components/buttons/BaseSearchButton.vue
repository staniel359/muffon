<template>
  <BaseButton
    class="basic circular"
    left-icon="search"
    :class="{
      active: isActive
    }"
    :text="searchText"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'BaseSearchButton',
  components: {
    BaseButton
  },
  props: {
    scope: String,
    model: String,
    isActive: Boolean
  },
  emits: [
    'click'
  ],
  computed: {
    searchText () {
      return this.$t(
        `actions.${this.searchTextKey}`
      )
    },
    searchTextKey () {
      if (this.scope) {
        return `searchIn.${this.scope}`
      } else if (this.model) {
        return `searchFor.${this.model}`
      } else {
        return 'search'
      }
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
