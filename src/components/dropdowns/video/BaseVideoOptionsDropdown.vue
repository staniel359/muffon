<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
  >
    <FavoriteOption
      v-if="isWithFavoriteOption"
      :video-data="videoData"
      :favorite-id="favoriteId"
    />

    <WatchedOption
      v-if="isWithWatchedOption"
      :video-data="videoData"
      :watched-id="watchedId"
    />

    <BaseShareOption
      v-if="isWithShareOption"
      :share-data="shareData"
    />

    <template
      v-if="isWithDeleteOption"
    >
      <BaseDeleteOption
        @click="handleDeleteOptionClick"
      />

      <BaseFavoriteDeleteModal
        v-if="isFavorite"
        ref="deleteModal"
        model="video"
        :model-data="videoData"
        @success="handleDeleted"
      />
    </template>
  </BaseOptionsDropdownContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseOptionsDropdownContainer
  from '@/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import FavoriteOption from './BaseVideoOptionsDropdown/FavoriteOption.vue'
import WatchedOption from './BaseVideoOptionsDropdown/WatchedOption.vue'
import BaseShareOption
  from '@/components/dropdowns/options/BaseShareOption.vue'
import BaseDeleteOption
  from '@/components/dropdowns/options/BaseDeleteOption.vue'
import BaseFavoriteDeleteModal
  from '@/components/modals/favorite/BaseFavoriteDeleteModal.vue'
import {
  video as formatVideoShareData
} from '@/helpers/formatters/share'

export default {
  name: 'BaseVideoOptionsDropdown',
  components: {
    FavoriteOption,
    WatchedOption,
    BaseOptionsDropdownContainer,
    BaseShareOption,
    BaseDeleteOption,
    BaseFavoriteDeleteModal
  },
  props: {
    videoData: Object,
    isFavorite: Boolean,
    isWithFavoriteOption: Boolean,
    isWithWatchedOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    favoriteId: String,
    watchedId: String
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
        this.isWithFavoriteOption ||
          this.isWithWatchedOption ||
          this.isWithShareOption
      )
    },
    shareData () {
      return formatVideoShareData(
        this.videoData
      )
    }
  },
  methods: {
    handleDeleteOptionClick () {
      this.showDeleteModal()
    },
    handleDeleted () {
      this.$emit(
        'deleted'
      )
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
