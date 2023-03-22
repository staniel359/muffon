<template>
  <BaseModalContainer
    ref="modal"
    size="small"
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
import IntegrationsSettings from './TheSettingsModal/IntegrationsSettings.vue'

export default {
  name: 'TheSettingsModal',
  components: {
    BaseModalContainer,
    BaseTabsContainer,
    AppSettings,
    ProfileSettings,
    IntegrationsSettings
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
          nameCode: 'settings.tabs.integrations',
          icon: 'integration',
          scope: 'integrations',
          component: 'IntegrationsSettings',
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

<style lang="sass" scoped>
::v-deep(.settings-group-tabs-container)
  .main-tabs
    @extend .no-margin, .overflow-y-auto
    flex: 0.3
    margin-right: 1em !important
  .main-tab-container
    flex: 0.7 !important

::v-deep(.settings-group-tab)
  @extend .d-flex, .flex-column
  &:not(.active)
    @extend .visibility-hidden
</style>
