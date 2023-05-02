<template>
  <BaseListContainer
    class="selection"
  >
    <VideoChannelItem
      v-for="channelData in channelsCollection"
      :key="channelData.uuid"
      :channel-data="channelData"
      :is-with-bookmark-option="isWithBookmarkOption"
      :is-with-share-option="isWithShareOption"
      :is-with-external-link-option="isWithExternalLinkOption"
      :is-with-delete-option="isWithDeleteOption"
      :is-with-clear-button="isWithClearButton"
      :is-with-model-icon="isWithModelIcon"
      :is-with-self-icons="isWithSelfIcons"
      :is-bookmark="isBookmark"
      :is-with-created="isWithCreated"
      @link-click="handleLinkClick"
      @clear-button-click="handleClearButtonClick"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import VideoChannelItem
  from './BaseVideoChannelsSimpleList/VideoChannelItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'BaseVideoChannelsSimpleList',
  components: {
    BaseListContainer,
    VideoChannelItem
  },
  props: {
    channels: {
      type: Array,
      default () {
        return []
      }
    },
    isWithSelfIcons: {
      type: Boolean,
      default: true
    },
    isWithBookmarkOption: Boolean,
    isWithShareOption: Boolean,
    isWithExternalLinkOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithClearButton: Boolean,
    isWithModelIcon: Boolean,
    isBookmark: Boolean,
    isWithCreated: Boolean
  },
  emits: [
    'linkClick',
    'clearButtonClick'
  ],
  computed: {
    channelsCollection () {
      return formatCollection(
        this.channels
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleClearButtonClick (
      {
        uuid
      }
    ) {
      this.$emit(
        'clearButtonClick',
        {
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
