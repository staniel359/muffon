<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="link"
    @click="handleLinkClick"
  >
    <BaseIcon
      v-if="isWithModelIcon"
      class="main-simple-list-item-model-icon"
      icon="videoPlaylist"
    />

    <BaseImage
      class="rounded-medium bordered"
      model="videoPlaylist"
      :image="imageData?.extrasmall"
    />

    <div class="content">
      <BaseHeader
        tag="h4"
        :class="{
          link: isMainLinkActive
        }"
        :text="playlistTitle"
      />

      <BaseVideoChannelLinkSection
        v-if="isWithChannelTitle"
        :model-data="playlistData"
        @link-click="handleLinkClick"
        @active-change="handleChannelLinkActiveChange"
      />

      <div
        v-if="description"
        class="extra"
      >
        <small
          v-html="description"
        />
      </div>

      <BaseVideoPlaylistVideosCountSection
        class="description"
        :playlist-data="playlistData"
        is-small
      />

      <BasePublishDateSection
        class="description"
        :model-data="playlistData"
      />
    </div>

    <BaseVideoPlaylistOptionsDropdown
      :playlist-data="playlistData"
      :is-with-share-option="isWithShareOption"
    />

    <BaseClearButton
      v-if="isWithClearButton"
      @click="handleClearButtonClick"
    />
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseVideoChannelLinkSection
  from '@/components/sections/videoChannel/BaseVideoChannelLinkSection.vue'
import BaseVideoPlaylistVideosCountSection
  from '@/components/sections/videoPlaylist/BaseVideoPlaylistVideosCountSection.vue'
import BasePublishDateSection
  from '@/components/sections/BasePublishDateSection.vue'
import BaseVideoPlaylistOptionsDropdown
  from '@/components/dropdowns/videoPlaylist/BaseVideoPlaylistOptionsDropdown.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  main as formatVideoPlaylistMainLink
} from '@/helpers/formatters/links/videoPlaylist'

export default {
  name: 'VideoPlaylistItem',
  components: {
    BaseLinkContainer,
    BaseIcon,
    BaseImage,
    BaseHeader,
    BaseVideoChannelLinkSection,
    BaseVideoPlaylistVideosCountSection,
    BasePublishDateSection,
    BaseVideoPlaylistOptionsDropdown,
    BaseClearButton
  },
  props: {
    playlistData: {
      type: Object,
      required: true
    },
    isWithChannelTitle: Boolean,
    isWithShareOption: Boolean,
    isWithClearButton: Boolean,
    isWithModelIcon: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick'
  ],
  data () {
    return {
      isMainLinkActive: true
    }
  },
  computed: {
    link () {
      return formatVideoPlaylistMainLink(
        {
          playlistId: this.playlistId
        }
      )
    },
    playlistId () {
      return this.playlistData.source.id
    },
    imageData () {
      return this.playlistData.image
    },
    playlistTitle () {
      return this.playlistData.title
    },
    description () {
      return this.playlistData.description
    },
    uuid () {
      return this.playlistData.uuid
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleClearButtonClick () {
      this.$emit(
        'clearButtonClick',
        {
          uuid: this.uuid
        }
      )
    },
    handleChannelLinkActiveChange (
      value
    ) {
      this.isMainLinkActive = !value
    }
  }
}
</script>

<style lang="sass" scoped></style>
