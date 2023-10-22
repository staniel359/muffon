<template>
  <div
    v-if="currentProfileId"
    ref="section"
  >
    <BaseAddButton
      class="compact"
      model="comment"
      :is-active="isShowForm"
      @click="handleCreateButtonClick"
    />

    <FormSection
      v-show="isShowForm"
      :model="model"
      :profile-id="profileId"
      :community-id="communityId"
      :post-id="postId"
      :is-with-as-community-option="isWithAsCommunityOption"
      :is-show="isShowForm"
      @success="handleSuccess"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseAddButton from '@/components/buttons/BaseAddButton.vue'
import FormSection from './BasePostCommentFormSection/FormSection.vue'
import {
  focusOnPageElement
} from '@/helpers/actions/layout'

export default {
  name: 'BasePostCommentFormSection',
  components: {
    BaseAddButton,
    FormSection
  },
  props: {
    model: String,
    profileId: String,
    communityId: String,
    postId: String,
    isWithAsCommunityOption: Boolean
  },
  emits: [
    'success'
  ],
  data () {
    return {
      isShowForm: false
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        currentProfileId: 'id'
      }
    )
  },
  watch: {
    isShowForm: 'handleIsShowFormChange'
  },
  methods: {
    handleCreateButtonClick () {
      this.isShowForm =
        !this.isShowForm
    },
    handleSuccess (
      value
    ) {
      this.$emit(
        'success',
        value
      )
    },
    handleIsShowFormChange (
      value
    ) {
      if (value) {
        this.focus()
      }
    },
    focus () {
      focusOnPageElement(
        this.$refs.section
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
