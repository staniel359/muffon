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
import LastfmOptions from './IntegrationsSettings/LastfmOptions.vue'
import DiscordOptions from './IntegrationsSettings/DiscordOptions.vue'

export default {
  name: 'IntegrationsSettings',
  components: {
    BaseTabsContainer,
    LastfmOptions,
    DiscordOptions
  },
  data () {
    return {
      tabs: [
        {
          name: 'Last.FM',
          icon: 'lastfm',
          scope: 'lastfm',
          component: 'LastfmOptions'
        },
        {
          name: 'Discord',
          icon: 'discord',
          scope: 'discord',
          component: 'DiscordOptions'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
