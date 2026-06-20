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
import profileStore from '@/stores/profile'

import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import {
  set as setForm,
  reset as resetForm,
  validateField as validateFormField
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
    ),
    ...mapState(
      profileStore,
      {
        profileLanguage: 'language'
      }
    )
  },
  watch: {
    profileLanguage: 'handleProfileLanguageChange'
  },
  mounted () {
    this.initialize()
  },
  methods: {
    handleProfileLanguageChange () {
      this.initialize()

      resetForm(
        this.$refs.form
      )
    },
    initialize () {
      setForm(
        this.$refs.form,
        this.options
      )
    },
    validateField (
      value
    ) {
      validateFormField(
        this.$refs.form,
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
