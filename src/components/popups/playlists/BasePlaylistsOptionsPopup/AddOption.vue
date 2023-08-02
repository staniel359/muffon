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
    'accountOptionClick'
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
          icon: 'account',
          text: this.$t(
            'actions.from.account'
          ),
          isDisabled:
            !this.isConnections,
          onClick:
            this.handleAccountOptionClick
        }
      ]
    }
  },
  methods: {
    handleAccountOptionClick () {
      this.hidePopup()

      this.$emit(
        'accountOptionClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
