<template>
  <BaseTabsContainer
    :tabs="tabsFormatted"
  >
    <template
      v-for="tabData in tabsFormatted"
      :key="tabData.uuid"
      #[tabData.scope]="slotProps"
    >
      <BaseSearchTabContainer
        :key="searchKey"
        :class="slotProps.class"
        :isActive="slotProps.isActive"
        :sourceId="sourceId"
        :query="query"
        :tabData="tabData"
      />
    </template>
  </BaseTabsContainer>
</template>

<script>
import BaseTabsContainer from '@/containers/tabs/BaseTabsContainer.vue'
import BaseSearchTabContainer
  from '@/containers/tabs/BaseSearchTabContainer.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'SearchTabs',
  components: {
    BaseTabsContainer,
    BaseSearchTabContainer
  },
  props: {
    sourceId: {
      type: String,
      required: true
    },
    query: String,
    searchKey: String
  },
  computed: {
    tabsFormatted () {
      return formatCollection(
        this.tabs[this.sourceId]
      )
    },
    tabs () {
      return {
        vk: [
          this.artistsTab,
          this.albumsTab,
          this.tracksTab
        ],
        odnoklassniki: [
          this.artistsTab,
          this.albumsTab,
          this.tracksTab
        ],
        yandexmusic: [
          this.artistsTab,
          this.albumsTab,
          this.tracksTab
        ],
        spotify: [
          this.artistsTab,
          this.albumsTab,
          this.tracksTab
        ],
        bandcamp: [
          this.artistsTab,
          this.albumsTab,
          this.tracksTab
        ],
        deezer: [
          this.artistsTab,
          this.albumsTab,
          this.tracksTab
        ],
        soundcloud: [
          this.artistsTab,
          this.albumsTab,
          this.tracksTab
        ],
        discogs: [
          this.artistsTab,
          this.albumsTab,
          this.albumGroupsTab
        ],
        genius: [
          this.artistsTab,
          this.albumsTab,
          this.tracksTab
        ],
        lastfm: [
          this.artistsTab,
          this.albumsTab,
          this.tracksTab,
          this.tagsTab
        ],
        youtube: [
          this.videosTab
        ]
      }
    },
    artistsTab () {
      return {
        name: this.$t(
          'layout.navigation.artists'
        ),
        scope: 'artists',
        clientPageLimit: 20,
        responsePageLimit: this.artistsResponsePageLimit,
        component: 'BaseArtistsSimpleList',
        isWithListenersCount: true
      }
    },
    artistsResponsePageLimit () {
      if (
        this.sourceId === 'bandcamp' ||
          this.sourceId === 'yandexmusic'
      ) {
        return 10
      } else {
        return 20
      }
    },
    albumsTab () {
      return {
        name: this.$t(
          'layout.navigation.albums'
        ),
        scope: 'albums',
        clientPageLimit: 20,
        responsePageLimit: this.albumsResponsePageLimit,
        component: 'BaseAlbumsSimpleList',
        isWithListenersCount: true
      }
    },
    albumsResponsePageLimit () {
      if (
        this.sourceId === 'bandcamp' ||
          this.sourceId === 'yandexmusic'
      ) {
        return 10
      } else {
        return 20
      }
    },
    albumGroupsTab () {
      return {
        name: this.$t(
          'layout.navigation.albumGroups'
        ),
        scope: 'groups',
        clientPageLimit: 20,
        responsePageLimit: 20,
        component: 'BaseAlbumsSimpleList',
        isWithListenersCount: true
      }
    },
    tracksTab () {
      return {
        name: this.$t(
          'layout.navigation.tracks'
        ),
        scope: 'tracks',
        clientPageLimit: 50,
        responsePageLimit: this.tracksResponsePageLimit,
        component: 'BaseTracksSimpleList'
      }
    },
    tracksResponsePageLimit () {
      if (this.sourceId === 'bandcamp') {
        return 10
      } else if (
        this.sourceId === 'yandexmusic' ||
          this.sourceId === 'genius'
      ) {
        return 20
      } else {
        return 50
      }
    },
    tagsTab () {
      return {
        name: this.$t(
          'layout.navigation.tags'
        ),
        scope: 'tags',
        clientPageLimit: 20,
        responsePageLimit: 10,
        component: 'BaseTagsList',
        isWithIcon: false
      }
    },
    videosTab () {
      return {
        name: this.$t(
          'layout.navigation.videos'
        ),
        scope: 'videos',
        clientPageLimit: 20,
        responsePageLimit: 20,
        component: 'BaseVideosSimpleList'
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
