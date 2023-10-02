<template>
  <div class="field">
    <BaseCheckbox
      name="private"
      :text="privateText"
      :is-checked="isChecked"
    />
  </div>
</template>

<script>
import BaseCheckbox from '@/components/BaseCheckbox.vue'

export default {
  name: 'BasePrivateField',
  components: {
    BaseCheckbox
  },
  props: {
    model: {
      type: String,
      required: true
    },
    isChecked: Boolean
  },
  computed: {
    privateText () {
      return this.$t(
        `private.${this.model}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
