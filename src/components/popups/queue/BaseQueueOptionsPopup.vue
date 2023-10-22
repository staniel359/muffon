<template>
  <BaseOptionsPopupContainer>
    <template
      v-if="isRenderPlaylistOption"
    >
      <BasePlaylistOption
        @click="handlePlaylistOptionClick"
      />

      <BasePlaylistsModal
        ref="playlistsModal"
        :tracks="queueTracksComputed"
      />
    </template>

    <ClearOption />
  </BaseOptionsPopupContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import queueStore from '@/stores/queue'
import BaseOptionsPopupContainer
  from '@/components/containers/popups/BaseOptionsPopupContainer.vue'
import BasePlaylistOption
  from '@/components/popups/options/BasePlaylistOption.vue'
import BasePlaylistsModal
  from '@/components/modals/playlists/BasePlaylistsModal.vue'
import ClearOption from './BaseQueueOptionsPopup/ClearOption.vue'

export default {
  name: 'BaseQueueOptionsPopup',
  components: {
    BaseOptionsPopupContainer,
    BasePlaylistOption,
    BasePlaylistsModal,
    ClearOption
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    ...mapState(
      queueStore,
      {
        queueTracksComputed: 'tracksComputed'
      }
    ),
    isRenderPlaylistOption () {
      return this.profileId
    }
  },
  methods: {
    handlePlaylistOptionClick () {
      this.showPlaylistsModal()
    },
    showPlaylistsModal () {
      this.$refs
        .playlistsModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
