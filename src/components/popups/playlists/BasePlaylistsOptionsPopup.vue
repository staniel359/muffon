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
        v-if="isRenderAddOption"
      >
        <AddOption
          v-if="slotProps.isVisible"
          :is-connections="isConnections"
          @account-option-click="handleAddAccountOptionClick"
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
import AddOption from './BasePlaylistsOptionsPopup/AddOption.vue'
import BasePlaylistsAccountImportModal
  from '@/components/modals/playlists/import/BasePlaylistsAccountImportModal.vue'

export default {
  name: 'BasePlaylistsOptionsPopup',
  components: {
    BaseOptionsPopupContainer,
    CreateOption,
    AddOption,
    BasePlaylistsAccountImportModal
  },
  props: {
    isWithCreateOption: Boolean,
    isWithAddOption: Boolean
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
          this.isRenderAddOption
      )
    },
    isRenderCreateOption () {
      return (
        this.profileId &&
          this.isWithCreateOption
      )
    },
    isRenderAddOption () {
      return (
        this.profileId &&
          this.isWithAddOption
      )
    },
    isConnections () {
      return !!(
        this.lastfmConnection ||
          this.spotifyConnection
      )
    },
    lastfmConnection () {
      return this.profileConnections.lastfm
    },
    spotifyConnection () {
      return this.profileConnections.spotify
    }
  },
  methods: {
    handleAddAccountOptionClick () {
      this.showAddAccountModal()
    },
    showAddAccountModal () {
      this.$refs
        .accountModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
