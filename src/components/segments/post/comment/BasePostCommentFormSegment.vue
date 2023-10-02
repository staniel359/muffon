<template>
  <BaseSegmentContainer
    v-if="currentProfileId"
    ref="segment"
    class="main-segment-container basic no-padding"
    :is-change-transparency="false"
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
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseAddButton from '@/components/buttons/BaseAddButton.vue'
import FormSection from './BasePostCommentFormSegment/FormSection.vue'

export default {
  name: 'BasePostCommentFormSegment',
  components: {
    BaseSegmentContainer,
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
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
