<template>
  <BaseProfilePlaylistPageContainer
    :profile-id="profileId"
    :playlist-id="playlistId"
  >
    <template
      #default="pageSlotProps"
    >
      <div
        :class="[
          'ui raised segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <InfoSegment
          :playlist-data="pageSlotProps.playlistData"
          :profile-id="profileId"
        />

        <ExtraSegment
          :order="order"
        />

        <TracksSegment
          :key="key"
          :profile-id="profileId"
          :playlist-id="playlistId"
          :playlist-title="pageSlotProps.playlistTitle"
          :order="order"
        />
      </div>
    </template>
  </BaseProfilePlaylistPageContainer>
</template>

<script>
import BaseProfilePlaylistPageContainer
  from '@/components/containers/pages/profile/playlist/BaseProfilePlaylistPageContainer.vue'
import InfoSegment from './PlaylistPage/InfoSegment.vue'
import ExtraSegment from './PlaylistPage/ExtraSegment.vue'
import TracksSegment from './PlaylistPage/TracksSegment.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'PlaylistPage',
  components: {
    BaseProfilePlaylistPageContainer,
    InfoSegment,
    ExtraSegment,
    TracksSegment
  },
  mixins: [
    orderChangeMixin
  ],
  props: {
    profileId: String,
    playlistId: String
  },
  data () {
    return {
      key: null,
      order: 'createdAsc'
    }
  },
  watch: {
    order: 'handleOrderChange'
  },
  methods: {
    handleOrderChange (
      value
    ) {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
