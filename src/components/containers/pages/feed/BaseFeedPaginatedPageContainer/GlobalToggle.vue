<template>
  <div class="main-toggle-container">
    <div
      class="text-section"
      v-text="globalText"
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
  name: 'GlobalToggle',
  components: {
    BaseToggle
  },
  inject: [
    'setIsGlobal'
  ],
  emits: [
    'refresh'
  ],
  computed: {
    globalText () {
      return this.$t(
        'feed.global'
      )
    }
  },
  methods: {
    handleIsCheckedChange (
      value
    ) {
      this.setIsGlobal(
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
