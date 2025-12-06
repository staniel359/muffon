<template>
  <BaseSidebarItem
    icon="settings"
    :text="text"
    @click="handleClick"
  />

  <TheSettingsModal
    ref="modal"
  />
</template>

<script>
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import TheSettingsModal from '@/components/layout/modals/TheSettingsModal.vue'

export default {
  name: 'SettingsItem',
  components: {
    BaseSidebarItem,
    TheSettingsModal
  },
  computed: {
    text () {
      return this.$t(
        'navigation.settings'
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
