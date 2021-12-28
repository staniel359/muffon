<template>
  <BaseLinkContainer
    class="item main-simple-list-item main-playlist-item"
    :class="{ disabled: isDeleted }"
    :link="profilePlaylistLink"
  >
    <BaseDeletedBlock
      v-if="isDeleted"
      model="playlist"
    />
    <template v-else>
      <BaseImage
        class="rounded bordered"
        model="playlist"
        :image="imageData?.small"
      />

      <div class="content">
        <BaseHeader
          class="link"
          tag="h4"
          :text="playlistTitle"
        />

        <div class="description">
          {{ tracksCountText }}
        </div>
      </div>

      <BaseOptionsDropdown
        :isWithDeleteOption="isWithDeleteOption"
        @delete="handleDeleteOptionClick"
      />
    </template>
  </BaseLinkContainer>

  <BasePlaylistDeleteModal
    ref="deleteModal"
    :playlistId="playlistId"
    :playlistTitle="playlistTitle"
    :profileId="profileId"
    @deleted="handleDeleted"
  />
</template>

<script>
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseDeletedBlock from '@/BaseDeletedBlock.vue'
import BaseImage from '@/images/BaseImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import BasePlaylistDeleteModal
  from '@/modals/playlist/BasePlaylistDeleteModal.vue'
import {
  playlist as formatProfilePlaylistLink
} from '#/formatters/links/profile'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'PlaylistItem',
  components: {
    BaseLinkContainer,
    BaseDeletedBlock,
    BaseImage,
    BaseHeader,
    BaseOptionsDropdown,
    BasePlaylistDeleteModal
  },
  inject: [
    'findPaginationItem'
  ],
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
    profilePlaylistLink () {
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
    tracksCountText () {
      return this.$t(
        'counters.tracks',
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
    },
    isDeleted () {
      return !!this.playlistData.isDeleted
    },
    paginationItem () {
      return this.findPaginationItem({
        uuid: this.uuid
      })
    },
    uuid () {
      return this.playlistData.uuid
    }
  },
  methods: {
    handleDeleteOptionClick () {
      this.$refs.deleteModal.show()
    },
    handleDeleted () {
      this.paginationItem.isDeleted = true
    }
  }
}
</script>

<style lang="sass" scoped></style>
