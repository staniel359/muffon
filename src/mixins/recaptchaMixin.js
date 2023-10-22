import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
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
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    recaptchaOptions () {
      return {
        sitekey: recaptchaKey,
        callback:
          this.handleRecaptchaSuccess,
        theme: this.theme
      }
    },
    theme () {
      return (
        this.isDarkMode ? 'dark' : 'light'
      )
    }
  },
  mounted () {
    window
      .grecaptcha
      .ready(
        this.handleRecaptchaReady
      )
  },
  watch: {
    isDarkMode: 'handleIsDarkModeChange'
  },
  methods: {
    handleIsDarkModeChange () {
      this.reset()
    },
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
      this.reset()
    },
    reset () {
      window
        .grecaptcha
        .reset()
    }
  }
}
