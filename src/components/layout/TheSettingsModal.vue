<template>
  <BaseModalContainer ref="modal">
    <BaseTabsContainer
      class="content main-modal-content-full-height"
      :tabs="tabsFormatted"
    >
      <template
        v-for="tabData in tabsFormatted"
        :key="tabData.uuid"
        #[tabData.scope]="slotProps"
      >
        <Component
          :is="tabData.component"
          :class="slotProps.class"
        />
      </template>
    </BaseTabsContainer>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/BaseModalContainer.vue'
import BaseTabsContainer from '@/containers/BaseTabsContainer.vue'
import AppSettings from './TheSettingsModal/AppSettings.vue'
import ProfileSettings from './TheSettingsModal/ProfileSettings.vue'
import { collection as formatCollection } from '#/formatters'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'TheSettingsModal',
  components: {
    BaseModalContainer,
    BaseTabsContainer,
    AppSettings,
    ProfileSettings
  },
  data () {
    return {
      tabs: [
        {
          name: localize(
            'layout.settings.tabs.app'
          ),
          scope: 'app',
          component: 'AppSettings'
        },
        {
          name: localize(
            'layout.settings.tabs.profile'
          ),
          scope: 'profile',
          component: 'ProfileSettings'
        }
      ]
    }
  },
  computed: {
    tabsFormatted () {
      return formatCollection(
        this.tabs
      )
    }
  },
  methods: {
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
