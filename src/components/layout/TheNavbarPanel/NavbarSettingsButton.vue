<template>
  <div class="fitted item">
    <BaseButton
      class="basic large main-navbar-button"
      icon="cog"
      @click="handleClick"
    />
  </div>

  <TheSettingsModal ref="modal" />
</template>

<script>
import BaseButton from '@/BaseButton.vue'
import TheSettingsModal from '@/layout/TheSettingsModal.vue'

export default {
  name: 'NavbarSettingsButton',
  components: {
    BaseButton,
    TheSettingsModal
  },
  methods: {
    handleClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
