<template>
  <BaseOption
    icon="import"
    :text="importText"
    :options="options"
  />
</template>

<script>
import BaseOption from '@/components/popups/options/BaseOption.vue'

export default {
  name: 'BaseImportOption',
  components: {
    BaseOption
  },
  inject: [
    'hidePopup'
  ],
  props: {
    isWithAccountOption: Boolean,
    isWithDriveOption: Boolean,
    isConnections: Boolean
  },
  emits: [
    'accountOptionClick',
    'driveOptionClick'
  ],
  computed: {
    importText () {
      return this.$t(
        'actions.import'
      )
    },
    options () {
      return [
        (
          this.isWithAccountOption &&
            this.accountOptionData
        ),
        (
          this.isWithDriveOption &&
            this.driveOptionData
        )
      ].filter(
        e => e
      )
    },
    accountOptionData () {
      return {
        icon: 'account',
        text: this.$t(
          'actions.importFrom.account'
        ),
        isDisabled:
          !this.isConnections,
        onClick:
          this.handleAccountOptionClick
      }
    },
    driveOptionData () {
      return {
        icon: 'drive',
        text: this.$t(
          'actions.importFrom.drive'
        ),
        onClick:
          this.handleDriveOptionClick
      }
    }
  },
  methods: {
    handleAccountOptionClick () {
      this.hidePopup()

      this.$emit(
        'accountOptionClick'
      )
    },
    handleDriveOptionClick () {
      this.hidePopup()

      this.$emit(
        'driveOptionClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
