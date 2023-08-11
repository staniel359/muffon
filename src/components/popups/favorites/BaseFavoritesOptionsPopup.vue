<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
  >
    <template
      #default="slotProps"
    >
      <template
        v-if="isRenderAddOption"
      >
        <AddOption
          v-if="slotProps.isVisible"
          :is-connections="isConnections"
          @account-option-click="handleAddAccountOptionClick"
        />

        <BaseFavoritesAccountImportModal
          v-if="isConnections"
          ref="accountModal"
          scope="tracks"
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
import AddOption from './BaseFavoritesOptionsPopup/AddOption.vue'
import BaseFavoritesAccountImportModal
  from '@/components/modals/favorites/import/BaseFavoritesAccountImportModal.vue'

export default {
  name: 'BaseFavoritesOptionsPopup',
  components: {
    BaseOptionsPopupContainer,
    AddOption,
    BaseFavoritesAccountImportModal
  },
  props: {
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
        this.isRenderAddOption
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
        this.lastfmConnection
      )
    },
    lastfmConnection () {
      return this.profileConnections.lastfm
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
