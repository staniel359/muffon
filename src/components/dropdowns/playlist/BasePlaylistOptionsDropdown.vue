<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
    :is-scrolling="isScrolling"
  >
    <AddOption
      v-if="isWithAddOption"
      :playlist-id="playlistId"
    />

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
  defineAsyncComponent
} from 'vue'
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
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

const AddOption =
  defineAsyncComponent(
    () => import(
      './BasePlaylistOptionsDropdown/AddOption.vue'
    )
  )

export default {
  name: 'BasePlaylistOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    AddOption,
    BaseShareOption,
    BaseEditOption,
    BasePlaylistUpdateModal,
    BaseDeleteOption,
    BasePlaylistDeleteModal
  },
  props: {
    isScrolling: {
      type: Boolean,
      default: true
    },
    playlistData: Object,
    isWithAddOption: Boolean,
    isWithShareOption: Boolean,
    isWithEditOption: Boolean,
    isWithDeleteOption: Boolean,
    isDeleteWithRedirect: Boolean
  },
  emits: [
    'deleted'
  ],
  computed: {
    ...mapState(
      profileStore,
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
        this.isWithAddOption ||
          this.isWithShareOption ||
          this.isWithEditOption ||
          this.isWithDeleteOption
      )
    },
    shareData () {
      return formatPlaylistShareData(
        this.playlistData
      )
    },
    playlistId () {
      return this.playlistData.id.toString()
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
