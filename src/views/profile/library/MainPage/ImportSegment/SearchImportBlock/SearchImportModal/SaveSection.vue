<template>
  <div class="main-library-modal-save-section">
    <BaseTabsContainer
      ref="tabs"
      :tabs="tabsFormatted"
    >
      <template
        v-for="tabData in tabsFormatted"
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
import BaseTabsContainer from '@/containers/BaseTabsContainer.vue'
import SaveArtistsSection from './SaveSection/SaveArtistsSection.vue'
import SaveAlbumsSection from './SaveSection/SaveAlbumsSection.vue'
import SaveTracksSection from './SaveSection/SaveTracksSection.vue'
import { collection as formatCollection } from '#/formatters'
import { localize } from '#/actions/plugins/i18n'

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
  data () {
    return {
      tabs: [
        {
          name: localize(
            'pages.library.add.search.select.artists'
          ),
          component: 'SaveArtistsSection',
          scope: 'artists'
        },
        {
          name: localize(
            'pages.library.add.search.select.albums'
          ),
          component: 'SaveAlbumsSection',
          scope: 'albums'
        },
        {
          name: localize(
            'pages.library.add.search.select.tracks'
          ),
          component: 'SaveTracksSection',
          scope: 'tracks'
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
  }
}
</script>

<style lang="sass" scoped></style>
