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
  props: {
    isConnections: Boolean
  },
  emits: [
    'searchOptionClick',
    'accountOptionClick',
    'folderOptionClick'
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
          icon: 'account',
          text: this.$t(
            'actions.from.account'
          ),
          isDisabled:
            !this.isConnections,
          onClick:
            this.handleAccountOptionClick
        },
        {
          icon: 'folder',
          text: this.$t(
            'actions.from.folder'
          ),
          onClick:
            this.handleFolderOptionClick
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
    handleAccountOptionClick () {
      this.hidePopup()

      this.$emit(
        'accountOptionClick'
      )
    },
    handleFolderOptionClick () {
      this.hidePopup()

      this.$emit(
        'folderOptionClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
