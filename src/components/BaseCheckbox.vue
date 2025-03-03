<template>
  <div
    ref="checkbox"
    class="ui checkbox"
    @click="handleClick"
  >
    <input
      type="checkbox"
      :name="name"
      :checked="isChecked"
    >

    <label>
      <template
        v-if="text"
      >
        {{ text }}
      </template>
      <template
        v-else
      >
        <slot
          name="text"
        />
      </template>
    </label>
  </div>
</template>

<script>
import checkboxMixin from '@/mixins/checkboxMixin'

export default {
  name: 'BaseCheckbox',
  mixins: [
    checkboxMixin
  ],
  props: {
    name: String,
    text: String
  },
  emits: [
    'isCheckedChange'
  ],
  methods: {
    change (
      value
    ) {
      this.$emit(
        'isCheckedChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
