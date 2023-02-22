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
        colored: isColored
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
        class="bordered"
        size="extrasmall"
        :class="{
          circular: isImageCircular,
          'rounded-medium': !isImageCircular
        }"
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
    isColored: Boolean,
    isLoading: Boolean,
    isError: Boolean,
    image: String,
    model: String,
    header: String,
    content: String,
    extra: String,
    value: String
  }
}
</script>

<style lang="sass" scoped></style>
