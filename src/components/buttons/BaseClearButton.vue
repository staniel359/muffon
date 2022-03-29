<template>
  <BaseLinkContainer>
    <BaseButton
      class="basic red mini compact circular clear-button"
      icon="close"
      @click.prevent="handleClick"
    />
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseButton from '*/components/buttons/BaseButton.vue'

export default {
  name: 'BaseClearButton',
  components: {
    BaseLinkContainer,
    BaseButton
  },
  emits: [
    'click'
  ],
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped>
.clear-button
  @extend .no-margin
</style>
