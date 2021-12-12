<template>
  <a
    class="item main-sidebar-item"
    @click="handleClick"
  >
    <div class="main-sidebar-item-icon-container">
      <i class="cog grey icon"></i>
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="settingsText"
      />
    </div>
  </a>

  <TheSettingsModal ref="modal" />
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import TheSettingsModal from '@/layout/modals/TheSettingsModal.vue'

export default {
  name: 'SettingsItem',
  components: {
    BaseHeader,
    TheSettingsModal
  },
  computed: {
    settingsText () {
      return this.$t(
        'layout.sidebar.settings'
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
