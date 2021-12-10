<template>
  <BaseSegmentContainer ref="segment">
    <BaseTabsContainer
      class="three item"
      :tabs="tabsFormatted"
    >
      <template
        v-for="tabData in tabsFormatted"
        :key="tabData.uuid"
        #[tabData.scope]="slotProps"
      >
        <BaseProfileLibraryTabContainer
          class="main-relative-tab"
          :class="slotProps.class"
          :isActive="slotProps.isActive"
          :profileId="profileId"
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
import BaseProfileLibraryTabContainer
  from '@/containers/tabs/profile/library/BaseProfileLibraryTabContainer.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'LibraryTabsSegment',
  components: {
    BaseSegmentContainer,
    BaseTabsContainer,
    BaseProfileLibraryTabContainer
  },
  props: {
    profileId: String
  },
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
          scope: 'artists',
          clientPageLimit: 4,
          responsePageLimit: 4,
          component: 'BaseArtistsTableList',
          itemsInRow: 4
        },
        {
          name: this.$t(
            'layout.navigation.albums'
          ),
          scope: 'albums',
          clientPageLimit: 3,
          responsePageLimit: 3,
          component: 'BaseAlbumsTableList',
          itemsInRow: 3
        },
        {
          name: this.$t(
            'layout.navigation.tracks'
          ),
          scope: 'tracks',
          clientPageLimit: 5,
          responsePageLimit: 5,
          component: 'BaseTracksSimpleList'
        }
      ]
    }
  },
  methods: {
    handleFocus () {
      this.$nextTick(() => {
        this.$refs.segment.focus()
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
