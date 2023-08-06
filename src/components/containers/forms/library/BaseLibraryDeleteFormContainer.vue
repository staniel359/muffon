<template>
  <BaseFormContainer
    ref="form"
    :options="options"
    :is-loading="isLoading"
    :error="error"
  >
    <slot />
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer
  from '@/components/containers/forms/BaseFormContainer.vue'
import libraryDeleteFormOptions
  from '@/helpers/formatters/plugins/semantic/options/form/library/delete'
import deleteLibrary from '@/helpers/actions/api/library/delete'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'BaseLibraryDeleteFormContainer',
  components: {
    BaseFormContainer
  },
  mixins: [
    notificationMixin
  ],
  inject: [
    'hideModals'
  ],
  data () {
    return {
      error: null,
      isLoading: false,
      isSuccess: false,
      fields: [
        'password'
      ]
    }
  },
  computed: {
    options () {
      return libraryDeleteFormOptions(
        {
          onSuccess: this.handleSuccess
        }
      )
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.deleted.library'
      )
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteLibrary,
    handleSuccess (
      event,
      fields
    ) {
      event.preventDefault()

      const deleteArgs =
        this.formatDeleteArgs(
          fields
        )

      this.deleteLibrary(
        deleteArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.hideModals()

        this.notifySuccess()
      }
    },
    formatDeleteArgs (
      fields
    ) {
      const {
        password
      } = fields

      return {
        password
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
