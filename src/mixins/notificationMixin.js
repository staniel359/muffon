import {
  setToast
} from '@/helpers/actions/plugins/semantic'

export default {
  computed: {
    notificationSuccessData () {
      return {
        message:
          this.notificationSuccessMessage,
        status: 'success'
      }
    }
  },
  methods: {
    notifySuccess () {
      setToast(
        this.notificationSuccessData
      )
    }
  }
}
