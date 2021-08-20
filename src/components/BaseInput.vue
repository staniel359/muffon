<template>
  <div
    class="ui input"
    :class="{
      inverted: isDarkMode,
      icon
    }"
  >
    <input
      class="prompt"
      ref="input"
      :value="modelValue"
      :placeholder="placeholder"
      @input="handleInput"
      @keypress.enter="handleEnterPress"
    />

    <i
      v-if="icon"
      class="icon"
      :class="icon"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseInput',
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
    ...mapState('layout', [
      'isDarkMode'
    ])
  },
  methods: {
    handleInput (event) {
      this.$emit(
        'update:modelValue',
        event.target.value
      )
    },
    handleEnterPress () {
      this.$emit('enterPress')
    },
    focus () {
      this.$refs.input.focus()
    },
    unfocus () {
      this.$refs.input.blur()
    }
  }
}
</script>

<style lang="sass" scoped></style>
