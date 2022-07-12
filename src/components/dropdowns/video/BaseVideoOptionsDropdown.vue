<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
  >
    <BaseShareOption
      v-if="isWithShareOption"
      :share-data="shareData"
    />
  </BaseOptionsDropdownContainer>
</template>

<script>
import BaseOptionsDropdownContainer
  from '*/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import BaseShareOption
  from '*/components/dropdowns/options/BaseShareOption.vue'

export default {
  name: 'BaseVideoOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    BaseShareOption
  },
  props: {
    shareData: Object,
    isWithShareOption: Boolean
  },
  computed: {
    isRender () {
      return (
        this.isWithShareOption
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
