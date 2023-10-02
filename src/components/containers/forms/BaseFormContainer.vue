<template>
  <form
    ref="form"
    class="ui form base-form-container"
    :class="{
      loading: isLoading,
      inverted: isDarkMode
    }"
  >
    <div
      v-if="error"
      class="main-top-section"
    >
      <BaseErrorMessage
        :error="error"
      />
    </div>

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
  set as setForm
} from '@/helpers/actions/plugins/semantic/form'

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

<style lang="sass" scoped></style>
