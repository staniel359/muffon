<template>
  <BaseButton
    class="basic red mini compact circular main-clear-button"
    icon="close"
    :is-invertable="false"
    @click.prevent="handleClick"
  />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'

export default {
  name: 'BaseClearButton',
  components: {
    BaseButton
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
