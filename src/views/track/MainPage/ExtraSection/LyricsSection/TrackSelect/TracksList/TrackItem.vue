<template>
  <div
    class="item main-dropdown-item"
    :data-value="index"
    @click="handleClick"
  >
    <div class="content">
      <h5 class="ui header main-header">
        {{ trackTitle }}
      </h5>
      <div>
        {{ artistName }}
      </div>
    </div>
  </div>
</template>

<script>
import { generateKey } from '#/utils'

export default {
  name: 'TrackItem',
  inject: [
    'setSelectedTrackData'
  ],
  props: {
    trackData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    trackTitle () {
      return this.trackData.title
    },
    artistName () {
      return this.trackData.artist.name
    }
  },
  methods: {
    handleClick () {
      this.setSelectedTrackData({
        ...this.trackData,
        uuid: generateKey()
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
