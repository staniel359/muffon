<template>
  <BaseModalContainer ref="modal">
    <div class="content main-modal-content-full-height">
      <BaseTabsContainer
        :tabs="tabsCollection"
      >
        <template
          v-for="tabData in tabsCollection"
          :key="tabData.uuid"
          #[tabData.scope]="slotProps"
        >
          <Component
            :is="tabData.component"
            class="settings-container"
            :class="slotProps.class"
          />
        </template>
      </BaseTabsContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import BaseTabsContainer
  from '*/components/containers/tabs/BaseTabsContainer.vue'
import AppSettings from './TheSettingsModal/AppSettings.vue'
import ProfileSettings from './TheSettingsModal/ProfileSettings.vue'
import ServicesSettings from './TheSettingsModal/ServicesSettings.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'TheSettingsModal',
  components: {
    BaseModalContainer,
    BaseTabsContainer,
    AppSettings,
    ProfileSettings,
    ServicesSettings
  },
  computed: {
    tabsCollection () {
      return formatCollection(
        this.tabs
      )
    },
    tabs () {
      return [
        {
          name: this.$t(
            'settings.tabs.app'
          ),
          scope: 'app',
          component: 'AppSettings'
        },
        {
          name: this.$t(
            'settings.tabs.profile'
          ),
          scope: 'profile',
          component: 'ProfileSettings'
        },
        {
          name: this.$t(
            'settings.tabs.services'
          ),
          scope: 'services',
          component: 'ServicesSettings'
        }
      ]
    }
  },
  methods: {
    show () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped>
.settings-container
  &.active
    @extend .d-flex, .flex-column
</style>
