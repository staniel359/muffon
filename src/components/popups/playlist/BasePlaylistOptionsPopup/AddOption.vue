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
  name: 'AddOption',
  components: {
    BaseOption
  },
  inject: [
    'hidePopup'
  ],
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
        {
          icon: 'search',
          text: this.$t(
            'actions.from.search'
          ),
          onClick:
            this.handleSearchOptionClick
        },
        {
          icon: 'library',
          text: this.$t(
            'actions.from.library'
          ),
          onClick:
            this.handleLibraryOptionClick
        }
      ]
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
