<template>
  <div
    class="item main-dropdown-item"
    :class="{ disabled: isDisabled }"
  >
    <BaseIcon
      v-if="icon"
      class="main-dropdown-icon"
      :class="{ colored: isIconColored }"
      :icon="icon"
      :isLoading="isLoading"
      :isError="isError"
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
          rounded: !isImageCircular
        }"
        :model="model"
        :image="image"
      />
    </div>

    <ContentBlock
      :header="header"
      :subheader="subheader"
      :content="content"
      :extra="extra"
    />
  </div>
</template>

<script>
import BaseIcon from '*/components/BaseIcon.vue'
import BaseImage from '*/components/images/BaseImage.vue'
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
    subheader: String,
    content: String,
    extra: String
  }
}
</script>

<style lang="sass" scoped></style>
