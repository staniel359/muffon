<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="linkFormatted"
  >
    <BasePlaylistImage
      :image="imageData.small"
    />

    <div class="content">
      <BaseHeader
        class="link"
        tag="h4"
        :text="playlistTitle"
      />

      <div class="description">
        {{ tracksCountTextFormatted }}
      </div>
    </div>

    <BaseOptionsDropdown
      :isWithDeleteOption="isWithDeleteOption"
      @delete="handleDeleteOptionClick"
    />
  </BaseLinkContainer>

  <BasePlaylistDeleteModal
    ref="deleteModal"
    :playlistId="playlistId"
    :playlistTitle="playlistTitle"
    :profileId="profileId"
  />
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BasePlaylistImage from '@/models/playlist/BasePlaylistImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseOptionsDropdown from '@/BaseOptionsDropdown.vue'
import BasePlaylistDeleteModal
  from '@/models/playlist/BasePlaylistDeleteModal.vue'
import {
  playlist as formatProfilePlaylistLink
} from '#/formatters/links/profile'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'PlaylistItem',
  components: {
    BaseLinkContainer,
    BasePlaylistImage,
    BaseHeader,
    BaseOptionsDropdown,
    BasePlaylistDeleteModal
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    },
    profileId: {
      type: String,
      required: true
    },
    isWithDeleteOption: Boolean
  },
  computed: {
    linkFormatted () {
      return formatProfilePlaylistLink({
        profileId: this.profileId,
        playlistId: this.playlistId
      })
    },
    playlistId () {
      return this.playlistData.id.toString()
    },
    imageData () {
      return this.playlistData.image
    },
    playlistTitle () {
      return this.playlistData.title
    },
    tracksCountTextFormatted () {
      return this.$t(
        'shared.tracks',
        { count: this.tracksCountFormatted }
      )
    },
    tracksCountFormatted () {
      return formatNumber(
        this.tracksCount
      )
    },
    tracksCount () {
      return this.playlistData.tracks_count
    }
  },
  methods: {
    handleDeleteOptionClick () {
      this.$refs.deleteModal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
