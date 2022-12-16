<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
  >
    <BaseShareOption
      v-if="isWithShareOption"
      :share-data="shareData"
    />
  </BaseOptionsDropdownContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseOptionsDropdownContainer
  from '@/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import BaseShareOption
  from '@/components/dropdowns/options/BaseShareOption.vue'
import {
  videoPlaylist as formatVideoPlaylistShareData
} from '@/helpers/formatters/share'

export default {
  name: 'BaseVideoPlaylistOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    BaseShareOption
  },
  props: {
    playlistData: Object,
    isWithShareOption: Boolean
  },
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
        this.isWithShareOption
      )
    },
    shareData () {
      return formatVideoPlaylistShareData(
        this.playlistData
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
