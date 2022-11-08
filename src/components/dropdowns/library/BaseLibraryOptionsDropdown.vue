<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
    :is-scrolling="false"
  >
    <AddOption
      v-if="isWithAddOption"
    />
  </BaseOptionsDropdownContainer>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseOptionsDropdownContainer
  from '@/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import AddOption from './BaseLibraryOptionsDropdown/AddOption.vue'

export default {
  name: 'BaseLibraryOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    AddOption
  },
  props: {
    isWithAddOption: Boolean
  },
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    isRender () {
      return (
        this.profileId &&
          this.isWithProfileOptions
      )
    },
    isWithProfileOptions () {
      return (
        this.isWithAddOption
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
