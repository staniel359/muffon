<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :class="{ disabled: isDeleted }"
    :link="link"
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
          tag="h4"
          :class="{ link: isMainLinkActive }"
          :text="playlistTitle"
        />

        <span
          v-if="isWithProfile"
          @mouseenter="handleProfileNicknameMouseEnter"
          @mouseleave="handleProfileNicknameMouseLeave"
        >
          <BaseLink
            :text="profileNickname"
            :link="profileMainLink"
          />
        </span>

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
import BaseLink from '@/links/BaseLink.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import BasePlaylistDeleteModal
  from '@/modals/playlist/BasePlaylistDeleteModal.vue'
import {
  main as formatProfileMainLink,
  playlist as formatProfilePlaylistLink
} from '#/formatters/links/profile'
import { number as formatNumber } from '#/formatters'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'PlaylistItem',
  components: {
    BaseLinkContainer,
    BaseDeletedBlock,
    BaseImage,
    BaseHeader,
    BaseLink,
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
    isWithProfile: Boolean
  },
  data () {
    return {
      isMainLinkActive: true
    }
  },
  computed: {
    link () {
      if (this.isMainLinkActive) {
        return this.profilePlaylistLink
      } else {
        return this.profileMainLink
      }
    },
    profilePlaylistLink () {
      return formatProfilePlaylistLink({
        profileId: this.profileId,
        playlistId: this.playlistId
      })
    },
    profileId () {
      return this.profileData.id.toString()
    },
    profileData () {
      return this.playlistData.profile
    },
    profileMainLink () {
      return formatProfileMainLink({
        profileId: this.profileId
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
    },
    isWithDeleteOption () {
      return isCurrentProfile(
        this.profileId
      )
    },
    profileNickname () {
      return this.profileData.nickname
    }
  },
  methods: {
    handleDeleteOptionClick () {
      this.$refs.deleteModal.show()
    },
    handleDeleted () {
      this.paginationItem.isDeleted = true
    },
    handleProfileNicknameMouseEnter () {
      this.isMainLinkActive = false
    },
    handleProfileNicknameMouseLeave () {
      this.isMainLinkActive = true
    }
  }
}
</script>

<style lang="sass" scoped></style>
