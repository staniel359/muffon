<template>
  <BaseImage
    class="rounded bordered"
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

    <TracksCountSection
      :tracks-count="tracksCount"
    />
  </div>

  <div class="icon-container">
    <BaseIcon
      :is-loading="isLoading"
      :icon="icon"
    />
  </div>

  <BasePlaylistOptionsDropdown
    :playlist-data="playlistData"
    is-with-edit-option
    is-with-delete-option
    @deleted="handleDeleted"
  />
</template>

<script>
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BasePrivateIcon from '@/components/BasePrivateIcon.vue'
import TracksCountSection from './ContentBlock/TracksCountSection.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import BasePlaylistOptionsDropdown
  from '@/components/dropdowns/playlist/BasePlaylistOptionsDropdown.vue'

export default {
  name: 'ContentBlock',
  components: {
    BaseImage,
    BaseHeader,
    BasePrivateIcon,
    TracksCountSection,
    BaseIcon,
    BasePlaylistOptionsDropdown
  },
  provide () {
    return {
      setPlaylistData: this.setPlaylistData
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
        return 'green check'
      } else if (this.isError) {
        return 'red close'
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
