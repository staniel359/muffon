<template>
  <BaseOption
    icon="add"
    :text="addText"
    :options="options"
  />
</template>

<script>
import BaseOption from '@/components/popups/options/BaseOption.vue'

export default {
  name: 'BaseAddOption',
  components: {
    BaseOption
  },
  inject: [
    'hidePopup'
  ],
  props: {
    isWithSearchOption: Boolean,
    isWithLibraryOption: Boolean
  },
  emits: [
    'searchOptionClick',
    'libraryOptionClick'
  ],
  computed: {
    addText () {
      return this.$t(
        'actions.add'
      )
    },
    options () {
      return [
        (
          this.isWithSearchOption &&
            this.searchOptionData
        ),
        (
          this.isWithLibraryOption &&
            this.libraryOptionData
        )
      ].filter(
        e => e
      )
    },
    searchOptionData () {
      return {
        icon: 'search',
        text: this.$t(
          'actions.addFrom.search'
        ),
        onClick:
          this.handleSearchOptionClick
      }
    },
    libraryOptionData () {
      return {
        icon: 'library',
        text: this.$t(
          'actions.addFrom.library'
        ),
        onClick:
          this.handleLibraryOptionClick
      }
    }
  },
  methods: {
    handleSearchOptionClick () {
      this.hidePopup()

      this.$emit(
        'searchOptionClick'
      )
    },
    handleLibraryOptionClick () {
      this.hidePopup()

      this.$emit(
        'libraryOptionClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
