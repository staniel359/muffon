import {
  setToast
} from '@/helpers/actions/plugins/semantic'
import transparencyMixin from '@/mixins/transparencyMixin'
import {
  mainToastOptions
} from '@/helpers/formatters/semantic'

export default {
  mixins: [
    transparencyMixin
  ],
  computed: {
    successToastOptions () {
      return mainToastOptions(
        {
          message:
            this.notificationSuccessMessage,
          status: 'success',
          className:
            this.transparentClass
        }
      )
    }
  },
  methods: {
    notifySuccess () {
      setToast(
        this.successToastOptions
      )
    }
  }
}
