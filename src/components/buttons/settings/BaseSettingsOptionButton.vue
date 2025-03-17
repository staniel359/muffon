<template>
  <div class="main-settings-option-header">
    <BaseButton
      class="circular option-button"
      :class="{
        basic: isBasic,
        red: (
          isLastfm || isDelete
        ),
        green: isSpotify,
        loading: isLoading,
        disabled: (
          isDisabled || isLoading
        )
      }"
      :left-icon="icon"
      :text="text"
      :is-invertable="false"
      @click="handleClick"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'BaseSettingsOptionButton',
  components: {
    BaseButton
  },
  props: {
    text: {
      type: String,
      required: true
    },
    isBasic: Boolean,
    isDelete: Boolean,
    isLastfm: Boolean,
    isSpotify: Boolean,
    isDisabled: Boolean,
    isLoading: Boolean
  },
  emits: [
    'click'
  ],
  computed: {
    icon () {
      if (this.isDelete) {
        return 'delete'
      } else if (this.isLastfm) {
        return 'lastfm'
      } else if (this.isSpotify) {
        return 'spotify'
      } else {
        return null
      }
    }
  },
  methods: {
    handleClick (
      event
    ) {
      this.$emit(
        'click',
        event
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
