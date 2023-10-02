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
      model="videoChannel"
    />
    <template
      v-else
    >
      <BaseIcon
        v-if="isWithModelIcon"
        class="main-simple-list-item-model-icon"
        icon="videoChannel"
      />

      <BaseImage
        class="circular image-50"
        model="videoChannel"
        :image="imageData?.extrasmall"
      />

      <div class="content">
        <BaseHeader
          class="link"
          tag="h4"
          :text="channelTitle"
        />

        <CountersSection
          class="description"
          :channel-data="channelData"
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
        :model-data="channelData"
      />
      <BasePublishDateSection
        v-else
        class="description right"
        :model-data="channelData"
      />

      <BaseVideoChannelOptionsPopup
        class="invisible-item"
        :channel-data="channelData"
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
import CountersSection from './VideoChannelItem/CountersSection.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import BasePublishDateSection
  from '@/components/sections/BasePublishDateSection.vue'
import BaseVideoChannelOptionsPopup
  from '@/components/popups/videoChannel/BaseVideoChannelOptionsPopup.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  main as formatVideoChannelLink
} from '@/helpers/formatters/links/videoChannel'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'VideoChannelItem',
  components: {
    BaseLinkContainer,
    BaseDeletedSection,
    BaseIcon,
    BaseImage,
    BaseHeader,
    CountersSection,
    BaseSelfIcons,
    BaseCreatedSection,
    BasePublishDateSection,
    BaseVideoChannelOptionsPopup,
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
    channelData: {
      type: Object,
      required: true
    },
    isBookmark: Boolean,
    isWithBookmarkOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean,
    isWithModelIcon: Boolean,
    isWithSelfIcons: Boolean,
    isWithCreated: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick'
  ],
  computed: {
    modelData () {
      return this.channelData
    },
    link () {
      return formatVideoChannelLink(
        {
          channelId: this.channelId
        }
      )
    },
    channelId () {
      return this.channelData.source.id
    },
    imageData () {
      return this.channelData.image
    },
    channelTitle () {
      return this.channelData.title
    },
    uuid () {
      return this.channelData.uuid
    },
    isDeleted () {
      return !!this.channelData.isDeleted
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
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
    handleDeleted () {
      this.paginationItem.isDeleted = true
    }
  }
}
</script>

<style lang="sass" scoped></style>
