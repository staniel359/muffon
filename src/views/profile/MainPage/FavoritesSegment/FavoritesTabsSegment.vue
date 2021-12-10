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
        <BaseProfileFavoriteTabContainer
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
import BaseProfileFavoriteTabContainer
  from '@/containers/tabs/profile/favorites/BaseProfileFavoriteTabContainer.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'LibraryTabsSegment',
  components: {
    BaseSegmentContainer,
    BaseTabsContainer,
    BaseProfileFavoriteTabContainer
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
          clientPageLimit: 5,
          responsePageLimit: 5,
          component: 'BaseArtistsSimpleList'
        },
        {
          name: this.$t(
            'layout.navigation.albums'
          ),
          scope: 'albums',
          clientPageLimit: 5,
          responsePageLimit: 5,
          component: 'BaseAlbumsSimpleList'
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
