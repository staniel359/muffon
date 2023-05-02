<template>
  <BaseOptionsPopupContainer
    v-if="isRender"
  >
    <template
      v-if="isRenderEditOption"
    >
      <BaseEditOption
        @click="handleEditOptionClick"
      />

      <BasePostUpdateModal
        ref="updateModal"
        :key="key"
        :post-data="postData"
        :is-with-as-community-option="isCommunityCreator"
        @success="handleUpdated"
      />
    </template>

    <template
      v-if="isRenderDeleteOption"
    >
      <BaseDeleteOption
        @click="handleDeleteOptionClick"
      />

      <BasePostDeleteModal
        ref="deleteModal"
        :post-data="postData"
        @success="handleDeleted"
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
import BaseEditOption
  from '@/components/popups/options/BaseEditOption.vue'
import BasePostUpdateModal
  from '@/components/modals/post/BasePostUpdateModal.vue'
import BaseDeleteOption
  from '@/components/popups/options/BaseDeleteOption.vue'
import BasePostDeleteModal
  from '@/components/modals/post/BasePostDeleteModal.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BasePostOptionsPopup',
  components: {
    BaseOptionsPopupContainer,
    BaseEditOption,
    BasePostUpdateModal,
    BaseDeleteOption,
    BasePostDeleteModal
  },
  props: {
    postData: Object,
    isWithEditOption: Boolean,
    isWithDeleteOption: Boolean,
    isCommunityCreator: Boolean
  },
  emits: [
    'updated',
    'deleted'
  ],
  data () {
    return {
      key: null
    }
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
        this.isRenderEditOption ||
          this.isRenderDeleteOption
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
      this.showUpdateModal()
    },
    handleDeleteOptionClick () {
      this.showDeleteModal()
    },
    handleUpdated (
      value
    ) {
      this.hideUpdateModal()

      this.$emit(
        'updated',
        value
      )
    },
    handleDeleted () {
      this.$emit(
        'deleted'
      )
    },
    async showUpdateModal () {
      this.key = generateKey()

      await this.$nextTick()

      this.$refs
        .updateModal
        .show()
    },
    showDeleteModal () {
      this.$refs
        .deleteModal
        .show()
    },
    hideUpdateModal () {
      this.$refs
        .updateModal
        .hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
