import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  ipcRenderer
} from 'electron'
import {
  generateKey
} from '@/helpers/utils'

export default {
  computed: {
    ...mapState(
      layoutStore,
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
