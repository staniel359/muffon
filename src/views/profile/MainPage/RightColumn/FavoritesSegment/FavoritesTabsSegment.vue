<template>
  <BaseSegmentContainer
    ref="segment"
  >
    <BaseTabsContainer
      class="item"
      :class="columnWidth"
      :tabs="tabs"
      @tab-click="handleTabClick"
    >
      <template
        v-for="(tabData, index) in tabs"
        :key="index"
        #[index]="slotProps"
      >
        <Component
          :is="tabData.component"
          class="main-relative-tab"
          :class="slotProps.class"
          :is-active="slotProps.isActive"
          :profile-id="profileId"
          @focus="handleFocus"
        />
      </template>
    </BaseTabsContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseTabsContainer from '*/components/containers/tabs/BaseTabsContainer.vue'
import ArtistsTab from './FavoritesTabsSegment/ArtistsTab.vue'
import AlbumsTab from './FavoritesTabsSegment/AlbumsTab.vue'
import TracksTab from './FavoritesTabsSegment/TracksTab.vue'
import {
  numberToColumnWidth
} from '*/helpers/actions/plugins/semantic'

export default {
  name: 'FavoritesTabsSegment',
  components: {
    BaseSegmentContainer,
    BaseTabsContainer,
    ArtistsTab,
    AlbumsTab,
    TracksTab
  },
  props: {
    profileId: String
  },
  computed: {
    columnWidth () {
      return numberToColumnWidth(
        this.tabs.length
      )
    },
    tabs () {
      return [
        {
          name: this.$t(
            'navigation.artists'
          ),
          component: 'ArtistsTab'
        },
        {
          name: this.$t(
            'navigation.albums'
          ),
          component: 'AlbumsTab'
        },
        {
          name: this.$t(
            'navigation.tracks'
          ),
          component: 'TracksTab'
        }
      ]
    }
  },
  methods: {
    handleTabClick () {
      this.focus()
    },
    handleFocus () {
      this.focus()
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
