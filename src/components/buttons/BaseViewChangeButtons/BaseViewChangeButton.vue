<template>
  <BaseButton
    class="compact"
    :icon="button"
    :class="{ active: isActive }"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'

export default {
  name: 'BaseViewChangeButton',
  components: {
    BaseButton
  },
  props: {
    button: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    viewIndex: {
      type: Number,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    isActive () {
      return this.index === this.viewIndex
    }
  },
  methods: {
    handleClick () {
      if (!this.isActive) {
        this.$emit('click', this.index)
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
