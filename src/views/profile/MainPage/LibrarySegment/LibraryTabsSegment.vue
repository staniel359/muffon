<template>
  <BaseSegmentContainer ref="segment">
    <BaseTabsContainer
      class="four item"
      :tabs="tabsCollection"
    >
      <template
        v-for="tabData in tabsCollection"
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
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseTabsContainer
  from '*/components/containers/tabs/BaseTabsContainer.vue'
import BaseProfileLibraryTabContainer
  from '*/components/containers/tabs/profile/library/BaseProfileLibraryTabContainer.vue'
import { collection as formatCollection } from '*/helpers/formatters'

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
          limit: 4,
          component: 'BaseArtistsTableList',
          itemsInRow: 4
        },
        {
          name: this.$t(
            'navigation.albums'
          ),
          scope: 'albums',
          limit: 3,
          component: 'BaseAlbumsTableList',
          itemsInRow: 3
        },
        {
          name: this.$t(
            'navigation.tracks'
          ),
          scope: 'tracks',
          limit: 5,
          component: 'BaseTracksSimpleList'
        },
        {
          name: this.$t(
            'navigation.tags'
          ),
          scope: 'tags',
          limit: 10,
          component: 'BaseTagsList'
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
