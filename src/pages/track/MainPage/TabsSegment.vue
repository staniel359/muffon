<template>
  <BaseTabsSegmentContainer
    :key="key"
    :tabs="tabs"
  >
    <template
      #default="slotProps"
    >
      <Component
        :is="slotProps.component"
        :class="slotProps.class"
        :is-active="slotProps.isActive"
        :track-data="trackData"
        :request-track-data="(
          slotProps.tabData.requestTrackData ||
          requestTrackData
        )"
        @focus="slotProps.handleFocus"
      />
    </template>
  </BaseTabsSegmentContainer>
</template>

<script>
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import SimilarTab from './TabsSegment/SimilarTab.vue'
import AlbumsTab from './TabsSegment/AlbumsTab.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'TabsSegment',
  components: {
    BaseTabsSegmentContainer,
    SimilarTab,
    AlbumsTab
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    requestTrackData: Object
  },
  data () {
    return {
      key: null
    }
  },
  computed: {
    tabs () {
      return [
        {
          nameCode: 'navigation.similar',
          component: 'SimilarTab',
          requestTrackData: {
            source: 'lastfm',
            artistName: this.artistName,
            trackTitle: this.trackTitle
          }
        },
        {
          nameCode: 'navigation.albums',
          component: 'AlbumsTab'
        }
      ]
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    }
  },
  watch: {
    trackData: 'handleTrackDataChange'
  },
  methods: {
    handleTrackDataChange () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
