<template>
  <BaseVideoPlaylistModalContainer
    ref="modal"
    :playlist-id="playlistId"
    :scope="scope"
  >
    <template
      #default="slotProps"
    >
      <BaseDescriptionSection
        :description="slotProps[scope]"
        is-modal
      />
    </template>
  </BaseVideoPlaylistModalContainer>
</template>

<script>
import BaseVideoPlaylistModalContainer
  from '@/components/containers/modals/videoPlaylist/BaseVideoPlaylistModalContainer.vue'
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'

export default {
  name: 'BaseVideoPlaylistDescriptionModal',
  components: {
    BaseVideoPlaylistModalContainer,
    BaseDescriptionSection
  },
  props: {
    playlistId: String
  },
  data () {
    return {
      scope: 'description'
    }
  },
  methods: {
    show () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
