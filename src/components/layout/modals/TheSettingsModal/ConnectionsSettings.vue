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
import LastfmOptions from './ConnectionsSettings/LastfmOptions.vue'
import SpotifyOptions from './ConnectionsSettings/SpotifyOptions.vue'
import DiscordOptions from './ConnectionsSettings/DiscordOptions.vue'

export default {
  name: 'ConnectionsSettings',
  components: {
    BaseTabsContainer,
    LastfmOptions,
    SpotifyOptions,
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
          name: 'Spotify',
          icon: 'spotify',
          scope: 'spotify',
          component: 'SpotifyOptions'
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
