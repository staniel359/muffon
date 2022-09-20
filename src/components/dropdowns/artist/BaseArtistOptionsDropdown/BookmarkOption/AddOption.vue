<template>
  <BaseBookmarkOption
    action="add"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseBookmarkOption
  from '@/components/dropdowns/options/bookmark/BaseBookmarkOption.vue'
import createBookmarkArtist from '@/helpers/actions/api/bookmark/artist/create'

export default {
  name: 'AddOption',
  components: {
    BaseBookmarkOption
  },
  inject: [
    'setBookmarkId'
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      bookmarkId: null,
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    createArgs () {
      return {
        artistName: this.artistName
      }
    },
    artistName () {
      return this.artistData.name
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createBookmarkArtist,
    handleClick () {
      this.createBookmarkArtist(
        this.createArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.setBookmarkId(
          this.bookmarkId
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
