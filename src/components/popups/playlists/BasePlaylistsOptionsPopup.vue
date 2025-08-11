<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
  >
    <template
      #default="slotProps"
    >
      <CreateOption
        v-if="isRenderCreateOption"
      />

      <template
        v-if="isRenderImportOption"
      >
        <BaseImportOption
          v-if="slotProps.isVisible"
          :is-connections="isConnections"
          is-with-account-option
          @account-option-click="handleAccountImportOptionClick"
        />

        <BasePlaylistsAccountImportModal
          v-if="isConnections"
          ref="accountModal"
        />
      </template>
    </template>
  </BaseOptionsPopupContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseOptionsPopupContainer
  from '@/components/containers/popups/BaseOptionsPopupContainer.vue'
import CreateOption from './BasePlaylistsOptionsPopup/CreateOption.vue'
import BaseImportOption from '@/components/popups/options/BaseImportOption.vue'
import BasePlaylistsAccountImportModal
  from '@/components/modals/playlists/import/BasePlaylistsAccountImportModal.vue'

export default {
  name: 'BasePlaylistsOptionsPopup',
  components: {
    BaseOptionsPopupContainer,
    CreateOption,
    BaseImportOption,
    BasePlaylistsAccountImportModal
  },
  props: {
    isWithCreateOption: Boolean,
    isWithImportOption: Boolean
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id',
        profileConnections: 'connections'
      }
    ),
    isRender () {
      return (
        this.isRenderCreateOption ||
          this.isRenderImportOption
      )
    },
    isRenderCreateOption () {
      return (
        this.profileId &&
          this.isWithCreateOption
      )
    },
    isRenderImportOption () {
      return (
        this.profileId &&
          this.isWithImportOption
      )
    },
    isConnections () {
      return !!(
        this.lastfmConnection ||
          this.spotifyConnection
      )
    },
    lastfmConnection () {
      return this.profileConnections?.lastfm
    },
    spotifyConnection () {
      return this.profileConnections?.spotify
    }
  },
  methods: {
    handleAccountImportOptionClick () {
      this.showAccountImportModal()
    },
    showAccountImportModal () {
      this.$refs
        .accountModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
