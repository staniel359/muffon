<template>
  <BaseButton
    class="circular"
    :class="[
      color,
      {
        loading: isLoading,
        disabled: isDisabled
      }
    ]"
    :left-icon="source"
    :text="importText"
    :is-invertable="false"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'ImportButton',
  components: {
    BaseButton
  },
  props: {
    source: {
      type: String,
      required: true
    },
    isLoading: Boolean,
    isUserData: Boolean
  },
  emits: [
    'click'
  ],
  data () {
    return {
      sourceColorsData: {
        lastfm: 'red',
        spotify: 'green'
      }
    }
  },
  computed: {
    isDisabled () {
      return (
        this.isLoading ||
          this.isUserData
      )
    },
    importText () {
      return this.$t(
        `actions.importFromAccount.${this.source}`
      )
    },
    color () {
      return this.sourceColorsData[
        this.source
      ]
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

<style lang="sass" scoped></style>
