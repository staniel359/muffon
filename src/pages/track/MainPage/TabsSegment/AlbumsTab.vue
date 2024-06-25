<template>
  <BaseTrackTabContainer
    :scope="scope"
    :limit="limit"
    :artist-name="artistName"
    :track-title="trackTitle"
    :is-active="isActive"
    :request-track-data="requestTrackData"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseAlbumsTableList
        :albums="slotProps[scope]"
        :items-in-row="itemsInRow"
        is-with-artist-name
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseTrackTabContainer>
</template>

<script>
import BaseTrackTabContainer
  from '@/components/containers/tabs/track/BaseTrackTabContainer.vue'
import BaseAlbumsTableList
  from '@/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as albumsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'AlbumsTab',
  components: {
    BaseTrackTabContainer,
    BaseAlbumsTableList
  },
  mixins: [
    tabMixin
  ],
  props: {
    trackData: {
      type: Object,
      required: true
    },
    requestTrackData: Object
  },
  data () {
    return {
      limit:
        albumsLimits.table.small,
      itemsInRow: (
        albumsLimits.table.small / 2
      ),
      scope: 'albums'
    }
  },
  computed: {
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    }
  }
}
</script>

<style lang="sass" scoped></style>
