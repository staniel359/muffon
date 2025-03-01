<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
  >
    <template
      #default="slotProps"
    >
      <template
        v-if="isRenderImportOption"
      >
        <BaseImportOption
          v-if="slotProps.isVisible"
          :is-connections="isConnections"
          is-with-account-option
          @account-option-click="handleAccountImportOptionClick"
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
import BaseImportOption from '@/components/popups/options/BaseImportOption.vue'
import BaseFavoritesAccountImportModal
  from '@/components/modals/favorites/import/BaseFavoritesAccountImportModal.vue'

export default {
  name: 'BaseFavoritesOptionsPopup',
  components: {
    BaseOptionsPopupContainer,
    BaseImportOption,
    BaseFavoritesAccountImportModal
  },
  props: {
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
        this.isRenderImportOption
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
        this.lastfmConnection
      )
    },
    lastfmConnection () {
      return this.profileConnections?.lastfm
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
