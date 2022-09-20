<template>
  <BaseFavoriteOption
    action="delete"
    :is-loading="isLoading"
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
      type: String,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
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
