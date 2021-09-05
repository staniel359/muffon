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
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseTabsContainer from '@/containers/BaseTabsContainer.vue'
import BaseProfileLibraryTabContainer
  from '@/models/profile/library/BaseProfileLibraryTabContainer.vue'
import { collection as formatCollection } from '#/formatters'
import { localize } from '#/actions/plugins/i18n'

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
  data () {
    return {
      tabs: [
        {
          name: localize(
            'layout.navigation.artists'
          ),
          scope: 'artists',
          clientPageLimit: 4,
          responsePageLimit: 4,
          component: 'BaseArtistsTableList',
          itemsInRow: 4
        },
        {
          name: localize(
            'layout.navigation.albums'
          ),
          scope: 'albums',
          clientPageLimit: 3,
          responsePageLimit: 3,
          component: 'BaseAlbumsTableList',
          itemsInRow: 3
        },
        {
          name: localize(
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
  computed: {
    tabsFormatted () {
      return formatCollection(
        this.tabs
      )
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
