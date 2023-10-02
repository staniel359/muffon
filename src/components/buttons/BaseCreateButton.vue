<template>
  <BaseButton
    class="basic circular"
    left-icon="create"
    :class="{
      active: isActive
    }"
    :text="createText"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'BaseCreateButton',
  components: {
    BaseButton
  },
  props: {
    model: {
      type: String,
      required: true
    },
    isActive: Boolean
  },
  emits: [
    'click'
  ],
  computed: {
    createText () {
      return this.$t(
        `actions.createModel.${this.model}`
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
