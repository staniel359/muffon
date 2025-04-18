<template>
  <BaseLinkContainer
    class="item main-simple-list-item middle-aligned main-visibility-container"
    :class="{
      disabled: isDeleted
    }"
    :link="link"
    @click="handleItemClick"
  >
    <BaseDeletedSection
      v-if="isDeleted"
      model="playlist"
    />
    <template
      v-else
    >
      <BaseIcon
        v-if="isWithModelIcon"
        class="main-simple-list-item-model-icon"
        icon="playlist"
      />

      <BaseImage
        class="rounded-medium image-60"
        model="playlist"
        :image="imageData?.small"
      />

      <div class="content">
        <div class="middle-aligned">
          <BaseHeader
            tag="h4"
            :class="{
              link: (
                isLink && isMainLinkActive
              )
            }"
            :text="playlistTitle"
          />

          <BasePrivateIcon
            v-if="isPrivate"
            class="right small"
            model="playlist"
          />
        </div>

        <div
          v-if="description"
          class="description"
        >
          <small
            @click.stop
            v-html="descriptionFormatted"
          />
        </div>

        <ProfileNicknameSection
          v-if="isWithProfileNickname"
          class="extra"
          :profile-data="profileData"
          :is-main-link-active="isMainLinkActive"
          @active-change="handleProfileLinkActiveChange"
          @link-click="handleLinkClick"
        />

        <BaseListCounterSection
          v-if="tracksCount"
          class="description"
          icon="track"
          :count="tracksCount"
        />
      </div>

      <div
        v-if="isImport"
        class="middle-aligned main-right-small-section main-left-small-section"
      >
        <BaseCheckbox
          :is-checked="isPrivate"
          @click.stop
          @is-checked-change="handleIsPrivateIsCheckedChange"
        />

        <BasePrivateIcon
          class="small"
          model="playlist"
        />
      </div>

      <BaseSourceIcon
        v-if="isWithSource"
        class="right icon-item"
        :source="source"
      />

      <BaseCreatedSection
        v-if="isWithCreated"
        class="description right"
        :model-data="playlistData"
      />

      <BasePlaylistOptionsPopup
        class="invisible-item"
        :playlist-data="playlistData"
        :is-with-share-option="isWithShareOption"
        :is-with-external-link-option="isWithExternalLinkOption"
        :is-with-edit-option="isWithEditOption"
        :is-with-delete-option="isWithDeleteOption"
        @deleted="handleDeleted"
      />

      <BaseClearButton
        v-if="isWithClearButton"
        @click="handleClearButtonClick"
      />
    </template>
  </BaseLinkContainer>

  <div
    v-if="isRenderTracksList"
    v-show="isShowTracksList"
    class="tracks-section"
  >
    <BaseTracksSimpleList
      class="no-padding"
      :tracks="tracks"
      :is-with-self-icons="false"
      is-with-image
      is-with-artist-name
      is-with-album-title
      is-with-duration
      is-with-source
      is-with-created
      is-with-clear-button
      is-with-external-link-option
    />
  </div>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseDeletedSection from '@/components/sections/BaseDeletedSection.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/headers/BaseHeader.vue'
import BasePrivateIcon from '@/components/icons/BasePrivateIcon.vue'
import ProfileNicknameSection from './PlaylistItem/ProfileNicknameSection.vue'
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'
import BaseSourceIcon from '@/components/icons/BaseSourceIcon.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BasePlaylistOptionsPopup
  from '@/components/popups/playlist/BasePlaylistOptionsPopup.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import {
  main as formatProfileLink,
  playlist as formatProfilePlaylistLink
} from '@/helpers/formatters/links/profile'
import formatTextWithExternalLink
  from '@/helpers/formatters/textWithExternalLink'

export default {
  name: 'PlaylistItem',
  components: {
    BaseLinkContainer,
    BaseDeletedSection,
    BaseIcon,
    BaseImage,
    BaseHeader,
    BasePrivateIcon,
    ProfileNicknameSection,
    BaseListCounterSection,
    BaseSourceIcon,
    BaseCreatedSection,
    BasePlaylistOptionsPopup,
    BaseClearButton,
    BaseTracksSimpleList,
    BaseCheckbox
  },
  provide () {
    return {
      setPlaylistData: this.setPlaylistData
    }
  },
  inject: {
    findPaginationItem: {
      default: () => false
    },
    updateCollectionItem: {
      default: () => false
    }
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    },
    isLink: {
      type: Boolean,
      default: true
    },
    isWithProfileNickname: Boolean,
    isWithCreated: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithEditOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean,
    isWithModelIcon: Boolean,
    isWithSource: Boolean,
    isWithTracks: Boolean,
    isImport: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick'
  ],
  data () {
    return {
      isMainLinkActive: true,
      isTracksListCalled: false,
      isShowTracksList: false
    }
  },
  computed: {
    link () {
      if (this.isLink) {
        if (this.isMainLinkActive) {
          return this.profilePlaylistLink
        } else {
          return this.profileLink
        }
      } else {
        return null
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
      return this.profileData.id
    },
    profileData () {
      return this.playlistData.profile
    },
    playlistId () {
      return this.playlistData.id
    },
    profileLink () {
      return formatProfileLink(
        {
          profileId: this.profileId
        }
      )
    },
    imageData () {
      return this.playlistData.image
    },
    playlistTitle () {
      return this.playlistData.title
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
    isPrivate () {
      return this.playlistData.private
    },
    description () {
      return this.playlistData.description
    },
    descriptionFormatted () {
      return formatTextWithExternalLink(
        {
          text: this.description,
          className: 'bold'
        }
      )
    },
    source () {
      return this.playlistData.source?.name
    },
    isRenderTracksList () {
      return (
        this.isWithTracks &&
          this.isAnyTracks &&
          this.isTracksListCalled
      )
    },
    isAnyTracks () {
      return this.tracks.length
    },
    tracks () {
      return this.playlistData.tracks
    }
  },
  methods: {
    handleItemClick () {
      if (this.isLink) {
        this.$emit(
          'linkClick'
        )
      } else if (this.isWithTracks) {
        this.toggleTracksList()
      }
    },
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
    handleProfileLinkActiveChange (
      value
    ) {
      this.isMainLinkActive = !value
    },
    handleIsPrivateIsCheckedChange (
      value
    ) {
      this.changePrivate(
        value
      )
    },
    setPlaylistData (
      value
    ) {
      Object.assign(
        this.paginationItem,
        value
      )
    },
    toggleTracksList () {
      this.isTracksListCalled = true

      this.isShowTracksList =
        !this.isShowTracksList
    },
    changePrivate (
      value
    ) {
      this.paginationItem.private = value

      this.updateCollectionItem(
        {
          collection: 'successPlaylists',
          uuid: this.uuid,
          data: {
            private: value
          }
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.tracks-section
  margin: 1rem 0
</style>
