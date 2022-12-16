<template>
  <form
    ref="form"
    class="ui form main-form"
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

    <slot />
  </form>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import {
  setForm
} from '@/helpers/actions/plugins/semantic'

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
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    )
  },
  mounted () {
    setForm(
      this.$refs.form,
      this.options
    )
  }
}
</script>

<style lang="sass" scoped>
.form-error
  margin-bottom: 1em !important
</style>
