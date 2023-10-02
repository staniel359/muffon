<template>
  <BaseButton
    class="basic circular"
    left-icon="add"
    :class="{
      active: isActive
    }"
    :text="addText"
    @click="handleClick"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'BaseAddButton',
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
    addText () {
      return this.$t(
        `actions.addModel.${this.model}`
      )
    }
  },
  methods: {
    handleClick (
      event
    ) {
      this.$emit(
        'click',
        event
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
