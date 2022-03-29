<template>
  <BaseProfilePageContainer
    pageNameKey="favorites"
    :profileId="profileId"
  >
    <template #default>
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
            <BaseProfileFavoriteTabContainer
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
  from '*/components/containers/pages/profile/BaseProfilePageContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseTabsContainer
  from '*/components/containers/tabs/BaseTabsContainer.vue'
import BaseProfileFavoriteTabContainer
  from '*/components/containers/tabs/profile/favorites/BaseProfileFavoriteTabContainer.vue'
import { collection as formatCollection } from '*/helpers/formatters'

export default {
  name: 'FavoritesPage',
  components: {
    BaseProfilePageContainer,
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
