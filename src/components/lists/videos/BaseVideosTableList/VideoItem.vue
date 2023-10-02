<template>
  <BaseSimpleCardContainer
    :class="{
      disabled: isDeleted
    }"
  >
    <BaseDeletedSection
      v-if="isDeleted"
      model="video"
    />
    <template
      v-else
    >
      <BaseLinkContainer
        class="card-link"
        :link="link"
        @click="handleLinkClick"
      >
        <BaseVideoOptionsPopup
          class="hidden-item"
          :video-data="videoData"
          :favorite-id="favoriteId"
          :bookmark-id="bookmarkId"
          :watched-id="watchedId"
          :is-with-favorite-option="isWithFavoriteOption"
          :is-with-bookmark-option="isWithBookmarkOption"
          :is-with-watched-option="isWithWatchedOption"
          :is-with-share-option="isWithShareOption"
          :is-with-external-link-option="isWithExternalLinkOption"
          :is-with-delete-option="isWithDeleteOption"
          :is-bookmark="isBookmark"
          :is-favorite="isFavorite"
          :is-transparent="false"
          @deleted="handleDeleted"
        />

        <div class="main-image-container video">
          <BaseImage
            class="rounded-medium"
            model="video"
            :image="imageData?.small"
          />
        </div>

        <BaseHeader
          class="center aligned link"
          tag="h4"
          :text="videoTitle"
        />
      </BaseLinkContainer>

      <div class="center aligned content">
        <BaseVideoChannelLinkSection
          v-if="isWithChannelTitle"
          class="extra"
          :model-data="videoData"
          @link-click="handleLinkClick"
        />

        <BaseCreatedSection
          v-if="isWithCreated"
          class="description"
          :model-data="videoData"
        />
        <BasePublishDateSection
          v-else
          class="description"
          :model-data="videoData"
        />

        <BaseSelfIcons
          :favorite-id="favoriteId"
          :bookmark-id="bookmarkId"
          :watched-id="watchedId"
        />
      </div>
    </template>
  </BaseSimpleCardContainer>
</template>

<script>
import BaseSimpleCardContainer
  from '@/components/containers/cards/BaseSimpleCardContainer.vue'
import BaseDeletedSection from '@/components/sections/BaseDeletedSection.vue'
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseVideoOptionsPopup
  from '@/components/popups/video/BaseVideoOptionsPopup.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseVideoChannelLinkSection
  from '@/components/sections/videoChannel/BaseVideoChannelLinkSection.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BasePublishDateSection
  from '@/components/sections/BasePublishDateSection.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import {
  main as formatVideoLink
} from '@/helpers/formatters/links/video'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'VideoItem',
  components: {
    BaseSimpleCardContainer,
    BaseDeletedSection,
    BaseLinkContainer,
    BaseVideoOptionsPopup,
    BaseImage,
    BaseHeader,
    BaseVideoChannelLinkSection,
    BaseCreatedSection,
    BasePublishDateSection,
    BaseSelfIcons
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
    isWithChannelTitle: Boolean,
    isWithCreated: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithWatchedOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean
  },
  emits: [
    'linkClick'
  ],
  computed: {
    modelData () {
      return this.videoData
    },
    imageData () {
      return this.videoData.image
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
    videoTitle () {
      return this.videoData.title
    },
    isDeleted () {
      return !!this.videoData.isDeleted
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.videoData.uuid
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleDeleted () {
      this.paginationItem.isDeleted = true
    }
  }
}
</script>

<style lang="sass" scoped></style>
