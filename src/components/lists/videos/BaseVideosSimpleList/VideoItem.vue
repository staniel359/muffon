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
      model="video"
    />
    <template
      v-else
    >
      <BaseImage
        class="rounded-medium video-image-110"
        model="video"
        :image="imageData?.extrasmall"
        :is-contained="isTracksScope"
      />

      <div class="content">
        <BaseHeader
          tag="h4"
          :class="{
            link: isMainLinkActive
          }"
          :text="videoTitle"
        />

        <BaseVideoChannelLinkSection
          v-if="isWithChannelTitle"
          class="extra"
          :model-data="videoData"
          @link-click="handleLinkClick"
          @active-change="handleChannelLinkActiveChange"
        />
      </div>

      <BaseSelfIcons
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :watched-id="watchedId"
        :is-with-favorite-icon="isWithFavoriteIcon"
        :is-with-bookmark-icon="isWithBookmarkIcon"
      />

      <BaseCreatedSection
        v-if="isWithCreated"
        class="description right"
        :model-data="videoData"
      />
      <BasePublishDateSection
        v-else
        class="description right"
        :model-data="videoData"
      />

      <BaseVideoOptionsPopup
        class="invisible-item"
        :video-data="videoData"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :watched-id="watchedId"
        :is-favorite="isFavorite"
        :is-bookmark="isBookmark"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-bookmark-option="isWithBookmarkOption"
        :is-with-watched-option="isWithWatchedOption"
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
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseVideoChannelLinkSection
  from '@/components/sections/videoChannel/BaseVideoChannelLinkSection.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BasePublishDateSection
  from '@/components/sections/BasePublishDateSection.vue'
import BaseVideoOptionsPopup
  from '@/components/popups/video/BaseVideoOptionsPopup.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  main as formatVideoLink
} from '@/helpers/formatters/links/video'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'VideoItem',
  components: {
    BaseLinkContainer,
    BaseDeletedSection,
    BaseImage,
    BaseHeader,
    BaseVideoChannelLinkSection,
    BaseSelfIcons,
    BaseCreatedSection,
    BasePublishDateSection,
    BaseVideoOptionsPopup,
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
    videoData: {
      type: Object,
      required: true
    },
    scope: {
      type: String,
      default: 'videos'
    },
    isWithChannelTitle: Boolean,
    isWithCreated: Boolean,
    profileId: String,
    isFavorite: Boolean,
    isBookmark: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithWatchedOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean
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
      return this.videoData
    },
    link () {
      return formatVideoLink(
        {
          videoId: this.videoId
        }
      )
    },
    videoId () {
      return this.videoData.source.id
    },
    imageData () {
      return this.videoData.image
    },
    videoTitle () {
      return this.videoData.title
    },
    uuid () {
      return this.videoData.uuid
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    isDeleted () {
      return !!this.videoData.isDeleted
    },
    isTracksScope () {
      return (
        this.scope === 'tracks'
      )
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
