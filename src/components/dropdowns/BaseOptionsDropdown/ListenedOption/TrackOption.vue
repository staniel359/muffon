<template>
  <BaseListenedOption
    action="add"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseListenedOption from '../options/BaseListenedOption.vue'
import createListenedTrack from '*/helpers/actions/api/listened/track/create'

export default {
  name: 'TrackOption',
  components: {
    BaseListenedOption
  },
  inject: [
    'setListenedId'
  ],
  props: {
    artistName: {
      type: String,
      required: true
    },
    trackTitle: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      listenedId: null,
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    createArgs () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createListenedTrack,
    handleClick () {
      this.createListenedTrack(
        this.createArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.setListenedId(
          this.listenedId
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
