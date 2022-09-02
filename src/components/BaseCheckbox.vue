<template>
  <div
    ref="checkbox"
    class="ui checkbox"
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
import {
  setCheckbox
} from '*/helpers/actions/plugins/semantic'

export default {
  name: 'BaseCheckbox',
  props: {
    name: String,
    isChecked: Boolean,
    text: String
  },
  mounted () {
    setCheckbox(
      this.$refs.checkbox
    )
  }
}
</script>

<style lang="sass" scoped></style>
