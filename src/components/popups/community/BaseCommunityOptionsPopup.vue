<template>
  <BaseOptionsPopupContainer
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
  </BaseOptionsPopupContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseOptionsPopupContainer
  from '@/components/containers/popups/BaseOptionsPopupContainer.vue'
import JoinOption from './BaseCommunityOptionsPopup/JoinOption.vue'
import BaseShareOption
  from '@/components/popups/options/BaseShareOption.vue'
import BaseEditOption
  from '@/components/popups/options/BaseEditOption.vue'
import BaseCommunityUpdateModal
  from '@/components/modals/community/BaseCommunityUpdateModal.vue'
import BaseDeleteOption
  from '@/components/popups/options/BaseDeleteOption.vue'
import BaseCommunityDeleteModal
  from '@/components/modals/community/BaseCommunityDeleteModal.vue'
import {
  community as formatCommunityShareData
} from '@/helpers/formatters/share'

export default {
  name: 'BaseCommunityOptionsPopup',
  components: {
    BaseOptionsPopupContainer,
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
