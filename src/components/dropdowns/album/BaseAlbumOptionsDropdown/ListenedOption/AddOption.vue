<template>
  <BaseListenedOption
    action="add"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseListenedOption
  from '*/components/dropdowns/options/listened/BaseListenedOption.vue'
import createListenedAlbum from '*/helpers/actions/api/listened/album/create'

export default {
  name: 'AddOption',
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
    albumTitle: {
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
        albumTitle: this.albumTitle
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createListenedAlbum,
    handleClick () {
      this.createListenedAlbum(
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
