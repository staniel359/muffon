<template>
  <BaseFormInputContainer
    class="ui icon input width-100"
  >
    <BaseIcon
      :icon="passwordToggleIcon"
      is-clickable
      @click="handlePasswordToggleIconClick"
    />

    <input
      ref="input"
      :type="fieldType"
      name="password"
      :placeholder="passwordText"
    >
  </BaseFormInputContainer>
</template>

<script>
import BaseFormInputContainer
  from '@/components/containers/inputs/form/BaseFormInputContainer.vue'

import passwordFieldMixin from '@/mixins/passwordFieldMixin'

export default {
  name: 'BaseProfilePasswordField',
  components: {
    BaseFormInputContainer
  },
  mixins: [
    passwordFieldMixin
  ],
  computed: {
    passwordText () {
      return this.$t(
        'forms.fields.password'
      )
    }
  },
  methods: {
    focus () {
      this.$refs
        .input
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
