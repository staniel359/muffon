<template>
  <BaseTabsContainer :tabs="tabsFormatted">
    <template
      v-for="tabData in tabsFormatted"
      :key="tabData.uuid"
      #[tabData.scope]="slotProps"
    >
      <BaseSearchTabContainer
        :key="searchKey"
        :class="slotProps.class"
        :isActive="slotProps.isActive"
        :query="query"
        :tabData="tabData"
      />
    </template>
  </BaseTabsContainer>
</template>

<script>
import BaseTabsContainer from '@/containers/BaseTabsContainer.vue'
import BaseSearchTabContainer from '@/containers/BaseSearchTabContainer.vue'
import { collection as formatCollection } from '#/formatters'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'SearchTabs',
  components: {
    BaseTabsContainer,
    BaseSearchTabContainer
  },
  props: {
    query: String,
    searchKey: String
  },
  data () {
    return {
      tabs: [
        {
          name: localize(
            'layout.navigation.artists'
          ),
          scope: 'artists',
          clientPageLimit: 20,
          responsePageLimit: 20,
          component: 'BaseArtistsSimpleList',
          isWithListenersCount: true
        },
        {
          name: localize(
            'layout.navigation.albums'
          ),
          scope: 'albums',
          clientPageLimit: 20,
          responsePageLimit: 20,
          component: 'BaseAlbumsSimpleList',
          isWithListenersCount: true
        },
        {
          name: localize(
            'layout.navigation.tracks'
          ),
          scope: 'tracks',
          clientPageLimit: 50,
          responsePageLimit: 50,
          component: 'BaseTracksSimpleList'
        },
        {
          name: localize(
            'layout.navigation.tags'
          ),
          scope: 'tags',
          clientPageLimit: 20,
          responsePageLimit: 10,
          component: 'BaseTagsList',
          isWithIcon: false
        }
      ]
    }
  },
  computed: {
    tabsFormatted () {
      return formatCollection(this.tabs)
    }
  }
}
</script>

<style lang="sass" scoped></style>
