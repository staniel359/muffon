<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionButton
        :text="connectText"
        is-spotify
        @click="handleClick"
      />
    </div>
  </div>
</template>

<script>
import BaseSettingsOptionButton
  from '@/components/buttons/settings/BaseSettingsOptionButton.vue'

export default {
  name: 'ConnectSection',
  components: {
    BaseSettingsOptionButton
  },
  emits: [
    'connectButtonClick'
  ],
  computed: {
    connectText () {
      return this.$t(
        'connections.connect'
      )
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'connectButtonClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
