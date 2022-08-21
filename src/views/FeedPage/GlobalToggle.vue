<template>
  <div class="global-toggle">
    <div
      class="global-text"
      v-text="globalText"
    />

    <BaseToggle
      :is-update-global-store="false"
      @is-checked-change="handleIsCheckedChange"
    />
  </div>
</template>

<script>
import BaseToggle from '*/components/BaseToggle.vue'

export default {
  name: 'GlobalToggle',
  components: {
    BaseToggle
  },
  inject: [
    'setIsGlobal'
  ],
  emits: [
    'change'
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

      this.$emit(
        'change'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.global-toggle
  @extend .d-flex, .align-items-center

.global-text
  margin-right: 0.5em
</style>
