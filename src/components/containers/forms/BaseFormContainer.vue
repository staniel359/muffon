<template>
  <form
    class="ui form main-form"
    ref="form"
    :class="{
      loading: isLoading,
      inverted: isDarkMode
    }"
  >
    <BaseErrorMessage
      v-if="error"
      class="form-error"
      :error="error"
    />

    <slot></slot>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import BaseErrorMessage from '*/components/messages/BaseErrorMessage.vue'
import { setForm } from '*/helpers/actions/plugins/semantic'

export default {
  name: 'BaseFormContainer',
  components: {
    BaseErrorMessage
  },
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    error: Error
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  },
  mounted () {
    setForm(
      this.$refs.form,
      this.options
    )

    this.$emit(
      'init',
      this.$refs.form
    )
  }
}
</script>

<style lang="sass" scoped>
.form-error
  margin-bottom: 1em !important
</style>
