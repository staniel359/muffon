<template>
  <BaseFavoriteOption
    action="delete"
    :is-loading="isLoading"
    :is-error="isError"
    @click="handleClick"
  />
</template>

<script>
import BaseFavoriteOption from './BaseFavoriteOption.vue'
import deleteFavorite from '@/helpers/actions/api/favorite/model/delete'

export default {
  name: 'BaseFavoriteDeleteOption',
  components: {
    BaseFavoriteOption
  },
  inject: [
    'setFavoriteId'
  ],
  props: {
    model: {
      type: String,
      required: true
    },
    favoriteId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      isError: false,
      isSuccess: false
    }
  },
  computed: {
    deleteArgs () {
      return {
        model: this.model,
        favoriteId: this.favoriteId
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteFavorite,
    handleClick () {
      this.deleteFavorite(
        this.deleteArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.setFavoriteId(
          null
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
