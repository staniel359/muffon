<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :class="{
      disabled: isDeleted
    }"
    :link="link"
    @click="handleLinkClick"
  >
    <BaseDeletedSection
      v-if="isDeleted"
      model="playlist"
    />
    <template v-else>
      <BaseImage
        class="rounded-medium bordered"
        model="playlist"
        :image="imageData?.extrasmall"
      />

      <div class="content">
        <div class="title-container">
          <BaseHeader
            tag="h4"
            :class="{
              link: isMainLinkActive
            }"
            :text="playlistTitle"
          />

          <BasePrivateIcon
            v-if="isPrivate"
          />
        </div>

        <div
          v-if="description"
          class="description"
        >
          <small
            v-text="description"
          />
        </div>

        <span
          v-if="isWithProfileNickname"
          class="extra profile-nickname"
          @mouseenter="handleProfileNicknameMouseEnter"
          @mouseleave="handleProfileNicknameMouseLeave"
        >
          <BaseLink
            :text="profileNickname"
            :link="profileMainLink"
            @click="handleLinkClick"
          />

          <BasePrivateIcon
            v-if="isProfilePrivate"
          />
        </span>

        <div class="description">
          <small
            v-html="tracksCountText"
          />
        </div>
      </div>

      <BaseCreatedSection
        v-if="isWithCreated"
        class="description right"
        :model-data="playlistData"
      />

      <BasePlaylistOptionsDropdown
        :playlist-data="playlistData"
        :is-with-share-option="isWithShareOption"
        :is-with-edit-option="isWithEditOption && isSelf"
        :is-with-delete-option="isWithDeleteOption && isSelf"
        @deleted="handleDeleted"
      />

      <BaseClearButton
        v-if="isWithClearButton"
        @click="handleClearButtonClick"
      />
    </template>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseDeletedSection from '@/components/sections/BaseDeletedSection.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BasePrivateIcon from '@/components/icons/BasePrivateIcon.vue'
import BaseLink from '@/components/links/BaseLink.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BasePlaylistOptionsDropdown
  from '@/components/dropdowns/playlist/BasePlaylistOptionsDropdown.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  main as formatProfileMainLink,
  playlist as formatProfilePlaylistLink
} from '@/helpers/formatters/links/profile'
import {
  number as formatNumber
} from '@/helpers/formatters'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'PlaylistItem',
  components: {
    BaseLinkContainer,
    BaseDeletedSection,
    BaseImage,
    BaseHeader,
    BasePrivateIcon,
    BaseLink,
    BaseCreatedSection,
    BasePlaylistOptionsDropdown,
    BaseClearButton
  },
  provide () {
    return {
      setPlaylistData: this.setPlaylistData
    }
  },
  inject: {
    findPaginationItem: {
      default: () => false
    }
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    },
    isWithProfileNickname: Boolean,
    isWithCreated: Boolean,
    isWithShareOption: Boolean,
    isWithEditOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick'
  ],
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
      return formatProfilePlaylistLink(
        {
          profileId: this.profileId,
          playlistId: this.playlistId
        }
      )
    },
    profileId () {
      return this.profileData.id.toString()
    },
    profileData () {
      return this.playlistData.profile
    },
    profileMainLink () {
      return formatProfileMainLink(
        {
          profileId: this.profileId
        }
      )
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
      return this.$tc(
        'counters.nominative.tracks',
        this.tracksCount,
        {
          count: this.tracksCountStrong
        }
      )
    },
    tracksCountStrong () {
      return `<strong>${this.tracksCountFormatted}</strong>`
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
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.playlistData.uuid
    },
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    },
    profileNickname () {
      return this.profileData.nickname
    },
    isPrivate () {
      return this.playlistData.private
    },
    isProfilePrivate () {
      return this.profileData.private
    },
    description () {
      return this.playlistData.description
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleClearButtonClick () {
      this.$emit(
        'clearButtonClick',
        {
          uuid: this.uuid
        }
      )
    },
    handleDeleted () {
      this.paginationItem.isDeleted = true
    },
    handleProfileNicknameMouseEnter () {
      this.isMainLinkActive = false
    },
    handleProfileNicknameMouseLeave () {
      this.isMainLinkActive = true
    },
    setPlaylistData (
      value
    ) {
      Object.assign(
        this.paginationItem,
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.main-simple-list-item
  & > .content
    & > .description
      &.profile-nickname
        @extend .width-fit-content

.title-container
  @extend .d-flex, .align-items-center
</style>
