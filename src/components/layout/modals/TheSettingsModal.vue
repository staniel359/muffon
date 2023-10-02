<template>
  <BaseModalContainer
    ref="modal"
    class="the-settings-modal"
    size=""
    is-render
    is-multiple
  >
    <div class="content full-height">
      <BaseTabsContainer
        :tabs="tabsFormatted"
      >
        <template
          v-for="(tabData, index) in tabsFormatted"
          :key="index"
          #[index]="slotProps"
        >
          <Component
            :is="tabData.component"
            :class="slotProps.class"
          />
        </template>
      </BaseTabsContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import BaseTabsContainer
  from '@/components/containers/tabs/BaseTabsContainer.vue'
import AppSettings from './TheSettingsModal/AppSettings.vue'
import ProfileSettings from './TheSettingsModal/ProfileSettings.vue'
import ConnectionsSettings from './TheSettingsModal/ConnectionsSettings.vue'

export default {
  name: 'TheSettingsModal',
  components: {
    BaseModalContainer,
    BaseTabsContainer,
    AppSettings,
    ProfileSettings,
    ConnectionsSettings
  },
  data () {
    return {
      tabs: [
        {
          nameCode: 'settings.tabs.app',
          icon: 'app',
          scope: 'app',
          component: 'AppSettings',
          isAnonymous: true
        },
        {
          nameCode: 'settings.tabs.profile',
          icon: 'profile',
          scope: 'profile',
          component: 'ProfileSettings',
          isAnonymous: false
        },
        {
          nameCode: 'settings.tabs.connections',
          icon: 'connection',
          scope: 'connections',
          component: 'ConnectionsSettings',
          isAnonymous: false
        }
      ]
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    tabsFormatted () {
      if (this.profileId) {
        return this.tabs
      } else {
        return this.anonymousTabs
      }
    },
    anonymousTabs () {
      return this.tabs.filter(
        this.isAnonymousTab
      )
    }
  },
  methods: {
    show () {
      this.$refs
        .modal
        .show()
    },
    isAnonymousTab (
      tabData
    ) {
      return tabData.isAnonymous
    }
  }
}
</script>

<style lang="sass" scoped></style>
