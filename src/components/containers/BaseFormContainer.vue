<template>
  <form
    class="ui form main-form"
    ref="form"
    :class="{
      loading: isLoading,
      inverted: isDarkMode
    }"
  >
    <BaseError
      v-if="error"
      class="form-error"
      :error="error"
      :isWithButton="false"
    />

    <slot></slot>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import BaseError from '@/BaseError.vue'
import { setForm } from '#/actions/plugins/semantic'

export default {
  name: 'BaseFormContainer',
  components: {
    BaseError
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
