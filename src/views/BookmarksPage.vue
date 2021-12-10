<template>
  <BaseSegmentContainer
    ref="segment"
    :class="[
      'main-segment-container',
      'main-page-segment-container',
      'main-paginated-page-segment-container'
    ]"
  >
    <BaseTabsContainer
      class="three item"
      :tabs="tabsFormatted"
    >
      <template
        v-for="tabData in tabsFormatted"
        :key="tabData.uuid"
        #[tabData.scope]="slotProps"
      >
        <BaseBookmarksTabContainer
          :class="slotProps.class"
          :isActive="slotProps.isActive"
          :tabData="tabData"
          @focus="handleFocus"
        />
      </template>
    </BaseTabsContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseTabsContainer from '@/containers/tabs/BaseTabsContainer.vue'
import BaseBookmarksTabContainer
  from '@/containers/tabs/BaseBookmarksTabContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatBookmarksPageNavigation
  from '#/formatters/navigation/bookmarks'
import formatBookmarksPageTab from '#/formatters/tabs/bookmarks'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BookmarksPage',
  components: {
    BaseSegmentContainer,
    BaseTabsContainer,
    BaseBookmarksTabContainer
  },
  mixins: [
    navigationMixin
  ],
  computed: {
    navigationSections () {
      return formatBookmarksPageNavigation()
    },
    tabData () {
      return formatBookmarksPageTab()
    },
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
          scope: 'artists',
          clientPageLimit: 50,
          responsePageLimit: 50,
          component: 'BaseArtistsSimpleList'
        },
        {
          name: this.$t(
            'layout.navigation.albums'
          ),
          scope: 'albums',
          clientPageLimit: 50,
          responsePageLimit: 50,
          component: 'BaseAlbumsSimpleList'
        },
        {
          name: this.$t(
            'layout.navigation.tracks'
          ),
          scope: 'tracks',
          clientPageLimit: 50,
          responsePageLimit: 50,
          component: 'BaseTracksSimpleList'
        }
      ]
    }
  },
  mounted () {
    this.setNavigation()
  },
  methods: {
    handleFocus () {
      this.$refs.segment.focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
