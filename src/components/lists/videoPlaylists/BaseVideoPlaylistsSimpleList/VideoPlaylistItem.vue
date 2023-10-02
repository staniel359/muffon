<template>
  <BaseLinkContainer
    class="item main-simple-list-item middle-aligned main-visibility-container"
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
        class="rounded-medium image-50"
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
          class="extra"
          :model-data="playlistData"
          @link-click="handleLinkClick"
          @active-change="handleChannelLinkActiveChange"
        />

        <div
          v-if="description"
          class="description"
        >
          <small
            v-html="description"
          />
        </div>

        <BaseListCounterSection
          v-if="videosCount"
          class="description"
          icon="video"
          :count="videosCount"
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

      <BaseVideoPlaylistOptionsPopup
        class="invisible-item"
        :playlist-data="playlistData"
        :bookmark-id="bookmarkId"
        :is-bookmark="isBookmark"
        :is-with-bookmark-option="isWithBookmarkOption"
        :is-with-share-option="isWithShareOption"
        :is-with-external-link-option="isWithExternalLinkOption"
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
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BasePublishDateSection
  from '@/components/sections/BasePublishDateSection.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BaseVideoPlaylistOptionsPopup
  from '@/components/popups/videoPlaylist/BaseVideoPlaylistOptionsPopup.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  main as formatVideoPlaylistLink
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
    BaseListCounterSection,
    BaseSelfIcons,
    BasePublishDateSection,
    BaseCreatedSection,
    BaseVideoPlaylistOptionsPopup,
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
    isWithExternalLinkOption: Boolean,
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
      return formatVideoPlaylistLink(
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
    },
    videosCount () {
      return this.playlistData.videos_count
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
