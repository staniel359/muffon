<template>
  <div
    class="item"
    :class="{
      disabled: isLoading
    }"
    @click="handleClick"
  >
    <BaseIcon
      :icon="icon"
      :is-loading="isLoading"
      :is-error="isError"
    />

    {{ text }}
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'BaseOption',
  components: {
    BaseIcon
  },
  props: {
    text: {
      type: String,
      required: true
    },
    icon: String,
    isLoading: Boolean,
    isError: Boolean
  },
  emits: [
    'click'
  ],
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
