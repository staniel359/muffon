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

  <BaseSaveButton
    @click="handleSaveButtonClick"
  />
</template>

<script>
import BaseTabsContainer from '@/containers/BaseTabsContainer.vue'
import SearchArtistsList from './lists/SearchArtistsList.vue'
import SearchAlbumsList from './lists/SearchAlbumsList.vue'
import SearchTracksList from './lists/SearchTracksList.vue'
import BaseSaveButton from '@/BaseSaveButton.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'ImportSection',
  components: {
    BaseTabsContainer,
    SearchArtistsList,
    SearchAlbumsList,
    SearchTracksList,
    BaseSaveButton
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
  computed: {
    tabsFormatted () {
      return formatCollection(
        this.tabs
      )
    },
    tabs () {
      return [
        {
          name: this.$t(
            'layout.navigation.artists'
          ),
          component: 'SearchArtistsList',
          scope: 'artists'
        },
        {
          name: this.$t(
            'layout.navigation.albums'
          ),
          component: 'SearchAlbumsList',
          scope: 'albums'
        },
        {
          name: this.$t(
            'layout.navigation.tracks'
          ),
          component: 'SearchTracksList',
          scope: 'tracks'
        }
      ]
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

      const activeTabIndex = this.tabsFormatted.findIndex(
        isActiveTab
      )

      this.$nextTick(() => {
        this.$refs.tabs.setActiveTab(
          activeTabIndex
        )
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
