<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
  >
    <JoinOption
      v-if="isRenderJoinOption"
      :community-data="communityData"
    />

    <BaseShareOption
      v-if="isRenderShareOption"
      :share-data="shareData"
    />

    <template
      v-if="isRenderEditOption"
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
      v-if="isRenderDeleteOption"
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
        this.isRenderJoinOption ||
          this.isRenderShareOption ||
          this.isRenderEditOption ||
          this.isRenderDeleteOption
      )
    },
    isRenderJoinOption () {
      return (
        this.profileId &&
          this.isWithJoinOption
      )
    },
    isRenderShareOption () {
      return (
        this.profileId &&
          this.isWithShareOption
      )
    },
    shareData () {
      return formatCommunityShareData(
        this.communityData
      )
    },
    isRenderEditOption () {
      return (
        this.profileId &&
          this.isWithEditOption
      )
    },
    isRenderDeleteOption () {
      return (
        this.profileId &&
          this.isWithDeleteOption
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
