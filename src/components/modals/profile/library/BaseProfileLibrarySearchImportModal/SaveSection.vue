<template>
  <div class="main-library-modal-save-section">
    <BaseTabsContainer
      ref="tabs"
      :tabs="tabsCollection"
    >
      <template
        v-for="tabData in tabsCollection"
        :key="tabData.uuid"
        #[tabData.scope]="slotProps"
      >
        <Component
          v-if="this[tabData.scope].length"
          :is="tabData.component"
          :class="slotProps.class"
          :[tabData.scope]="this[tabData.scope]"
        />
      </template>
    </BaseTabsContainer>
  </div>
</template>

<script>
import BaseTabsContainer from '@/containers/tabs/BaseTabsContainer.vue'
import SaveArtistsSection from './SaveSection/SaveArtistsSection.vue'
import SaveAlbumsSection from './SaveSection/SaveAlbumsSection.vue'
import SaveTracksSection from './SaveSection/SaveTracksSection.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'SaveSection',
  components: {
    BaseTabsContainer,
    SaveArtistsSection,
    SaveAlbumsSection,
    SaveTracksSection
  },
  props: {
    artists: Array,
    albums: Array,
    tracks: Array
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
            'navigation.artists'
          ),
          component: 'SaveArtistsSection',
          scope: 'artists'
        },
        {
          name: this.$t(
            'navigation.albums'
          ),
          component: 'SaveAlbumsSection',
          scope: 'albums'
        },
        {
          name: this.$t(
            'navigation.tracks'
          ),
          component: 'SaveTracksSection',
          scope: 'tracks'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
