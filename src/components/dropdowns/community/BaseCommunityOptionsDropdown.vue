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

    <template
      v-if="isWithEditOption"
    >
      <BaseEditOption
        @click="handleEditOptionClick"
      />

      <BaseCommunityUpdateModal
        ref="editModal"
        :community-data="communityData"
      />
    </template>

    <template
      v-if="isWithDeleteOption"
    >
      <BaseDeleteOption
        @click="handleDeleteOptionClick"
      />

      <BaseCommunityDeleteModal
        ref="deleteModal"
        :community-data="communityData"
      />
    </template>
  </BaseOptionsDropdownContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseOptionsDropdownContainer
  from '@/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import JoinOption from './BaseCommunityOptionsDropdown/JoinOption.vue'
import BaseShareOption
  from '@/components/dropdowns/options/BaseShareOption.vue'
import BaseEditOption
  from '@/components/dropdowns/options/BaseEditOption.vue'
import BaseCommunityUpdateModal
  from '@/components/modals/community/BaseCommunityUpdateModal.vue'
import BaseDeleteOption
  from '@/components/dropdowns/options/BaseDeleteOption.vue'
import BaseCommunityDeleteModal
  from '@/components/modals/community/BaseCommunityDeleteModal.vue'
import {
  community as formatCommunityShareData
} from '@/helpers/formatters/share'

export default {
  name: 'BaseCommunityOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
    JoinOption,
    BaseShareOption,
    BaseEditOption,
    BaseCommunityUpdateModal,
    BaseDeleteOption,
    BaseCommunityDeleteModal
  },
  props: {
    communityData: Object,
    isWithJoinOption: Boolean,
    isWithShareOption: Boolean,
    isWithEditOption: Boolean,
    isWithDeleteOption: Boolean
  },
  computed: {
    ...mapState(
      profileStore,
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
    },
    shareData () {
      return formatCommunityShareData(
        this.communityData
      )
    }
  },
  methods: {
    handleEditOptionClick () {
      this.showEditModal()
    },
    handleDeleteOptionClick () {
      this.showDeleteModal()
    },
    showEditModal () {
      this.$refs
        .editModal
        .show()
    },
    showDeleteModal () {
      this.$refs
        .deleteModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
