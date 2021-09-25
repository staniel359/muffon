<template>
  <div
    v-if="favoriteId"
    ref="button"
    :data-content="popupTextFormatted"
  >
    <BaseLinkContainer :link="{}">
      <BaseButton
        class="basic circular compact tiny favorite-simple-button"
        icon="star primary"
        :class="{
          loading: isLoading,
          disabled: isLoading
        }"
        @click="handleClick"
      />
    </BaseLinkContainer>
  </div>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseButton from '@/BaseButton.vue'
import deleteFavoriteData
  from '#/actions/api/profile/favorites/model/deleteData'
import { setPopup } from '#/actions/plugins/semantic'
import { popupOptions } from '#/data/plugins/semantic'

export default {
  name: 'FavoriteButton',
  components: {
    BaseLinkContainer,
    BaseButton
  },
  props: {
    model: {
      type: String,
      required: true
    },
    modelId: String
  },
  data () {
    return {
      favoriteId: null,
      isLoading: false
    }
  },
  computed: {
    popupTextFormatted () {
      return this.$t(
        'shared.favorites.delete'
      )
    }
  },
  mounted () {
    this.favoriteId = this.modelId

    this.$nextTick(() => {
      setPopup(
        this.$refs.button,
        popupOptions()
      )
    })
  },
  methods: {
    handleClick () {
      return this.deleteFavoriteData({
        model: this.model,
        favoriteId: this.favoriteId
      }).then(this.handleSuccess)
    },
    handleSuccess () {
      this.favoriteId = null
    },
    deleteFavoriteData
  }
}
</script>

<style lang="sass" scoped>
.favorite-simple-button
  @extend .no-margin
</style>
