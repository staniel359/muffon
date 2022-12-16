<template>
  <BaseOptionsDropdownContainer>
    <template
      v-if="profileId"
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
  </BaseOptionsDropdownContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import queueStore from '@/stores/queue'
import BaseOptionsDropdownContainer
  from '@/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import BasePlaylistOption
  from '@/components/dropdowns/options/BasePlaylistOption.vue'
import BasePlaylistsModal
  from '@/components/modals/playlists/BasePlaylistsModal.vue'
import ClearOption from './BaseQueueOptionsDropdown/ClearOption.vue'

export default {
  name: 'BaseQueueOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
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
    )
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
