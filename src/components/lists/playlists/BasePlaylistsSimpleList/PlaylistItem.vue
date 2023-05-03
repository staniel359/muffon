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
    <template
      v-else
    >
      <BaseIcon
        v-if="isWithModelIcon"
        class="main-simple-list-item-model-icon"
        icon="playlist"
      />

      <BaseImage
        class="rounded-medium"
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
          class="description main-small-container"
        >
          <small
            v-text="description"
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
          class="description"
          icon="track"
          :count="tracksCount"
        />
      </div>

      <BaseCreatedSection
        v-if="isWithCreated"
        class="description right"
        :model-data="playlistData"
      />

      <BasePlaylistOptionsPopup
        :playlist-data="playlistData"
        :is-with-share-option="isWithShareOption"
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
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseDeletedSection from '@/components/sections/BaseDeletedSection.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BasePrivateIcon from '@/components/icons/BasePrivateIcon.vue'
import ProfileNicknameSection from './PlaylistItem/ProfileNicknameSection.vue'
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BasePlaylistOptionsPopup
  from '@/components/popups/playlist/BasePlaylistOptionsPopup.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  main as formatProfileLink,
  playlist as formatProfilePlaylistLink
} from '@/helpers/formatters/links/profile'

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
    BaseCreatedSection,
    BasePlaylistOptionsPopup,
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
    isWithClearButton: Boolean,
    isWithModelIcon: Boolean
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
        return this.profileLink
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
    playlistId () {
      return this.playlistData.id.toString()
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
    handleProfileLinkActiveChange (
      value
    ) {
      this.isMainLinkActive = !value
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
.title-container
  @extend .d-flex, .align-items-center
</style>
