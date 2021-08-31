<template>
  <div
    v-if="listenedId"
    ref="button"
    :data-content="popupTextFormatted"
  >
    <BaseLinkContainer :link="{}">
      <BaseButton
        class="basic circular compact small listened-simple-button"
        icon="check primary"
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
import deleteArtistData
  from '#/actions/api/profile/listened/artist/deleteData'
import deleteAlbumData from '#/actions/api/profile/listened/album/deleteData'
import deleteTrackData from '#/actions/api/profile/listened/track/deleteData'
import { setPopup } from '#/actions/plugins/semantic'
import { popupOptions } from '#/data/plugins/semantic'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'BaseListenedSimpleButton',
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
      listenedId: null,
      isLoading: false
    }
  },
  computed: {
    popupTextFormatted () {
      return localize(
        'shared.listened.delete'
      )
    }
  },
  mounted () {
    this.listenedId = this.modelId

    this.$nextTick(() => {
      setPopup(
        this.$refs.button,
        popupOptions()
      )
    })
  },
  methods: {
    handleClick () {
      switch (this.model) {
        case 'artist':
          return this.deleteArtistData({
            artistId: this.listenedId
          })
        case 'album':
          return this.deleteAlbumData({
            albumId: this.listenedId
          })
        case 'track':
          return this.deleteTrackData({
            trackId: this.listenedId
          })
        default:
          return null
      }
    },
    deleteArtistData,
    deleteAlbumData,
    deleteTrackData
  }
}
</script>

<style lang="sass" scoped>
.listened-simple-button
  @extend .no-margin
</style>
