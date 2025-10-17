<template>
  <div
    class="item main-dropdown-item"
    :class="{
      disabled: isDisabled
    }"
    :data-value="value"
  >
    <BaseIcon
      v-if="icon"
      class="main-dropdown-icon"
      :class="{
        colored: isIconColored
      }"
      :icon="icon"
      :is-loading="isLoading"
      :is-error="isError"
    />

    <div
      v-if="isWithImage"
      class="image-container"
    >
      <BaseImage
        size="extrasmall"
        class="dropdown-image"
        :class="[
          isImageCircular ? 'circular' : 'rounded-medium',
          {
            'video-image': isVideo
          }
        ]"
        :model="model"
        :image="image"
      />
    </div>

    <ContentBlock
      :header="header"
      :content="content"
      :extra="extra"
    />
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import ContentBlock from './BaseDropdownItem/ContentBlock.vue'

export default {
  name: 'BaseDropdownItem',
  components: {
    BaseIcon,
    BaseImage,
    ContentBlock
  },
  props: {
    isImageCircular: {
      type: Boolean,
      default: false
    },
    isWithImage: Boolean,
    isDisabled: Boolean,
    icon: String,
    isIconColored: Boolean,
    isLoading: Boolean,
    isError: Boolean,
    image: String,
    model: String,
    header: String,
    content: String,
    extra: String,
    value: String,
    isVideo: Boolean
  }
}
</script>

<style lang="sass" scoped></style>
