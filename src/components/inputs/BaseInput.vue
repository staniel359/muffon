<template>
  <div
    class="ui input"
    :class="{
      inverted: isDarkMode,
      icon
    }"
  >
    <input
      ref="input"
      class="prompt"
      :value="modelValue"
      :placeholder="placeholder"
      @input="handleInput"
      @keypress.enter="handleEnterPress"
    >

    <BaseIcon
      v-if="icon"
      :icon="icon"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '*/components/BaseIcon.vue'

export default {
  name: 'BaseInput',
  components: {
    BaseIcon
  },
  props: {
    modelValue: String,
    icon: String,
    placeholder: String
  },
  emits: [
    'update:modelValue',
    'enterPress'
  ],
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    )
  },
  methods: {
    handleInput (
      event
    ) {
      const {
        value
      } = event.target

      this.$emit(
        'update:modelValue',
        value
      )
    },
    handleEnterPress () {
      this.$emit(
        'enterPress'
      )
    },
    focus () {
      this.$refs
        .input
        .focus()
    },
    unfocus () {
      this.$refs
        .input
        .blur()
    }
  }
}
</script>

<style lang="sass" scoped></style>
