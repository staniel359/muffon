<template>
  <BaseSidebarItem
    icon="cog"
    :text="settingsText"
    @click="handleClick"
  />

  <TheSettingsModal ref="modal" />
</template>

<script>
import BaseSidebarItem from '@/BaseSidebarItem.vue'
import TheSettingsModal from '@/layout/modals/TheSettingsModal.vue'

export default {
  name: 'SettingsItem',
  components: {
    BaseSidebarItem,
    TheSettingsModal
  },
  computed: {
    settingsText () {
      return this.$t(
        'navigation.settings'
      )
    }
  },
  methods: {
    handleClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
