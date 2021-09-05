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
import { mapActions } from 'vuex'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseTabsContainer from '@/containers/BaseTabsContainer.vue'
import BaseBookmarksTabContainer
  from '@/containers/BaseBookmarksTabContainer.vue'
import formatBookmarksPageNavigation
  from '#/formatters/navigation/bookmarks'
import formatBookmarksPageTab from '#/formatters/tabs/bookmarks'
import { updateTab } from '#/actions'
import { collection as formatCollection } from '#/formatters'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'BookmarksPage',
  components: {
    BaseSegmentContainer,
    BaseTabsContainer,
    BaseBookmarksTabContainer
  },
  data () {
    return {
      tabs: [
        {
          name: localize(
            'layout.navigation.artists'
          ),
          scope: 'artists',
          clientPageLimit: 50,
          responsePageLimit: 50,
          component: 'BaseArtistsSimpleList'
        },
        {
          name: localize(
            'layout.navigation.albums'
          ),
          scope: 'albums',
          clientPageLimit: 50,
          responsePageLimit: 50,
          component: 'BaseAlbumsSimpleList'
        },
        {
          name: localize(
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
  computed: {
    navigationSections () {
      return formatBookmarksPageNavigation()
    },
    tabsFormatted () {
      return formatCollection(
        this.tabs
      )
    }
  },
  mounted () {
    this.setNavigationSections(
      this.navigationSections
    )

    updateTab(
      formatBookmarksPageTab()
    )
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ]),
    handleFocus () {
      this.$nextTick(() => {
        this.$refs.segment.focus()
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
