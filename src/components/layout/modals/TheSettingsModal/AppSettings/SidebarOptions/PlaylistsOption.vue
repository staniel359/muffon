<template>
  <div class="option">
    <BaseIcon
      icon="file audio"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="playlistsText"
    />

    <BaseToggle
      store-key="sidebar.isWithPlaylistsItem"
      :is-checked="isWithPlaylistsItem"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'PlaylistsOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'sidebar',
      [
        'isWithPlaylistsItem'
      ]
    ),
    playlistsText () {
      return this.$t(
        'navigation.playlists'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
