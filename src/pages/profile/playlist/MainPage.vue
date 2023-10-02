<template>
  <BaseProfilePlaylistPageContainer
    :key="refreshKey"
    :profile-id="profileId"
    :playlist-id="playlistId"
  >
    <template
      #default="slotProps"
    >
      <BaseSegmentsContainer
        class="main-page-segment-container"
      >
        <InfoSegment
          :playlist-data="slotProps.playlistData"
          :profile-id="profileId"
        />

        <ExtraSegment
          :order="order"
        />

        <TracksSegment
          :key="key"
          :profile-id="profileId"
          :playlist-id="playlistId"
          :playlist-title="slotProps.playlistTitle"
          :order="order"
        />
      </BaseSegmentsContainer>
    </template>
  </BaseProfilePlaylistPageContainer>
</template>

<script>
import BaseProfilePlaylistPageContainer
  from '@/components/containers/pages/profile/playlist/BaseProfilePlaylistPageContainer.vue'
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import ExtraSegment from './MainPage/ExtraSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import pageMixin from '@/mixins/pageMixin'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'MainPage',
  components: {
    BaseProfilePlaylistPageContainer,
    BaseSegmentsContainer,
    InfoSegment,
    ExtraSegment,
    TracksSegment
  },
  mixins: [
    orderChangeMixin,
    pageMixin
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
