<template>
  <BaseSegmentContainer
    class="middle-aligned-space-between"
  >
    <div>
      <PlayButton
        v-if="tracksCount"
        :profile-id="profileId"
        :playlist-data="playlistData"
      />
    </div>

    <div>
      <BaseOrderSelect
        model="playlistTrack"
        :order="order"
        @select="handleOrderSelect"
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseOrderSelect from '@/components/selects/BaseOrderSelect.vue'
import PlayButton from './ExtraSegment/PlayButton.vue'

export default {
  name: 'ExtraSegment',
  components: {
    BaseSegmentContainer,
    BaseOrderSelect,
    PlayButton
  },
  inject: {
    setOrder: {
      default: () => false
    }
  },
  props: {
    profileId: String,
    playlistData: {
      type: Object,
      required: true
    },
    order: String
  },
  computed: {
    tracksCount () {
      return this.playlistData.tracks_count
    }
  },
  methods: {
    handleOrderSelect (
      value
    ) {
      this.setOrder(
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
