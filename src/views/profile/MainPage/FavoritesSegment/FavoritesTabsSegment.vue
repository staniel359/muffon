<template>
  <BaseSegmentContainer
    ref="segment"
  >
    <BaseTabsContainer
      class="three item"
      :tabs="tabsCollection"
      @tab-click="handleTabClick"
    >
      <template
        v-for="tabData in tabsCollection"
        :key="tabData.uuid"
        #[tabData.scope]="slotProps"
      >
        <BaseProfileFavoriteTabContainer
          class="main-relative-tab"
          :class="slotProps.class"
          :is-active="slotProps.isActive"
          :profile-id="profileId"
          :tab-data="tabData"
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
import BaseProfileFavoriteTabContainer
  from '*/components/containers/tabs/profile/favorites/BaseProfileFavoriteTabContainer.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'FavoritesTabsSegment',
  components: {
    BaseSegmentContainer,
    BaseTabsContainer,
    BaseProfileFavoriteTabContainer
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
          limit: 3,
          component: 'BaseArtistsSimpleList'
        },
        {
          name: this.$t(
            'navigation.albums'
          ),
          scope: 'albums',
          limit: 3,
          component: 'BaseAlbumsSimpleList'
        },
        {
          name: this.$t(
            'navigation.tracks'
          ),
          scope: 'tracks',
          limit: 5,
          component: 'BaseTracksSimpleList'
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
