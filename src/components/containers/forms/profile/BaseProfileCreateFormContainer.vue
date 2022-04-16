<template>
  <BaseFormContainer
    :options="options"
    :is-loading="isLoading"
    :error="error"
    @init="handleInit"
  >
    <slot />
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer
  from '*/components/containers/forms/BaseFormContainer.vue'
import {
  profileCreateFormOptions
} from '*/helpers/data/plugins/semantic'
import {
  stringToDate as formatStringToDate
} from '*/helpers/formatters'
import createProfile from '*/helpers/actions/api/profile/create'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'BaseProfileCreateFormContainer',
  components: {
    BaseFormContainer
  },
  props: {
    image: Object
  },
  data () {
    return {
      form: null,
      error: null,
      profileData: null,
      isLoading: false
    }
  },
  computed: {
    options () {
      return profileCreateFormOptions(
        {
          onSuccess: this.handleSuccess
        }
      )
    }
  },
  watch: {
    profileData: 'handleProfileDataChange'
  },
  methods: {
    handleInit (
      element
    ) {
      this.form = element
    },
    handleSuccess (
      event,
      fields
    ) {
      event.preventDefault()

      const createArgs =
        this.formatCreateArgs(
          fields
        )

      this.createProfile(
        createArgs
      )
    },
    handleProfileDataChange (
      value
    ) {
      updateGlobalStore(
        {
          'profile/store.isLoggedIn': !!value,
          'profile.info': value
        }
      )
    },
    createProfile,
    formatCreateArgs (
      fields
    ) {
      const {
        email,
        password,
        passwordConfirmation,
        nickname,
        gender,
        birthdate,
        country,
        city
      } = fields

      const image = this.image.data

      const birthdateToDate = formatStringToDate(
        birthdate
      )

      const isRemember = !!fields.remember

      return {
        email,
        password,
        passwordConfirmation,
        nickname,
        image,
        gender,
        birthdate: birthdateToDate,
        country,
        city,
        isRemember
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
