<template>
  <BaseSidebarItem
    icon="help"
    :text="helpText"
    @click="handleClick"
  />

  <TheHelpModal
    ref="modal"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import TheHelpModal from '@/components/layout/modals/TheHelpModal.vue'

export default {
  name: 'HelpItem',
  components: {
    BaseSidebarItem,
    TheHelpModal
  },
  computed: {
    helpText () {
      return this.$t(
        'navigation.help'
      )
    }
  },
  methods: {
    handleClick () {
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
