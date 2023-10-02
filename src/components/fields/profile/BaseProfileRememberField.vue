<template>
  <div class="field no-margin">
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

<style lang="sass" scoped></style>
