<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
  >
    <JoinOption
      v-if="isWithJoinOption"
      :community-data="communityData"
    />

    <BaseShareOption
      v-if="isWithShareOption"
      :share-data="shareData"
    />

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
import {
  mapGetters
} from 'vuex'
import BaseOptionsDropdownContainer
  from '*/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import JoinOption from './BaseCommunityOptionsDropdown/JoinOption.vue'
import BaseShareOption
  from '*/components/dropdowns/options/BaseShareOption.vue'
import BaseEditOption
  from '*/components/dropdowns/options/BaseEditOption.vue'
import BaseDeleteOption
  from '*/components/dropdowns/options/BaseDeleteOption.vue'

export default {
  name: 'BaseCommunityOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    JoinOption,
    BaseShareOption,
    BaseEditOption,
    BaseDeleteOption
  },
  props: {
    communityData: Object,
    shareData: Object,
    isWithJoinOption: Boolean,
    isWithShareOption: Boolean,
    isWithEditOption: Boolean,
    isWithDeleteOption: Boolean
  },
  emits: [
    'editOptionClick',
    'deleteOptionClick'
  ],
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
        this.isWithJoinOption ||
          this.isWithShareOption ||
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
