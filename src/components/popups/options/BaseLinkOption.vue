<template>
  <BaseLinkContainer
    class="item main-option-link main-options-option"
    :link="link"
    @click="handleClick"
  >
    <BaseIcon
      class="link main-options-option-icon"
      :icon="icon"
    />

    <span
      class="link"
      v-text="text"
    />
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'BaseLinkOption',
  components: {
    BaseLinkContainer,
    BaseIcon
  },
  props: {
    text: {
      type: String,
      required: true
    },
    icon: String,
    link: Object
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
