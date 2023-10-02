<template>
  <div class="main-toggle-container">
    <div
      class="text-section"
      v-text="onlineText"
    />

    <BaseToggle
      :is-update-global-store="false"
      @is-checked-change="handleIsCheckedChange"
    />
  </div>
</template>

<script>
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'OnlineToggle',
  components: {
    BaseToggle
  },
  inject: [
    'setIsOnline'
  ],
  emits: [
    'refresh'
  ],
  computed: {
    onlineText () {
      return this.$t(
        'online'
      )
    }
  },
  methods: {
    handleIsCheckedChange (
      value
    ) {
      this.setIsOnline(
        value
      )

      this.refresh()
    },
    refresh () {
      this.$emit(
        'refresh'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
