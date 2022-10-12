<template>
  <BaseFavoriteOption
    action="add"
    :is-loading="isLoading"
    :is-error="isError"
    @click="handleClick"
  />
</template>

<script>
import BaseFavoriteOption
  from '@/components/dropdowns/options/favorite/BaseFavoriteOption.vue'
import createFavoriteArtist from '@/helpers/actions/api/favorite/artist/create'

export default {
  name: 'AddOption',
  components: {
    BaseFavoriteOption
  },
  inject: [
    'setFavoriteId'
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      favoriteId: null,
      isLoading: false,
      isError: false,
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
    createFavoriteArtist,
    handleClick () {
      this.createFavoriteArtist(
        this.createArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.setFavoriteId(
          this.favoriteId
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
