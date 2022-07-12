<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
  >
    <BaseEditOption
      v-if="isWithEditOption"
      @click="handleEditOptionClick"
    />

    <BaseDeleteOption
      v-if="isWithDeleteOption"
      @click="handleDeleteOptionClick"
    />
  </BaseOptionsDropdownContainer>
</template>

<script>
import BaseOptionsDropdownContainer
  from '*/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import BaseEditOption
  from '*/components/dropdowns/options/BaseEditOption.vue'
import BaseDeleteOption
  from '*/components/dropdowns/options/BaseDeleteOption.vue'

export default {
  name: 'BasePostOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    BaseEditOption,
    BaseDeleteOption
  },
  props: {
    isWithEditOption: Boolean,
    isWithDeleteOption: Boolean
  },
  emits: [
    'editOptionClick',
    'deleteOptionClick'
  ],
  computed: {
    isRender () {
      return (
        this.isWithEditOption ||
          this.isWithDeleteOption
      )
    }
  },
  methods: {
    handleEditOptionClick () {
      this.$emit(
        'editOptionClick'
      )
    },
    handleDeleteOptionClick () {
      this.$emit(
        'deleteOptionClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
