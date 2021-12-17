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
        :class="[isImageCircular ? 'circular' : 'rounded']"
        :model="model"
        :image="image"
      />
    </div>

    <InfoBlock
      :header="header"
      :subheader="subheader"
      :content="content"
      :extra="extra"
    />
  </div>
</template>

<script>
import BaseIcon from '@/BaseIcon.vue'
import BaseImage from '@/images/BaseImage.vue'
import InfoBlock from './BaseDropdownItem/InfoBlock.vue'

export default {
  name: 'BaseDropdownItem',
  components: {
    BaseIcon,
    BaseImage,
    InfoBlock
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
