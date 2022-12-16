<template>
  <BaseOptionsDropdownContainer
    v-if="isRender"
  >
    <template
      v-if="isWithEditOption"
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
      v-if="isWithDeleteOption"
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
  </BaseOptionsDropdownContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseOptionsDropdownContainer
  from '@/components/containers/dropdowns/BaseOptionsDropdownContainer.vue'
import BaseEditOption
  from '@/components/dropdowns/options/BaseEditOption.vue'
import BasePostUpdateModal
  from '@/components/modals/post/BasePostUpdateModal.vue'
import BaseDeleteOption
  from '@/components/dropdowns/options/BaseDeleteOption.vue'
import BasePostDeleteModal
  from '@/components/modals/post/BasePostDeleteModal.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BasePostOptionsDropdown',
  components: {
    BaseOptionsDropdownContainer,
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
        this.profileId &&
          this.isWithProfileOptions
      )
    },
    isWithProfileOptions () {
      return (
        this.isWithEditOption ||
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
