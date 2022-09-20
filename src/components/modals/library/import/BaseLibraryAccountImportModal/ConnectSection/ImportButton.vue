<template>
  <div class="import-button-container">
    <BaseButton
      class="lastfm circular"
      icon="lastfm"
      :class="{
        loading: isLoading,
        disabled: isDisabled
      }"
      :text="importText"
      :is-invertable="false"
      @click="handleClick"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'ImportButton',
  components: {
    BaseButton
  },
  props: {
    isLoading: Boolean,
    isUserData: Boolean
  },
  emits: [
    'click'
  ],
  computed: {
    isDisabled () {
      return (
        this.isLoading ||
          this.isUserData
      )
    },
    importText () {
      return this.$t(
        'actions.import.lastfm'
      )
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.import-button-container
  @extend .flex-full
</style>
