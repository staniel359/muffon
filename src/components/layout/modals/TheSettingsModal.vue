<template>
  <BaseModalContainer
    ref="modal"
    size="small"
  >
    <div class="content main-modal-content-full-height">
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
  mapGetters
} from 'vuex'
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import BaseTabsContainer
  from '*/components/containers/tabs/BaseTabsContainer.vue'
import AppSettings from './TheSettingsModal/AppSettings.vue'
import ProfileSettings from './TheSettingsModal/ProfileSettings.vue'
import ServicesSettings from './TheSettingsModal/ServicesSettings.vue'

export default {
  name: 'TheSettingsModal',
  components: {
    BaseModalContainer,
    BaseTabsContainer,
    AppSettings,
    ProfileSettings,
    ServicesSettings
  },
  data () {
    return {
      tabs: [
        {
          nameCode: 'settings.tabs.app',
          scope: 'app',
          component: 'AppSettings',
          isAnonymous: true
        },
        {
          nameCode: 'settings.tabs.profile',
          scope: 'profile',
          component: 'ProfileSettings',
          isAnonymous: false
        },
        {
          nameCode: 'settings.tabs.services',
          scope: 'services',
          component: 'ServicesSettings',
          isAnonymous: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters(
      'profile',
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
