<template>
  <div class="main-library-modal-import-section">
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
          :ref="tabData.scope"
          :is="tabData.component"
          :class="slotProps.class"
          :[tabData.scope]="this[tabData.scope]"
          @change="handleChange"
        />
      </template>
    </BaseTabsContainer>
  </div>

  <BaseProfileLibrarySaveButton
    @click="handleSaveButtonClick"
  />
</template>

<script>
import BaseTabsContainer from '@/containers/BaseTabsContainer.vue'
import SearchArtistsList from './lists/SearchArtistsList.vue'
import SearchAlbumsList from './lists/SearchAlbumsList.vue'
import SearchTracksList from './lists/SearchTracksList.vue'
import BaseProfileLibrarySaveButton
  from '@/models/profile/library/BaseProfileLibrarySaveButton.vue'
import { collection as formatCollection } from '#/formatters'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'ImportSection',
  components: {
    BaseTabsContainer,
    SearchArtistsList,
    SearchAlbumsList,
    SearchTracksList,
    BaseProfileLibrarySaveButton
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    artists: Array,
    albums: Array,
    tracks: Array
  },
  emits: [
    'change',
    'save'
  ],
  data () {
    return {
      tabs: [
        {
          name: localize(
            'pages.library.add.search.select.artists'
          ),
          component: 'SearchArtistsList',
          scope: 'artists'
        },
        {
          name: localize(
            'pages.library.add.search.select.albums'
          ),
          component: 'SearchAlbumsList',
          scope: 'albums'
        },
        {
          name: localize(
            'pages.library.add.search.select.tracks'
          ),
          component: 'SearchTracksList',
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
  },
  watch: {
    scope: {
      immediate: true,
      handler: 'handleScopeChange'
    }
  },
  methods: {
    handleChange ({ scope }, value) {
      this.$emit(
        'change',
        { scope },
        value
      )
    },
    handleSaveButtonClick () {
      this.$emit('save')
    },
    handleScopeChange (value) {
      const isActiveTab = tabData => {
        return tabData.scope === value
      }

      const activeTab = this.tabsFormatted.find(
        isActiveTab
      )

      this.$nextTick(() => {
        this.$refs.tabs.setActiveTab(
          activeTab.uuid
        )
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
