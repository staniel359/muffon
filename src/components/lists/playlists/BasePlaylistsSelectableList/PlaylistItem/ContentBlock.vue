<template>
  <BaseImage
    class="rounded-medium"
    model="playlist"
    :image="imageData?.extrasmall"
  />

  <div class="content">
    <div class="title-section">
      <BaseHeader
        class="link"
        tag="h4"
        :text="playlistTitle"
      />

      <BasePrivateIcon
        v-if="isPrivate"
      />
    </div>

    <div
      v-if="description"
      class="description main-small-container"
    >
      <small
        v-text="description"
      />
    </div>

    <BaseListCounterSection
      class="description"
      icon="track"
      :count="tracksCount"
    />
  </div>

  <div class="icon-container">
    <BaseIcon
      :class="iconClass"
      :is-loading="isLoading"
      :icon="icon"
    />
  </div>

  <BasePlaylistOptionsPopup
    :playlist-data="playlistData"
    is-with-edit-option
    is-with-delete-option
    @deleted="handleDeleted"
  />
</template>

<script>
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BasePrivateIcon from '@/components/icons/BasePrivateIcon.vue'
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BasePlaylistOptionsPopup
  from '@/components/popups/playlist/BasePlaylistOptionsPopup.vue'

export default {
  name: 'ContentBlock',
  components: {
    BaseImage,
    BaseHeader,
    BasePrivateIcon,
    BaseListCounterSection,
    BaseIcon,
    BasePlaylistOptionsPopup
  },
  provide () {
    return {
      setPlaylistData:
        this.setPlaylistData
    }
  },
  inject: {
    findPaginationItem: {
      default: () => false
    }
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    },
    isLoading: Boolean,
    isSuccess: Boolean,
    isError: Boolean
  },
  computed: {
    imageData () {
      return this.playlistData.image
    },
    playlistTitle () {
      return this.playlistData.title
    },
    tracksCount () {
      return this.playlistData.tracks_count
    },
    icon () {
      if (this.isSuccess) {
        return 'success'
      } else if (this.isError) {
        return 'error'
      } else {
        return null
      }
    },
    iconClass () {
      if (this.isSuccess) {
        return 'green'
      } else if (this.isError) {
        return 'red'
      } else {
        return null
      }
    },
    isPrivate () {
      return this.playlistData.private
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.playlistData.uuid
    },
    description () {
      return this.playlistData.description
    }
  },
  methods: {
    handleDeleted () {
      this.paginationItem.isDeleted = true
    },
    setPlaylistData (
      value
    ) {
      Object.assign(
        this.paginationItem,
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.title-section
  @extend .d-flex, .align-items-center

.icon-container
  @extend .d-flex, .align-items-center, .justify-content-center
  width: 20px
  height: 20px
  &.icon
    @extend .no-padding
</style>
