<template>
  <BaseListContainer
    class="selection"
  >
    <VideoChannelItem
      v-for="channelData in channelsCollection"
      :key="channelData.uuid"
      :channel-data="channelData"
      :is-with-share-option="isWithShareOption"
      :is-with-clear-button="isWithClearButton"
      :is-with-model-icon="isWithModelIcon"
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
    isWithShareOption: Boolean,
    isWithClearButton: Boolean,
    isWithModelIcon: Boolean
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
