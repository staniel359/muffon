<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="link"
    @click="handleLinkClick"
  >
    <BaseIcon
      v-if="isWithModelIcon"
      class="main-simple-list-item-model-icon"
      icon="videoChannel"
    />

    <BaseImage
      class="circular bordered"
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

    <BaseVideoChannelOptionsDropdown
      :channel-data="channelData"
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
import CountersSection from './VideoChannelItem/CountersSection.vue'
import BaseVideoChannelOptionsDropdown
  from '@/components/dropdowns/videoChannel/BaseVideoChannelOptionsDropdown.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  main as formatVideoChannelMainLink
} from '@/helpers/formatters/links/videoChannel'

export default {
  name: 'VideoChannelItem',
  components: {
    BaseLinkContainer,
    BaseIcon,
    BaseImage,
    BaseHeader,
    CountersSection,
    BaseVideoChannelOptionsDropdown,
    BaseClearButton
  },
  props: {
    channelData: {
      type: Object,
      required: true
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
    link () {
      return formatVideoChannelMainLink(
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
