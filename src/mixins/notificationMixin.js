import {
  set as setToast
} from '@/helpers/actions/plugins/semantic/toast'
import transparencyMixin from '@/mixins/transparencyMixin'
import {
  main as mainToastOptions
} from '@/helpers/formatters/plugins/semantic/options/toast'

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
