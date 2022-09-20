<template>
  <div class="field remember-field">
    <BaseCheckbox
      name="remember"
      :text="rememberText"
    />
  </div>
</template>

<script>
import BaseCheckbox from '@/components/BaseCheckbox.vue'

export default {
  name: 'BaseProfileRememberField',
  components: {
    BaseCheckbox
  },
  computed: {
    rememberText () {
      return this.$t(
        'forms.fields.remember'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.remember-field
  @extend .no-margin
</style>
