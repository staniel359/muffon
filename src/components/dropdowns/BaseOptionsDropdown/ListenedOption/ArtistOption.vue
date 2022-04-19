<template>
  <BaseListenedOption
    action="add"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseListenedOption from '../options/BaseListenedOption.vue'
import createListenedArtist from '*/helpers/actions/api/listened/artist/create'

export default {
  name: 'ArtistOption',
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
        artistName: this.artistName
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createListenedArtist,
    handleClick () {
      this.createListenedArtist(
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
