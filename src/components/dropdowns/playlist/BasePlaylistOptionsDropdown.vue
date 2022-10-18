<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
  >
    <BaseShareOption
      v-if="isWithShareOption"
      :share-data="shareData"
    />

    <template
      v-if="isWithEditOption"
    >
      <BaseEditOption
        @click="handleEditOptionClick"
      />

      <BasePlaylistUpdateModal
        ref="editModal"
        :playlist-data="playlistData"
      />
    </template>

    <template
      v-if="isWithDeleteOption"
    >
      <BaseDeleteOption
        @click="handleDeleteOptionClick"
      />

      <BasePlaylistDeleteModal
        ref="deleteModal"
        :playlist-data="playlistData"
        :is-with-redirect="isDeleteWithRedirect"
        @success="handleDeleted"
      />
    </template>
  </BaseOptionsDropdownContainer>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseOptionsDropdownContainer
  from '@/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import BaseShareOption
  from '@/components/dropdowns/options/BaseShareOption.vue'
import BaseEditOption
  from '@/components/dropdowns/options/BaseEditOption.vue'
import BasePlaylistUpdateModal
  from '@/components/modals/playlist/BasePlaylistUpdateModal.vue'
import BaseDeleteOption
  from '@/components/dropdowns/options/BaseDeleteOption.vue'
import BasePlaylistDeleteModal
  from '@/components/modals/playlist/BasePlaylistDeleteModal.vue'
import {
  playlist as formatPlaylistShareData
} from '@/helpers/formatters/share'

export default {
  name: 'BasePlaylistOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    BaseShareOption,
    BaseEditOption,
    BasePlaylistUpdateModal,
    BaseDeleteOption,
    BasePlaylistDeleteModal
  },
  props: {
    playlistData: Object,
    isWithShareOption: Boolean,
    isWithEditOption: Boolean,
    isWithDeleteOption: Boolean,
    isDeleteWithRedirect: Boolean
  },
  emits: [
    'deleted'
  ],
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    isRender () {
      return (
        this.profileId &&
          this.isWithProfileOptions
      )
    },
    isWithProfileOptions () {
      return (
        this.isWithShareOption ||
          this.isWithEditOption ||
          this.isWithDeleteOption
      )
    },
    shareData () {
      return formatPlaylistShareData(
        this.playlistData
      )
    }
  },
  methods: {
    handleEditOptionClick () {
      this.showEditModal()
    },
    handleDeleteOptionClick () {
      this.showDeleteModal()
    },
    handleDeleted () {
      this.$emit(
        'deleted'
      )
    },
    showEditModal () {
      this.$refs
        .editModal
        .show()
    },
    showDeleteModal () {
      this.$refs
        .deleteModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
