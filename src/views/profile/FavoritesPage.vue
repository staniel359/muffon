<template>
  <BaseProfilePageContainer
    pageNameKey="favorites"
    :profileId="profileId"
  >
    <template #default>
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
            <BaseProfileFavoritesTabContainer
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
  </BaseProfilePageContainer>
</template>

<script>
import BaseProfilePageContainer
  from '@/containers/pages/profile/BaseProfilePageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseTabsContainer from '@/containers/BaseTabsContainer.vue'
import BaseProfileFavoritesTabContainer
  from '@/containers/profile/BaseProfileFavoritesTabContainer.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'FavoritesPage',
  components: {
    BaseProfilePageContainer,
    BaseSegmentContainer,
    BaseTabsContainer,
    BaseProfileFavoritesTabContainer
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
