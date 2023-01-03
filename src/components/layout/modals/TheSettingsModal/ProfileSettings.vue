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
import PlayerOptions from './ProfileSettings/PlayerOptions.vue'
import DataOptions from './ProfileSettings/DataOptions.vue'

export default {
  name: 'ProfileSettings',
  components: {
    BaseTabsContainer,
    InfoOptions,
    PlayerOptions,
    DataOptions
  },
  data () {
    return {
      tabs: [
        {
          nameCode:
            'settings.sections.profile.info',
          icon: 'profileInfo',
          scope: 'info',
          component: 'InfoOptions'
        },
        {
          nameCode:
            'settings.sections.app.player',
          icon: 'player',
          scope: 'player',
          component: 'PlayerOptions'
        },
        {
          nameCode:
            'settings.sections.app.data',
          icon: 'data',
          scope: 'data',
          component: 'DataOptions'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
