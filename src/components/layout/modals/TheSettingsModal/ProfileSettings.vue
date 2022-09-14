<template>
  <BaseTabsContainer
    class="settings-group-tabs-container"
    :tabs="tabs"
    :is-pointing="false"
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
  from '*/components/containers/tabs/BaseTabsContainer.vue'
import InfoOptions from './ProfileSettings/InfoOptions.vue'
import PlayerOptions from './ProfileSettings/PlayerOptions.vue'

export default {
  name: 'ProfileSettings',
  components: {
    BaseTabsContainer,
    InfoOptions,
    PlayerOptions
  },
  data () {
    return {
      tabs: [
        {
          nameCode:
            'settings.sections.profile.info',
          scope: 'info',
          component: 'InfoOptions'
        },
        {
          nameCode:
            'settings.sections.app.player',
          scope: 'player',
          component: 'PlayerOptions'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
