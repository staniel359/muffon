<template>
  <BaseTabsContainer
    class="settings-group-tabs-container"
    :tabs="tabs"
    is-vertical
  >
    <template
      v-for="(tabData, index) in tabs"
      :key="index"
      #[index]="slotProps"
    >
      <Component
        :is="tabData.component"
        class="settings-group-tab"
        :class="slotProps.class"
      />
    </template>
  </BaseTabsContainer>
</template>

<script>
import BaseTabsContainer
  from '@/components/containers/tabs/BaseTabsContainer.vue'
import InfoOptions from './ProfileSettings/InfoOptions.vue'
import LibraryOptions from './ProfileSettings/LibraryOptions.vue'
import PlayerOptions from './ProfileSettings/PlayerOptions.vue'
import AccountOptions from './ProfileSettings/AccountOptions.vue'

export default {
  name: 'ProfileSettings',
  components: {
    BaseTabsContainer,
    InfoOptions,
    LibraryOptions,
    PlayerOptions,
    AccountOptions
  },
  data () {
    return {
      tabs: [
        {
          nameCode:
            'settings.sections.info',
          icon: 'profileInfo',
          scope: 'info',
          component: 'InfoOptions'
        },
        {
          nameCode: 'navigation.library',
          icon: 'library',
          scope: 'library',
          component: 'LibraryOptions'
        },
        {
          nameCode: 'navigation.player',
          icon: 'player',
          scope: 'player',
          component: 'PlayerOptions'
        },
        {
          nameCode:
            'settings.sections.account',
          icon: 'profile',
          scope: 'account',
          component: 'AccountOptions'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
