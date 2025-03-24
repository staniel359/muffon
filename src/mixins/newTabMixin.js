import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
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
      const tabData = {
        uuid: generateKey(),
        path
      }

      this.addTab(
        tabData
      )

      if (this.isSwitchToNewTab) {
        this.setActiveTab(
          tabData.uuid
        )
      }
    },
    addTab (
      value
    ) {
      const tabDataFormatted =
        JSON.stringify(
          value
        )

      window
        .mainProcess
        .sendCommand(
          'add-tab',
          tabDataFormatted
        )
    },
    setActiveTab (
      tabId
    ) {
      window
        .mainProcess
        .sendCommand(
          'set-active-tab',
          tabId
        )
    }
  }
}
