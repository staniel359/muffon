<template>
  <div class="fitted item">
    <button
      class="ui icon compact basic large button main-navbar-button"
      @click="handleClick"
    >
      <i class="cog icon" />
    </button>
  </div>

  <TheSettingsModal ref="modal" />
</template>

<script>
import TheSettingsModal from '@/layout/TheSettingsModal.vue'

export default {
  name: 'NavbarSettingsButton',
  components: {
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
