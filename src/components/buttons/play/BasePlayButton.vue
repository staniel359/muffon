<template>
  <div class="ui primary buttons">
    <BaseButton
      left-icon="play"
      :text="buttonText"
      :is-loading="isLoading"
      :is-error="!!error"
      :is-invertable="false"
      @click="handleClick"
    />

    <CheckedOptionButton
      v-for="option in checkedOptions"
      :key="option"
      :option="option"
      :options="options"
    />

    <BaseDropdown
      class="button compact text-color-white"
      :options="options"
      :is-invertable="false"
      is-button-extra
      is-checkboxes
    />
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'
import CheckedOptionButton
  from './BasePlayButton/CheckedOptionButton.vue'

export default {
  name: 'BasePlayButton',
  components: {
    BaseButton,
    BaseDropdown,
    CheckedOptionButton
  },
  props: {
    checkedOptions: {
      type: Array,
      default () {
        return []
      }
    },
    isLoading: Boolean,
    error: Error
  },
  emits: [
    'click'
  ],
  data () {
    return {
      options: [
        {
          id: 'shuffle',
          name: this.$t(
            'actions.shuffle'
          ),
          icon: 'audioShuffle',
          isWithCheckbox: true
        },
        {
          id: 'loop',
          name: this.$t(
            'actions.loop'
          ),
          icon: 'audioLoop',
          isWithCheckbox: true
        }
      ]
    }
  },
  computed: {
    buttonText () {
      return this.$t(
        'actions.play'
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

<style lang="sass" scoped></style>
