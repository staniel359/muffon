<template>
  <BaseListenedOption
    action="add"
    :is-loading="isLoading"
    :is-error="isError"
    @click="handleClick"
  />
</template>

<script>
import BaseListenedOption
  from '@/components/dropdowns/options/listened/BaseListenedOption.vue'
import createListenedTrack from '@/helpers/actions/api/listened/track/create'

export default {
  name: 'AddOption',
  components: {
    BaseListenedOption
  },
  inject: [
    'setListenedId'
  ],
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      listenedId: null,
      isLoading: false,
      isError: false,
      isSuccess: false
    }
  },
  computed: {
    createArgs () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle
      }
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
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
