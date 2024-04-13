<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <div class="option-header">
        <BaseButton
          class="green circular option-button"
          left-icon="spotify"
          :text="connectText"
          :is-invertable="false"
          @click="handleClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'ConnectSection',
  components: {
    BaseButton
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
