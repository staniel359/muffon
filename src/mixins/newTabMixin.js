import {
  ipcRenderer
} from 'electron'
import {
  mapState
} from 'vuex'
import {
  generateKey
} from '@/helpers/utils'

export default {
  computed: {
    ...mapState(
      'layout',
      [
        'isSwitchToNewTab'
      ]
    )
  },
  methods: {
    openNewTab (
      {
        path
      }
    ) {
      const tabData =
        this.getTabData(
          {
            path
          }
        )

      ipcRenderer.send(
        'add-tab',
        tabData
      )

      if (this.isSwitchToNewTab) {
        ipcRenderer.send(
          'set-active-tab',
          tabData.uuid
        )
      }
    },
    getTabData (
      {
        path
      }
    ) {
      return {
        uuid: generateKey(),
        path,
        isLoading: true
      }
    }
  }
}
