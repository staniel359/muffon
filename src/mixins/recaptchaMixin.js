import {
  recaptchaKey
} from '@/helpers/data/env'

export default {
  data () {
    return {
      recaptchaValue: null
    }
  },
  computed: {
    recaptchaOptions () {
      return {
        sitekey: recaptchaKey,
        callback:
          this.handleRecaptchaSuccess
      }
    }
  },
  mounted () {
    window
      .grecaptcha
      .ready(
        this.handleRecaptchaReady
      )
  },
  methods: {
    handleRecaptchaReady () {
      window
        .grecaptcha
        .render(
          this.recaptchaId,
          this.recaptchaOptions
        )
    },
    handleRecaptchaSuccess (
      value
    ) {
      this.recaptchaValue = value
    },
    handleRecaptchaFieldChange () {
      this.$refs
        .form
        .validateField(
          'recaptcha'
        )
    },
    handleRefreshButtonClick () {
      window
        .grecaptcha
        .reset()
    }
  }
}
