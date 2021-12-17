<template>
  <BaseSegmentContainer
    ref="segment"
    :class="[
      'raised',
      'main-segment-container',
      'main-page-segment-container',
      'main-paginated-page-segment-container'
    ]"
  >
    <BaseTabsContainer
      class="three item"
      :tabs="tabsCollection"
    >
      <template
        v-for="tabData in tabsCollection"
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
import {
  bookmarks as formatBookmarksPageNavigation
} from '#/formatters/navigation'
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
          scope: 'artists',
          clientPageLimit: 50,
          responsePageLimit: 50,
          component: 'BaseArtistsSimpleList'
        },
        {
          name: this.$t(
            'navigation.albums'
          ),
          scope: 'albums',
          clientPageLimit: 50,
          responsePageLimit: 50,
          component: 'BaseAlbumsSimpleList'
        },
        {
          name: this.$t(
            'navigation.tracks'
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
