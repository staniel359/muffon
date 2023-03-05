<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :class="{
      disabled: isDeleted
    }"
    :link="link"
    @click="handleLinkClick"
  >
    <BaseDeletedSection
      v-if="isDeleted"
      model="videoPlaylist"
    />
    <template
      v-else
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
      </div>

      <BaseSelfIcons
        v-if="isWithSelfIcons"
        :bookmark-id="bookmarkId"
        :is-with-bookmark-icon="isWithBookmarkIcon"
      />

      <BaseCreatedSection
        v-if="isWithCreated"
        class="description right"
        :model-data="playlistData"
      />
      <BasePublishDateSection
        v-else
        class="description right"
        :model-data="playlistData"
      />

      <BaseVideoPlaylistOptionsDropdown
        :playlist-data="playlistData"
        :bookmark-id="bookmarkId"
        :is-bookmark="isBookmark"
        :is-with-bookmark-option="isWithBookmarkOption"
        :is-with-share-option="isWithShareOption"
        :is-with-delete-option="isWithDeleteOption"
        @deleted="handleDeleted"
      />

      <BaseClearButton
        v-if="isWithClearButton"
        @click="handleClearButtonClick"
      />
    </template>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseDeletedSection from '@/components/sections/BaseDeletedSection.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseVideoChannelLinkSection
  from '@/components/sections/videoChannel/BaseVideoChannelLinkSection.vue'
import BaseVideoPlaylistVideosCountSection
  from '@/components/sections/videoPlaylist/BaseVideoPlaylistVideosCountSection.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BasePublishDateSection
  from '@/components/sections/BasePublishDateSection.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BaseVideoPlaylistOptionsDropdown
  from '@/components/dropdowns/videoPlaylist/BaseVideoPlaylistOptionsDropdown.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  main as formatVideoPlaylistMainLink
} from '@/helpers/formatters/links/videoPlaylist'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'VideoPlaylistItem',
  components: {
    BaseLinkContainer,
    BaseDeletedSection,
    BaseIcon,
    BaseImage,
    BaseHeader,
    BaseVideoChannelLinkSection,
    BaseVideoPlaylistVideosCountSection,
    BaseSelfIcons,
    BasePublishDateSection,
    BaseCreatedSection,
    BaseVideoPlaylistOptionsDropdown,
    BaseClearButton
  },
  mixins: [
    selfMixin
  ],
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
    isWithChannelTitle: Boolean,
    isWithBookmarkOption: Boolean,
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean,
    isWithModelIcon: Boolean,
    isWithSelfIcons: Boolean,
    isBookmark: Boolean,
    isWithCreated: Boolean
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
    modelData () {
      return this.playlistData
    },
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
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    isDeleted () {
      return !!this.playlistData.isDeleted
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
    },
    handleDeleted () {
      this.paginationItem.isDeleted = true
    }
  }
}
</script>

<style lang="sass" scoped></style>
