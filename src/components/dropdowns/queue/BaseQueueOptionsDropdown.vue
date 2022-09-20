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
  mapGetters
} from 'vuex'
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
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    ...mapGetters(
      'queue',
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
